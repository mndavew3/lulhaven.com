-- adq DB_VOTES seed. Denylist (never-block CDN/cloud/shared-hosting, matched on
-- SERVER-resolved ASN/CIDR) + dedicated ad-net ASNs + a small clearly-labeled
-- Haven-CURATED day-one verdict set (open question #1 default: labeled, advisory).
--
-- The denylist/adnet ASN lists here are a STARTER set; the authoritative lists are
-- a data-curation task tied to the pinned IP->ASN table (open question #2).

-- ---- Denylist: shared/CDN/cloud ASNs a mixed /24 must never take out ----
INSERT OR IGNORE INTO adq_denylist (match_kind, match_value, reason) VALUES
  ('asn','16509','aws'),        ('asn','14618','aws'),
  ('asn','15169','google'),     ('asn','396982','google-cloud'),
  ('asn','8075','azure'),       ('asn','13335','cloudflare'),
  ('asn','54113','fastly'),     ('asn','20940','akamai'),  ('asn','16625','akamai'),
  ('asn','32934','meta'),       ('asn','24940','hetzner'),
  ('asn','16276','ovh'),        ('asn','14061','digitalocean'), ('asn','63949','linode'),
  ('asn','13414','twitter'),    ('asn','2906','netflix');

-- A couple of anycast/shared CIDRs as belt for IPs whose ASN is unresolved.
INSERT OR IGNORE INTO adq_denylist (match_kind, match_value, reason) VALUES
  ('cidr','1.1.1.0/24','cloudflare-anycast'),
  ('cidr','8.8.8.0/24','google-dns-anycast');

-- ---- Dedicated ad-network ASNs (lowers CANDIDATE bar to N=25, never auto-apply) ----
-- STARTER/illustrative — real dedicated-adnet ASN curation is a data task. Many ad
-- networks ride cloud ASNs (which are denylisted), so this list is intentionally small.
INSERT OR IGNORE INTO adq_adnet_asns (asn, label) VALUES
  (394699,'applovin'),
  (54994,'unity-ads'),
  (207990,'ironsource'),
  (395973,'vungle');

-- ---- Hosting/datacenter ASNs for SUBMITTER classification (sybil-audit #4) ----
-- A vote whose CF submitter-ASN is one of these is a datacenter voter and does NOT
-- count toward the silent auto-apply diversity gate (only residential establisheds do).
-- STARTER = the major clouds/VPS providers (overlaps the ad-server denylist; different
-- purpose: this classifies WHO VOTED, the denylist classifies WHAT WAS VOTED ON).
INSERT OR IGNORE INTO adq_hosting_asn (asn, label) VALUES
  (16509,'aws'),        (14618,'aws'),          (15169,'google'),
  (396982,'google-cloud'),(8075,'azure'),       (13335,'cloudflare'),
  (54113,'fastly'),     (20940,'akamai'),       (24940,'hetzner'),
  (16276,'ovh'),        (14061,'digitalocean'), (63949,'linode'),
  (20473,'vultr'),      (63018,'oracle-cloud'), (35916,'multacom'),
  (9009,'m247'),        (212238,'datacamp'),    (51167,'contabo');

-- ---- Haven-CURATED day-one seed (labeled, advisory; NOT community-voted) ----
-- count_bucket='curated' + auto_apply=0 => the Helm shows "Haven-curated" not
-- "N households flagged", and it is one-tap advisory, never a silent drop, until
-- the community quorum independently confirms it.
INSERT OR IGNORE INTO adq_verdicts
  (cidr, prefix_len, server_asn, tenancy, count_bucket, risk_class, tier, auto_apply, confidence, graduated_datetime)
VALUES
  ('203.0.113.0/32', 32, 394699, 'dedicated-adnet', 'curated', 'adnet', 'community-confirmed', 0, 0.90, datetime('now')),
  ('198.51.100.0/32',32, 54994,  'dedicated-adnet', 'curated', 'adnet', 'community-confirmed', 0, 0.90, datetime('now'));
