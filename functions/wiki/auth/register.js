// POST /wiki/auth/register
// Body: { email, password, display_name }

import { hashPassword, randomToken, sessionCookie, json, err, now } from "../../_lib/wiki.js";

const SESSION_LIFE_DAYS = 30;

export async function onRequestPost(context) {
    const { request, env } = context;
    const db = env.haven_wiki;

    let body;
    try { body = await request.json(); } catch { return err("Invalid JSON"); }

    const { email, password, display_name } = body;
    if (!email || !password || !display_name) return err("email, password, display_name required");
    if (password.length < 8) return err("Password must be at least 8 characters");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return err("Invalid email");

    const existing = await db.prepare("SELECT id FROM wiki_users WHERE email = ?1").bind(email.toLowerCase()).first();
    if (existing) return err("Email already registered", 409);

    const hash = await hashPassword(password);
    const ts = now();
    const result = await db.prepare(
        "INSERT INTO wiki_users (email, password_hash, display_name, role, verified, created_datetime) " +
        "VALUES (?1, ?2, ?3, 'editor', 1, ?4)"
    ).bind(email.toLowerCase(), hash, display_name.trim(), ts).run();

    const userId = result.meta.last_row_id;
    const token = randomToken();
    const expires = new Date(Date.now() + SESSION_LIFE_DAYS * 86400 * 1000).toISOString();
    await db.prepare(
        "INSERT INTO wiki_sessions (token, user_id, expires_datetime, created_datetime) VALUES (?1, ?2, ?3, ?4)"
    ).bind(token, userId, expires, ts).run();

    return json({ ok: true, display_name: display_name.trim() }, 201, {
        "Set-Cookie": sessionCookie(token)
    });
}
