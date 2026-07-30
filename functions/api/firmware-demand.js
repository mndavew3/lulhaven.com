// /api/firmware-demand — anonymous firmware-demand log (challenge #73).
//
// haven-detect POSTs the model of an UNSUPPORTED router here, and only when the
// user has clicked "send this to Haven". We record the model so we can plan
// which firmware to build next.
//
// ANONYMITY IS ENFORCED HERE, not just promised in copy: we never read
// CF-Connecting-IP and never write it. The table has no ip column. The coarsest
// thing we keep is the CF country (request.cf.country), because demand is
// regional; a two-letter country over a population of reporters is not
// identifying. If you are reading this to confirm the word "anonymous" on the
// page is honest — it is: there is no per-request identifier stored anywhere in
// this path.
//
// Schema: challenge-demand-schema.sql (table firmware_demand on haven-builds).

function json(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            "Content-Type": "application/json",
            // the utility runs from a downloaded page / native tool, not our origin
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
}

function clean(v, max) {
    if (typeof v !== "string") return null;
    // strip C0 control chars, then trim + cap (mirrors finding.js clean())
    const s = v.replace(/[\x00-\x1f]/g, "").trim().slice(0, max);
    return s || null;
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

    const model = clean(body.model, 120);
    if (!model) {
        // Nothing to record without a model; not an error worth alarming over.
        return json({ ok: false, error: "No model to record." }, 400);
    }

    const vendor  = clean(body.vendor, 120);
    let verdict   = clean(body.detect_verdict, 40);
    if (verdict && !["unsupported", "below_floor", "unknown"].includes(verdict)) {
        verdict = "unknown";
    }
    const version = clean(body.detect_version, 40);

    // Coarse region ONLY. request.cf.country is derived by the edge; we never
    // touch CF-Connecting-IP.
    const country = (request.cf && request.cf.country) || null;

    try {
        await env.haven_builds
            .prepare(
                `INSERT INTO firmware_demand
                    (vendor, model, detect_verdict, country, detect_version, consented, created_datetime)
                 VALUES (?, ?, ?, ?, ?, 1, datetime('now'))`
            )
            .bind(vendor, model, verdict, country, version)
            .run();
    } catch (err) {
        console.error("firmware-demand insert error:", err);
        return json({ ok: false, error: "Could not record right now." }, 500);
    }

    return json({ ok: true });
}
