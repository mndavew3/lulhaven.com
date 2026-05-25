// /api/event — KYC event beacon endpoint
// POST { kind, value?, path?, session?, is_owner? }  -> records one event row
//
// Companion to /api/visit. Events are anything beyond a plain pageview:
// outbound clicks, form submits, milestone Details opens, etc. Joined to
// pageviews via session_id when present.

const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

function noContent() { return new Response(null, { status: 204, headers: CORS }); }
function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status, headers: { "Content-Type": "application/json", ...CORS }
  });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  let body;
  try { body = await request.json(); }
  catch { return json({ error: "invalid JSON" }, 400); }

  const kind = body && body.kind;
  if (!kind || typeof kind !== "string" || kind.length > 64) {
    return json({ error: "kind required (<=64 chars)" }, 400);
  }

  const today = new Date().toISOString().slice(0, 10);

  await env.haven_builds.prepare(
    `INSERT INTO kyc_event
       (occurred_date, session_id, visitor_id, event_kind, event_value, path, is_owner)
     VALUES (?,?,?,?,?,?,?)`
  ).bind(
    today,
    body.session    ? String(body.session).slice(0, 64)    : null,
    body.visitor_id ? String(body.visitor_id).slice(0, 64) : null,
    kind.slice(0, 64),
    body.value ? String(body.value).slice(0, 512) : null,
    body.path  ? String(body.path).slice(0, 256)  : null,
    body.is_owner ? 1 : 0
  ).run();

  return noContent();
}
