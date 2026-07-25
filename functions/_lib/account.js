// Shared crypto for Haven Challenge participant accounts.
// See docs/CONTEST_EXPORT_IMPORT_DESIGN.md.
//
// Passwords are stored ONE-WAY and SALTED — never plaintext, never decryptable:
//   stored = PBKDF2-SHA256( HMAC-SHA256(pepper, password), per_user_salt, 100k )
// The pepper ("a key only we know") and the session-signing key are both HKDF
// subkeys of one secret, CONTEST_ACCOUNT_KEY. Even if the DB *and* the key leak,
// passwords cannot be recovered (one-way) — strictly safer than reversible
// encrypt-and-compare, same login behavior.

const enc = new TextEncoder(), dec = new TextDecoder();
export const SESSION_COOKIE = "haven_contest_session";
const SESSION_TTL_SEC = 6 * 3600;
const PBKDF2_ITERS = 100000;

const hex = (buf) => Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
function hexToBytes(h) { const a = new Uint8Array(h.length / 2); for (let i = 0; i < a.length; i++) a[i] = parseInt(h.substr(i*2,2),16); return a; }
function b64url(bytes) { let s = ""; for (const b of bytes) s += String.fromCharCode(b); return btoa(s).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,""); }
function fromB64url(s) { s = s.replace(/-/g,"+").replace(/_/g,"/"); while (s.length % 4) s += "="; const bin = atob(s), a = new Uint8Array(bin.length); for (let i=0;i<bin.length;i++) a[i]=bin.charCodeAt(i); return a; }

// Constant-time-ish compare of two equal-length hex strings.
function ctEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

// Raw bytes of an HKDF subkey of CONTEST_ACCOUNT_KEY, labelled by `info`.
async function subkeyBytes(env, info) {
  const master = env.CONTEST_ACCOUNT_KEY;
  if (!master) throw new Error("CONTEST_ACCOUNT_KEY not configured");
  const base = await crypto.subtle.importKey("raw", hexToBytes(master), "HKDF", false, ["deriveBits"]);
  return new Uint8Array(await crypto.subtle.deriveBits(
    { name: "HKDF", hash: "SHA-256", salt: enc.encode("haven-accounts"), info: enc.encode(info) }, base, 256));
}

async function hmac(keyBytes, msgBytes) {
  const k = await crypto.subtle.importKey("raw", keyBytes, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", k, msgBytes));
}

// --- password ---
export async function hashPassword(env, password, saltHex) {
  const salt = saltHex ? hexToBytes(saltHex) : crypto.getRandomValues(new Uint8Array(16));
  const pepper = await subkeyBytes(env, "account-pepper");
  const peppered = await hmac(pepper, enc.encode(password));   // secret-key layer
  const material = await crypto.subtle.importKey("raw", peppered, "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: PBKDF2_ITERS }, material, 256);
  return { salt: hex(salt), hash: hex(bits) };
}
export async function verifyPassword(env, password, saltHex, hashHex) {
  const { hash } = await hashPassword(env, password, saltHex);
  return ctEqual(hash, hashHex);
}

// --- session (signed cookie, no server store) ---
export async function makeSession(env, username) {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SEC;
  const payload = b64url(enc.encode(`${username}\n${exp}`));
  const sig = hex(await hmac(await subkeyBytes(env, "account-session"), enc.encode(payload)));
  return `${payload}.${sig}`;
}
export async function readSession(env, cookieHeader) {
  if (!cookieHeader) return null;
  const m = cookieHeader.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`));
  if (!m) return null;
  const [payload, sig] = m[1].split(".");
  if (!payload || !sig) return null;
  const good = hex(await hmac(await subkeyBytes(env, "account-session"), enc.encode(payload)));
  if (!ctEqual(sig, good)) return null;
  const [username, exp] = dec.decode(fromB64url(payload)).split("\n");
  if (!username || !exp || Math.floor(Date.now() / 1000) > Number(exp)) return null;
  return username;
}
export function sessionCookie(value, maxAge = SESSION_TTL_SEC) {
  return `${SESSION_COOKIE}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Strict`;
}

// A short numeric email-verification code.
export function newCode() {
  return String(crypto.getRandomValues(new Uint32Array(1))[0] % 1000000).padStart(6, "0");
}
export const rules = {
  username: (u) => typeof u === "string" && /^[A-Za-z0-9_]{3,32}$/.test(u),
  email:    (e) => typeof e === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 254,
  password: (p) => typeof p === "string" && p.length >= 8 && p.length <= 256,
};
