// /api/submissions — operator read-on-demand view data.
// GET → JSON of both challenge submission tables. Auth-gated by _middleware.js
// (build_maint_token cookie — same password as /build-maint).

export async function onRequestGet({ env }) {
    try {
        const survey = await env.haven_builds
            .prepare(
                `SELECT id, router, priority_note, email, judge_interest,
                        judge_background, source_ip, created_datetime
                   FROM router_survey ORDER BY id DESC`
            )
            .all();

        // The richer /challenge page writes here; table may not exist yet.
        let applications = { results: [] };
        try {
            applications = await env.haven_builds
                .prepare(`SELECT * FROM challenge_applications ORDER BY rowid DESC`)
                .all();
        } catch { /* table absent — ignore */ }

        return Response.json({
            ok: true,
            router_survey: survey.results || [],
            challenge_applications: applications.results || [],
        });
    } catch (err) {
        return Response.json({ ok: false, error: String(err) }, { status: 500 });
    }
}
