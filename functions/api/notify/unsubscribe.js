// /api/notify/unsubscribe — public GET
// GET ?token=<uuid>  → marks the row unsubscribed (CAN-SPAM / GDPR compliance).
//
// Same token as confirmation. Once unsubscribed, the row stays in the table
// (so we don't re-add the same address if they submit again) but is excluded
// from any future blast. Admin UI shows the unsubscribed state distinctly.

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
            message: "This unsubscribe link is missing its token.",
        });
    }

    let row;
    try {
        row = await env.haven_builds
            .prepare(`SELECT id, email, unsubscribed_at FROM launch_signups WHERE confirmation_token = ?`)
            .bind(token).first();
    } catch (err) {
        console.error("notify/unsubscribe db error:", err);
        return htmlPage({
            title: "Something went wrong", color: "#c62828",
            message: "We couldn't process your unsubscribe right now. Please try again in a few minutes.",
        });
    }

    if (!row) {
        return htmlPage({
            title: "Link not recognized", color: "#c62828",
            message: "This unsubscribe link doesn't match any signup. You may already be unsubscribed.",
        });
    }

    if (row.unsubscribed_at) {
        return htmlPage({
            title: "Already unsubscribed", color: "#2e7d32",
            message: "This email has already been removed from the list.",
        });
    }

    try {
        await env.haven_builds
            .prepare(`UPDATE launch_signups SET unsubscribed_at = datetime('now') WHERE id = ?`)
            .bind(row.id).run();
    } catch (err) {
        console.error("notify/unsubscribe update error:", err);
        return htmlPage({
            title: "Something went wrong", color: "#c62828",
            message: "We couldn't finalize your unsubscribe. Please try again.",
        });
    }

    return htmlPage({
        title: "Unsubscribed ✓", color: "#2e7d32",
        message: "You've been removed from the launch notification list.",
        sub: "If this was a mistake, you can sign up again at any time.",
    });
}
