// /api/visit — KYC pageview beacon endpoint
// POST { path, referrer?, session?, is_owner? }  -> records one pageview row
//
// All visits land here, including the owner's (tagged is_owner=1). Filter at
// query time, not at write time, so we can always look at the full ledger.

const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

function noContent() {
  return new Response(null, { status: 204, headers: CORS });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS }
  });
}

function classifyUA(ua) {
  if (!ua) return "unknown";
  var s = ua.toLowerCase();
  if (/bot|crawler|spider|crawling|preview|monitor|curl|wget|python-requests|httpclient|java\//.test(s)) return "bot";
  if (/mobile|android|iphone|ipad|ipod/.test(s)) return "mobile";
  return "desktop";
}

async function sha256hex16(input) {
  const buf = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  const arr = Array.from(new Uint8Array(hash));
  return arr.map(b => b.toString(16).padStart(2, "0")).join("").slice(0, 16);
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  let body;
  try { body = await request.json(); }
  catch { return json({ error: "invalid JSON" }, 400); }

  const cf = request.cf || {};
  const ua = request.headers.get("User-Agent") || "";
  const ip = request.headers.get("CF-Connecting-IP") || "";

  const today = new Date().toISOString().slice(0, 10);
  const visitorHash = await sha256hex16(ip + "|" + ua + "|" + today);

  await env.haven_builds.prepare(
    `INSERT INTO kyc_pageview
       (visit_date, path, referrer, country, region, city, timezone,
        asn, as_org, ua_class, visitor_hash, session_id, visitor_id, is_owner)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
  ).bind(
    today,
    (body.path || "/").slice(0, 256),
    (body.referrer || null) && String(body.referrer).slice(0, 512),
    cf.country || null,
    cf.region  || null,
    cf.city    || null,
    cf.timezone || null,
    cf.asn ? Number(cf.asn) : null,
    cf.asOrganization || null,
    classifyUA(ua),
    visitorHash,
    body.session    ? String(body.session).slice(0, 64)    : null,
    body.visitor_id ? String(body.visitor_id).slice(0, 64) : null,
    body.is_owner ? 1 : 0
  ).run();

  return noContent();
}
