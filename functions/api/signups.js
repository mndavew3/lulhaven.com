// /api/signups — auth-gated (middleware handles auth check)
// GET              → JSON  { count, signups: [{id, email, signed_up_at, source_ip}] }
// GET ?format=csv  → CSV file download

function json(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

export async function onRequestGet(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const format = url.searchParams.get("format");

    let rows;
    try {
        const result = await env.haven_builds
            .prepare(
                `SELECT id, email, signed_up_at, source_ip, source
                   FROM launch_signups
                  ORDER BY signed_up_at DESC`
            )
            .all();
        rows = result.results;
    } catch (err) {
        console.error("signups fetch error:", err);
        return json({ ok: false, error: "Database error." }, 500);
    }

    if (format === "csv") {
        const lines = ["id,email,signed_up_at,source_ip,source"];
        for (const r of rows) {
            const ip  = r.source_ip || "";
            const src = (r.source || "").replace(/"/g, '""');
            lines.push(`${r.id},"${r.email}","${r.signed_up_at}","${ip}","${src}"`);
        }
        return new Response(lines.join("\r\n"), {
            status: 200,
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": 'attachment; filename="launch_signups.csv"',
            },
        });
    }

    return json({ count: rows.length, signups: rows });
}
