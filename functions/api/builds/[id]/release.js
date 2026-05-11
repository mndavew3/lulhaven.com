// POST /api/builds/<id>/release — final release sign-off
//
// Body: { released_by: str, force?: bool }
// Refuses unless all steps are success/skipped and all NCRs resolved, unless force.
//
// On successful release, commits a JSON snapshot of the build to mndavew3/haven-data
// at builds/<site>/<serial>.json. If the git commit fails (e.g., token not set),
// the release itself still succeeds — durability is best-effort, not blocking.

import { commitBuildSnapshot } from "../../../lib/git.js";

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
    if (!body.released_by) {
        return new Response(JSON.stringify({ error: "released_by required" }), {
            status: 400, headers: { "Content-Type": "application/json" },
        });
    }
    const force = body.force === true;

    if (!force) {
        const pending = await env.haven_builds.prepare(
            `SELECT COUNT(*) AS n FROM build_steps
              WHERE build_id = ? AND status NOT IN ('success','skipped')`
        ).bind(buildId).first();
        if (pending && pending.n > 0) {
            return new Response(JSON.stringify({
                error: `${pending.n} step(s) not success/skipped. Use force=true to override.`
            }), { status: 409, headers: { "Content-Type": "application/json" } });
        }
        const openNcrs = await env.haven_builds.prepare(
            `SELECT COUNT(*) AS n FROM build_nonconformances
              WHERE build_id = ? AND disposition = 'open'`
        ).bind(buildId).first();
        if (openNcrs && openNcrs.n > 0) {
            return new Response(JSON.stringify({
                error: `${openNcrs.n} open non-conformance(s). Use force=true to override.`
            }), { status: 409, headers: { "Content-Type": "application/json" } });
        }
    }

    await env.haven_builds.prepare(
        `UPDATE builds
            SET overall_status = 'success',
                ended_datetime = strftime('%s','now'),
                released_by = ?,
                released_datetime = strftime('%s','now'),
                modified_datetime = strftime('%s','now')
          WHERE id = ?`
    ).bind(body.released_by, buildId).run();

    // Durability: commit a JSON snapshot of the released build to haven-data git.
    // Best-effort — if the git commit fails (e.g., HAVEN_DATA_GITHUB_TOKEN not set,
    // GitHub API hiccup), the release itself still succeeds. We surface the git
    // result (success or failure reason) in the response so the caller knows.
    let gitInfo = { committed: false, reason: "skipped" };
    try {
        const build = await env.haven_builds.prepare(
            `SELECT serial FROM builds WHERE id = ?`
        ).bind(buildId).first();
        const result = await commitBuildSnapshot(
            env, env.haven_builds, buildId,
            `release: ${build.serial} (released_by ${body.released_by})`,
        );
        gitInfo = { committed: true, ...result };
    } catch (e) {
        gitInfo = { committed: false, reason: String(e.message || e) };
    }

    return new Response(JSON.stringify({
        ok: true,
        build_id: buildId,
        git: gitInfo,
    }), {
        status: 200, headers: { "Content-Type": "application/json" },
    });
}
