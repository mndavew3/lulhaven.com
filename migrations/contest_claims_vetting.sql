-- Haven Challenge — contest_claims: the vetting step (task_ladder #114).
-- Applies to D1 binding haven_builds. STAGED — apply with:
--   wrangler d1 execute haven-builds --file=migrations/contest_claims_vetting.sql --remote
--
-- vet_note: the operator's note when a claim is set 'unconfirmed'. Per
-- challenge-rules.html ("Two states, and neither of them is 'rejected.'" /
-- "an Unconfirmed finding gets an invitation, not a dismissal") this note IS
-- that invitation — what more evidence we're asking for, not a verdict.
--
-- Guard: contest_claims.status must never become 'rejected'. Equivalent-to-
-- CHECK via triggers rather than a CHECK constraint: SQLite/D1 can only add a
-- CHECK by rebuilding the whole table, and this table already carries live
-- contestant PII. A trigger is additive-only and touches no existing row —
-- the one-line safety net Dave approved. Mirrors challenge-findings-schema.sql's
-- CHECK (status IN ('submitted','confirmed','unconfirmed')), same promise,
-- table that can't be altered the same way because it's already live.

ALTER TABLE contest_claims ADD COLUMN vet_note TEXT;

CREATE TRIGGER IF NOT EXISTS trg_contest_claims_no_reject_ins
BEFORE INSERT ON contest_claims
FOR EACH ROW WHEN NEW.status = 'rejected'
BEGIN
  SELECT RAISE(ABORT, 'contest_claims.status may never be rejected — challenge-rules.html promises Confirmed/Unconfirmed only');
END;

CREATE TRIGGER IF NOT EXISTS trg_contest_claims_no_reject_upd
BEFORE UPDATE OF status ON contest_claims
FOR EACH ROW WHEN NEW.status = 'rejected'
BEGIN
  SELECT RAISE(ABORT, 'contest_claims.status may never be rejected — challenge-rules.html promises Confirmed/Unconfirmed only');
END;
