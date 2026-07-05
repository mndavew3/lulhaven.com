// adq-votes — S1 ingest + S2 serve + cron. Binds DB_VOTES ONLY (never DB_IDENT,
// never haven_builds). Delegates ALL auth to adq-ident (service binding IDENT in
// prod, IDENT_URL http in local) so this context never sees serial<->token.
import { bodyHash as sha, canonical } from "../../lib/adqmac.js";
import { recompute, DEFAULTS } from "../../lib/quorum.js";
import { resolveAsn, isPublicV4 } from "../../lib/asnresolve.js";

const json = (b, s = 200) =>
  new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json" } });

// --- call the auth-verify worker (Stage A) ---
async function callIdent(env, payload) {
  const req = new Request("https://ident/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const resp = env.IDENT ? await env.IDENT.fetch(req)
    : await fetch(`${env.IDENT_URL}/verify`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  return resp.json();
}

// Internal credit call (adq-votes -> adq-ident /credit). ident is the ONLY writer of
// serial->trust; we pass only the authenticated token + the count we actually spent.
async function callIdentCredit(env, payload) {
  const headers = { "Content-Type": "application/json" };
  if (env.ADQ_CREDIT_KEY) headers["X-Adq-Internal"] = env.ADQ_CREDIT_KEY; // belt (verify #4)
  const body = JSON.stringify(payload);
  const req = new Request("https://ident/credit", { method: "POST", headers, body });
  const resp = env.IDENT ? await env.IDENT.fetch(req)
    : await fetch(`${env.IDENT_URL}/credit`, { method: "POST", headers, body });
  return resp.json();
}

// Trust is credited ONLY for a vote in the genuinely-early minority (rank <= this). A
// popular cidr already past this many voters is an obvious graduation; front-running it
// earns nothing (sybil-audit #2/#8). EARLY_RANK < N_ADNET/2 so it is strictly pre-'likely'.
const EARLY_RANK = 8;

async function loadSets(env) {
  const dAsn = await env.DB_VOTES.prepare("SELECT match_value FROM adq_denylist WHERE match_kind='asn'").all();
  const dCidr = await env.DB_VOTES.prepare("SELECT match_value FROM adq_denylist WHERE match_kind='cidr'").all();
  const adnet = await env.DB_VOTES.prepare("SELECT asn FROM adq_adnet_asns").all();
  const hosting = await env.DB_VOTES.prepare("SELECT asn FROM adq_hosting_asn").all();
  return {
    denylistAsns: new Set((dAsn.results || []).map((r) => String(r.match_value))),
    denylistCidrs: new Set((dCidr.results || []).map((r) => r.match_value)),
    adnetAsns: new Set((adnet.results || []).map((r) => Number(r.asn))),
    hostingAsns: new Set((hosting.results || []).map((r) => String(r.asn))), // SUBMITTER classifier
  };
}

const todayUTC = () => new Date().toISOString().slice(0, 10); // "YYYY-MM-DD" UTC (for the auto-apply lease)

async function recomputeCidr(env, cidr, sets) {
  const rows = await env.DB_VOTES.prepare(
    "SELECT blinded_id, host_ip, server_asn, ingest_region, ingest_asn_bucket, received_date, trust_tier FROM adq_votes WHERE cidr = ? AND received_date >= date('now','-90 days')"
  ).bind(cidr).all();
  const v = recompute(cidr, rows.results || [], sets, { NOW: todayUTC() });
  if (!v) {
    // decayed below k-anon: demote any existing confirmed verdict so the router
    // un-inherits it (served in 'expired'); a brand-new cidr has no row -> no-op.
    await env.DB_VOTES.prepare(
      "UPDATE adq_verdicts SET tier='candidate', auto_apply=0, updated_datetime=datetime('now') WHERE cidr=? AND tier='community-confirmed'"
    ).bind(cidr).run();
    return;
  }
  await env.DB_VOTES.prepare(
    `INSERT INTO adq_verdicts (cidr,prefix_len,server_asn,tenancy,count_bucket,distinct_asn_bucket,distinct_region_bucket,host_diversity,max_component_pct,risk_class,tier,auto_apply,credit_eligible,confidence,graduated_datetime,last_vote_date,updated_datetime)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?, CASE WHEN ?='community-confirmed' THEN datetime('now') ELSE NULL END, date('now'), datetime('now'))
     ON CONFLICT(cidr) DO UPDATE SET
       server_asn=excluded.server_asn, tenancy=excluded.tenancy, count_bucket=excluded.count_bucket,
       distinct_asn_bucket=excluded.distinct_asn_bucket, distinct_region_bucket=excluded.distinct_region_bucket,
       host_diversity=excluded.host_diversity, max_component_pct=excluded.max_component_pct,
       risk_class=excluded.risk_class, tier=excluded.tier, auto_apply=excluded.auto_apply,
       credit_eligible=excluded.credit_eligible,
       confidence=excluded.confidence, last_vote_date=date('now'), updated_datetime=datetime('now'),
       graduated_datetime=COALESCE(adq_verdicts.graduated_datetime, CASE WHEN excluded.tier='community-confirmed' THEN datetime('now') ELSE NULL END)`
  ).bind(cidr, v.prefix_len, v.server_asn, v.tenancy, v.count_bucket, v.distinct_asn_bucket, v.distinct_region_bucket,
    v.host_diversity, v.max_component_pct, v.risk_class, v.tier, v.auto_apply, v.credit_eligible, v.confidence, v.tier).run();
}

// --- S1: POST /api/adq/votes ---
async function handleVotes(request, env) {
  const sub = request.headers.get("X-Haven-Sub");
  const ts = request.headers.get("X-Haven-Ts");
  const sig = request.headers.get("X-Haven-Sig");
  const raw = await request.text();
  if (!sub || !ts || !sig) return json({ ok: false, error: "missing auth" }, 401);
  let body;
  try { body = JSON.parse(raw); } catch { return json({ ok: false, error: "badbody" }, 400); }
  const votes = Array.isArray(body.votes) ? body.votes : [];
  if (votes.length > 200) return json({ ok: false, error: "batch too large" }, 413);
  const batch_id = String(body.batch_id || "");
  if (!/^[0-9a-f]{64}$/.test(batch_id)) return json({ ok: false, error: "bad batch_id" }, 400);

  // validate + classify server-side; client asn/cidr never trusted
  const rejected = [], clean = [];
  for (const v of votes) {
    const ip = String(v.ip || "");
    if (!isPublicV4(ip)) { rejected.push({ ip, reason: "nonpublic" }); continue; }
    const asn = resolveAsn(ip);
    clean.push({ ip, cidr: `${ip}/32`, server_asn: asn });
  }
  const cidrs = [...new Set(clean.map((c) => c.cidr))];
  if (!cidrs.length) return json({ ok: true, accepted: 0, deduped: 0, rejected, next_upload_after: 86400 });

  // Stage A: verify + blind (adq-ident). Never receives serial/token back.
  const bh = await sha(raw);
  const auth = await callIdent(env, { submitter_token: sub, ts, sig, method: "POST", path: "/api/adq/votes", body_hash: bh, cidrs });
  if (!auth.ok) return json({ ok: false, error: auth.reason || "auth" }, 401);
  const blindByCidr = new Map((auth.blinded || []).map((b) => [b.cidr, b.blinded_id]));
  const trust = auth.trust_tier || "new";

  const region = (request.cf && request.cf.country) || null;
  const asnBucket = request.cf && request.cf.asn != null ? String(request.cf.asn) : null;

  let accepted = 0, deduped = 0;
  const touched = new Set();
  for (const c of clean) {
    const blinded_id = blindByCidr.get(c.cidr);
    if (!blinded_id) continue;
    // k-anon gate: only store region/asn once this cidr already has >= K_FLOOR voters.
    // vote_rank = this cidr's distinct-voter count at the instant this vote lands (n+1),
    // computed ATOMICALLY in the INSERT (SQLite single-writer) so two concurrent first voters
    // can't both claim rank 1 and inflate the early-credit slots (verify #9). The trust-earner
    // credits only early-minority ranks (sybil-audit #2/#8).
    const cnt = await env.DB_VOTES.prepare("SELECT COUNT(DISTINCT blinded_id) AS n FROM adq_votes WHERE cidr = ?").bind(c.cidr).first();
    const passK = (cnt && cnt.n >= DEFAULTS.K_FLOOR);
    const res = await env.DB_VOTES.prepare(
      `INSERT INTO adq_votes (cidr,prefix_len,host_ip,server_asn,blinded_id,ingest_region,ingest_asn_bucket,trust_tier,vote_rank,batch_id,received_date)
       VALUES (?,?,?,?,?,?,?,?, (SELECT COUNT(DISTINCT blinded_id)+1 FROM adq_votes WHERE cidr = ?), ?, date('now'))
       ON CONFLICT(blinded_id,batch_id) DO NOTHING`
    ).bind(c.cidr, 32, c.ip, c.server_asn, blinded_id, passK ? region : null, passK ? asnBucket : null, trust, c.cidr, batch_id).run();
    if (res.meta && res.meta.changes > 0) { accepted++; touched.add(c.cidr); } else deduped++;
  }

  if (touched.size) {
    const sets = await loadSets(env);
    for (const cidr of touched) await recomputeCidr(env, cidr, sets);
  }
  return json({ ok: true, accepted, deduped, rejected, next_upload_after: 86400 });
}

// --- S2: GET /api/adq/verdicts?since=... ---
async function handleVerdicts(request, env) {
  const sub = request.headers.get("X-Haven-Sub");
  const ts = request.headers.get("X-Haven-Ts");
  const sig = request.headers.get("X-Haven-Sig");
  if (!sub || !ts || !sig) return json({ ok: false, error: "missing auth" }, 401);
  const bh = await sha("");
  const auth = await callIdent(env, { submitter_token: sub, ts, sig, method: "GET", path: "/api/adq/verdicts", body_hash: bh, cidrs: [] });
  if (!auth.ok) return json({ ok: false, error: auth.reason || "auth" }, 401);

  const url = new URL(request.url);
  const since = url.searchParams.get("since") || "1970-01-01 00:00:00";
  const limit = Math.min(Number(url.searchParams.get("limit") || 5000), 5000);

  const confirmed = await env.DB_VOTES.prepare(
    "SELECT cidr, tier, confidence, count_bucket, auto_apply FROM adq_verdicts WHERE tier='community-confirmed' AND updated_datetime > ? ORDER BY updated_datetime LIMIT ?"
  ).bind(since, limit).all();
  const denyRows = await env.DB_VOTES.prepare(
    "SELECT match_value AS cidr, reason FROM adq_denylist WHERE match_kind='cidr'"
  ).all();
  const suppressed = await env.DB_VOTES.prepare(
    "SELECT cidr FROM adq_verdicts WHERE tier='suppressed' AND updated_datetime > ?"
  ).bind(since).all();
  const expired = await env.DB_VOTES.prepare(
    "SELECT cidr FROM adq_verdicts WHERE tier IN ('candidate','likely') AND updated_datetime > ?"
  ).bind(since).all();
  const wm = await env.DB_VOTES.prepare("SELECT MAX(updated_datetime) AS w FROM adq_verdicts").first();

  // privacy-minimal projection: NEVER token/serial/blinded_id/exact-count
  return json({
    ok: true,
    watermark: (wm && wm.w) || since,
    confirmed: (confirmed.results || []).map((r) => ({ cidr: r.cidr, tier: r.tier, confidence: r.confidence, count_bucket: r.count_bucket, auto_apply: !!r.auto_apply })),
    denylist: [...(denyRows.results || []).map((r) => ({ cidr: r.cidr, reason: r.reason })),
               ...(suppressed.results || []).map((r) => ({ cidr: r.cidr, reason: "suppressed" }))],
    expired: (expired.results || []).map((r) => r.cidr),
    ttl: 86400,
  });
}

// --- R7-c: POST /api/adq/corroborate — the anti-sybil trust-earner redemption ---
// Router claims cidrs it voted for that later graduated. We authenticate + blind via
// adq-ident (which never learns which validated), then validate EACH pair against OUR
// OWN vote rows, spend the receipt (double-redeem guard), and ask ident to credit the
// serial's trust by the count. Fail-closed; retry-safe (spent receipts => credited 0).
async function handleCorroborate(request, env) {
  const sub = request.headers.get("X-Haven-Sub");
  const ts = request.headers.get("X-Haven-Ts");
  const sig = request.headers.get("X-Haven-Sig");
  const raw = await request.text();
  if (!sub || !ts || !sig) return json({ ok: false, error: "missing auth" }, 401);
  let body;
  try { body = JSON.parse(raw); } catch { return json({ ok: false, error: "badbody" }, 400); }
  const epoch = /^[0-9]{4}Q[1-4]$/.test(String(body.epoch)) ? String(body.epoch) : "";
  const cidrs = (Array.isArray(body.cidrs) ? body.cidrs : [])
    .filter((c) => /^[0-9.]+\/[0-9]{1,2}$/.test(String(c))).slice(0, 200);
  if (!cidrs.length) return json({ ok: true, credited: 0 });

  // Stage A: authenticate + blind for the vote's ORIGINAL epoch. Auth binds {epoch,cidrs}
  // via body_hash, identical envelope to votes. ident returns only {cidr,blinded_id}.
  const bh = await sha(raw);
  const auth = await callIdent(env, { submitter_token: sub, ts, sig, method: "POST", path: "/api/adq/corroborate", body_hash: bh, epoch, cidrs });
  if (!auth.ok) return json({ ok: false, error: auth.reason || "auth" }, 401);

  const owed = []; // validated receipts spent but not yet credited (this call OR a prior failed one)
  for (const p of (auth.blinded || [])) {
    // earliest vote this serial cast on this cidr (min rank = its most-early bet)
    const row = await env.DB_VOTES.prepare(
      "SELECT vote_rank AS rank, received_date AS rdate FROM adq_votes WHERE blinded_id = ? AND cidr = ? ORDER BY vote_rank ASC LIMIT 1"
    ).bind(p.blinded_id, p.cidr).first();
    if (!row || row.rank > EARLY_RANK) continue;                 // must be a load-bearing early bet
    const ver = await env.DB_VOTES.prepare(
      "SELECT tier, graduated_datetime, credit_eligible FROM adq_verdicts WHERE cidr = ?"
    ).bind(p.cidr).first();
    // must be confirmed AND graduated via a residential-diverse quorum (credit_eligible) — a cidr
    // an attacker self-seeded with his own datacenter fleet is confirmed but NOT credit_eligible.
    if (!ver || ver.tier !== "community-confirmed" || !ver.graduated_datetime || !ver.credit_eligible) continue;
    if (!(String(row.rdate) < String(ver.graduated_datetime).slice(0, 10))) continue; // strict day-precedence
    const cnt = await env.DB_VOTES.prepare("SELECT COUNT(DISTINCT blinded_id) AS n FROM adq_votes WHERE cidr = ?").bind(p.cidr).first();
    if (!cnt || cnt.n < DEFAULTS.K_FLOOR) continue;              // decayed below k-anon => not creditable
    // spend the receipt (idempotent, NEVER rolled back); it is OWED a credit until credited=1.
    await env.DB_VOTES.prepare(
      "INSERT INTO adq_receipt_spent (blinded_id, spent_date, credited) VALUES (?, date('now'), 0) ON CONFLICT(blinded_id) DO NOTHING"
    ).bind(p.blinded_id).run();
    const rc = await env.DB_VOTES.prepare("SELECT credited FROM adq_receipt_spent WHERE blinded_id = ?").bind(p.blinded_id).first();
    if (rc && rc.credited === 0) owed.push(p.blinded_id);
  }

  if (!owed.length) return json({ ok: true, credited: 0 });
  // opaque idempotency key over the EXACT owed set — votes-only salt so ident can't invert it to
  // cidrs. A lost /credit response is re-tried with the SAME key => ident no-ops (verify #1: no
  // double-credit), and because receipts are never rolled back, the credit is never lost either.
  const redeem_key = await sha(`${env.VOTES_REDEEM_SALT || "adq-dev-redeem-salt"}:${owed.slice().sort().join(",")}`);
  const cr = await callIdentCredit(env, { submitter_token: sub, credited: owed.length, redeem_key });
  if (!cr || !cr.ok) return json({ ok: false, error: "credit-failed" }, 502); // owed stay credited=0 -> retried
  for (const b of owed)
    await env.DB_VOTES.prepare("UPDATE adq_receipt_spent SET credited = 1 WHERE blinded_id = ?").bind(b).run();
  return json({ ok: true, credited: owed.length, trust_tier: cr.trust_tier });
}

// --- T7 cron: decay + demotion + override circuit-breaker (binds DB_VOTES) ---
export async function runCron(env) {
  // purge votes older than the retention window
  await env.DB_VOTES.prepare("DELETE FROM adq_votes WHERE received_date < date('now','-120 days')").run();
  // purge spent-receipt markers at <= salt life so no live-salt recompute oracle survives a
  // quarter boundary (privacy/sybil-audit); double-spend only needs the current quarter's blinds.
  await env.DB_VOTES.prepare("DELETE FROM adq_receipt_spent WHERE spent_date < date('now','-100 days')").run();
  // override circuit-breaker: households one-tap-overriding a confirmed cidr -> suppress. GATED
  // identically to auto_apply (sybil-audit #6): a hard fleet-wide suppression requires a diverse,
  // multi-day, ESTABLISHED-backed override quorum, so 20 cheap serials cannot force-suppress a
  // rival's legit ad CIDR. (The override WRITER is not built yet; this gates its future input.)
  await env.DB_VOTES.prepare(
    `UPDATE adq_verdicts SET tier='suppressed', auto_apply=0, updated_datetime=datetime('now')
       WHERE cidr IN (SELECT cidr FROM adq_override_signal
         WHERE override_count >= 20 AND established_count >= ${DEFAULTS.AUTO_MIN_ESTABLISHED}
           AND distinct_regions >= ${DEFAULTS.AUTO_MIN_REGIONS} AND distinct_asns >= ${DEFAULTS.AUTO_MIN_ASNS}
           AND day_span >= ${DEFAULTS.AUTO_MIN_DAYS} AND window_date >= date('now','-7 days'))`
  ).run();
  // recompute every cidr with live votes OR an existing verdict (reflects decay)
  const sets = await loadSets(env);
  const cidrs = await env.DB_VOTES.prepare(
    "SELECT cidr FROM adq_votes WHERE received_date >= date('now','-90 days') UNION SELECT cidr FROM adq_verdicts WHERE tier='community-confirmed'"
  ).all();
  for (const r of (cidrs.results || [])) await recomputeCidr(env, r.cidr, sets);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "POST" && url.pathname === "/api/adq/votes") return handleVotes(request, env);
    if (request.method === "POST" && url.pathname === "/api/adq/corroborate") return handleCorroborate(request, env);
    if (request.method === "GET" && url.pathname === "/api/adq/verdicts") return handleVerdicts(request, env);
    if (request.method === "POST" && url.pathname === "/__cron") { await runCron(env); return json({ ok: true }); } // local test hook
    return json({ ok: false, error: "notfound" }, 404);
  },
  async scheduled(event, env, ctx) {
    ctx.waitUntil(runCron(env));
  },
};
