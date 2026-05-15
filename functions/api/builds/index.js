// /api/builds
//   GET   list all builds
//   POST  create a new build + auto-seed its steps from the step_templates table
//
// The burn checklist lives in D1 as DATA (the step_templates table), NOT as a
// hardcoded array here. Refining the procedure = an UPDATE to step_templates
// (or re-running haven-data/step_templates_seed.sql), no worker redeploy.
// This is the wiki #30 vision; adopted 2026-05-14 after the previous hardcoded
// STANDARD_STEPS array went stale and a burn ran off-script against it.

// Validate serial: yymmddMODnnnn
function parseSerial(serial) {
    const m = /^(\d{6})([A-Z]{3})(\d{4})$/.exec(serial);
    if (!m) return null;
    return { date: m[1], model_code: m[2], unit_number: parseInt(m[3], 10) };
}

export async function onRequestGet(context) {
    const { env, request } = context;
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "50", 10);

    const result = await env.haven_builds.prepare(
        `SELECT id, serial, model_code, unit_number, hardware, customer, site,
                firmware_version, started_datetime, ended_datetime,
                overall_status, released_by, released_datetime, notes
           FROM builds
          ORDER BY started_datetime DESC
          LIMIT ?`
    ).bind(limit).all();

    return new Response(JSON.stringify({ builds: result.results }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

export async function onRequestPost(context) {
    const { request, env } = context;

    let body;
    try {
        body = await request.json();
    } catch {
        return new Response(JSON.stringify({ error: "Invalid JSON" }), {
            status: 400, headers: { "Content-Type": "application/json" },
        });
    }

    const { serial, hardware, customer, site, firmware_version, feed_db_version,
            manifest_hash, notes } = body;

    if (!serial) {
        return new Response(JSON.stringify({ error: "serial is required" }), {
            status: 400, headers: { "Content-Type": "application/json" },
        });
    }
    const parsed = parseSerial(serial);
    if (!parsed) {
        return new Response(JSON.stringify({
            error: "serial does not match yymmddMODnnnn (e.g. 260510NAV0001)"
        }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    // Insert the build row
    const ins = await env.haven_builds.prepare(
        `INSERT INTO builds
            (serial, model_code, unit_number, hardware, customer, site,
             firmware_version, feed_db_version, manifest_hash, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
        serial, parsed.model_code, parsed.unit_number, hardware || null,
        customer || null, site || "mn-st-cloud",
        firmware_version || null, feed_db_version || null,
        manifest_hash || null, notes || null
    ).run();

    const buildId = ins.meta.last_row_id;

    // Auto-seed this build's steps from the step_templates table (the D1-resident
    // source of truth for the burn checklist). Fail loudly if it's empty — a build
    // with no steps is worse than a clear error, and there is deliberately NO
    // hardcoded fallback (that was the stale-array failure mode we just removed).
    const templates = await env.haven_builds.prepare(
        `SELECT step_order, step_kind, step_name, description, procedure_ref,
                addresses_issue, expected_result
           FROM step_templates WHERE active = 1 ORDER BY step_order`
    ).all();

    const rows = templates.results || [];
    if (rows.length === 0) {
        return new Response(JSON.stringify({
            error: "step_templates is empty — cannot seed build steps. " +
                   "Re-seed via haven-data/step_templates_seed.sql."
        }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    const stmts = rows.map((t) =>
        env.haven_builds.prepare(
            `INSERT INTO build_steps
                (build_id, step_order, step_kind, step_name,
                 description, procedure_ref, expected_result, addresses_issue)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(buildId, t.step_order, t.step_kind, t.step_name,
               t.description, t.procedure_ref, t.expected_result, t.addresses_issue)
    );
    await env.haven_builds.batch(stmts);

    return new Response(JSON.stringify({
        ok: true,
        build_id: buildId,
        serial,
        model_code: parsed.model_code,
        unit_number: parsed.unit_number,
        steps_seeded: rows.length
    }), { status: 201, headers: { "Content-Type": "application/json" } });
}
