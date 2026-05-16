// /api/notify — public endpoint
// POST { email, source? }  → upserts into launch_signups + (if enabled) sends
//                            a confirmation email; returns JSON.
// UNIQUE(email) means duplicate submissions are silently accepted (same
// success response — no user-enumeration risk).
//
// Feature flags (env):
//   DOUBLE_OPT_IN_ENABLED  — "true" to require email-confirmation before
//                            a signup is considered active. Default: false
//                            (legacy behavior — instant signup, auto-confirmed).
//                            See _lib/email.js header for Resend setup.

import { sendEmail, newToken, baseUrl, confirmEmailTemplate } from "../_lib/email.js";

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

function sanitizeSource(s) {
    if (typeof s !== "string") return null;
    const t = s.trim().toLowerCase().slice(0, 64);
    return t || null;
}

function isFlagTrue(v) {
    return v === true || v === "true" || v === "1";
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

    const ip     = request.headers.get("CF-Connecting-IP") || null;
    const source = sanitizeSource(body.source);
    const doubleOptIn = isFlagTrue(env.DOUBLE_OPT_IN_ENABLED);

    // Branch on opt-in mode:
    //  - Legacy / no-opt-in: insert + mark confirmed_at = now (or leave existing)
    //  - Double-opt-in:      insert + generate token, leave confirmed_at NULL,
    //                        send confirmation email.
    const token = doubleOptIn ? newToken() : null;
    const nowExpr = "datetime('now')";

    try {
        if (doubleOptIn) {
            // On conflict, REUSE the existing token if one already issued (avoids
            // generating a new token per resubmit). Source becomes most-recent.
            // Don't overwrite confirmed_at if already confirmed.
            await env.haven_builds
                .prepare(
                    `INSERT INTO launch_signups
                        (email, source_ip, source, confirmation_token, confirmation_sent_at)
                     VALUES (?, ?, ?, ?, datetime('now'))
                     ON CONFLICT(email) DO UPDATE SET
                         source               = COALESCE(excluded.source, source),
                         confirmation_token   = COALESCE(confirmation_token, excluded.confirmation_token),
                         confirmation_sent_at = datetime('now')`
                )
                .bind(email, ip, source, token)
                .run();
        } else {
            // Legacy: auto-confirm at insert time.
            await env.haven_builds
                .prepare(
                    `INSERT INTO launch_signups
                        (email, source_ip, source, confirmed_at)
                     VALUES (?, ?, ?, datetime('now'))
                     ON CONFLICT(email) DO UPDATE SET
                         source = COALESCE(excluded.source, source)`
                )
                .bind(email, ip, source)
                .run();
        }
    } catch (err) {
        console.error("launch_signups insert error:", err);
        return json({ ok: false, error: "Something went wrong. Please try again." }, 500);
    }

    if (!doubleOptIn) {
        return json({
            ok: true,
            message: "You're on the list! We'll notify you the moment we go live.",
        });
    }

    // Double-opt-in: figure out the token to use (we may have reused an old one)
    // and send the confirmation email. Even if email fails, we return 200 — the
    // row exists; the user can resubmit to retry the send.
    const row = await env.haven_builds
        .prepare(`SELECT confirmation_token, confirmed_at FROM launch_signups WHERE email = ?`)
        .bind(email).first();

    // Edge case: already confirmed (user resubmits) — say so cleanly, no resend.
    if (row && row.confirmed_at) {
        return json({
            ok: true,
            message: "You're already on the list — we'll notify you when we launch.",
        });
    }

    const useToken = row?.confirmation_token || token;
    const confirmUrl = `${baseUrl(env)}/api/notify/confirm?token=${encodeURIComponent(useToken)}`;
    const tmpl = confirmEmailTemplate({ confirmUrl });
    const sendResult = await sendEmail({
        env, to: email, subject: tmpl.subject, html: tmpl.html, text: tmpl.text,
    });

    if (sendResult.skipped) {
        // Sender not configured — be honest with caller so we don't promise
        // an email we never sent. Row still exists, so this is recoverable
        // once RESEND_API_KEY is set.
        console.warn("[notify] DOUBLE_OPT_IN_ENABLED but no RESEND_API_KEY — email NOT sent");
        return json({
            ok: true,
            message: "You're on the list! (Confirmation email is not yet enabled — we'll reach out at launch.)",
        });
    }

    return json({
        ok: true,
        message: "Check your email — click the confirmation link to finish signing up.",
    });
}
