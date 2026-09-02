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

// Paths that must never be served, whatever happens to be sitting in the
// deployment. The site directory is a WORKING directory — source trees, database
// schemas, editor backups and tool config live right next to the pages — so the
// publish step is one bad filter away from putting any of it on the internet.
// That is not hypothetical: `.assetsignore` turned out to be a Workers feature
// that Pages never reads, so for months every "excluded" path was publicly
// fetchable (challenge.db #102). The deploy filter is correct now; this is the
// second lock, and it does not care what got uploaded.
//
// It matters more here than on a normal site because lulhaven.com has no 404 —
// an unmatched path returns the homepage with a 200, so a leaked file and a
// working page look identical to anything checking from outside.
const DENY_PATHS = [
    /\.sql$/i,             // database schemas — a map of our storage
    /\.BAK/i,              // Dave's reversibility backups stay in place on disk
    /^\/wrangler\.toml$/i, // names the D1/R2 bindings
    /^\/\.assetsignore$/i,
    /^\/\.git/i,
    /^\/migrations\//i,
    /^\/adq\//i,           // source tree, not website content
    /^\/CLAUDE\.md$/i,
];

export async function onRequest(context) {
    const { request, env, next } = context;
    const url = new URL(request.url);

    // Test the decoded path as well as the raw one. A static asset server
    // resolves %2E to a dot when it looks the file up on disk; a regex that only
    // ever sees the encoded form would wave /wrangler%2Etoml straight through to
    // it. Checking both costs nothing and closes that gap without changing what
    // happens to any ordinary path, whose decoded form is itself.
    // decodeURIComponent throws on malformed input like %ZZ, and a throw here
    // would 500 every request on the site, so it falls back to the raw path.
    let decoded = url.pathname;
    try { decoded = decodeURIComponent(url.pathname); } catch { /* keep raw */ }
    if (DENY_PATHS.some(re => re.test(url.pathname) || re.test(decoded))) {
        return new Response("Not found", {
            status: 404,
            headers: { "Content-Type": "text/plain", "Cache-Control": "no-store" },
        });
    }

    // Cloudflare resolves /API/x, /api/x/ and %-encoded forms to the same
    // function, so every gate below compares against this folded path — a raw
    // exact-case compare is a login bypass (found live 2026-09-02: /API/submissions
    // returned customer data with no cookie while /api/submissions was gated).
    const path = decoded.toLowerCase().replace(/\/+$/, "") || "/";

    // /api/auth itself is public — POST password, get cookie.
    if (path === "/api/auth") {
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
    if (PUBLIC_API_PATHS.includes(path)) {
        return next();
    }

    // Contest gate — the entire Haven Challenge surface is dormant until the
    // operator flips CONTEST_ACTIVE=1 (and before any CONTEST_END). Checked here
    // so every contest route is gated in ONE place (single source of truth: flip
    // one flag to open the next annual contest). attest/claim-intake also self-
    // check; this closes the account endpoints (register/verify/login/…) too.
    // Closed => 403, nothing runs. /api/challenge (coming-soon interest) is NOT
    // gated — it stays open before the contest so people can register interest.
    const p = path;
    if (p.startsWith("/api/contest-") || p === "/api/claim-intake"
        || p === "/api/finding" || p === "/api/attest") {
        const now = Math.floor(Date.now() / 1000);
        const contestActive = env.CONTEST_ACTIVE === "1"
            && (!env.CONTEST_END || now <= Number(env.CONTEST_END));
        if (!contestActive) {
            return new Response(
                JSON.stringify({ error: "The Haven Challenge is not currently open." }),
                { status: 403, headers: { "Content-Type": "application/json" } }
            );
        }
    }

    // Build-maint endpoints (everything under /api/builds/) requires auth cookie.
    // Challenge judge-ranking tool reuses the SAME internal maintenance realm --
    // judges are given the maint password out of band, same as any other staff
    // tool on this site; there is no separate judge login system (#34/#44/#45).
    if (path.startsWith("/api/builds/") || path === "/api/builds"
        || path === "/api/signups" || path === "/api/submissions"
        || path === "/api/claim-vet"
        || path === "/api/challenge-judge"
        || path === "/challenge-judge-tool.html" || path === "/challenge-judge-tool") {
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

// Helpers reused by other functions
export { COOKIE_NAME, COOKIE_LIFE_MS, hmacHex };
