// root_creds.js — shared derive logic for both the hidden root account and
// the customer-facing haven account's initial (bench-set, one-time) login.
// See ~/haven/docs/USER_CREDENTIAL_STRATEGY.md section 2 and memories
// project_haven_root_rekey_design / project_haven_precursor_terminology for
// the full mechanism.
//
// A password is derived, never stored: HMAC-SHA256(key, serial:date),
// base64url-encoded and truncated. Root and haven use the SAME function with
// TWO SEPARATE keys (ROOT_CREDS_KEY, HAVEN_CREDS_KEY) so a compromise of one
// key never exposes the other — root_creds itself only holds dates and a
// status word, never a password.

export async function deriveCredPassword(serial, dateStr, key) {
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
