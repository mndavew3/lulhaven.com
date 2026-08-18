// /api/redeem — turn a Haven download code into the current image for its
// flavor (challenge #71b, task_ladder #113).
//
// POST {code} ->
//   bad checksum      -> friendly "mistyped?" WITHOUT any DB lookup
//   unknown code      -> "we don't recognize that code"
//   known, no image   -> "code is good, image not published yet"
//   known, current    -> {version, url, sha256, size} straight from
//                        /api/update.json — the SAME manifest OTA units trust,
//                        so this endpoint can never advertise a stale version.
//
// Anonymity: no IP read, no IP stored (house rule; see firmware-demand.js).
// Inert until redemption-schema.sql is applied to the haven_builds D1 and
// codes are issued — until then every lookup 404s harmlessly.

import { parseCode } from "../_lib/code-scheme.js";
import { evaluateRedemption } from "../_lib/redeem-logic.js";

function json(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
}

export function onRequestOptions() {
    return json({ ok: true });
}

export async function onRequestPost(context) {
    const { request, env } = context;

    let body;
    try {
        body = await request.json();
    } catch {
        return json({ ok: false, error: "Invalid request body." }, 400);
    }
    const code = typeof body.code === "string" ? body.code.slice(0, 32) : "";

    const parse = parseCode(code);

    let row = null;
    if (parse.valid) {
        try {
            row = await env.haven_builds
                .prepare(
                    "SELECT code, flavor, first_redeemed_at, redeem_count " +
                    "FROM redemption_codes WHERE code = ?1"
                )
                .bind(parse.body)
                .first();
        } catch {
            // Table not applied yet (staged endpoint) — treat as unknown code.
            row = null;
        }
    }

    let firmware = null;
    if (parse.valid && row) {
        try {
            const res = await env.ASSETS.fetch(new URL("/api/update.json", request.url));
            firmware = (await res.json()).firmware;
        } catch {
            firmware = null; // falls out as not_yet_available, which is honest
        }
    }

    const verdict = evaluateRedemption({ parse, row, firmware, nowMs: Date.now() });

    if (verdict.status === "ok") {
        try {
            await env.haven_builds
                .prepare(
                    "UPDATE redemption_codes SET " +
                    "first_redeemed_at = COALESCE(first_redeemed_at, ?1), " +
                    "redeem_count = redeem_count + 1, last_redeemed_at = ?1 " +
                    "WHERE code = ?2"
                )
                .bind(new Date().toISOString().replace("T", " ").slice(0, 19), parse.body)
                .run();
        } catch {
            // Accounting failure must not block a valid customer download.
        }
    }

    const { http, ...payload } = verdict;
    return json({ ok: verdict.status === "ok", ...payload }, http);
}
