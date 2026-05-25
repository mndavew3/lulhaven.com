// /api/feature-vote — public
// POST { audience: "family" | "privacy" }  -> records one vote
// GET                                       -> returns { family: N, privacy: M }
//
// Telemetry for "which sort order should default" on features.html. The page
// gates client-side via localStorage to a single vote per visitor; this
// endpoint is just the durable counter behind that gate.

const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS }
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

  const audience = body && body.audience;
  if (audience !== "family" && audience !== "privacy") {
    return json({ error: "audience must be 'family' or 'privacy'" }, 400);
  }

  const country = request.headers.get("CF-IPCountry") || null;
  const ua = (request.headers.get("User-Agent") || "").slice(0, 256);

  await env.haven_builds.prepare(
    `INSERT INTO feature_sort_votes (audience, country, user_agent) VALUES (?, ?, ?)`
  ).bind(audience, country, ua).run();

  return json({ ok: true });
}

export async function onRequestGet(context) {
  const { env } = context;
  const result = await env.haven_builds.prepare(
    `SELECT audience, COUNT(*) AS count FROM feature_sort_votes GROUP BY audience`
  ).all();
  const counts = { family: 0, privacy: 0 };
  for (const row of result.results || []) counts[row.audience] = row.count;
  return json(counts);
}
