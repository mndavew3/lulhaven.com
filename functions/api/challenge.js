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

// Rate limit per IP per window — mirrors /api/finding.checkRate (bug-hunt
// wf_cc76eaba-c0b). This public, unauthenticated endpoint otherwise lets a
// script create unbounded application rows from distinct emails. Fails OPEN so
// a D1 hiccup never loses a real applicant.
const RATE_BUCKET = "challenge";
const RATE_WINDOW = 3600;   // seconds
const RATE_MAX    = 20;     // per window per IP

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

// Per-IP rate limiter against challenge_rate — same shape as /api/finding.
async function checkRate(env, ip) {
    if (!ip) return { allowed: true };
    const windowStart = Math.floor(Date.now() / 1000 / RATE_WINDOW) * RATE_WINDOW;
    try {
        await env.haven_builds
            .prepare(
                `INSERT INTO challenge_rate (bucket, key, window_start, count)
                 VALUES (?, ?, ?, 1)
                 ON CONFLICT(bucket, key, window_start)
                 DO UPDATE SET count = count + 1`
            )
            .bind(RATE_BUCKET, ip, windowStart)
            .run();
        const row = await env.haven_builds
            .prepare(
                `SELECT count FROM challenge_rate
                  WHERE bucket = ? AND key = ? AND window_start = ?`
            )
            .bind(RATE_BUCKET, ip, windowStart)
            .first();
        if (row && row.count > RATE_MAX) {
            return { allowed: false, retry_after: windowStart + RATE_WINDOW - Math.floor(Date.now() / 1000) };
        }
        return { allowed: true };
    } catch (err) {
        console.error("rate limiter error (failing open):", err);
        return { allowed: true };
    }
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

    const rate = await checkRate(env, ip);
    if (!rate.allowed) {
        return json({ ok: false, error: "That's a lot of applications in a short time. Please wait a little and try again.", retry_after: rate.retry_after }, 429);
    }

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
