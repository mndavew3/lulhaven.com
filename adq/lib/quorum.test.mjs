// Unit test for quorum.recompute — the design's matrix, now including the anti-sybil
// ESTABLISHED-trust auto-apply gate (wf_943aa6d7 audit fix) and its fail-closed cases.
import { recompute } from "./quorum.js";

const HOSTING = new Set(["99001", "99002", "99003", "99004", "99005"]); // datacenter submitter ASNs
const SETS = {
  denylistAsns: new Set(["16509", "13335"]), // aws, cloudflare
  denylistCidrs: new Set(),
  adnetAsns: new Set([394699]),               // applovin (dedicated adnet)
  hostingAsns: HOSTING,                        // SUBMITTER classifier (residential gate)
};
const ADNET = 394699, CLOUD = 12345, CLOUDB = 67890, DENY = 16509;
const NOW = "2026-06-30";                       // lease "today" for auto-apply cases

let fail = 0;
const ok = (c, m) => { if (c) console.log("ok   " + m); else { fail++; console.log("FAIL " + m); } };

// make n distinct voters for one host/cidr with round-robin region/asn cells.
//   established: the first `established` voters carry trust_tier='established' (rest 'new')
//   hosting:    established voters ride datacenter ASNs (should be REJECTED from the gate)
//   date0:      base index into the date ring (shift votes into the past for lease tests)
function votes(n, { asn = ADNET, host = "203.0.113.7", regions = 1, asns = 1, days = 3, withDiv = true,
                    established = 0, hosting = false } = {}) {
  const R = ["US", "DE", "JP", "BR", "AU"];
  const A = hosting ? ["99001", "99002", "99003", "99004", "99005"] : ["r1", "r2", "r3", "r4", "r5"];
  const D = ["2026-06-28", "2026-06-29", "2026-06-30", "2026-06-27", "2026-06-26"];
  const out = [];
  for (let i = 0; i < n; i++) out.push({
    blinded_id: `bid_${host}_${i}`,
    host_ip: host,
    server_asn: asn,
    ingest_region: withDiv ? R[i % regions] : null,
    ingest_asn_bucket: withDiv ? A[Math.floor(i / regions) % asns] : null, // decorrelate from region
    received_date: D[i % days],
    trust_tier: i < established ? "established" : "new",
  });
  return out;
}
const AA = { NOW }; // cfg for auto-apply cases (activates the lease)

// 1. sub-K_FLOOR -> null
ok(recompute("203.0.113.7/32", votes(4, { regions: 3, asns: 3 }), SETS) === null, "4 voters -> null (k-anon)");

// 2. 24 adnet -> likely (24 < 25, >= 12.5)
ok(recompute("203.0.113.7/32", votes(24, { regions: 3, asns: 3 }), SETS).tier === "likely", "24 adnet -> likely");

// 3. 25 adnet all-new -> community-confirmed, auto_apply=0 (25 < 100 AND 0 established)
let v = recompute("203.0.113.7/32", votes(25, { regions: 3, asns: 3 }), SETS, AA);
ok(v.tier === "community-confirmed" && v.auto_apply === 0, "25 adnet -> confirmed, advisory (auto_apply=0)");

// 4. THE SYBIL DEFENSE: 100 adnet, diverse, multi-day, but ALL 'new' -> confirmed, auto_apply=0.
//    (A freshly-minted farm can reach advisory one-tap but NEVER a silent fleet-wide drop.)
v = recompute("203.0.113.7/32", votes(100, { regions: 3, asns: 3, days: 2 }), SETS, AA);
ok(v.tier === "community-confirmed" && v.auto_apply === 0, "100 all-NEW diverse -> confirmed, auto_apply=0 (sybil gate)");
ok(v.confidence === 0.99, "all-new confirmed still gets coarse 0.99 (advisory)");

// 5. THE LEGIT PATH: 100 adnet, 9 ESTABLISHED-residential across 3 regions/3 ASNs, multi-day, fresh -> auto_apply=1
v = recompute("203.0.113.7/32", votes(100, { regions: 3, asns: 3, days: 3, established: 9 }), SETS, AA);
ok(v.tier === "community-confirmed" && v.auto_apply === 1, "100 w/ 9 established-diverse-fresh -> auto_apply=1");
ok(v.tenancy === "dedicated-adnet", "adnet tenancy = dedicated-adnet");

// 6. FAIL-CLOSED (residential gate, sybil #4): 100 established but on HOSTING ASNs -> auto_apply=0
v = recompute("203.0.113.7/32", votes(100, { regions: 3, asns: 3, days: 3, established: 100, hosting: true }), SETS, AA);
ok(v.tier === "community-confirmed" && v.auto_apply === 0, "100 established but DATACENTER ASNs -> auto_apply=0 (residential gate)");

// 7. FAIL-CLOSED (lease, sybil #1): established+diverse but votes are STALE vs NOW -> auto_apply=0
v = recompute("203.0.113.7/32", votes(100, { regions: 3, asns: 3, days: 3, established: 100 }), SETS, { NOW: "2026-08-15" });
ok(v.tier === "community-confirmed" && v.auto_apply === 0, "established but stale (outside FRESH_WINDOW) -> auto_apply=0 (lease)");

// 8. FAIL-CLOSED (too few established): 100 voters but only 3 established -> auto_apply=0 (need >=5)
v = recompute("203.0.113.7/32", votes(100, { regions: 3, asns: 3, days: 3, established: 3 }), SETS, AA);
ok(v.tier === "community-confirmed" && v.auto_apply === 0, "only 3 established (<5) -> auto_apply=0");

// 9. FAIL-CLOSED (established but single-day): all established diverse, 1 day -> auto_apply=0 (multi-day gate)
v = recompute("203.0.113.7/32", votes(100, { regions: 3, asns: 3, days: 1, established: 100 }), SETS, AA);
ok(v.tier === "community-confirmed" && v.auto_apply === 0, "established diverse but same-day -> auto_apply=0 (multi-day)");

// 10. FAIL-CLOSED (established but only 2 regions): -> auto_apply=0
v = recompute("203.0.113.7/32", votes(100, { regions: 2, asns: 3, days: 3, established: 100 }), SETS, AA);
ok(v.tier === "community-confirmed" && v.auto_apply === 0, "established but only 2 regions -> auto_apply=0");

// 11. 250 cloud with 2 distinct server-ASNs -> likely (single-ASN gate blocks confirm)
const mixed = [...votes(125, { asn: CLOUD, regions: 3, asns: 3, established: 125 }), ...votes(125, { asn: CLOUDB, host: "cloudb", regions: 3, asns: 3, established: 125 })];
const mixed2 = mixed.map((x, i) => ({ ...x, blinded_id: "cm_" + i, host_ip: "198.51.100.9" }));
v = recompute("198.51.100.9/32", mixed2, SETS, AA);
ok(v.tier === "likely", "250 cloud w/ 2 server-ASNs -> likely (single-ASN gate)");

// 12. 250 cloud single-ASN, all established -> confirmed but auto_apply=0 (not dedicated-adnet)
v = recompute("198.51.100.9/32", votes(250, { asn: CLOUD, host: "198.51.100.9", regions: 3, asns: 3, established: 250 }), SETS, AA);
ok(v.tier === "community-confirmed" && v.auto_apply === 0 && v.tenancy === "multi-tenant", "250 cloud 1-ASN -> confirmed, auto_apply=0 (multi-tenant, not adnet)");

// 13. denylist -> suppressed at any count
v = recompute("52.1.2.3/32", votes(300, { asn: DENY, host: "52.1.2.3", regions: 3, asns: 3, established: 300 }), SETS, AA);
ok(v.risk_class === "denylist" && v.tier === "suppressed" && v.auto_apply === 0 && v.credit_eligible === 0, "denylist ASN -> suppressed at 300 (credit_eligible=0, no undefined bind)");

// 14. unknown ASN (unresolved) -> N=250 bar
v = recompute("192.0.2.5/32", votes(30, { asn: null, host: "192.0.2.5", regions: 3, asns: 3 }), SETS);
ok(v.risk_class === "unknown" && v.tier === "candidate", "unknown ASN 30 voters -> candidate (N=250)");

// 15. count_bucket + prefix_len
v = recompute("203.0.113.0/24", votes(500, { regions: 3, asns: 3 }), SETS);
ok(v.count_bucket === "500+" && v.prefix_len === 24, "count_bucket 500+ and prefix_len from cidr");

// 16. confidence is a coarse bucket, never invertible to voter count
v = recompute("203.0.113.7/32", votes(100, { regions: 3, asns: 3, established: 9 }), SETS, AA);
ok([0.2, 0.5, 0.8, 0.9, 0.99].includes(v.confidence), "confidence is a coarse bucket, not invertible to voter count");

// --- verify-audit fixes ---
const NOHOST = { ...SETS, hostingAsns: new Set() }; // classifier table empty

// 17. credit_eligible: graduated via a residential, region/ASN/day-diverse quorum -> 1
v = recompute("203.0.113.7/32", votes(100, { regions: 3, asns: 3, days: 3 }), SETS, AA);
ok(v.credit_eligible === 1, "residential-diverse graduation -> credit_eligible=1");

// 18. self-seed defense: graduated by a DATACENTER-only fleet -> credit_eligible=0 (credits nobody)
v = recompute("203.0.113.7/32", votes(100, { regions: 3, asns: 3, days: 3, established: 100, hosting: true }), SETS, AA);
ok(v.tier === "community-confirmed" && v.credit_eligible === 0, "datacenter-only graduation -> credit_eligible=0 (self-seed defeated)");

// 19. FAIL-CLOSED: empty hosting classifier -> cannot certify residential -> credit_eligible=0 AND auto_apply=0
v = recompute("203.0.113.7/32", votes(100, { regions: 3, asns: 3, days: 3, established: 100 }), NOHOST, AA);
ok(v.credit_eligible === 0, "empty hosting classifier -> credit_eligible=0 (fail-closed)");
ok(v.auto_apply === 0, "empty hosting classifier -> auto_apply=0 (fail-closed, residential uncertifiable)");

// 20. FAIL-CLOSED: lease requires cfg.NOW — established+diverse but NO NOW -> auto_apply=0
v = recompute("203.0.113.7/32", votes(100, { regions: 3, asns: 3, days: 3, established: 100 }), SETS);
ok(v.tier === "community-confirmed" && v.auto_apply === 0, "no cfg.NOW -> auto_apply=0 (lease mandatory, not fail-absent)");

console.log(fail === 0 ? "\nALL PASS" : `\n${fail} FAILED`);
process.exit(fail === 0 ? 0 : 1);
