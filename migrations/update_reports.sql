-- update_reports — OTA update-outcome telemetry (whetstone/OTA reliability).
-- Device-health data ONLY (serial, version transition, result, error/progress
-- text, coarse country). NEVER user or browsing data. Written by
-- /api/update-status when a router reports the result of an update attempt on
-- its next boot. One row per (serial, attempt_id) — idempotent under retries.
--
-- Apply (green light only):
--   wrangler d1 execute haven-builds --remote --file=migrations/update_reports.sql
-- Local test:
--   wrangler d1 execute haven-builds --local  --file=migrations/update_reports.sql

CREATE TABLE IF NOT EXISTS update_reports (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    serial           TEXT NOT NULL,
    attempt_id       TEXT NOT NULL,
    from_version     TEXT,
    to_version       TEXT,           -- version the update TRIED to install
    running_version  TEXT,           -- version the unit actually booted afterward
    result           TEXT NOT NULL,  -- success|reverted|flash_failed|download_failed|sha_mismatch|incompatible|unknown
    model            TEXT,           -- board name, e.g. 'glinet,gl-mt6000' / 'linksys,e8450' / 'x86'
    environment      TEXT,           -- deployment context: hardware|vm|container|unknown
    error            TEXT,           -- error/progress text (device-health only), client-truncated
    serial_known     INTEGER NOT NULL DEFAULT 0,  -- 1 = serial exists in provisioned_units
    nonce_ok         INTEGER NOT NULL DEFAULT 0,  -- 1 = serial+unit_nonce matched a provisioned row
    client_ts        INTEGER,        -- unix epoch reported by the unit
    reported_at      TEXT NOT NULL DEFAULT (datetime('now')),
    source_country   TEXT            -- request.cf.country (coarse); the WAN IP is NEVER stored
);

CREATE INDEX        IF NOT EXISTS idx_update_reports_serial   ON update_reports(serial);
CREATE INDEX        IF NOT EXISTS idx_update_reports_reported ON update_reports(reported_at);
CREATE INDEX        IF NOT EXISTS idx_update_reports_result   ON update_reports(result);
-- Idempotency: a retried report for the same attempt updates in place, never dups.
CREATE UNIQUE INDEX IF NOT EXISTS ux_update_reports_attempt   ON update_reports(serial, attempt_id);
