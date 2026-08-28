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

        // Halloween Challenge bug claims — the vetting queue (#114). Written by
        // claim-intake.js, vetted via /api/claim-vet. evidence_b64 (the whole
        // settings export, up to 512KB) is deliberately excluded: this is an
        // operator LIST, not a file download.
        let claims = { results: [] };
        try {
            claims = await env.haven_builds
                .prepare(
                    `SELECT id, attestation, username, email, claim_title, claim_details,
                            t_receipt_ms, t_export_ms, serial, feed_build_id, model, haven_version,
                            tamper_flags, lane, disqualified_from_priority, evidence_sufficient,
                            package_description, package_prefix, settings_r2_key,
                            attachment_r2_key, attachment_name, attachment_type, attachment_bytes,
                            source_ip, status, vet_note, created_datetime
                       FROM contest_claims ORDER BY id DESC`
                )
                .all();
        } catch { /* table absent — ignore */ }

        return Response.json({
            ok: true,
            router_survey: survey.results || [],
            challenge_applications: applications.results || [],
            contest_claims: claims.results || [],
        });
    } catch (err) {
        return Response.json({ ok: false, error: String(err) }, { status: 500 });
    }
}
