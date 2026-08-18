-- redemption_codes — one row per issued Haven download code (task_ladder #113).
-- Codes are stored as the 7-char BODY (post-parse), never with dashes/prefix.
-- Apply to the haven-builds D1 (staged: NOT applied to remote until the
-- download flow goes live through Hearst):
--   npx wrangler d1 execute haven-builds --local  --file=redemption-schema.sql
--   npx wrangler d1 execute haven-builds --remote --file=redemption-schema.sql
CREATE TABLE IF NOT EXISTS redemption_codes (
    code              TEXT PRIMARY KEY,   -- 7-char body, e.g. 'NV3K9QX'
    flavor            TEXT NOT NULL,      -- navy | olive | pi | vm
    profile           TEXT,               -- optional issue batch / channel tag
    issued_at         TEXT NOT NULL,      -- 'YYYY-MM-DD HH:MM:SS' UTC
    first_redeemed_at TEXT,
    last_redeemed_at  TEXT,
    redeem_count      INTEGER NOT NULL DEFAULT 0,
    note              TEXT
);
