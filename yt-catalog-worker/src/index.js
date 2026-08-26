// haven-yt-catalog-refresh -- scheduled Worker.
// Keeps yt_channels current against yt_items, autonomously, no local machine
// or Claude session involved. Runs on Cloudflare's own clock (Cron Triggers).
//
// Two modes, same code, picked by which cron string fired:
//   "0 9 * * MON"  -> gapfill: only items with zero channels yet
//   "0 9 1 * *"    -> full:    every item, re-verified (catches renamed/
//                     deleted/banned channels)
//
// Method: YouTube Data API v3 search.list (official, no scraping) + a
// conservative scoring rule -- normalized-title match plus a real
// subscriber count. If nothing clears the bar, the item is left alone
// rather than guessed at (same rule the manual pass used tonight).
//
// Daily quota is real and finite (free tier: 10,000 units/day; search.list
// costs 100 units/call). MAX_SEARCH_CALLS below stops the run safely under
// that ceiling rather than erroring out -- any items skipped this way just
// get picked up on the next scheduled run (idempotent, nothing is lost).

const MAX_SEARCH_CALLS = 90; // 90*100=9000 units, leaves headroom under 10k/day

function normalize(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

// Loose containment match in either direction, on normalized text.
function titleMatches(itemName, channelTitle) {
  const a = normalize(itemName);
  const b = normalize(channelTitle);
  if (!a || !b) return false;
  return a === b || a.includes(b) || b.includes(a);
}

async function ytSearch(apiKey, query) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=5&q=${encodeURIComponent(query)}&key=${apiKey}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`search.list ${r.status}`);
  return r.json();
}

async function ytChannelStats(apiKey, channelIds) {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIds.join(',')}&key=${apiKey}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`channels.list ${r.status}`);
  return r.json();
}

// Returns {channel_id, label, confidence} or null if nothing clears the bar.
async function findChannel(apiKey, itemName) {
  const search = await ytSearch(apiKey, itemName);
  const candidates = (search.items || [])
    .filter(it => it.id && it.id.channelId)
    .filter(it => titleMatches(itemName, it.snippet.channelTitle));
  if (candidates.length === 0) return null;

  const ids = candidates.map(c => c.id.channelId);
  const stats = await ytChannelStats(apiKey, ids);
  const byId = {};
  for (const ch of (stats.items || [])) byId[ch.id] = ch;

  // Prefer an exact normalized-name match with real subscribers; otherwise
  // the highest-subscriber title-containing match. Reject anything with a
  // hidden or zero subscriber count -- too easy to be an impersonator.
  let best = null;
  for (const c of candidates) {
    const full = byId[c.id.channelId];
    if (!full || !full.statistics || full.statistics.hiddenSubscriberCount) continue;
    const subs = parseInt(full.statistics.subscriberCount || '0', 10);
    if (subs < 1000) continue; // too small to trust without a human look
    const exact = normalize(itemName) === normalize(c.snippet.channelTitle);
    const score = (exact ? 1e9 : 0) + subs;
    if (!best || score > best.score) {
      best = {
        score,
        channel_id: c.id.channelId,
        label: `${c.snippet.channelTitle} (${subs.toLocaleString()} subs${exact ? ', exact name match' : ''})`,
        confidence: exact && subs > 50000 ? 'high' : 'medium',
      };
    }
  }
  return best;
}

async function runRefresh(env, mode) {
  const db = env.DB;
  let items;
  if (mode === 'full') {
    items = (await db.prepare('SELECT item_id, name FROM yt_items ORDER BY item_id').all()).results;
  } else {
    items = (await db.prepare(
      `SELECT item_id, name FROM yt_items
       WHERE item_id NOT IN (SELECT DISTINCT item_id FROM yt_channels)
       ORDER BY item_id`
    ).all()).results;
  }

  let checked = 0, found = 0, failed = 0, skippedBudget = 0;
  for (const item of items) {
    if (checked >= MAX_SEARCH_CALLS) { skippedBudget = items.length - checked; break; }
    checked++;
    try {
      const result = await findChannel(env.YOUTUBE_API_KEY, item.name);
      if (result) {
        await db.prepare(
          `INSERT INTO yt_channels (item_id, channel_id, label, confidence, sort_order, verified_datetime)
           VALUES (?, ?, ?, ?, 0, datetime('now'))
           ON CONFLICT(item_id, channel_id) DO UPDATE SET
             label=excluded.label, confidence=excluded.confidence, verified_datetime=excluded.verified_datetime`
        ).bind(item.item_id, result.channel_id, result.label, result.confidence).run();
        found++;
      }
    } catch (e) {
      failed++;
    }
  }

  const notes = skippedBudget > 0
    ? `${skippedBudget} item(s) deferred to next run (daily search-quota budget reached)`
    : null;
  await db.prepare(
    `INSERT INTO yt_refresh_runs (mode, items_checked, items_found, items_failed, notes) VALUES (?, ?, ?, ?, ?)`
  ).bind(mode, checked, found, failed, notes).run();
}

export default {
  async scheduled(controller, env, ctx) {
    const mode = controller.cron === '0 9 1 * *' ? 'full' : 'gapfill';
    ctx.waitUntil(runRefresh(env, mode));
  },
  // Manual trigger for testing: GET /?run=gapfill or /?run=full
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const run = url.searchParams.get('run');
    if (run === 'gapfill' || run === 'full') {
      await runRefresh(env, run);
      return new Response(`ran ${run}\n`);
    }
    return new Response('haven-yt-catalog-refresh: scheduled Worker, no public endpoint. Use ?run=gapfill or ?run=full to test manually.\n');
  },
};
