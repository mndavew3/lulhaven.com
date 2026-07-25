// POST /api/contest-attest — issue an encrypted, device-verified timestamp
// token for a contest export. See docs/CONTEST_EXPORT_IMPORT_DESIGN.md §3.
//
// Body: { content_hash (hex), serial, pop (hex keyed-sha256) }
// Reply:
//   no active contest / unknown or unverifiable device -> { active: false }
//   active + verified device                           -> { active: true, contest_id, tz, token }
//
// The token is AES-256-GCM under a per-contest subkey (HKDF of CONTEST_MASTER_KEY,
// info=contest_id). It carries the SERVER's time, so a contestant cannot forge
// or read it. It is NOT the ranking clock (that is the intake receipt seq) — it
// is provenance + a device-bound anchor. Fails CLOSED: no issued-serial match or
// no pop match ⇒ { active:false }, so a fabricated serial gets no token.

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
const TOKEN_TTL_SEC = 15 * 60;          // advisory: intake flags, never rejects, on stale
const RATE_WINDOW = 3600;
const RATE_MAX_SERIAL = 30;             // per serial per hour
const RATE_MAX_IP = 120;                // per IP per hour (cycling-serial backstop)

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status, headers: { "Content-Type": "application/json", ...CORS },
  });
}
const enc = new TextEncoder();
const isHex = (s, n) => typeof s === "string" && (!n || s.length === n) && /^[0-9a-f]+$/i.test(s);
const isSerial = (s) => typeof s === "string" && /^[A-Za-z0-9]{6,32}$/.test(s);

function hexToBytes(h) {
  const a = new Uint8Array(h.length / 2);
  for (let i = 0; i < a.length; i++) a[i] = parseInt(h.substr(i * 2, 2), 16);
  return a;
}
function bytesToB64url(bytes) {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function sha256hex(str) {
  const d = await crypto.subtle.digest("SHA-256", enc.encode(str));
  return Array.from(new Uint8Array(d)).map(b => b.toString(16).padStart(2, "0")).join("");
}
// Per-contest AES-GCM key: HKDF-SHA256(master, salt="haven-attest", info=contest_id).
async function contestKey(masterHex, contestId) {
  const base = await crypto.subtle.importKey("raw", hexToBytes(masterHex), "HKDF", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "HKDF", hash: "SHA-256", salt: enc.encode("haven-attest"), info: enc.encode(contestId) },
    base, { name: "AES-GCM", length: 256 }, false, ["encrypt"]
  );
}

// Rate limit via the existing challenge_rate table. Fails OPEN (a limiter error
// must not block a legitimate export). Returns true if allowed.
async function allow(env, bucket, key, max) {
  if (!key) return true;
  const windowStart = Math.floor(Date.now() / 1000 / RATE_WINDOW) * RATE_WINDOW;
  try {
    await env.haven_builds.prepare(
      `INSERT INTO challenge_rate (bucket, key, window_start, count) VALUES (?, ?, ?, 1)
       ON CONFLICT(bucket, key, window_start) DO UPDATE SET count = count + 1`
    ).bind(bucket, key, windowStart).run();
    const row = await env.haven_builds.prepare(
      `SELECT count FROM challenge_rate WHERE bucket=? AND key=? AND window_start=?`
    ).bind(bucket, key, windowStart).first();
    return !row || row.count <= max;
  } catch {
    return true;
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const ip = request.headers.get("CF-Connecting-IP") || "";

  let body;
  try { body = await request.json(); } catch { return json({ active: false }); }
  const { content_hash, serial, pop } = body || {};

  // Contest liveness (the flag lives on the web server). Closed => nothing leaks.
  const active = env.CONTEST_ACTIVE === "1"
    && (!env.CONTEST_END || Math.floor(Date.now() / 1000) <= Number(env.CONTEST_END));
  if (!active || !env.CONTEST_MASTER_KEY || !env.CONTEST_ID) return json({ active: false });

  // Shape checks before any DB / crypto work.
  if (!isHex(content_hash, 64) || !isSerial(serial) || !isHex(pop, 64)) return json({ active: false });

  // Abuse control: validated-serial bucket AND an IP backstop for cycling serials.
  if (!(await allow(env, "attest-ip", ip, RATE_MAX_IP))) return json({ active: false });
  if (!(await allow(env, "attest-serial", serial, RATE_MAX_SERIAL))) return json({ active: false });

  // FAIL CLOSED device check: serial must be a real issued unit, and the pop must
  // match its registered unit_nonce (keyed-sha256 the router computed). No
  // registry row or bad pop => no token. (issued_serials is a launch prereq.)
  let reg = null;
  try {
    reg = await env.haven_builds.prepare(
      "SELECT unit_nonce FROM issued_serials WHERE serial = ?"
    ).bind(serial).first();
  } catch { reg = null; }
  if (!reg || !reg.unit_nonce) return json({ active: false });
  const expectPop = await sha256hex(`${reg.unit_nonce}|${content_hash}`);
  if (expectPop !== pop.toLowerCase()) return json({ active: false });

  // Mint the token.
  const now = Date.now();
  const plaintext = JSON.stringify({
    t_export: now, exp: Math.floor(now / 1000) + TOKEN_TTL_SEC,
    n: bytesToB64url(crypto.getRandomValues(new Uint8Array(8))),
    c: env.CONTEST_ID, h: content_hash.toLowerCase(), s: serial, kv: "v1",
  });
  const key = await contestKey(env.CONTEST_MASTER_KEY, env.CONTEST_ID);
  const iv = crypto.getRandomValues(new Uint8Array(12));   // fresh per call, never reused
  const ct = new Uint8Array(await crypto.subtle.encrypt(
    { name: "AES-GCM", iv, additionalData: enc.encode(env.CONTEST_ID) }, key, enc.encode(plaintext)
  ));
  const packed = new Uint8Array(iv.length + ct.length);
  packed.set(iv, 0); packed.set(ct, iv.length);
  const token = bytesToB64url(packed);

  // Log every mint so an intake reviewer can spot stockpiling (harmless to
  // ranking, but a signal). Best-effort.
  try {
    await env.haven_builds.prepare(
      `INSERT INTO attest_log (serial, content_hash, t_export_ms, source_ip, created_datetime)
       VALUES (?, ?, ?, ?, datetime('now'))`
    ).bind(serial, content_hash.toLowerCase(), now, ip).run();
  } catch { /* logging is non-critical */ }

  return json({ active: true, contest_id: env.CONTEST_ID, tz: env.CONTEST_TZ || "America/Chicago", token });
}
