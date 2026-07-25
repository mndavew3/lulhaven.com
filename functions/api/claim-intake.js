// POST /api/claim-intake — a contestant uploads their exported Haven file plus a
// write-up. This is the ONLY place the attestation token is decrypted.
// See docs/CONTEST_EXPORT_IMPORT_DESIGN.md §3c/§3d.
//
// Body (JSON): { email, claim_title, claim_details, file_text }
//   file_text = the exact contents of the exported haven-config-*.json.
//
// Ranking authority = this row's AUTOINCREMENT id (SQLite allocates it atomically
// at INSERT — the single source of truth). A contestant cannot make it earlier;
// they can only submit later. Reject checks run BEFORE the insert, so rejected
// junk never consumes an id. The encrypted token's time is provenance only.
//
// AUTH: the submitter must be a logged-in Challenge participant (session cookie).
// The claim is attributed to their account username; email is taken from the
// account, not a free-text field.
import { readSession } from "../_lib/account.js";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
const MAX_FILE_BYTES = 512 * 1024;
const RATE_WINDOW = 3600, RATE_MAX_IP = 40;

const enc = new TextEncoder(), dec = new TextDecoder();
function json(b, s = 200) {
  return new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", ...CORS } });
}
const isEmail = (e) => typeof e === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim()) && e.length <= 254;
const clean = (s, n) => (typeof s === "string" ? (s.trim().slice(0, n) || null) : null);

function b64urlToBytes(s) {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  const bin = atob(s), a = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i);
  return a;
}
async function sha256hex(str) {
  const d = await crypto.subtle.digest("SHA-256", enc.encode(str));
  return Array.from(new Uint8Array(d)).map(b => b.toString(16).padStart(2, "0")).join("");
}
async function contestKey(masterHex, contestId) {
  const bytes = new Uint8Array(masterHex.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(masterHex.substr(i * 2, 2), 16);
  const base = await crypto.subtle.importKey("raw", bytes, "HKDF", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "HKDF", hash: "SHA-256", salt: enc.encode("haven-attest"), info: enc.encode(contestId) },
    base, { name: "AES-GCM", length: 256 }, false, ["decrypt"]
  );
}
function fmt(ms, tz) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
    }).format(new Date(ms));
  } catch { return new Date(ms).toISOString(); }
}
async function allowIp(env, ip) {
  if (!ip) return true;
  const w = Math.floor(Date.now() / 1000 / RATE_WINDOW) * RATE_WINDOW;
  try {
    await env.haven_builds.prepare(
      `INSERT INTO challenge_rate (bucket, key, window_start, count) VALUES ('claim', ?, ?, 1)
       ON CONFLICT(bucket, key, window_start) DO UPDATE SET count = count + 1`
    ).bind(ip, w).run();
    const r = await env.haven_builds.prepare(
      `SELECT count FROM challenge_rate WHERE bucket='claim' AND key=? AND window_start=?`
    ).bind(ip, w).first();
    return !r || r.count <= RATE_MAX_IP;
  } catch { return true; }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const ip = request.headers.get("CF-Connecting-IP") || "";
  if (!(await allowIp(env, ip))) return json({ error: "rate limited" }, 429);

  // Must be a logged-in participant.
  let username = null;
  try { username = await readSession(env, request.headers.get("Cookie")); } catch { username = null; }
  if (!username) return json({ error: "Please log in to submit a claim." }, 401);

  let body;
  try { body = await request.json(); } catch { return json({ error: "invalid JSON body" }, 400); }
  const title = clean(body.claim_title, 200), details = clean(body.claim_details, 20000);
  const fileText = body.file_text;
  // Contact email comes from the account, not the request.
  let email = null;
  try {
    const acct = await env.haven_builds.prepare("SELECT email FROM contest_accounts WHERE username_lc=?")
      .bind(username.toLowerCase()).first();
    email = acct ? acct.email : null;
  } catch { email = null; }
  if (!title) return json({ error: "a claim title is required" }, 400);
  if (typeof fileText !== "string" || fileText.length === 0) return json({ error: "attach your exported Haven file" }, 400);
  if (fileText.length > MAX_FILE_BYTES) return json({ error: "file too large" }, 413);

  let file;
  try { file = JSON.parse(fileText); } catch { return json({ error: "the attached file is not valid JSON" }, 400); }

  const contestActive = env.CONTEST_ACTIVE === "1"
    && (!env.CONTEST_END || Math.floor(Date.now() / 1000) <= Number(env.CONTEST_END));

  // ---- Reject table (§3c). Runs before any id is allocated. ----
  let lane = "attested", flags = [], serial = null, tExport = null, feedBuild = null, model = null, hv = null, attestation = null;

  if (contestActive) {
    // #1 must be an attested contest file (lean-during-contest is rejected).
    if (file.haven_config !== 2 || file.kind !== "contest" || typeof file.attestation !== "string"
        || typeof file.payload !== "string" || typeof file.pop !== "string") {
      return json({ error: "During a Challenge, export while online so your file is attested, then upload that file." }, 400);
    }
    attestation = file.attestation;
    if (!env.CONTEST_MASTER_KEY || !env.CONTEST_ID) return json({ error: "contest not configured" }, 500);

    // #2 decrypt.
    let claim;
    try {
      const packed = b64urlToBytes(file.attestation);
      const iv = packed.slice(0, 12), ct = packed.slice(12);
      const key = await contestKey(env.CONTEST_MASTER_KEY, env.CONTEST_ID);
      const pt = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv, additionalData: enc.encode(env.CONTEST_ID) }, key, ct);
      claim = JSON.parse(dec.decode(pt));
    } catch { return json({ error: "bad_attestation" }, 400); }
    serial = claim.s; tExport = claim.t_export;

    // #3 the token binds to THIS file's payload.
    if (await sha256hex(file.payload) !== String(claim.h).toLowerCase()) {
      return json({ error: "content_token_mismatch" }, 400);
    }
    // #4 device proof — fail CLOSED against the issued-serial registry.
    let reg = null;
    try { reg = await env.haven_builds.prepare("SELECT unit_nonce FROM issued_serials WHERE serial=?").bind(serial).first(); } catch {}
    if (!reg || !reg.unit_nonce) return json({ error: "device_forgery" }, 400);
    if (await sha256hex(`${reg.unit_nonce}|${claim.h}`) !== String(file.pop).toLowerCase()) {
      return json({ error: "device_forgery" }, 400);
    }
    // #5 UNIQUE(attestation): a stolen/re-used file is not auto-credited to whoever submits second.
    let dup = null;
    try { dup = await env.haven_builds.prepare("SELECT id FROM contest_claims WHERE attestation=?").bind(attestation).first(); } catch {}
    if (dup) { lane = "manual_review"; flags.push("duplicate_attestation"); }

    // #6 diagnostics (never affect ranking).
    const nowSec = Math.floor(Date.now() / 1000);
    if (claim.exp && nowSec > claim.exp) flags.push("stale_token");
    if (Math.abs(Date.now() - Number(tExport)) > 10 * 60 * 1000) flags.push("clock_skew");

    // provenance for the description (from the verified payload).
    try {
      const p = JSON.parse(file.payload).provenance || {};
      feedBuild = p.feed_build_id || null; model = p.model || null; hv = p.haven_version || null;
    } catch {}
  } else {
    // No active contest: accept as an ordinary report (no priority semantics).
    lane = "no_contest";
  }

  // ---- Accept: INSERT allocates the atomic id = ranking seq. ----
  const tz = env.CONTEST_TZ || "America/Chicago";
  const receivedMs = Date.now();
  const disq = lane !== "attested" ? 1 : 0;
  let ins;
  try {
    ins = await env.haven_builds.prepare(
      `INSERT INTO contest_claims
        (attestation, username, email, claim_title, claim_details, t_receipt_ms, t_export_ms, serial,
         feed_build_id, model, haven_version, tamper_flags, lane, disqualified_from_priority,
         evidence_sufficient, package_description, evidence_b64, source_ip, status, created_datetime)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,?,?,?, 'submitted', datetime('now'))`
    ).bind(
      attestation, username, email, title, details, receivedMs, tExport, serial,
      feedBuild, model, hv, flags.join(","), lane, disq,
      "", fileText, ip
    ).run();
  } catch (e) {
    // UNIQUE(attestation) at the DB layer is the last-resort dedup guard.
    if (String(e).includes("UNIQUE")) return json({ ok: true, duplicate: true, message: "This exact file was already submitted; a reviewer will adjudicate." });
    return json({ error: "could not record claim" }, 500);
  }
  const id = ins.meta.last_row_id;

  // Package description volunteers read (plain text; no crypto for them).
  const desc =
    `Claim #${id} · by ${username} · received ${fmt(receivedMs, "UTC")} UTC (${fmt(receivedMs, tz)} ${tz})`
    + (tExport ? ` · exported ${fmt(tExport, "UTC")} UTC` : "")
    + (serial ? ` · serial ${serial}` : "")
    + (feedBuild ? ` · feed ${feedBuild}` : "")
    + (model ? ` · ${model}` : "") + (hv ? ` · Haven ${hv}` : "")
    + ` · lane=${lane}` + (flags.length ? ` · flags: ${flags.join(", ")}` : " · device verified");
  try { await env.haven_builds.prepare("UPDATE contest_claims SET package_description=? WHERE id=?").bind(desc, id).run(); } catch {}

  return json({ ok: true, id, message: `Claim #${id} received.` });
}
