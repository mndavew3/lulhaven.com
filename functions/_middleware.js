// _middleware.js — runs before every Pages Function under /functions/api/.
//
// Responsibility: auth check.
//   - /api/auth is a public endpoint (issues the cookie)
//   - everything else under /api/builds/* requires a valid build_maint_token cookie
//
// Cookie format: <hex-timestamp>.<hex-hmac-sha256(timestamp, secret)>
// 8-hour validity. Server validates HMAC and expiry on every request.

const COOKIE_NAME = "build_maint_token";
const COOKIE_LIFE_MS = 8 * 60 * 60 * 1000;          // 8 hours

async function hmacHex(secret, message) {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
        "raw", enc.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false, ["sign", "verify"]
    );
    const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
    return Array.from(new Uint8Array(sig))
        .map(b => b.toString(16).padStart(2, "0")).join("");
}

function getCookie(request, name) {
    const cookieHeader = request.headers.get("Cookie") || "";
    for (const part of cookieHeader.split(/;\s*/)) {
        const [k, ...v] = part.split("=");
        if (k === name) return v.join("=");
    }
    return null;
}

async function verifyToken(token, secret) {
    if (!token) return false;
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const [tsHex, sigHex] = parts;
    const ts = parseInt(tsHex, 16);
    if (!Number.isFinite(ts)) return false;
    // expiry
    if (Date.now() - ts > COOKIE_LIFE_MS) return false;
    // signature
    const expected = await hmacHex(secret, tsHex);
    // constant-time compare via length+xor pattern
    if (expected.length !== sigHex.length) return false;
    let diff = 0;
    for (let i = 0; i < expected.length; i++) {
        diff |= expected.charCodeAt(i) ^ sigHex.charCodeAt(i);
    }
    return diff === 0;
}

export async function onRequest(context) {
    const { request, env, next } = context;
    const url = new URL(request.url);

    // /api/auth itself is public — POST password, get cookie.
    if (url.pathname === "/api/auth") {
        return next();
    }

    // Public router-facing endpoints — these MUST stay unauthenticated
    // because routers fetch them at first boot before they have any creds.
    // (live-fire finding 2026-05-11 — Jason burn: middleware was over-gating
    // /api/* and blocking /api/feed*.db. The endpoints are static files;
    // they're the subscription feed delivery surface for every Haven router.)
    const PUBLIC_API_PATHS = [
        "/api/feed.db",
        "/api/feed-delta.db",
        "/api/update.json",   // version-check ping
    ];
    if (PUBLIC_API_PATHS.includes(url.pathname)) {
        return next();
    }

    // Build-maint endpoints (everything under /api/builds/) requires auth cookie.
    if (url.pathname.startsWith("/api/builds/") || url.pathname === "/api/builds"
        || url.pathname === "/api/signups") {
        const secret = env.BUILD_MAINT_PASSWORD || "";
        if (!secret) {
            return new Response(
                JSON.stringify({ error: "BUILD_MAINT_PASSWORD not configured on server" }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }
        const token = getCookie(request, COOKIE_NAME);
        const ok = await verifyToken(token, secret);
        if (!ok) {
            return new Response(
                JSON.stringify({ error: "Unauthorized" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }
    }

    return next();
}

// Helpers re-used by other functions
export { COOKIE_NAME, COOKIE_LIFE_MS, hmacHex };
