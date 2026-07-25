// POST   /api/contest-login  — { username, password } -> sets session cookie.
// DELETE /api/contest-login  — logout (clears the cookie).
import { verifyPassword, makeSession, sessionCookie, SESSION_COOKIE } from "../_lib/account.js";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, DELETE, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const RATE_WINDOW = 900, RATE_MAX = 10;
const json = (b, s = 200, extra = {}) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", ...CORS, ...extra } });

async function allow(env, key) {
  if (!key) return true;
  const w = Math.floor(Date.now() / 1000 / RATE_WINDOW) * RATE_WINDOW;
  try {
    await env.haven_builds.prepare(
      `INSERT INTO challenge_rate (bucket,key,window_start,count) VALUES ('login',?,?,1)
       ON CONFLICT(bucket,key,window_start) DO UPDATE SET count=count+1`).bind(key, w).run();
    const r = await env.haven_builds.prepare(
      `SELECT count FROM challenge_rate WHERE bucket='login' AND key=? AND window_start=?`).bind(key, w).first();
    return !r || r.count <= RATE_MAX;
  } catch { return true; }
}

export async function onRequestOptions() { return new Response(null, { status: 204, headers: CORS }); }

export async function onRequestPost({ request, env }) {
  const ip = request.headers.get("CF-Connecting-IP") || "";
  let b; try { b = await request.json(); } catch { return json({ error: "invalid request" }, 400); }
  const username = (b.username || "").trim();
  // Rate-limit on IP AND username so neither a single account nor a single host can be hammered.
  if (!(await allow(env, "ip:" + ip)) || !(await allow(env, "u:" + username.toLowerCase())))
    return json({ error: "Too many attempts. Wait a few minutes and try again." }, 429);
  if (!username || typeof b.password !== "string") return json({ error: "Enter your username and password." }, 400);

  let row;
  try { row = await env.haven_builds.prepare(
    "SELECT username, email, pw_hash, pw_salt, verified FROM contest_accounts WHERE username_lc=?"
  ).bind(username.toLowerCase()).first(); } catch { return json({ error: "server error" }, 500); }

  // Generic failure for both "no such user" and "bad password" — no enumeration.
  const okPw = row ? await verifyPassword(env, b.password, row.pw_salt, row.pw_hash) : false;
  if (!row || !okPw) return json({ error: "Invalid username or password." }, 401);
  if (!row.verified) return json({ error: "Please verify your email first — check for your 6-digit code." }, 403);

  const cookie = sessionCookie(await makeSession(env, row.username));
  return json({ ok: true, username: row.username, message: "Signed in." }, 200, { "Set-Cookie": cookie });
}

export async function onRequestDelete() {
  const cleared = `${SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`;
  return json({ ok: true }, 200, { "Set-Cookie": cleared });
}
