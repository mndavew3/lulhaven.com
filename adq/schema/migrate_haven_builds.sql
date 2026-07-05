-- haven_builds privacy migration (adq design #9). Run ONCE against the prod
-- haven-builds D1 (gated):  wrangler d1 execute haven-builds --remote --file=...
-- Purges the stored router WAN IP (not needed post-mint; the region char remains
-- on the serial). Pair with the provision.js patch that stops writing source_ip
-- and the visit.js patch that keys visitor_hash with the KYC_SALT secret.
UPDATE provisioned_units SET source_ip = NULL WHERE source_ip IS NOT NULL;
