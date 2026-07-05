-- adq DB_VOTES — blinded votes + verdicts + denylist.
-- Bound to ingest / serve / cron ONLY. Holds NO serial, NO submitter_token-in-clear,
-- NO WAN-IP, NO exact sub-k counts. Never binds DB_IDENT or haven_builds.

CREATE TABLE IF NOT EXISTS adq_votes (
    id                 INTEGER PRIMARY KEY AUTOINCREMENT,
    cidr               TEXT    NOT NULL,          -- SERVER-resolved key, '203.0.113.7/32' or '.../24'
    prefix_len         INTEGER NOT NULL,          -- 32 default; 24/20 only for confirmed single-tenant adnet
    host_ip            TEXT    NOT NULL,          -- server-normalized voted host (dotted-quad)
    server_asn         INTEGER,                   -- SERVER-resolved ASN of host_ip (client asn is discarded)
    blinded_id         TEXT    NOT NULL,          -- adqMac(quarter_salt, submitter_token||cidr); salt discarded
    ingest_region      TEXT,                      -- CF cf.country, ONLY if k-anon gate passed (else NULL)
    ingest_asn_bucket  TEXT,                      -- coarse submitter-ASN bucket, ONLY if k-anon gate passed (else NULL)
    trust_tier         TEXT    NOT NULL DEFAULT 'new',
    vote_rank          INTEGER NOT NULL DEFAULT 0, -- this cidr's distinct-voter count at the instant this
                                                  -- vote landed (1 = first voter). Redemption credits trust
                                                  -- ONLY for early-minority ranks so front-running an already-
                                                  -- obvious graduation earns nothing (sybil-audit #2/#8).
    batch_id           TEXT    NOT NULL,          -- sha256(adq_secret:'adq-batch':<UTC-day>) idempotency
    received_date      TEXT    NOT NULL,          -- DATE only (server casts date('now')); never second-precision
    UNIQUE (blinded_id, batch_id)
);
CREATE INDEX IF NOT EXISTS idx_adq_votes_cidr ON adq_votes (cidr);
CREATE INDEX IF NOT EXISTS idx_adq_votes_date ON adq_votes (received_date);
CREATE INDEX IF NOT EXISTS idx_adq_votes_host ON adq_votes (host_ip);

CREATE TABLE IF NOT EXISTS adq_verdicts (
    cidr                   TEXT    PRIMARY KEY,
    prefix_len             INTEGER NOT NULL,
    server_asn             INTEGER,               -- modal server-resolved ASN
    tenancy                TEXT    NOT NULL DEFAULT 'unknown'
                             CHECK (tenancy IN ('dedicated-adnet','multi-tenant','unknown')),
    count_bucket           TEXT    NOT NULL DEFAULT 'kfloor',  -- 'kfloor'|'25+'|'100+'|'500+'|'1000+' (NEVER exact)
    distinct_asn_bucket    TEXT    NOT NULL DEFAULT '1',       -- submitter-ASN diversity '1'|'2'|'3+'
    distinct_region_bucket TEXT    NOT NULL DEFAULT '1',       -- submitter-region diversity
    host_diversity         INTEGER NOT NULL DEFAULT 0,         -- # hosts in cidr each independently >= k voters
    max_component_pct      INTEGER NOT NULL DEFAULT 100,       -- largest co-voting cluster as % of voters
    risk_class             TEXT    NOT NULL DEFAULT 'unknown'
                             CHECK (risk_class IN ('adnet','cloud','unknown','denylist')),
    tier                   TEXT    NOT NULL DEFAULT 'candidate'
                             CHECK (tier IN ('candidate','likely','community-confirmed','suppressed')),
    auto_apply             INTEGER NOT NULL DEFAULT 0,         -- 1 only if full diversity+corroboration gate passed
    credit_eligible        INTEGER NOT NULL DEFAULT 0,         -- 1 if graduated via residential-diverse quorum;
                                                              -- gates whether early voters can EARN trust here
    confidence             REAL    NOT NULL DEFAULT 0,         -- from diversity-validated quorum, not raw count
    first_seen_datetime    TEXT    NOT NULL DEFAULT (datetime('now')),
    last_vote_date         TEXT    NOT NULL DEFAULT (date('now')),
    graduated_datetime     TEXT,
    updated_datetime       TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_adq_verdicts_serve ON adq_verdicts (tier, updated_datetime);

CREATE TABLE IF NOT EXISTS adq_denylist (
    match_kind     TEXT NOT NULL CHECK (match_kind IN ('asn','cidr')),
    match_value    TEXT NOT NULL,
    reason         TEXT NOT NULL,
    added_datetime TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (match_kind, match_value)
);

CREATE TABLE IF NOT EXISTS adq_adnet_asns (
    asn            INTEGER PRIMARY KEY,
    label          TEXT,
    added_datetime TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS adq_override_signal (
    cidr             TEXT PRIMARY KEY,
    override_count   INTEGER NOT NULL DEFAULT 0,   -- coarse count of DISTINCT "households disagreed" reports
    distinct_regions INTEGER NOT NULL DEFAULT 0,   -- submitter-region diversity of the overrides
    distinct_asns    INTEGER NOT NULL DEFAULT 0,   -- submitter-ASN diversity of the overrides
    established_count INTEGER NOT NULL DEFAULT 0,  -- how many overriders were ESTABLISHED-trust
    day_span         INTEGER NOT NULL DEFAULT 0,   -- distinct days the overrides span
    window_date      TEXT NOT NULL DEFAULT (date('now')),
    updated_datetime TEXT NOT NULL DEFAULT (datetime('now'))
);
-- NOTE: the override WRITER is not built yet. The cron consumer (runCron) now gates
-- override->suppressed on the SAME diversity discipline as auto_apply (sybil-audit #6:
-- 20 ungated serials could otherwise force-suppress a rival's legit ad CIDR fleet-wide),
-- so a future naive writer cannot cheaply trip a hard fleet-wide suppression.

-- Double-redeem guard for the trust-earner corroboration path. Keyed on blinded_id,
-- which adq_votes ALREADY stores, so it introduces NO new linkage class. Holds ONLY
-- an opaque blinded_id + a coarse date; PURGED at <= salt life in runCron so no live-
-- salt recompute oracle survives a quarter boundary (sybil/privacy-audit).
CREATE TABLE IF NOT EXISTS adq_receipt_spent (
    blinded_id     TEXT PRIMARY KEY,
    spent_date     TEXT NOT NULL DEFAULT (date('now')),  -- DATE only; never second-precision
    credited       INTEGER NOT NULL DEFAULT 0            -- 0 = spent but trust not yet awarded (owed);
                                                         -- 1 = credit landed. Never rolled back, so a
                                                         -- lost /credit response is re-tried idempotently
                                                         -- (redeem_key dedup) instead of double-crediting.
);

-- Known hosting/cloud/datacenter ASNs used to classify the SUBMITTER's ASN (from CF
-- cf.asn) at quorum time. A datacenter voter (VPS botnet) may count toward advisory
-- 'community-confirmed' but NEVER toward the silent auto-apply diversity gate
-- (sybil-audit #4). STARTER list = the major clouds; real curation is a data task.
CREATE TABLE IF NOT EXISTS adq_hosting_asn (
    asn            INTEGER PRIMARY KEY,
    label          TEXT,
    added_datetime TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Curated day-one seed lives in adq_verdicts with a distinct provenance so it is
-- clearly NOT community-voted (open question #1: labeled Haven-curated seed).
-- Rows inserted by seed.sql carry risk_class='adnet', tier='community-confirmed',
-- count_bucket='curated', auto_apply=0 (advisory) unless later promoted.
