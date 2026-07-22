// /api/finding — public intake for Haven Challenge bug/bypass reports (#33).
//
// POST { email, handle?, title, steps, expected?, actual?, evidence?, tier?,
//        config_json?, haven_version?, feed_vintage?, rules_version }
//   -> inserts into challenge_findings, returns { ok, id, message }.
//
// Deliberate choices, all traceable to docs/challenge-rules-and-scope.md:
//
//  * NO APPROVAL GATE (#47). Anyone who registered can submit immediately.
//    We do not check that an application row exists -- a real finding must
//    never be lost to ordering.
//
//  * PARTIAL REPORTS ARE WELCOME (§8). Only email, title and steps are
//    required. Everything else is optional, because "if you're not sure it's a
//    finding, send it" is a promise the form has to honour.
//
//  * NOTHING IS EVER "REJECTED" (§9). Intake only ever writes 'submitted'.
//    Triage later moves it to 'confirmed' or 'unconfirmed'; the schema has no
//    'rejected' value at all.
//
//  * RULES ACCEPTANCE IS CAPTURED HERE (#50), because submission is the moment
//    the terms actually bind.
//
// Mirrors the /api/challenge pattern (same D1 binding: haven_builds).

const CORS_HEADERS = {
    "Access-Control-Allow-Origin":  "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

// Rate limit (#51): submissions per IP per window. Generous on purpose -- a
// contestant on a roll may legitimately file several in a row; this exists to
// stop a script, not to ration honest reporting.
const RATE_BUCKET  = "finding";
const RATE_WINDOW  = 3600;   // seconds
const RATE_MAX     = 20;     // per window per IP

const MAX_CONFIG_BYTES = 512 * 1024;   // an exported Helm config is ~KBs

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

function clean(s, max) {
    if (typeof s !== "string") return null;
    const t = s.trim().slice(0, max);
    return t || null;
}

// Returns { allowed, retry_after }. Fails OPEN: if the limiter itself errors we
// accept the report. Losing a genuine finding is far worse than accepting one
// extra request.
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
        return json({ ok: false, error: "Please enter the email address you registered with." }, 400);
    }

    const title = clean(body.title, 200);
    if (!title) {
        return json({ ok: false, error: "Please give your finding a short title." }, 400);
    }
    const steps = clean(body.steps, 20000);
    if (!steps) {
        return json({ ok: false, error: "Please tell us what you did, step by step." }, 400);
    }

    const ip = request.headers.get("CF-Connecting-IP") || null;
    const rate = await checkRate(env, ip);
    if (!rate.allowed) {
        return json({
            ok: false,
            error: "That's a lot of reports in a short time. Please wait a little and try again — " +
                   "nothing you already sent has been lost.",
            retry_after: rate.retry_after,
        }, 429);
    }

    // The config export is the most useful attachment, but a bad one must not
    // cost us the report -- store what we can and let triage sort it out.
    let config_json = null;
    if (typeof body.config_json === "string" && body.config_json.trim()) {
        const raw = body.config_json.trim();
        if (raw.length > MAX_CONFIG_BYTES) {
            return json({
                ok: false,
                error: "That settings file is unexpectedly large. Please attach the file " +
                       "exported from the Helm.",
            }, 413);
        }
        config_json = raw;
    }

    const tier = body.tier === "full" ? "full" : "vm";

    // #50: record WHO accepted WHICH rules version, WHEN.
    const rules_version = clean(body.rules_version, 40);
    const rules_accepted = rules_version ? new Date().toISOString() : null;

    let id;
    try {
        const res = await env.haven_builds
            .prepare(
                `INSERT INTO challenge_findings
                    (email, handle, title, steps, expected, actual, evidence, tier,
                     config_json, haven_version, feed_vintage,
                     rules_version, rules_accepted_datetime,
                     status, source_ip, created_datetime, modified_datetime)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                         'submitted', ?, datetime('now'), datetime('now'))`
            )
            .bind(
                email,
                clean(body.handle, 120),
                title,
                steps,
                clean(body.expected, 5000),
                clean(body.actual, 5000),
                clean(body.evidence, 2000),
                tier,
                config_json,
                clean(body.haven_version, 40),
                clean(body.feed_vintage, 40),
                rules_version,
                rules_accepted,
                ip
            )
            .run();
        id = res.meta && res.meta.last_row_id;
    } catch (err) {
        console.error("challenge_findings insert error:", err);
        return json({
            ok: false,
            error: "Something went wrong saving that. Please try again — and if it keeps " +
                   "failing, mail security@lulhaven.com so it isn't lost.",
        }, 500);
    }

    return json({
        ok: true,
        id,
        message: config_json
            ? "Got it — settings file received. We'll try to reproduce it and come back to you."
            : "Got it. If you can, send your exported Helm settings too — it's the single " +
              "thing that most helps us reproduce what you saw.",
    });
}
