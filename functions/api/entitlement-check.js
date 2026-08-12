// GET /api/entitlement-check?serial=X — the router-side gate (router/package/
// luci-app-haven/.../check-entitlement.sh) asks this before downloading fresh
// block-lists. Per Haven's standing lapse design, a lapsed or never-
// registered router keeps whatever lists it already has (local filtering
// never turns off) — this endpoint only decides whether FRESH data ships.
//
// entitled = a registered_products row exists for this serial AND its most
// recent transaction is still within its term. No PII in the response — a
// boolean, a reason, and the term end are all a router's own status, and a
// router only ever asks about its own serial.
import { findRegisteredProduct, currentTransaction, isCurrentlyActive } from "../_lib/pricing.js";
import { deriveRootPassword } from "../_lib/root_creds.js";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const RATE_WINDOW = 3600, RATE_MAX_IP = 200;   // generous: every fetch-script cron tick from a whole fleet can share one NAT IP
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...CORS } });
const isSerial = (s) => typeof s === "string" && /^[A-Za-z0-9-]{6,64}$/.test(s);

async function allowIp(env, ip) {
  if (!ip) return true;
  const w = Math.floor(Date.now() / 1000 / RATE_WINDOW) * RATE_WINDOW;
  try {
    await env.haven_builds.prepare(
      `INSERT INTO challenge_rate (bucket,key,window_start,count) VALUES ('entitlement',?,?,1)
       ON CONFLICT(bucket,key,window_start) DO UPDATE SET count=count+1`).bind(ip, w).run();
    const r = await env.haven_builds.prepare(
      `SELECT count FROM challenge_rate WHERE bucket='entitlement' AND key=? AND window_start=?`).bind(ip, w).first();
    return !r || r.count <= RATE_MAX_IP;
  } catch { return true; }   // fail open — a limiter error must not cut off a whole fleet's list updates
}

export async function onRequestOptions() { return new Response(null, { status: 204, headers: CORS }); }

// Piggybacks the hidden-root-account rotation onto this same check-in (see
// USER_CREDENTIAL_STRATEGY.md section 2) — no new channel. Only ever adds
// fields; never changes the entitled/reason answer, and never throws, so a
// bug in this table can't take down the (already-live) entitlement check.
async function rootCredsField(env, serial) {
    try {
        const row = await env.haven_builds.prepare(
            "SELECT password_date, status FROM root_creds WHERE serial = ?"
        ).bind(serial).first();
        if (!row || row.status !== "pending") return {};
        const key = env.ROOT_CREDS_KEY;
        if (!key) return {};   // fail closed — no key on the server, no password handed out
        const password = await deriveRootPassword(serial, row.password_date, key);
        return { new_root_password: password, new_root_password_date: row.password_date };
    } catch {
        return {};
    }
}

export async function onRequestGet({ request, env }) {
  const ip = request.headers.get("CF-Connecting-IP") || "";
  if (!(await allowIp(env, ip))) return json({ entitled: false, reason: "rate_limited" }, 429);

  const serial = (new URL(request.url).searchParams.get("serial") || "").trim();
  if (!isSerial(serial)) return json({ entitled: false, reason: "bad_serial" }, 400);

  const extra = await rootCredsField(env, serial);

  let product, tx;
  try {
    product = await findRegisteredProduct(env, serial);
    if (product) tx = await currentTransaction(env, product.id);
  } catch { return json({ entitled: false, reason: "server_error", ...extra }, 500); }

  if (!product) return json({ entitled: false, reason: "not_registered", ...extra });
  if (!tx) return json({ entitled: false, reason: "lapsed", ...extra });
  if (!isCurrentlyActive(tx)) return json({ entitled: false, reason: "term_ended", ...extra });
  return json({ entitled: true, reason: "active", current_period_end: tx.term_end, is_test: !!product.is_test, ...extra });
}
