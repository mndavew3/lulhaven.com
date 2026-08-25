// /api/identity-register — bind a router's Ed25519 public key to its serial
// (task_ladder #147, Dave's option B, 2026-08-25). For units that already HAVE
// a serial when they first grow an identity key — the 0.1.90 upgrade path —
// where provision-time binding (provision.js) never got the chance.
//
// PROOF OF POSSESSION, then FIRST-CLAIM-THEN-IMMUTABLE: the request must
// verify against the key IN ITS OWN BODY (the store cannot be consulted for a
// serial it does not know yet — that gap is the point of this endpoint), and
// bindIdentity refuses any later attempt with a different key. A vault-restored
// unit re-registering after a factory reset presents its ORIGINAL key and gets
// {bound:"already"}.
//
// Squatting guard: only serials this house actually issued can be claimed
// (issued_serials, populated at provision). Without it, anyone could pre-bind
// keys to serials that do not exist yet and lock the real units out on their
// first boot. Fail closed if the registry cannot be read.
import { extractIdentityHeaders, verifySignature, bindIdentity, SKEW_SECONDS } from "../_lib/haven-identity.js";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, X-Haven-Serial, X-Haven-Timestamp, X-Haven-Signature" };
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...CORS } });
const isSerial = (s) => typeof s === "string" && /^[A-Za-z0-9-]{6,64}$/.test(s);

export async function onRequestOptions() { return new Response(null, { status: 204, headers: CORS }); }

export async function onRequestPost({ request, env }) {
    let raw, body;
    try { raw = await request.text(); body = JSON.parse(raw); } catch { return json({ error: "bad_body" }, 400); }

    const hdr = extractIdentityHeaders(request);
    if (!hdr) return json({ error: "unsigned" }, 401);
    if (!isSerial(hdr.serial)) return json({ error: "bad_serial" }, 400);
    if (!/^\d{1,12}$/.test(hdr.ts)) return json({ error: "bad_timestamp" }, 400);
    if (Math.abs(Math.floor(Date.now() / 1000) - Number(hdr.ts)) > SKEW_SECONDS)
        return json({ error: "stale_timestamp" }, 401);

    const pubkey = typeof body.pubkey === "string" ? body.pubkey.trim() : "";
    if (!(await verifySignature(pubkey, hdr.serial, hdr.ts, raw, hdr.sig)))
        return json({ error: "bad_signature" }, 401);

    // Issued-serial check — see the squatting note above.
    try {
        const known = await env.haven_builds
            .prepare("SELECT 1 AS one FROM issued_serials WHERE serial = ?")
            .bind(hdr.serial).first();
        if (!known) return json({ error: "unknown_serial" }, 404);
    } catch { return json({ error: "server_error" }, 500); }

    const b = await bindIdentity(env, hdr.serial, pubkey, "register");
    if (!b.ok) return json({ error: b.reason }, b.reason === "identity_mismatch" ? 409 : 500);
    return json({ ok: true, bound: b.bound });
}
