// Haven product subscription pricing v3 — order-based single vs subsequent-
// router pricing, resolved FRESH at every purchase/renewal (never a sticky
// role), Founder pricing frozen per-product, append-only transaction ledger.
// See specs/2026-08-08-haven-subscription-pricing-v3.md. D1 binding is
// env.haven_builds throughout.

export const RATE_CENTS_PER_MONTH = {
  single_annual:       800,   // $8/mo ($96/yr) — nothing else covers the new period
  subsequent_annual:   400,   // $4/mo ($48/yr) — another product already covers the new period
  single_monthly:     1000,   // $10/mo, no annual commitment
  subsequent_monthly:  500,   // $5/mo — 50% of single, spec §4
  challenge:              0,  // free grant, one contest year
};
export const FOUNDER_COHORT_SIZE = 100;             // per flavor
// Today's Founder rate. Frozen onto each Founder product at the moment it's
// granted — a future change here never touches an already-registered
// Founder, and is its own "part number" even though it equals
// subsequent_annual today (spec §3).
export const FOUNDER_RATE_CENTS_PER_MONTH = 400;

export class PricingError extends Error {}

function addMonths(iso, n) { const d = new Date(iso); d.setUTCMonth(d.getUTCMonth() + n); return d.toISOString(); }
function addYears(iso, n) { const d = new Date(iso); d.setUTCFullYear(d.getUTCFullYear() + n); return d.toISOString(); }

// --- Founder cohort ---
export async function founderSlotAvailable(env, flavor, isTest = false) {
  const row = await env.haven_builds.prepare(
    "SELECT COUNT(*) AS n FROM registered_products WHERE is_founder=1 AND flavor=? AND is_test=?"
  ).bind(flavor, isTest ? 1 : 0).first();
  return (row?.n ?? 0) < FOUNDER_COHORT_SIZE;
}

// --- Customer identity: email only, no password (spec §7) ---
export async function findOrCreateCustomer(env, email) {
  const existing = await env.haven_builds.prepare(
    "SELECT id, email, totp_secret, totp_enrolled_at FROM customers WHERE email=?"
  ).bind(email).first();
  if (existing) return existing;
  const now = new Date().toISOString();
  const res = await env.haven_builds.prepare(
    "INSERT INTO customers (email, created_datetime) VALUES (?, ?)"
  ).bind(email, now).run();
  return { id: res.meta.last_row_id, email, totp_secret: null, totp_enrolled_at: null };
}
export async function findCustomerByEmail(env, email) {
  return env.haven_builds.prepare(
    "SELECT id, email, totp_secret, totp_enrolled_at FROM customers WHERE email=?"
  ).bind(email).first();
}

// --- Registered product: one row per router, forever ---
export async function findRegisteredProduct(env, serial) {
  return env.haven_builds.prepare(
    "SELECT id, customer_id, serial, flavor, is_founder, founder_rate_cents_per_month, is_test FROM registered_products WHERE serial=?"
  ).bind(serial).first();
}
export async function listRegisteredProducts(env, customerId, isTest = false) {
  const { results } = await env.haven_builds.prepare(
    "SELECT id, serial, flavor, is_founder, founder_rate_cents_per_month, registered_datetime FROM registered_products WHERE customer_id=? AND is_test=? ORDER BY registered_datetime"
  ).bind(customerId, isTest ? 1 : 0).all();
  return results || [];
}
async function insertRegisteredProduct(env, { customerId, serial, flavor, isFounder, isTest }) {
  await env.haven_builds.prepare(
    `INSERT INTO registered_products (customer_id, serial, flavor, is_founder, founder_rate_cents_per_month, is_test)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).bind(customerId, serial, flavor || null, isFounder ? 1 : 0, isFounder ? FOUNDER_RATE_CENTS_PER_MONTH : null, isTest ? 1 : 0).run();
}

// --- Current status: derived from the ledger, never separately maintained ---
export async function currentTransaction(env, registeredProductId) {
  return env.haven_builds.prepare(
    `SELECT id, tier, billing_cadence, rate_cents_per_month, term_start, term_end, kind
       FROM transactions WHERE registered_product_id=? AND status='active'
       ORDER BY term_end DESC LIMIT 1`
  ).bind(registeredProductId).first();
}
export function isCurrentlyActive(tx) {
  return !!tx && new Date(tx.term_end) > new Date();
}

// Any OTHER product of this customer covering `periodStart` or later right
// now (used only to decide whether the sync-choice UI is needed).
async function currentActiveCompanion(env, customerId, excludeProductId, isTest) {
  const now = new Date().toISOString();
  return env.haven_builds.prepare(
    `SELECT registered_product_id, term_end FROM transactions
       WHERE customer_id=? AND is_test=? AND status='active'
         AND registered_product_id != ? AND term_end > ?
       ORDER BY term_end DESC LIMIT 1`
  ).bind(customerId, isTest ? 1 : 0, excludeProductId, now).first();
}

// --- The order-based tier mechanism (spec §2) ---
// subsequent iff the customer has ANY OTHER registered_product whose latest
// active transaction's term_end reaches PAST periodStart — i.e. a product
// that already covers the period this transaction is about to buy. Strict
// `>`, not `>=`: two synced products sharing the exact same term_end must
// NOT see each other as "covering" that instant, or the first-to-renew of a
// synced pair would wrongly see a companion and both would drift to
// subsequent pricing forever (spec §2b — why synced dates are still load-
// bearing). Checked fresh every time; no sticky role anywhere.
export async function resolveTier(env, customerId, excludeProductId, periodStartIso, isTest) {
  const row = await env.haven_builds.prepare(
    `SELECT registered_product_id FROM transactions
       WHERE customer_id=? AND is_test=? AND status='active'
         AND registered_product_id != ? AND term_end > ?
       LIMIT 1`
  ).bind(customerId, isTest ? 1 : 0, excludeProductId, periodStartIso).first();
  return row ? "subsequent" : "single";
}

// --- Quote: what can this serial/email do right now? ---
export async function quote(env, { serial, email, flavor, isTest }) {
  const customer = await findOrCreateCustomer(env, email);
  const product = await findRegisteredProduct(env, serial);

  let currentTx = null;
  if (product) currentTx = await currentTransaction(env, product.id);
  if (product && currentTx && isCurrentlyActive(currentTx) && currentTx.rate_cents_per_month > 0) {
    return { status: "already_active", customerId: customer.id, product, transaction: currentTx };
  }

  const periodStart = new Date().toISOString();
  const options = [];

  if (product && product.is_founder) {
    options.push({
      tier: "founder", billing_cadence: "annual", rate_cents_per_month: product.founder_rate_cents_per_month,
      note: "Your Founder rate — locked in for life.",
    });
  } else {
    const tentativeTier = await resolveTier(env, customer.id, product ? product.id : -1, periodStart, isTest);
    let founderOpen = false;
    if (!product && flavor && tentativeTier === "single") {
      try { founderOpen = await founderSlotAvailable(env, flavor, isTest); } catch { founderOpen = false; }
    }
    if (founderOpen) {
      options.push({
        tier: "founder", billing_cadence: "annual", rate_cents_per_month: FOUNDER_RATE_CENTS_PER_MONTH,
        note: "First 100 for this flavor — locked in for life, while your subscription never lapses.",
      });
    } else {
      options.push({
        tier: tentativeTier, billing_cadence: "annual", rate_cents_per_month: RATE_CENTS_PER_MONTH[`${tentativeTier}_annual`],
        note: tentativeTier === "single" ? "$8/mo, billed for the year." : "Another registered router already covers this period — $4/mo instead of $8.",
      });
    }
    options.push({
      tier: tentativeTier, billing_cadence: "monthly", rate_cents_per_month: RATE_CENTS_PER_MONTH[`${tentativeTier}_monthly`],
      note: tentativeTier === "single" ? "$10/mo, cancel anytime." : "$5/mo, cancel anytime — half off for an additional router.",
    });
  }

  const companion = await currentActiveCompanion(env, customer.id, product ? product.id : -1, isTest);
  return {
    status: "new", customerId: customer.id, flavor, existingProduct: !!product, options,
    sync: companion ? { requiresChoice: true, companionCurrentPeriodEnd: companion.term_end } : { requiresChoice: false },
  };
}

// --- Purchase / renewal: the one place a transaction row gets written ---
// wantsFounder is a customer REQUEST, only meaningful at first registration
// — the actual tier charged is always resolved server-side via resolveTier,
// never trusted from the client. syncChoice ('trim_new' | 'extend_all') is
// only consulted for an annual purchase when another product is currently
// active (spec §2b).
export async function purchase(env, { serial, email, flavor, wantsFounder, billingCadence, syncChoice, isTest, kind = "purchase" }) {
  const customer = await findOrCreateCustomer(env, email);
  let product = await findRegisteredProduct(env, serial);

  if (product && product.customer_id !== customer.id) throw new PricingError("this router is registered to a different account");
  if (product && wantsFounder && !product.is_founder) throw new PricingError("Founder pricing is only available at first registration");

  let founderNow = false;
  if (!product && wantsFounder) {
    if (billingCadence !== "annual") throw new PricingError("Founder pricing is annual only");
    let open = false;
    try { open = await founderSlotAvailable(env, flavor, isTest); } catch { open = false; }
    if (!open) throw new PricingError("Founder pricing for this flavor is no longer available — the first 100 are taken.");
    founderNow = true;
  }
  if (!product) {
    await insertRegisteredProduct(env, { customerId: customer.id, serial, flavor, isFounder: founderNow, isTest });
    product = await findRegisteredProduct(env, serial);
  }

  const currentTx = await currentTransaction(env, product.id);
  // A renewal is EXPECTED to hit a still-active product — that's the whole
  // point of renewing before a term lapses (spec §1). Only a first-time
  // purchase attempt on an already-active product is the real conflict.
  if (kind !== "renewal" && currentTx && isCurrentlyActive(currentTx) && currentTx.rate_cents_per_month > 0) {
    throw new PricingError("this router already has an active subscription");
  }

  const periodStart = (currentTx && isCurrentlyActive(currentTx)) ? currentTx.term_end : new Date().toISOString();
  const now = new Date().toISOString();
  const resolvedTier = await resolveTier(env, customer.id, product.id, periodStart, isTest);

  let rate, termEnd;
  if (product.is_founder) {
    if (billingCadence !== "annual") throw new PricingError("Founder pricing is annual only");
    rate = product.founder_rate_cents_per_month;
    termEnd = addYears(periodStart, 1);
  } else {
    const key = `${resolvedTier}_${billingCadence === "monthly" ? "monthly" : "annual"}`;
    rate = RATE_CENTS_PER_MONTH[key];
    if (rate === undefined) throw new PricingError("unknown pricing tier/cadence combination");
    termEnd = billingCadence === "monthly" ? addMonths(periodStart, 1) : addYears(periodStart, 1);
  }

  // Sync-choice only applies to a FIRST-TIME registration alongside an
  // already-active companion (spec §2b) — a renewal of an already-synced
  // product simply extends by one interval from its own term_end, which
  // keeps a synced pair in lockstep automatically (see the resolveTier
  // comment above); forcing the choice again on every renewal would be
  // exactly the "batch renewal" UX Dave explicitly ruled out (spec §8, one
  // router at a time).
  if (kind !== "renewal" && billingCadence === "annual") {
    const companion = await currentActiveCompanion(env, customer.id, product.id, isTest);
    if (companion) {
      if (syncChoice === "trim_new") {
        termEnd = companion.term_end;
      } else if (syncChoice === "extend_all") {
        await env.haven_builds.prepare(
          `UPDATE transactions SET term_end=? WHERE registered_product_id=? AND status='active' AND term_end=?`
        ).bind(termEnd, companion.registered_product_id, companion.term_end).run();
      } else {
        throw new PricingError("sync_choice (trim_new or extend_all) is required when another router is already active");
      }
    }
  }

  const amountCents = billingCadence === "monthly" ? rate : rate * 12;
  const res = await env.haven_builds.prepare(
    `INSERT INTO transactions
       (customer_id, registered_product_id, kind, tier, billing_cadence, rate_cents_per_month,
        term_start, term_end, amount_cents, status, is_test, created_datetime)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', ?, ?)`
  ).bind(customer.id, product.id, kind, resolvedTier, billingCadence, rate, periodStart, termEnd, amountCents, isTest ? 1 : 0, now).run();

  return {
    transactionId: res.meta.last_row_id, customerId: customer.id, productId: product.id, serial,
    tier: resolvedTier, is_founder: !!product.is_founder, billing_cadence: billingCadence,
    rate_cents_per_month: rate, term_start: periodStart, term_end: termEnd,
  };
}

// --- Halloween Challenge free-month grant ---
// The FIRST successful claim during an active contest earns a free
// subscription on the claiming router, running through contest close — not
// a priced transaction, rate=0. Idempotent per customer per year. Returns
// {granted:false} without writing anything if already granted this year, or
// if this serial already carries a real (non-free) subscription.
export async function grantChallengeFreeMonth(env, { email, serial, flavor, isTest = false }) {
  const year = new Date().getUTCFullYear();
  const customer = await findOrCreateCustomer(env, email);

  const already = await env.haven_builds.prepare(
    `SELECT id FROM transactions WHERE customer_id=? AND kind='challenge_grant' AND strftime('%Y', created_datetime)=?`
  ).bind(customer.id, String(year)).first();
  if (already) return { granted: false, reason: "already granted this year", customerId: customer.id };

  let product = await findRegisteredProduct(env, serial);
  if (product) {
    const tx = await currentTransaction(env, product.id);
    if (tx && isCurrentlyActive(tx)) return { granted: false, reason: "serial already has a subscription", customerId: customer.id };
  } else {
    await insertRegisteredProduct(env, { customerId: customer.id, serial, flavor, isFounder: false, isTest });
    product = await findRegisteredProduct(env, serial);
  }

  const now = new Date().toISOString();
  const termEnd = env.CONTEST_END ? new Date(Number(env.CONTEST_END) * 1000).toISOString() : `${year}-11-01T00:00:00.000Z`;
  await env.haven_builds.prepare(
    `INSERT INTO transactions
       (customer_id, registered_product_id, kind, tier, billing_cadence, rate_cents_per_month,
        term_start, term_end, amount_cents, status, is_test, created_datetime)
     VALUES (?, ?, 'challenge_grant', 'single', 'free', 0, ?, ?, 0, 'active', ?, ?)`
  ).bind(customer.id, product.id, now, termEnd, isTest ? 1 : 0, now).run();

  return { granted: true, customerId: customer.id, currentPeriodEnd: termEnd };
}
