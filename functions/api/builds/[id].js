// GET /api/builds/<id> — full detail: header + ordered steps + NCRs

export async function onRequestGet(context) {
    const { env, params } = context;
    const id = parseInt(params.id, 10);
    if (!Number.isFinite(id)) {
        return new Response(JSON.stringify({ error: "Invalid id" }), {
            status: 400, headers: { "Content-Type": "application/json" },
        });
    }

    // Header
    const buildRow = await env.haven_builds.prepare(
        `SELECT id, serial, model_code, unit_number, hardware, customer, site,
                firmware_version, feed_db_version, manifest_hash,
                started_datetime, ended_datetime, overall_status,
                released_by, released_datetime, notes,
                created_datetime, modified_datetime
           FROM builds WHERE id = ?`
    ).bind(id).first();

    if (!buildRow) {
        return new Response(JSON.stringify({ error: "Build not found" }), {
            status: 404, headers: { "Content-Type": "application/json" },
        });
    }

    // Steps (ordered)
    const stepsRes = await env.haven_builds.prepare(
        `SELECT id, step_order, step_kind, step_name, description, procedure_ref,
                expected_result, actual_result, status, operator, executed_datetime,
                verifier, verified_datetime, error, nonconformance_id
           FROM build_steps WHERE build_id = ? ORDER BY step_order`
    ).bind(id).all();

    // Non-conformances
    const ncrsRes = await env.haven_builds.prepare(
        `SELECT id, discovered_at_step, discovered_datetime, discovered_by,
                description, root_cause, corrective_action, disposition,
                resolved_datetime, resolved_by, notes
           FROM build_nonconformances WHERE build_id = ?
          ORDER BY discovered_datetime`
    ).bind(id).all();

    return new Response(JSON.stringify({
        build: buildRow,
        steps: stepsRes.results,
        nonconformances: ncrsRes.results,
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
