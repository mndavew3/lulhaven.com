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

// Is there still room in this flavor's first-100 Founder cohort? Test-mode
// rows (is_test=1) never count against or claim a real cohort slot — a bench
// tester running the flow 50 times must never exhaust real customers' Founder
// pool, and a test purchase must never itself claim one either.
// Plain COUNT is fine at this volume (at most a few hundred rows, ever) — no
// atomic-counter table the way the Challenge's claim-ordering needed.
export async function founderSlotAvailable(env, flavor) {
  const row = await env.haven_builds
    .prepare("SELECT COUNT(*) AS n FROM subscriptions WHERE plan='founder' AND flavor=? AND is_test=0")
    .bind(flavor).first();
  return (row?.n ?? 0) < FOUNDER_COHORT_SIZE;
}

// Does this customer already have another ACTIVE subscription right now?
// That's the sole trigger for Squad pricing — not how many routers they own,
// how many subscriptions are currently paid up. isTest scopes the lookup to
// the same lane as the current request, so a test run never sees (or synchs
// expiration against) a customer's real subscriptions, and vice versa.
export async function existingActiveSubscription(env, customerId, isTest = false) {
  return env.haven_builds
    .prepare("SELECT id, serial, plan, rate_cents_per_month, current_period_end " +
             "FROM subscriptions WHERE customer_id=? AND status='active' AND is_test=? ORDER BY id LIMIT 1")
    .bind(customerId, isTest ? 1 : 0).first();
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
  squadRole = null, currentPeriodEnd = null, challengeYear = null, isTest = false,
}) {
  const now = new Date().toISOString();
  const founderClaimedAt = plan === "founder" ? now : null;
  return env.haven_builds.prepare(
    `INSERT INTO subscriptions
       (customer_id, serial, flavor, plan, rate_cents_per_month, billing_cadence,
        status, founder_claimed_datetime, squad_role, current_period_end,
        challenge_year, is_test, created_datetime, modified_datetime)
     VALUES (?, ?, ?, ?, ?, ?, 'active', ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    customerId, serial, flavor, plan, rateCentsPerMonth, billingCadence,
    founderClaimedAt, squadRole, currentPeriodEnd, challengeYear, isTest ? 1 : 0, now, now
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

// customers.email is UNIQUE — find-or-create is the one place a new customer
// identity comes into being, for both direct registration and a Challenge
// claim's automatic grant.
export async function findOrCreateCustomer(env, email) {
  const existing = await env.haven_builds.prepare("SELECT id, email FROM customers WHERE email=?").bind(email).first();
  if (existing) return existing;
  const now = new Date().toISOString();
  const res = await env.haven_builds.prepare(
    "INSERT INTO customers (email, created_datetime) VALUES (?, ?)"
  ).bind(email, now).run();
  return { id: res.meta.last_row_id, email };
}

// subscriptions.serial is UNIQUE — one row per router, its CURRENT state.
// A Challenge free-month grant and a later real purchase for the same router
// are the same row over time (e.g. a claim grants a free month, then the
// customer exercises the $48/yr Challenge offer for that same serial before
// it lapses) — never a second row, since a router has exactly one active
// subscription state at once.
export async function findSubscriptionBySerial(env, serial) {
  return env.haven_builds
    .prepare("SELECT id, customer_id, plan, rate_cents_per_month, current_period_end, is_test FROM subscriptions WHERE serial=?")
    .bind(serial).first();
}

// Halloween Challenge free-month grant (pricing spec §4): the FIRST successful
// claim during an active contest earns a free subscription on the claiming
// router, running through the contest close (CONTEST_END, else Nov 1 of the
// current year) — not a priced plan, rate_cents_per_month=0. Idempotent per
// customer per year: a customer's 2nd/3rd claim earns no additional grant,
// per "registration = claiming your FIRST bug or flaw." Returns
// {granted:false} without writing anything if already granted this year, or
// if this exact serial already carries some other subscription (never
// overwrite a real paid row with a free one).
export async function grantChallengeFreeMonth(env, { email, serial, flavor, isTest = false }) {
  const year = new Date().getUTCFullYear();
  const customer = await findOrCreateCustomer(env, email);

  const already = await env.haven_builds.prepare(
    "SELECT id FROM subscriptions WHERE customer_id=? AND plan='challenge' AND challenge_year=?"
  ).bind(customer.id, year).first();
  if (already) return { granted: false, reason: "already granted this year", customerId: customer.id };

  const bySerial = await findSubscriptionBySerial(env, serial);
  if (bySerial) return { granted: false, reason: "serial already has a subscription", customerId: customer.id };

  const now = new Date().toISOString();
  const env_end = env.CONTEST_END ? new Date(Number(env.CONTEST_END) * 1000).toISOString() : `${year}-11-01T00:00:00.000Z`;
  await env.haven_builds.prepare(
    `INSERT INTO subscriptions
       (customer_id, serial, flavor, plan, rate_cents_per_month, billing_cadence,
        status, current_period_end, challenge_year, is_test, created_datetime, modified_datetime)
     VALUES (?, ?, ?, 'challenge', 0, 'free', 'active', ?, ?, ?, ?, ?)`
  ).bind(customer.id, serial, flavor || "unknown", env_end, year, isTest ? 1 : 0, now, now).run();

  return { granted: true, customerId: customer.id, currentPeriodEnd: env_end };
}
