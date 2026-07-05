// Emit DB_VOTES corroborate-seed.sql: a fixture proving the anti-sybil trust-earner
// redemption path. Uses disjoint 205.0.113.x cidrs so it coexists with votes.integ
// (203.x) and the curated seed. Early votes are backdated -3d so the strict day-
// precedence gate (vote day < graduation day) can actually be satisfied in one session.
import { submitterToken, adqMac } from "../lib/adqmac.js";
import { EPOCH, SALT } from "./gen-votes-testdata.mjs";
import { writeFileSync } from "node:fs";

const ADNET = 394699; // applovin (dedicated-adnet) -> N=25 bar, eligible for auto-apply class

// [serial, cidr, rank] — an EARLY vote (rank<=8) on a cidr that later graduates.
const EARLY = [
  ["RTR_0", "205.0.113.10/32", 1], ["RTR_0", "205.0.113.11/32", 2], ["RTR_0", "205.0.113.12/32", 1],
  ["RTR_0", "205.0.113.13/32", 3], ["RTR_0", "205.0.113.14/32", 1],   // RTR_0: 5 -> established
  ["RTR_2", "205.0.113.20/32", 1], ["RTR_2", "205.0.113.21/32", 2], ["RTR_2", "205.0.113.22/32", 1], // RTR_2: 3 -> new
  ["RTR_1", "205.0.113.30/32", 50], // LATE (rank>8) -> NOT creditable
];
const CONFIRMED = [...new Set(EARLY.map((e) => e[1]))]; // every early cidr graduates
const NONCONF = "205.0.113.40/32";                       // RTR_0 early-voted but NEVER graduates
EARLY.push(["RTR_0", NONCONF, 1]);

const L = [];
for (const cidr of CONFIRMED) {
  const host = cidr.split("/")[0];
  L.push(`INSERT INTO adq_verdicts (cidr,prefix_len,server_asn,tenancy,count_bucket,risk_class,tier,auto_apply,credit_eligible,confidence,graduated_datetime,last_vote_date,updated_datetime) VALUES ('${cidr}',32,${ADNET},'dedicated-adnet','25+','adnet','community-confirmed',0,1,0.9,datetime('now'),date('now'),datetime('now'));`);
  // k-anon fillers (distinct voters >= K_FLOOR) so the "still >= K_FLOOR" gate passes
  for (let j = 0; j < 6; j++)
    L.push(`INSERT INTO adq_votes (cidr,prefix_len,host_ip,server_asn,blinded_id,trust_tier,vote_rank,batch_id,received_date) VALUES ('${cidr}',32,'${host}',${ADNET},'fill_${host}_${j}','new',${j + 3},'bf_${host}_${j}',date('now','-3 days'));`);
}
for (const [serial, cidr, rank] of EARLY) {
  const host = cidr.split("/")[0];
  const tok = await submitterToken(serial, EPOCH);
  const bid = await adqMac(SALT, `${tok}|${cidr}`);
  L.push(`INSERT INTO adq_votes (cidr,prefix_len,host_ip,server_asn,blinded_id,trust_tier,vote_rank,batch_id,received_date) VALUES ('${cidr}',32,'${host}',${ADNET},'${bid}','new',${rank},'be_${serial}_${host}',date('now','-3 days'));`);
}
writeFileSync(new URL("./corroborate-seed.sql", import.meta.url), L.join("\n") + "\n");
console.log(`wrote corroborate-seed.sql (${CONFIRMED.length} confirmed cidrs, ${EARLY.length} early votes)`);
