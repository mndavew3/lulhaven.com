-- v3 pricing/auth schema. D1 binding haven_builds. STAGED — apply with:
--   wrangler d1 execute haven-builds --file=migrations/v3_pricing_schema.sql --remote
-- Supersedes the leader/member `subscriptions` table (customers.sql) per
-- specs/2026-08-08-haven-subscription-pricing-v3.md: order-based single vs
-- subsequent-router pricing (determined fresh at every transaction, not a
-- sticky role), Founder pricing frozen per-product, and an append-only
-- transaction ledger so "current status" is a derived query, not mutable
-- state. Nothing is live yet — no data migration needed, old table is dropped.

DROP TABLE IF EXISTS subscriptions;

ALTER TABLE customers ADD COLUMN totp_secret TEXT;
ALTER TABLE customers ADD COLUMN totp_enrolled_at TEXT;

-- One row per router ever registered. Permanent identity; the Founder flag
-- and its frozen rate live here (not on customers, not on transactions) —
-- a customer may have Founder status on one product and not another, and a
-- future price change must never alter what an existing Founder locked in.
CREATE TABLE IF NOT EXISTS registered_products (
  id                           INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id                  INTEGER NOT NULL REFERENCES customers(id),
  serial                       TEXT NOT NULL UNIQUE,
  flavor                       TEXT,
  is_founder                   INTEGER NOT NULL DEFAULT 0,
  founder_rate_cents_per_month INTEGER,   -- frozen at the moment is_founder was set; NULL unless is_founder=1
  is_test                      INTEGER NOT NULL DEFAULT 0,
  registered_datetime          TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_registered_products_customer ON registered_products(customer_id);
CREATE INDEX IF NOT EXISTS idx_registered_products_is_test  ON registered_products(is_test);

-- Append-only — a row is written, never updated (except REFUND, which is a
-- status flip, not a rewrite of the financial facts). "Is this product
-- currently entitled?" and "what tier is the customer's NEXT transaction?"
-- are both derived queries over this table, not separately maintained state.
-- Every row also carries what a tax authority will eventually ask for.
CREATE TABLE IF NOT EXISTS transactions (
  id                     INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id            INTEGER NOT NULL REFERENCES customers(id),
  registered_product_id  INTEGER NOT NULL REFERENCES registered_products(id),
  kind                   TEXT NOT NULL,              -- purchase | renewal | challenge_grant
  tier                   TEXT NOT NULL,               -- single | subsequent — the order-based fact AT THIS TRANSACTION, recorded even when founder pricing overrides the rate actually charged
  billing_cadence        TEXT NOT NULL,               -- annual | monthly | free
  rate_cents_per_month   INTEGER NOT NULL,             -- the $/mo actually charged (founder rate, if applicable, else the tier rate)
  term_start             TEXT NOT NULL,
  term_end               TEXT NOT NULL,
  amount_cents           INTEGER NOT NULL,
  tax_amount_cents       INTEGER NOT NULL DEFAULT 0,
  tax_jurisdiction       TEXT,
  stripe_tax_reference   TEXT,
  stripe_payment_intent  TEXT,
  status                 TEXT NOT NULL DEFAULT 'active',   -- active | refunded
  is_test                INTEGER NOT NULL DEFAULT 0,
  created_datetime       TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_transactions_product  ON transactions(registered_product_id, term_end);
CREATE INDEX IF NOT EXISTS idx_transactions_customer ON transactions(customer_id, is_test, status, term_end);

-- Generic one-time-code store, shared by both account realms (customer,
-- contest) — email is the only delivery channel (no SMS/Twilio). A code is
-- single-use: verifying it stamps consumed_at so it can't be replayed.
CREATE TABLE IF NOT EXISTS email_codes (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  realm             TEXT NOT NULL,     -- customer | contest
  identity          TEXT NOT NULL,     -- email or username, lowercased
  purpose           TEXT NOT NULL,     -- login | verify
  code_hash         TEXT NOT NULL,
  expires_at        TEXT NOT NULL,
  consumed_at       TEXT,
  is_test           INTEGER NOT NULL DEFAULT 0,
  created_datetime  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_email_codes_lookup ON email_codes(realm, identity, purpose, consumed_at);

-- Challenge contest realm: passwords are dropped from the login path (the
-- pw_hash/pw_salt columns stay, unused, rather than a destructive migration
-- of a table with real participant rows) — TOTP is now the primary method,
-- opt-in per account, with the existing emailed code as the universal
-- fallback (already true for every account, since email is already verified
-- at signup).
ALTER TABLE contest_accounts ADD COLUMN totp_secret TEXT;
ALTER TABLE contest_accounts ADD COLUMN totp_enrolled_at TEXT;

-- Founder cohort cap enforcement (first 100 per flavor):
--   SELECT COUNT(*) FROM registered_products WHERE is_founder=1 AND flavor=? AND is_test=0;
-- Tier resolution for a transaction on registered_product_id=P starting at
-- periodStart (see functions/_lib/pricing.js resolveTier for the real query):
--   subsequent if the customer has ANY OTHER registered_product with a
--   status='active' transaction whose term_end >= periodStart; else single.
