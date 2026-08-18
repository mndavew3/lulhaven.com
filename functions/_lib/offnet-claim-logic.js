// _lib/offnet-claim-logic.js — the one piece of offnet-claim that has a
// testable decision in it: does a router's bearer token prove it holds the
// ENROLL_SECRET for the serial it claims?  The bearer is
// HMAC-SHA256(ENROLL_SECRET, serial) hex. The relay stores a per-serial
// verifier (the same HMAC, written at provision time to the enroll_secrets
// table) and compares in constant time. The secret itself is never stored
// here in plaintext and never crosses the wire — only the HMAC does.
//
// deriveBearer is exported so the router poller (shell/lua) can be checked
// against the exact same construction in a Node test.

export async function deriveBearer(enrollSecret, serial) {
    const key = await crypto.subtle.importKey(
        "raw", new TextEncoder().encode(enrollSecret),
        { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(serial));
    return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, "0")).join("");
}

function timingSafeEqual(a, b) {
    if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return diff === 0;
}

// The relay stores the expected bearer per serial (enroll_secrets.bearer),
// written at provision time. verifyRouterBearer compares the presented bearer
// to the stored one — no secret material on the relay, just the HMAC.
export async function verifyRouterBearer(env, serial, presented) {
    if (!presented) return false;
    try {
        const row = await env.haven_builds
            .prepare("SELECT bearer FROM enroll_secrets WHERE serial = ?")
            .bind(serial).first();
        if (!row || !row.bearer) return false;
        return timingSafeEqual(String(presented), String(row.bearer));
    } catch {
        return false;   // fail closed — no verifier, no access
    }
}

export { timingSafeEqual };
