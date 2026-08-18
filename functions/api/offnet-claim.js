// /api/offnet-claim — off-network enrollment claim queue (task_ladder #141,
// decision 1A). A relay-side mailbox between a person holding a claim code and
// the router that will honor it. The endpoint NEVER validates the code — it
// cannot; only the router knows its per-unit ENROLL_SECRET. This is a dumb,
// auth-thin queue by design; all trust lives on the router.
//
// Three verbs, one table (offnet_claims on haven_builds):
//   POST {code}                       -> queue a claim; returns {claim_id}
//   GET  ?serial=X                    -> router long-poll: pending codes to try
//   POST {claim_id, serial, resolve}  -> router posts the verify RESULT back
//   GET  ?claim_id=Y                  -> claimer polls for the pairing payload
//
// The router authenticates its GET/resolve with a bearer derived from
// ENROLL_SECRET (HMAC over the serial) so a stranger can't drain another
// unit's queue. That derivation is shared with the poller script; the secret
// itself never crosses the wire.
//
// Staged-inert until offnet-claim-schema.sql is applied to the remote D1.
import { verifyRouterBearer } from "../_lib/offnet-claim-logic.js";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Authorization" };
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...CORS } });
const isCode = (s) => typeof s === "string" && /^[A-Za-z0-9-]{6,40}$/.test(s);
const isSerial = (s) => typeof s === "string" && /^[A-Za-z0-9-]{6,64}$/.test(s);
const nowIso = () => new Date().toISOString().replace("T", " ").slice(0, 19);

export async function onRequestOptions() { return new Response(null, { status: 204, headers: CORS }); }

export async function onRequestGet({ request, env }) {
    const u = new URL(request.url);
    const claimId = u.searchParams.get("claim_id");
    const serial = u.searchParams.get("serial");

    // Claimer polling for the result of their own claim.
    if (claimId) {
        try {
            const row = await env.haven_builds
                .prepare("SELECT status, pairing_payload FROM offnet_claims WHERE claim_id = ?")
                .bind(claimId).first();
            if (!row) return json({ status: "unknown" }, 404);
            if (row.status === "claimed") return json({ status: "claimed", pairing: JSON.parse(row.pairing_payload || "null") });
            return json({ status: row.status });
        } catch { return json({ status: "unknown" }, 404); }
    }

    // Router long-poll: hand back the queued codes it should try.
    if (serial) {
        if (!isSerial(serial)) return json({ error: "bad_serial" }, 400);
        const auth = (request.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
        if (!(await verifyRouterBearer(env, serial, auth))) return json({ error: "unauthorized" }, 401);
        try {
            const rows = await env.haven_builds
                .prepare("SELECT claim_id, code FROM offnet_claims WHERE status = 'queued' ORDER BY queued_at LIMIT 20")
                .all();
            return json({ pending: (rows.results || []).map(r => ({ claim_id: r.claim_id, code: r.code })) });
        } catch { return json({ pending: [] }); }
    }
    return json({ error: "bad_request" }, 400);
}

export async function onRequestPost({ request, env }) {
    let body;
    try { body = await request.json(); } catch { return json({ error: "bad_body" }, 400); }

    // Router posting a verify RESULT back (resolve).
    if (body.resolve) {
        const { claim_id, serial, pairing } = body;
        if (!isSerial(serial)) return json({ error: "bad_serial" }, 400);
        const auth = (request.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
        if (!(await verifyRouterBearer(env, serial, auth))) return json({ error: "unauthorized" }, 401);
        try {
            await env.haven_builds
                .prepare("UPDATE offnet_claims SET status='claimed', serial=?, pairing_payload=?, claimed_at=? WHERE claim_id=? AND status='queued'")
                .bind(serial, JSON.stringify(pairing || null), nowIso(), claim_id).run();
            return json({ ok: true });
        } catch { return json({ ok: false }, 500); }
    }

    // Claimer queuing a new code.
    if (!isCode(body.code)) return json({ error: "bad_code" }, 400);
    const claimId = crypto.randomUUID();
    try {
        await env.haven_builds
            .prepare("INSERT INTO offnet_claims (claim_id, code, status, queued_at) VALUES (?,?, 'queued', ?)")
            .bind(claimId, body.code, nowIso()).run();
        return json({ claim_id: claimId, status: "queued" });
    } catch { return json({ error: "server_error" }, 500); }
}
