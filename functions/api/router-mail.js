// /api/router-mail — authenticated relay that lets a Haven router send a
// transactional email to the owner's address on file (task_ladder #147,
// decision 2A). Architecture: the router does NOT talk SMTP (residential-IP
// blacklists, credential hell); it posts here over the same authenticated
// router->lulhaven channel the off-network enrollment already uses, and the
// relay calls the transactional provider (Resend, via _lib/email.js).
//
// The router authenticates with its per-unit Ed25519 SIGNATURE (task_ladder
// #147 option B, 2026-08-25): headers X-Haven-Serial / X-Haven-Timestamp /
// X-Haven-Signature over "<serial>\n<ts>\n<sha256 of the exact body>\n". We
// hold only the public key (unit_identities), so nothing on our side can forge
// a router. Replaced the HMAC bearer, which required an ENROLL_SECRET no
// normal unit ever received -- measured on a provisioned 0.1.89 bench Olive.
//
// Trust posture (customer_caveats): relay email = data leaving the house, so
// only a fixed allowlist of owner-initiated / security events may be sent, the
// content is capped and control-stripped, and the audit log stores a HASH of
// the recipient, never the address or the body.
//
// Staged-inert on two independent gates, exactly like offnet-claim:
//   - RESEND_API_KEY unset  -> sendEmail() returns {skipped} and we log 'skipped'
//   - router-mail-schema.sql not yet applied to the haven_builds D1 -> the
//     INSERT throws and we degrade to sending without an audit row.
import { verifyRouterIdentity } from "../_lib/haven-identity.js";
import { validateMail, hashRecipient, EVENT_TYPES } from "../_lib/router-mail-logic.js";
import { sendEmail } from "../_lib/email.js";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, X-Haven-Serial, X-Haven-Timestamp, X-Haven-Signature" };
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...CORS } });
const isSerial = (s) => typeof s === "string" && /^[A-Za-z0-9-]{6,64}$/.test(s);
const nowIso = () => new Date().toISOString().replace("T", " ").slice(0, 19);

const RATE_MAX = 20;      // messages per serial per window
const RATE_WINDOW_MIN = 60;

export async function onRequestOptions() { return new Response(null, { status: 204, headers: CORS }); }

export async function onRequestPost({ request, env }) {
    // Raw text FIRST: the signature covers the exact bytes the router sent,
    // so we hash what arrived -- a re-serialized body would hash differently.
    let raw, body;
    try { raw = await request.text(); body = JSON.parse(raw); } catch { return json({ error: "bad_body" }, 400); }

    const ident = await verifyRouterIdentity(env, request, raw);
    if (!ident.ok) return json({ error: "unauthorized", reason: ident.reason }, 401);

    // The signed headers are the authority; the body's serial must agree, so a
    // payload can never be attributed to a unit that did not sign it.
    const serial = ident.serial;
    if (body.serial !== serial) return json({ error: "serial_mismatch" }, 400);

    const v = validateMail(body);
    if (!v.ok) return json({ error: v.error }, 400);
    const { to, subject, body: text, event_type } = v.clean;

    // Per-serial rate limit — count this serial's recent rows in the audit log.
    // Best-effort: if the table isn't there yet (staged-inert), skip the check.
    try {
        const since = `-${RATE_WINDOW_MIN} minutes`;
        const row = await env.haven_builds
            .prepare("SELECT COUNT(*) AS n FROM router_mail_log WHERE serial=? AND sent_at >= datetime('now', ?)")
            .bind(serial, since).first();
        if (row && row.n >= RATE_MAX) return json({ error: "rate_limited" }, 429);
    } catch { /* table absent -> staged-inert, don't block */ }

    const label = EVENT_TYPES[event_type];
    const html = `<p>${escapeHtml(text)}</p><hr><p style="color:#888;font-size:12px">${escapeHtml(label)} · sent by your Haven router</p>`;
    const result = await sendEmail({ env, to, subject, html, text });
    const status = result.skipped ? "skipped" : (result.ok ? "sent" : "failed");

    // Audit row: recipient HASHED, no body stored.
    try {
        const toHash = await hashRecipient(to);
        await env.haven_builds
            .prepare("INSERT INTO router_mail_log (serial, event_type, to_hash, status, sent_at) VALUES (?,?,?,?,?)")
            .bind(serial, event_type, toHash, status, nowIso()).run();
    } catch { /* audit table absent -> staged-inert */ }

    if (status === "failed") return json({ ok: false, status }, 502);
    return json({ ok: true, status });   // 'sent' or 'skipped' both 200
}

function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
