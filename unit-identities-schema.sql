-- unit-identities-schema.sql — per-unit Ed25519 public keys (task_ladder #147,
-- Dave's option B 2026-08-25: routers SIGN their requests; we hold only the
-- public half, so nothing on our side can impersonate a router).
--
-- Binding is FIRST-CLAIM, THEN IMMUTABLE: the first pubkey presented for a
-- serial (with proof of possession — the registration request itself is signed
-- by that key) is bound; any later attempt with a DIFFERENT key is refused.
-- Serials are semi-public (printed on the unit), so the race window is between
-- serial mint and first registration — on our bench, seconds, during the burn.
-- A vault-restored unit keeps its original key across factory resets, so
-- re-registration after a reset presents the SAME key and is a no-op.
--
-- Replaces enroll_secrets as the router identity store: that table required a
-- shared secret no normal unit ever received (measured 2026-08-25: no
-- offnetwork.conf on a fully provisioned 0.1.89 bench Olive), and our copy of
-- a shared secret could forge; a public key can only verify.
--   npx wrangler d1 execute haven_builds --remote --file=unit-identities-schema.sql

CREATE TABLE IF NOT EXISTS unit_identities (
    serial          TEXT PRIMARY KEY,
    pubkey          TEXT NOT NULL,               -- base64 of the raw 32-byte Ed25519 public key
    bound_via       TEXT NOT NULL,               -- 'provision' (bound at serial mint) | 'register' (bound by signed self-registration)
    bound_datetime  TEXT NOT NULL DEFAULT (datetime('now'))
);
