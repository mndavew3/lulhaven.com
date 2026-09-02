// GET /api/challenge-leaderboard — public. Renders ONLY who placed 1st/2nd/3rd
// per tier (#12: tier IS the board). Never the rank number, never a point/
// count value, never an email address (#45: "boards may be RANKED BY any
// quantitative metric ... but the VALUES are never rendered" / "display only
// the top three, not a full ranked list, so nobody sees that they are 87th").
//
// PORTED 2026-09-02 to contest_claims (challenge_findings never existed in
// remote D1). Standing comes straight from judge_rank -- a number a human judge
// typed in via /api/challenge-judge (#44: judge pool, not an algorithm). This
// endpoint does no scoring of its own: it groups rankable claims by reporter
// (email is the identity key; a person may have several claims), takes each
// person's best (lowest) judge_rank, and returns the top three per tier.
// Ties break on id ASC -- contest_claims.id is the §3c seq, so earliest
// submission wins, no algorithm. Display name is the contestant's username
// (never the email); a blank username renders as "Anonymous".

const CORS_HEADERS = {
    "Access-Control-Allow-Origin":  "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
};

function json(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status, headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    });
}

async function topThree(env, tier) {
    const { results } = await env.haven_builds.prepare(
        `SELECT email, username FROM contest_claims
          WHERE tier = ? AND status = 'confirmed' AND lane = 'attested'
                AND evidence_sufficient = 1 AND disqualified_from_priority = 0
                AND judge_rank IS NOT NULL
          ORDER BY judge_rank ASC, id ASC`
    ).bind(tier).all();

    const seen = new Set();
    const names = [];
    for (const row of results || []) {
        const key = (row.email || "").toLowerCase();
        if (!key || seen.has(key)) continue;
        seen.add(key);
        const username = typeof row.username === "string" ? row.username.trim() : "";
        names.push(username || "Anonymous");
        if (names.length === 3) break;
    }
    return names;
}

export async function onRequestOptions() {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestGet(context) {
    const { env } = context;
    const [vm, full] = await Promise.all([topThree(env, "vm"), topThree(env, "full")]);
    return json({ vm, full });
}
