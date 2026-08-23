// Integration test for adq-ident /verify against a running `wrangler dev`.
// Assumes DB_IDENT (local) already holds the row this derives. BASE from env.
import { adqMac, canonical, bodyHash, submitterToken, verifyKey } from "../lib/adqmac.js";

const BASE = process.env.BASE || "http://127.0.0.1:8791";

// This is an INTEGRATION test: it needs the adq worker answering on BASE
// (`wrangler dev` in this directory). When nothing is listening, every fetch
// threw ECONNREFUSED and the file died with a stack trace, which the regimen
// scored as an ERROR — a missing bench prerequisite dressed up as a broken
// product. Report it as the skip it is (the runner honours a leading SKIP line)
// so a run without the worker stays legible. Found 2026-08-23.
try {
  await fetch(BASE, { signal: AbortSignal.timeout(2000) });
} catch {
  console.log(`SKIP — adq worker not reachable at ${BASE}; start \`wrangler dev\` in website/adq to run this`);
  process.exit(77);
}
const RTR_SEED = "TESTSECRET_ROUTER_0001";
const EPOCH = "2026Q3";
const SALT = "a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1";
const CIDR = "203.0.113.7/32";

let fail = 0;
const ok = (c, m) => { if (c) console.log("ok   " + m); else { fail++; console.log("FAIL " + m); } };

async function callVerify({ token, vkey, tsOffset = 0, tamper = false, cidrs = [] }) {
  const ts = String(Math.floor(Date.now() / 1000) + tsOffset);
  const method = "POST", path = "/api/adq/votes", bh = await bodyHash("");
  let sig = await adqMac(vkey, canonical(method, path, ts, bh));
  if (tamper) sig = sig.slice(0, -1) + (sig.slice(-1) === "0" ? "1" : "0");
  const r = await fetch(`${BASE}/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ submitter_token: token, ts, sig, method, path, body_hash: bh, cidrs }),
  });
  return { status: r.status, body: await r.json() };
}

const token = await submitterToken(RTR_SEED, EPOCH);
const vkey = await verifyKey(RTR_SEED, EPOCH);

// 1. happy path + blinding
let r = await callVerify({ token, vkey, cidrs: [CIDR] });
ok(r.status === 200 && r.body.ok === true, "valid signed verify -> 200 ok");
ok(r.body.trust_tier === "established", "trust_tier returned from DB_IDENT");
ok(!("serial" in r.body) && !("submitter_token" in r.body), "response leaks NO serial/token");
const expectBlind = await adqMac(SALT, `${token}|${CIDR}`);
ok(r.body.blinded && r.body.blinded[0] && r.body.blinded[0].blinded_id === expectBlind, "blinded_id = adqMac(salt, token|cidr)");

// 2. stale
r = await callVerify({ token, vkey, tsOffset: -200 });
ok(r.status === 401 && r.body.reason === "stale", "stale ts -> 401 stale");

// 3. tampered sig
r = await callVerify({ token, vkey, tamper: true });
ok(r.status === 401 && r.body.reason === "badmac", "tampered sig -> 401 badmac");

// 4. unknown token
r = await callVerify({ token: "deadbeef".repeat(8), vkey });
ok(r.status === 401 && r.body.reason === "badtoken", "unknown token -> 401 badtoken");

// 5. revoked serial (the row REVOKED_SERIAL was inserted by the harness for a 2nd token)
const rtoken = await submitterToken("REVOKED_SECRET", EPOCH);
const rvkey = await verifyKey("REVOKED_SECRET", EPOCH);
r = await callVerify({ token: rtoken, vkey: rvkey });
ok(r.status === 401 && r.body.reason === "revoked", "revoked serial -> 401 revoked");

console.log(fail === 0 ? "\nALL PASS" : `\n${fail} FAILED`);
process.exit(fail === 0 ? 0 : 1);
