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

  // Unsupported model -> record demand so we can decide what firmware to build next.
  if (!supported) {
    try { await db.prepare(
      `INSERT INTO haven_model_demand (board_name, count, last_datetime) VALUES (?, 1, datetime('now'))
       ON CONFLICT(board_name) DO UPDATE SET count = count + 1, last_datetime = datetime('now')`
    ).bind(board).run(); } catch {}
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
