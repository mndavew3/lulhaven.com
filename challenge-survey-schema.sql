-- router_survey — Haven Challenge pre-announce intake (haven-builds D1).
-- Backs /api/challenge-survey from challenge-preview.html.
-- Email is OPTIONAL (voters may stay anonymous) — required only when joining
-- the judge pool, enforced client- and server-side. No UNIQUE(email): anonymous
-- rows have no email, and a person may suggest more than one device.
-- Apply remote: wrangler d1 execute haven-builds --remote --file=challenge-survey-schema.sql
CREATE TABLE IF NOT EXISTS router_survey (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    router           TEXT NOT NULL,
    priority_note    TEXT,
    email            TEXT,
    judge_interest   INTEGER NOT NULL DEFAULT 0,   -- 0 | 1
    judge_background TEXT,
    source_ip        TEXT,
    created_datetime TEXT NOT NULL DEFAULT (datetime('now'))
);
