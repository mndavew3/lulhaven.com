// GET /api/challenge-leaderboard — public. Renders ONLY who placed 1st/2nd/3rd
// on the ONE leaderboard (Dave 2026-10-01: one board, not one per tier --
// supersedes #12; a claim's tier is only a label of which Haven it was found
// on, per the 2026-09-02 one-contest ruling). Never the rank number, never a point/
// count value, never an email address (#45: "boards may be RANKED BY any
// quantitative metric ... but the VALUES are never rendered" / "display only
// the top three, not a full ranked list, so nobody sees that they are 87th").
//
// PORTED 2026-09-02 to contest_claims (challenge_findings never existed in
// remote D1). FINAL standing comes straight from judge_rank -- a number a human
// judge typed in via /api/challenge-judge (#44: judge pool, not an algorithm):
// group rankable claims by reporter (email is the identity key; a person may
// have several claims), take each person's best (lowest) judge_rank, return the
// top three. Ties break on id ASC -- contest_claims.id is the §3c seq, so
// earliest submission wins.
//
// Until any claim carries a judge_rank (i.e. during the window -- judges only
// see findings after it closes), the board is PROVISIONAL (Dave 2026-10-01,
// option A): the three people with the most confirmed findings, ties to whoever
// got their first one in earliest. The count orders the board and is never
// returned. Test claims (is_test=1) never count. Display name is the
// contestant's username (never the email); a blank username renders as
// "Anonymous".

const CORS_HEADERS = {
    "Access-Control-Allow-Origin":  "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
};

function json(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status, headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    });
}

const RANKABLE =
    `status = 'confirmed' AND lane = 'attested' AND is_test = 0
     AND evidence_sufficient = 1 AND disqualified_from_priority = 0`;

function displayNames(results) {
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

async function judged(env) {
    const { results } = await env.haven_builds.prepare(
        `SELECT email, username FROM contest_claims
          WHERE ${RANKABLE} AND judge_rank IS NOT NULL
          ORDER BY judge_rank ASC, id ASC`
    ).all();
    return displayNames(results);
}

// SQLite returns the bare `username` from the MIN(id) row, i.e. the name on
// that person's earliest confirmed finding.
async function provisional(env) {
    const { results } = await env.haven_builds.prepare(
        `SELECT lower(email) AS email, username, MIN(id) AS first_id, COUNT(*) AS n
           FROM contest_claims
          WHERE ${RANKABLE}
          GROUP BY lower(email)
          ORDER BY n DESC, first_id ASC
          LIMIT 3`
    ).all();
    return displayNames(results);
}

export async function onRequestOptions() {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestGet(context) {
    const { env } = context;
    const final = await judged(env);
    if (final.length) return json({ top: final, provisional: false });
    return json({ top: await provisional(env), provisional: true });
}
