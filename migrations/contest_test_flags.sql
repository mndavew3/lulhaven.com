-- STAGED — apply with: wrangler d1 execute haven-builds --file=migrations/contest_test_flags.sql --remote
-- Test-mode flags for the contest tables (red-team 2026-09-08, mandate 2643):
-- QA/demo registrations and claims previously wrote REAL rows with nothing
-- marking them. testmode.js decides the boolean; these columns record it.
-- Query sites (ranking, counts, reviewer queues) must filter is_test=0.
-- NOTE: ALTER ADD COLUMN is not idempotent — apply once.
ALTER TABLE contest_accounts ADD COLUMN is_test INTEGER NOT NULL DEFAULT 0;
ALTER TABLE contest_claims ADD COLUMN is_test INTEGER NOT NULL DEFAULT 0;
