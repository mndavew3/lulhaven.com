#!/bin/sh
# run-integ.sh — spin the local two-worker adq fleet (miniflare D1) and run the HTTP
# integ suite: ident auth/blind, the 30-router vote fleet, and the trust-earner
# corroboration path. Local only; no cloud, no auth, nothing deployed. Teardown by
# killing the wrangler PIDs + `pkill -x workerd` (never a self-matching broad pkill).
set -u
ADQ="$(cd "$(dirname "$0")/.." && pwd)"
SCRATCH="${ADQ_SCRATCH:-/tmp/claude-1000/-home-dave-haven/4ce5016f-2622-45c9-9fdf-5fdbbcc7ca52/scratchpad}/adq-fleet"
PI="$SCRATCH/ident-state"; PV="$SCRATCH/votes-state"
LOGI="$SCRATCH/ident.log"; LOGV="$SCRATCH/votes.log"
export WRANGLER_SEND_METRICS=false CI=1
WR="npx --yes wrangler"

rm -rf "$SCRATCH"; mkdir -p "$SCRATCH"
pkill -9 -x workerd 2>/dev/null; sleep 1   # clear any leftover dev runtime holding the inspector ports

d1i() { $WR d1 execute haven-adq-ident --local --persist-to "$PI" --config "$ADQ/ident/wrangler.jsonc" "$@" >/dev/null 2>>"$SCRATCH/seed.err"; }
d1v() { $WR d1 execute haven-adq-votes --local --persist-to "$PV" --config "$ADQ/votes/wrangler.jsonc" "$@" >/dev/null 2>>"$SCRATCH/seed.err"; }

echo "== schema + seed =="
d1i --file "$ADQ/schema/adq_identity.sql"
d1v --file "$ADQ/schema/adq_votes.sql"
d1v --file "$ADQ/schema/seed.sql"
# ident: TEST rows (ident.integ) + salt, then RTR_0..29 verify_key rows (fleet + corroborate)
d1i --file "$ADQ/ident/insert.sql"
node "$ADQ/votes/gen-votes-testdata.mjs" >/dev/null 2>&1
grep 'INSERT INTO adq_verify_key' "$ADQ/votes/ident-insert.sql" > "$SCRATCH/rtr-keys.sql"
d1i --file "$SCRATCH/rtr-keys.sql"
# votes: the corroboration fixture (disjoint 205.x cidrs, backdated early votes)
node "$ADQ/votes/gen-corroborate-seed.mjs" >/dev/null 2>&1
d1v --file "$ADQ/votes/corroborate-seed.sql"

echo "== start dev servers =="
$WR dev --config "$ADQ/ident/wrangler.jsonc" --local --ip 127.0.0.1 --port 8791 --inspector-port 9391 --persist-to "$PI" --show-interactive-dev-session=false >"$LOGI" 2>&1 &
PID_I=$!
$WR dev --config "$ADQ/votes/wrangler.jsonc" --local --ip 127.0.0.1 --port 8792 --inspector-port 9392 --persist-to "$PV" --show-interactive-dev-session=false >"$LOGV" 2>&1 &
PID_V=$!

cleanup() { kill "$PID_I" "$PID_V" 2>/dev/null; pkill -9 -x workerd 2>/dev/null; }
trap cleanup EXIT INT TERM

echo "== wait ready =="
code() { curl -s -o /dev/null -m 2 -w '%{http_code}' "$@" 2>/dev/null; }
i=0
while [ $i -lt 90 ]; do
  ci=$(code http://127.0.0.1:8791/verify)                 # GET -> 405 once up
  cv=$(code http://127.0.0.1:8792/api/adq/verdicts)       # GET no-auth -> 401 once up
  [ "$ci" != "000" ] && [ "$cv" != "000" ] && break
  i=$((i + 1)); sleep 1
done
echo "ready after ${i}s (ident=$ci votes=$cv)"
if [ "$ci" = "000" ] || [ "$cv" = "000" ]; then
  echo "!! a dev server never came up — logs:"; tail -n 20 "$LOGI"; tail -n 20 "$LOGV"; exit 2
fi

RC=0
echo ""; echo "== ident.integ =="; node "$ADQ/ident/ident.integ.test.mjs" || RC=1
echo ""; echo "== votes.integ =="; node "$ADQ/votes/votes.integ.test.mjs" || RC=1
echo ""; echo "== corroborate.integ =="; node "$ADQ/votes/corroborate.integ.test.mjs" || RC=1
echo ""; [ "$RC" = 0 ] && echo "== INTEG: ALL PASS ==" || echo "== INTEG: FAILURES =="
exit $RC
