// POST /api/auth — verify password, issue session cookie.
//
// Body: { "password": "..." }
// Success: 200 { "ok": true }, Set-Cookie: build_maint_token=...
// Failure: 401 { "error": "Invalid password" }

const COOKIE_NAME = "build_maint_token";
const COOKIE_LIFE_SEC = 8 * 60 * 60;

async function hmacHex(secret, message) {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
        "raw", enc.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false, ["sign"]
    );
    const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
    return Array.from(new Uint8Array(sig))
        .map(b => b.toString(16).padStart(2, "0")).join("");
}

// Constant-time-ish compare -- same shape as ctEqual in _lib/auth.js (which is not
// exported, hence the local copy). Length still leaks; the content does not.
function ctEqual(a, b) {
    if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
    let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return d === 0;
}

export async function onRequestPost(context) {
    const { request, env } = context;

    const secret = env.BUILD_MAINT_PASSWORD || "";
    if (!secret) {
        return new Response(
            JSON.stringify({ error: "BUILD_MAINT_PASSWORD not configured on server" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return new Response(
            JSON.stringify({ error: "Invalid JSON body" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    if (!ctEqual(body.password, secret)) {
        // Generic message; no info leak about whether the password format was close.
        return new Response(
            JSON.stringify({ error: "Invalid password" }),
            { status: 401, headers: { "Content-Type": "application/json" } }
        );
    }

    const tsHex = Date.now().toString(16);
    const sig = await hmacHex(secret, tsHex);
    const token = `${tsHex}.${sig}`;

    const cookie = [
        `${COOKIE_NAME}=${token}`,
        "Path=/",
        `Max-Age=${COOKIE_LIFE_SEC}`,
        "HttpOnly",
        "SameSite=Strict",
        "Secure",
    ].join("; ");

    return new Response(
        JSON.stringify({ ok: true }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Set-Cookie": cookie,
            },
        }
    );
}

// POST /api/auth/logout — clears the cookie. Bonus.
export async function onRequestDelete(context) {
    const cookie = `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict; Secure`;
    return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Set-Cookie": cookie },
    });
}
