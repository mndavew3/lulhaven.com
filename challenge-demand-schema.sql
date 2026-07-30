-- challenge-demand-schema.sql — anonymous firmware-demand log (challenge #73).
--
-- Purpose: when haven-detect identifies a router we do NOT yet support, and the
-- user consents, record the MODEL ONLY so we can plan which firmware to build
-- next. This is demand data, not visitor tracking — a different animal from the
-- KYC beacon, and it lives in its own table for that reason.
--
-- ANONYMITY IS LOAD-BEARING (the blocker on #73): Cloudflare hands every request
-- a CF-Connecting-IP. We do NOT store it. There is deliberately no ip column, so
-- there is nothing to leak and nothing to subpoena. The coarsest possible signal
-- we keep is the CF two-letter country, and only because firmware demand is
-- regional (a US-only router isn't worth a build for an EU-only audience). A
-- two-letter country over a population of reporters is not identifying. If that
-- ever feels like too much, drop the column — the feature does not depend on it.
--
-- Apply:  wrangler d1 execute haven-builds --remote --file challenge-demand-schema.sql

CREATE TABLE IF NOT EXISTS firmware_demand (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    -- what haven-detect reported, verbatim but length-capped and cleaned
    vendor            TEXT,              -- e.g. "Linksys" (OUI-derived), may be null
    model             TEXT NOT NULL,     -- e.g. "WRT54G" / raw detected string
    -- the utility's own read of whether this is a supported target, so we can
    -- separate genuine gaps from misfires without re-running detection
    detect_verdict    TEXT,              -- 'unsupported' | 'below_floor' | 'unknown'
    -- coarse region only; see anonymity note above
    country           TEXT,              -- CF two-letter, or null
    -- the utility version that produced this, so a detection bug is traceable
    detect_version    TEXT,
    -- explicit consent flag: the row only exists because the user clicked "send".
    -- Stored so a later audit can prove every row was volunteered.
    consented         INTEGER NOT NULL DEFAULT 1,
    created_datetime  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_firmware_demand_model
    ON firmware_demand (model);
CREATE INDEX IF NOT EXISTS idx_firmware_demand_created
    ON firmware_demand (created_datetime);
