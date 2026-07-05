// End-to-end: 30 simulated routers upload votes to adq-votes (which calls
// adq-ident for auth+blinding), then poll verdicts. Assumes both dev servers up
// and DB_IDENT pre-seeded by gen-votes-testdata.mjs.
import { adqMac, canonical, bodyHash, submitterToken, verifyKey } from "../lib/adqmac.js";
import { EPOCH, N } from "./gen-votes-testdata.mjs";

const VOTES = process.env.VOTES_URL || "http://127.0.0.1:8792";
const DAY = "2026-06-30";
const ADNET_IP = "203.0.113.7";     // AS394699 adnet -> should confirm at >=25
const DENY_IP = "52.1.2.3";         // AS16509 aws -> suppressed at any count
const PRIV_IP = "10.0.0.5";         // non-public -> rejected pre-store

let fail = 0;
const ok = (c, m) => { if (c) console.log("ok   " + m); else { fail++; console.log("FAIL " + m); } };

async function upload(i, ips, { tamper = false } = {}) {
  const seed = `RTR_${i}`;
  const tok = await submitterToken(seed, EPOCH);
  const vkey = await verifyKey(seed, EPOCH);
  const batch_id = await bodyHash(`${seed}:adq-batch:${DAY}`);
  const body = JSON.stringify({ batch_id, votes: ips.map((ip) => ({ ip })) });
  const ts = String(Math.floor(Date.now() / 1000));
  const bh = await bodyHash(body);
  let sig = await adqMac(vkey, canonical("POST", "/api/adq/votes", ts, bh));
  if (tamper) sig = sig.slice(0, -1) + (sig.slice(-1) === "0" ? "1" : "0");
  const r = await fetch(`${VOTES}/api/adq/votes`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Haven-Sub": tok, "X-Haven-Ts": ts, "X-Haven-Sig": sig },
    body,
  });
  return { status: r.status, body: await r.json() };
}

async function pollVerdicts(i) {
  const seed = `RTR_${i}`;
  const tok = await submitterToken(seed, EPOCH);
  const vkey = await verifyKey(seed, EPOCH);
  const ts = String(Math.floor(Date.now() / 1000));
  const bh = await bodyHash("");
  const sig = await adqMac(vkey, canonical("GET", "/api/adq/verdicts", ts, bh));
  const r = await fetch(`${VOTES}/api/adq/verdicts?since=1970-01-01%2000:00:00`, {
    headers: { "X-Haven-Sub": tok, "X-Haven-Ts": ts, "X-Haven-Sig": sig },
  });
  return { status: r.status, body: await r.json() };
}

// 1. first upload: accepted 2 (adnet+deny public), 1 rejected non-public
let r = await upload(0, [ADNET_IP, DENY_IP, PRIV_IP]);
ok(r.status === 200 && r.body.accepted === 2, "upload -> accepted 2 public");
ok(r.body.rejected.some((x) => x.ip === PRIV_IP && x.reason === "nonpublic"), "non-public IP rejected pre-store");

// 2. dedup: same router same batch again -> deduped 2, accepted 0
r = await upload(0, [ADNET_IP, DENY_IP, PRIV_IP]);
ok(r.status === 200 && r.body.accepted === 0 && r.body.deduped === 2, "re-upload same batch -> deduped");

// 3. bad sig -> 401
r = await upload(1, [ADNET_IP], { tamper: true });
ok(r.status === 401, "tampered sig -> 401");

// 4. the rest of the fleet uploads (routers 1..N-1)
let uploaded = 1;
for (let i = 1; i < N; i++) { const rr = await upload(i, [ADNET_IP, DENY_IP]); if (rr.body.accepted >= 1) uploaded++; }
ok(uploaded >= 25, `fleet uploaded (${uploaded} routers)`);

// 5. poll verdicts
r = await pollVerdicts(2);
ok(r.status === 200 && r.body.ok, "verdict poll authed -> 200");
const conf = (r.body.confirmed || []).find((c) => c.cidr === `${ADNET_IP}/32`);
ok(!!conf && conf.tier === "community-confirmed", "adnet IP graduated to community-confirmed (>=25 voters)");
ok(conf && conf.auto_apply === false, "confirmed but auto_apply=false (no CF diversity locally -> advisory)");
ok((r.body.denylist || []).some((d) => d.cidr === `${DENY_IP}/32`), "denylisted AWS IP -> suppressed/denylist, NOT confirmed");
ok(!(r.body.confirmed || []).some((c) => c.cidr === `${DENY_IP}/32`), "denylist IP absent from confirmed");
// privacy: no forbidden keys in the served payload
const forbidden = ["serial", "submitter_token", "blinded_id", "verify_key", "distinct_voters"];
const blob = JSON.stringify(r.body);
ok(!forbidden.some((k) => blob.includes(k)), "S2 payload leaks no serial/token/blinded_id/exact-count");

// 6. unauthed poll -> 401
const rr = await fetch(`${VOTES}/api/adq/verdicts`);
ok(rr.status === 401, "unauthed verdict poll -> 401");

console.log(fail === 0 ? "\nALL PASS" : `\n${fail} FAILED`);
process.exit(fail === 0 ? 0 : 1);
