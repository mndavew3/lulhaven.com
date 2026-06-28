// /api/challenge-survey — public endpoint for the Haven Challenge pre-announce.
// POST { router, priority_note?, email?, judge_interest?, judge_background? }
//   → inserts into router_survey; returns JSON.
// Email is OPTIONAL — required only when judge_interest is set (mirrors the page).
// Same D1 binding as /api/challenge (haven_builds).

const CORS_HEADERS = {
    "Access-Control-Allow-Origin":  "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

function json(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    });
}

function isValidEmail(email) {
    return typeof email === "string"
        && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        && email.length <= 254;
}

// Trim + length-cap a free-text field; null if empty.
function clean(s, max) {
    if (typeof s !== "string") return null;
    const t = s.trim().slice(0, max);
    return t || null;
}

export async function onRequestOptions() {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestPost(context) {
    const { request, env } = context;

    let body;
    try {
        body = await request.json();
    } catch {
        return json({ ok: false, error: "Invalid request body." }, 400);
    }

    const router = clean(body.router, 160);
    if (!router) {
        return json({ ok: false, error: "Please name a router." }, 400);
    }

    const judge_interest = body.judge_interest ? 1 : 0;
    const rawEmail = (body.email || "").trim().toLowerCase();
    const email = rawEmail ? rawEmail : null;

    if (email && !isValidEmail(email)) {
        return json({ ok: false, error: "Please enter a valid email address." }, 400);
    }
    if (judge_interest && !email) {
        return json({ ok: false, error: "Challenge judge pool candidates must provide an email address." }, 400);
    }

    const priority_note    = clean(body.priority_note, 2000);
    const judge_background  = judge_interest ? clean(body.judge_background, 2000) : null;
    const ip                = request.headers.get("CF-Connecting-IP") || null;

    try {
        await env.haven_builds
            .prepare(
                `INSERT INTO router_survey
                    (router, priority_note, email, judge_interest, judge_background, source_ip, created_datetime)
                 VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`
            )
            .bind(router, priority_note, email, judge_interest, judge_background, ip)
            .run();
    } catch (err) {
        console.error("router_survey insert error:", err);
        return json({ ok: false, error: "Something went wrong. Please try again." }, 500);
    }

    return json({
        ok: true,
        message: judge_interest
            ? "Thanks — your suggestion is in, and you're in the judge pool."
            : "Thanks — your suggestion is in.",
    });
}
