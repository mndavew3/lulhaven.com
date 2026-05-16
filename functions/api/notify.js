// /api/notify — public endpoint
// POST { email: "..." }  → inserts into launch_signups, returns JSON
// UNIQUE constraint on email means duplicate submissions are silently accepted
// (same success response — no user-enumeration risk).

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
    // RFC-lite: must have one @, non-empty local + domain, domain has a dot
    return typeof email === "string"
        && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        && email.length <= 254;
}

export async function onRequestOptions() {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
}

// Source attribution: the client passes `source` (free-text channel tag like
// "hn", "geerling", "reddit-homelab", etc.) in the POST body. Index.html JS
// reads ?ref=… and ?utm_source=… from the landing-page URL and forwards that.
// Truncated to 64 chars (column is free-text but we don't want runaway values).
function sanitizeSource(s) {
    if (typeof s !== "string") return null;
    const t = s.trim().toLowerCase().slice(0, 64);
    return t || null;
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

    const ip = request.headers.get("CF-Connecting-IP") || null;
    const source = sanitizeSource(body.source);

    try {
        // Insert-or-update so a returning visitor with a different ?ref= source
        // updates the attribution to the latest channel (most-recent-touch model).
        // For pure first-touch attribution, swap to ON CONFLICT DO NOTHING.
        await env.haven_builds
            .prepare(
                `INSERT INTO launch_signups (email, source_ip, source)
                 VALUES (?, ?, ?)
                 ON CONFLICT(email) DO UPDATE SET
                     source = COALESCE(excluded.source, source)`
            )
            .bind(email, ip, source)
            .run();
    } catch (err) {
        console.error("launch_signups insert error:", err);
        return json({ ok: false, error: "Something went wrong. Please try again." }, 500);
    }

    return json({ ok: true, message: "You're on the list! We'll notify you the moment we go live." });
}
