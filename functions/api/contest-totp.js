// POST /api/contest-totp — authenticator-app enrollment for Challenge
// contest accounts, requires an active session (see contest-login.js). Same
// two-step pattern as customer-totp.js: generate, then confirm with a code
// from the app before it becomes usable for login.
//
// Body: { action: 'enroll_start' } -> { secret, uri }
//       { action: 'enroll_confirm', totp } -> { ok:true }
import { readSession } from "../_lib/account.js";
import { newTotpSecret, totpUri, verifyTotp } from "../_lib/auth.js";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", ...CORS } });

export async function onRequestOptions() { return new Response(null, { status: 204, headers: CORS }); }

export async function onRequestPost({ request, env }) {
  const username = await readSession(env, request.headers.get("Cookie"));
  if (!username) return json({ error: "not signed in" }, 401);

  let b; try { b = await request.json(); } catch { return json({ error: "invalid request" }, 400); }
  const action = (b.action || "").trim();

  if (action === "enroll_start") {
    const secret = newTotpSecret();
    await env.haven_builds.prepare("UPDATE contest_accounts SET totp_secret=? WHERE username_lc=?").bind(secret, username.toLowerCase()).run();
    return json({ secret, uri: totpUri(secret, username, "Haven Challenge") });
  }

  if (action === "enroll_confirm") {
    const row = await env.haven_builds.prepare("SELECT totp_secret FROM contest_accounts WHERE username_lc=?").bind(username.toLowerCase()).first();
    if (!row?.totp_secret) return json({ error: "start enrollment first" }, 400);
    const good = await verifyTotp(row.totp_secret, b.totp);
    if (!good) return json({ error: "Invalid code — check your authenticator app and try again." }, 401);
    await env.haven_builds.prepare("UPDATE contest_accounts SET totp_enrolled_at=datetime('now') WHERE username_lc=?").bind(username.toLowerCase()).run();
    return json({ ok: true });
  }

  return json({ error: "unknown action" }, 400);
}
