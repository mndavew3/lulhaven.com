// Shared TOTP (RFC 6238) + email-code authentication for both Haven account
// realms (Challenge contest, customer/subscription). No passwords, no SMS.
// Reuses CONTEST_ACCOUNT_KEY as the HKDF master for both realms (subkeyed by
// `realm` below) — one provisioned secret, cryptographically independent
// subkeys per realm and purpose, so no second secret needs provisioning.

const enc = new TextEncoder(), dec = new TextDecoder();

const hex = (buf) => Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
function hexToBytes(h) { const a = new Uint8Array(h.length / 2); for (let i = 0; i < a.length; i++) a[i] = parseInt(h.substr(i * 2, 2), 16); return a; }
function b64url(bytes) { let s = ""; for (const b of bytes) s += String.fromCharCode(b); return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
function fromB64url(s) { s = s.replace(/-/g, "+").replace(/_/g, "/"); while (s.length % 4) s += "="; const bin = atob(s), a = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i); return a; }

// Constant-time-ish compare of two equal-length strings.
function ctEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

async function subkeyBytes(env, realm, info) {
  const master = env.CONTEST_ACCOUNT_KEY;
  if (!master) throw new Error("CONTEST_ACCOUNT_KEY not configured");
  const base = await crypto.subtle.importKey("raw", hexToBytes(master), "HKDF", false, ["deriveBits"]);
  return new Uint8Array(await crypto.subtle.deriveBits(
    { name: "HKDF", hash: "SHA-256", salt: enc.encode(realm), info: enc.encode(info) }, base, 256));
}

async function hmacSha256(keyBytes, msgBytes) {
  const k = await crypto.subtle.importKey("raw", keyBytes, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", k, msgBytes));
}

// --- Base32 (RFC 4648, no padding) — the format authenticator apps expect for TOTP secrets ---
const B32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
function base32Encode(bytes) {
  let bits = "", out = "";
  for (const b of bytes) bits += b.toString(2).padStart(8, "0");
  for (let i = 0; i + 5 <= bits.length; i += 5) out += B32_ALPHABET[parseInt(bits.substr(i, 5), 2)];
  const rem = bits.length % 5;
  if (rem) out += B32_ALPHABET[parseInt(bits.slice(-rem).padEnd(5, "0"), 2)];
  return out;
}
function base32Decode(str) {
  const clean = str.toUpperCase().replace(/[^A-Z2-7]/g, "");
  let bits = "";
  for (const c of clean) bits += B32_ALPHABET.indexOf(c).toString(2).padStart(5, "0");
  const bytes = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) bytes.push(parseInt(bits.substr(i, 8), 2));
  return new Uint8Array(bytes);
}

// --- TOTP (RFC 6238): HMAC-SHA1, 30s step, 6 digits — the universal authenticator-app default ---
export function newTotpSecret() {
  return base32Encode(crypto.getRandomValues(new Uint8Array(20))); // 160-bit, standard
}
export function totpUri(secretBase32, label, issuer = "Haven") {
  return `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(label)}?secret=${secretBase32}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`;
}
async function totpAt(secretBase32, counter) {
  const key = await crypto.subtle.importKey("raw", base32Decode(secretBase32), { name: "HMAC", hash: "SHA-1" }, false, ["sign"]);
  const counterBytes = new Uint8Array(8);
  let c = BigInt(counter);
  for (let i = 7; i >= 0; i--) { counterBytes[i] = Number(c & 0xffn); c >>= 8n; }
  const mac = new Uint8Array(await crypto.subtle.sign("HMAC", key, counterBytes));
  const offset = mac[mac.length - 1] & 0x0f;
  const code = ((mac[offset] & 0x7f) << 24 | (mac[offset + 1] & 0xff) << 16 | (mac[offset + 2] & 0xff) << 8 | (mac[offset + 3] & 0xff)) % 1000000;
  return String(code).padStart(6, "0");
}
export async function verifyTotp(secretBase32, token, { step = 30, window = 1 } = {}) {
  if (typeof token !== "string" || !/^\d{6}$/.test(token)) return false;
  const counter = Math.floor(Date.now() / 1000 / step);
  for (let w = -window; w <= window; w++) {
    if (ctEqual(await totpAt(secretBase32, counter + w), token)) return true;
  }
  return false;
}

// --- Email one-time code: 6-digit, hashed at rest, single-use, short TTL ---
export function newEmailCode() {
  return String(crypto.getRandomValues(new Uint32Array(1))[0] % 1000000).padStart(6, "0");
}
export async function hashEmailCode(env, realm, code) {
  return hex(await hmacSha256(await subkeyBytes(env, realm, "email-code"), enc.encode(code)));
}
export async function issueEmailCode(env, realm, identity, purpose, { ttlSec = 600, isTest = false } = {}) {
  const code = newEmailCode();
  const codeHash = await hashEmailCode(env, realm, code);
  const expiresAt = new Date(Date.now() + ttlSec * 1000).toISOString();
  await env.haven_builds.prepare(
    `INSERT INTO email_codes (realm, identity, purpose, code_hash, expires_at, is_test) VALUES (?, ?, ?, ?, ?, ?)`
  ).bind(realm, identity.toLowerCase(), purpose, codeHash, expiresAt, isTest ? 1 : 0).run();
  return code;
}
// Single-use: the matching row is marked consumed on success so it can't be replayed.
export async function verifyEmailCode(env, realm, identity, purpose, code) {
  if (!/^\d{6}$/.test(code || "")) return false;
  const codeHash = await hashEmailCode(env, realm, code);
  const row = await env.haven_builds.prepare(
    `SELECT id FROM email_codes WHERE realm=? AND identity=? AND purpose=? AND code_hash=?
       AND consumed_at IS NULL AND expires_at > datetime('now') ORDER BY id DESC LIMIT 1`
  ).bind(realm, identity.toLowerCase(), purpose, codeHash).first();
  if (!row) return false;
  await env.haven_builds.prepare(`UPDATE email_codes SET consumed_at=datetime('now') WHERE id=?`).bind(row.id).run();
  return true;
}

// --- Session (signed cookie, no server store), parameterized by realm ---
export function sessionCookieName(realm) { return realm === "customer" ? "haven_customer_session" : "haven_contest_session"; }
const SESSION_TTL_SEC = 6 * 3600;
export async function makeSession(env, realm, identity) {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SEC;
  const payload = b64url(enc.encode(`${identity}\n${exp}`));
  const sig = hex(await hmacSha256(await subkeyBytes(env, realm, "session"), enc.encode(payload)));
  return `${payload}.${sig}`;
}
export async function readSession(env, realm, cookieHeader) {
  if (!cookieHeader) return null;
  const name = sessionCookieName(realm);
  const m = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  if (!m) return null;
  const [payload, sig] = m[1].split(".");
  if (!payload || !sig) return null;
  const good = hex(await hmacSha256(await subkeyBytes(env, realm, "session"), enc.encode(payload)));
  if (!ctEqual(sig, good)) return null;
  const [identity, exp] = dec.decode(fromB64url(payload)).split("\n");
  if (!identity || !exp || Math.floor(Date.now() / 1000) > Number(exp)) return null;
  return identity;
}
export function sessionCookie(realm, value, maxAge = SESSION_TTL_SEC) {
  return `${sessionCookieName(realm)}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Strict`;
}
export function clearedSessionCookie(realm) {
  return `${sessionCookieName(realm)}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`;
}

export const rules = {
  email: (e) => typeof e === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim()) && e.length <= 254,
  code: (c) => typeof c === "string" && /^\d{6}$/.test(c),
};
