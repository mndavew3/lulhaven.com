// _lib/email.js — shared email-sending helpers.
//
// Sender of choice: Resend (https://resend.com). Picked for cleanest Workers
// integration (single fetch to api.resend.com, no SDK needed) and a free tier
// (100/day + 3000/month) that comfortably covers our pre-launch list.
//
// Config (Cloudflare Pages env vars / secrets):
//   RESEND_API_KEY          — secret. If unset, sendEmail() returns
//                             { ok: false, skipped: true } and logs a warning.
//                             Callers should NOT treat this as a hard error.
//   EMAIL_FROM              — defaults to "Haven <hello@lulhaven.com>".
//                             Override via env if domain isn't verified yet.
//   PUBLIC_BASE_URL         — defaults to https://lulhaven.com.
//                             Used to build confirm/unsubscribe links.
//
// Setup checklist for Dave when ready to actually send:
//   1. Sign up at resend.com (free tier)
//   2. Add lulhaven.com as a verified domain → Resend will give you the
//      SPF + DKIM + DMARC DNS records to add to Cloudflare DNS
//   3. Create API key, scope to "send"
//   4. Set Cloudflare Pages env secret:
//        cd ~/haven/website
//        npx wrangler pages secret put RESEND_API_KEY
//      (paste the key when prompted)
//   5. Set DOUBLE_OPT_IN_ENABLED=true env var in Cloudflare Pages UI
//      (or via wrangler pages deployment env)
//   6. Test by submitting the homepage form and clicking the confirm link

export async function sendEmail({ env, to, subject, html, text, replyTo }) {
    const apiKey = env.RESEND_API_KEY;
    if (!apiKey) {
        console.warn("[email] RESEND_API_KEY not set — skipping send to", to);
        return { ok: false, skipped: true, reason: "no-api-key" };
    }

    const from = env.EMAIL_FROM || "Haven <hello@lulhaven.com>";
    const body = { from, to: Array.isArray(to) ? to : [to], subject, html };
    if (text)    body.text    = text;
    if (replyTo) body.reply_to = replyTo;

    try {
        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type":  "application/json",
            },
            body: JSON.stringify(body),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            console.error("[email] resend send failed", res.status, data);
            return { ok: false, status: res.status, error: data };
        }
        return { ok: true, id: data.id };
    } catch (err) {
        console.error("[email] resend send exception", err);
        return { ok: false, error: String(err) };
    }
}

// Cloudflare Workers provide crypto.randomUUID() — use it.
export function newToken() {
    return crypto.randomUUID();
}

export function baseUrl(env) {
    return env.PUBLIC_BASE_URL || "https://lulhaven.com";
}

// Templated confirmation email. Intentionally plain so it survives the spam
// filters that hate flashy newsletter HTML.
export function confirmEmailTemplate({ confirmUrl }) {
    const subject = "Confirm your Haven launch notification";
    const text = [
        "Thanks for signing up to be notified when Haven launches on Indiegogo.",
        "",
        "Please confirm by clicking this link (or pasting it into your browser):",
        "",
        confirmUrl,
        "",
        "This link expires in 7 days. If you didn't sign up for this list, just",
        "ignore this email — your address won't be added.",
        "",
        "— The Haven team",
        "  https://lulhaven.com",
    ].join("\n");

    const html = `<!DOCTYPE html>
<html><body style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; color:#222; max-width:520px; margin:24px auto; padding:0 16px; line-height:1.5;">
  <h2 style="color:#1a237e; margin-bottom:8px;">Confirm your Haven launch notification</h2>
  <p>Thanks for signing up to be notified when Haven launches on Indiegogo.</p>
  <p>Please confirm by clicking the button below:</p>
  <p style="margin: 24px 0;">
    <a href="${confirmUrl}" style="display:inline-block; padding:12px 24px; background:#e53935; color:#fff; text-decoration:none; border-radius:6px; font-weight:600;">Confirm my signup</a>
  </p>
  <p style="font-size:0.9em; color:#666;">Or paste this link into your browser:<br><a href="${confirmUrl}">${confirmUrl}</a></p>
  <p style="font-size:0.9em; color:#666;">This link expires in 7 days. If you didn't sign up for this list, just ignore this email — your address won't be added.</p>
  <hr style="border:0; border-top:1px solid #eee; margin:24px 0;">
  <p style="font-size:0.85em; color:#888;">— The Haven team · <a href="https://lulhaven.com" style="color:#1a237e;">lulhaven.com</a></p>
</body></html>`;

    return { subject, text, html };
}
