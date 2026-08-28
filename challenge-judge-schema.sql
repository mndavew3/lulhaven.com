-- challenge_findings.judge_rank — Haven Challenge judge-ranking (haven-builds D1).
-- Backs GET/POST /api/challenge-judge and the public GET /api/challenge-leaderboard.
-- Apply remote:
--   wrangler d1 execute haven-builds --remote --file=challenge-judge-schema.sql
--
-- Tracker: ~/haven/data/sql/challenge.db, decisions #44, #45, #12 (all LOCKED,
-- verified 2026-08-27 before writing any of this):
--
--   #44 RANKING AUTHORITY = the judge pool determines standing (human
--   judgment), not an algorithmic score. judge_rank is therefore a plain
--   integer a judge sets/adjusts BY HAND from the judging tool — nothing here
--   computes it. 1 = first place, 2 = second, and so on. NULL = not yet
--   ranked by a judge.
--
--   #12 Leaderboards are separate per tier ("one board tagged by tier" —
--   ADOPTED wording). challenge_findings.tier ('vm' | 'full') already IS the
--   board key, so no separate board column is needed.
--
--   #45 boards may be ranked BY a metric, but the metric is never displayed —
--   only who placed 1st/2nd/3rd. judge_rank is exactly that private metric:
--   it drives ORDER BY inside the leaderboard query and is never returned by
--   any public endpoint.

ALTER TABLE challenge_findings ADD COLUMN judge_rank INTEGER;

-- Speeds both the judge tool's per-tier listing (ordered by rank) and the
-- public leaderboard's per-tier top-3 query.
CREATE INDEX IF NOT EXISTS idx_findings_judge_rank ON challenge_findings(tier, judge_rank);
