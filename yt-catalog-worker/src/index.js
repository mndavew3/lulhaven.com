// haven-yt-catalog-refresh -- scheduled Worker.
// Keeps the item -> channel catalog current, autonomously, no local machine
// or Claude session involved. Runs on Cloudflare's own clock (Cron Triggers).
//
// Two modes, same code, picked by which cron string fired:
//   "0 9 * * MON"  -> gapfill: items with no channel yet -> yt_candidates
//   "0 9 1 * *"    -> full:    re-checks every EXISTING yt_channels row
//                     still resolves; flags (never silently replaces) any
//                     that come back missing/deleted/banned
//
// GAP-FILL WRITES TO yt_candidates, NOT yt_channels, ON PURPOSE. Proven
// necessary the same day this shipped: on its first real run this exact
// heuristic (normalized-title match + real subscriber count) matched
// "Berkshire Hathaway" to "Berkshire Hathaway HomeServices" (a real-estate
// franchise, not Warren Buffett's company, which has no channel at all) and
// three deplatformed entities (Gab/Brighteon/InfoWars) to same-named
// channels that are almost certainly reuploads, not the real thing --
// InfoWars scored 'high' confidence on subscriber count alone despite
// YouTube having banned the actual InfoWars channel outright. A same-name
// match with real subscribers is not sufficient evidence on its own; it
// needs a human glance before it can block or allow anything. Candidates
// sit in yt_candidates until reviewed and promoted into yt_channels by hand.
//
// Method: YouTube Data API v3 search.list (official, no scraping) + a
// scoring rule -- normalized-title match plus a real subscriber count.
// If nothing clears the bar, the item is left alone rather than guessed at.
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

async function runGapfill(env) {
  const db = env.DB;
  const items = (await db.prepare(
    `SELECT item_id, name FROM yt_items
     WHERE item_id NOT IN (SELECT DISTINCT item_id FROM yt_channels)
       AND item_id NOT IN (SELECT DISTINCT item_id FROM yt_candidates)
     ORDER BY item_id`
  ).all()).results;

  let checked = 0, found = 0, failed = 0, skippedBudget = 0;
  for (const item of items) {
    if (checked >= MAX_SEARCH_CALLS) { skippedBudget = items.length - checked; break; }
    checked++;
    try {
      const result = await findChannel(env.YOUTUBE_API_KEY, item.name);
      if (result) {
        // Staged for review, NOT written into the live/served yt_channels --
        // see the top-of-file note on why this heuristic isn't trusted alone.
        // status stays 'pending' here even on a re-find (a prior reject
        // decision isn't overwritten by an untouched default).
        await db.prepare(
          `INSERT INTO yt_candidates (item_id, channel_id, label, confidence, found_datetime, status)
           VALUES (?, ?, ?, ?, datetime('now'), 'pending')
           ON CONFLICT(item_id, channel_id) DO UPDATE SET
             label=excluded.label, confidence=excluded.confidence, found_datetime=excluded.found_datetime`
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
    `INSERT INTO yt_refresh_runs (mode, items_checked, items_found, items_failed, notes) VALUES ('gapfill', ?, ?, ?, ?)`
  ).bind(checked, found, failed, notes).run();
}

async function runFullCheck(env) {
  const db = env.DB;
  // Includes soft-deleted rows too -- a channel that vanished last month and
  // resolves again now gets reactivated (deleted_datetime cleared) rather
  // than staying invisible forever.
  const rows = (await db.prepare('SELECT item_id, channel_id, deleted_datetime FROM yt_channels ORDER BY item_id').all()).results;

  let checked = 0, missing = 0, reactivated = 0, failed = 0;
  const missingList = [];
  // channels.list accepts up to 50 IDs per call -- batch to stay cheap (1 unit/call
  // regardless of batch size, unlike search.list's 100 units/call).
  for (let i = 0; i < rows.length; i += 50) {
    const batch = rows.slice(i, i + 50);
    checked += batch.length;
    try {
      const stats = await ytChannelStats(env.YOUTUBE_API_KEY, batch.map(r => r.channel_id));
      const foundIds = new Set((stats.items || []).map(ch => ch.id));
      for (const r of batch) {
        const stillResolves = foundIds.has(r.channel_id);
        if (!stillResolves && !r.deleted_datetime) {
          // Flag by soft-deleting -- never a hard DELETE, so the row (and
          // its history) survives and can come back.
          await db.prepare(
            `UPDATE yt_channels SET deleted_datetime = datetime('now') WHERE item_id = ? AND channel_id = ?`
          ).bind(r.item_id, r.channel_id).run();
          missing++;
          missingList.push(`${r.item_id}:${r.channel_id}`);
        } else if (stillResolves && r.deleted_datetime) {
          await db.prepare(
            `UPDATE yt_channels SET deleted_datetime = NULL, verified_datetime = datetime('now') WHERE item_id = ? AND channel_id = ?`
          ).bind(r.item_id, r.channel_id).run();
          reactivated++;
        }
      }
    } catch (e) {
      failed += batch.length;
    }
  }

  const notes = missingList.length > 0
    ? `newly flagged (channel no longer resolves): ${missingList.join(', ')}`
    : (reactivated > 0 ? `${reactivated} previously-flagged channel(s) resolved again, reactivated` : null);
  await db.prepare(
    `INSERT INTO yt_refresh_runs (mode, items_checked, items_found, items_failed, notes) VALUES ('full', ?, ?, ?, ?)`
  ).bind(checked, checked - missing - failed, failed, notes).run();
}

export default {
  async scheduled(controller, env, ctx) {
    const run = controller.cron === '0 9 1 * *' ? runFullCheck : runGapfill;
    ctx.waitUntil(run(env));
  },
  // Manual trigger for testing: GET /?run=gapfill or /?run=full
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const run = url.searchParams.get('run');
    if (run === 'gapfill') { await runGapfill(env); return new Response('ran gapfill\n'); }
    if (run === 'full') { await runFullCheck(env); return new Response('ran full\n'); }
    return new Response('haven-yt-catalog-refresh: scheduled Worker, no public endpoint. Use ?run=gapfill or ?run=full to test manually. New matches land in yt_candidates for review, not yt_channels directly.\n');
  },
};
