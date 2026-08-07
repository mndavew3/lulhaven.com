-- Haven Light -> full Haven upgrade path. D1 binding haven_builds. STAGED — apply with:
--   wrangler d1 execute haven-builds --file=migrations/light_upgrade.sql --remote
-- Backs /api/light-upgrade-check: which routers we have full-Haven firmware for,
-- which units are already registered (fast-track), and demand for unsupported models.

-- Full-Haven images we can offer, keyed by OpenWrt board_name (e.g. glinet,gl-mt6000).
-- image_url + sha256 are what the Attended-Sysupgrade flow flashes (server-stated sha256).
CREATE TABLE IF NOT EXISTS haven_images (
  board_name       TEXT PRIMARY KEY,
  image_url        TEXT NOT NULL,
  sha256           TEXT NOT NULL,
  version          TEXT NOT NULL,
  -- 'sysupgrade' = one-tap (e.g. GL.iNet boards). 'bootloader_conversion' =
  -- needs a UBI installer + boot-chain rewrite first (e.g. Linksys E8450 /
  -- mt7622). Locked design 2026-07-31 (project_haven_gold_download_flow) --
  -- a flat supported:true/false can't tell these apart.
  install_class    TEXT NOT NULL CHECK(install_class IN ('sysupgrade','bootloader_conversion')),
  updated_datetime TEXT NOT NULL
);

-- A unit is stamped here at registration so a returning, already-registered router is
-- waved straight through. unit_hash = a SALTED HASH of the factory MAC (never the raw MAC).
CREATE TABLE IF NOT EXISTS haven_unit_registrations (
  unit_hash           TEXT PRIMARY KEY,
  username            TEXT,
  board_name          TEXT,
  registered_datetime TEXT NOT NULL
);

-- Demand signal: every time an UNSUPPORTED model asks to upgrade, we bump its count so we
-- can see which routers people keep asking for, to decide what firmware to build next.
CREATE TABLE IF NOT EXISTS haven_model_demand (
  board_name    TEXT PRIMARY KEY,
  count         INTEGER NOT NULL DEFAULT 0,
  last_datetime TEXT NOT NULL
);
