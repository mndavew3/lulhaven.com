// PUT /api/builds/<id>/nc/<nc_id> — resolve a non-conformance
//
// Body: { disposition: 'rework'|'accept-with-deviation'|'scrap'|'closed',
//         resolved_by: str,
//         root_cause?: str, corrective_action?: str }

const ALLOWED_DISPOSITIONS = new Set(["open","rework","accept-with-deviation","scrap","closed"]);

export async function onRequestPut(context) {
    const { env, params, request } = context;
    const buildId = parseInt(params.id, 10);
    const ncId = parseInt(params.nc_id, 10);
    if (!Number.isFinite(buildId) || !Number.isFinite(ncId)) {
        return new Response(JSON.stringify({ error: "Invalid id" }), {
            status: 400, headers: { "Content-Type": "application/json" },
        });
    }

    let body;
    try { body = await request.json(); }
    catch {
        return new Response(JSON.stringify({ error: "Invalid JSON" }), {
            status: 400, headers: { "Content-Type": "application/json" },
        });
    }
    if (!body.disposition || !ALLOWED_DISPOSITIONS.has(body.disposition)) {
        return new Response(JSON.stringify({ error: "Invalid disposition" }), {
            status: 400, headers: { "Content-Type": "application/json" },
        });
    }
    if (!body.resolved_by) {
        return new Response(JSON.stringify({ error: "resolved_by required" }), {
            status: 400, headers: { "Content-Type": "application/json" },
        });
    }

    await env.haven_builds.prepare(
        `UPDATE build_nonconformances
            SET disposition = ?, resolved_by = ?, resolved_datetime = strftime('%s','now'),
                root_cause = COALESCE(?, root_cause),
                corrective_action = COALESCE(?, corrective_action),
                modified_datetime = strftime('%s','now')
          WHERE id = ? AND build_id = ?`
    ).bind(
        body.disposition, body.resolved_by,
        body.root_cause || null, body.corrective_action || null,
        ncId, buildId
    ).run();

    return new Response(JSON.stringify({ ok: true }), {
        status: 200, headers: { "Content-Type": "application/json" },
    });
}
