// POST /api/builds/<id>/nc — open a non-conformance record
//
// Body: { discovered_at_step?: int, discovered_by: str, description: str }

export async function onRequestPost(context) {
    const { env, params, request } = context;
    const buildId = parseInt(params.id, 10);
    if (!Number.isFinite(buildId)) {
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
    if (!body.description) {
        return new Response(JSON.stringify({ error: "description is required" }), {
            status: 400, headers: { "Content-Type": "application/json" },
        });
    }

    const ins = await env.haven_builds.prepare(
        `INSERT INTO build_nonconformances
            (build_id, discovered_at_step, discovered_by, description)
         VALUES (?, ?, ?, ?)`
    ).bind(
        buildId,
        body.discovered_at_step || null,
        body.discovered_by || null,
        body.description
    ).run();

    const ncId = ins.meta.last_row_id;

    if (body.discovered_at_step) {
        await env.haven_builds.prepare(
            `UPDATE build_steps SET nonconformance_id = ?, status = 'failure',
                    modified_datetime = strftime('%s','now')
              WHERE id = ? AND build_id = ?`
        ).bind(ncId, body.discovered_at_step, buildId).run();
    }

    return new Response(JSON.stringify({ ok: true, nc_id: ncId }), {
        status: 201, headers: { "Content-Type": "application/json" },
    });
}
