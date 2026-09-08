-- STAGED — apply with: wrangler d1 execute haven-builds --file=migrations/contest_claim_disputes.sql --remote
-- Fix for the unreachable manual_review lane (red-team 2026-09-08, mandate 2643):
-- contest_claims keeps UNIQUE(attestation), so a SECOND submission of the same
-- attested file could never insert — the second claimant vanished unrecorded and
-- their R2 package was orphaned. Every later submitter now lands HERE, so a
-- reviewer has both sides of a stolen/re-used-file dispute. Additive only.
CREATE TABLE IF NOT EXISTS contest_claim_disputes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  attestation TEXT NOT NULL,
  original_claim_id INTEGER,          -- contest_claims.id of the first-submitted claim (NULL if race lookup failed)
  username TEXT,
  email TEXT,
  claim_title TEXT,
  claim_details TEXT,
  serial TEXT,
  tamper_flags TEXT,
  package_prefix TEXT,                -- R2 prefix: the second claimant's files are preserved, not orphaned
  settings_r2_key TEXT,
  attachment_r2_key TEXT,
  source_ip TEXT,
  status TEXT NOT NULL DEFAULT 'pending',  -- pending | adjudicated
  created_datetime TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_ccd_attestation ON contest_claim_disputes(attestation);
