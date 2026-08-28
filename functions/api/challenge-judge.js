// /api/challenge-judge — judge-ranking tool for the Haven Challenge (#34 leaderboard,
// tracker decisions #44/#45/#12). Auth-gated in _middleware.js (build_maint_token
// cookie, same realm as /api/builds/*) -- see the note there on why.
//
//   GET  ?tier=vm|full (optional; both if omitted)
//        -> confirmed, non-duplicate findings for that tier, ordered unranked-first
//           then by judge_rank. Reporter identity (email/handle) is deliberately
//           OMITTED -- challenge-judges.html promises judges "who reported it isn't
//           shown to you, and neither is anything else about them." Judge the
//           finding, not the person.
//
//   POST { id, judge_rank }
//        -> sets/clears the judge's rank on one finding. judge_rank is a plain
//           integer a human types in (1 = first place, 2 = second, ...) or null
//           to clear it. NO scoring algorithm computes this (#44) -- this endpoint
//           only ever stores exactly what was sent.
//
// Scope note: only 'confirmed' findings with duplicate_of IS NULL are rankable.
// Unconfirmed/submitted findings aren't real yet (schema's own §9 promise -- see
// challenge-findings-schema.sql); a duplicate isn't the first flag on its hill,
// so it rides on the original's ranking rather than getting its own.

function json(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status, headers: { "Content-Type": "application/json" },
    });
}

function validTier(t) { return t === "vm" || t === "full"; }

export async function onRequestGet(context) {
    const { env, request } = context;
    const url = new URL(request.url);
    const tierParam = url.searchParams.get("tier");
    if (tierParam && !validTier(tierParam)) {
        return json({ error: "tier must be 'vm' or 'full'" }, 400);
    }

    const where = tierParam
        ? `WHERE tier = ? AND status = 'confirmed' AND duplicate_of IS NULL`
        : `WHERE status = 'confirmed' AND duplicate_of IS NULL`;
    const stmt = env.haven_builds.prepare(
        `SELECT id, tier, title, steps, expected, actual, evidence,
                haven_version, feed_vintage, confirmed_datetime, judge_rank
           FROM challenge_findings
           ${where}
          ORDER BY tier ASC, (judge_rank IS NULL) DESC, judge_rank ASC, confirmed_datetime ASC`
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

    // Must be a rankable row: confirmed, not a duplicate. Ranking a submitted/
    // unconfirmed/duplicate finding would let standing drift ahead of triage.
    const row = await env.haven_builds.prepare(
        `SELECT id FROM challenge_findings WHERE id = ? AND status = 'confirmed' AND duplicate_of IS NULL`
    ).bind(id).first();
    if (!row) {
        return json({ error: "No confirmed, non-duplicate finding with that id" }, 404);
    }

    await env.haven_builds.prepare(
        `UPDATE challenge_findings SET judge_rank = ?, modified_datetime = datetime('now') WHERE id = ?`
    ).bind(judge_rank, id).run();

    return json({ ok: true, id, judge_rank });
}
