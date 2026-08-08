// POST /api/register — step 1 of activating a subscription: given a serial +
// email (+ flavor, for Founder eligibility), resolve which plan options this
// customer can be offered. Does NOT create a subscription yet — Squad and the
// Challenge free-month-upgrade both require the customer's own choice, made
// on the follow-up call to /api/checkout. See specs/2026-08-08-haven-
// subscription-pricing-v2.md for the full rate table and rules this encodes.
//
// Body: { serial, email, flavor?, test_key? }
// Test-mode (functions/_lib/testmode.js) rows never touch the real Founder
// cohort or a real customer's Squad state — see pricing.js's is_test filtering.
import { isTestRequest } from "../_lib/testmode.js";
import {
  RATE_CENTS_PER_MONTH, findOrCreateCustomer, findSubscriptionBySerial,
  founderSlotAvailable, existingActiveSubscription, squadOptions,
} from "../_lib/pricing.js";

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

  let customer;
  try { customer = await findOrCreateCustomer(env, email); }
  catch { return json({ error: "server error" }, 500); }

  // Already has a row for this exact router? Report status rather than
  // re-offering pricing — UNLESS it's the Challenge's free-month grant
  // (rate_cents_per_month=0), which is an upgrade-eligible state, not a
  // terminal one: the customer can still exercise the one-time $48/yr offer.
  let existingOnSerial;
  try { existingOnSerial = await findSubscriptionBySerial(env, serial); }
  catch { return json({ error: "server error" }, 500); }

  if (existingOnSerial && !(existingOnSerial.plan === "challenge" && existingOnSerial.rate_cents_per_month === 0)) {
    return json({ ok: true, test: isTest, already_registered: true, subscription: existingOnSerial });
  }

  const options = [];
  if (existingOnSerial) {
    options.push({
      plan: "challenge", rate_cents_per_month: RATE_CENTS_PER_MONTH.challenge,
      billing_cadence_choices: ["annual_lump", "annual_installments"],
      note: "Your one-time Challenge-year price — $48/yr, good for this year only.",
    });
  } else {
    let existingActive;
    try { existingActive = await existingActiveSubscription(env, customer.id, isTest); }
    catch { existingActive = null; }

    if (existingActive) {
      const sq = squadOptions(existingActive);
      options.push(
        { ...sq.synced_member, billing_cadence_choices: ["annual_lump", "annual_installments"] },
        { ...sq.independent, billing_cadence_choices: ["annual_lump", "annual_installments"] },
      );
    } else {
      let founderOpen = false;
      if (flavor) { try { founderOpen = await founderSlotAvailable(env, flavor); } catch { founderOpen = false; } }
      if (founderOpen) {
        options.push({
          plan: "founder", rate_cents_per_month: RATE_CENTS_PER_MONTH.founder,
          billing_cadence_choices: ["annual_lump", "annual_installments"],
          note: "First 100 for this flavor — $4/mo for life, while your subscription never lapses.",
        });
      } else {
        options.push({
          plan: "standard_annual", rate_cents_per_month: RATE_CENTS_PER_MONTH.standard_annual,
          billing_cadence_choices: ["annual_lump", "annual_installments"],
          note: "$8/mo, billed for the year.",
        });
      }
    }
    options.push({
      plan: "monthly", rate_cents_per_month: RATE_CENTS_PER_MONTH.monthly,
      billing_cadence_choices: ["monthly"],
      note: "$10/mo, cancel anytime, no annual commitment.",
    });
  }

  return json({ ok: true, test: isTest, already_registered: false, customer_id: customer.id, flavor, options });
}
