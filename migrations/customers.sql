-- Haven product customers + subscriptions. D1 binding haven_builds. STAGED --
-- apply with:
--   wrangler d1 execute haven-builds --file=migrations/customers.sql --remote
-- Encodes the pricing rules locked in specs/2026-08-08-haven-subscription-
-- pricing-v2.md: Founder (first-100-per-flavor, lifetime while continuously
-- subscribed), Squad (leader/member, synchronized expiration), Halloween
-- Challenge (this year's register-by-claim), and monthly-installment billing.

-- One customer = one email. No password of our own here -- Stripe owns
-- payment-method security and its own hosted Checkout/portal; we only need to
-- know who they are and which Stripe customer they map to. A Halloween
-- Challenge participant's claim uses their contest_accounts email as this
-- email -- same identity, no second password to create.
-- No is_test flag here: a single email can hold both a real subscription and
-- a separate test-mode one (e.g. Dave testing with his own address) — the
-- lane lives on subscriptions, per-row, not on the identity.
CREATE TABLE IF NOT EXISTS customers (
  id                 INTEGER PRIMARY KEY AUTOINCREMENT,
  email              TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT UNIQUE,
  created_datetime   TEXT NOT NULL
);

-- One row per Haven unit's subscription. serial is the unit this subscription
-- covers -- Squad membership, Founder eligibility, and entitlement sync-back
-- are all keyed off serial, matching how the router itself identifies to us.
--
-- Squad grouping is NOT a separate id: a squad is simply "this customer's
-- currently-active subscriptions, when there's more than one" -- customer_id
-- already carries that. squad_role records which specific row is currently
-- priced as leader vs member; current_period_end is what the synchronized-
-- expiration rule keeps aligned across every row sharing a customer_id.
CREATE TABLE IF NOT EXISTS subscriptions (
  id                       INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id              INTEGER NOT NULL REFERENCES customers(id),
  serial                   TEXT NOT NULL UNIQUE,        -- one subscription per router
  flavor                   TEXT NOT NULL,                -- navy | olive | pi | vm -- Founder cohort is per-flavor
  plan                     TEXT NOT NULL,                -- monthly | standard_annual | founder | squad_member | challenge
  rate_cents_per_month     INTEGER NOT NULL,             -- the $/mo this row is actually billed at
  billing_cadence          TEXT NOT NULL,                -- monthly | annual_lump | annual_installments | free (challenge-grant only, rate_cents_per_month=0)
  stripe_subscription_id   TEXT,
  status                   TEXT NOT NULL DEFAULT 'active',   -- active | lapsed | canceled
  founder_claimed_datetime TEXT,                         -- set once, on first becoming plan='founder'
  founder_forfeited        INTEGER NOT NULL DEFAULT 0,   -- 1 = lapsed once; the for-life rate can never return
  founder_lapse_warning_sent INTEGER NOT NULL DEFAULT 0, -- guards the required advance-notice email (sent once)
  squad_role               TEXT,                         -- leader | member | NULL (not currently in a squad)
  current_period_end       TEXT,                         -- shared across a customer's rows when squad-synced
  challenge_year           INTEGER,                      -- which year's Challenge earned this rate, if plan='challenge'
  is_test                  INTEGER NOT NULL DEFAULT 0,   -- 1 = test-mode (functions/_lib/testmode.js): tester-channel serial or TEST_MODE_KEY. Excluded from Founder cohort counts, squad-sync lookups, and every customer-facing stat.
  created_datetime         TEXT NOT NULL,
  modified_datetime        TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_subscriptions_customer ON subscriptions(customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status   ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_serial   ON subscriptions(serial);
CREATE INDEX IF NOT EXISTS idx_subscriptions_is_test  ON subscriptions(is_test);

-- Founder cohort cap enforcement (first 100 per flavor): a plain COUNT under a
-- transaction is enough at this volume (at most a few hundred rows, ever) --
-- no atomic-counter table the way the Challenge's claim-ordering needed.
--   SELECT COUNT(*) FROM subscriptions WHERE plan='founder' AND flavor=? AND is_test=0;
--   -- if < 100, this purchase may be offered the founder rate for that flavor.

-- Lapse sweep (scheduled): for every row where status transitions to 'lapsed',
--   - if plan='founder': set founder_forfeited=1 (permanent, per the pricing spec)
--   - re-evaluate squad_role for every OTHER row on the same customer_id: if
--     exactly one remains 'active', set its squad_role=NULL (it's no longer in
--     a squad) -- the rate change itself waits for that row's own next renewal,
--     per the pricing spec's "no mid-cycle surprise billing" rule.
