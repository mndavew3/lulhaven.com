// POST /api/customer-totp — authenticator-app enrollment for the customer
// realm, requires an active session (from customer-login.js). Two-step:
// generate a secret (not yet trusted), then confirm with a code from the
// app before it becomes the account's enrolled secret — proves the customer
// actually captured it correctly.
//
// Body: { action: 'enroll_start' } -> { secret, uri }
//       { action: 'enroll_confirm', totp } -> { ok:true }
import { readSession, newTotpSecret, totpUri, verifyTotp } from "../_lib/auth.js";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", ...CORS } });

export async function onRequestOptions() { return new Response(null, { status: 204, headers: CORS }); }

export async function onRequestPost({ request, env }) {
  const email = await readSession(env, "customer", request.headers.get("Cookie"));
  if (!email) return json({ error: "not signed in" }, 401);

  let b; try { b = await request.json(); } catch { return json({ error: "invalid request" }, 400); }
  const action = (b.action || "").trim();

  if (action === "enroll_start") {
    const secret = newTotpSecret();
    // Held only as a pending secret until confirmed — totp_enrolled_at stays
    // NULL, so a half-finished enrollment never becomes a usable login path.
    await env.haven_builds.prepare("UPDATE customers SET totp_secret=? WHERE email=?").bind(secret, email).run();
    return json({ secret, uri: totpUri(secret, email) });
  }

  if (action === "enroll_confirm") {
    const row = await env.haven_builds.prepare("SELECT totp_secret FROM customers WHERE email=?").bind(email).first();
    if (!row?.totp_secret) return json({ error: "start enrollment first" }, 400);
    const good = await verifyTotp(row.totp_secret, b.totp);
    if (!good) return json({ error: "Invalid code — check your authenticator app and try again." }, 401);
    await env.haven_builds.prepare("UPDATE customers SET totp_enrolled_at=datetime('now') WHERE email=?").bind(email).run();
    return json({ ok: true });
  }

  return json({ error: "unknown action" }, 400);
}
