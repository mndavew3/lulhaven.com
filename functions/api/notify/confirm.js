// /api/notify/confirm — public GET
// GET ?token=<uuid>  → marks the matching launch_signups row confirmed,
//                      returns a small HTML success/error page.
//
// The token was generated and emailed by /api/notify when DOUBLE_OPT_IN_ENABLED
// is on. Tokens expire 7 days after confirmation_sent_at (configurable via
// CONFIRM_TOKEN_TTL_HOURS env; default 168 = 7 days).
//
// Rendered as a plain HTML page (not JSON) because the user lands here from
// their email client and shouldn't see a JSON blob.

function htmlPage({ title, color, message, sub }) {
    return new Response(`<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${title} — Haven</title>
<style>
  body { font-family: -apple-system, Segoe UI, Roboto, sans-serif; background: #f5f7fb;
         color: #222; margin: 0; padding: 0; min-height: 100vh;
         display: flex; align-items: center; justify-content: center; }
  .card { background: #fff; max-width: 480px; margin: 24px; padding: 32px 32px 24px;
          border-radius: 8px; box-shadow: 0 2px 24px rgba(0,0,0,0.08); text-align: center; }
  h1 { color: ${color}; margin: 0 0 12px; font-size: 1.5em; }
  p  { color: #555; line-height: 1.5; margin: 8px 0; }
  a.btn { display: inline-block; margin-top: 20px; padding: 12px 24px;
          background: #1a237e; color: #fff; text-decoration: none; border-radius: 6px;
          font-weight: 600; }
  .small { color: #888; font-size: 0.9em; }
</style>
</head><body>
  <div class="card">
    <h1>${title}</h1>
    <p>${message}</p>
    ${sub ? `<p class="small">${sub}</p>` : ""}
    <a class="btn" href="https://lulhaven.com/">Back to lulhaven.com</a>
  </div>
</body></html>`, {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
    });
}

export async function onRequestGet(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const token = (url.searchParams.get("token") || "").trim();

    if (!token) {
        return htmlPage({
            title: "Invalid link", color: "#c62828",
            message: "This confirmation link is missing its token.",
            sub: "If you copied the URL from your email, double-check that nothing was truncated.",
        });
    }

    const ttlHours = parseInt(env.CONFIRM_TOKEN_TTL_HOURS || "168", 10);

    let row;
    try {
        row = await env.haven_builds
            .prepare(
                `SELECT id, email, confirmed_at, confirmation_sent_at, unsubscribed_at
                   FROM launch_signups
                  WHERE confirmation_token = ?`
            )
            .bind(token).first();
    } catch (err) {
        console.error("notify/confirm db error:", err);
        return htmlPage({
            title: "Something went wrong", color: "#c62828",
            message: "We couldn't process your confirmation right now. Please try again in a few minutes.",
        });
    }

    if (!row) {
        return htmlPage({
            title: "Link not recognized", color: "#c62828",
            message: "This confirmation link doesn't match any signup — it may have already been used, or the email was resent and a newer link replaced it.",
            sub: "If you're unsure, just submit the form on lulhaven.com again to get a fresh email.",
        });
    }

    if (row.unsubscribed_at) {
        return htmlPage({
            title: "You've unsubscribed", color: "#c62828",
            message: "This email was previously unsubscribed.",
            sub: "If you'd like back on the list, submit the form on lulhaven.com again.",
        });
    }

    if (row.confirmed_at) {
        return htmlPage({
            title: "Already confirmed ✓", color: "#2e7d32",
            message: "You're on the list. We'll email you the moment Haven launches.",
        });
    }

    // Expiry check
    const sentAt = row.confirmation_sent_at ? new Date(row.confirmation_sent_at + "Z").getTime() : 0;
    const ageMs  = Date.now() - sentAt;
    const maxMs  = ttlHours * 3600 * 1000;
    if (sentAt && ageMs > maxMs) {
        return htmlPage({
            title: "Link expired", color: "#c62828",
            message: `This confirmation link is older than ${ttlHours} hours.`,
            sub: "Submit the form on lulhaven.com again to get a fresh email.",
        });
    }

    try {
        await env.haven_builds
            .prepare(`UPDATE launch_signups SET confirmed_at = datetime('now') WHERE id = ?`)
            .bind(row.id).run();
    } catch (err) {
        console.error("notify/confirm update error:", err);
        return htmlPage({
            title: "Something went wrong", color: "#c62828",
            message: "We couldn't finalize your confirmation. Please try again.",
        });
    }

    return htmlPage({
        title: "Confirmed ✓", color: "#2e7d32",
        message: "You're on the list. We'll email you the moment Haven launches on Indiegogo.",
        sub: "Thanks — having early subscribers makes a real difference at launch.",
    });
}
