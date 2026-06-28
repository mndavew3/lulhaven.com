// /api/challenge — public endpoint for Haven Challenge applications
// POST { name, email, handle?, platform?, audience?, target_router? }
//   → upserts into challenge_applications; returns JSON.
// UNIQUE(email): a resubmit updates the row (no user-enumeration, no dupes).
// Mirrors the /api/notify pattern (same D1 binding: haven_builds).

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

    const email = (body.email || "").trim().toLowerCase();
    if (!isValidEmail(email)) {
        return json({ ok: false, error: "Please enter a valid email address." }, 400);
    }
    const name = clean(body.name, 120);
    if (!name) {
        return json({ ok: false, error: "Please tell us your name." }, 400);
    }

    const handle              = clean(body.handle, 120);
    const platform            = clean(body.platform, 64);
    const audience            = clean(body.audience, 64);
    const target_router       = clean(body.target_router, 64);
    const target_router_other = clean(body.target_router_other, 120);
    const stage               = body.stage === "prereg" ? "prereg" : "applied";
    const ip                  = request.headers.get("CF-Connecting-IP") || null;

    try {
        await env.haven_builds
            .prepare(
                `INSERT INTO challenge_applications
                    (name, email, handle, platform, audience, target_router, target_router_other, stage, source_ip, created_datetime)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
                 ON CONFLICT(email) DO UPDATE SET
                     name                = excluded.name,
                     handle              = COALESCE(excluded.handle, handle),
                     platform            = COALESCE(excluded.platform, platform),
                     audience            = COALESCE(excluded.audience, audience),
                     target_router       = COALESCE(excluded.target_router, target_router),
                     target_router_other = COALESCE(excluded.target_router_other, target_router_other),
                     stage               = excluded.stage`
            )
            .bind(name, email, handle, platform, audience, target_router, target_router_other, stage, ip)
            .run();
    } catch (err) {
        console.error("challenge_applications insert error:", err);
        return json({ ok: false, error: "Something went wrong. Please try again." }, 500);
    }

    return json({
        ok: true,
        message: "Application received. We review every applicant personally — watch your inbox.",
    });
}
