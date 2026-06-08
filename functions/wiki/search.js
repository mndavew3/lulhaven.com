// GET /wiki/search?q=<query>&ns=<namespace>
// Full-text search via FTS5. Returns slug, title, snippet.

import { json, err } from "../_lib/wiki.js";

export async function onRequestGet(context) {
    const { request, env } = context;
    const db = env.haven_wiki;
    const url = new URL(request.url);
    const q = (url.searchParams.get("q") || "").trim();
    const ns = url.searchParams.get("ns") || null;

    if (!q) return err("q required", 400);
    if (q.length < 2) return err("Query too short", 400);

    // Sanitize FTS query — strip characters that break FTS5 syntax
    const safe = q.replace(/[^a-zA-Z0-9 \-_]/g, " ").trim();
    if (!safe) return err("Query contains no searchable terms", 400);

    const nsClause = ns ? "AND p.namespace = ?2" : "";
    const bindings = ns
        ? db.prepare(
            `SELECT p.slug, p.namespace, p.title, snippet(wiki_pages_fts, 2, '<mark>', '</mark>', '…', 20) AS snippet
             FROM wiki_pages_fts f JOIN wiki_pages p ON p.rowid = f.rowid
             WHERE wiki_pages_fts MATCH ?1 ${nsClause} ORDER BY rank LIMIT 20`
          ).bind(safe + "*", ns)
        : db.prepare(
            `SELECT p.slug, p.namespace, p.title, snippet(wiki_pages_fts, 2, '<mark>', '</mark>', '…', 20) AS snippet
             FROM wiki_pages_fts f JOIN wiki_pages p ON p.rowid = f.rowid
             WHERE wiki_pages_fts MATCH ?1 ORDER BY rank LIMIT 20`
          ).bind(safe + "*");

    const { results } = await bindings.all();
    return json({ ok: true, q, results });
}
