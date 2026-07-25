// POST /api/contest-register — create a Challenge participant account (unverified).
// Body: { username, email, password, password2 }
// Sends a 6-digit code to the email; the account can't log in until verified.
import { hashPassword, newCode, rules } from "../_lib/account.js";
import { sendEmail } from "../_lib/email.js";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const CODE_TTL_SEC = 20 * 60, RATE_WINDOW = 3600, RATE_MAX_IP = 20;
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", ...CORS } });

async function allowIp(env, ip) {
  if (!ip) return true;
  const w = Math.floor(Date.now() / 1000 / RATE_WINDOW) * RATE_WINDOW;
  try {
    await env.haven_builds.prepare(
      `INSERT INTO challenge_rate (bucket,key,window_start,count) VALUES ('register',?,?,1)
       ON CONFLICT(bucket,key,window_start) DO UPDATE SET count=count+1`).bind(ip, w).run();
    const r = await env.haven_builds.prepare(
      `SELECT count FROM challenge_rate WHERE bucket='register' AND key=? AND window_start=?`).bind(ip, w).first();
    return !r || r.count <= RATE_MAX_IP;
  } catch { return true; }
}

export async function onRequestOptions() { return new Response(null, { status: 204, headers: CORS }); }

export async function onRequestPost({ request, env }) {
  const ip = request.headers.get("CF-Connecting-IP") || "";
  if (!(await allowIp(env, ip))) return json({ error: "Too many attempts, try again later." }, 429);

  let b; try { b = await request.json(); } catch { return json({ error: "invalid request" }, 400); }
  const username = (b.username || "").trim(), email = (b.email || "").trim().toLowerCase();
  if (!rules.username(username)) return json({ error: "Username must be 3–32 letters, numbers or underscores." }, 400);
  if (!rules.email(email)) return json({ error: "Enter a valid email address." }, 400);
  if (!rules.password(b.password)) return json({ error: "Password must be at least 8 characters." }, 400);
  if (b.password !== b.password2) return json({ error: "The two passwords don't match." }, 400);

  // Uniqueness (case-insensitive username; unique email). Report a taken username
  // plainly so they can pick another (that's not a secret); keep email generic.
  try {
    const uHit = await env.haven_builds.prepare("SELECT 1 FROM contest_accounts WHERE username_lc=?").bind(username.toLowerCase()).first();
    if (uHit) return json({ error: "That username is already taken — please choose another.", field: "username" }, 409);
    const eHit = await env.haven_builds.prepare("SELECT 1 FROM contest_accounts WHERE email=?").bind(email).first();
    if (eHit) return json({ error: "An account already exists for that email.", field: "email" }, 409);
  } catch { return json({ error: "server error" }, 500); }

  const { salt, hash } = await hashPassword(env, b.password);
  const code = newCode();
  const codeExpiry = Math.floor(Date.now() / 1000) + CODE_TTL_SEC;
  try {
    await env.haven_builds.prepare(
      `INSERT INTO contest_accounts (username, username_lc, email, pw_hash, pw_salt, verified, code, code_expiry, code_tries, created_datetime)
       VALUES (?,?,?,?,?,0,?,?,0, datetime('now'))`
    ).bind(username, username.toLowerCase(), email, hash, salt, code, codeExpiry).run();
  } catch (e) {
    if (String(e).includes("UNIQUE")) return json({ error: "That username or email is already registered." }, 409);
    return json({ error: "could not create account" }, 500);
  }

  await sendEmail({
    env, to: email, subject: "Your Haven Challenge verification code",
    text: `Your Haven Challenge verification code is ${code}. It expires in 20 minutes.`,
    html: `<p>Your Haven Challenge verification code is:</p><p style="font-size:22px;font-weight:bold;letter-spacing:3px;">${code}</p><p>It expires in 20 minutes.</p>`,
  });

  return json({ ok: true, message: "Account created. Check your email for a 6-digit code to verify it." });
}
