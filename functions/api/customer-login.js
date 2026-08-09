// POST /api/customer-login — passwordless login/signup for the product-
// customer realm. One email box serves both: entering a never-seen email
// and completing its code creates the account (spec §7). TOTP is primary
// once a customer has enrolled (see customer-totp.js); the emailed code is
// the universal fallback, always available, no SMS anywhere.
//
// Body: { action, email, code?, totp? }
//   'check'        -> { exists, totp_enrolled }            (no side effects)
//   'request_code' -> emails a 6-digit login code           { sent:true }
//   'verify_code'  -> consumes the code, creates session    { ok:true }
//   'verify_totp'  -> checks the TOTP, creates session      { ok:true }
import { rules as authRules, issueEmailCode, verifyEmailCode, verifyTotp, makeSession, sessionCookie, clearedSessionCookie } from "../_lib/auth.js";
import { findCustomerByEmail, findOrCreateCustomer } from "../_lib/pricing.js";
import { sendEmail } from "../_lib/email.js";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, DELETE, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const RATE_WINDOW = 900, RATE_MAX = 10;
const json = (b, s = 200, extra = {}) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", ...CORS, ...extra } });

async function allow(env, key) {
  if (!key) return true;
  const w = Math.floor(Date.now() / 1000 / RATE_WINDOW) * RATE_WINDOW;
  try {
    await env.haven_builds.prepare(
      `INSERT INTO challenge_rate (bucket,key,window_start,count) VALUES ('customer_login',?,?,1)
       ON CONFLICT(bucket,key,window_start) DO UPDATE SET count=count+1`).bind(key, w).run();
    const r = await env.haven_builds.prepare(
      `SELECT count FROM challenge_rate WHERE bucket='customer_login' AND key=? AND window_start=?`).bind(key, w).first();
    return !r || r.count <= RATE_MAX;
  } catch { return true; }
}

export async function onRequestOptions() { return new Response(null, { status: 204, headers: CORS }); }

export async function onRequestPost({ request, env }) {
  const ip = request.headers.get("CF-Connecting-IP") || "";
  let b; try { b = await request.json(); } catch { return json({ error: "invalid request" }, 400); }
  const email = (b.email || "").trim().toLowerCase();
  const action = (b.action || "").trim();
  if (!authRules.email(email)) return json({ error: "enter a valid email address" }, 400);
  if (!(await allow(env, "ip:" + ip)) || !(await allow(env, "e:" + email))) {
    return json({ error: "Too many attempts. Wait a few minutes and try again." }, 429);
  }

  if (action === "check") {
    const customer = await findCustomerByEmail(env, email);
    return json({ exists: !!customer, totp_enrolled: !!customer?.totp_enrolled_at });
  }

  if (action === "request_code") {
    const code = await issueEmailCode(env, "customer", email, "login");
    await sendEmail({
      env, to: email, subject: "Your Haven sign-in code",
      text: `Your Haven sign-in code is ${code}. It expires in 10 minutes.`,
      html: `<p>Your Haven sign-in code is:</p><p style="font-size:22px;font-weight:bold;letter-spacing:3px;">${code}</p><p>It expires in 10 minutes.</p>`,
    });
    return json({ sent: true });
  }

  if (action === "verify_code") {
    if (!authRules.code(b.code)) return json({ error: "enter the 6-digit code" }, 400);
    const good = await verifyEmailCode(env, "customer", email, "login", b.code);
    if (!good) return json({ error: "Invalid or expired code." }, 401);
    const customer = await findOrCreateCustomer(env, email);
    const cookie = sessionCookie("customer", await makeSession(env, "customer", email));
    return json({ ok: true, email, totp_enrolled: !!customer.totp_enrolled_at }, 200, { "Set-Cookie": cookie });
  }

  if (action === "verify_totp") {
    const customer = await findCustomerByEmail(env, email);
    if (!customer || !customer.totp_enrolled_at) return json({ error: "authenticator app is not set up for this account" }, 400);
    const good = await verifyTotp(customer.totp_secret, b.totp);
    if (!good) return json({ error: "Invalid code." }, 401);
    const cookie = sessionCookie("customer", await makeSession(env, "customer", email));
    return json({ ok: true, email, totp_enrolled: true }, 200, { "Set-Cookie": cookie });
  }

  return json({ error: "unknown action" }, 400);
}

export async function onRequestDelete() {
  return json({ ok: true }, 200, { "Set-Cookie": clearedSessionCookie("customer") });
}
