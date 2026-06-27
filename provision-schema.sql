-- provisioned_units — first-boot serial mint registry (haven-builds D1).
-- Backs /api/provision. The `id` rowid IS the sequence baked into the serial.
-- UNIQUE(unit_nonce) makes minting idempotent (a retry returns the same serial).
-- The serial encodes only IMMUTABLE birth facts; mutable state (owner, sub tier,
-- current firmware, registration/tunnel) belongs in OTHER tables keyed by serial.
-- Apply: wrangler d1 execute haven-builds --remote --file=provision-schema.sql
CREATE TABLE IF NOT EXISTS provisioned_units (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,  -- = sequence (NNNNNNN)
    serial           TEXT UNIQUE,                         -- set immediately after insert
    unit_nonce       TEXT NOT NULL UNIQUE,                -- per-unit id; idempotency key
    channel          TEXT,                                -- R/G/T/I/D
    hardware         TEXT,                                -- MT6/E84/PI5/X86/...
    build            TEXT,                                -- birth firmware (e.g. 0133)
    region           TEXT,                                -- 2-letter, server-derived
    account_token    TEXT,                                -- reserved: gated-download/account binding (unused)
    source_ip        TEXT,
    minted_datetime  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_provisioned_serial ON provisioned_units(serial);
