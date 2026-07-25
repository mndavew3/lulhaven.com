// POST /api/contest-forgot — request a password-reset code. Body: { username }.
// ALWAYS returns a generic success (no account enumeration). If the account exists,
// a fresh 6-digit reset code is emailed to its address and reset_tries is cleared.
// The reset code is separate from the email-verification code (reset_* columns).
// Rate-limited on IP and username so neither a host nor an inbox can be flooded.
import { newCode } from "../_lib/account.js";
import { sendEmail } from "../_lib/email.js";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const CODE_TTL_SEC = 20 * 60, RATE_WINDOW = 3600, RATE_MAX_IP = 20, RATE_MAX_USER = 5;
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", ...CORS } });
const GENERIC = { ok: true, message: "If that account exists, a reset code is on its way to its email." };

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
  const username = (b.username || "").trim();
  if (!username) return json({ error: "Enter your username." }, 400);

  // Rate-limit on the submitted key regardless of existence — the 429 can't leak
  // whether the account is real (it fires for any hammered username or IP).
  if (!(await allow(env, "forgot-ip", ip, RATE_MAX_IP)) || !(await allow(env, "forgot-user", username.toLowerCase(), RATE_MAX_USER)))
    return json({ error: "Too many attempts, try again later." }, 429);

  let row = null;
  try { row = await env.haven_builds.prepare(
    "SELECT email FROM contest_accounts WHERE username_lc=?"
  ).bind(username.toLowerCase()).first(); } catch { return json(GENERIC); }

  if (row && row.email) {
    const code = newCode();
    const exp = Math.floor(Date.now() / 1000) + CODE_TTL_SEC;
    try { await env.haven_builds.prepare(
      "UPDATE contest_accounts SET reset_code=?, reset_code_expiry=?, reset_tries=0 WHERE username_lc=?"
    ).bind(code, exp, username.toLowerCase()).run(); } catch { return json(GENERIC); }
    await sendEmail({
      env, to: row.email, subject: "Your Haven Challenge password-reset code",
      text: `Your Haven Challenge password-reset code is ${code}. It expires in 20 minutes. If you didn't request a reset, ignore this email — your password won't change.`,
      html: `<p>Your Haven Challenge password-reset code is:</p><p style="font-size:22px;font-weight:bold;letter-spacing:3px;">${code}</p><p>It expires in 20 minutes. If you didn't request a reset, ignore this email — your password won't change.</p>`,
    });
  }
  return json(GENERIC);
}
