-- Haven Challenge — contest_claims: capture rules acceptance at claim submission.
-- Applies to D1 binding haven_builds. STAGED — apply with:
--   wrangler d1 execute haven-builds --file=migrations/contest_claims_rules_acceptance.sql --remote
--
-- Mirrors challenge_findings.rules_version / rules_accepted_datetime (see
-- functions/api/finding.js #50): record WHO accepted WHICH rules version, WHEN.
-- Submission is the moment the terms actually bind, so the value is captured
-- at claim-intake time, not at registration. Optional/fail-open on purpose --
-- a missing checkbox must never cost a contestant their claim (see claim-intake.js).
--
-- task_ladder #24 (Cerberus resolve-wave): challenge_tasks.db #50 was marked
-- 'done' for challenge_findings only; contest_claims never got this column pair.
ALTER TABLE contest_claims ADD COLUMN rules_version TEXT;
ALTER TABLE contest_claims ADD COLUMN rules_accepted_datetime TEXT;
