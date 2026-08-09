// POST /api/register — step 1 of activating a subscription: given a serial +
// email (+ flavor, for Founder eligibility), resolve which options this
// customer can be offered right now. Does NOT write a transaction — the
// customer's choice (which tier/cadence, and how a new annual term should
// sync with any other currently-active product) is only committed by the
// follow-up call to /api/checkout. See specs/2026-08-08-haven-subscription-
// pricing-v3.md.
//
// Body: { serial, email, flavor?, test_key? }
// Test-mode (functions/_lib/testmode.js) rows never touch the real Founder
// cohort or a real customer's active-companion state — see pricing.js's
// is_test filtering throughout.
import { isTestRequest } from "../_lib/testmode.js";
import { quote } from "../_lib/pricing.js";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", ...CORS } });
const isEmail = (e) => typeof e === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim()) && e.length <= 254;
const isSerial = (s) => typeof s === "string" && /^[A-Za-z0-9-]{6,64}$/.test(s);

export async function onRequestOptions() { return new Response(null, { status: 204, headers: CORS }); }

export async function onRequestPost({ request, env }) {
  let b; try { b = await request.json(); } catch { return json({ error: "invalid request" }, 400); }
  const serial = (b.serial || "").trim(), email = (b.email || "").trim().toLowerCase();
  const flavor = (b.flavor || "").trim().toLowerCase() || null;
  if (!isSerial(serial)) return json({ error: "a valid Haven serial is required" }, 400);
  if (!isEmail(email)) return json({ error: "enter a valid email address" }, 400);

  const { isTest } = isTestRequest(env, serial, b.test_key);

  let result;
  try { result = await quote(env, { serial, email, flavor, isTest }); }
  catch { return json({ error: "server error" }, 500); }

  if (result.status === "already_active") {
    return json({
      ok: true, test: isTest, already_registered: true,
      subscription: {
        tier: result.transaction.tier,
        rate_cents_per_month: result.transaction.rate_cents_per_month,
        billing_cadence: result.transaction.billing_cadence,
        current_period_end: result.transaction.term_end,
      },
    });
  }

  return json({
    ok: true, test: isTest, already_registered: false, customer_id: result.customerId, flavor,
    options: result.options.map(o => ({ ...o, wants_founder: o.tier === "founder" })),
    sync: result.sync,
  });
}
