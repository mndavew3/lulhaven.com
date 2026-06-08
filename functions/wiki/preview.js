// POST /wiki/preview — render Markdown to HTML (used by editor preview tab)

import { renderMarkdown, json, err } from "../_lib/wiki.js";

export async function onRequestPost(context) {
    let body;
    try { body = await context.request.json(); } catch { return err("Invalid JSON"); }
    if (typeof body.body !== "string") return err("body required");
    return json({ ok: true, html: renderMarkdown(body.body) });
}
