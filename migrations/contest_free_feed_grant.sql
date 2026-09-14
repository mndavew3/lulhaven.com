-- contest_free_feed_grant — tracks the ONE free blocklist refresh every real
-- Haven instance gets while the Challenge window is open (CONTEST_ACTIVE=1),
-- independent of any paid subscription or contest claim/registration.
--
-- Design (Dave, 2026-09-14): every Haven gets one free download, gated
-- strictly to "the contest is currently live" — not a standing giveaway, not
-- tied to filing a claim. entitlement-check.js consumes this: an unentitled
-- serial gets exactly one entitled=true answer while the flag is up, then
-- reverts to its normal (usually not_registered) status. Local filtering
-- never turns off either way — this only ever gates FRESH data.
--
-- serial must already exist in issued_serials (a real provisioned unit) to
-- receive a grant — closes the obvious abuse path of hitting the endpoint
-- with arbitrary made-up serials to spam rows.
CREATE TABLE IF NOT EXISTS contest_free_feed_grant (
  serial           TEXT PRIMARY KEY,
  granted_datetime TEXT NOT NULL
);
