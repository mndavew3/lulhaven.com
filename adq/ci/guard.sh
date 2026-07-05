#!/bin/sh
# adq CI guard — enforces the gold design's STRUCTURAL invariants so a future
# edit can't silently collapse the privacy separation. Run in CI + pre-deploy.
# Exit non-zero on any violation.
set -u
ADQ="$(cd "$(dirname "$0")/.." && pwd)"
fail=0
bad() { echo "GUARD FAIL: $*"; fail=1; }
okay() { echo "ok   $*"; }

# 1. Binding separation — the heart of "no single SQL context joins vote->serial->WAN-IP"
#    (strip // comments first so explanatory comments don't trip the check)
INAM=$(sed 's#//.*##' "$ADQ/ident/wrangler.jsonc")
VNAM=$(sed 's#//.*##' "$ADQ/votes/wrangler.jsonc")
echo "$INAM" | grep -q 'DB_IDENT' && ! echo "$INAM" | grep -qE 'DB_VOTES|haven_builds' \
  && okay "adq-ident binds DB_IDENT only" || bad "adq-ident binding not isolated"
echo "$VNAM" | grep -q 'DB_VOTES' && ! echo "$VNAM" | grep -qE 'DB_IDENT|haven_builds' \
  && okay "adq-votes binds DB_VOTES only" || bad "adq-votes binding not isolated"

# 2. No adq_* <-> haven_builds/kyc/router_survey join anywhere in adq worker code
if grep -rnE 'provisioned_units|kyc_|router_survey' "$ADQ/ident/src" "$ADQ/votes/src" 2>/dev/null; then
  bad "adq worker references a haven_builds/kyc table (cross-db join risk)"
else okay "no adq_* <-> haven_builds/kyc/router_survey reference"; fi

# 3. No source_ip / CF-Connecting-IP column in the adq_* TABLE schemas. (The
#    migrate_haven_builds.sql file legitimately references source_ip to PURGE it
#    from the existing haven_builds table, so it is excluded.)
if grep -vE '^[[:space:]]*--' "$ADQ/schema/adq_identity.sql" "$ADQ/schema/adq_votes.sql" | grep -niE 'source_ip|connecting_ip' 2>/dev/null; then
  bad "adq table schema contains a source_ip/CF-IP column"
else okay "no source_ip column in adq_* table schemas"; fi

# 4. S2 confirmed projection key-allowlist — never serve serial/token/blinded_id/exact-count
S2SEL=$(grep -A1 "SELECT cidr, tier, confidence, count_bucket, auto_apply FROM adq_verdicts" "$ADQ/votes/src/index.js")
if echo "$S2SEL" | grep -qE 'serial|submitter_token|blinded_id|verify_key|distinct_voters'; then
  bad "S2 confirmed SELECT leaks a forbidden column"
else okay "S2 confirmed projection is the allowlist {cidr,tier,confidence,count_bucket,auto_apply}"; fi

# 5. Cross-impl MAC vector — router sha256sum(KEY:mac:MSG) == worker adqMac
if node "$ADQ/lib/adqmac.vector.test.mjs" >/dev/null 2>&1; then okay "adqMac cross-impl vector (JS==sh)"; else bad "adqMac cross-impl vector FAILED (would 401 every upload)"; fi

# 6. adqMac must NOT be real HMAC (the DOA the design caught). importKey/subtle.sign
#    are the WebCrypto HMAC tells; the word "HMAC" appears only in explanatory comments.
if grep -qE 'importKey|subtle\.sign' "$ADQ/lib/adqmac.js"; then bad "adqmac.js uses HMAC APIs (must be salted-SHA256 to match the router)"; else okay "adqMac is salted-SHA256 (digest only), not HMAC"; fi

# --- trust-earner (corroboration) invariants (sybil/privacy audit of the redemption path) ---

# 7. adq-ident must NOT be client-facing for the redemption: corroboration routes through
#    adq-VOTES so a household WAN IP + submitter_token never co-locate with flagged cidrs at
#    ident's edge. ident's only routes are /verify + /credit(+/__cron); no /corroborate, no S1/S2.
if grep -qE '/corroborate|/api/adq/(votes|verdicts)' "$ADQ/ident/src/index.js"; then
  bad "adq-ident references a client/redemption route (must stay verify+credit only)"
else okay "adq-ident exposes no client-facing redemption route (corroborate via adq-votes)"; fi

# 8. adq_receipt_spent (double-redeem guard) holds ONLY an opaque blinded_id + a coarse DATE —
#    never a cidr/serial/token/host or a second-precision timestamp.
RS=$(sed -n '/CREATE TABLE IF NOT EXISTS adq_receipt_spent/,/);/p' "$ADQ/schema/adq_votes.sql")
if echo "$RS" | grep -qiE 'cidr|serial|token|host_ip|datetime\('; then
  bad "adq_receipt_spent schema exposes a forbidden column"
else okay "adq_receipt_spent projects only {blinded_id, spent_date}"; fi

# 9. a purge of adq_receipt_spent within ~salt life must exist in the cron, so no live-salt
#    recompute oracle survives a quarter boundary.
if grep -qE "DELETE FROM adq_receipt_spent WHERE spent_date < date\('now','-1[0-9][0-9] days'\)" "$ADQ/votes/src/index.js"; then
  okay "adq_receipt_spent is purged <= salt life in runCron"
else bad "no adq_receipt_spent purge (~salt life) in runCron — a live-salt oracle would persist"; fi

# 10. the redemption response must project only counts — no blinded_id/serial/token echoed back.
CRESP=$(sed -n '/async function handleCorroborate/,/^}/p' "$ADQ/votes/src/index.js")
if echo "$CRESP" | grep -E 'return json\(' | grep -qiE 'blinded_id|serial|submitter_token|host_ip'; then
  bad "handleCorroborate leaks a forbidden field back to the client"
else okay "handleCorroborate returns only {ok,credited,trust_tier}"; fi

# 11. the router redemption call must target ADQ_ENDPOINT (adq-votes), never an ident host.
RTR="/home/dave/haven/router/package/luci-app-haven/root/usr/share/haven/adq-corroborate.sh"
if [ -f "$RTR" ]; then
  if grep -q 'ADQ_ENDPOINT/api/adq/corroborate' "$RTR"; then
    okay "router adq-corroborate targets adq-votes (ADQ_ENDPOINT/api/adq/corroborate)"
  else bad "router adq-corroborate.sh does not target ADQ_ENDPOINT/api/adq/corroborate"; fi
else okay "router adq-corroborate.sh not present yet (skip)"; fi

# 12. the residential classifier (adq_hosting_asn) MUST be seeded — an empty table makes the
#     residential auto-apply/credit gate fail OPEN (a datacenter fleet counts as residential).
if grep -qE 'INSERT +OR +IGNORE +INTO +adq_hosting_asn|INSERT +INTO +adq_hosting_asn' "$ADQ/schema/seed.sql"; then
  okay "adq_hosting_asn is seeded (residential gate cannot fail open on empty table)"
else bad "adq_hosting_asn has no seed — residential gate would fail OPEN in prod"; fi

# 13. adq-ident must have NO public ingress (workers_dev:false + no route), so the
#     unauthenticated-internal /credit endpoint is unreachable from the internet.
INW=$(sed 's#//.*##' "$ADQ/ident/wrangler.jsonc")
if echo "$INW" | grep -qE '"workers_dev"[[:space:]]*:[[:space:]]*false' && ! echo "$INW" | grep -qE '"routes?"'; then
  okay "adq-ident has no public ingress (workers_dev:false, no route)"
else bad "adq-ident may be publicly reachable (workers_dev not false / a route is declared) — /credit is unauthed"; fi

echo ""; [ "$fail" = 0 ] && echo "== ADQ GUARD: ALL PASS ==" || echo "== ADQ GUARD: FAILURES =="
exit $fail
