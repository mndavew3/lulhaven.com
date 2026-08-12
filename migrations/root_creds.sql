-- root_creds — tracks the hidden root account's login state per router
-- (haven-builds D1). See ~/haven/docs/USER_CREDENTIAL_STRATEGY.md section 2
-- and memory project_haven_root_rekey_design for the full mechanism.
--
-- Kept separate from provisioned_units on purpose: that table's own header
-- says immutable birth facts belong there and mutable state belongs in
-- OTHER tables keyed by serial. This is mutable state.
--
-- No password is ever stored here. password_date + Haven's one saved key
-- (env.ROOT_CREDS_KEY) are enough to recompute it on demand
-- (functions/_lib/root_creds.js). This table only needs to protect dates
-- and a status word, none of which are sensitive on their own.
--
-- status:
--   pending    — owed a password for password_date; server will hand it out
--                on the router's next check-in.
--   updated    — password_date's password is confirmed applied on the unit.
--   pre-haven  — Gold (self-flashed) unit; Haven never manages root here.
--
-- Apply: wrangler d1 execute haven-builds --remote --file=migrations/root_creds.sql
CREATE TABLE IF NOT EXISTS root_creds (
    serial              TEXT PRIMARY KEY,
    password_date       TEXT NOT NULL,          -- date the CURRENT/target password derives from
    prior_password_date TEXT,                   -- date the password still live on the unit derives from, until confirmed
    status              TEXT NOT NULL DEFAULT 'pending',
    modified_datetime   TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_root_creds_status ON root_creds(status);
