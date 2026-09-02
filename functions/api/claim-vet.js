// /api/claim-vet — the missing VETTING step for Haven Challenge bug claims (#114).
//
// POST { id, status, note?, evidence_sufficient?, tier? }
//   -> sets a contest_claims row's status to 'confirmed' or 'unconfirmed'.
//      NEVER 'rejected' -- challenge-rules.html: "Two states, and neither of
//      them is 'rejected.'" An Unconfirmed claim gets an invitation for more
//      evidence, not a dismissal; `note` carries that invitation text.
//      `evidence_sufficient` is the judge priority gate among duplicate-bug
//      claims (docs/CONTEST_EXPORT_IMPORT_DESIGN.md §3c) -- Haven sets it
//      here because judges only see claims after the window closes.
//      `tier` ('vm' | 'full', or null to clear) assigns the claim's board
//      (tracker decision #12: tier IS the board) -- intake can't know it, so
//      the vetting operator sets it here; the judge tool only lists claims
//      whose tier is assigned. challenge_tasks #44 (LOCKED) reserves
//      RANKING/standing for the judge pool; confirming a claim, grading its
//      evidence, and assigning its board are not ranking.
//
// Auth-gated in _middleware.js (build_maint_token cookie, same realm as
// /api/submissions). Never touches claim-intake's insert path or the
// ranking-by-id semantics (contest_claims.id is untouched here).

function json(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status, headers: { "Content-Type": "application/json" },
    });
}

const VALID_STATUS = ["confirmed", "unconfirmed"];

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

    // Only these two outcomes exist -- this is what makes 'rejected' impossible
    // even if a caller sends it. (The DB trigger is the second, independent gate.)
    if (!VALID_STATUS.includes(body.status)) {
        return json({ error: "status must be 'confirmed' or 'unconfirmed'" }, 400);
    }

    const note = typeof body.note === "string" ? (body.note.trim().slice(0, 5000) || null) : null;
    const evidenceSufficient = body.evidence_sufficient ? 1 : 0;

    let tier = null;
    if (body.tier !== null && body.tier !== undefined && body.tier !== "") {
        if (body.tier !== "vm" && body.tier !== "full") {
            return json({ error: "tier must be 'vm' or 'full', or null to clear" }, 400);
        }
        tier = body.tier;
    }

    const row = await env.haven_builds.prepare(`SELECT id FROM contest_claims WHERE id = ?`).bind(id).first();
    if (!row) {
        return json({ error: "No claim with that id" }, 404);
    }

    await env.haven_builds.prepare(
        `UPDATE contest_claims SET status = ?, vet_note = ?, evidence_sufficient = ?, tier = ? WHERE id = ?`
    ).bind(body.status, note, evidenceSufficient, tier, id).run();

    return json({ ok: true, id, status: body.status, evidence_sufficient: evidenceSufficient, tier });
}
