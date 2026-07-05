// adq-ident — the auth-verify Worker. Binds DB_IDENT ONLY (never DB_VOTES, never
// haven_builds). It is the ONLY context that can see serial<->token. It returns
// {ok, trust_tier, blinded[]} to the vote path — NEVER a serial or raw token.
//
// The burn pipeline pre-writes adq_verify_key rows (derived per-quarter token +
// verify_key), so this Worker never stores or recomputes the router's adq_secret:
// an unknown token is simply 401. Revocation is by serial. blinded_id folds the
// per-quarter salt + token + cidr so the vote db holds only opaque handles.
import { adqMac, canonical, macEqual, quarterEpoch, randHex } from "../../lib/adqmac.js";

const SKEW = 90; // seconds, matches app_auth.SKEW
const EST_THRESHOLD = 5; // corroborations before new -> established (sybil-audit: >=5 load-bearing
// early bets, not 3; front-running is defused by the router's early-rank credit rule in adq-votes)
const CREDIT_MAX = 200; // clamp a single /credit (matches the vote batch cap) — damage bound if the
// internal endpoint is ever reachable off the service binding

const json = (b, s = 200) =>
  new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json" } });

// Pure Stage-A over a D1-like binding. Returns a plain result object.
export async function verifyStageA(DB_IDENT, body, now) {
  const { submitter_token, ts, sig, method, path, body_hash, cidrs } = body || {};
  if (!submitter_token || !ts || !sig || !method || !path || body_hash == null)
    return { ok: false, reason: "missing" };
  // shape-validate ts BEFORE the numeric compare: Number("123abc")=NaN and
  // NaN>SKEW is false, which would fall through the stale guard (fail-open).
  if (!/^[0-9]{10}$/.test(String(ts)) || Math.abs(now - Number(ts)) > SKEW)
    return { ok: false, reason: "stale" };

  const row = await DB_IDENT.prepare(
    "SELECT serial, salt_epoch, verify_key FROM adq_verify_key WHERE submitter_token = ?"
  ).bind(submitter_token).first();
  if (!row) return { ok: false, reason: "badtoken" };

  const rev = await DB_IDENT.prepare(
    "SELECT 1 AS r FROM adq_revoked_serial WHERE serial = ?"
  ).bind(row.serial).first();
  if (rev) return { ok: false, reason: "revoked" };

  const expect = await adqMac(row.verify_key, canonical(method, path, ts, body_hash));
  if (!macEqual(expect, sig)) return { ok: false, reason: "badmac" };

  const trustRow = await DB_IDENT.prepare(
    "SELECT trust_tier FROM adq_serial_trust WHERE serial = ?"
  ).bind(row.serial).first();
  const trust_tier = (trustRow && trustRow.trust_tier) || "new";

  const blinded = [];
  if (Array.isArray(cidrs) && cidrs.length) {
    // Blind for the vote's ORIGINAL quarter. Normal vote-time: epoch omitted =>
    // current quarter, token = the authenticated current token (unchanged behavior).
    // Corroboration redemption of a late-quarter vote (grace window): body.epoch names
    // the vote's quarter; we recompute with THAT quarter's token+salt so the historical
    // blinded_id matches the stored vote. Bounded by the salt's own retention: once the
    // epoch's salt is purged the blind is uncomputable => not creditable (graceful).
    const current = row.salt_epoch;
    const wantEpoch = body.epoch && /^[0-9]{4}Q[1-4]$/.test(String(body.epoch)) ? String(body.epoch) : current;
    let blindToken = submitter_token;
    if (wantEpoch !== current) {
      const hist = await DB_IDENT.prepare(
        "SELECT submitter_token FROM adq_verify_key WHERE serial = ? AND salt_epoch = ?"
      ).bind(row.serial, wantEpoch).first();
      if (!hist) return { ok: true, trust_tier, blinded: [] }; // no historical identity -> nothing to blind
      blindToken = hist.submitter_token;
    }
    const saltRow = await DB_IDENT.prepare(
      "SELECT salt FROM adq_quarter_salt WHERE salt_epoch = ?"
    ).bind(wantEpoch).first();
    if (!saltRow) {
      if (wantEpoch === current) return { ok: false, reason: "nosalt" }; // vote-time invariant
      return { ok: true, trust_tier, blinded: [] }; // historical salt expired -> not creditable
    }
    for (const cidr of cidrs) {
      blinded.push({ cidr, blinded_id: await adqMac(saltRow.salt, `${blindToken}|${cidr}`) });
    }
  }
  // NEVER returns serial or submitter_token.
  return { ok: true, trust_tier, blinded };
}

// INTERNAL credit writer (adq-votes -> adq-ident over the service binding ONLY; ident
// must be deployed service-binding-only, no public route). adq-votes has already
// validated + double-spend-marked the corroborations in ITS db and passes the count.
// ident is the ONLY writer of serial->trust and persists NOTHING per-cidr. Trusting
// votes' count is within the model: a compromised votes already holds every vote.
export async function creditSerial(DB_IDENT, body) {
  const token = body && body.submitter_token;
  let credited = Number(body && body.credited);
  const redeem_key = body && body.redeem_key;
  if (!token || !/^[0-9a-f]{64}$/.test(String(token))) return { ok: false, reason: "badtoken" };
  if (!Number.isFinite(credited) || credited <= 0) return { ok: true, credited: 0 };
  credited = Math.min(Math.floor(credited), CREDIT_MAX);

  const row = await DB_IDENT.prepare(
    "SELECT serial FROM adq_verify_key WHERE submitter_token = ?"
  ).bind(token).first();
  if (!row) return { ok: false, reason: "badtoken" };

  // IDEMPOTENCY (verify #1): claim the redeem_key BEFORE bumping trust. If it was already
  // claimed (a prior call already applied this exact set of receipts), no-op — so a lost
  // /credit response, re-tried by the router, cannot double-credit. Claim-first fails toward
  // UNDER-crediting (safe), never double. redeem_key is opaque to ident (votes-only salt).
  if (redeem_key && /^[0-9a-f]{64}$/.test(String(redeem_key))) {
    const claim = await DB_IDENT.prepare(
      "INSERT INTO adq_credit_applied (redeem_key) VALUES (?) ON CONFLICT(redeem_key) DO NOTHING"
    ).bind(redeem_key).run();
    if (!(claim.meta && claim.meta.changes > 0)) {
      const cur = await DB_IDENT.prepare(
        "SELECT early_corroborations, trust_tier FROM adq_serial_trust WHERE serial = ?"
      ).bind(row.serial).first();
      return { ok: true, credited: 0, deduped: true, trust_tier: (cur && cur.trust_tier) || "new", early_corroborations: (cur && cur.early_corroborations) || 0 };
    }
  }

  // quarantined serials never gain trust; new/established accrue, promote at threshold.
  await DB_IDENT.prepare(
    `INSERT INTO adq_serial_trust (serial, early_corroborations, trust_tier, updated_datetime)
     VALUES (?, ?, CASE WHEN ? >= ${EST_THRESHOLD} THEN 'established' ELSE 'new' END, datetime('now'))
     ON CONFLICT(serial) DO UPDATE SET
       early_corroborations = adq_serial_trust.early_corroborations + excluded.early_corroborations,
       trust_tier = CASE
         WHEN adq_serial_trust.trust_tier = 'quarantined' THEN 'quarantined'
         WHEN adq_serial_trust.early_corroborations + excluded.early_corroborations >= ${EST_THRESHOLD} THEN 'established'
         ELSE adq_serial_trust.trust_tier END,
       updated_datetime = datetime('now')`
  ).bind(row.serial, credited, credited).run();

  const t = await DB_IDENT.prepare(
    "SELECT early_corroborations, trust_tier FROM adq_serial_trust WHERE serial = ?"
  ).bind(row.serial).first();
  return { ok: true, credited, trust_tier: (t && t.trust_tier) || "new", early_corroborations: (t && t.early_corroborations) || credited };
}

export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    if (request.method === "POST" && path === "/__cron") { await rotateSalt(env); return json({ ok: true }); }
    if (request.method !== "POST") return json({ ok: false, error: "method" }, 405);
    let body;
    try { body = await request.json(); } catch { return json({ ok: false, error: "badbody" }, 400); }
    if (path === "/verify") {
      const res = await verifyStageA(env.DB_IDENT, body, Math.floor(Date.now() / 1000));
      return json(res, res.ok ? 200 : 401);
    }
    if (path === "/credit") {
      // defense-in-depth belt behind workers_dev:false: if ADQ_CREDIT_KEY is configured,
      // require adq-votes to present it. Unset (local dev) => skip (ident is not exposed).
      if (env.ADQ_CREDIT_KEY && !macEqual(request.headers.get("X-Adq-Internal") || "", env.ADQ_CREDIT_KEY))
        return json({ ok: false, error: "forbidden" }, 403);
      const res = await creditSerial(env.DB_IDENT, body);
      return json(res, res.ok ? 200 : 400);
    }
    return json({ ok: false, error: "notfound" }, 404);
  },
  async scheduled(event, env, ctx) { ctx.waitUntil(rotateSalt(env)); },
};

// T7 salt rotation (DB_IDENT): mint the current quarter salt if absent; delete
// salts older than ~1 quarter + 7d grace so old blinded_ids become irreversible.
export async function rotateSalt(env) {
  const epoch = quarterEpoch();
  await env.DB_IDENT.prepare("INSERT OR IGNORE INTO adq_quarter_salt (salt_epoch, salt) VALUES (?, ?)")
    .bind(epoch, randHex(64)).run();
  await env.DB_IDENT.prepare("DELETE FROM adq_quarter_salt WHERE created_datetime < datetime('now','-100 days')").run();
  // opaque idempotency keys grow unbounded; purge for size (they carry no linkage).
  await env.DB_IDENT.prepare("DELETE FROM adq_credit_applied WHERE applied_date < date('now','-120 days')").run();
}
