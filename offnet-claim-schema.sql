-- offnet_claims + enroll_secrets (task_ladder #141). Apply to haven-builds D1
-- at activation (staged: NOT applied remote until off-network enrollment ships).
CREATE TABLE IF NOT EXISTS offnet_claims (
    claim_id        TEXT PRIMARY KEY,   -- uuid minted by POST /api/offnet-claim
    code            TEXT NOT NULL,      -- the claim code the phone/user submitted
    serial          TEXT,               -- filled when a router resolves it
    status          TEXT NOT NULL DEFAULT 'queued',  -- queued | claimed | expired
    pairing_payload TEXT,               -- JSON {private_dns, serial} on claim
    queued_at       TEXT NOT NULL,
    claimed_at      TEXT
);
CREATE INDEX IF NOT EXISTS idx_offnet_claims_status ON offnet_claims(status, queued_at);
-- per-unit bearer verifier (HMAC(ENROLL_SECRET, serial)); the secret itself is
-- NEVER stored here. Written at provision-offnetwork time.
CREATE TABLE IF NOT EXISTS enroll_secrets (
    serial   TEXT PRIMARY KEY,
    bearer   TEXT NOT NULL,
    added_at TEXT NOT NULL
);
