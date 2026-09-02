// /api/challenge-judge — judge-ranking tool for the Haven Challenge (#34 leaderboard,
// tracker decisions #44/#45/#12). Auth-gated in _middleware.js (build_maint_token
// cookie, same realm as /api/builds/*) -- see the note there on why.
//
// PORTED 2026-09-02 from the orphaned challenge_findings table to contest_claims,
// the live intake table (#114's ground truth; challenge_findings never existed in
// remote D1). Rankable rows are the ones the design lets COMPETE
// (CONTEST_EXPORT_IMPORT_DESIGN.md §3c + §3d): status='confirmed', lane='attested'
// (manual_review is structurally excluded at the data layer), evidence_sufficient=1
// (the vetting-side gate that stops a vague decoy outranking a real reproduction),
// disqualified_from_priority=0, and a tier assigned at vetting time.
//
//   GET  ?tier=vm|full (optional; both if omitted)
//        -> rankable claims for that tier, ordered unranked-first then by
//           judge_rank. Reporter identity (username/email) is deliberately
//           OMITTED -- challenge-judges.html promises judges "who reported it
//           isn't shown to you, and neither is anything else about them."
//           Judge the finding, not the person.
//
//   POST { id, judge_rank }
//        -> sets/clears the judge's rank on one claim. judge_rank is a plain
//           integer a human types in (1 = first place, 2 = second, ...) or null
//           to clear it. NO scoring algorithm computes this (#44) -- this endpoint
//           only ever stores exactly what was sent.
//
// Tie-breaks downstream use id ASC: contest_claims.id is the §3c seq — the sole
// serialized order key — so lowest id IS earliest submission, no algorithm.

function json(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status, headers: { "Content-Type": "application/json" },
    });
}

function validTier(t) { return t === "vm" || t === "full"; }

const RANKABLE =
    `status = 'confirmed' AND lane = 'attested'
     AND evidence_sufficient = 1 AND disqualified_from_priority = 0
     AND tier IS NOT NULL`;

export async function onRequestGet(context) {
    const { env, request } = context;
    const url = new URL(request.url);
    const tierParam = url.searchParams.get("tier");
    if (tierParam && !validTier(tierParam)) {
        return json({ error: "tier must be 'vm' or 'full'" }, 400);
    }

    const where = tierParam
        ? `WHERE tier = ? AND ${RANKABLE}`
        : `WHERE ${RANKABLE}`;
    const stmt = env.haven_builds.prepare(
        `SELECT id, tier, claim_title, claim_details, model,
                haven_version, feed_build_id, created_datetime, judge_rank
           FROM contest_claims
           ${where}
          ORDER BY tier ASC, (judge_rank IS NULL) DESC, judge_rank ASC, id ASC`
    );
    const result = tierParam ? await stmt.bind(tierParam).all() : await stmt.all();

    return json({ findings: result.results || [] });
}

export async function onRequestPost(context) {
    const { request, env } = context;

    let body;
    try {
        body = await request.json();
    } catch {
        return json({ error: "Invalid JSON" }, 400);
    }

    const id = Number.parseInt(body.id, 10);
    if (!Number.isInteger(id) || id <= 0) {
        return json({ error: "id is required and must be a positive integer" }, 400);
    }

    let judge_rank = null;
    if (body.judge_rank !== null && body.judge_rank !== undefined && body.judge_rank !== "") {
        judge_rank = Number.parseInt(body.judge_rank, 10);
        if (!Number.isInteger(judge_rank) || judge_rank <= 0) {
            return json({ error: "judge_rank must be a positive integer, or null to clear" }, 400);
        }
    }

    // Must be a rankable row (see RANKABLE above). Ranking a submitted/
    // unconfirmed/insufficient claim would let standing drift ahead of triage.
    const row = await env.haven_builds.prepare(
        `SELECT id FROM contest_claims WHERE id = ? AND ${RANKABLE}`
    ).bind(id).first();
    if (!row) {
        return json({ error: "No rankable claim with that id (needs confirmed + attested + evidence-sufficient + tier)" }, 404);
    }

    await env.haven_builds.prepare(
        `UPDATE contest_claims SET judge_rank = ? WHERE id = ?`
    ).bind(judge_rank, id).run();

    return json({ ok: true, id, judge_rank });
}
