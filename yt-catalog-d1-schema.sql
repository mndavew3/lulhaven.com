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

-- The live, served table. deleted_datetime is a soft-delete (Dave's ruling
-- 2026-08-26, matching the existing blocklist_domains convention): a channel
-- that goes bad or comes back is one row toggling, never a delete+re-insert
-- that throws away history.
CREATE TABLE IF NOT EXISTS yt_channels (
    item_id           INTEGER NOT NULL REFERENCES yt_items(item_id) ON DELETE CASCADE,
    channel_id        TEXT    NOT NULL,
    label             TEXT,
    confidence        TEXT    NOT NULL DEFAULT 'medium',
    sort_order        INTEGER NOT NULL DEFAULT 0,
    created_datetime  TEXT,                   -- when first added
    verified_datetime TEXT    NOT NULL DEFAULT (datetime('now')),  -- last confirmed live
    deleted_datetime  TEXT,                   -- NULL = active; set = flagged/removed
    PRIMARY KEY (item_id, channel_id)
);

-- Matches found by the automated heuristic, staged for a human look before
-- they can ever reach yt_channels -- built 2026-08-26 after the heuristic's
-- first real run matched Berkshire Hathaway to an unrelated real-estate
-- franchise and three banned entities (Gab/Brighteon/InfoWars) to same-named
-- reupload channels. status is set by hand on review; never auto-flips.
CREATE TABLE IF NOT EXISTS yt_candidates (
    item_id           INTEGER NOT NULL REFERENCES yt_items(item_id) ON DELETE CASCADE,
    channel_id        TEXT    NOT NULL,
    label             TEXT,
    confidence        TEXT    NOT NULL DEFAULT 'medium',
    found_datetime    TEXT    NOT NULL DEFAULT (datetime('now')),
    status            TEXT    NOT NULL DEFAULT 'pending',  -- pending | approved | rejected
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
