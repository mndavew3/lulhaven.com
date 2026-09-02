-- Haven Challenge — contest_claims: judge-ranking columns (task_ladder #23 port).
-- Applies to D1 binding haven_builds. Apply with:
--   wrangler d1 execute haven-builds --file=migrations/contest_claims_judge.sql --remote
--
-- WHY THIS FILE EXISTS: the original #23 build (commit 607900a) targeted
-- challenge_findings — the orphaned legacy table that #114's investigation had
-- already flagged "do not build on" — and that table does not exist in remote
-- D1 at all. The judge tool + leaderboard are hereby ported to contest_claims,
-- the live intake table. Found 2026-09-02 while applying the un-applied
-- challenge-judge-schema.sql against production.
--
-- Tracker decisions honored (challenge.db, all LOCKED):
--   #44 judge_rank is set BY HAND by a judge (1 = first). Nothing computes it.
--   #12 tier ('vm' | 'full') IS the board key. contest_claims has no tier at
--       intake (the exported config doesn't know which tier the contestant
--       entered), so the vetting operator sets it at confirm time via
--       /api/claim-vet — Haven confirms and tiers, judges only rank (#44's
--       division of duties, and CONTEST_EXPORT_IMPORT_DESIGN.md §3c's
--       evidence_sufficient gate is likewise vetting-side).
--   #45 judge_rank is the private metric — never returned by a public endpoint.

ALTER TABLE contest_claims ADD COLUMN tier TEXT;
ALTER TABLE contest_claims ADD COLUMN judge_rank INTEGER;

-- Judge tool per-tier listing + public per-tier top-3 both order on this.
CREATE INDEX IF NOT EXISTS idx_claims_judge_rank ON contest_claims(tier, judge_rank);
