// /api/redeem — turn a Haven download code into the current image for its
// flavor (challenge #71b, task_ladder #113; realigned to design A, Dave
// 2026-09-07: the code is a data carrier, not an entitlement — no issuance
// table, no counts, no window; see _lib/redeem-logic.js header).
//
// POST {code} ->
//   bad checksum      -> friendly "mistyped?" — nothing else consulted
//   valid, no image   -> "code is good, image not published yet"
//   valid, current    -> {version, url, sha256, size} straight from
//                        /api/update.json — the SAME manifest OTA units trust,
//                        so this endpoint can never advertise a stale version.
//
// Anonymity: no IP read, no IP stored (house rule; see firmware-demand.js).
// Stateless by design — nothing is looked up and nothing is recorded.

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

    let firmware = null;
    if (parse.valid) {
        try {
            const res = await env.ASSETS.fetch(new URL("/api/update.json", request.url));
            firmware = (await res.json()).firmware;
        } catch {
            firmware = null; // falls out as not_yet_available, which is honest
        }
    }

    const verdict = evaluateRedemption({ parse, firmware });

    const { http, ...payload } = verdict;
    return json({ ok: verdict.status === "ok", ...payload }, http);
}
