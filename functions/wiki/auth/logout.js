// POST /wiki/auth/logout

import { getCookie, sessionCookie, WIKI_SESSION_COOKIE, json } from "../../_lib/wiki.js";

export async function onRequestPost(context) {
    const { request, env } = context;
    const token = getCookie(request, WIKI_SESSION_COOKIE);
    if (token) {
        await env.haven_wiki.prepare("DELETE FROM wiki_sessions WHERE token = ?1").bind(token).run();
    }
    return json({ ok: true }, 200, { "Set-Cookie": sessionCookie("", 0) });
}
