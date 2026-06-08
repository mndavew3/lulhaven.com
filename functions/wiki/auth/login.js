// POST /wiki/auth/login
// Body: { email, password }

import { verifyPassword, randomToken, sessionCookie, json, err, now, SESSION_LIFE_DAYS } from "../../_lib/wiki.js";

export async function onRequestPost(context) {
    const { request, env } = context;
    const db = env.haven_wiki;

    let body;
    try { body = await request.json(); } catch { return err("Invalid JSON"); }

    const { email, password } = body;
    if (!email || !password) return err("email and password required");

    const user = await db.prepare(
        "SELECT id, password_hash, display_name, role FROM wiki_users WHERE email = ?1"
    ).bind(email.toLowerCase()).first();

    // Always run verifyPassword even on miss to avoid timing oracle
    const hash = user ? user.password_hash : "pbkdf2:0000:0000";
    const ok = await verifyPassword(password, hash);
    if (!user || !ok) return err("Invalid email or password", 401);

    const token = randomToken();
    const ts = now();
    const expires = new Date(Date.now() + SESSION_LIFE_DAYS * 86400 * 1000).toISOString();
    await db.prepare(
        "INSERT INTO wiki_sessions (token, user_id, expires_datetime, created_datetime) VALUES (?1, ?2, ?3, ?4)"
    ).bind(token, user.id, expires, ts).run();
    await db.prepare("UPDATE wiki_users SET last_login_datetime = ?1 WHERE id = ?2").bind(ts, user.id).run();

    return json({ ok: true, display_name: user.display_name, role: user.role }, 200, {
        "Set-Cookie": sessionCookie(token)
    });
}
