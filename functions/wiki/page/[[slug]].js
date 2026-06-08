// GET  /wiki/page/<slug>  — read page (public)
// POST /wiki/page/<slug>  — create or update page (auth required)
//
// Slug encodes namespace: "haven/schedule", "community/dns-tips", etc.
// haven/* namespace is admin-only for writes.

import { sessionUser, renderMarkdown, json, err, now } from "../../_lib/wiki.js";

function slugFromParams(params) {
    // Cloudflare passes catch-all as params.slug (array or string)
    const raw = params.slug;
    if (Array.isArray(raw)) return raw.join("/");
    return raw || "";
}

function namespace(slug) {
    return slug.split("/")[0] || "community";
}

// --- GET ---
export async function onRequestGet(context) {
    const { params, env } = context;
    const db = env.haven_wiki;
    const slug = slugFromParams(params);
    if (!slug) return err("slug required", 400);

    const page = await db.prepare(
        "SELECT slug, namespace, title, body, revision, created_datetime, modified_datetime FROM wiki_pages WHERE slug = ?1"
    ).bind(slug).first();

    if (!page) return err("Page not found", 404);

    const html = renderMarkdown(page.body);
    return json({ ok: true, slug: page.slug, namespace: page.namespace,
        title: page.title, body: page.body, html,
        revision: page.revision, created_datetime: page.created_datetime,
        modified_datetime: page.modified_datetime });
}

// --- POST ---
export async function onRequestPost(context) {
    const { request, params, env } = context;
    const db = env.haven_wiki;
    const slug = slugFromParams(params);
    if (!slug) return err("slug required", 400);

    const user = await sessionUser(request, db);
    if (!user) return err("Login required", 401);

    const ns = namespace(slug);
    if (ns === "haven" && user.role !== "admin") return err("Haven namespace is admin-only", 403);

    let body;
    try { body = await request.json(); } catch { return err("Invalid JSON"); }

    const { title, body: mdBody, summary = "" } = body;
    if (!title || mdBody === undefined) return err("title and body required");

    const ts = now();
    const existing = await db.prepare("SELECT revision FROM wiki_pages WHERE slug = ?1").bind(slug).first();
    const revision = existing ? existing.revision + 1 : 1;

    if (existing) {
        await db.prepare(
            "UPDATE wiki_pages SET title=?1, body=?2, author_id=?3, modified_datetime=?4, revision=?5 WHERE slug=?6"
        ).bind(title, mdBody, user.id, ts, revision, slug).run();
    } else {
        await db.prepare(
            "INSERT INTO wiki_pages (slug, namespace, title, body, author_id, created_datetime, modified_datetime, revision) " +
            "VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?6, 1)"
        ).bind(slug, ns, title, mdBody, user.id, ts).run();
    }

    // Archive revision
    await db.prepare(
        "INSERT INTO wiki_revisions (slug, revision, title, body, author_id, summary, created_datetime) " +
        "VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)"
    ).bind(slug, revision, title, mdBody, user.id, summary, ts).run();

    return json({ ok: true, slug, revision });
}
