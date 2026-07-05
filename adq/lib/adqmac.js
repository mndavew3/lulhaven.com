// adqmac.js — the adq auth primitive, IDENTICAL to the router's
// haven-pairing-crypto.sh: a secret-salted SHA-256 (NOT HMAC). The router side
// is `printf '%s' "KEY:mac:MSG" | sha256sum | cut -c1-64`; using auth.js's real
// HMAC here would 401 every honest upload. Runs on Cloudflare Workers and Node
// 20 (both expose Web Crypto as the global `crypto`).

export async function sha256Hex(str) {
  const data = new TextEncoder().encode(str);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

// mac(KEY, MSG) = sha256sum(KEY:mac:MSG)  — matches haven-pairing-crypto.sh `mac`
export const adqMac = (secret, msg) => sha256Hex(`${secret}:mac:${msg}`);

// sesskey(ROOT, APP) = sha256sum(ROOT:sk:APP) — matches `sesskey`
export const sessKey = (root, app) => sha256Hex(`${root}:sk:${app}`);

// bodyhash / hashmsg = sha256sum(MSG), no trailing newline — matches `hashmsg`/`bodyhash`
export const bodyHash = (raw) => sha256Hex(raw);

// canonical signed string: method\npath\nts\nbody_hash (LF, exactly 4 fields)
export const canonical = (method, path, ts, bh) => [method, path, ts, bh].join("\n");

// constant-time hex compare (mirrors app_auth.mac_equal)
export function macEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// derive the per-quarter routing token + verify key from an adq_secret (server
// side, for the burn-pipeline mock and tests) — matches the router derivation:
//   submitter_token = sha256(adq_secret:'adq-sub:':epoch)
//   verify_key      = sha256(adq_secret:'adq-key:':epoch)
export const submitterToken = (secret, epoch) => sha256Hex(`${secret}:adq-sub:${epoch}`);
export const verifyKey = (secret, epoch) => sha256Hex(`${secret}:adq-key:${epoch}`);

// calendar-quarter epoch, e.g. "2026Q3" (UTC). Matches the router adq_epoch().
export function quarterEpoch(d = new Date()) {
  return `${d.getUTCFullYear()}Q${Math.floor(d.getUTCMonth() / 3) + 1}`;
}

// n hex chars of CSPRNG (Workers + Node expose crypto.getRandomValues)
export function randHex(n = 64) {
  const a = new Uint8Array(n / 2);
  crypto.getRandomValues(a);
  return Array.from(a).map((b) => b.toString(16).padStart(2, "0")).join("");
}
