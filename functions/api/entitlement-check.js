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
//
// CONTEST FREE GRANT (Dave, 2026-09-14): while CONTEST_ACTIVE=1, an otherwise
// unentitled serial gets exactly ONE entitled=true answer, provided it's a
// real provisioned unit (present in issued_serials — closes the made-up-
// serial abuse path). The grant is recorded and never repeats, even across
// contest windows in future years. This is deliberately narrower than a
// subscription grant: no customer row, no email, no transaction — it exists
// only to make good on "your blocklists update for free while the Challenge
// is open," and it stops the instant the flag comes down.
import { findRegisteredProduct, currentTransaction, isCurrentlyActive } from "../_lib/pricing.js";

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

// The hidden-root-account rotation that used to piggyback on this check-in is
// RETIRED (2026-09-09 — Haven keeps no way into a customer's router;
// USER_CREDENTIAL_STRATEGY.md §9). No credential fields ride this response.

export async function onRequestGet({ request, env }) {
  const ip = request.headers.get("CF-Connecting-IP") || "";
  if (!(await allowIp(env, ip))) return json({ entitled: false, reason: "rate_limited" }, 429);

  const serial = (new URL(request.url).searchParams.get("serial") || "").trim();
  if (!isSerial(serial)) return json({ entitled: false, reason: "bad_serial" }, 400);

  let product, tx;
  try {
    product = await findRegisteredProduct(env, serial);
    if (product) tx = await currentTransaction(env, product.id);
  } catch { return json({ entitled: false, reason: "server_error" }, 500); }

  if (product && tx && isCurrentlyActive(tx)) {
    return json({ entitled: true, reason: "active", current_period_end: tx.term_end, is_test: !!product.is_test });
  }

  // No active subscription. While the Challenge is live, give this serial its
  // one free grant — but only if it's a real provisioned unit and hasn't
  // already used it.
  const contestLive = env.CONTEST_ACTIVE === "1"
    && (!env.CONTEST_END || Math.floor(Date.now() / 1000) <= Number(env.CONTEST_END));
  if (contestLive) {
    try {
      const issued = await env.haven_builds.prepare(
        "SELECT 1 FROM issued_serials WHERE serial=?").bind(serial).first();
      if (issued) {
        const already = await env.haven_builds.prepare(
          "SELECT 1 FROM contest_free_feed_grant WHERE serial=?").bind(serial).first();
        if (!already) {
          await env.haven_builds.prepare(
            "INSERT INTO contest_free_feed_grant (serial, granted_datetime) VALUES (?, ?)"
          ).bind(serial, new Date().toISOString()).run();
          return json({ entitled: true, reason: "contest_free_grant" });
        }
      }
    } catch { /* fail closed into the normal reasons below on any DB error */ }
  }

  if (!product) return json({ entitled: false, reason: "not_registered" });
  if (!tx) return json({ entitled: false, reason: "lapsed" });
  return json({ entitled: false, reason: "term_ended" });
}
