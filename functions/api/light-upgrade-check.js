// POST /api/light-upgrade-check — Haven Light calls this the moment someone taps
// "Upgrade to full Haven", BEFORE anything else happens.
// Body (JSON): { board_name, unit_hash }
//   board_name = the router's OpenWrt board id (e.g. "glinet,gl-mt6000")
//   unit_hash  = a SALTED HASH of the factory MAC (per-unit anchor; never the raw MAC)
// Returns: { ok, supported, image?:{url,sha256,version}, registered }
//   supported=false -> no full-Haven firmware for this model yet: we tell the user, and
//                      LOG the model as a demand signal (what to build next).
//   registered=true -> this exact unit is already registered -> fast-track (skip register).
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", ...CORS } });

const RATE_WINDOW = 3600, RATE_MAX = 10;
// Cap how fast one IP can run up a model's demand counter — that counter drives
// "what firmware to build next", so an unauthenticated, unthrottled increment
// is a poisonable signal (bug-hunt wf_cc76eaba-c0b). Fails OPEN.
async function allowDemand(env, ip) {
  if (!ip) return true;
  const w = Math.floor(Date.now() / 1000 / RATE_WINDOW) * RATE_WINDOW;
  try {
    await env.haven_builds.prepare(
      `INSERT INTO challenge_rate (bucket,key,window_start,count) VALUES ('light-demand',?,?,1)
       ON CONFLICT(bucket,key,window_start) DO UPDATE SET count=count+1`).bind(ip, w).run();
    const r = await env.haven_builds.prepare(
      `SELECT count FROM challenge_rate WHERE bucket='light-demand' AND key=? AND window_start=?`).bind(ip, w).first();
    return !r || r.count <= RATE_MAX;
  } catch { return true; }
}

export async function onRequestOptions() { return new Response(null, { status: 204, headers: CORS }); }

export async function onRequestPost({ request, env }) {
  let b; try { b = await request.json(); } catch { return json({ error: "invalid request" }, 400); }
  const board = (b.board_name || "").trim().slice(0, 120);
  const unit = (b.unit_hash || "").trim().slice(0, 128);
  if (!board) return json({ error: "board_name is required" }, 400);

  const db = env.haven_builds;

  // Do we have a full-Haven image for this exact router model?
  let img = null;
  try { img = await db.prepare(
    "SELECT image_url, sha256, version, install_class FROM haven_images WHERE board_name=?"
  ).bind(board).first(); } catch { return json({ error: "server error" }, 500); }
  const supported = !!img;

  // Unsupported model -> record demand so we can decide what firmware to build
  // next. Throttle the increment per IP so the build-priority signal can't be
  // inflated by a script.
  if (!supported) {
    const ip = request.headers.get("CF-Connecting-IP") || "";
    if (await allowDemand(env, ip)) {
      try { await db.prepare(
        `INSERT INTO haven_model_demand (board_name, count, last_datetime) VALUES (?, 1, datetime('now'))
         ON CONFLICT(board_name) DO UPDATE SET count = count + 1, last_datetime = datetime('now')`
      ).bind(board).run(); } catch {}
    }
  }

  // Is this exact unit already registered (fast-track path)?
  let registered = false;
  if (unit) {
    try {
      const r = await db.prepare("SELECT 1 FROM haven_unit_registrations WHERE unit_hash=?").bind(unit).first();
      registered = !!r;
    } catch {}
  }

  const out = { ok: true, supported, registered };
  if (supported) out.image = { url: img.image_url, sha256: img.sha256, version: img.version, install_class: img.install_class };
  return json(out);
}
