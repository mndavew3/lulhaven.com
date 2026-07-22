-- challenge_findings — Haven Challenge bug/bypass intake (haven-builds D1).
-- Backs POST /api/finding. Apply remote:
--   wrangler d1 execute haven-builds --remote --file=challenge-findings-schema.sql
--
-- Design follows the published rules (docs/challenge-rules-and-scope.md §9):
--
--   TWO STATES, AND NEITHER IS "REJECTED". A finding is 'submitted' until we
--   reproduce it, then 'confirmed'; if we cannot reproduce it yet it becomes
--   'unconfirmed' — an invitation for more detail, not a verdict. There is
--   deliberately no 'rejected' value, because the rules promise nobody is told
--   they were wrong. Enforced by the CHECK below so the UI cannot drift from
--   the promise.
--
--   DISTINCT MEANS BY ROOT CAUSE. Ten ways to trigger one gap is one finding,
--   and the first reporter gets credit. duplicate_of points at the earlier row;
--   a row with duplicate_of set is still a real finding by its reporter, it just
--   isn't the first flag on that hill.
--
--   VERSION-STAMPED, NOT FROZEN. The window patches continuously, so every
--   finding records the Haven version it was found against.

CREATE TABLE IF NOT EXISTS challenge_findings (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,

    -- Reporter. email is the join key to challenge_applications; we do not
    -- require the applicant row to exist (registration is self-service and a
    -- finding must never be lost because of ordering).
    email             TEXT NOT NULL,
    handle            TEXT,

    -- The report itself.
    title             TEXT NOT NULL,
    steps             TEXT NOT NULL,           -- what they did, in order
    expected          TEXT,                    -- what they expected
    actual            TEXT,                    -- what happened instead
    evidence          TEXT,                    -- link/description of capture or clip
    tier              TEXT NOT NULL DEFAULT 'vm',   -- 'vm' | 'full'

    -- The exported Helm configuration (JSON from config_export). This is the
    -- single most useful attachment: it lets us stand their exact setup back up.
    config_json       TEXT,
    haven_version     TEXT,                    -- version the finding was found against
    feed_vintage      TEXT,

    -- Rules acceptance (#50): WHO accepted WHICH rules version, WHEN. Captured
    -- at submission because that is the moment the terms actually bind.
    rules_version     TEXT,
    rules_accepted_datetime TEXT,

    -- Triage.
    status            TEXT NOT NULL DEFAULT 'submitted',
    duplicate_of      INTEGER,                 -- FK-ish -> challenge_findings(id)
    triage_note       TEXT,                    -- internal; never shown to reporter
    confirmed_datetime TEXT,

    source_ip         TEXT,
    created_datetime  TEXT NOT NULL DEFAULT (datetime('now')),
    modified_datetime TEXT NOT NULL DEFAULT (datetime('now')),

    -- No 'rejected'. See the note above -- this is the rules promise in schema.
    CHECK (status IN ('submitted', 'confirmed', 'unconfirmed')),
    CHECK (tier IN ('vm', 'full'))
);

CREATE INDEX IF NOT EXISTS idx_findings_email   ON challenge_findings(email);
CREATE INDEX IF NOT EXISTS idx_findings_status  ON challenge_findings(status);
CREATE INDEX IF NOT EXISTS idx_findings_created ON challenge_findings(created_datetime);
CREATE INDEX IF NOT EXISTS idx_findings_dup     ON challenge_findings(duplicate_of);

-- challenge_rate — submission/registration rate limiting (#51).
-- One row per (bucket, key, window_start). Cheap enough for D1 at contest
-- volume; no KV/Durable Object needed for a seven-week window.
CREATE TABLE IF NOT EXISTS challenge_rate (
    bucket           TEXT NOT NULL,            -- 'finding' | 'register'
    key              TEXT NOT NULL,            -- usually the source IP
    window_start     INTEGER NOT NULL,         -- unix seconds, floored to the window
    count            INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (bucket, key, window_start)
);

CREATE INDEX IF NOT EXISTS idx_rate_window ON challenge_rate(window_start);
