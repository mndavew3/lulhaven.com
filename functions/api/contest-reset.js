// POST /api/contest-reset — set a NEW password using the emailed reset code.
// Body: { username, code, password, password2 }. Verifies the reset code (expiry +
// try-cap), then re-hashes the new password (one-way, salted, peppered — same as
// register) and clears the reset code. Rate-limited on IP.
import { hashPassword, rules } from "../_lib/account.js";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const MAX_TRIES = 5, RATE_WINDOW = 3600, RATE_MAX_IP = 30;
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", ...CORS } });

async function allowIp(env, ip) {
  if (!ip) return true;
  const w = Math.floor(Date.now() / 1000 / RATE_WINDOW) * RATE_WINDOW;
  try {
    await env.haven_builds.prepare(
      `INSERT INTO challenge_rate (bucket,key,window_start,count) VALUES ('reset',?,?,1)
       ON CONFLICT(bucket,key,window_start) DO UPDATE SET count=count+1`).bind(ip, w).run();
    const r = await env.haven_builds.prepare(
      `SELECT count FROM challenge_rate WHERE bucket='reset' AND key=? AND window_start=?`).bind(ip, w).first();
    return !r || r.count <= RATE_MAX_IP;
  } catch { return true; }
}

export async function onRequestOptions() { return new Response(null, { status: 204, headers: CORS }); }

export async function onRequestPost({ request, env }) {
  const ip = request.headers.get("CF-Connecting-IP") || "";
  if (!(await allowIp(env, ip))) return json({ error: "Too many attempts, try again later." }, 429);

  let b; try { b = await request.json(); } catch { return json({ error: "invalid request" }, 400); }
  const username = (b.username || "").trim(), code = String(b.code || "").trim();
  if (!username || !/^\d{6}$/.test(code)) return json({ error: "Enter your username and the 6-digit code from your email." }, 400);
  if (!rules.password(b.password)) return json({ error: "Password must be at least 8 characters." }, 400);
  if (b.password !== b.password2) return json({ error: "The two passwords don't match." }, 400);

  let row;
  try { row = await env.haven_builds.prepare(
    "SELECT reset_code, reset_code_expiry, reset_tries FROM contest_accounts WHERE username_lc=?"
  ).bind(username.toLowerCase()).first(); } catch { return json({ error: "server error" }, 500); }
  // Same message for "no such account" and "no pending reset" — no enumeration.
  if (!row || !row.reset_code) return json({ error: "No reset is pending for that account. Request a new code." }, 400);
  if (row.reset_tries >= MAX_TRIES) return json({ error: "Too many attempts. Request a new reset code." }, 429);
  if (Math.floor(Date.now() / 1000) > row.reset_code_expiry) return json({ error: "That code has expired. Request a new reset code." }, 410);

  if (code !== row.reset_code) {
    try { await env.haven_builds.prepare(
      "UPDATE contest_accounts SET reset_tries = reset_tries + 1 WHERE username_lc=?"
    ).bind(username.toLowerCase()).run(); } catch {}
    return json({ error: "That code is not correct." }, 400);
  }

  const { salt, hash } = await hashPassword(env, b.password);
  try { await env.haven_builds.prepare(
    "UPDATE contest_accounts SET pw_hash=?, pw_salt=?, reset_code=NULL, reset_code_expiry=NULL, reset_tries=0 WHERE username_lc=?"
  ).bind(hash, salt, username.toLowerCase()).run(); } catch { return json({ error: "server error" }, 500); }

  return json({ ok: true, message: "Password changed. You can now log in." });
}
