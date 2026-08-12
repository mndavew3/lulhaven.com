// POST /api/builds/root-creds-seed — bench-only. Called by haven-station's
// install-haven.sh (via lib/_d1.sh's d1_seed_root_creds) during a burn.
// Registers this serial's hidden-root-account row as already updated as of
// today, and returns the password the bench should set on the unit. Auth:
// gated by _middleware.js (build_maint_token cookie) via the /api/builds/
// prefix, same as every other build-maint route — this is an operator call
// from the bench, not something a router ever calls.
//
// See ~/haven/docs/USER_CREDENTIAL_STRATEGY.md section 2 and
// functions/_lib/root_creds.js.
import { deriveRootPassword, todayStr } from "../../_lib/root_creds.js";

const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json" } });
const isSerial = (s) => typeof s === "string" && /^[A-Za-z0-9-]{6,64}$/.test(s);

export async function onRequestPost({ request, env }) {
    let body; try { body = await request.json(); } catch { return json({ ok: false, error: "invalid body" }, 400); }

    const serial = (body.serial || "").trim();
    if (!isSerial(serial)) return json({ ok: false, error: "bad serial" }, 400);

    const key = env.ROOT_CREDS_KEY;
    if (!key) return json({ ok: false, error: "ROOT_CREDS_KEY not configured on server" }, 500);

    const db = env.haven_builds;

    // Structurally shouldn't happen (retail serials and Gold's H1-... serials
    // are different formats) but the cost of a defensive check here is a
    // couple of lines, and the cost of silently overwriting a real pre-haven
    // row would be Haven managing root on hardware it promised never to touch.
    const existing = await db.prepare("SELECT status FROM root_creds WHERE serial = ?").bind(serial).first();
    if (existing && existing.status === "pre-haven") {
        return json({ ok: false, error: "serial is marked pre-haven; refusing to seed a burn record" }, 409);
    }

    const today = todayStr();
    await db.prepare(
        "INSERT INTO root_creds (serial, password_date, prior_password_date, status, modified_datetime) " +
        "VALUES (?, ?, ?, 'updated', datetime('now')) " +
        "ON CONFLICT(serial) DO UPDATE SET " +
        "  prior_password_date = root_creds.password_date, " +
        "  password_date = excluded.password_date, " +
        "  status = 'updated', modified_datetime = datetime('now')"
    ).bind(serial, today, today).run();

    const password = await deriveRootPassword(serial, today, key);
    return json({ ok: true, serial, password_date: today, password });
}
