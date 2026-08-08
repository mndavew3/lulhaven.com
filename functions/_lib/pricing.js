// Haven product subscription pricing — resolves rates and enforces the rules
// locked in specs/2026-08-08-haven-subscription-pricing-v2.md. Single source
// of truth for these numbers so register/checkout/webhook can't drift from
// each other. D1 binding is env.haven_builds throughout.

export const RATE_CENTS_PER_MONTH = {
  monthly:          1000,   // $10/mo, no discount, ever
  standard_annual:   800,   // $8/mo ($96/yr)
  founder:           400,   // $4/mo ($48/yr)
  squad_member:      400,   // $4/mo ($48/yr)
  challenge:         400,   // $4/mo ($48/yr), one year only
};

export const FOUNDER_COHORT_SIZE = 100;   // per flavor, not global

// Is there still room in this flavor's first-100 Founder cohort?
// Plain COUNT is fine at this volume (at most a few hundred rows, ever) — no
// atomic-counter table the way the Challenge's claim-ordering needed.
export async function founderSlotAvailable(env, flavor) {
  const row = await env.haven_builds
    .prepare("SELECT COUNT(*) AS n FROM subscriptions WHERE plan='founder' AND flavor=?")
    .bind(flavor).first();
  return (row?.n ?? 0) < FOUNDER_COHORT_SIZE;
}

// Does this customer already have another ACTIVE subscription right now?
// That's the sole trigger for Squad pricing — not how many routers they own,
// how many subscriptions are currently paid up.
export async function existingActiveSubscription(env, customerId) {
  return env.haven_builds
    .prepare("SELECT id, serial, plan, rate_cents_per_month, current_period_end " +
             "FROM subscriptions WHERE customer_id=? AND status='active' ORDER BY id LIMIT 1")
    .bind(customerId).first();
}

// Squad choice: called when a customer with an existing active subscription
// is adding another. Returns the two real options so the caller (the
// register endpoint) can show them to the customer — this is a customer
// choice, never automatic. Neither option changes the EXISTING subscription's
// rate; only whether the new one is independent or synced determines
// anything, per the locked design (the leader never gets cheaper).
export function squadOptions(existing) {
  return {
    independent: {
      plan: "standard_annual",
      rate_cents_per_month: RATE_CENTS_PER_MONTH.standard_annual,
      note: "Own full year, no connection to your other subscription.",
    },
    synced_member: {
      plan: "squad_member",
      rate_cents_per_month: RATE_CENTS_PER_MONTH.squad_member,
      synced_to_serial: existing.serial,
      current_period_end: existing.current_period_end,
      note: "Ends the same day as your existing subscription — $4/mo instead of $8.",
    },
  };
}

// Resolve the plan+rate for a brand-new subscription with no existing active
// subscription on the account, and no Founder/Challenge eligibility — the
// plain default case.
export function defaultPlan(billingCadence) {
  if (billingCadence === "monthly") {
    return { plan: "monthly", rate_cents_per_month: RATE_CENTS_PER_MONTH.monthly };
  }
  return { plan: "standard_annual", rate_cents_per_month: RATE_CENTS_PER_MONTH.standard_annual };
}

// Insert a new subscription row. Caller has already resolved plan/rate/cadence
// (via the functions above) and, for Squad, already captured the customer's
// independent-vs-synced choice.
export async function createSubscription(env, {
  customerId, serial, flavor, plan, rateCentsPerMonth, billingCadence,
  squadRole = null, currentPeriodEnd = null, challengeYear = null,
}) {
  const now = new Date().toISOString();
  const founderClaimedAt = plan === "founder" ? now : null;
  return env.haven_builds.prepare(
    `INSERT INTO subscriptions
       (customer_id, serial, flavor, plan, rate_cents_per_month, billing_cadence,
        status, founder_claimed_datetime, squad_role, current_period_end,
        challenge_year, created_datetime, modified_datetime)
     VALUES (?, ?, ?, ?, ?, ?, 'active', ?, ?, ?, ?, ?, ?)`
  ).bind(
    customerId, serial, flavor, plan, rateCentsPerMonth, billingCadence,
    founderClaimedAt, squadRole, currentPeriodEnd, challengeYear, now, now
  ).run();
}

// A synced Squad addition also needs the EXISTING (leader) row's
// current_period_end extended to match, when the customer chose "extend the
// existing one" rather than "trim the new one" — the caller decides which,
// this just applies it. Never changes rate_cents_per_month on the leader row:
// synchronizing dates is not a discount.
export async function syncCurrentPeriodEnd(env, serial, newPeriodEnd) {
  return env.haven_builds
    .prepare("UPDATE subscriptions SET current_period_end=?, modified_datetime=? WHERE serial=?")
    .bind(newPeriodEnd, new Date().toISOString(), serial).run();
}
