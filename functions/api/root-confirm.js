// POST /api/root-confirm — a router confirms it applied a new root password
// (see entitlement-check.js's new_root_password field and
// USER_CREDENTIAL_STRATEGY.md section 2). Public, unit-facing, same trust
// model as entitlement-check.js and update-status.js — the caller proves it
// really got the password by echoing back the exact date it applied.
//
// Idempotent / self-healing: if this call never arrives (network drop, power
// loss), status simply stays 'pending' and entitlement-check.js keeps
// handing out the same password every check-in until a confirm lands.

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...CORS } });
const isSerial = (s) => typeof s === "string" && /^[A-Za-z0-9-]{6,64}$/.test(s);
const isDate = (d) => typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d);

export async function onRequestOptions() { return new Response(null, { status: 204, headers: CORS }); }

export async function onRequestPost({ request, env }) {
    let body; try { body = await request.json(); } catch { return json({ ok: false, error: "invalid body" }, 400); }

    const serial = (body.serial || "").trim();
    const appliedDate = (body.password_date || "").trim();
    if (!isSerial(serial)) return json({ ok: false, error: "bad serial" }, 400);
    if (!isDate(appliedDate)) return json({ ok: false, error: "bad password_date" }, 400);

    const db = env.haven_builds;
    const row = await db.prepare("SELECT password_date, status FROM root_creds WHERE serial = ?").bind(serial).first();
    if (!row) return json({ ok: false, error: "unknown serial" }, 404);

    // Only advance if this confirms the CURRENT target — a late confirm from
    // a superseded rotation must not clobber a newer one already in flight.
    if (row.status === "pending" && row.password_date === appliedDate) {
        await db.prepare(
            "UPDATE root_creds SET status = 'updated', prior_password_date = password_date, modified_datetime = datetime('now') WHERE serial = ?"
        ).bind(serial).run();
        return json({ ok: true, status: "updated" });
    }

    // Already updated, pre-haven, or a stale/mismatched date — nothing to do,
    // but not an error: the router did its job, this just wasn't the newest ask.
    return json({ ok: true, status: row.status, note: "no change (not the current pending date)" });
}
