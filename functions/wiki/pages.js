// GET /wiki/pages?ns=<namespace>&limit=<n>
// Returns page list for home view and sidebar. No auth required.

import { json } from "../_lib/wiki.js";

export async function onRequestGet(context) {
    const { request, env } = context;
    const db = env.haven_wiki;
    const url = new URL(request.url);
    const ns    = url.searchParams.get("ns")    || null;
    // Guard a non-numeric ?limit — parseInt("abc") is NaN, which would
    // interpolate "LIMIT NaN" into the SQL below and 500 (bug-hunt wf_cc76eaba-c0b).
    const limitRaw = parseInt(url.searchParams.get("limit") || "100", 10);
    const limit = Math.min(Number.isFinite(limitRaw) && limitRaw > 0 ? limitRaw : 100, 200);

    const nsClause = ns ? "WHERE namespace = ?1" : "";
    const stmt = ns
        ? db.prepare(`SELECT slug, namespace, title, modified_datetime FROM wiki_pages ${nsClause} ORDER BY modified_datetime DESC LIMIT ${limit}`).bind(ns)
        : db.prepare(`SELECT slug, namespace, title, modified_datetime FROM wiki_pages ORDER BY modified_datetime DESC LIMIT ${limit}`);

    const { results } = await stmt.all();

    // For sidebar: also return recent 6 across all namespaces when ns filter is set
    let all = [];
    if (ns) {
        const r2 = await db.prepare("SELECT slug, namespace, title, modified_datetime FROM wiki_pages ORDER BY modified_datetime DESC LIMIT 6").all();
        all = r2.results;
    }

    return json({ ok: true, pages: results, all });
}
