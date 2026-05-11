// PUT /api/builds/<id>/step/<step_id>
//   Update a step: execute (status, operator, result, error) and/or verify (verifier).
//
// Body fields (all optional, sent fields are applied):
//   status        'executing'|'success'|'failure'|'skipped'
//   operator      string
//   actual_result string
//   error         string
//   verifier      string  (if present, sets verified_datetime to now)

export async function onRequestPut(context) {
    const { env, params, request } = context;
    const buildId = parseInt(params.id, 10);
    const stepId = parseInt(params.step_id, 10);
    if (!Number.isFinite(buildId) || !Number.isFinite(stepId)) {
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

    // Confirm the step belongs to this build (defense)
    const existing = await env.haven_builds.prepare(
        `SELECT id, status FROM build_steps WHERE id = ? AND build_id = ?`
    ).bind(stepId, buildId).first();
    if (!existing) {
        return new Response(JSON.stringify({ error: "Step not found in this build" }), {
            status: 404, headers: { "Content-Type": "application/json" },
        });
    }

    // Build dynamic UPDATE based on which fields were sent
    const setClauses = [];
    const bindings = [];

    const ALLOWED_STATUS = new Set(["pending","executing","success","failure","skipped"]);
    if ("status" in body) {
        if (!ALLOWED_STATUS.has(body.status)) {
            return new Response(JSON.stringify({ error: "Invalid status" }), {
                status: 400, headers: { "Content-Type": "application/json" },
            });
        }
        setClauses.push("status = ?");
        bindings.push(body.status);
    }
    if ("operator" in body && body.operator) {
        setClauses.push("operator = ?", "executed_datetime = strftime('%s','now')");
        bindings.push(body.operator);
    }
    if ("actual_result" in body) {
        setClauses.push("actual_result = ?");
        bindings.push(body.actual_result || null);
    }
    if ("error" in body) {
        setClauses.push("error = ?");
        bindings.push(body.error || null);
    }
    if ("verifier" in body && body.verifier) {
        setClauses.push("verifier = ?", "verified_datetime = strftime('%s','now')");
        bindings.push(body.verifier);
    }

    if (setClauses.length === 0) {
        return new Response(JSON.stringify({ error: "No updatable fields in body" }), {
            status: 400, headers: { "Content-Type": "application/json" },
        });
    }
    setClauses.push("modified_datetime = strftime('%s','now')");

    bindings.push(stepId);
    const sql = `UPDATE build_steps SET ${setClauses.join(", ")} WHERE id = ?`;
    await env.haven_builds.prepare(sql).bind(...bindings).run();

    const after = await env.haven_builds.prepare(
        `SELECT id, step_order, step_kind, step_name, status, operator, verifier,
                executed_datetime, verified_datetime, actual_result, error
           FROM build_steps WHERE id = ?`
    ).bind(stepId).first();

    return new Response(JSON.stringify({ ok: true, step: after }), {
        status: 200, headers: { "Content-Type": "application/json" },
    });
}
