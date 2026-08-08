// POST /api/checkout — step 2: the customer has picked one of the options
// /api/register returned; this call resolves the price SERVER-SIDE from the
// plan name only (never trusts a client-supplied rate — that would let a
// tampered request buy a $10/mo plan at $4/mo), writes/updates the
// subscriptions row, and either:
//   - test mode: marks it active immediately (a simulated purchase — no
//     money moves, nothing reaches Stripe). Fully working today.
//   - production, STRIPE_SECRET_KEY configured: creates a real Stripe
//     Checkout Session (price built inline via price_data, so no
//     dashboard-side Price objects are required) and returns its URL to
//     redirect the customer to. The row is written now with
//     stripe_subscription_id NULL / status='active' as an optimistic
//     placeholder — NOT correct for a real launch. The right production
//     pattern is: write nothing here, create the row from a
//     `checkout.session.completed` webhook instead, so a customer who
//     abandons Checkout never gets a phantom active row. That webhook
//     endpoint does not exist yet — this path is shaped correctly against
//     Stripe's REST API (verified against current Stripe docs) but is
//     UNTESTED, since this environment has no live or test Stripe key.
//   - production, no STRIPE_SECRET_KEY: 501, clearly, rather than silently
//     pretending to succeed.
//
// Body: { serial, email, flavor, plan, billing_cadence, squad_choice?, test_key? }
//   squad_choice required + only meaningful when plan='squad_member':
//     'trim_new'     — new subscription ends when the existing one already does
//     'extend_leader'— the existing (leader) subscription is pushed out a full
//                      year to match a fresh full-length new term
import { isTestRequest } from "../_lib/testmode.js";
import {
  RATE_CENTS_PER_MONTH, findOrCreateCustomer, findSubscriptionBySerial,
  founderSlotAvailable, existingActiveSubscription, createSubscription, syncCurrentPeriodEnd,
} from "../_lib/pricing.js";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", ...CORS } });
const isEmail = (e) => typeof e === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim()) && e.length <= 254;
const isSerial = (s) => typeof s === "string" && /^[A-Za-z0-9-]{6,64}$/.test(s);
const PLANS = new Set(["monthly", "standard_annual", "founder", "squad_member", "challenge"]);
const CADENCES = { monthly: ["monthly"], standard_annual: ["annual_lump", "annual_installments"], founder: ["annual_lump", "annual_installments"], squad_member: ["annual_lump", "annual_installments"], challenge: ["annual_lump", "annual_installments"] };

function addMonths(iso, n) { const d = new Date(iso); d.setUTCMonth(d.getUTCMonth() + n); return d.toISOString(); }
function addYears(iso, n) { const d = new Date(iso); d.setUTCFullYear(d.getUTCFullYear() + n); return d.toISOString(); }

export async function onRequestOptions() { return new Response(null, { status: 204, headers: CORS }); }

export async function onRequestPost({ request, env }) {
  let b; try { b = await request.json(); } catch { return json({ error: "invalid request" }, 400); }
  const serial = (b.serial || "").trim(), email = (b.email || "").trim().toLowerCase();
  const flavor = (b.flavor || "").trim().toLowerCase() || "unknown";
  const plan = (b.plan || "").trim();
  const cadence = (b.billing_cadence || "").trim();
  if (!isSerial(serial)) return json({ error: "a valid Haven serial is required" }, 400);
  if (!isEmail(email)) return json({ error: "enter a valid email address" }, 400);
  if (!PLANS.has(plan)) return json({ error: "unknown plan" }, 400);
  if (!CADENCES[plan].includes(cadence)) return json({ error: `${plan} cannot be billed ${cadence || "(none given)"}` }, 400);
  if (plan === "squad_member" && !["trim_new", "extend_leader"].includes(b.squad_choice)) {
    return json({ error: "squad_choice must be trim_new or extend_leader" }, 400);
  }

  const { isTest } = isTestRequest(env, serial, b.test_key);
  const now = new Date().toISOString();

  let customer;
  try { customer = await findOrCreateCustomer(env, email); }
  catch { return json({ error: "server error" }, 500); }

  // Re-derive eligibility server-side — never trust that what /api/register
  // offered a moment ago still holds (a Founder slot can fill, a squad
  // leader can lapse, in the gap between the two calls).
  let existingOnSerial;
  try { existingOnSerial = await findSubscriptionBySerial(env, serial); } catch { existingOnSerial = null; }
  const isFreeChallengeUpgrade = existingOnSerial && existingOnSerial.plan === "challenge" && existingOnSerial.rate_cents_per_month === 0;
  if (existingOnSerial && !isFreeChallengeUpgrade) {
    return json({ error: "this router already has a subscription", subscription: existingOnSerial }, 409);
  }

  let squadLeader = null;
  if (plan === "founder") {
    let open = false;
    try { open = await founderSlotAvailable(env, flavor); } catch { open = false; }
    if (!open) return json({ error: "Founder pricing for this flavor is no longer available — the first 100 are taken." }, 409);
  }
  if (plan === "squad_member") {
    try { squadLeader = await existingActiveSubscription(env, customer.id, isTest); } catch { squadLeader = null; }
    if (!squadLeader) return json({ error: "no existing active subscription to sync with" }, 409);
  }

  const rate = plan === "challenge" ? RATE_CENTS_PER_MONTH.challenge : RATE_CENTS_PER_MONTH[plan];

  // Resolve the term end. Squad's synchronized-expiration rule (pricing spec
  // §3) governs the squad_member branch; everything else is a plain term
  // from today, regardless of lump-sum vs. monthly-installment cadence — the
  // discount is earned by the 12-month commitment, cadence only changes when
  // the card is charged (§6), never how long the term is.
  let currentPeriodEnd;
  if (plan === "squad_member") {
    if (b.squad_choice === "trim_new") {
      currentPeriodEnd = squadLeader.current_period_end || addYears(now, 1);
    } else {
      currentPeriodEnd = addYears(now, 1);
      try { await syncCurrentPeriodEnd(env, squadLeader.serial, currentPeriodEnd); } catch { return json({ error: "server error" }, 500); }
    }
  } else {
    currentPeriodEnd = plan === "monthly" ? addMonths(now, 1) : addYears(now, 1);
  }

  // ---- Test mode: simulate the purchase now, real D1 write, no Stripe. ----
  if (isTest) {
    try {
      if (isFreeChallengeUpgrade) {
        await env.haven_builds.prepare(
          `UPDATE subscriptions SET plan=?, rate_cents_per_month=?, billing_cadence=?, status='active',
             squad_role=?, current_period_end=?, is_test=1, modified_datetime=? WHERE id=?`
        ).bind(plan, rate, cadence, plan === "squad_member" ? "member" : null, currentPeriodEnd, now, existingOnSerial.id).run();
      } else {
        await createSubscription(env, {
          customerId: customer.id, serial, flavor, plan, rateCentsPerMonth: rate, billingCadence: cadence,
          squadRole: plan === "squad_member" ? "member" : null, currentPeriodEnd, isTest: true,
        });
      }
    } catch (e) {
      if (String(e).includes("UNIQUE")) return json({ error: "this router already has a subscription" }, 409);
      return json({ error: "server error" }, 500);
    }
    return json({ ok: true, test: true, simulated: true, plan, rate_cents_per_month: rate, current_period_end: currentPeriodEnd });
  }

  // ---- Production: real money. Refuse cleanly if Stripe isn't configured
  // rather than faking success. ----
  if (!env.STRIPE_SECRET_KEY) {
    return json({ error: "Checkout is not connected to Stripe yet in this environment — this purchase cannot be completed." }, 501);
  }

  const productName = {
    monthly: "Haven subscription — monthly",
    standard_annual: "Haven subscription — annual",
    founder: "Haven subscription — Founder (lifetime $4/mo)",
    squad_member: "Haven subscription — Squad member",
    challenge: "Haven subscription — Halloween Challenge year",
  }[plan];
  const interval = cadence === "monthly" || cadence === "annual_installments" ? "month" : "year";
  const unitAmount = interval === "year" ? rate * 12 : rate;

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
  form.set("metadata[customer_id]", String(customer.id));
  form.set("metadata[serial]", serial);
  form.set("metadata[flavor]", flavor);
  form.set("metadata[plan]", plan);
  form.set("metadata[billing_cadence]", cadence);
  if (cadence === "annual_installments") {
    // Enforce the 12-month commitment as an actual billing boundary: stop
    // charging after ~12 months rather than rolling over silently. Renewal
    // is a deliberate new checkout, not an auto-continuing subscription.
    form.set("subscription_data[cancel_at]", String(Math.floor(new Date(addYears(now, 1)).getTime() / 1000)));
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
