// POST /api/contest-verify — echo the emailed code to activate an account.
// Body: { username, code }. On success the account is verified (still must log in).
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const MAX_TRIES = 5;
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", ...CORS } });

export async function onRequestOptions() { return new Response(null, { status: 204, headers: CORS }); }

export async function onRequestPost({ request, env }) {
  let b; try { b = await request.json(); } catch { return json({ error: "invalid request" }, 400); }
  const username = (b.username || "").trim(), code = String(b.code || "").trim();
  if (!username || !/^\d{6}$/.test(code)) return json({ error: "Enter the 6-digit code from your email." }, 400);

  let row;
  try { row = await env.haven_builds.prepare(
    "SELECT username, verified, code, code_expiry, code_tries FROM contest_accounts WHERE username_lc=?"
  ).bind(username.toLowerCase()).first(); } catch { return json({ error: "server error" }, 500); }
  if (!row) return json({ error: "No such account." }, 404);
  if (row.verified) return json({ ok: true, message: "Already verified — please log in." });
  if (row.code_tries >= MAX_TRIES) return json({ error: "Too many attempts. Register again to get a new code." }, 429);
  if (Math.floor(Date.now() / 1000) > row.code_expiry) return json({ error: "That code has expired. Register again to get a new one." }, 410);

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
