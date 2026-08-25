-- router-mail-schema.sql — audit log for /api/router-mail (task_ladder #147).
-- Applied to the remote haven_builds D1 at activation, the same staged-inert
-- posture as offnet-claim-schema.sql: until this runs, router-mail.js sends
-- (once RESEND_API_KEY exists) but simply skips the audit INSERT.
--
-- Content-minimal by design (trust caveat): we store a SHA-256 HASH of the
-- recipient, never the address, and never the subject or body. Just enough to
-- rate-limit per unit and to answer "did this unit's recovery mail go out?".
--
-- Auth is the per-unit Ed25519 signature verified against unit_identities
-- (unit-identities-schema.sql) — the enroll_secrets bearer this originally
-- reused is retired (no normal unit ever had the secret; ladder #147 option B).
--   npx wrangler d1 execute haven_builds --remote --file=router-mail-schema.sql

CREATE TABLE IF NOT EXISTS router_mail_log (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    serial      TEXT NOT NULL,
    event_type  TEXT NOT NULL,      -- factory_reset | recovery | owner_alert | unlock_code
    to_hash     TEXT NOT NULL,      -- sha256(lowercased recipient), never the address
    status      TEXT NOT NULL,      -- sent | skipped | failed
    sent_at     TEXT NOT NULL       -- 'YYYY-MM-DD HH:MM:SS' UTC
);

-- Serves the per-serial rate-limit window query in router-mail.js.
CREATE INDEX IF NOT EXISTS ix_router_mail_serial_time ON router_mail_log (serial, sent_at);
