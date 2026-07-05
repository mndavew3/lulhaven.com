-- adq DB_IDENT — the ONE serial linkage + the ONE blinding salt.
-- Bound ONLY to the auth-verify Worker (adq-ident). Never bound by votes/serve/cron.
-- Verified against provision.js: haven_builds stores source_ip by serial, so the
-- token->serial map MUST live in a different db the vote path never binds.

CREATE TABLE IF NOT EXISTS adq_verify_key (
    submitter_token TEXT PRIMARY KEY,            -- sha256(adq_secret:'adq-sub':<epoch>)
    serial          TEXT NOT NULL,
    salt_epoch      TEXT NOT NULL,               -- '2026Q3'
    verify_key      TEXT NOT NULL,               -- sha256(adq_secret:'adq-key':<epoch>) — request MAC key
    bound_datetime  TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE (serial, salt_epoch)                  -- one serial => one token per quarter => one vote
);
CREATE INDEX IF NOT EXISTS idx_adq_vk_serial ON adq_verify_key (serial);

CREATE TABLE IF NOT EXISTS adq_revoked_serial (
    serial           TEXT PRIMARY KEY,
    revoked_datetime TEXT NOT NULL DEFAULT (datetime('now')),
    reason           TEXT
);

CREATE TABLE IF NOT EXISTS adq_quarter_salt (
    salt_epoch       TEXT PRIMARY KEY,
    salt             TEXT NOT NULL,              -- 256-bit hex; DELETE this row at quarter+7d
    created_datetime TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS adq_serial_trust (
    serial               TEXT PRIMARY KEY,
    early_corroborations INTEGER NOT NULL DEFAULT 0,  -- voted-a-cidr-BEFORE-it-graduated (the ONLY trust earner)
    trust_tier           TEXT NOT NULL DEFAULT 'new'
                           CHECK (trust_tier IN ('new','established','quarantined')),
    quarantine_reason    TEXT,
    updated_datetime     TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Idempotency ledger for /credit: a redeem_key = opaque hash (votes-only salt) of the
-- exact set of receipts a corroboration call awarded. Re-applying the same key is a no-op,
-- so a lost /credit response re-tried by the router cannot double-credit trust. The key is
-- opaque to ident (it lacks the votes salt), so this holds NO serial<->cidr linkage. Purged
-- for size in rotateSalt.
CREATE TABLE IF NOT EXISTS adq_credit_applied (
    redeem_key    TEXT PRIMARY KEY,
    applied_date  TEXT NOT NULL DEFAULT (date('now'))
);
