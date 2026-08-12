// root_creds.js — shared logic for the hidden root account's login state.
// See ~/haven/docs/USER_CREDENTIAL_STRATEGY.md section 2 and memory
// project_haven_root_rekey_design for the full mechanism.
//
// The password is derived, never stored: HMAC-SHA256(ROOT_CREDS_KEY,
// serial:date), base64url-encoded and truncated. Only ROOT_CREDS_KEY (one
// Cloudflare secret) needs protecting — root_creds itself only holds dates
// and a status word.

export async function deriveRootPassword(serial, dateStr, key) {
    const enc = new TextEncoder();
    const cryptoKey = await crypto.subtle.importKey(
        "raw", enc.encode(key), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
    );
    const sig = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(`${serial}:${dateStr}`));
    const b64 = btoa(String.fromCharCode(...new Uint8Array(sig)))
        .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    return b64.slice(0, 24);
}

export function todayStr() {
    return new Date().toISOString().slice(0, 10);
}
