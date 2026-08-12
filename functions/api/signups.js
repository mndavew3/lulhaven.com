// /api/signups — auth-gated (middleware handles auth check)
// GET              → JSON { count, confirmed, unconfirmed, unsubscribed, signups: [...] }
// GET ?format=csv  → CSV file download

function json(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

function rowStatus(r) {
    if (r.unsubscribed_at) return "unsubscribed";
    if (r.confirmed_at)    return "confirmed";
    return "pending";
}

export async function onRequestGet(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const format = url.searchParams.get("format");

    let rows;
    try {
        const result = await env.haven_builds
            .prepare(
                `SELECT id, email, signed_up_at, source_ip, source,
                        confirmed_at, confirmation_sent_at, unsubscribed_at,
                        last_email_sent_at
                   FROM launch_signups
                  ORDER BY signed_up_at DESC`
            )
            .all();
        rows = result.results;
    } catch (err) {
        console.error("signups fetch error:", err);
        return json({ ok: false, error: "Database error." }, 500);
    }

    // Attach a derived status so the UI doesn't have to recompute
    rows.forEach(r => { r.status = rowStatus(r); });

    if (format === "csv") {
        // Quote-double every field, and prefix a single quote on anything Excel/Sheets
        // would otherwise evaluate as a formula -- the email field is user-supplied and
        // the signup regex allows a leading =, +, -, @ and embedded double quotes.
        const cell = (v) => {
            let s = v == null ? "" : String(v);
            if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
            return `"${s.replace(/"/g, '""')}"`;
        };
        const lines = [
            "id,email,signed_up_at,source_ip,source,status,confirmed_at,unsubscribed_at"
        ];
        for (const r of rows) {
            lines.push([r.id, r.email, r.signed_up_at, r.source_ip, r.source,
                        r.status, r.confirmed_at, r.unsubscribed_at].map(cell).join(","));
        }
        return new Response(lines.join("\r\n"), {
            status: 200,
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": 'attachment; filename="launch_signups.csv"',
            },
        });
    }

    const confirmed   = rows.filter(r => r.status === "confirmed").length;
    const pending     = rows.filter(r => r.status === "pending").length;
    const unsubscribed = rows.filter(r => r.status === "unsubscribed").length;

    return json({
        count: rows.length,
        confirmed,
        pending,
        unsubscribed,
        signups: rows,
    });
}
