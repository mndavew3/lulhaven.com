// GET /wiki/auth/me — return current user from session cookie (used by UI on load)

import { sessionUser, json } from "../../_lib/wiki.js";

export async function onRequestGet(context) {
    const { request, env } = context;
    const user = await sessionUser(request, env.haven_wiki);
    if (!user) return json({ ok: false }, 401);
    return json({ ok: true, display_name: user.display_name, role: user.role });
}
