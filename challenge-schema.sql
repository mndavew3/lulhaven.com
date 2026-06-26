-- challenge_applications — Haven Challenge applicant intake (haven-builds D1).
-- Backs /api/challenge. UNIQUE(email) so a resubmit updates rather than dupes.
-- Apply remote: wrangler d1 execute haven-builds --remote --file=challenge-schema.sql
CREATE TABLE IF NOT EXISTS challenge_applications (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    name             TEXT NOT NULL,
    email            TEXT NOT NULL UNIQUE,
    handle           TEXT,
    platform         TEXT,
    audience         TEXT,
    target_router    TEXT,
    source_ip        TEXT,
    created_datetime TEXT NOT NULL DEFAULT (datetime('now'))
);
