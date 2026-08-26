-- haven-yt-catalog D1: standalone copy of the item->YouTube-channel catalog,
-- refreshed autonomously by a scheduled Cloudflare Worker (no dependency on
-- Dave's local machine or haven.db). Mirrors item_yt_channels in haven.db,
-- plus its own copy of the target item list so the Worker has everything
-- it needs on its own.

CREATE TABLE IF NOT EXISTS yt_items (
    item_id           INTEGER PRIMARY KEY,
    name              TEXT NOT NULL,
    category          TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS yt_channels (
    item_id           INTEGER NOT NULL REFERENCES yt_items(item_id) ON DELETE CASCADE,
    channel_id        TEXT    NOT NULL,
    label             TEXT,
    confidence        TEXT    NOT NULL DEFAULT 'medium',
    sort_order        INTEGER NOT NULL DEFAULT 0,
    verified_datetime TEXT    NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (item_id, channel_id)
);

-- One row per scheduled run, so "is this actually still running" is a
-- one-query answer without needing Claude or Dave's machine involved.
CREATE TABLE IF NOT EXISTS yt_refresh_runs (
    run_datetime      TEXT NOT NULL DEFAULT (datetime('now')),
    mode              TEXT NOT NULL,          -- 'gapfill' | 'full'
    items_checked     INTEGER NOT NULL,
    items_found       INTEGER NOT NULL,
    items_failed      INTEGER NOT NULL,
    notes             TEXT
);
