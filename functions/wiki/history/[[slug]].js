// GET /wiki/history/<slug>  — revision list for a page (public)
// GET /wiki/history/<slug>?rev=N  — fetch a specific revision body

import { json, err } from "../../_lib/wiki.js";

function slugFromParams(params) {
    const raw = params.slug;
    if (Array.isArray(raw)) return raw.join("/");
    return raw || "";
}

export async function onRequestGet(context) {
    const { request, params, env } = context;
    const db = env.haven_wiki;
    const slug = slugFromParams(params);
    if (!slug) return err("slug required", 400);

    const url = new URL(request.url);
    const rev = url.searchParams.get("rev");

    if (rev) {
        const row = await db.prepare(
            "SELECT r.revision, r.title, r.body, r.summary, r.created_datetime, u.display_name " +
            "FROM wiki_revisions r LEFT JOIN wiki_users u ON u.id = r.author_id " +
            "WHERE r.slug = ?1 AND r.revision = ?2"
        ).bind(slug, parseInt(rev, 10)).first();
        if (!row) return err("Revision not found", 404);
        return json({ ok: true, slug, ...row });
    }

    const { results } = await db.prepare(
        "SELECT r.revision, r.title, r.summary, r.created_datetime, u.display_name " +
        "FROM wiki_revisions r LEFT JOIN wiki_users u ON u.id = r.author_id " +
        "WHERE r.slug = ?1 ORDER BY r.revision DESC LIMIT 50"
    ).bind(slug).all();

    return json({ ok: true, slug, revisions: results });
}
