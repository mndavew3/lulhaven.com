// /api/update-status — OTA update-outcome telemetry ingest (device-health only).
//
// A router POSTs the result of an update attempt on its next boot:
//   { serial, unit_nonce?, attempt_id, from_version, to_version,
//     running_version, result, error?, client_ts? }
// We validate, record it in the haven_builds D1 (update_reports), and return an
// ack so the unit can clear its pending flag. Idempotent on (serial, attempt_id):
// a retried report (flaky WAN, un-acked earlier) updates the same row.
//
// Trust model v1: the serial is checked against provisioned_units and the report
// is *flagged* serial_known / nonce_ok — it is NOT rejected when unknown, because
// bench/dev units (older serial scheme) legitimately aren't in that table. A
// fleet-health query filters on serial_known for retail. Upgrade path: signed
// reports using a per-unit key (reuses the release-signing infra). Public endpoint
// (unit-facing, like /api/provision) — _middleware only gates /api/builds/*.
//
// PRIVACY: device-health fields only. The WAN IP is never stored (a coarse
// request.cf.country is kept, mirroring provision.js). No user or browsing data.

const CORS = {
    "Access-Control-Allow-Origin":  "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};
const json = (b, s = 200) =>
    new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", ...CORS } });

const RESULTS = new Set([
    "success", "reverted", "flash_failed", "download_failed",
    "sha_mismatch", "incompatible", "unknown",
]);
const ENVIRONMENTS = new Set(["hardware", "vm", "container", "unknown"]);

// Version string sanity: X.Y.Z or empty. Keeps junk out of the table.
const verOk = (v) => v === "" || /^[0-9]{1,4}(\.[0-9]{1,4}){2}$/.test(v);
const clean = (v, max) => String(v == null ? "" : v).slice(0, max);

export async function onRequestOptions() {
    return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestPost(context) {
    const { request, env } = context;

    let body;
    try { body = await request.json(); }
    catch { return json({ ok: false, error: "invalid body" }, 400); }

    const serial = clean(body.serial, 64).trim();
    if (!/^[A-Za-z0-9._-]{4,64}$/.test(serial)) return json({ ok: false, error: "bad serial" }, 400);

    const attempt_id = clean(body.attempt_id, 64).trim();
    if (!/^[A-Za-z0-9._-]{4,64}$/.test(attempt_id)) return json({ ok: false, error: "bad attempt_id" }, 400);

    const result = clean(body.result, 24).trim();
    if (!RESULTS.has(result)) return json({ ok: false, error: "bad result" }, 400);

    const from_version    = clean(body.from_version, 12).trim();
    const to_version      = clean(body.to_version, 12).trim();
    const running_version = clean(body.running_version, 12).trim();
    if (![from_version, to_version, running_version].every(verOk))
        return json({ ok: false, error: "bad version" }, 400);

    const error  = clean(body.error, 4000);   // journal/error text, device-health only
    const nonce  = clean(body.unit_nonce, 64).trim();
    const client_ts = Number.isFinite(+body.client_ts) ? Math.trunc(+body.client_ts) : null;
    const country = ((request.cf && request.cf.country) || "XX").toUpperCase().replace(/[^A-Z]/g, "X").slice(0, 2);

    // Device type: board/model + deployment environment (device-health, not personal).
    const model = clean(body.model, 48).trim();
    let environment = clean(body.environment, 16).trim().toLowerCase();
    if (!ENVIRONMENTS.has(environment)) environment = "unknown";

    const db = env.haven_builds;

    // Flag trust level (never reject on unknown — dev/bench units aren't provisioned).
    let serial_known = 0, nonce_ok = 0;
    try {
        const row = await db.prepare("SELECT unit_nonce FROM provisioned_units WHERE serial = ?").bind(serial).first();
        if (row) {
            serial_known = 1;
            if (nonce && row.unit_nonce && nonce === row.unit_nonce) nonce_ok = 1;
        }
    } catch { /* provisioned_units may be absent in a bare test DB — treat as unknown */ }

    // Idempotent upsert on (serial, attempt_id).
    await db.prepare(
        "INSERT INTO update_reports " +
        "(serial, attempt_id, from_version, to_version, running_version, result, model, environment, error, " +
        " serial_known, nonce_ok, client_ts, source_country) " +
        "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?) " +
        "ON CONFLICT(serial, attempt_id) DO UPDATE SET " +
        " from_version=excluded.from_version, to_version=excluded.to_version, " +
        " running_version=excluded.running_version, result=excluded.result, " +
        " model=excluded.model, environment=excluded.environment, " +
        " error=excluded.error, serial_known=excluded.serial_known, nonce_ok=excluded.nonce_ok, " +
        " client_ts=excluded.client_ts, source_country=excluded.source_country, " +
        " reported_at=datetime('now')"
    ).bind(
        serial, attempt_id, from_version, to_version, running_version, result, model, environment, error,
        serial_known, nonce_ok, client_ts, country
    ).run();

    // The ack the unit waits for before clearing its pending flag.
    return json({ ok: true, ack: attempt_id, serial_known, nonce_ok });
}
