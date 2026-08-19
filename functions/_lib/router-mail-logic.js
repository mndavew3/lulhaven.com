// _lib/router-mail-logic.js — pure, testable decisions for the router-mail
// relay (task_ladder #147). Kept separate from the endpoint so the allowlist
// and validation can be unit-tested without a Workers runtime, mirroring the
// offnet-claim-logic / redeem-logic split.
//
// Trust posture: a router asks the relay to send a transactional message to
// the owner's address on file. Email NOTIFIES only — it never holds the only
// key to anything (the offline display/LAN path does). So this layer is
// deliberately strict about WHAT may be sent (a fixed event allowlist), caps
// content size, and strips control characters, so a compromised or buggy
// router cannot turn the relay into an open mailer.

// The only events a router may ask the relay to send. Anything else is refused.
export const EVENT_TYPES = Object.freeze({
    factory_reset: "Haven factory reset",
    recovery:      "Haven account recovery",
    owner_alert:   "Haven alert",
    unlock_code:   "Haven unlock code",
});

export const LIMITS = Object.freeze({ subject: 200, body: 4000 });

// Strip ASCII/Unicode control chars (except the newline/tab we keep in body).
const stripCtl = (s, keepNl) =>
    String(s).replace(keepNl ? /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g : /[\x00-\x1F\x7F]/g, "");

// A pragmatic email check — we are not the address's owner, the provider is the
// real validator; this only rejects the obviously-bogus so we fail fast.
export const isEmail = (s) =>
    typeof s === "string" && s.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

// Validate + normalize a router mail request. Returns {ok, error} or
// {ok:true, clean:{to,subject,body,event_type}}.
export function validateMail(req) {
    if (!req || typeof req !== "object") return { ok: false, error: "bad_body" };
    const { to, subject, body, event_type } = req;
    if (!EVENT_TYPES[event_type]) return { ok: false, error: "bad_event_type" };
    if (!isEmail(to)) return { ok: false, error: "bad_recipient" };
    if (typeof subject !== "string" || !subject.trim()) return { ok: false, error: "bad_subject" };
    if (typeof body !== "string" || !body.trim()) return { ok: false, error: "bad_body" };
    const cleanSubject = stripCtl(subject, false).slice(0, LIMITS.subject).trim();
    const cleanBody = stripCtl(body, true).slice(0, LIMITS.body).trim();
    if (!cleanSubject || !cleanBody) return { ok: false, error: "empty_after_clean" };
    return { ok: true, clean: { to, subject: cleanSubject, body: cleanBody, event_type } };
}

// SHA-256 hex of the recipient — the audit log stores this, never the address
// itself (content-minimal per the trust caveat). Uses Web Crypto (Workers) with
// a Node fallback so the unit test can call it too.
export async function hashRecipient(to) {
    const bytes = new TextEncoder().encode(String(to).toLowerCase());
    const g = (typeof globalThis !== "undefined" ? globalThis : {});
    if (g.crypto && g.crypto.subtle) {
        const d = await g.crypto.subtle.digest("SHA-256", bytes);
        return [...new Uint8Array(d)].map(b => b.toString(16).padStart(2, "0")).join("");
    }
    const { createHash } = await import("node:crypto");
    return createHash("sha256").update(Buffer.from(bytes)).digest("hex");
}
