-- Haven Challenge — contest claim intake, device registry, attest audit log.
-- Applies to D1 binding haven_builds. STAGED — apply with:
--   wrangler d1 execute haven-builds --file=migrations/contest_claims.sql --remote
-- See docs/CONTEST_EXPORT_IMPORT_DESIGN.md §7.

-- Ranking authority: contest_claims.id (AUTOINCREMENT) is allocated atomically at
-- INSERT and is the single source of truth for "who was first". t_receipt_ms is
-- display-only. Reject paths never INSERT, so they never consume an id.
CREATE TABLE IF NOT EXISTS contest_claims (
  id                         INTEGER PRIMARY KEY AUTOINCREMENT,
  attestation                TEXT UNIQUE,               -- stops a stolen file being re-credited
  username                   TEXT,                      -- the logged-in participant (attribution)
  email                      TEXT,                      -- copied from their account for contact
  claim_title                TEXT NOT NULL,
  claim_details              TEXT,
  t_receipt_ms               INTEGER NOT NULL,          -- display/diagnostic only
  t_export_ms                INTEGER,                   -- decrypted provenance time
  serial                     TEXT,
  feed_build_id              INTEGER,
  toulouse_hash              TEXT,
  model                      TEXT,
  haven_version              TEXT,
  tamper_flags               TEXT,                      -- csv: stale_token,clock_skew,duplicate_attestation
  lane                       TEXT NOT NULL DEFAULT 'attested',  -- attested | manual_review | no_contest
  disqualified_from_priority INTEGER NOT NULL DEFAULT 0,        -- structural: priority query excludes !=attested
  evidence_sufficient        INTEGER NOT NULL DEFAULT 0,        -- judge gate for duplicate-bug priority
  package_description         TEXT,                     -- plain text volunteers read
  evidence_b64               TEXT,                      -- the settings export text (also archived to R2)
  package_prefix             TEXT,                      -- R2 prefix holding the whole claim package: claims/<uuid>/
  settings_r2_key            TEXT,                      -- R2 key of settings.json
  attachment_r2_key          TEXT,                      -- R2 key of the optional screenshot / other file
  attachment_name            TEXT,                      -- original filename of the attachment
  attachment_type            TEXT,                      -- declared content-type of the attachment
  attachment_bytes           INTEGER,                   -- attachment size in bytes
  source_ip                  TEXT,
  status                     TEXT NOT NULL DEFAULT 'submitted',
  created_datetime           TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_contest_claims_lane   ON contest_claims(lane);
CREATE INDEX IF NOT EXISTS idx_contest_claims_serial ON contest_claims(serial);

-- The priority order is: among lane='attested' AND evidence_sufficient=1, lowest id wins.
--   SELECT * FROM contest_claims WHERE lane='attested' AND evidence_sufficient=1 ORDER BY id;

-- Every attestation minted, so a reviewer can spot stockpiling (harmless to
-- ranking, but a signal).
CREATE TABLE IF NOT EXISTS attest_log (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  serial           TEXT,
  content_hash     TEXT,
  t_export_ms      INTEGER,
  source_ip        TEXT,
  created_datetime TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_attest_log_serial ON attest_log(serial);

-- Device registry: serial -> unit_nonce. LAUNCH PREREQUISITE — intake device
-- verification fails closed against this table, so it must be populated before
-- CONTEST_ACTIVE=1 (via router check-in enrollment or provisioning records).
CREATE TABLE IF NOT EXISTS issued_serials (
  serial     TEXT PRIMARY KEY,
  unit_nonce TEXT NOT NULL,
  enrolled_datetime TEXT
);

-- Rate limiter (shared with /api/finding). Defensive create in case it predates migrations.
CREATE TABLE IF NOT EXISTS challenge_rate (
  bucket       TEXT NOT NULL,
  key          TEXT NOT NULL,
  window_start INTEGER NOT NULL,
  count        INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (bucket, key, window_start)
);
