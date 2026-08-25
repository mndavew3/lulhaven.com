// _lib/haven-identity.js — verify that a request really came from the Haven
// router it claims to be (task_ladder #147, Dave's option B, 2026-08-25).
//
// Each unit mints an Ed25519 keypair at first boot (uci-defaults
// 86-haven-identity-key) and keeps the private half in its reset-surviving
// vault; we store only the base64 raw 32-byte public key (unit_identities,
// bound first-claim-then-immutable). The router signs THREE LINES:
//
//     <serial>\n<unix-seconds>\n<sha256hex-of-body-or-empty>\n
//
// and sends the parts as headers: X-Haven-Serial, X-Haven-Timestamp,
// X-Haven-Signature (base64, 64 bytes). The timestamp and the body hash are
// both inside the signature, so a captured request cannot be replayed after
// the skew window nor re-pointed at different content. Within the window a
// replay reproduces only the identical action, and the callers that matter
// rate-limit per serial — a nonce ledger was considered and rejected as
// disproportionate (no units in the field; revisit if that changes).
//
// This replaces verifyRouterBearer (offnet-claim-logic.js): the shared-secret
// bearer required an ENROLL_SECRET no normal unit ever received — measured
// 2026-08-25 on a fully provisioned 0.1.89 bench Olive, no offnetwork.conf —
// and a leaked secret list could FORGE, while a leaked pubkey list can only
// VERIFY. Signature production was proven on the real hardware the same day
// (bench Olive OpenSSL 3.5.7; the .test.js fixture is one of those signatures).
//
// Every failure is fail-CLOSED (no identity -> no authenticated action); the
// router side stays fail-open about its own fallbacks, which is the correct
// asymmetry: the unit keeps filtering without us, but we never act on a
// request we cannot attribute.

export const SKEW_SECONDS = 900;   // |server now - router ts| allowed; routers run NTP + clock-restore

const b64ToBytes = (s) => {
    try { return Uint8Array.from(atob(String(s)), c => c.charCodeAt(0)); }
    catch { return null; }
};

// Wrap a raw 32-byte Ed25519 public key as SPKI DER — the 12-byte fixed header
// for OID 1.3.101.112 — so WebCrypto importKey("spki") takes it. Same bytes
// the router produces: its base64 is `openssl pkey -outform DER | tail -c 32`.
export function spkiFromRaw(raw) {
    const hdr = new Uint8Array([0x30, 0x2a, 0x30, 0x05, 0x06, 0x03, 0x2b, 0x65, 0x70, 0x03, 0x21, 0x00]);
    const out = new Uint8Array(hdr.length + raw.length);
    out.set(hdr); out.set(raw, hdr.length);
    return out;
}

export async function sha256hex(text) {
    const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return [...new Uint8Array(d)].map(b => b.toString(16).padStart(2, "0")).join("");
}

// The exact bytes the router signed. An absent/empty body is an EMPTY third
// line (the router only hashes when it was handed a body file) — so a GET and
// a bodyless POST sign identically, and any non-empty body binds its content.
export async function buildMessage(serial, ts, bodyText) {
    const h = bodyText ? await sha256hex(bodyText) : "";
    return `${serial}\n${ts}\n${h}\n`;
}

// Pure crypto check — no store lookup, so the unit test can drive it with any
// key. Returns boolean; every malformed input is just `false`.
export async function verifySignature(pubkeyB64, serial, ts, bodyText, sigB64) {
    const pub = b64ToBytes(pubkeyB64);
    const sig = b64ToBytes(sigB64);
    if (!pub || pub.length !== 32 || !sig || sig.length !== 64) return false;
    try {
        const key = await crypto.subtle.importKey("spki", spkiFromRaw(pub), "Ed25519", false, ["verify"]);
        const msg = new TextEncoder().encode(await buildMessage(serial, ts, bodyText));
        return await crypto.subtle.verify("Ed25519", key, sig, msg);
    } catch {
        return false;   // runtime without Ed25519, garbage DER — all fail closed
    }
}

export function extractIdentityHeaders(request) {
    const serial = request.headers.get("X-Haven-Serial");
    const ts = request.headers.get("X-Haven-Timestamp");
    const sig = request.headers.get("X-Haven-Signature");
    if (!serial || !ts || !sig) return null;
    return { serial, ts, sig };
}

const isSerial = (s) => typeof s === "string" && /^[A-Za-z0-9-]{6,64}$/.test(s);

// The whole gate: headers -> shape checks -> skew -> pubkey lookup -> verify.
// bodyText must be the RAW text the request carried (read request.text() and
// JSON.parse it yourself — a re-serialized body would hash differently).
// nowSeconds is injectable for tests; callers omit it.
export async function verifyRouterIdentity(env, request, bodyText, nowSeconds) {
    const hdr = extractIdentityHeaders(request);
    if (!hdr) return { ok: false, reason: "no_identity_headers" };
    if (!isSerial(hdr.serial)) return { ok: false, reason: "bad_serial" };
    if (!/^\d{1,12}$/.test(hdr.ts)) return { ok: false, reason: "bad_timestamp" };
    const now = nowSeconds ?? Math.floor(Date.now() / 1000);
    if (Math.abs(now - Number(hdr.ts)) > SKEW_SECONDS) return { ok: false, reason: "stale_timestamp" };

    let row;
    try {
        row = await env.haven_builds
            .prepare("SELECT pubkey FROM unit_identities WHERE serial = ?")
            .bind(hdr.serial).first();
    } catch {
        return { ok: false, reason: "server_error" };   // store down -> fail closed
    }
    if (!row || !row.pubkey) return { ok: false, reason: "unknown_unit" };

    if (!(await verifySignature(row.pubkey, hdr.serial, hdr.ts, bodyText, hdr.sig)))
        return { ok: false, reason: "bad_signature" };
    return { ok: true, serial: hdr.serial };
}

// First-claim-then-immutable binding. The CALLER proves possession before
// binding (identity-register verifies the request's signature against the key
// in its body; provision binds at serial mint, before the serial exists
// anywhere else). Re-read-after-insert settles races: whoever's INSERT landed,
// the answer is judged against what the store actually holds.
export async function bindIdentity(env, serial, pubkeyB64, via) {
    const pub = b64ToBytes(pubkeyB64);
    if (!isSerial(serial) || !pub || pub.length !== 32) return { ok: false, reason: "bad_identity" };
    try {
        const before = await env.haven_builds
            .prepare("SELECT pubkey FROM unit_identities WHERE serial = ?")
            .bind(serial).first();
        if (before && before.pubkey) {
            return before.pubkey === pubkeyB64
                ? { ok: true, bound: "already" }
                : { ok: false, reason: "identity_mismatch" };
        }
        await env.haven_builds
            .prepare("INSERT INTO unit_identities (serial, pubkey, bound_via) VALUES (?, ?, ?) ON CONFLICT(serial) DO NOTHING")
            .bind(serial, pubkeyB64, via || "register").run();
        const after = await env.haven_builds
            .prepare("SELECT pubkey FROM unit_identities WHERE serial = ?")
            .bind(serial).first();
        if (after && after.pubkey === pubkeyB64) return { ok: true, bound: "new" };
        return after ? { ok: false, reason: "identity_mismatch" } : { ok: false, reason: "server_error" };
    } catch {
        return { ok: false, reason: "server_error" };
    }
}
