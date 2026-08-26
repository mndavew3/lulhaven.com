// GET /api/yt-catalog -- live view of the item -> YouTube-channel catalog,
// read straight from haven-yt-catalog D1 (kept current by the separate
// haven-yt-catalog-refresh Worker, no local machine involved).
//
// Same JSON shape the old static yt-catalog.json used, so any existing
// consumer just points at this URL instead:
//   { "version": <unix ts of newest row>, "items": { "<item_id>": ["UC...", ...] } }

export async function onRequestGet({ env }) {
  const db = env.haven_yt_catalog;

  const rows = await db.prepare(
    `SELECT item_id, channel_id FROM yt_channels ORDER BY item_id, sort_order`
  ).all();

  const items = {};
  for (const row of rows.results || []) {
    const key = String(row.item_id);
    (items[key] = items[key] || []).push(row.channel_id);
  }

  const latest = await db.prepare(
    `SELECT strftime('%s', MAX(verified_datetime)) AS ts FROM yt_channels`
  ).first();

  const body = JSON.stringify({ version: parseInt(latest?.ts || '0', 10), items });
  return new Response(body, {
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, max-age=3600',
    },
  });
}
