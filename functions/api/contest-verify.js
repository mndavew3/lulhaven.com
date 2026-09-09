// POST /api/contest-verify — echo the emailed code to activate an account.
// Body: { username, code }. On success the account is verified (still must log in).
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const MAX_TRIES = 5;
const RATE_WINDOW = 3600, RATE_MAX_IP = 20;
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", ...CORS } });

// Per-IP throttle against challenge_rate — mirrors every sibling contest-auth
// endpoint (register/login/resend/forgot). Without it, the 404 "No such
// account" vs other responses is an unthrottled username-enumeration oracle
// (bug-hunt wf_41634fe9-676). Per-account guessing is already capped by
// code_tries; this closes the cross-account enumeration at the IP level.
async function allow(env, bucket, key, max) {
  if (!key) return true;
  const w = Math.floor(Date.now() / 1000 / RATE_WINDOW) * RATE_WINDOW;
  try {
    await env.haven_builds.prepare(
      `INSERT INTO challenge_rate (bucket,key,window_start,count) VALUES (?,?,?,1)
       ON CONFLICT(bucket,key,window_start) DO UPDATE SET count=count+1`).bind(bucket, key, w).run();
    const r = await env.haven_builds.prepare(
      `SELECT count FROM challenge_rate WHERE bucket=? AND key=? AND window_start=?`).bind(bucket, key, w).first();
    return !r || r.count <= max;
  } catch { return true; }
}

export async function onRequestOptions() { return new Response(null, { status: 204, headers: CORS }); }

export async function onRequestPost({ request, env }) {
  const ip = request.headers.get("CF-Connecting-IP") || "";
  let b; try { b = await request.json(); } catch { return json({ error: "invalid request" }, 400); }
  const username = (b.username || "").trim(), code = String(b.code || "").trim();
  if (!username || !/^\d{6}$/.test(code)) return json({ error: "Enter the 6-digit code from your email." }, 400);
  if (!(await allow(env, "verify-ip", ip, RATE_MAX_IP)))
    return json({ error: "Too many attempts, try again later." }, 429);

  let row;
  try { row = await env.haven_builds.prepare(
    "SELECT username, verified, code, code_expiry, code_tries FROM contest_accounts WHERE username_lc=?"
  ).bind(username.toLowerCase()).first(); } catch { return json({ error: "server error" }, 500); }
  if (!row) return json({ error: "No such account." }, 404);
  if (row.verified) return json({ ok: true, message: "Already verified — please log in." });
  if (row.code_tries >= MAX_TRIES) return json({ error: "Too many attempts. Use “Resend code” to get a fresh one." }, 429);
  if (Math.floor(Date.now() / 1000) > row.code_expiry) return json({ error: "That code has expired. Use “Resend code” to get a fresh one." }, 410);

  if (code !== row.code) {
    try { await env.haven_builds.prepare(
      "UPDATE contest_accounts SET code_tries = code_tries + 1 WHERE username_lc=?"
    ).bind(username.toLowerCase()).run(); } catch {}
    return json({ error: "That code is not correct." }, 400);
  }

  try { await env.haven_builds.prepare(
    "UPDATE contest_accounts SET verified=1, code=NULL, code_expiry=NULL WHERE username_lc=?"
  ).bind(username.toLowerCase()).run(); } catch { return json({ error: "server error" }, 500); }

  return json({ ok: true, message: "Email verified. You can now log in." });
}
