// POST /api/checkout — step 2: the customer picked one of the options
// /api/register returned; this call resolves the price SERVER-SIDE (never
// trusts a client-supplied rate) and writes the transaction, either:
//   - test mode: commits immediately (a simulated purchase — no money
//     moves, nothing reaches Stripe). Fully working today.
//   - production, STRIPE_SECRET_KEY configured: creates a real Stripe
//     Checkout Session (price built inline via price_data — no dashboard-
//     side Price objects required) and returns its URL. The transaction row
//     is written now as an optimistic placeholder — NOT correct for a real
//     launch (the right pattern is a `checkout.session.completed` webhook,
//     which does not exist yet). Shaped against current Stripe REST docs but
//     UNTESTED — no live/test Stripe key in this environment.
//   - production, no STRIPE_SECRET_KEY: 501, clearly, rather than silently
//     pretending to succeed.
//
// Body: { serial, email, flavor, tier, billing_cadence, sync_choice?, test_key? }
//   tier: 'single' | 'subsequent' | 'founder' — 'founder' is a REQUEST, only
//     honored at first registration when a cohort slot is open; the actual
//     tier charged is always re-resolved server-side.
//   sync_choice: 'trim_new' | 'extend_all' — required only when billing
//     for an annual term and another product is currently active.
import { isTestRequest } from "../_lib/testmode.js";
import { purchase, PricingError } from "../_lib/pricing.js";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", ...CORS } });
const isEmail = (e) => typeof e === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim()) && e.length <= 254;
const isSerial = (s) => typeof s === "string" && /^[A-Za-z0-9-]{6,64}$/.test(s);
const TIERS = new Set(["single", "subsequent", "founder"]);
const CADENCES = new Set(["annual", "monthly"]);

function addYears(iso, n) { const d = new Date(iso); d.setUTCFullYear(d.getUTCFullYear() + n); return d.toISOString(); }

export async function onRequestOptions() { return new Response(null, { status: 204, headers: CORS }); }

export async function onRequestPost({ request, env }) {
  let b; try { b = await request.json(); } catch { return json({ error: "invalid request" }, 400); }
  const serial = (b.serial || "").trim(), email = (b.email || "").trim().toLowerCase();
  const flavor = (b.flavor || "").trim().toLowerCase() || "unknown";
  const tier = (b.tier || "").trim();
  const billingCadence = (b.billing_cadence || "").trim();
  const syncChoice = b.sync_choice || null;
  if (!isSerial(serial)) return json({ error: "a valid Haven serial is required" }, 400);
  if (!isEmail(email)) return json({ error: "enter a valid email address" }, 400);
  if (!TIERS.has(tier)) return json({ error: "unknown tier" }, 400);
  if (!CADENCES.has(billingCadence)) return json({ error: "billing_cadence must be annual or monthly" }, 400);
  if (syncChoice && !["trim_new", "extend_all"].includes(syncChoice)) return json({ error: "sync_choice must be trim_new or extend_all" }, 400);

  const { isTest } = isTestRequest(env, serial, b.test_key);

  // ---- Test mode: simulate the purchase now, real D1 write, no Stripe. ----
  if (isTest) {
    try {
      const result = await purchase(env, {
        serial, email, flavor, wantsFounder: tier === "founder", billingCadence, syncChoice, isTest: true,
      });
      return json({
        ok: true, test: true, simulated: true, tier: result.tier, is_founder: result.is_founder,
        rate_cents_per_month: result.rate_cents_per_month, current_period_end: result.term_end,
      });
    } catch (e) {
      if (e instanceof PricingError) return json({ error: e.message }, 409);
      if (String(e).includes("UNIQUE")) return json({ error: "this router already has a subscription" }, 409);
      return json({ error: "server error" }, 500);
    }
  }

  // ---- Production: real money. Refuse cleanly if Stripe isn't configured. ----
  if (!env.STRIPE_SECRET_KEY) {
    return json({ error: "Checkout is not connected to Stripe yet in this environment — this purchase cannot be completed." }, 501);
  }

  let result;
  try {
    result = await purchase(env, { serial, email, flavor, wantsFounder: tier === "founder", billingCadence, syncChoice, isTest: false });
  } catch (e) {
    if (e instanceof PricingError) return json({ error: e.message }, 409);
    if (String(e).includes("UNIQUE")) return json({ error: "this router already has a subscription" }, 409);
    return json({ error: "server error" }, 500);
  }

  const productName = {
    single: "Haven subscription",
    subsequent: "Haven subscription — additional router",
    founder: "Haven subscription — Founder (lifetime rate)",
  }[result.tier === "founder" || result.is_founder ? "founder" : result.tier];
  const interval = billingCadence === "monthly" ? "month" : "year";
  const unitAmount = interval === "year" ? result.rate_cents_per_month * 12 : result.rate_cents_per_month;

  const form = new URLSearchParams();
  form.set("mode", "subscription");
  form.set("customer_email", email);
  form.set("client_reference_id", serial);
  form.set("success_url", `https://lulhaven.com/register?serial=${encodeURIComponent(serial)}&status=success`);
  form.set("cancel_url", `https://lulhaven.com/register?serial=${encodeURIComponent(serial)}&status=cancel`);
  form.set("line_items[0][quantity]", "1");
  form.set("line_items[0][price_data][currency]", "usd");
  form.set("line_items[0][price_data][unit_amount]", String(unitAmount));
  form.set("line_items[0][price_data][product_data][name]", productName);
  form.set("line_items[0][price_data][recurring][interval]", interval);
  form.set("metadata[customer_id]", String(result.customerId));
  form.set("metadata[serial]", serial);
  form.set("metadata[flavor]", flavor);
  form.set("metadata[tier]", result.tier);
  form.set("metadata[billing_cadence]", billingCadence);
  if (billingCadence === "annual") {
    // The 12-month commitment is an actual billing boundary, not a rolling
    // subscription — renewal is a deliberate new checkout.
    form.set("subscription_data[cancel_at]", String(Math.floor(new Date(addYears(result.term_start, 1)).getTime() / 1000)));
  }

  let stripeRes;
  try {
    stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${env.STRIPE_SECRET_KEY}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
    });
  } catch {
    return json({ error: "could not reach Stripe" }, 502);
  }
  const stripeBody = await stripeRes.json().catch(() => null);
  if (!stripeRes.ok || !stripeBody?.url) {
    return json({ error: stripeBody?.error?.message || "Stripe checkout session could not be created" }, 502);
  }

  return json({ ok: true, test: false, checkout_url: stripeBody.url });
}
