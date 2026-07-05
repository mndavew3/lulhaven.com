// quorum.js — pure recompute for one cidr's verdict. Called by S1 (on touched
// cidrs) and the cron. No D1 access: caller passes the live vote rows + the
// classification sets. Server-resolved server_asn on each vote is authoritative
// (client-reported ASN never enters). Returns a verdict object or null (<K_FLOOR).

export const DEFAULTS = {
  K_FLOOR: 5,
  N_ADNET: 25,
  N_CLOUD: 250,
  N_UNKNOWN: 250,
  AUTO_MIN_VOTERS: 100,
  AUTO_MIN_REGIONS: 3,
  AUTO_MIN_ASNS: 3,
  AUTO_MIN_DAYS: 2, // votes must span >= this many distinct days (defeats same-day sybil flood)
  MAX_COMPONENT_PCT: 30,
  K_HOST: 5, // per-host independent-voter floor for /24 widening
  AUTO_MIN_ESTABLISHED: 5, // silent auto-apply needs >= this many ESTABLISHED voters carrying
  // the region/ASN/day diversity. A fresh sybil farm is entirely 'new' -> 0 established ->
  // can reach community-confirmed (advisory one-tap) but NEVER auto_apply=silent. (tunable)
  FRESH_WINDOW_DAYS: 21, // auto-apply is a LEASE: the day-diversity must be met by votes within
  // this trailing window (sybil-audit #1 — a frozen graduation whose IP is later repointed at a
  // victim lapses instead of blocking forever). cfg.NOW (a date str) is MANDATORY for a silent
  // drop; absent NOW => leaseOk=false => auto_apply=0 (fail-closed, verify-audit #3).
  CREDIT_MIN_RESIDENTIAL: 5, // a cidr is only CREDIT-eligible (can earn trust for its early voters)
  // if it graduated via a residential, region/ASN/day-diverse quorum. Defeats the self-seed mint:
  // an attacker's own datacenter fleet graduates a throwaway cidr but earns nobody trust (verify #2).
};

const bucketFor = (v) =>
  v >= 1000 ? "1000+" : v >= 500 ? "500+" : v >= 100 ? "100+" : v >= 25 ? "25+" : "kfloor";

// pure "YYYY-MM-DD" minus N days (UTC), no Date.now — operates on the passed date.
function dateMinusDays(ymd, n) {
  const [y, m, d] = ymd.split("-").map(Number);
  const t = Date.UTC(y, m - 1, d) - n * 86400000;
  const dt = new Date(t);
  const p = (x) => String(x).padStart(2, "0");
  return `${dt.getUTCFullYear()}-${p(dt.getUTCMonth() + 1)}-${p(dt.getUTCDate())}`;
}

// votes: [{ blinded_id, host_ip, server_asn, ingest_region, ingest_asn_bucket }]
// sets:  { denylistAsns:Set<string>, denylistCidrs:Set<string>, adnetAsns:Set<number> }
export function recompute(cidr, votes, sets, cfg = DEFAULTS) {
  const C = { ...DEFAULTS, ...cfg };
  const prefix_len = Number((cidr.split("/")[1]) || 32);

  const voters = new Set(votes.map((v) => v.blinded_id));
  const distinct_voters = voters.size;
  if (distinct_voters < C.K_FLOOR) return null; // k-anonymity: no row exists

  // modal server_asn
  const asnCount = new Map();
  for (const v of votes) if (v.server_asn != null) asnCount.set(v.server_asn, (asnCount.get(v.server_asn) || 0) + 1);
  let server_asn = null, best = -1;
  for (const [a, n] of asnCount) if (n > best) { best = n; server_asn = a; }
  const distinctServerAsns = asnCount.size;

  // risk classification — server-resolved only
  const denyAsn = server_asn != null && sets.denylistAsns.has(String(server_asn));
  const denyCidr = sets.denylistCidrs.has(cidr);
  let risk_class;
  if (denyAsn || denyCidr) risk_class = "denylist";
  else if (server_asn != null && sets.adnetAsns.has(Number(server_asn))) risk_class = "adnet";
  else if (server_asn != null) risk_class = "cloud";
  else risk_class = "unknown";

  const count_bucket = bucketFor(distinct_voters);

  // submitter diversity (only counts where k-anon gate populated ingest fields)
  const regions = new Set(votes.map((v) => v.ingest_region).filter(Boolean));
  const asnBuckets = new Set(votes.map((v) => v.ingest_asn_bucket).filter(Boolean));
  const distinct_region_bucket = regions.size >= 3 ? "3+" : String(regions.size || 1);
  const distinct_asn_bucket = asnBuckets.size >= 3 ? "3+" : String(asnBuckets.size || 1);

  // largest co-voting component (proxy: concentration by (region, asn-bucket)
  // cell; null-diversity voters collapse into one 'unknown' cell — conservative,
  // so a fleet lacking submitter diversity shows as one big component)
  const compCount = new Map();
  for (const v of votes) {
    const k = `${v.ingest_region || "x"}|${v.ingest_asn_bucket || "x"}`;
    if (!compCount.has(k)) compCount.set(k, new Set());
    compCount.get(k).add(v.blinded_id);
  }
  let maxComp = 0;
  for (const s of compCount.values()) maxComp = Math.max(maxComp, s.size);
  const max_component_pct = Math.round((100 * maxComp) / distinct_voters);

  // per-host independent-voter diversity (for /24+ widening sanity)
  const hostVoters = new Map();
  for (const v of votes) {
    if (!hostVoters.has(v.host_ip)) hostVoters.set(v.host_ip, new Set());
    hostVoters.get(v.host_ip).add(v.blinded_id);
  }
  let host_diversity = 0;
  for (const s of hostVoters.values()) if (s.size >= C.K_HOST) host_diversity++;

  // denylist: hard veto at any count
  if (risk_class === "denylist") {
    return verdict({ cidr, prefix_len, server_asn, tenancy: "multi-tenant", count_bucket,
      distinct_asn_bucket, distinct_region_bucket, host_diversity, max_component_pct,
      risk_class, tier: "suppressed", auto_apply: 0, credit_eligible: 0, confidence: 0 });
  }

  const N = risk_class === "adnet" ? C.N_ADNET : risk_class === "cloud" ? C.N_CLOUD : C.N_UNKNOWN;
  const tenancy = risk_class === "adnet" ? "dedicated-adnet" : risk_class === "cloud" ? "multi-tenant" : "unknown";

  // cloud single-ASN guard: a cloud cidr with >1 server-ASN can't confirm
  const cloudGuardOk = risk_class !== "cloud" || distinctServerAsns === 1;

  let tier;
  if (distinct_voters >= N && cloudGuardOk) tier = "community-confirmed";
  else if (distinct_voters >= N / 2) tier = "likely";
  else tier = "candidate";

  // vote time-spread (defeats a same-day sybil flood; needs received_date on votes)
  const days = new Set(votes.map((v) => v.received_date).filter(Boolean));

  // ESTABLISHED-trust diversity — the anti-sybil gate (the durable fix for the
  // wf_943aa6d7 audit finding). trust_tier is stamped at INGEST from the serial's
  // standing then and NEVER retroactively upgraded, so a freshly-minted sybil farm
  // is entirely 'new' and contributes ZERO established diversity. The SILENT
  // auto-apply drop requires its region/ASN/day/component diversity to be carried
  // by ESTABLISHED voters; 'community-confirmed' (advisory one-tap) still counts all.
  // ...AND only RESIDENTIAL established votes carry diversity (sybil-audit #4): a
  // submitter whose ingest ASN is a known hosting/cloud ASN is a datacenter voter,
  // which a VPS botnet trivially diversifies across; it may still count toward the
  // advisory 'community-confirmed' tier but NEVER toward the silent auto-apply gate.
  const hosting = sets.hostingAsns || new Set();
  const hostingKnown = hosting.size > 0; // empty classifier table => cannot certify ANY vote
  // residential; the silent auto-apply + credit gates fail CLOSED rather than open (verify #1).
  const isResidential = (v) => v.ingest_asn_bucket && !hosting.has(String(v.ingest_asn_bucket));
  const estVotes = votes.filter((v) => v.trust_tier === "established" && isResidential(v));
  const estVoters = new Set(estVotes.map((v) => v.blinded_id)).size;
  const estRegions = new Set(estVotes.map((v) => v.ingest_region).filter(Boolean));
  const estAsns = new Set(estVotes.map((v) => v.ingest_asn_bucket).filter(Boolean));
  const estComp = new Map();
  for (const v of estVotes) {
    const k = `${v.ingest_region || "x"}|${v.ingest_asn_bucket || "x"}`;
    if (!estComp.has(k)) estComp.set(k, new Set());
    estComp.get(k).add(v.blinded_id);
  }
  let estMax = 0;
  for (const s of estComp.values()) estMax = Math.max(estMax, s.size);
  const est_max_component_pct = estVoters ? Math.round((100 * estMax) / estVoters) : 100;

  // LEASE (sybil-audit #1): the multi-day span must be met by ESTABLISHED-residential
  // votes within a trailing FRESH_WINDOW when cfg.NOW is supplied; otherwise a stale
  // frozen verdict whose host IP was repointed at a victim would keep auto-applying.
  // LEASE is MANDATORY for a silent drop: no cfg.NOW => cannot certify freshness => fail closed.
  let leaseOk = false;
  if (C.NOW) {
    const floor = dateMinusDays(C.NOW, C.FRESH_WINDOW_DAYS);
    const estFreshDays = new Set(estVotes.map((v) => v.received_date).filter((d) => d && d >= floor));
    leaseOk = estFreshDays.size >= C.AUTO_MIN_DAYS;
  }

  // CREDIT-eligibility: a cidr can earn TRUST for its early voters only if it graduated via a
  // RESIDENTIAL, region/ASN/day-diverse quorum (NOT an established requirement — that would
  // deadlock bootstrap). A datacenter-only self-seed graduates but credits nobody (verify #2).
  const resVotes = votes.filter(isResidential);
  const resVoters = new Set(resVotes.map((v) => v.blinded_id)).size;
  const resRegions = new Set(resVotes.map((v) => v.ingest_region).filter(Boolean));
  const resAsns = new Set(resVotes.map((v) => v.ingest_asn_bucket).filter(Boolean));
  const resDays = new Set(resVotes.map((v) => v.received_date).filter(Boolean));
  const credit_eligible =
    tier === "community-confirmed" && hostingKnown &&
    resVoters >= C.CREDIT_MIN_RESIDENTIAL &&
    resRegions.size >= C.AUTO_MIN_REGIONS &&
    resAsns.size >= C.AUTO_MIN_ASNS &&
    resDays.size >= C.AUTO_MIN_DAYS
      ? 1 : 0;

  // auto-apply eligibility (server side; router adds local corroboration). Scale + tenancy +
  // component judged over ALL voters; the DIVERSITY that authorizes a silent drop must be carried
  // by ESTABLISHED-RESIDENTIAL voters, fresh (leased), and only when the residential classifier
  // is actually populated (hostingKnown).
  const auto_apply =
    tier === "community-confirmed" &&
    hostingKnown &&
    leaseOk &&
    distinct_voters >= C.AUTO_MIN_VOTERS &&
    tenancy === "dedicated-adnet" &&
    days.size >= C.AUTO_MIN_DAYS &&
    max_component_pct <= C.MAX_COMPONENT_PCT &&
    estVoters >= C.AUTO_MIN_ESTABLISHED &&
    estRegions.size >= C.AUTO_MIN_REGIONS &&
    estAsns.size >= C.AUTO_MIN_ASNS &&
    est_max_component_pct <= C.MAX_COMPONENT_PCT
      ? 1 : 0;

  // confidence is COARSE — keyed off confirmation + diversity buckets ONLY, never
  // off distinct_voters (1 - 1/n is invertible and would re-encode the exact count
  // that count_bucket deliberately hides).
  let confidence = 0.2;
  if (tier === "community-confirmed") {
    confidence = (regions.size >= 3 && asnBuckets.size >= 3) ? 0.99
               : (regions.size >= 2 && asnBuckets.size >= 2) ? 0.9
               : 0.8;
  } else if (tier === "likely") confidence = 0.5;

  return verdict({ cidr, prefix_len, server_asn, tenancy, count_bucket,
    distinct_asn_bucket, distinct_region_bucket, host_diversity, max_component_pct,
    risk_class, tier, auto_apply, credit_eligible, confidence: Math.round(confidence * 1000) / 1000 });
}

function verdict(o) { return o; }
