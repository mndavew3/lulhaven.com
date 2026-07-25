// POST /api/contest-resend — email a fresh verification code to an UNVERIFIED account.
// Body: { username }. Issues a new code, resets the try counter, re-sends. No-op for
// already-verified accounts. Rate-limited on IP and on username so neither a single host
// nor a single inbox can be flooded. Closes the register→verify dead-ends in contest-verify.js.
import { newCode } from "../_lib/account.js";
import { sendEmail } from "../_lib/email.js";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const CODE_TTL_SEC = 20 * 60, RATE_WINDOW = 3600, RATE_MAX_IP = 20, RATE_MAX_USER = 5;
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", ...CORS } });

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

  if (!(await allow(env, "resend-ip", ip, RATE_MAX_IP)))
    return json({ error: "Too many attempts, try again later." }, 429);
  if (!(await allow(env, "resend-user", username.toLowerCase(), RATE_MAX_USER)))
    return json({ error: "We've already sent several codes recently — check your email (and spam), then try again later." }, 429);

  let row;
  try { row = await env.haven_builds.prepare(
    "SELECT username, email, verified FROM contest_accounts WHERE username_lc=?"
  ).bind(username.toLowerCase()).first(); } catch { return json({ error: "server error" }, 500); }
  if (!row) return json({ error: "No such account." }, 404);
  if (row.verified) return json({ ok: true, message: "That account is already verified — please log in." });

  const code = newCode();
  const codeExpiry = Math.floor(Date.now() / 1000) + CODE_TTL_SEC;
  try { await env.haven_builds.prepare(
    "UPDATE contest_accounts SET code=?, code_expiry=?, code_tries=0 WHERE username_lc=?"
  ).bind(code, codeExpiry, username.toLowerCase()).run(); } catch { return json({ error: "server error" }, 500); }

  await sendEmail({
    env, to: row.email, subject: "Your new Haven Challenge verification code",
    text: `Your Haven Challenge verification code is ${code}. It expires in 20 minutes.`,
    html: `<p>Your Haven Challenge verification code is:</p><p style="font-size:22px;font-weight:bold;letter-spacing:3px;">${code}</p><p>It expires in 20 minutes.</p>`,
  });

  return json({ ok: true, message: "A new code is on its way — check your email." });
}
