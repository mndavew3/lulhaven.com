// End-to-end proof of the anti-sybil trust-earner redemption path against live
// adq-votes + adq-ident (both `wrangler dev`, DB seeded by gen-corroborate-seed.mjs).
// Exercises: early-rank credit, promotion at EST_THRESHOLD, double-redeem guard,
// late-rank rejection, non-confirmed rejection, and privacy of the response.
import { adqMac, canonical, bodyHash, submitterToken, verifyKey } from "../lib/adqmac.js";
import { EPOCH } from "./gen-votes-testdata.mjs";

const VOTES = process.env.VOTES_URL || "http://127.0.0.1:8792";
const IDENT = process.env.IDENT_URL || "http://127.0.0.1:8791";

let fail = 0;
const ok = (c, m) => { if (c) console.log("ok   " + m); else { fail++; console.log("FAIL " + m); } };

async function corroborate(serial, cidrs, { epoch = EPOCH, tamper = false } = {}) {
  const tok = await submitterToken(serial, EPOCH);
  const vkey = await verifyKey(serial, EPOCH);
  const body = JSON.stringify({ epoch, cidrs });
  const ts = String(Math.floor(Date.now() / 1000));
  const bh = await bodyHash(body);
  let sig = await adqMac(vkey, canonical("POST", "/api/adq/corroborate", ts, bh));
  if (tamper) sig = sig.slice(0, -1) + (sig.slice(-1) === "0" ? "1" : "0");
  const r = await fetch(`${VOTES}/api/adq/corroborate`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Haven-Sub": tok, "X-Haven-Ts": ts, "X-Haven-Sig": sig },
    body,
  });
  return { status: r.status, body: await r.json() };
}

async function trustOf(serial) {
  const tok = await submitterToken(serial, EPOCH);
  const vkey = await verifyKey(serial, EPOCH);
  const ts = String(Math.floor(Date.now() / 1000));
  const bh = await bodyHash("");
  const sig = await adqMac(vkey, canonical("POST", "/api/adq/votes", ts, bh));
  const r = await fetch(`${IDENT}/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ submitter_token: tok, ts, sig, method: "POST", path: "/api/adq/votes", body_hash: bh, cidrs: [] }),
  });
  return (await r.json()).trust_tier;
}

const R0 = ["205.0.113.10/32", "205.0.113.11/32", "205.0.113.12/32", "205.0.113.13/32", "205.0.113.14/32"];
const NONCONF = "205.0.113.40/32";

// 1. RTR_0 redeems its 5 early+graduated cidrs + one non-confirmed -> credited exactly 5
let r = await corroborate("RTR_0", [...R0, NONCONF]);
ok(r.status === 200 && r.body.credited === 5, `RTR_0 early corroborations credited 5 (got ${r.body.credited})`);
ok(r.body.trust_tier === "established", "RTR_0 promoted new -> established at EST_THRESHOLD=5");

// 2. privacy: the response carries no blinded_id/serial/token
const blob = JSON.stringify(r.body);
ok(!["blinded_id", "serial", "submitter_token", "verify_key"].some((k) => blob.includes(k)), "corroborate response leaks no blinded_id/serial/token");

// 3. double-redeem the same cidrs -> credited 0 (receipts already spent)
r = await corroborate("RTR_0", R0);
ok(r.status === 200 && r.body.credited === 0, "double-redeem -> credited 0 (spent-guard)");

// 4. RTR_0 still established after the no-op redeem
ok((await trustOf("RTR_0")) === "established", "RTR_0 trust persists established");

// 5. LATE voter (rank 50 > EARLY_RANK) -> credited 0 (front-running an obvious graduation earns nothing)
r = await corroborate("RTR_1", ["205.0.113.30/32"]);
ok(r.status === 200 && r.body.credited === 0, "late-rank (>8) vote -> credited 0 (counterfactual gate)");

// 6. RTR_2 with only 3 early corroborations -> credited 3, stays 'new' (< EST_THRESHOLD)
r = await corroborate("RTR_2", ["205.0.113.20/32", "205.0.113.21/32", "205.0.113.22/32"]);
ok(r.status === 200 && r.body.credited === 3, `RTR_2 credited 3 (got ${r.body.credited})`);
ok((await trustOf("RTR_2")) === "new", "RTR_2 with 3 (<5) stays 'new'");

// 7. non-confirmed cidr alone -> credited 0
r = await corroborate("RTR_0", [NONCONF]);
ok(r.status === 200 && r.body.credited === 0, "non-confirmed cidr -> credited 0");

// 8. tampered signature -> 401
r = await corroborate("RTR_0", R0, { tamper: true });
ok(r.status === 401, "tampered corroborate sig -> 401");

console.log(fail === 0 ? "\nALL PASS" : `\n${fail} FAILED`);
process.exit(fail === 0 ? 0 : 1);
