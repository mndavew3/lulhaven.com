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
                firmware_version, oem_firmware_version, started_datetime, ended_datetime,
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

    const { serial, hardware, customer, site, firmware_version, oem_firmware_version,
            feed_db_version, manifest_hash, notes } = body;

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

    // Reuse an existing in-progress build for this serial if one exists.
    // Idempotency contract per Dave 2026-05-15 22:23: running start-burn.sh
    // twice for the same router must NOT create a second build — it should
    // return the existing build_id so the operator can continue where they
    // left off. Once the prior build is released (overall_status != 'in-progress'),
    // the NEXT start-burn for the same serial creates a fresh build row
    // (re-burn semantics: same physical unit, separate burn attempt).
    const existing = await env.haven_builds.prepare(
        `SELECT id FROM builds
          WHERE serial = ? AND overall_status = 'in-progress'
          ORDER BY started_datetime DESC
          LIMIT 1`
    ).bind(serial).first();

    let buildId;
    let reused;
    if (existing) {
        buildId = existing.id;
        reused = true;
    } else {
        const ins = await env.haven_builds.prepare(
            `INSERT INTO builds
                (serial, model_code, unit_number, hardware, customer, site,
                 firmware_version, oem_firmware_version, feed_db_version, manifest_hash, notes)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
            serial, parsed.model_code, parsed.unit_number, hardware || null,
            customer || null, site || "mn-st-cloud",
            firmware_version || null, oem_firmware_version || null,
            feed_db_version || null, manifest_hash || null, notes || null
        ).run();
        buildId = ins.meta.last_row_id;
        reused = false;
    }

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

    // Seed step rows idempotently — UNIQUE(build_id, step_order) constraint
    // makes INSERT OR IGNORE silently skip any row already present for this
    // build. For a fresh build this inserts all 19; for a reused in-progress
    // build it inserts 0 (typical) or any missing-but-templated rows (corner
    // case: prior seeding partially failed). Per Dave 2026-05-15 22:23 —
    // "skip all existing records" / WHERE NOT EXISTS pattern.
    const stmts = rows.map((t) =>
        env.haven_builds.prepare(
            `INSERT OR IGNORE INTO build_steps
                (build_id, step_order, step_kind, step_name,
                 description, procedure_ref, expected_result, addresses_issue)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(buildId, t.step_order, t.step_kind, t.step_name,
               t.description, t.procedure_ref, t.expected_result, t.addresses_issue)
    );
    const batchResult = await env.haven_builds.batch(stmts);

    // Count how many rows actually got inserted vs were already present (the
    // sum of meta.changes from each batch entry). For a fresh build this
    // equals rows.length; for a reused build it's typically 0.
    const stepsInserted = (batchResult || []).reduce(
        (acc, r) => acc + ((r && r.meta && r.meta.changes) || 0), 0);

    // For completeness: the total step count for the build (idempotent reporting).
    const totalRow = await env.haven_builds.prepare(
        `SELECT COUNT(*) AS n FROM build_steps WHERE build_id = ?`
    ).bind(buildId).first();
    const stepsTotal = (totalRow && totalRow.n) || 0;

    return new Response(JSON.stringify({
        ok: true,
        build_id: buildId,
        reused,                       // true if attached to existing in-progress build
        serial,
        model_code: parsed.model_code,
        unit_number: parsed.unit_number,
        steps_inserted: stepsInserted,   // rows newly inserted by this call (0 if all present)
        steps_total: stepsTotal,         // total step rows present for this build
        steps_seeded: rows.length        // kept for backward-compat with existing callers
    }), { status: reused ? 200 : 201, headers: { "Content-Type": "application/json" } });
}
