var milestonesDataset = [
  {
    "id": 460,
    "date": "2026-05-25",
    "theme": "Filtering",
    "impact": 5,
    "summary": "Per-device filtering shipped end-to-end: devices table + DHCP auto-discovery + tag-bound dnsmasq rules + Helm dropdown with on/off toggle",
    "detail": "Implemented end-to-end. <database> schema: devices table added; prefs got device_id INTEGER NULL (NULL=household) with partial UNIQUE indexes; migration via state_db.lua rebuilds existing tables idempotently. New devices.lua CRUD library. prefs.lua + prefs_writer.lua got read_by_device / write_for_device. New dnsmasq_devices.lua emits dhcp-host=MAC,set:hvdev-N tags plus tag-bound address= and server= rules per enabled device — 'On' devices get a fresh filter set (household blocks they don't include become tag-bound whitelists for that device); 'Off' devices emit nothing and inherit household defaults. DHCP auto-discovery via dnsmasq dhcp-script hook (haven-dhcp-script.sh + haven-device-touch.lua + uci-defaults/93-haven-dhcp-script). LuCI controller: action_load returns devices + device_prefs; action_save accepts device_id; new device_enable/rename/remove endpoints. main.htm: device picker dropdown in header + on/off checkbox + rename button + JS state refactor (allPrefs scope-keyed, settings aliased). Universal bypass-resistance stays universal — per-device toggle only affects category filtering.",
    "benefit": "Households can apply different content rules to different devices — one household member's device can have stricter blocks than the household default while another stays untouched, all from one Helm page",
    "ref": "wiki-137"
  },
  {
    "id": 455,
    "date": "2026-05-25",
    "theme": "Tooling & infrastructure",
    "impact": 5,
    "summary": "Know Your Client (KYC): first-party pageview/event analytics live",
    "detail": "<backend table> + <backend table> tables in D1 <backend table>. Pages Functions /api/visit and /api/event. js/kyc.js beacon wired into every HTML page captures path, referrer, country/region/city, timezone, ASN+org, ua_class, daily-rotating visitor_hash, sessionStorage session_id, localStorage visitor_id for repeat-visit tracking. Owner-tag (not block) via havenowner=on URL flag.",
    "benefit": "First answer to 'is anyone visiting'; queries split lifetime uniques from returners; no third-party trackers, no consent banner needed.",
    "ref": "f6e964f533"
  },
  {
    "id": 452,
    "date": "2026-05-25",
    "theme": "Customer features (website)",
    "impact": 5,
    "summary": "New /milestones page: 436-row data-driven project history with impact filter + feature cross-link",
    "detail": "Milestones page reads accomplishments.public_* columns, paginated by impact (1-5 dropdown), sortable by newest/biggest. Banner-by-level blurb varies copy per impact tier. URL filter (?ids=...&label=...) lets feature rows link to the specific milestones that built them, with 'Show all' escape link.",
    "benefit": "Receipts not promises — 436 dated, themed, impact-scored milestones visible to prospective customers as proof-of-work.",
    "ref": "f6e964f533"
  },
  {
    "id": 451,
    "date": "2026-05-25",
    "theme": "Customer features (website)",
    "impact": 5,
    "summary": "New /benefits page: Why-the-customer-cares surface with 10 seeded benefits",
    "detail": "customer_benefits table (top/main sections, family/privacy ranks, related_feature_ids CSV, details HTML). Benefits-ui.js renders Family/Privacy sort + per-row Details panel + 'See the features that deliver this' cross-link. Pipeline mirrors features: <database> -> build.py -> js/customer-benefits.js -> benefits.html. Each benefit links to the features that deliver it via /features?ids=...&label=..., creating a three-page WHY -> WHAT -> WHEN cascade with filter banners.",
    "benefit": "Visitors land on customer outcomes first, with one-click navigation to the features that deliver them and the milestones that built them.",
    "ref": "f6e964f533"
  },
  {
    "id": 450,
    "date": "2026-05-25",
    "theme": "SQLite source-of-truth pipeline",
    "impact": 5,
    "summary": "Accomplishments table seeded — 421 rows spanning 2026-04-25 → 2026-05-25",
    "detail": "New accomplishments table — source-of-truth for the project history log. Seeded from 140 wiki notes + 281 git commits across website/data/haven-station repos. Theme-classified into 26 themes, with a benefit column populated (374 theme-default + 47 row-specific) so each row carries the outward-facing value, not just a restatement of what changed.",
    "benefit": "Project history captured as queryable data — every meaningful accomplishment in one place, ready to share.",
    "ref": "0ff4c1b63c"
  },
  {
    "id": 446,
    "date": "2026-05-25",
    "theme": "Session continuity",
    "impact": 5,
    "summary": "Session continuity log — accomplishments table + customer-features /features page live",
    "detail": "Wrap-up record capturing the day: accomplishments table seeded with 421 rows; /features page deployed with audience sort + telemetry; demo bullet linked from features list.",
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up where past-us left off.",
    "ref": "30c097f2b3"
  },
  {
    "id": 458,
    "date": "2026-05-25",
    "theme": "Process & discipline",
    "impact": 4,
    "summary": "Hasta routine extended: step 3 logs accomplishments with auto-scrubbed public columns",
    "detail": "CLAUDE.md and feedback_hasta memory updated to six-step ritual. New step 3: run haven-accomplishment.py for each substantial piece of work. Helper uses redact.py (15-category KYC rules) to auto-populate public_summary/detail/benefit/source_ref. Residue scan flags surviving tokens. Originals stay as-written; public_* is what ships.",
    "benefit": "Every session's work auto-logs to the customer-visible milestones page with public-safe scrubbing baked in; no manual review step needed.",
    "ref": "7df464a598"
  },
  {
    "id": 457,
    "date": "2026-05-25",
    "theme": "Marketing & website",
    "impact": 4,
    "summary": "Wi-Fi-exclusivity sweep + child/kid -> household-member rewrite across all customer surfaces",
    "detail": "Audited every customer-facing reference to 'Wi-Fi' or 'kid/kids' across features, benefits, and milestones tables. Rewrote network-medium-exclusive copy to include wired Ethernet ('on your network' + explicit Wi-Fi/Ethernet pairing where meaningful). Substituted 'kid' -> 'child' then 'children' -> 'household member' in 25 mentions across all surfaces. Two intentional keeps preserved: Parenting preset name, cultural critique line.",
    "benefit": "Copy now welcomes adult-self-filtering and senior-anti-scam users instead of framing Haven as exclusively family-filtering; no one feels excluded by the phrasing.",
    "ref": "f6e964f533"
  },
  {
    "id": 456,
    "date": "2026-05-25",
    "theme": "Customer features (website)",
    "impact": 4,
    "summary": "Customer features Details: 34 entries authored with audit fixes",
    "detail": "Wrote pull-back-curtain Details for 32 customer_features rows (~19000 chars HTML); audited and refined the existing two; corrected id 30 bullet_body Wi-Fi 5 -> Wi-Fi 6; built haven-feature-details.py CLI editor with auto-build + cache-bust on save.",
    "benefit": "Every customer feature claim now has a single click to the engineering reality behind it.",
    "ref": "f6e964f533"
  },
  {
    "id": 454,
    "date": "2026-05-25",
    "theme": "Brand & packaging",
    "impact": 4,
    "summary": "Meet Haven's Routers section — Olive and Navy gnomes introduce the product lineup",
    "detail": "New section between hero and How-It-Works introduces Haven Olive (Linksys E8450 - Essential Wi-Fi 6) and Haven Navy (GL.iNet MT6000 - Performance flagship) with the gnome illustrations. Page previously did not name any specific product.",
    "benefit": "Customer-facing product introduction with attention-grabbing visuals; brand mascots get prime real estate.",
    "ref": "f6e964f533"
  },
  {
    "id": 453,
    "date": "2026-05-25",
    "theme": "Marketing & website",
    "impact": 4,
    "summary": "Hero restructured: 5 button-relevant pillars (Benefits / Features / Live Demo / Milestones / Get notified)",
    "detail": "Replaced 3-button + 3-product-pillar hero with 5-button row over 5 button-relevant pillars. Interactive Live Demo label pulses gold on green (CSS keyframes, pauses on hover, respects prefers-reduced-motion). Product pillars absorbed into Features page entries per anti-duplication rule.",
    "benefit": "Visitors see five clear doors into Haven at a glance; the call-to-action that converts is the visually loudest.",
    "ref": "f6e964f533"
  },
  {
    "id": 459,
    "date": "2026-05-25",
    "theme": "Tooling & infrastructure",
    "impact": 3,
    "summary": "publish-content.sh: unified one-shot publish for /features /benefits /milestones",
    "detail": "Build + timestamp-based cache-buster bump + deploy in one command. Cache-buster discipline (Cloudflare max-age=14400 means stale browsers without ?v= bump) now automated. Workflow becomes: edit <database> in DB Browser -> <script> -> live.",
    "benefit": "End-to-end publish in one command; no human-error path for cache-busters; data edits land on the live site within seconds.",
    "ref": "7df464a598"
  },
  {
    "id": 271,
    "date": "2026-05-25",
    "theme": "Customer features (website)",
    "impact": 3,
    "summary": "sql: customer_features.details column + cellular explainer",
    "detail": null,
    "benefit": "One canonical feature surface — visitors find the angle relevant to them without us maintaining two pages.",
    "ref": "fa2fa8970e"
  },
  {
    "id": 141,
    "date": "2026-05-25",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "website: per-bullet Details button + one-at-a-time expand panel",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "ee2248006f"
  },
  {
    "id": 447,
    "date": "2026-05-24",
    "theme": "Session continuity",
    "impact": 5,
    "summary": "Session continuity log — Phase 0 off-network POC + multi-admin auth + notify v1 + verify hooks",
    "detail": "Massive session wrap-up: Phase 0 off-network filtering POC validated; multi-administrator auth shipped; notification subsystem v1 closed-loop in production; per-write verification hook added to feedback set.",
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up where past-us left off.",
    "ref": "efa92e34d7"
  },
  {
    "id": 367,
    "date": "2026-05-24",
    "theme": "Off-network filtering",
    "impact": 5,
    "summary": "overlay+scripts: bake-in Cloudflare Tunnel + DoH stack (Phase 0 off-network)",
    "detail": null,
    "benefit": "Filtering follows household members off home Wi-Fi — closes the cellular bypass that defeats most competitors.",
    "ref": "c55539ac80"
  },
  {
    "id": 279,
    "date": "2026-05-24",
    "theme": "Email notifications",
    "impact": 5,
    "summary": "data: — notify subsystem v1 closed loop live (new MAC → email)",
    "detail": null,
    "benefit": "Parents see what is happening on their network without having to log in and look.",
    "ref": "730fa71d8e"
  },
  {
    "id": 278,
    "date": "2026-05-24",
    "theme": "Product definition",
    "impact": 5,
    "summary": "product: feature inventory v0.2 — full rewrite from memory + wiki",
    "detail": null,
    "benefit": "Scope and language locked — every downstream decision is faster and more consistent.",
    "ref": "e1f1fdc37e"
  },
  {
    "id": 277,
    "date": "2026-05-24",
    "theme": "Product definition",
    "impact": 5,
    "summary": "data: — product feature inventory v0.2 logged",
    "detail": null,
    "benefit": "Scope and language locked — every downstream decision is faster and more consistent.",
    "ref": "406a14d090"
  },
  {
    "id": 276,
    "date": "2026-05-24",
    "theme": "Product definition",
    "impact": 5,
    "summary": "product: inventory v0.2 — incorporate 'The Haven Helm' terminology (Section A10 + C-15 resolved)",
    "detail": null,
    "benefit": "Brand vocabulary locked. Every customer-facing surface uses ONE name for the control surface — no 'dashboard' vs 'admin UI' confusion.",
    "ref": "3e52af069e"
  },
  {
    "id": 275,
    "date": "2026-05-24",
    "theme": "Product definition",
    "impact": 5,
    "summary": "product: terse feature list companion to v0.2 inventory",
    "detail": null,
    "benefit": "Scope and language locked — every downstream decision is faster and more consistent.",
    "ref": "9e3550e4cf"
  },
  {
    "id": 140,
    "date": "2026-05-24",
    "theme": "Product definition",
    "impact": 5,
    "summary": "Product feature inventory v0.2 — internal source-of-truth spec, supersedes Google Doc v0.1",
    "detail": "Full rewrite of the haven-feature-inventory document. v0.1 (Google Doc) was\nextracted from a single conversation transcript and had errors + significant\nomissions. v0.2 is the internal source-of-truth spec, built from the wiki\n(140+ notes), memory files (60+), live dev MT6000 sta…",
    "benefit": "Product Feature Inventory v0.2 locks the canonical capability list. Every marketing surface (website, demo, support docs) derives from one source.",
    "ref": ""
  },
  {
    "id": 139,
    "date": "2026-05-24",
    "theme": "Email notifications",
    "impact": 5,
    "summary": "Notify subsystem v1 — closed loop live (new MAC → email), built end-to-end on 2026-05-24",
    "detail": "The first Haven notification event type is shipped end-to-end and proven in\nproduction on dev MT6000 (<router serial>) on 2026-05-24 ~15:50 CDT.",
    "benefit": "Email notification subsystem closed loop live. First event — new device joins your network — gives parents instant awareness without checking the UI.",
    "ref": ""
  },
  {
    "id": 136,
    "date": "2026-05-24",
    "theme": "SQLite source-of-truth pipeline",
    "impact": 5,
    "summary": "Change-log / audit table — knowing which machine made a filter change (Phase 1.5)",
    "detail": "Dave 2026-05-24 09:24 CDT: \"How difficult would it be to keep a file change table?\nEveryone logs in as root, but we could at least know which machine they are locked in\nfrom, right?\"",
    "benefit": "Audit table designs the answer to 'who changed what filter at what time' — accountability when there are multiple admins in the house.",
    "ref": ""
  },
  {
    "id": 368,
    "date": "2026-05-24",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "overlay: uci-defaults/85-haven-wireguard-keypair — per-router WG keypair at first boot",
    "detail": null,
    "benefit": "Every burned router has a unique WireGuard keypair generated at first boot — no per-customer key management, no shared secrets.",
    "ref": "e189a96a9c"
  },
  {
    "id": 366,
    "date": "2026-05-24",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "overlay: /<router data partition> on mmcblk0boot1 implementation for MT6000)",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "4f200b454a"
  },
  {
    "id": 365,
    "date": "2026-05-24",
    "theme": "Email notifications",
    "impact": 4,
    "summary": "notify subsystem v1: Cloudflare Worker + router detector + cron",
    "detail": null,
    "benefit": "Parents see what is happening on their network without having to log in and look.",
    "ref": "173f36dbd4"
  },
  {
    "id": 363,
    "date": "2026-05-24",
    "theme": "Email notifications",
    "impact": 4,
    "summary": "notify: D1-backed multi-household routing + dispatch audit log",
    "detail": null,
    "benefit": "Parents see what is happening on their network without having to log in and look.",
    "ref": "1072f3dcdb"
  },
  {
    "id": 361,
    "date": "2026-05-24",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "haven-overlay: migrate known_macs to /<router data partition> via symlink",
    "detail": null,
    "benefit": "First customer-data table living on /<router data partition>. Factory reset preserves device list — new-device notification doesn't flood after every reset.",
    "ref": "34eb351f3d"
  },
  {
    "id": 281,
    "date": "2026-05-24",
    "theme": "Multi-administrator UI",
    "impact": 4,
    "summary": "data: — first-run UX, multi-admin, root invisible (Phase 1.5 design)",
    "detail": null,
    "benefit": "Both parents can manage filters from their own accounts; root is hidden so a misclick cannot lock the family out.",
    "ref": "3e2c8a9e4f"
  },
  {
    "id": 273,
    "date": "2026-05-24",
    "theme": "SQLite source-of-truth pipeline",
    "impact": 4,
    "summary": "sql: replace.md feature exporters with single JS dataset",
    "detail": null,
    "benefit": "Single place to edit data; everything else regenerates — no parallel maintenance, no drift.",
    "ref": "04207d6cdd"
  },
  {
    "id": 157,
    "date": "2026-05-24",
    "theme": "Multi-administrator UI",
    "impact": 4,
    "summary": "demo: Administrators panel — multi-admin UX showcase on the website",
    "detail": null,
    "benefit": "Both parents can manage filters from their own accounts; root is hidden so a misclick cannot lock the family out.",
    "ref": "97a372ff53"
  },
  {
    "id": 145,
    "date": "2026-05-24",
    "theme": "Customer features (website)",
    "impact": 4,
    "summary": "website: Features page with sort-by-audience + first-click telemetry",
    "detail": null,
    "benefit": "Visitors browse Haven's full feature set via either Family or Privacy sort — same content, audience-led order.",
    "ref": "46511f4c5e"
  },
  {
    "id": 135,
    "date": "2026-05-24",
    "theme": "Architecture & data model",
    "impact": 4,
    "summary": "Per-device filter profiles — schema + precedence model for v1.5",
    "detail": "Dave 2026-05-24 09:15 CDT, thinking out loud about per-device filtering: \"we could save\nour dataset just with a device label on it, and we could have multiple — we could have\na million of them. And the other thing is, we could also have an overall, like, default\nthat would requir…",
    "benefit": "Per-device filter profile schema designed; we can ship 'Different household members' devices can have different rules' without rewriting the data layer.",
    "ref": ""
  },
  {
    "id": 364,
    "date": "2026-05-24",
    "theme": "Email notifications",
    "impact": 3,
    "summary": "notify: bearer-token auth on Worker + router script",
    "detail": null,
    "benefit": "Parents see what is happening on their network without having to log in and look.",
    "ref": "4115cb678e"
  },
  {
    "id": 362,
    "date": "2026-05-24",
    "theme": "Email notifications",
    "impact": 3,
    "summary": "notify: per-(serial, event_type) rate limit on Worker",
    "detail": null,
    "benefit": "Parents see what is happening on their network without having to log in and look.",
    "ref": "9a1b60fc06"
  },
  {
    "id": 360,
    "date": "2026-05-24",
    "theme": "Multi-administrator UI",
    "impact": 3,
    "summary": "haven-overlay: <auth sync script> — single source of truth <system auth file>",
    "detail": null,
    "benefit": "Data-driven multi-admin auth: <system auth file> is the single source of truth for who can log into the Helm — no parallel <auth daemon> config drift.",
    "ref": "b7c3a5523b"
  },
  {
    "id": 285,
    "date": "2026-05-24",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "data: wiki — emergency info-seeking design (tourniquet scenario)",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "fbf722c23b"
  },
  {
    "id": 284,
    "date": "2026-05-24",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "data: wiki — per-device filter profiles schema + precedence (v1.5 design)",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "abe4377b9e"
  },
  {
    "id": 283,
    "date": "2026-05-24",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "data: amend — per-device filter design collapsed by one-password threat model",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "2210393efb"
  },
  {
    "id": 282,
    "date": "2026-05-24",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "data: — change_log / audit table design for Phase 1.5",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "6dedaafc3b"
  },
  {
    "id": 274,
    "date": "2026-05-24",
    "theme": "Customer features (website)",
    "impact": 3,
    "summary": "sql: customer_features table + audience-routed exporter",
    "detail": null,
    "benefit": "Single canonical feature surface for /features and any future audience page. Audience-led views from one row set.",
    "ref": "c409266529"
  },
  {
    "id": 272,
    "date": "2026-05-24",
    "theme": "Customer features (website)",
    "impact": 3,
    "summary": "sql: customer_features.link column + demo row linked",
    "detail": null,
    "benefit": "One canonical feature surface — visitors find the angle relevant to them without us maintaining two pages.",
    "ref": "0b96178b07"
  },
  {
    "id": 156,
    "date": "2026-05-24",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "website: bus-and-phone quote above \"47 Strategies\" card",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "d3c1b27480"
  },
  {
    "id": 155,
    "date": "2026-05-24",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "website: refine bus quote — 'Who drives your bus?' framing",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "acbe91f3e4"
  },
  {
    "id": 152,
    "date": "2026-05-24",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "website: replace haven-ui screenshot with full-resolution 1918x957 capture",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "6e6f6be2e2"
  },
  {
    "id": 151,
    "date": "2026-05-24",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "website: retitle OpenWRT card to 'You can relax. This is your browser on Haven.'",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "931c0db9ad"
  },
  {
    "id": 150,
    "date": "2026-05-24",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "website: rewrite browser-on-Haven body to match new title (drops OpenWRT mention)",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "956eadfc84"
  },
  {
    "id": 149,
    "date": "2026-05-24",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "website: hero subtitle 'feed them garbage' → 'spew garbage'",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "fc69024a38"
  },
  {
    "id": 148,
    "date": "2026-05-24",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "website: hero body — broaden to households (parents + algorithm-conscious adults)",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "2060937011"
  },
  {
    "id": 147,
    "date": "2026-05-24",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "website: hero body — 'whole household', 'It fixes:' lead, one-grievance-per-line layout",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "7506d876bf"
  },
  {
    "id": 146,
    "date": "2026-05-24",
    "theme": "Customer features (website)",
    "impact": 3,
    "summary": "website: customer feature landing pages (family + privacy)",
    "detail": null,
    "benefit": "One canonical feature surface — visitors find the angle relevant to them without us maintaining two pages.",
    "ref": "0d30f20df6"
  },
  {
    "id": 144,
    "date": "2026-05-24",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "website: equal-width hero buttons + linkable feature bullets",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "d410675a8f"
  },
  {
    "id": 142,
    "date": "2026-05-24",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "website: shorter sort buttons + 'Sort:' label; hero line swap",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "16620cb035"
  },
  {
    "id": 137,
    "date": "2026-05-24",
    "theme": "Brand & packaging",
    "impact": 3,
    "summary": "First-run UX — soft-redirect root login to administrator-create page; Mom IS the superuser",
    "detail": "Dave 2026-05-24 09:32 CDT: \"I think that the root user is only a thing for Linux people,\nand that to make this a friendlier, less Linux specific kind of application, we're gonna\nend up with additional users.\"",
    "benefit": "First-run UX locked: Mom names herself the admin, root disappears. Customer never sees the word 'root' or has to think about Linux user accounts.",
    "ref": ""
  },
  {
    "id": 134,
    "date": "2026-05-24",
    "theme": "Planning & roadmap",
    "impact": 3,
    "summary": "Emergency information-seeking — design responses to false-positive blocks during a real emergency",
    "detail": "Dave 2026-05-24 09:12 CDT, in a \"mixed feelings\" reflection on filtering: imagine you're\ntrying to figure out how to put together a tourniquet, you're searching online, and a\nHaven category block puts you between you and the page. That's the failure mode where the\nfilter actively…",
    "benefit": "Emergency info-seeking design baked in. Anyone bleeding out can always reach poison control / Red Cross / Mayo — filter never blocks the actual emergency.",
    "ref": ""
  },
  {
    "id": 153,
    "date": "2026-05-24",
    "theme": "Marketing & website",
    "impact": 2,
    "summary": "website: fix Click,Save card — item-img height:auto so the hero-sized image doesn't overflow",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "f2a75e47ce"
  },
  {
    "id": 143,
    "date": "2026-05-24",
    "theme": "Customer features (website)",
    "impact": 2,
    "summary": "website: bump customer-features cache-buster (v=20260525-2)",
    "detail": null,
    "benefit": "One canonical feature surface — visitors find the angle relevant to them without us maintaining two pages.",
    "ref": "d5cdc1516d"
  },
  {
    "id": 280,
    "date": "2026-05-24",
    "theme": "Wiki & documentation",
    "impact": 1,
    "summary": "data: — two-tier export (filter shareable + user-data encrypted backup)",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "83f03449ff"
  },
  {
    "id": 154,
    "date": "2026-05-24",
    "theme": "Marketing & website",
    "impact": 1,
    "summary": "website: promote Haven UI screenshot to full-width hero-sized card; rename to 'Click, Save'",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "22eb606ae3"
  },
  {
    "id": 138,
    "date": "2026-05-24",
    "theme": "Firmware & overlay",
    "impact": 1,
    "summary": "Two-tier export — shareable filter export + encrypted user-data backup (Phase 1.5)",
    "detail": "Dave 2026-05-24 10:02 CDT, in the factory-reset recovery discussion: \"if we add user data\nto the export, you might have a quick way to get back to when you made your export...\nWe would need to make a separate user data specific export. You don't want to give your\ncredentials to t…",
    "benefit": "Two-tier export design: customers can share their filter set with a friend, OR back up everything with a passphrase Haven cannot decrypt.",
    "ref": ""
  },
  {
    "id": 449,
    "date": "2026-05-23",
    "theme": "Session continuity",
    "impact": 5,
    "summary": "Session continuity log — Fox filter shipped + LuCI YouTube pipeline wired",
    "detail": "Fox-channels YouTube filter shipped end-to-end. LuCI category preferences now drive the YouHaven blocklist dynamically through the item_yt_channels table.",
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up where past-us left off.",
    "ref": "7e76f5f06f"
  },
  {
    "id": 287,
    "date": "2026-05-23",
    "theme": "Wiki & documentation",
    "impact": 5,
    "summary": "data: wiki — Phase 0 POC greenlit (off-network architecture)",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "d5421c6bd6"
  },
  {
    "id": 286,
    "date": "2026-05-23",
    "theme": "Wiki & documentation",
    "impact": 5,
    "summary": "data: wiki — Phase 0 POC COMPLETE (off-network filtering proven end-to-end)",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "c1e360bcdd"
  },
  {
    "id": 133,
    "date": "2026-05-23",
    "theme": "Architecture & data model",
    "impact": 5,
    "summary": "Phase 0 POC COMPLETE — off-network filtering proven end-to-end on dev MT6000 + Android phone",
    "detail": "Phase 0 POC for the off-network filtering architecture completed 2026-05-23 23:14 CDT,\n~1 hour after greenlight (vs 1-2 days estimated). Dave's prediction that the estimate\nwas \"conservative in the extreme\" was correct.",
    "benefit": "Phase 0 off-network POC PROVEN end-to-end on dev MT6000. Off-network cellular bypass — the gap that breaks every competitor — closed.",
    "ref": ""
  },
  {
    "id": 131,
    "date": "2026-05-23",
    "theme": "Architecture & data model",
    "impact": 5,
    "summary": "Phase 0 POC GREENLIT — off-network filtering architecture",
    "detail": "Dave greenlit Phase 0 POC for the off-network filtering architecture on 2026-05-23 22:10\nCDT, immediately after the Hasta wrap of the NetworkChuck competitive-research session.",
    "benefit": "Off-network architecture greenlit: BOTH Cloudflare Tunnel (mass-market) AND WireGuard (Pro tier) — covers the full customer spectrum from no-setup to full-tunnel.",
    "ref": ""
  },
  {
    "id": 127,
    "date": "2026-05-23",
    "theme": "LuCI / UI",
    "impact": 5,
    "summary": "Account-enforcement Step C done: LuCI UI shipped",
    "detail": "Step C complete. New: (1) yt_actions_writer.lua — rewrite-from-scratch upsert into yt_item_actions plus settings.yt_actions_enabled write; (2) haven.lua controller action_load returns yt_actions_enabled + yt_item_actions array, action_save extracts both before prefs_writer.write …",
    "benefit": "Customer interacts with this surface daily; every refinement compounds the experience.",
    "ref": ""
  },
  {
    "id": 125,
    "date": "2026-05-23",
    "theme": "SQLite source-of-truth pipeline",
    "impact": 5,
    "summary": "Account-enforcement Step A schema locked",
    "detail": "<database> gets yt_item_actions (PK category_key+item_key+action, CHECK action IN ('dont_recommend'), CHECK enabled IN (0,1), STRICT, modified-trigger, idx on enabled+modified). Item-keyed (not channel-keyed) — parent toggles per-entity (e.g. Fox News); router expands to channel_id…",
    "benefit": "Single place to edit data; everything else regenerates — no parallel maintenance, no drift.",
    "ref": ""
  },
  {
    "id": 289,
    "date": "2026-05-23",
    "theme": "SQLite source-of-truth pipeline",
    "impact": 4,
    "summary": "data: export_main_htm.py emits YTITEMS block; wiki notes 127-130",
    "detail": null,
    "benefit": "Single place to edit data; everything else regenerates — no parallel maintenance, no drift.",
    "ref": "b92805e25e"
  },
  {
    "id": 132,
    "date": "2026-05-23",
    "theme": "Marketing & website",
    "impact": 4,
    "summary": "Design: bypass posture is prevention + monitoring fallback (DNS-tamper detection)",
    "detail": "Dave decision 2026-05-23: Haven's bypass story is not pure prevention — it is\nprevention with a monitoring fallback. A determined user will always find a hole\n(VPN, cellular, manual DNS change on the device). The design concession is to\ndetect, not deny, the holes Haven can't phys…",
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": ""
  },
  {
    "id": 128,
    "date": "2026-05-23",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Account-enforcement Step D plumbing done; firing stubbed",
    "detail": "Step D split into two sub-steps. D.1 (this session): plumbing. MainActivity.kt fetchActions() mirrors fetchBlocklist(), pushes window.havenYtActions={v,actions} at onPageFinished; haven_filter.js passive sweep walks every InnerTube response for menuServiceItemRenderer with NOT_IN…",
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": ""
  },
  {
    "id": 448,
    "date": "2026-05-23",
    "theme": "Session continuity",
    "impact": 3,
    "summary": "Session continuity log — NetworkChuck competitive notes + hero CTA refresh",
    "detail": "Captured competitive teardown of NetworkChuck-style DIY router pitches against Haven's pre-flashed approach; refreshed homepage hero CTAs.",
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up where past-us left off.",
    "ref": "165e9beb81"
  },
  {
    "id": 297,
    "date": "2026-05-23",
    "theme": "Session continuity",
    "impact": 3,
    "summary": "data: add session_summary table to <database>",
    "detail": null,
    "benefit": "Hasta ritual closes every session by recording what shipped + what's pending. Next session starts oriented, not re-discovering.",
    "ref": "09d7272ea7"
  },
  {
    "id": 296,
    "date": "2026-05-23",
    "theme": "Session continuity",
    "impact": 3,
    "summary": "orient: inject session_summary into SessionStart hook + CLAUDE.md",
    "detail": null,
    "benefit": "Hasta ritual closes every session by recording what shipped + what's pending. Next session starts oriented, not re-discovering.",
    "ref": "9afd08edde"
  },
  {
    "id": 295,
    "date": "2026-05-23",
    "theme": "Session continuity",
    "impact": 3,
    "summary": "orient: add orient.sh to git tracking (moved from.claude/, symlinked back)",
    "detail": null,
    "benefit": "Sessions resume with full context; no rediscovery, no lost decisions.",
    "ref": "3efea8c26a"
  },
  {
    "id": 294,
    "date": "2026-05-23",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "data: remove manga draft docs and chapter images (moved to external storage)",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "852919ecdd"
  },
  {
    "id": 293,
    "date": "2026-05-23",
    "theme": "Session continuity",
    "impact": 3,
    "summary": "data: session summary row 4 — orient/hasta/git fixes (2026-05-23)",
    "detail": null,
    "benefit": "Hasta ritual closes every session by recording what shipped + what's pending. Next session starts oriented, not re-discovering.",
    "ref": "d48b8fdc22"
  },
  {
    "id": 292,
    "date": "2026-05-23",
    "theme": "Session continuity",
    "impact": 3,
    "summary": "orient.sh: add MANDATORY orientation directive + scheduled reminders",
    "detail": null,
    "benefit": "Sessions resume with full context; no rediscovery, no lost decisions.",
    "ref": "ec89f47380"
  },
  {
    "id": 290,
    "date": "2026-05-23",
    "theme": "YouHaven anti-algorithm app",
    "impact": 3,
    "summary": "data: item_yt_channels table — wire LuCI prefs to YouHaven blocklist",
    "detail": null,
    "benefit": "Adults get an exit from algorithmic feeds; Haven serves both parents AND grown-up privacy buyers.",
    "ref": "24de75aecb"
  },
  {
    "id": 288,
    "date": "2026-05-23",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "data: wiki notes #131, #132 — NetworkChuck OpenDNS + PiHole competitive read",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "6fa064e804"
  },
  {
    "id": 161,
    "date": "2026-05-23",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "website: point Chapter 2b to heyzine + Google Drive reader",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "d8ff425978"
  },
  {
    "id": 160,
    "date": "2026-05-23",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "website: add Chapter 2a button; move NCC section below copyright",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "5333183c5c"
  },
  {
    "id": 158,
    "date": "2026-05-23",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "website: move hero CTAs above pillars; tighten subtitle to \"It shouldn't feed them garbage.\"",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "744b1d34e2"
  },
  {
    "id": 130,
    "date": "2026-05-23",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "NetworkChuck PiHole sequel — DIY escalation tier, security holes, off-network validation",
    "detail": "Sequel to wiki (OpenDNS tutorial). NetworkChuck's \"BLOCK EVERYTHING w/ PiHole\non Docker, OpenDNS and IFTTT\" (May 2020, 920K views, 891 comments) is the DIY-IT\nESCALATION TIER — the viewer who started with OpenDNS and now wants ad-blocking, granular\ndomain control, and v…",
    "benefit": "PiHole comparison cataloged — Haven covers what PiHole forces hobbyists to figure out themselves.",
    "ref": ""
  },
  {
    "id": 129,
    "date": "2026-05-23",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "NetworkChuck OpenDNS tutorial — competitive read + voice-of-customer quotes",
    "detail": "The canonical DIY \"block adult sites at home\" YouTube tutorial is NetworkChuck's \"block\nADULT sites and other BAD STUFF on your home network (EASY)\" — Apr 2020, 5.27M-subscriber\nchannel, 638K views, walks IT-literate viewers through setting OpenDNS as their home\nrouter's upstream…",
    "benefit": "NetworkChuck's audience identified as the parent-and-privacy crossover Haven also targets — competitive read confirms Haven's positioning is durable.",
    "ref": ""
  },
  {
    "id": 291,
    "date": "2026-05-23",
    "theme": "YouHaven anti-algorithm app",
    "impact": 1,
    "summary": "data: golden /youtubei/v1/search sample + gitignore Chrome debug profile",
    "detail": null,
    "benefit": "Adults get an exit from algorithmic feeds; Haven serves both parents AND grown-up privacy buyers.",
    "ref": "9ef8910d1a"
  },
  {
    "id": 159,
    "date": "2026-05-23",
    "theme": "Build pipeline",
    "impact": 1,
    "summary": "api: regenerate <database> + feed-delta.db with item_yt_channels",
    "detail": null,
    "benefit": "Edits flow source → live in one script. No copy-paste, no stale artifacts.",
    "ref": "a52ce93e1a"
  },
  {
    "id": 126,
    "date": "2026-05-23",
    "theme": "Firmware & overlay",
    "impact": 1,
    "summary": "Account-enforcement Step B done: yt_actions.lua + apply.lua wiring",
    "detail": "New router lib <script> mirrors yt_blocklist.lua: atomic temp+rename, deterministic sort, JSON shape {v:1, actions:{dont_recommend:[cid,...]}}. Reads master switch from settings.yt_actions_enabled and enabled rows from yt_item_actions where deleted_date…",
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": ""
  },
  {
    "id": 124,
    "date": "2026-05-22",
    "theme": "Architecture & data model",
    "impact": 4,
    "summary": "Cloud proxy round-trip granularity — one per video play, not per packet",
    "detail": "QUESTION: How many tunnel callback round trips does the cloud proxy require?",
    "benefit": "Today's design supports tomorrow's features without painful rewrites.",
    "ref": ""
  },
  {
    "id": 123,
    "date": "2026-05-22",
    "theme": "Architecture & data model",
    "impact": 4,
    "summary": "Cloud proxy callback to router — CGNAT problem solved by Cloudflare Tunnel",
    "detail": "QUESTION: Can the cloud proxy call back to the router's dynamic IP to get the blocklist in real time?",
    "benefit": "Today's design supports tomorrow's features without painful rewrites.",
    "ref": ""
  },
  {
    "id": 122,
    "date": "2026-05-22",
    "theme": "Architecture & data model",
    "impact": 4,
    "summary": "Cloud proxy filter data flow — router pushes blocklist to D1 on preference change",
    "detail": "HOW FILTER DATA REACHES THE CLOUD PROXY:",
    "benefit": "Today's design supports tomorrow's features without painful rewrites.",
    "ref": ""
  },
  {
    "id": 121,
    "date": "2026-05-22",
    "theme": "Architecture & data model",
    "impact": 4,
    "summary": "Cloud proxy heavy lifting breakdown — Cloudflare Workers is strongest option",
    "detail": "BREAKDOWN: What the cloud proxy does (heavy lifting moved off router):\n 1. TLS termination — decrypts HTTPS from router using cloud cert\n 2. Request inspection — identifies /youtubei/v1/player vs browse/search endpoints\n 3. Payload parsing — extracts channelId from player resp…",
    "benefit": "Today's design supports tomorrow's features without painful rewrites.",
    "ref": ""
  },
  {
    "id": 120,
    "date": "2026-05-22",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Cloud proxy + VPN on MT6000 — no auxiliary hardware needed",
    "detail": "Move YouTube API proxy to cloud; MT6000 handles WireGuard VPN without conflict.",
    "benefit": "Filtering follows household members off home Wi-Fi — closes the cellular bypass that defeats most competitors.",
    "ref": ""
  },
  {
    "id": 163,
    "date": "2026-05-21",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "Add Chapter 2b manga page and button",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "a739f87378"
  },
  {
    "id": 162,
    "date": "2026-05-21",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "Switch manga reader to media.lulhaven.com custom domain",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "f9873aba81"
  },
  {
    "id": 298,
    "date": "2026-05-20",
    "theme": "Repo hygiene",
    "impact": 5,
    "summary": "cowork 2026-05-20: Ch2b milestone note; Anifusion workflow documented",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "af93c89a96"
  },
  {
    "id": 119,
    "date": "2026-05-20",
    "theme": "Process & discipline",
    "impact": 5,
    "summary": "MILESTONE 2026-05-20: Chapter 2b manga complete (Anifusion)",
    "detail": "## MILESTONE — Chapter 2b Complete (Anifusion)\nDate: 2026-05-20\nTool: Anifusion (replacing mangaka.app as of this chapter)",
    "benefit": "Less waste, fewer back-and-forths, more shipped work per session.",
    "ref": ""
  },
  {
    "id": 309,
    "date": "2026-05-17",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "manga: harvest Chapter 2 session decisions into manga.db",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "f1c51a212d"
  },
  {
    "id": 308,
    "date": "2026-05-17",
    "theme": "Session continuity",
    "impact": 3,
    "summary": "transcript index: add transcripts.db (FTS5) + indexer scripts",
    "detail": null,
    "benefit": "Sessions resume with full context; no rediscovery, no lost decisions.",
    "ref": "b5cef21b6b"
  },
  {
    "id": 307,
    "date": "2026-05-17",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "Chapter 2: append pages 20-26 (Unit Test through The Tip), renumber old pages to 27-33, 8 new manga.db entries",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "9b650624c3"
  },
  {
    "id": 306,
    "date": "2026-05-17",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "Chapter 2: append pages 27-28 (Imagine + The Job), renumber old pages to 29-35, 3 new manga.db entries",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "82399211a0"
  },
  {
    "id": 305,
    "date": "2026-05-17",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "Chapter 2: word trim + epilogue (Open Box Therapy / Ain't Misbe-Haven), 3 new manga.db entries — pages 1-28+epilogue = 4,460 words",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "b4a214ee9d"
  },
  {
    "id": 303,
    "date": "2026-05-17",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "Chapter 2 Draft 1 trimmed to 4948 words — ready for mangaka.app",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "79b4d6eed5"
  },
  {
    "id": 302,
    "date": "2026-05-17",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "Strip heading # markers — 4909 words for mangaka.app",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "3eb0cdfa84"
  },
  {
    "id": 300,
    "date": "2026-05-17",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "Log epilogue Droste recursion gag — supplied image, last page",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "7c5388f458"
  },
  {
    "id": 299,
    "date": "2026-05-17",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "manga: harvest Chapter 2a + 2b decisions; commit drafts; lore update",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "2bb1c4f493"
  },
  {
    "id": 164,
    "date": "2026-05-17",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "hero: parent-positioning rewrite + new hero image",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "f86359c118"
  },
  {
    "id": 118,
    "date": "2026-05-17",
    "theme": "Process & discipline",
    "impact": 3,
    "summary": "Cowork session continuity infrastructure (May 17 2026)",
    "detail": "Wired up in Cowork session c3a808c9:",
    "benefit": "Less waste, fewer back-and-forths, more shipped work per session.",
    "ref": ""
  },
  {
    "id": 304,
    "date": "2026-05-17",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "Ch2: Jessica Erickson (Norse/NCC nod) + Bella canon entries, story-text pipeline note, character block in storyboard header",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "f576f6c66d"
  },
  {
    "id": 301,
    "date": "2026-05-17",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "Aggressive edit pass — 4576 words (from 4909)",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "f63ee15d11"
  },
  {
    "id": 378,
    "date": "2026-05-16",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Phase 2 orchestrators: full-haven-from-oem.sh + full-refresh-haven.sh",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "d9cc60280d"
  },
  {
    "id": 379,
    "date": "2026-05-16",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "flash-haven + start-burn: 3 cosmetic + UX fixes from 2026-05-16 chain test",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "b4c9e37b56"
  },
  {
    "id": 377,
    "date": "2026-05-16",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "start-burn.sh: REDO path now backfills customer/hardware/firmware from D1",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "e1dba06af6"
  },
  {
    "id": 376,
    "date": "2026-05-16",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "start-burn.sh: also uppercase serial input (matches model normalization)",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "9c9d57af4f"
  },
  {
    "id": 374,
    "date": "2026-05-16",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "reset-to-oem.sh: re-run wireless.sh at end to restore split-DNS baseline",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "f3f1fababb"
  },
  {
    "id": 369,
    "date": "2026-05-16",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "manifest: register haven-0.1.8 through haven-0.1.12 sysupgrade images",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "e63c222b06"
  },
  {
    "id": 117,
    "date": "2026-05-16",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Standing policy: capture OEM image from every NIB before flashing",
    "detail": "POLICY (Dave 2026-05-16 15:00):\nEvery NIB router we burn gets its OEM firmware captured byte-for-byte BEFORE flash-openwrt-ram.sh wipes it. Captured tarballs are SHA256-deduped against images/manifest.db; uniques are kept, duplicates discarded.",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 116,
    "date": "2026-05-16",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "MT6000 U-Boot recovery dead-end on dev unit",
    "detail": "Spent ~90 min 2026-05-16 trying to validate reset-to-oem.sh + flash-openwrt-ram.sh against real OEM stock on the dev MT6000.",
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": ""
  },
  {
    "id": 313,
    "date": "2026-05-16",
    "theme": "Email notifications",
    "impact": 3,
    "summary": "builds_schema: document launch_signups + builds.oem_firmware_version",
    "detail": null,
    "benefit": "'Get notified at launch' captures every pre-launch interested visitor; CAN-SPAM compliant; double-opt-in ready.",
    "ref": "5369e53304"
  },
  {
    "id": 312,
    "date": "2026-05-16",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "wiki + reminders: today's adds #119, OEM-capture reminder)",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "a36b609227"
  },
  {
    "id": 311,
    "date": "2026-05-16",
    "theme": "Email notifications",
    "impact": 3,
    "summary": "builds_schema: launch_signups gains double-opt-in + outbound tracking columns",
    "detail": null,
    "benefit": "'Get notified at launch' captures every pre-launch interested visitor; CAN-SPAM compliant; double-opt-in ready.",
    "ref": "ce5e20ac9a"
  },
  {
    "id": 310,
    "date": "2026-05-16",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "Add manga.db (Chapter 2 lore archive) and Chapter 2 storyboard draft 1",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "7ee2095f49"
  },
  {
    "id": 168,
    "date": "2026-05-16",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "<admin tool> detail: render unit 0 instead of 'unit ?' (falsy-zero bug)",
    "detail": null,
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "3b12ac828f"
  },
  {
    "id": 167,
    "date": "2026-05-16",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "<admin tool>: add oem_firmware_version column",
    "detail": null,
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "5b2da0bbcc"
  },
  {
    "id": 166,
    "date": "2026-05-16",
    "theme": "Email notifications",
    "impact": 3,
    "summary": "launch-signups: add source attribution + sync feature into repo",
    "detail": null,
    "benefit": "'Get notified at launch' captures every pre-launch interested visitor; CAN-SPAM compliant; double-opt-in ready.",
    "ref": "662ae497eb"
  },
  {
    "id": 165,
    "date": "2026-05-16",
    "theme": "Email notifications",
    "impact": 3,
    "summary": "launch-signups: double-opt-in flow + Resend outbound integration",
    "detail": null,
    "benefit": "'Get notified at launch' captures every pre-launch interested visitor; CAN-SPAM compliant; double-opt-in ready.",
    "ref": "b45db81a6e"
  },
  {
    "id": 375,
    "date": "2026-05-16",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "reset-to-oem.sh: restore a router to OEM stock firmware (hybrid script)",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "626ff78b52"
  },
  {
    "id": 373,
    "date": "2026-05-16",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "reset-to-oem.sh: spell out the LAN port swap in detail (port location + why LAN 1 won't work)",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "4537b85df5"
  },
  {
    "id": 372,
    "date": "2026-05-16",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "reset-to-oem.sh: correct MT6000 port layout (6 ports: WAN, WAN/LAN 1, LAN 2-4, LAN 5)",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "0d0db203f5"
  },
  {
    "id": 371,
    "date": "2026-05-16",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "reset-to-oem: align with GL.iNet's official U-Boot recovery procedure",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "6e3e63685d"
  },
  {
    "id": 370,
    "date": "2026-05-16",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "flash-openwrt-ram: inline note on the undocumented-REST risk + migration path",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "d8de20051d"
  },
  {
    "id": 315,
    "date": "2026-05-16",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "cowork: add lazy-load bootstrap for Haven workspace",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "a93e5711c6"
  },
  {
    "id": 314,
    "date": "2026-05-16",
    "theme": "Session continuity",
    "impact": 1,
    "summary": "cowork: rename bootstrap 00-START-HERE.md → MEMORY.md",
    "detail": null,
    "benefit": "Sessions resume with full context; no rediscovery, no lost decisions.",
    "ref": "538e82a947"
  },
  {
    "id": 392,
    "date": "2026-05-15",
    "theme": "Repo hygiene",
    "impact": 5,
    "summary": "Phase 2: install-haven.sh + baked default personalization (haven-0.1.10)",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "043684302f"
  },
  {
    "id": 390,
    "date": "2026-05-15",
    "theme": "Repo hygiene",
    "impact": 5,
    "summary": "Phase 2 flash-script naming: flash-openwrt-ram + flash-haven + refresh-to-virgin-openwrt",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "e74188388c"
  },
  {
    "id": 389,
    "date": "2026-05-15",
    "theme": "Repo hygiene",
    "impact": 5,
    "summary": "Phase 2 flash scripts (followup): the actual flash-haven.sh + refresh-to-virgin-openwrt.sh",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "a7c2529437"
  },
  {
    "id": 386,
    "date": "2026-05-15",
    "theme": "Product definition",
    "impact": 5,
    "summary": "Phase 2: wire D1 build-step logging into the four production scripts",
    "detail": null,
    "benefit": "Scope and language locked — every downstream decision is faster and more consistent.",
    "ref": "972a220a1e"
  },
  {
    "id": 385,
    "date": "2026-05-15",
    "theme": "Build maintenance UI",
    "impact": 5,
    "summary": "scripts: renumber D1_STEP_ORDER to match new Phase 2 <backend table>",
    "detail": null,
    "benefit": "Burn procedure lives in D1 as data, not in code. Refinement is a SQL UPDATE — every site/Claude instantly uses the new procedure.",
    "ref": "d7189c43b8"
  },
  {
    "id": 383,
    "date": "2026-05-15",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Phase 2: auto-attach to D1 build via session file + interactive start-burn",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "c972f30264"
  },
  {
    "id": 319,
    "date": "2026-05-15",
    "theme": "Wiki & documentation",
    "impact": 5,
    "summary": ": <router serial>+ ships from baked Haven firmware (decision locked 2026-05-15)",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "3d0d806e06"
  },
  {
    "id": 318,
    "date": "2026-05-15",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": ": MILESTONE — Phase 2 burn architecture complete and live-fire verified",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "6974f27a64"
  },
  {
    "id": 317,
    "date": "2026-05-15",
    "theme": "Build maintenance UI",
    "impact": 5,
    "summary": "<backend table>: rewrite for Phase 2 (23 → 19 steps, script-named actors)",
    "detail": null,
    "benefit": "Burn procedure lives in D1 as data, not in code. Refinement is a SQL UPDATE — every site/Claude instantly uses the new procedure.",
    "ref": "d6e94c0fd6"
  },
  {
    "id": 316,
    "date": "2026-05-15",
    "theme": "Wiki & documentation",
    "impact": 5,
    "summary": ": MILESTONE 22:43 — D1 logging cardinal closed; operator UX shipped",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "a557ffc02c"
  },
  {
    "id": 115,
    "date": "2026-05-15",
    "theme": "Process & discipline",
    "impact": 5,
    "summary": "MILESTONE 2026-05-15 (22:43): D1 logging complete — auto-attach, idempotent, operator-friendly",
    "detail": "Extends (Phase 2 architecture milestone). Tonight's second\npush closes the D1-logging cardinal gap and delivers an operator-\nexperience pass that makes the chain ergonomic in the real world.",
    "benefit": "Less waste, fewer back-and-forths, more shipped work per session.",
    "ref": ""
  },
  {
    "id": 114,
    "date": "2026-05-15",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "MILESTONE 2026-05-15: Phase 2 burn architecture complete and live-fire verified end-to-end",
    "detail": "2026-05-15 21:46 CDT — Dave's reaction: \"This was my vision from the\nstart.\" The Phase 2 burn architecture (committed to per is\nnow fully implemented, live-fire tested end-to-end, and operationally\nsound. <router serial> will be the first router burned under this architecture.",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 112,
    "date": "2026-05-15",
    "theme": "Architecture & data model",
    "impact": 5,
    "summary": "Architecture decision: /<router data partition> persistent partition is the SOLE data location; encrypted server-side blob is disaster-recovery only",
    "detail": "2026-05-15 — Dave's privacy stance crystallized this architecture during Phase 2 design.",
    "benefit": "/<router data partition> concept locked: customer settings survive a factory reset because they live on raw eMMC that firstboot does not touch.",
    "ref": ""
  },
  {
    "id": 391,
    "date": "2026-05-15",
    "theme": "Architecture & data model",
    "impact": 4,
    "summary": "brand-area: identity bridge from U-Boot env to <database>; cap 1-100 → 0-100",
    "detail": null,
    "benefit": "Today's design supports tomorrow's features without painful rewrites.",
    "ref": "fd7d6bb42a"
  },
  {
    "id": 384,
    "date": "2026-05-15",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "start-burn.sh: self-log step 1 success after POST /api/builds",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "a8264cbc98"
  },
  {
    "id": 382,
    "date": "2026-05-15",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "start-burn.sh: ask for --model first; auto-propose next serial from D1",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "a18f311dc2"
  },
  {
    "id": 381,
    "date": "2026-05-15",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "start-burn.sh: loop constrained-value prompts; flag REDO explicitly",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "03120a4862"
  },
  {
    "id": 380,
    "date": "2026-05-15",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "start-burn.sh: pre-fill serial prompt with readline-editable default",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "20978e0896"
  },
  {
    "id": 113,
    "date": "2026-05-15",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "<router serial> ships from a baked Haven/OpenWrt firmware image (not overlay-pushed onto stock OpenWrt)",
    "detail": "2026-05-15 — Dave: \"commit before <router serial>.\"",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 169,
    "date": "2026-05-15",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "<admin tool>: idempotent POST /api/builds — reuse in-progress build for same serial",
    "detail": null,
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "957bfd25a1"
  },
  {
    "id": 388,
    "date": "2026-05-15",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "remove vestigial 20_flash_stage_1.sh",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "8e87e228cf"
  },
  {
    "id": 387,
    "date": "2026-05-15",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "flash-haven.sh: HTTP readiness probe + station SSH key install (chain-safe)",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "7431799fb9"
  },
  {
    "id": 398,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "burn-router: CARDINAL-compliant <admin tool> logging",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "ce956dae2c"
  },
  {
    "id": 108,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Five burn-router defects exposed and fixed by user2 <router serial> live-fire",
    "detail": "user2's re-burn (2026-05-14) exposed five real defects in the burn\nautomation. All five would have hit <router serial> unaltered. All five are\nnow fixed and committed in ~/haven-station.",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 107,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "SOP gap — burn-router phase 85 captures sysupgrade -b, not full /overlay",
    "detail": "Live-fire 2026-05-14, user2 <router serial>. When the brand-area battle started,\nI needed yesterday's working baseline to diff against. The backup\ncaptured by burn-router phase 85 (`260513<router serial>-overlay-final.tar.gz`)\nwas OVERWRITTEN today at 22:00 by today's phase 85 — same filename, n…",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 106,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Brand-area JS rewrite was the root cause of multi-hour brand render battle",
    "detail": "Live-fire 2026-05-14, user2 <router serial> retrofit. The 3-line brand area\n(\"Lulhaven / Haven Navy / 2 of 100\") refused to render correctly across\n~6 distinct CSS/HTML approaches. Root cause was finally identified:",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 400,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "docs: demote BURN-GOLDEN-PROCEDURE.md to a pointer",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "931866a411"
  },
  {
    "id": 399,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "haven-0.1.7: current burn image (Lulhaven/Haven Navy brand spec baked in)",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "d93bc882d2"
  },
  {
    "id": 396,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "make-ship-ready: install the station SSH key as step 0 (self-sufficient)",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "c49bfbeee3"
  },
  {
    "id": 395,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "burn-router phase 60: robust LuCI-up check (no more grep-for-branding)",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "81a9a4a5a9"
  },
  {
    "id": 394,
    "date": "2026-05-14",
    "theme": "Build pipeline",
    "impact": 4,
    "summary": "burn fixes #4+#5: push <database> from station; 40 has idempotent fast-path",
    "detail": null,
    "benefit": "Edits flow source → live in one script. No copy-paste, no stale artifacts.",
    "ref": "a2b5fcc02f"
  },
  {
    "id": 324,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "builds: <backend table> table — the burn checklist as D1 data, not code",
    "detail": null,
    "benefit": "Burn procedure lives in D1 as data, not in code. Refinement is a SQL UPDATE — every site/Claude instantly uses the new procedure.",
    "ref": "5058091c8b"
  },
  {
    "id": 111,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Station laptop split-DNS: route *.lulhaven.com to user2, internet on Wi-Fi",
    "detail": "2026-05-14 23:48 — final resolution of tonight's my.lulhaven.com NXDOMAIN\nconfusion. user2 was never broken. The station laptop test environment\nwas the obstacle.",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 110,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Skipping my.lulhaven.com verification has bitten Haven repeatedly",
    "detail": "2026-05-14 23:27 — Dave called out that DNS does NOT serve my.lulhaven.com,\nright after I closed user2 <router serial> build #3 with step 16 (QC-5 visual\nverification) marked success. I had claimed \"my.lulhaven.com redirects\nto Haven admin\" without ever testing it.",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 109,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Argon primary color: per-model UCI bake-in (Navy = #1a237e)",
    "detail": "Dave 2026-05-14: bake navy primary color into every Haven Navy unit.",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 322,
    "date": "2026-05-14",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "<backend table>: restore all 4 prompted wireless/wired flip steps",
    "detail": null,
    "benefit": "Burn procedure lives in D1 as data, not in code. Refinement is a SQL UPDATE — every site/Claude instantly uses the new procedure.",
    "ref": "a287a91fd4"
  },
  {
    "id": 320,
    "date": "2026-05-14",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "<backend table> 16: bake my.lulhaven.com verification requirement; -#112",
    "detail": null,
    "benefit": "Burn procedure lives in D1 as data, not in code. Refinement is a SQL UPDATE — every site/Claude instantly uses the new procedure.",
    "ref": "34d82c1319"
  },
  {
    "id": 171,
    "date": "2026-05-14",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "<admin tool>: wire addresses_issue column through worker + UI",
    "detail": null,
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "101e6c318b"
  },
  {
    "id": 170,
    "date": "2026-05-14",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "<admin tool>: POST /api/builds seeds steps from D1 <backend table>",
    "detail": null,
    "benefit": "Burn procedure lives in D1 as data, not in code. Refinement is a SQL UPDATE — every site/Claude instantly uses the new procedure.",
    "ref": "b034de59bb"
  },
  {
    "id": 323,
    "date": "2026-05-14",
    "theme": "Build maintenance UI",
    "impact": 2,
    "summary": "<backend table>: fix procedure_refs that pointed at the demoted doc",
    "detail": null,
    "benefit": "Burn procedure lives in D1 as data, not in code. Refinement is a SQL UPDATE — every site/Claude instantly uses the new procedure.",
    "ref": "6b44c057cc"
  },
  {
    "id": 397,
    "date": "2026-05-14",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "40_install_ssh_key.sh: plain ssh is the primary method",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "659636c617"
  },
  {
    "id": 393,
    "date": "2026-05-14",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "brand area: 3-line render (Lulhaven / Haven {model} / N of 100) + navy primary",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "fd3d7a2b08"
  },
  {
    "id": 325,
    "date": "2026-05-14",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "builds schema: add build_steps.addresses_issue column",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "3417f141aa"
  },
  {
    "id": 321,
    "date": "2026-05-14",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "release: 260513<router serial> (released_by dave)",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "c492ed9016"
  },
  {
    "id": 405,
    "date": "2026-05-13",
    "theme": "Firmware & overlay",
    "impact": 5,
    "summary": "docs: golden procedure Phase 0.2 — Claude prompts for wireless-default",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "0be99c48db"
  },
  {
    "id": 401,
    "date": "2026-05-13",
    "theme": "Build maintenance UI",
    "impact": 5,
    "summary": "procedure: CARDINAL Step 0.0 — open <admin tool> row before anything else",
    "detail": null,
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "95ebbf2fdc"
  },
  {
    "id": 105,
    "date": "2026-05-13",
    "theme": "LuCI / UI",
    "impact": 5,
    "summary": "Argon brand-overlay path bug — fixed in haven-0.1.4",
    "detail": "Discovered during user2 <router serial> retrofit (2026-05-13): our haven-overlay shipped brand templates at /usr/share/ucode/luci/template/themes/argon/ (ucode path), but vendored Argon v2.3.2 reads.htm Lua templates from /usr/lib/lua/luci/view/themes/argon/. Result: the 'Navy / N of 10…",
    "benefit": "Customer interacts with this surface daily; every refinement compounds the experience.",
    "ref": ""
  },
  {
    "id": 413,
    "date": "2026-05-13",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "shortname: switch dnsmasq from address= to interface-name= (IP-change resilient)",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "9c8c1d4ded"
  },
  {
    "id": 409,
    "date": "2026-05-13",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "overlay: actually include the bleed-thru bg image (was phantom-referenced)",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "76468ace24"
  },
  {
    "id": 406,
    "date": "2026-05-13",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "docs: golden burn procedure — single authoritative source",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "7a6483cac0"
  },
  {
    "id": 404,
    "date": "2026-05-13",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "docs: bake wireless/wired flips into procedure at every cable-touch point",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "2944273695"
  },
  {
    "id": 403,
    "date": "2026-05-13",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "docs: wireless/wired flip is a prompted step, not silent",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "70f2df58e0"
  },
  {
    "id": 326,
    "date": "2026-05-13",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "+ user2 <router serial> burn-log snapshot",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "58f2200b0a"
  },
  {
    "id": 172,
    "date": "2026-05-13",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "index: 'filter porn' -> 'filter adult content'",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "0652c53196"
  },
  {
    "id": 104,
    "date": "2026-05-13",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Vendor luci-theme-argon.ipk into ImageBuilder packages/ — fixes 3-times-recurring argon-missing failure",
    "detail": "Dave 2026-05-13 (user2 <router serial> burn, 3rd time hitting this): 'Three times now (at least). What does it take to document this and deal with it the first effort next time?'",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 103,
    "date": "2026-05-13",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Shortname DNS resolves dynamically via interface-name= (survives customer LAN-IP change)",
    "detail": "Dave 2026-05-13 before user2's burn: 'one of the most frequently used options when setting up a router is to change its IP address. so i'm wondering if there's some way we can, in the boot-up of the router, restore that dns listing to whatever the current ip address is for the ro…",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 411,
    "date": "2026-05-13",
    "theme": "LuCI / UI",
    "impact": 3,
    "summary": "station: vendor luci-theme-argon.ipk + refresh-vendor-packages.sh",
    "detail": null,
    "benefit": "Customer interacts with this surface daily; every refinement compounds the experience.",
    "ref": "d4a06efcba"
  },
  {
    "id": 407,
    "date": "2026-05-13",
    "theme": "LuCI / UI",
    "impact": 3,
    "summary": "haven-0.1.6: separate Haven page bg from argon login-screen scan path",
    "detail": null,
    "benefit": "Customer interacts with this surface daily; every refinement compounds the experience.",
    "ref": "0bdf0dec6f"
  },
  {
    "id": 410,
    "date": "2026-05-13",
    "theme": "LuCI / UI",
    "impact": 2,
    "summary": "haven-0.1.4: fix argon brand overlay path, add pre-flight verifier",
    "detail": null,
    "benefit": "Customer interacts with this surface daily; every refinement compounds the experience.",
    "ref": "92cf4a79a2"
  },
  {
    "id": 412,
    "date": "2026-05-13",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "station: bake <router serial> fixes (passwords, manifest, scp -O, SSH stage-1, password-set check)",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "fccff7d321"
  },
  {
    "id": 408,
    "date": "2026-05-13",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "haven-0.1.5: brand-CSS specificity fix + drop mobile_game_ads default",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "c42aac3031"
  },
  {
    "id": 402,
    "date": "2026-05-13",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "brand: 3-line area is \"Lulhaven / Haven Navy / N of 100\" (not Haven/Navy)",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "375bcd833c"
  },
  {
    "id": 101,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Burn-procedure automation architecture — 10-min target, scaffolding shipped 2026-05-13",
    "detail": "Ultrathink session 2026-05-13. Dave: 'we need to improve the design of automation with regard to our router burning process. This needs to become a ten minute task with no user interaction.'",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 100,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Haven shortname pattern — haven.navyblue / haven.olivegreen per model + dual-purpose landing page",
    "detail": "Live-fire 2026-05-13. Dave wanted a memorable shortname customers can type to reach Haven LuCI without remembering the router IP. Iterated through myhaven.com -> my.haven -> haven.navy -> haven.navyblue. Final choice: haven.navyblue (Navy) / haven.olivegreen (Olive).",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 90,
    "date": "2026-05-12",
    "theme": "Product definition",
    "impact": 5,
    "summary": "Future SKU idea — 'Haven Travel' mobile app (Android VpnService / iOS Network Extension)",
    "detail": "Surfaced 2026-05-12 while discussing whether Android is a viable router OS. Conclusion: Android is the wrong platform for the home router but the RIGHT platform for a complementary travel/mobile SKU. Dave: 'log the travel app idea for later.'",
    "benefit": "Scope and language locked — every downstream decision is faster and more consistent.",
    "ref": ""
  },
  {
    "id": 86,
    "date": "2026-05-12",
    "theme": "Demo page",
    "impact": 5,
    "summary": "Demo UX overhaul 2026-05-12 — collapsed-by-default + accordion + Social Media landing + cache-busting",
    "detail": "Dave 2026-05-12 incremental UX requests, all deployed.",
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": ""
  },
  {
    "id": 85,
    "date": "2026-05-12",
    "theme": "Product definition",
    "impact": 5,
    "summary": "Haven subscription price set to $4/month 2026-05-12 (was placeholder ~$2/mo)",
    "detail": "Dave 2026-05-12 in marketing copy: '$4/mo'.",
    "benefit": "Scope and language locked — every downstream decision is faster and more consistent.",
    "ref": ""
  },
  {
    "id": 77,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Two-line 'Haven/Navy' sidebar baked via Argon ucode template overrides",
    "detail": "Live-fire 2026-05-12 (user1 <router serial> polish). First attempt to put Navy under Haven used.brand-text::after CSS in cascade.css — didn't render on authenticated admin pages. Root cause: header.ut emits <a class='brand'>{{ hostname }}</a> (bare text, no inner span). The.brand-text …",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 76,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Haven LuCI page now has demo's bleed-thru frosted-glass look (Haven page only)",
    "detail": "Live-fire 2026-05-12 (user1 <router serial>). Dave wanted the website demo's frosted-glass effect on the router. Scope: Haven page only (other LuCI pages stay clean Argon-default for admin-table readability). Implementation: (1) re-export lulhaven.com's 1MB dock-gnome PNG to 191KB JPEG a…",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 75,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Haven sidebar shows Haven + model as two lines via cascade.css ::after pseudo-element",
    "detail": "Live-fire 2026-05-12 (user1 <router serial> post-burn brand polish). Dave wanted the LuCI sidebar to show 'Haven Navy' on two lines, Navy smaller than Haven. The brand element is <a class='brand'><span class='brand-text'>{hostname}</span></a>. Hostname is single-line plain text, so a CSS…",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 74,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "LuCI/Argon sidebar header comes from system hostname — Haven default added to uci-defaults",
    "detail": "Live-fire 2026-05-12 (user1 <router serial> post-burn UI check). Dave spotted the LuCI sidebar still showing 'OpenWrt' on user1's router despite the Argon theme being active. Root cause: LuCI/Argon use system.@system[0].hostname as the sidebar header text. Stock OpenWrt ships with hostna…",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 73,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "user1 <router serial> snapshot promoted to founding NAV-haven-0.1.0 golden master (QC-5 38/38)",
    "detail": "Live-fire 2026-05-12. user1's <router serial> golden snapshot promoted to <directory> as the founding golden master for the NAV/haven-0.1.0 era. QC-5 result: 38/38 PASS. Reusable check script written: <script> — runs against a…",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 72,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "golden-smoke-test.sh fixes: station SSH key + BusyBox tar -X for exclude patterns",
    "detail": "Live-fire 2026-05-12 (user1 <router serial> Step 16). Two fixes shipped to ~/haven-station/scripts/golden-smoke-test.sh: (1) bare 'ssh' failed because the haven-station key (~/haven-station/credentials/id_ed25519) isn't in operator's default SSH identity set — sibling scripts already use…",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 71,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "WireGuard install pattern: keypair generated at burn, stored at <config directory>, public key in <settings table>",
    "detail": "Live-fire 2026-05-12 (user1 <router serial> burn day 2). VPN tool installation pattern: (1) baked-in packages — kmod-wireguard, wireguard-tools, luci-proto-wireguard already in haven-0.1.0 ImageBuilder image. (2) Smoke test: <shell command>",
    "benefit": "Reproducible WireGuard server setup: every router we burn ships with a unique keypair, no per-customer manual provisioning.",
    "ref": ""
  },
  {
    "id": 430,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "haven-overlay: add 30-haven-hostname uci-defaults — sidebar reads 'Haven' OOB",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "9697b6c8f0"
  },
  {
    "id": 428,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "haven-overlay: add 45-haven-brand-css — sidebar shows 'Haven' + model as two lines",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "66924b8876"
  },
  {
    "id": 427,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "haven-overlay: bleed-thru background on Haven LuCI page (matches demo)",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "52727af93a"
  },
  {
    "id": 426,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "haven-overlay: bake the two-line 'Haven / Navy' sidebar into the image",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "8a2080e17f"
  },
  {
    "id": 425,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "haven-overlay: cat-list collapses by default + accordion (Ctrl=additive)",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "a966af2120"
  },
  {
    "id": 424,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "haven-overlay: land Haven page with Social & Communication open",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "0bc4742062"
  },
  {
    "id": 423,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "haven-overlay: add optional 'N of 100' unit line under model in brand",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "31ff7e3362"
  },
  {
    "id": 422,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "haven-overlay: per-model shortname (haven.navyblue / haven.olivegreen)",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "d7ad159895"
  },
  {
    "id": 420,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "haven-overlay: add my.lulhaven.com as primary shortname (HTTPS-ready)",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "3002402011"
  },
  {
    "id": 419,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "station: add customer-experience-test.sh — unit-test customer landing flow",
    "detail": null,
    "benefit": "Unit-tests the customer's actual landing experience before shipping — first impression is verified, not assumed.",
    "ref": "66aefa16bc"
  },
  {
    "id": 418,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "customer-experience-test: add 8 WiFi checks via SSH to router",
    "detail": null,
    "benefit": "Unit-tests the customer's actual landing experience before shipping — first impression is verified, not assumed.",
    "ref": "33068e95b0"
  },
  {
    "id": 417,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "station: add make-ship-ready.sh — one command from flashed router to ship",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "2384dd7b21"
  },
  {
    "id": 416,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "station: burn-router.sh scaffolding + lib + preflight + README",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "2ce36729db"
  },
  {
    "id": 329,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "brand scrub (Brass/Steel → Olive/Navy) + wiki updates from user1 <router serial> burn",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "b59285c776"
  },
  {
    "id": 328,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "data: ship user1 <router serial> day-2 wiki + golden snapshot + $4/mo pricing",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "2a04729a2f"
  },
  {
    "id": 327,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "wiki: #103 burn-automation architecture + #104 operator-physical philosophy",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "69076b8af5"
  },
  {
    "id": 102,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Burn automation philosophy — operator-physical only; everything else scripted",
    "detail": "Dave 2026-05-13 ultrathink: '10-minute task with no user interaction.'",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 99,
    "date": "2026-05-12",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Android-router / Haven OS conversation archive — 2026-05-12 thread index",
    "detail": "Comprehensive index of the Android-router / Haven OS conversation thread on 2026-05-12. The thread began as a 'complacency check' on platform assumptions and crystallized into a multi-phase strategic vision for Haven OS as a long-term differentiator.",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": ""
  },
  {
    "id": 95,
    "date": "2026-05-12",
    "theme": "Architecture & data model",
    "impact": 4,
    "summary": "Haven OS architectural discipline — design for future Android versions to drop in and compile",
    "detail": "Dave 2026-05-12: 'If we are smart, we could design such that future Android versions would plug in and compile.' Architectural discipline addendum to / #96.",
    "benefit": "Today's design supports tomorrow's features without painful rewrites.",
    "ref": ""
  },
  {
    "id": 94,
    "date": "2026-05-12",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Haven OS addendum — Android Security Bulletin as our drop + the '1983 argument' reframe",
    "detail": "Dave 2026-05-12 added two points that significantly strengthen the Haven OS case. Logged here as addendum.",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": ""
  },
  {
    "id": 93,
    "date": "2026-05-12",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Haven OS staging plan — OpenWrt now → Pi5 → Haven OS over 18-36 months",
    "detail": "Staging discipline for the Haven OS proposal. Captured 2026-05-12. Each phase has its own value-delivery and validates the next.",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": ""
  },
  {
    "id": 92,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Developer experience pain on Linux/OpenWrt is real and dated — forcing function for Haven OS exploration",
    "detail": "Dave 2026-05-12: 'I was really disappointed with the dated experience that developing in Linux represented. The most recent language we picked up at work was Power Apps. Five years ago, it was Swift. I think you can imagine my dismay.'",
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": ""
  },
  {
    "id": 91,
    "date": "2026-05-12",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Haven OS concept — AOSP-fork purpose-built for routers, proprietary stack, first-mover moat",
    "detail": "Strategic vision Dave articulated 2026-05-12. Re-opens an earlier (pre-archive) conversation about Android-as-router-platform. Concept refined this session.",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": ""
  },
  {
    "id": 89,
    "date": "2026-05-12",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Session archive 2026-05-12 — user1 burn finish + brand polish + VPN architecture pivot + marketing rewrite",
    "detail": "Comprehensive index of the 2026-05-12 working session. Covers user1 <router serial> ship preparation, brand/UI polish, market research, website rewrite, VPN architecture re-think.",
    "benefit": "Filtering follows household members off home Wi-Fi — closes the cellular bypass that defeats most competitors.",
    "ref": ""
  },
  {
    "id": 82,
    "date": "2026-05-12",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Haven distributed-VPN strategy pivot: wholesale-partner exit + smart routing replaces peer-mesh exit",
    "detail": "Discussion 2026-05-12 (continuation of exit-node analysis). Dave probed three angles in sequence: (1) hybrid VPN to commercial provider, (2) corporate/wholesale pricing, (3) preservation of the original 'no bandwidth penalty' dream.",
    "benefit": "Filtering follows household members off home Wi-Fi — closes the cellular bypass that defeats most competitors.",
    "ref": ""
  },
  {
    "id": 81,
    "date": "2026-05-12",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Distributed VPN exit-node analysis — A's traffic via B's Haven, with two complications that force a re-think",
    "detail": "Discussion 2026-05-12. Dave's framing: 'If A is sending packets to a website served by B (B's Haven hosts a VPN endpoint), packets go encrypted A->B, decrypted at B, leave B's LAN unencrypted, and something triggers at the NSA, talk me through it.'",
    "benefit": "Filtering follows household members off home Wi-Fi — closes the cellular bypass that defeats most competitors.",
    "ref": ""
  },
  {
    "id": 79,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Third sidebar line 'N of 100' is hardwired at burn (empty default + sed)",
    "detail": "Dave 2026-05-12: 'Can we just hardwire that at burn?' chose hardwiring over readfile() for the unit-number line because (1) the value never changes per-router so runtime IO is wasted, (2) simpler to inspect. Templates ship with 'const unit_display = '';' (empty). Burn procedure d…",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 78,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Ship policy change 2026-05-12: user1 ships with mobile_game_ads pre-blocked (not clean)",
    "detail": "Dave 2026-05-12: 'We will filter all mobile game ads on user1's Haven before delivery.' Override of the 'user1 ships clean' policy that had been in effect since the burn started. Implementation: 10 INSERT INTO prefs rows (category_key='mobile_game_ads', item_key in {google_admob,…",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 414,
    "date": "2026-05-12",
    "theme": "Brand & packaging",
    "impact": 3,
    "summary": "station: ssh-key install (step 40) + pack-in card PDF (step 99)",
    "detail": null,
    "benefit": "Customer's first 5 minutes go right — the card answers the only four questions they have (Wi-Fi password, login URL, login, support).",
    "ref": "79cca903df"
  },
  {
    "id": 179,
    "date": "2026-05-12",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "demo: three-line title 'Haven / Navy / by Lulhaven · Unit 001 of 100'",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "612cd573e3"
  },
  {
    "id": 178,
    "date": "2026-05-12",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "demo: drop model-specific 'Navy' line from title",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "8483acd444"
  },
  {
    "id": 177,
    "date": "2026-05-12",
    "theme": "Demo page",
    "impact": 3,
    "summary": "demo: super-categories collapse by default + accordion on click",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "cc7157dfec"
  },
  {
    "id": 175,
    "date": "2026-05-12",
    "theme": "Demo page",
    "impact": 3,
    "summary": "demo: land with Social Media selected + Social & Communication open",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "737e08808e"
  },
  {
    "id": 174,
    "date": "2026-05-12",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "index: hero pillar strip + 'Why Haven' competitive section",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "7407e4d1d6"
  },
  {
    "id": 98,
    "date": "2026-05-12",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "Tramp video addendum — IBM PC ran Charlie Chaplin/Tramp ads 1981-1983; our spot pays direct callback",
    "detail": "Dave 2026-05-12 surfaces a critical piece of context for the Little Tramp video concept :\n '1983 IBM marketing featured the tramp.'",
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": ""
  },
  {
    "id": 97,
    "date": "2026-05-12",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "Tramp video addendum — add Reagan ('Ronnie Raygun') to 1983 montage as cultural marker",
    "detail": "Dave 2026-05-12 adds 'Ronnie Raygun' to the 1983 montage in the Little Tramp video concept.",
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": ""
  },
  {
    "id": 96,
    "date": "2026-05-12",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "Marketing video concept — Little Tramp + 1983 montage + 'How old is your router?'",
    "detail": "Dave 2026-05-12 video concept. Sharp execution of the 1983-argument marketing pillar.",
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": ""
  },
  {
    "id": 88,
    "date": "2026-05-12",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "Customer-facing copy frames Haven as curator, never leads with a single upstream source name",
    "detail": "Dave 2026-05-12 caught a draft 'Why Haven' card that led with 'Backed by the <data source> blacklist...' Dave's correction: 'We had a blacklist before we added <data source>. Isn't <data source> just one of our blacklist sources?'",
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": ""
  },
  {
    "id": 84,
    "date": "2026-05-12",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "lulhaven.com index.html — hero pillars + 'Why Haven' competitive section added 2026-05-12",
    "detail": "Dave 2026-05-12: 'Our web page was developed in total ignorance of any competition. We need to address our strengths from the larger market context.'",
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": ""
  },
  {
    "id": 83,
    "date": "2026-05-12",
    "theme": "Brand & packaging",
    "impact": 3,
    "summary": "Brand scrub 2026-05-12 — archaic Brass/Steel/Blue removed; active brands are Navy and Olive",
    "detail": "Dave 2026-05-12: 'Brands are Navy and Olive at this time. Scrub archaic brand references.'",
    "benefit": "First customer impression before they even plug the router in — sets the trust baseline.",
    "ref": ""
  },
  {
    "id": 80,
    "date": "2026-05-12",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "Consumer content-filter market data 2026 — pricing, competitors, Haven positioning headroom",
    "detail": "Research run 2026-05-12 (Dave SERP for 'consumer content filters' + 'single-click consumer content filter market value'). See sources at the end.",
    "benefit": "Market data behind the $4/month price point. Competitors charge $70–100/yr; Haven undercuts and keeps working if the customer cancels.",
    "ref": ""
  },
  {
    "id": 421,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 2,
    "summary": "haven-overlay: fix redirect path — Haven is at /admin/haven, not /admin/services/haven",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "b4245d86e9"
  },
  {
    "id": 429,
    "date": "2026-05-12",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "station: brand scrub (Brass→Olive, BRS→OLV) + golden-smoke/qc5 hardening",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "52cf689fc9"
  },
  {
    "id": 415,
    "date": "2026-05-12",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "station: GL.iNet 4.x JSON-RPC client + scripts/20_flash_stage_1.sh",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "e1d9da9086"
  },
  {
    "id": 176,
    "date": "2026-05-12",
    "theme": "Demo page",
    "impact": 1,
    "summary": "demo: cache-bust js/* via ?v=20260512b query string",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "1aae137266"
  },
  {
    "id": 87,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 1,
    "summary": "Image extraction for user1 — sysupgrade -b backup, what it captures, what it doesn't",
    "detail": "Dave 2026-05-12 asked to 'pull an image' from user1's router. Investigated what 'pull an image' realistically means on OpenWrt.",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 435,
    "date": "2026-05-11",
    "theme": "Milestones",
    "impact": 5,
    "summary": "Initial commit — Haven Build Station consolidated tree",
    "detail": null,
    "benefit": "Anchor points for 'we got here' — orientation in a long project.",
    "ref": "ff9a46d233"
  },
  {
    "id": 431,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "build-haven-image: live-fire bake-in updates from user1 <router serial> burn",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "2de69c6f84"
  },
  {
    "id": 70,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Argon theme + uci-defaults trigger now baked into haven-0.1.0",
    "detail": "Live-fire 2026-05-11. luci-theme-argon added to PACKAGES[] in build-haven-image.sh. <config file> sets luci.main.mediaurlbase=/luci-static/argon on first boot. Both shipped in haven-0.1.0. user1's router showed argon theme without manual interventi…",
    "benefit": "LuCI gets a modern, branded look — customers don't feel like they're using a 2010-vintage admin UI.",
    "ref": ""
  },
  {
    "id": 69,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "haven-0.1.0 bake-in now includes luci-lua-runtime + luci-compat + lsqlite3 + argon (live-fire updates)",
    "detail": "Live-fire 2026-05-11. Originally haven-0.1.0 ImageBuilder shipped without LuCI Lua runtime — Haven LuCI menu returned 'Runtime exception / No Lua runtime installed' because LuCI 24.10+ defaults to ucode. Post-flash opkg-install fix: luci-lua-runtime + luci-compat + lsqlite3. Also…",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 68,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "identity table is append-only — created_datetime only, no modified_datetime",
    "detail": "Live-fire 2026-05-11. Tried INSERT OR REPLACE INTO identity (key, value, modified_datetime)... and got 'table identity has no column named modified_datetime'. By design: identity is immutable per-serial — serial doesn't change after burn. Schema: identity(key TEXT PK, value TEXT…",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 67,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "nft DoH set names are doh_v4 / doh_v6 — NOT blocked_v4 (inspection gotcha)",
    "detail": "Live-fire 2026-05-11. apply.lua says '<bypass mitigation> active (16 IPs)' but 'nft list set inet haven_doh blocked_v4' returns nothing because the set isn't named blocked_v4. Actual names: table inet haven_doh has set doh_v4 (10 IPv4 endpoints: 1.0.0.1, 1.1.1.1, 8.8.8.8, 8.8.4.4, 9.9.9…",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 66,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "configure-user1.sh requires identity row pre-seeded — fails 'could not read serial from <database>'",
    "detail": "Live-fire 2026-05-11. configure-user1.sh starts with: serial = sqlite3... SELECT value FROM identity WHERE key='serial'. If identity is empty (<database> schema initialized but no rows), errors with 'could not read serial — has push-haven.sh run yet?' Tonight I had to manually INS…",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 65,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "NetworkManager static-IP override on burn-slot NIC blocks GL.iNet OEM-IP reach (NC#1 root cause)",
    "detail": "Live-fire 2026-05-11. NC#1 in build_id=2: Step 3 couldn't ping GL.iNet at 192.168.8.1 because dev workstation's 'Wired connection 1' (USB-Ethernet enx0050b6ef2e37) had a static 192.168.1.4 override layered on DHCP. NIC was on 192.168.1.x while GL.iNet stock DHCP serves 192.168.8.…",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 64,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "prefs table schema: (category_key, item_key, value) — NOT (category, item_type, state)",
    "detail": "Live-fire 2026-05-11 (user1 burn QC-4). I assumed prefs columns were (category, item_type, state) and got 'no such column: category'. Actual schema: prefs(category_key TEXT, item_key TEXT, value TEXT CHECK IN ('block','delayed','off'), source TEXT, created/modified/deleted_dateti…",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 63,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "push-haven.sh needs rewrite for ImageBuilder-collapsed procedure",
    "detail": "Live-fire 2026-05-11. haven-0.1.0 ImageBuilder image ALREADY contains /usr/share/haven, /usr/lib/lua, luci-app-haven, lsqlite3, luci-lua-runtime, luci-compat. push-haven.sh's purpose (deploy Haven files, install sqlite3-cli, init <database> schema, seed identity+settings) is largel…",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 62,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "GL.iNet 4.8.x image verifier rejects factory.bin AND initramfs.bin — accepts stock OpenWrt sysupgrade.bin",
    "detail": "Live-fire 2026-05-11 (user1 <router serial>). GL.iNet's web UI firmware-update tool runs an image-verifier that rejected both the OpenWrt factory.bin and the OpenWrt initramfs.bin with 'firmware not recognized' style errors. The verifier DID accept the standard openwrt-mediatek-filogic-g…",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 61,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Middleware over-gated /api/* blocked router feed fetches (FIXED 8c65dc2)",
    "detail": "Live-fire 2026-05-11. user1's router at first boot returned 401 on /api/<database>, /api/feed-delta.db, /api/update.json, /api/feed.json — the entire subscription feed delivery surface — because the Cloudflare Pages middleware gated ALL /api/* paths except /api/auth. Routers have no…",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 60,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "LIVE-FIRE FINDING #9: Lua-based LuCI app needs 3 packages bake-in didn't include",
    "detail": "During user1 <router serial> burn 2026-05-11 22:25-22:42 CDT — first browser test of LuCI after sysupgrade to haven-0.1.0. Three sequential 'package missing from bake-in' errors surfaced, each fixed by opkg install + uhttpd restart.",
    "benefit": "A real burn surfaced a real flaw — fixed at the procedure level before any customer hits it.",
    "ref": ""
  },
  {
    "id": 58,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "PROCEDURE BUG (caught by Dave): flash-stage-1.sh resolves initramfs role, should resolve factory role for stock→OpenWrt",
    "detail": "Discovered 2026-05-11 22:00 CDT during user1 <router serial> burn. Dave caught the bug by asking 'first file is a factory file, no?' after the GL.iNet verifier rejected the initramfs image.",
    "benefit": "A real burn surfaced a real flaw — fixed at the procedure level before any customer hits it.",
    "ref": ""
  },
  {
    "id": 57,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "LIVE-FIRE FINDING #8: GL.iNet 4.8.x admin uses JSON-RPC at /rpc, not REST; flash-stage-1 needs rewrite",
    "detail": "Discovered 2026-05-11 21:57 CDT during user1 <router serial> burn — first live exercise of flash-stage-1.sh against actual stock GL.iNet hardware.",
    "benefit": "A real burn surfaced a real flaw — fixed at the procedure level before any customer hits it.",
    "ref": ""
  },
  {
    "id": 56,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "PROCEDURE UPDATE: nmcli DHCP-refresh + port-22 probe must be part of Step 3",
    "detail": "Discovered 2026-05-11 21:00-21:30 CDT during user1 <router serial> burn. Two procedural gaps in Step 3 as currently written, both surfaced under real conditions.",
    "benefit": "A real burn surfaced a real flaw — fixed at the procedure level before any customer hits it.",
    "ref": ""
  },
  {
    "id": 55,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "LIVE-FIRE FINDING #7: Haven sticker/paint obscures MT6000 LED indicator",
    "detail": "Discovered 2026-05-11 ~21:00 CDT during user1 <router serial> burn prep. While running step 3, observed no traffic on the USB-Ethernet adapter for user1's freshly-customized router. Dave (operator) initially suspected the router was damaged during the top-cover removal for paint applicat…",
    "benefit": "A real burn surfaced a real flaw — fixed at the procedure level before any customer hits it.",
    "ref": ""
  },
  {
    "id": 53,
    "date": "2026-05-11",
    "theme": "Firmware & overlay",
    "impact": 5,
    "summary": "MILESTONE: first Haven custom OpenWrt image built (haven-0.1.0, NAV)",
    "detail": "After 7 failed source-build attempts (each surfacing a different fork-drift bug — -54), pivoted to OpenWrt 24.10.4 ImageBuilder. First Haven custom image built successfully 2026-05-11 20:27 CDT, wall time 27 seconds.",
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": ""
  },
  {
    "id": 52,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "LIVE-FIRE FINDING #6: wg-tools has been broken in openwrt-dev fork since at least 2026-02-26",
    "detail": "Per Dave's question 2026-05-11 20:14: when was wg-tools last successfully integrated in this fork?",
    "benefit": "A real burn surfaced a real flaw — fixed at the procedure level before any customer hits it.",
    "ref": ""
  },
  {
    "id": 51,
    "date": "2026-05-11",
    "theme": "Product definition",
    "impact": 5,
    "summary": "PRODUCT REQUEST: 'burn_router' single-command CLI for remote build stations",
    "detail": "Dave 2026-05-11 product directive: a one-word command that runs the whole burn end-to-end without operator interaction.",
    "benefit": "Scope and language locked — every downstream decision is faster and more consistent.",
    "ref": ""
  },
  {
    "id": 50,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "LIVE-FIRE FINDING #5: OpenWrt 24.10.4 musl byteswap.h + GCC 14.3 = -Werror=parentheses landmine",
    "detail": "OpenWrt 24.10.4 ships a musl libc + GCC 14.3.0 toolchain. musl's <byteswap.h> defines:",
    "benefit": "A real burn surfaced a real flaw — fixed at the procedure level before any customer hits it.",
    "ref": ""
  },
  {
    "id": 49,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "LIVE-FIRE FINDING #4: OpenWrt host CMake variable is CMAKE_HOST_OPTIONS, not HOST_CMAKE_OPTIONS",
    "detail": "During fwtool fix-up (build #4 after 's pin + CMake policy minimum), the policy-version flag I added to HOST_CMAKE_OPTIONS didn't propagate to the cmake invocation. The build #4 log showed the cmake command with no -DCMAKE_POLICY_VERSION_MINIMUM=3.5 flag.",
    "benefit": "A real burn surfaced a real flaw — fixed at the procedure level before any customer hits it.",
    "ref": ""
  },
  {
    "id": 48,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "LIVE-FIRE FINDING #3: fwtool — pinned back to 2019-11-12 + added CMAKE_POLICY_VERSION_MINIMUM=3.5",
    "detail": "Build #2 (post wg-tools fix) surfaced this. Pattern continues: openwrt-dev fork bumped fwtool from 2019-11-12 to 2025-10-03 (commit 67a7e9a9c4); the newer fwtool source includes <byteswap.h> from musl, and musl's __bswap_32() has unparenthesized operator-precedence expressions th…",
    "benefit": "A real burn surfaced a real flaw — fixed at the procedure level before any customer hits it.",
    "ref": ""
  },
  {
    "id": 47,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "LIVE-FIRE FINDING: wireguard-tools 1.0.20260223 incompat with OpenWrt 24.10.4 kernel headers; pinned back to 1.0.20250521",
    "detail": "Discovered 2026-05-11 19:53 CDT during user1 <router serial> burn prep, on the first attempt to build Haven custom OpenWrt image with wireguard-tools baked in.",
    "benefit": "A real burn surfaced a real flaw — fixed at the procedure level before any customer hits it.",
    "ref": ""
  },
  {
    "id": 46,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "LIVE-FIRE FINDING: kmod-iptunnel is HIDDEN=1 in OpenWrt 24.10.4 — pulled in transitively only",
    "detail": "Followup to. Investigated why defconfig stripped kmod-iptunnel even though it appears in package/kernel/linux/modules/netsupport.mk. Answer: that KernelPackage definition has HIDDEN:=1, meaning the package can only be auto-selected by another package that depends on it (…",
    "benefit": "A real burn surfaced a real flaw — fixed at the procedure level before any customer hits it.",
    "ref": ""
  },
  {
    "id": 45,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "LIVE-FIRE FINDING: kmod names drift vs OpenWrt 24.10.4 package catalog",
    "detail": "Discovered 2026-05-11 19:30 CDT while preparing user1's <router serial> burn — 's bake-in package names were written aspirationally and some don't resolve against the actual OpenWrt 24.10.4 package catalog. The configure script's defconfig pass surfaced six mismatches:",
    "benefit": "A real burn surfaced a real flaw — fixed at the procedure level before any customer hits it.",
    "ref": ""
  },
  {
    "id": 54,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Recipient queue update: user2 queued as <router serial>; YouTube1 slips to <router serial>+",
    "detail": "Dave 2026-05-11 20:32 CDT: 'After user1 comes user2.'",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 44,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Build station consolidated under ~/haven-station/ — self-contained, migratable tree",
    "detail": "Per Dave 2026-05-11: all router-burning resources moved into one distinct tree at ~/haven-station/. Nothing else lives in that path. Designed for clean migration to other build stations (Southern Missouri etc.).",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": ""
  },
  {
    "id": 43,
    "date": "2026-05-11",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Build-station prep landed: image cache + manifest + fetch + preflight scripts",
    "detail": "Per Dave 2026-05-11 (after the burning-strategy discussion + OS-portability question): prepped two of the high-value items from that analysis — image cache + preflight script — and structured them so a remote station (Southern Missouri etc.) can bootstrap from clean with three co…",
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": ""
  },
  {
    "id": 184,
    "date": "2026-05-11",
    "theme": "Demo page",
    "impact": 3,
    "summary": "demo: drop dead localStorage haven_mode write; demo persistence is cookie-only",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "2faf150e04"
  },
  {
    "id": 59,
    "date": "2026-05-11",
    "theme": "Process & discipline",
    "impact": 3,
    "summary": "PROCEDURE FOUND (working path): two-step flash for stock GL.iNet 4.8 → Haven",
    "detail": "Established by user1 <router serial> burn 2026-05-11 22:00-22:15 CDT. The working path from stock GL.iNet 4.8.x → Haven is a TWO-STEP sysupgrade:",
    "benefit": "Less waste, fewer back-and-forths, more shipped work per session.",
    "ref": ""
  },
  {
    "id": 41,
    "date": "2026-05-11",
    "theme": "Demo page",
    "impact": 3,
    "summary": "Demo persistence audit: cookie-only confirmed; one dead localStorage write removed",
    "detail": "Audit 2026-05-11 21:55 CDT, prompted by Dave's concern that 'some of our SQLite code ended up on the server' for demo state. The concern was a false alarm — but the audit found one dead-code anomaly that was fixed.",
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": ""
  },
  {
    "id": 433,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 2,
    "summary": "station: pre-burn prep — configure-openwrt-build, flash stage 1/2, golden snapshot, configure-user1 fix",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "e39a171ed9"
  },
  {
    "id": 182,
    "date": "2026-05-11",
    "theme": "Demo page",
    "impact": 2,
    "summary": "demo: fix preset 'Add to existing' (and 'Replace') silently doing nothing",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "7d4fa29dde"
  },
  {
    "id": 42,
    "date": "2026-05-11",
    "theme": "Demo page",
    "impact": 2,
    "summary": "BUG FIX: preset 'Add to existing' (and 'Replace') were silent no-ops in modal path",
    "detail": "Bug discovered by Dave 2026-05-11 on both lulhaven.com/demo.html and the router LuCI UI.",
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": ""
  },
  {
    "id": 434,
    "date": "2026-05-11",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "scripts/haven-sync-package.sh — refresh haven-package/ from openwrt-dev",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "b9ae2fd834"
  },
  {
    "id": 432,
    "date": "2026-05-11",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "station: ImageBuilder path — haven-0.1.0 image built, baked + manifest",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "d1b1fc1468"
  },
  {
    "id": 181,
    "date": "2026-05-11",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "middleware: scope auth to /api/builds/* only; feed endpoints public",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "8c65dc2159"
  },
  {
    "id": 333,
    "date": "2026-05-10",
    "theme": "Wiki & documentation",
    "impact": 5,
    "summary": "wiki: — <admin tool> UI deployed",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "134ebd50d2"
  },
  {
    "id": 32,
    "date": "2026-05-10",
    "theme": "Build maintenance UI",
    "impact": 5,
    "summary": "<admin tool> UI: home link on every page + 3-strike redirect on bad password",
    "detail": "Dave noticed there was no exit path from /<admin tool>/ back to the public site, and that a forgotten password locked the form open indefinitely.",
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": ""
  },
  {
    "id": 27,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 5,
    "summary": "Haven automation philosophy: maximum Claude + granular human instructions + live D1 updates",
    "detail": "Four principles govern Haven build automation going forward.",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": ""
  },
  {
    "id": 26,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 5,
    "summary": "<admin tool> UI deployed — Cloudflare Pages + D1, password-gated",
    "detail": "<admin tool> UI live at <admin URL>. Password-gated (set as Cloudflare Pages secret <admin secret>; <admin password reference>). Backed by a Cloudflare D1 database (<backend table>, id <database id>",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": ""
  },
  {
    "id": 20,
    "date": "2026-05-10",
    "theme": "Firmware & overlay",
    "impact": 5,
    "summary": "Golden selected-categories captured + project_haven_bypass_resistance.md rewritten",
    "detail": "Two follow-ups from closed: (a) selected categories on the golden router enumerated and added to the snapshot; (b) project_haven_bypass_resistance.md rewritten to reflect the actually-deployed state.",
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": ""
  },
  {
    "id": 19,
    "date": "2026-05-10",
    "theme": "Process & discipline",
    "impact": 5,
    "summary": "archive: project_haven_bypass_resistance.md as of 2026-05-10 (pre-deployed-rewrite)",
    "detail": "Pre-rewrite snapshot. The memory file described bypass resistance as a planned but unshipped gap; the 2026-05-10 golden smoke test confirmed almost all of it is now deployed (port 53 <bypass mitigation>, port 853 reject, DoH endpoint reject, <bypass mitigation> /8 + domain <bypass mitigation>s)…",
    "benefit": "Less waste, fewer back-and-forths, more shipped work per session.",
    "ref": ""
  },
  {
    "id": 348,
    "date": "2026-05-10",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "wiki: add 4 notes from late session — burn discipline, framework, strategy, user1 path",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "77d076cdb4"
  },
  {
    "id": 344,
    "date": "2026-05-10",
    "theme": "Wiki & documentation",
    "impact": 4,
    "summary": "wiki: — adopt three power moves as standard practice",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "5993d80dc6"
  },
  {
    "id": 340,
    "date": "2026-05-10",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "wiki: — user1 delivery strategy change (fresh OEM burn primary)",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "4e8b24eabf"
  },
  {
    "id": 336,
    "date": "2026-05-10",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "data: burns.db + burn-tracking schema + user1's burn seeded",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "016ac8f9ac"
  },
  {
    "id": 335,
    "date": "2026-05-10",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "burns: serial format yymmddMODnnnn + multi-site schema delta",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "2c6dc8d691"
  },
  {
    "id": 191,
    "date": "2026-05-10",
    "theme": "Build maintenance UI",
    "impact": 4,
    "summary": "<admin tool>: password-gated UI + D1-backed API",
    "detail": null,
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "4066135be9"
  },
  {
    "id": 40,
    "date": "2026-05-10",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Haven hosts a VPN endpoint too; all traffic end-to-end encrypted, no cleartext on our infrastructure",
    "detail": "Dave decision 2026-05-10 21:48 CDT: 'We will host a vpn endpoint (as will all our routers). Any such traffic will be encrypted.'",
    "benefit": "The cardinal: Haven Inc. never sees customer cleartext on its infrastructure. Architecture, not policy — anchors every privacy claim in the product.",
    "ref": ""
  },
  {
    "id": 39,
    "date": "2026-05-10",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "DDNS piggybacks on the existing daily subscription check-in",
    "detail": "Dave decision 2026-05-10 21:45 CDT: DDNS for the VPN endpoint will piggyback on the existing daily subscription check-in. No external DDNS provider (DuckDNS, Dynu, etc.), no separate update daemon — the router already calls home once a day for the subscription delta; we just add …",
    "benefit": "Filtering follows household members off home Wi-Fi — closes the cellular bypass that defeats most competitors.",
    "ref": ""
  },
  {
    "id": 38,
    "date": "2026-05-10",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Haven ships with native WireGuard VPN endpoint, single-switch UX",
    "detail": "Dave decision 2026-05-10 21:40 CDT: 'We will ship with VPN endpoint capability at the flip of a switch.'",
    "benefit": "Filtering follows household members off home Wi-Fi — closes the cellular bypass that defeats most competitors.",
    "ref": ""
  },
  {
    "id": 37,
    "date": "2026-05-10",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Future product spec: Pi5 Haven router as YouTube1 Geerling's full-stack endorsement target",
    "detail": "Strategic vision Dave articulated 2026-05-10: 'In time we will send YouTube1 a Pi5 router with everything he has videoed... native VPN, security, FCC compliant, etc.'",
    "benefit": "Filtering follows household members off home Wi-Fi — closes the cellular bypass that defeats most competitors.",
    "ref": ""
  },
  {
    "id": 36,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Possible pivot: sell software (with Pi as reference hardware), appliance becomes the premium SKU",
    "detail": "Dave raised the possibility 2026-05-10 of pivoting Haven's go-to-market from 'pre-flashed routers' to 'software, with optional appliance.' Exploratory, not decided. This note captures the strategic shape so it can be revisited.",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": ""
  },
  {
    "id": 35,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "YouTube1 Geerling's 'Homebrew routers' video (2026-03-24): FCC covered list trigger + Haven strategic fit",
    "detail": "Dave shared the YouTube1 Geerling video on 2026-05-10 that prompted the tentative <router serial> send. Full context captured here so the outreach brief stays specific.",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": ""
  },
  {
    "id": 34,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Recipient policy shift: send-to-aligned-voices; YouTube1 Geerling = tentative <router serial>",
    "detail": "Dave shifted recipient assignment policy 2026-05-10 from anchor-decided to reactive.",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": ""
  },
  {
    "id": 28,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Build playbook lives on the website (D1 <backend table>), not in code",
    "detail": "The Haven router build procedure (per-step executable commands, verification, human-helper instructions) is stored in D1 on lulhaven.com as the canonical source of truth. NOT in a local python script. Any Claude instance at any build site (Dave's, son1's, son2's) fetche…",
    "benefit": "Burn procedure lives in D1 as data, not in code. Refinement is a SQL UPDATE — every site/Claude instantly uses the new procedure.",
    "ref": ""
  },
  {
    "id": 25,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Serial format adopted: yymmddMODnnnn + burns schema delta for multi-site future",
    "detail": "Haven router serial number format is yymmddMODnnnn.\n yymmdd - serial-assignment date (when the unit is committed to a customer/burn record)\n MOD - 3-letter model code (NAV = Navy / MT6000; future models get their own codes)\n nnnn - zero-padded per-model unit …",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": ""
  },
  {
    "id": 24,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Kernel-module bake-in list adopted (refines — for the firmware that will be burned to all Haven routers",
    "detail": "Adopt the specific kernel-module + small-userspace inclusion list below as the firmware-build configuration for Haven routers, starting with user1's burn. Total firmware weight increase: approximately 3-5 MB on routers with 256+ MB of flash. Zero runtime cost unless a m…",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": ""
  },
  {
    "id": 23,
    "date": "2026-05-10",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Burn-tracking schema adopted (burns.db) — military/aerospace-grade procedural records",
    "detail": "Adopt a 3-table SQLite schema for burn tracking, modeled on formal procedural-record regimens (US military maintenance, FAA Part 145 aerospace, FDA 21 CFR Part 820 medical device, ASME Code-stamping, pharmaceutical GMP). DB at <database>. Operator tool: <script>…",
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": ""
  },
  {
    "id": 22,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "SQLite migration: Phases 1-7 complete and pushed; Phase 8 ready (fresh OEM burn)",
    "detail": "Phases 1 through 7 of the SQLite migration are complete and pushed to origin. The golden router runs entirely on <database> with the legacy text files deleted. The burn pipeline is ready for Phase 8 (fresh OEM burn for user1).",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": ""
  },
  {
    "id": 21,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "SQLite migration — Haven router data moves out of text files (option 1, ULTRATHINK)",
    "detail": "Move ALL Haven-specific data on the router from text files into SQLite. Source of truth = <database> (extended with new tables). Text files DELETED post-migration, not kept as caches. Public Lua interfaces preserved so the LuCI UI in main.htm does not need to change. Goin…",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": ""
  },
  {
    "id": 18,
    "date": "2026-05-10",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Golden router smoke-test PASSED — verified, snapshot captured, safe to set aside",
    "detail": "The currently-attached MT6000 passed the pre-freeze smoke test (per 's TODO). Verified golden, snapshot captured, safe to set aside as the restore point.",
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": ""
  },
  {
    "id": 17,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Strategy change for user1's delivery — fresh OEM burn primary, golden as fallback",
    "detail": "Strategy change for user1's Haven router delivery (Monday 2026-05-12). Set the currently-attached MT6000 aside as a known-state \"golden\" restore point. Primary path: burn one of the two unburned OEM MT6000 units from scratch as user1's. Fallback: if the fresh bu…",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": ""
  },
  {
    "id": 16,
    "date": "2026-05-10",
    "theme": "Tooling & infrastructure",
    "impact": 4,
    "summary": "Scheduled /insights week-2 for 2026-05-17 — two-layer fallback after CronCreate session-only limit",
    "detail": "Scheduled the /insights week-2 audit for 2026-05-17 ~09:07 CDT using two independent userspace mechanisms (file-based reminder + systemd-user transient timer). Built after discovering that Claude Code's CronCreate tool ignored `durable: true` and produced a session-only…",
    "benefit": "Daily workflow is faster and more reliable; less cognitive load per task.",
    "ref": ""
  },
  {
    "id": 15,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "/insights audit (2026-05-10) — adopted /insights periodic; new completion-honesty rules",
    "detail": "Two outcomes from running /insights against 7 sessions / 196 messages from 2026-05-05 to 2026-05-10:",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": ""
  },
  {
    "id": 14,
    "date": "2026-05-10",
    "theme": "Process & discipline",
    "impact": 4,
    "summary": "archive: feedback_power_moves.md as of 2026-05-10 08:30 CDT (pre-insights-revision)",
    "detail": "Pre-revision snapshot of feedback_power_moves.md before moving /insights from the skip list to adopt-as-periodic-audit. Original content attached as file. The /insights report on 2026-05-10 demonstrated genuine cross-session pattern-detection value that the wiki+memory does not p…",
    "benefit": "Less waste, fewer back-and-forths, more shipped work per session.",
    "ref": ""
  },
  {
    "id": 13,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Adopted three power moves as standard practice",
    "detail": "Adopt three Claude Code features as standard working practice: ULTRATHINK (depth on demand), /loop (backlog burn-down), /schedule (time-bound reminders). Skip /caveman (redundant), /insights and /btw (uncertain). Codified in `feedback_power_moves.md`.",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": ""
  },
  {
    "id": 10,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Operate autonomously — kill the permission prompts",
    "detail": "Eliminate Claude Code permission prompts during long-running and routine work. Set `permissions.defaultMode = \"dontAsk\"` in `<config file>`, and add an autonomous-operation paragraph to `<doc file>` plus a feedback memory file (`feedback_operate_autonom…",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": ""
  },
  {
    "id": 9,
    "date": "2026-05-10",
    "theme": "Process & discipline",
    "impact": 4,
    "summary": "archive: feedback_haven_wiki_logging.md as of 2026-05-10 06:52 CDT (pre-conventions)",
    "detail": "Pre-conventions snapshot of feedback_haven_wiki_logging.md\narchived prior to applying the 5-point convention update.",
    "benefit": "Less waste, fewer back-and-forths, more shipped work per session.",
    "ref": ""
  },
  {
    "id": 8,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Accessory-ecosystem product strategy (Raspberry Pi model)",
    "detail": "Haven adopts the Raspberry Pi accessory-ecosystem model — sell\nthe router as the core product, then sell branded accessory SKUs around it.",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": ""
  },
  {
    "id": 7,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Burn process must be rock-solid — strategic recognition (Dave 2026-05-09)",
    "detail": "Burn process must be rock-solid before scale. Manifest +\nverify-script + golden-snapshot work is NOT infrastructure overhead — it\nIS the actual product engineering. Every burn that ships without\nverification is a customer's bad first impression we paid to manufacture.",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": ""
  },
  {
    "id": 347,
    "date": "2026-05-10",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "wiki: add note_links table, retrofit notes 1-11 with 5 conventions",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "cb445e7136"
  },
  {
    "id": 343,
    "date": "2026-05-10",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "wiki: notes #16-17 — /insights audit + completion-honesty rules",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "e35b55aefb"
  },
  {
    "id": 342,
    "date": "2026-05-10",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "wiki: archive full /insights report under wiki_files/meta/",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "81c084df74"
  },
  {
    "id": 341,
    "date": "2026-05-10",
    "theme": "Session continuity",
    "impact": 3,
    "summary": "data: scheduled-reminders.md + session-start hook for due-reminder surfacing",
    "detail": null,
    "benefit": "Sessions resume with full context; no rediscovery, no lost decisions.",
    "ref": "46542a89c7"
  },
  {
    "id": 338,
    "date": "2026-05-10",
    "theme": "Session continuity",
    "impact": 3,
    "summary": "data: golden prefs captured + bypass-resistance memory rewrite",
    "detail": null,
    "benefit": "DoH/DoT/Private Relay bypass attempts blocked at the router — every Chrome/Apple-default workaround returns to Haven's filter.",
    "ref": "f8d4505b26"
  },
  {
    "id": 337,
    "date": "2026-05-10",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "wiki: — SQLite migration phases 1-7 complete",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "ee6dcbec4e"
  },
  {
    "id": 332,
    "date": "2026-05-10",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "wiki: — Haven automation philosophy",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "ed968be5f6"
  },
  {
    "id": 331,
    "date": "2026-05-10",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "wiki: — build playbook lives on the website (<backend table> in D1)",
    "detail": null,
    "benefit": "Burn procedure lives in D1 as data, not in code. Refinement is a SQL UPDATE — every site/Claude instantly uses the new procedure.",
    "ref": "18391b400d"
  },
  {
    "id": 190,
    "date": "2026-05-10",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "<admin tool>: commit released-build snapshots to haven-data via GitHub API",
    "detail": null,
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "72201d668b"
  },
  {
    "id": 189,
    "date": "2026-05-10",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "<admin tool>: split step 2 into 2a (human plug-in) + 2b (Claude verify)",
    "detail": null,
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "3f46689831"
  },
  {
    "id": 188,
    "date": "2026-05-10",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "<admin tool>: add executor callout to every step_name",
    "detail": null,
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "8554479e6e"
  },
  {
    "id": 187,
    "date": "2026-05-10",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "<admin tool>: home link on every page + 3-strike redirect on bad password",
    "detail": null,
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "e66f20801e"
  },
  {
    "id": 186,
    "date": "2026-05-10",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "<admin tool>: jettison on every failed password, not just after 3",
    "detail": null,
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "867aeaca2b"
  },
  {
    "id": 33,
    "date": "2026-05-10",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "<admin tool> auth: jettison on every wrong password (one strike, not three)",
    "detail": "Supersedes the 3-strike policy from. Dave's reasoning 2026-05-10: a client-side counter is theater — a determined attacker hits POST /api/auth directly and the JS counter is bypassed. If we can't (yet) enforce real rate limiting at the function layer, the only honest cos…",
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": ""
  },
  {
    "id": 31,
    "date": "2026-05-10",
    "theme": "Process & discipline",
    "impact": 3,
    "summary": "Build steps carry executor callout in step_name (Claude / Haven Technician)",
    "detail": "Per Dave 2026-05-10, every step in STANDARD_STEPS leads with an explicit executor callout.",
    "benefit": "Less waste, fewer back-and-forths, more shipped work per session.",
    "ref": ""
  },
  {
    "id": 30,
    "date": "2026-05-10",
    "theme": "Process & discipline",
    "impact": 3,
    "summary": "Build procedure: step 2 split into 2a (human) + 2b (Claude verify)",
    "detail": "Per Dave 2026-05-10, the original step 2 'Power on; confirm OEM firmware reachable' bundled two distinct kinds of work: a human-only physical action (plug in power + LAN) and an automatable check (ping the router; HTTP-GET its web UI). Per the automation philosophy, ev…",
    "benefit": "Less waste, fewer back-and-forths, more shipped work per session.",
    "ref": ""
  },
  {
    "id": 29,
    "date": "2026-05-10",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "D1 -> git archival working end-to-end (smoke test passed)",
    "detail": "Built and verified the durability layer: every successful POST /api/builds/<id>/release now commits a JSON snapshot of the build (header + steps + NCRs) to mndavew3/haven-data at builds/<site>/<serial>.json via the GitHub REST API.",
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": ""
  },
  {
    "id": 346,
    "date": "2026-05-10",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "data: track haven-root context file; log autonomous-op closure",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "e02a8d9dda"
  },
  {
    "id": 345,
    "date": "2026-05-10",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "data: gitignore.wrangler/, log wrangler-stray-dir fix",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "ee08342139"
  },
  {
    "id": 339,
    "date": "2026-05-10",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "data: golden router snapshot — pre-freeze verification",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "b91c31d941"
  },
  {
    "id": 334,
    "date": "2026-05-10",
    "theme": "Burn procedure & build station",
    "impact": 1,
    "summary": "data: rename burns -> builds (Dave: \"less alarming to the uninitiated\")",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "d8912e00ac"
  },
  {
    "id": 330,
    "date": "2026-05-10",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "release: 260510TST0002 (released_by smoke-test-2)",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "2e4619bf68"
  },
  {
    "id": 185,
    "date": "2026-05-10",
    "theme": "Build maintenance UI",
    "impact": 1,
    "summary": "<admin tool>: fix stale \"3-strike\" comment after one-strike change",
    "detail": null,
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "53f078222c"
  },
  {
    "id": 12,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 1,
    "summary": "Wrangler.wrangler/ stray-dir bug — patched both deploy scripts",
    "detail": "Patched <script> and <script> to explicitly `cd \"$SITE_DIR\"` (deploy-lulhaven) and `cd \"$SITE\"` (deploy-all) immediately before invoking `wrangler pages deploy`. Added defense-in-depth `.wrangler/` line to `<config file>`. Cl…",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": ""
  },
  {
    "id": 11,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 1,
    "summary": "Closed TODOs from #12 — global mirror + haven-root CLAUDE.md backup",
    "detail": "Closed both follow-up TODOs from.",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": ""
  },
  {
    "id": 353,
    "date": "2026-05-09",
    "theme": "SQLite source-of-truth pipeline",
    "impact": 4,
    "summary": "import.py: diff-and-update import (Phase 4 step 2)",
    "detail": null,
    "benefit": "Single place to edit data; everything else regenerates — no parallel maintenance, no drift.",
    "ref": "a0289ca133"
  },
  {
    "id": 352,
    "date": "2026-05-09",
    "theme": "SQLite source-of-truth pipeline",
    "impact": 4,
    "summary": "sql/export_feed_delta.py: rolling delta DB for delta-sync (Phase 4 step 3)",
    "detail": null,
    "benefit": "Single place to edit data; everything else regenerates — no parallel maintenance, no drift.",
    "ref": "188c75ee30"
  },
  {
    "id": 351,
    "date": "2026-05-09",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "data: add Mobile Game Ads category with top-5 ad networks",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "bd28fc348a"
  },
  {
    "id": 198,
    "date": "2026-05-09",
    "theme": "Build pipeline",
    "impact": 4,
    "summary": "api/feed-delta.db: ship rolling 30-day delta artifact (Phase 4 step 3)",
    "detail": null,
    "benefit": "Edits flow source → live in one script. No copy-paste, no stale artifacts.",
    "ref": "c6113ad705"
  },
  {
    "id": 197,
    "date": "2026-05-09",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "data: rebuild artifacts with Mobile Game Ads category",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "9f70106be6"
  },
  {
    "id": 6,
    "date": "2026-05-09",
    "theme": "Tooling & infrastructure",
    "impact": 4,
    "summary": "Haven wiki — design and schema (created 2026-05-09)",
    "detail": "Built a queryable knowledge base for Haven episodic content.\nLives at <database>. Schema in <schema file>.\nHelper script: <script> (subcommands add / search / show /\ntopics / keywords).",
    "benefit": "Daily workflow is faster and more reliable; less cognitive load per task.",
    "ref": ""
  },
  {
    "id": 5,
    "date": "2026-05-09",
    "theme": "Tooling & infrastructure",
    "impact": 4,
    "summary": "make-sticker-pdf.py — variable-data sticker PDF generator",
    "detail": "Built ~/scripts/make-sticker-pdf.py — variable-data sticker PDF\ngenerator. Inputs: a PNG/JPG base design + a CSV of serial numbers + text\nformatting flags. Outputs a multi-page PDF, one sticker per page, sized to\nthe requested label dimensions.",
    "benefit": "Daily workflow is faster and more reliable; less cognitive load per task.",
    "ref": ""
  },
  {
    "id": 4,
    "date": "2026-05-09",
    "theme": "Brand & packaging",
    "impact": 4,
    "summary": "Preset additions: Parenting, Privacy, Senior (and the include-for-conversation principle)",
    "detail": "Added three new presets — Parenting, Privacy, Senior — to both\nthe demo (lulhaven.com) and the router LuCI UI on 2026-05-09. The\ninclude-for-conversation principle was applied here for the first time as\nthe rule for borderline category inclusion in presets.",
    "benefit": "First customer impression before they even plug the router in — sets the trust baseline.",
    "ref": ""
  },
  {
    "id": 3,
    "date": "2026-05-09",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Marketing is politically agnostic — substance, never named messengers",
    "detail": "Haven's public marketing is politically agnostic in voice and\ncopy. Capture the substance of concerns about surveillance, big-tech\nconsolidation, family agency, and children being products — but never name\npoliticians or political figures in marketing. Direct outreach to po…",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": ""
  },
  {
    "id": 2,
    "date": "2026-05-09",
    "theme": "Brand & packaging",
    "impact": 4,
    "summary": "Navy Gnome sticker recolor pipeline",
    "detail": "Pipeline transforms the Copilot-generated Navy Gnome source PNG\ninto the final printable sticker design with white background, navy outline,\nand a navy label band at the bottom for the 'HAVEN - N OF 100' caption.",
    "benefit": "First customer impression before they even plug the router in — sets the trust baseline.",
    "ref": ""
  },
  {
    "id": 1,
    "date": "2026-05-09",
    "theme": "Brand & packaging",
    "impact": 4,
    "summary": "Avery 64510 layout dimensions (verified by test print 2026-05-09)",
    "detail": "12-up Avery 64510 layout dimensions confirmed and codified into a\nreproducible script. Avery 64510 = 2\"x2\" white waterproof film, matte, easy\npeel, laser/pigment-inkjet, print-to-the-edge, 12 labels per US Letter sheet.",
    "benefit": "First customer impression before they even plug the router in — sets the trust baseline.",
    "ref": ""
  },
  {
    "id": 349,
    "date": "2026-05-09",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "data: add Haven wiki — queryable knowledge base for episodic content",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "71d5673dc5"
  },
  {
    "id": 195,
    "date": "2026-05-09",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "About us: add 1960 historical photo of Lulhaven on Big Fish Lake",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "c7a5b7fcd3"
  },
  {
    "id": 193,
    "date": "2026-05-09",
    "theme": "Demo page",
    "impact": 3,
    "summary": "demo: add Parenting and Privacy presets",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "ea037baa1f"
  },
  {
    "id": 192,
    "date": "2026-05-09",
    "theme": "Demo page",
    "impact": 3,
    "summary": "demo: add Senior preset (anti-scam, anti-cognitive-decline-exploitation)",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "ff7caa7228"
  },
  {
    "id": 354,
    "date": "2026-05-09",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "schema: add created_datetime / modified_datetime + tombstones (Phase 4 step 1)",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "e8b135257e"
  },
  {
    "id": 350,
    "date": "2026-05-09",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "data: extend Mobile Game Ads with tier-2 networks",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "4a65d565af"
  },
  {
    "id": 196,
    "date": "2026-05-09",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "data: rebuild artifacts with tier-2 mobile ad networks",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "f403351f38"
  },
  {
    "id": 194,
    "date": "2026-05-09",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "index.html: detect TV browsers and force desktop layout",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "677a80688c"
  },
  {
    "id": 357,
    "date": "2026-05-08",
    "theme": "SQLite source-of-truth pipeline",
    "impact": 5,
    "summary": "Phase 2 cutover: <database> is now the source-of-truth",
    "detail": null,
    "benefit": "Filter data centralized in <database>. Every downstream artifact (feed.json, haven-data.js, main.htm) regenerates from one source — no parallel maintenance.",
    "ref": "89e41e01d0"
  },
  {
    "id": 359,
    "date": "2026-05-08",
    "theme": "SQLite source-of-truth pipeline",
    "impact": 4,
    "summary": "sql: Phase 1 — add SQLite source-of-truth infrastructure",
    "detail": null,
    "benefit": "Single place to edit data; everything else regenerates — no parallel maintenance, no drift.",
    "ref": "eb5e45c1b6"
  },
  {
    "id": 358,
    "date": "2026-05-08",
    "theme": "SQLite source-of-truth pipeline",
    "impact": 4,
    "summary": "sql/import.py: split into 12 single-responsibility modules under lib/",
    "detail": null,
    "benefit": "Single place to edit data; everything else regenerates — no parallel maintenance, no drift.",
    "ref": "b5069ae495"
  },
  {
    "id": 356,
    "date": "2026-05-08",
    "theme": "Build pipeline",
    "impact": 4,
    "summary": "Phase 3: export <database> (SQLite) for runtime consumption",
    "detail": null,
    "benefit": "Edits flow source → live in one script. No copy-paste, no stale artifacts.",
    "ref": "40c8e01d48"
  },
  {
    "id": 201,
    "date": "2026-05-08",
    "theme": "Build pipeline",
    "impact": 4,
    "summary": "feed.json: add missing key fields to Security and Big Business categories",
    "detail": null,
    "benefit": "Edits flow source → live in one script. No copy-paste, no stale artifacts.",
    "ref": "4224c79fe3"
  },
  {
    "id": 200,
    "date": "2026-05-08",
    "theme": "Build pipeline",
    "impact": 4,
    "summary": "data: rebuild feed.json, haven-data.js, haven-tooltips.js from <database>",
    "detail": null,
    "benefit": "Edits flow source → live in one script. No copy-paste, no stale artifacts.",
    "ref": "2bdf080695"
  },
  {
    "id": 199,
    "date": "2026-05-08",
    "theme": "Build pipeline",
    "impact": 4,
    "summary": "api/<database>: ship SQLite database for Phase 3 runtime consumption",
    "detail": null,
    "benefit": "Edits flow source → live in one script. No copy-paste, no stale artifacts.",
    "ref": "4a13f31556"
  },
  {
    "id": 355,
    "date": "2026-05-08",
    "theme": "SQLite source-of-truth pipeline",
    "impact": 2,
    "summary": "build.py: fix dry-run main.htm prep — was using stale list index",
    "detail": null,
    "benefit": "Single place to edit data; everything else regenerates — no parallel maintenance, no drift.",
    "ref": "0db6d8c65a"
  },
  {
    "id": 204,
    "date": "2026-05-07",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "sync UI/feed: drop unmappable items, stage <data source>-mappable ones",
    "detail": null,
    "benefit": "12M curated domains across 30 categories integrated; we benefit from the world's most comprehensive non-commercial blacklist without paying or maintaining it.",
    "ref": "00a725478b"
  },
  {
    "id": 203,
    "date": "2026-05-07",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "itemUrls: enable Adult Content + 10 <data source>-mappable items in UI",
    "detail": null,
    "benefit": "12M curated domains across 30 categories integrated; we benefit from the world's most comprehensive non-commercial blacklist without paying or maintaining it.",
    "ref": "2a86b7f36b"
  },
  {
    "id": 202,
    "date": "2026-05-07",
    "theme": "Build pipeline",
    "impact": 4,
    "summary": "sync: reconcile dataset, itemUrls, and feed.json",
    "detail": null,
    "benefit": "Edits flow source → live in one script. No copy-paste, no stale artifacts.",
    "ref": "2e6386c092"
  },
  {
    "id": 216,
    "date": "2026-05-06",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "feed: backfill 133 UI items with domain-only entries (gap closure)",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "56a9d8ca9c"
  },
  {
    "id": 215,
    "date": "2026-05-06",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "feed: add 1511 Apple AS714 IP prefixes to apple_corp",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "a7cb9b52fc"
  },
  {
    "id": 214,
    "date": "2026-05-06",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "feed: collapse overlapping CIDRs in i[] arrays (1618 -> 61)",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "7ec0fa02f2"
  },
  {
    "id": 213,
    "date": "2026-05-06",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "haven-data + feed: collapse Adult Content to single item",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "c08d5a4402"
  },
  {
    "id": 205,
    "date": "2026-05-06",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "feed: Apple Corp — add icloud.com, me.com, mac.com and CDN domains",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "c2c53d69a9"
  },
  {
    "id": 212,
    "date": "2026-05-06",
    "theme": "Demo page",
    "impact": 3,
    "summary": "demo: mirror router whitelist + Allow + dirty-indicator UI",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "a33e94d671"
  },
  {
    "id": 211,
    "date": "2026-05-06",
    "theme": "Demo page",
    "impact": 3,
    "summary": "demo: replace placeholder log with 24 cartoon-villain sample entries",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "1425b5ecc9"
  },
  {
    "id": 209,
    "date": "2026-05-06",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "css: let hero h1 wrap naturally on phones",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "eaf12929bf"
  },
  {
    "id": 210,
    "date": "2026-05-06",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "rename: Frank -> Blue, Anne -> Khaki in marketing copy",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "70298644c4"
  },
  {
    "id": 208,
    "date": "2026-05-06",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "css: shrink display-1 to 2.5rem on phones (<=576px)",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "d47d808deb"
  },
  {
    "id": 207,
    "date": "2026-05-06",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "css/html: show ' — ' separator on phones between Haven and Declare",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "a67da715fd"
  },
  {
    "id": 206,
    "date": "2026-05-06",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "rename: Khaki -> Olive in marketing copy",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "84c3c589a6"
  },
  {
    "id": 220,
    "date": "2026-05-05",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "haven-data: enable Adult Content checkboxes (null strategy → upstream DNS)",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "eca54e86b9"
  },
  {
    "id": 219,
    "date": "2026-05-05",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "feed: add bereal.com to BeReal domain list",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "438e858c64"
  },
  {
    "id": 217,
    "date": "2026-05-05",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "feed: add Twitter/TikTok IP ranges, remove bogus ASNs (Snapchat, Pinterest)",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "780789c6d1"
  },
  {
    "id": 226,
    "date": "2026-05-05",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "index.html: replace hero and We Offer sections with clearer copy",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "3a0573a323"
  },
  {
    "id": 225,
    "date": "2026-05-05",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "index.html: drop \"Cool\" from hero copy",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "83792a5171"
  },
  {
    "id": 224,
    "date": "2026-05-05",
    "theme": "Process & discipline",
    "impact": 3,
    "summary": "CLAUDE.md: add git discipline rule — pull before every session and edit",
    "detail": null,
    "benefit": "Less waste, fewer back-and-forths, more shipped work per session.",
    "ref": "cc7e1627b5"
  },
  {
    "id": 222,
    "date": "2026-05-05",
    "theme": "LuCI / UI",
    "impact": 3,
    "summary": "demo: shift blue accents to aqua/teal (sync with router main.htm)",
    "detail": null,
    "benefit": "Customer interacts with this surface daily; every refinement compounds the experience.",
    "ref": "d1ed216987"
  },
  {
    "id": 221,
    "date": "2026-05-05",
    "theme": "LuCI / UI",
    "impact": 3,
    "summary": "demo: sync attributes with router main.htm",
    "detail": null,
    "benefit": "Customer interacts with this surface daily; every refinement compounds the experience.",
    "ref": "f6407abd0e"
  },
  {
    "id": 218,
    "date": "2026-05-05",
    "theme": "Filter strategies",
    "impact": 2,
    "summary": "feed: fix duplicate domains (character.ai, duckduckgo)",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "f1114ea019"
  },
  {
    "id": 223,
    "date": "2026-05-05",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "VPN-notes: add VPN notes file",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "0aa6cd4a55"
  },
  {
    "id": 228,
    "date": "2026-05-02",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "haven: remove user1's brands from Alcohol & Tobacco",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "1f3154087d"
  },
  {
    "id": 227,
    "date": "2026-05-02",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "haven: add Meta Corp 47-way blocking profile; update website claim",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "03f709be1d"
  },
  {
    "id": 235,
    "date": "2026-05-02",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "index.html: remove Mobirise branding, set phone, disable social icons",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "7039f333e7"
  },
  {
    "id": 231,
    "date": "2026-05-02",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "index.html: replace hero headline with Haven positioning statement",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "38ea71ec37"
  },
  {
    "id": 236,
    "date": "2026-05-02",
    "theme": "Filter strategies",
    "impact": 2,
    "summary": "haven website: preset modal, search fix, data updates, OTA manifest",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "2f1b1d4c2e"
  },
  {
    "id": 230,
    "date": "2026-05-02",
    "theme": "Marketing & website",
    "impact": 2,
    "summary": "index.html: fix contact form — remove Mobirise formoid interception",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "6d5cea8406"
  },
  {
    "id": 234,
    "date": "2026-05-02",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "haven-ui: filter orphaned keys from save/export",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "93b4920807"
  },
  {
    "id": 233,
    "date": "2026-05-02",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "index.html: fix contact form — Formspree → <operator email>",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "39ca2c2660"
  },
  {
    "id": 232,
    "date": "2026-05-02",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "index.html: replace Why us? placeholder copy with Haven messaging",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "3b61e4ab70"
  },
  {
    "id": 229,
    "date": "2026-05-02",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "haven: expand Alcohol & Tobacco to 55 items; default landing to Social Media",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "3de425a3e7"
  },
  {
    "id": 445,
    "date": "2026-05-01",
    "theme": "Demo page",
    "impact": 3,
    "summary": "Demo dataset: removed Coors / MillerCoors from Alcohol & Tobacco bullets",
    "detail": "Pruned the Coors / MillerCoors brand from the Alcohol & Tobacco preview list and dropped its itemUrls entry, keeping the demo dataset aligned with the curated production list.",
    "benefit": "Prospective customers see the same UI in the demo as the router ships with — no 'wait, the real thing looks different' jolt at unboxing.",
    "ref": "b24da6f226"
  },
  {
    "id": 444,
    "date": "2026-05-01",
    "theme": "Demo page",
    "impact": 3,
    "summary": "Demo page: Basic mode forced as default on every load",
    "detail": "Pinned hdBasicMode = true at script load — first-time visitors and returning visitors both land in Basic mode regardless of localStorage (Advanced still reachable via the toggle).",
    "benefit": "Prospective customers see the same UI in the demo as the router ships with — no 'wait, the real thing looks different' jolt at unboxing.",
    "ref": "7875b2268c"
  },
  {
    "id": 443,
    "date": "2026-05-01",
    "theme": "Demo page",
    "impact": 3,
    "summary": "Demo page: header re-flowed and itemUrls guard tightened",
    "detail": "Header text → \"Haven by Lulhaven - n of 100\". Filtered-view render now skips settings whose key is not in itemUrls (prevents a stray entry from breaking the table). Basic-mode default flipped from \"off unless localStorage says basic\" to \"on unless localStorage says advanced\".",
    "benefit": "Prospective customers see the same UI in the demo as the router ships with — no 'wait, the real thing looks different' jolt at unboxing.",
    "ref": "7045795ae4"
  },
  {
    "id": 237,
    "date": "2026-05-01",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "assets: add current Haven UI screenshot",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "8c58b5a098"
  },
  {
    "id": 440,
    "date": "2026-04-30",
    "theme": "Demo page",
    "impact": 5,
    "summary": "Demo page: stacked brand header experiment",
    "detail": "Tried splitting the title into \"Lulhaven\" + a \"Live Demo\" subscript line, with new .hd-unit-line CSS. Reverted in the next commit (less readable at small widths).",
    "benefit": "Prospective customers see the same UI in the demo as the router ships with — no 'wait, the real thing looks different' jolt at unboxing.",
    "ref": "e5293b7f78"
  },
  {
    "id": 442,
    "date": "2026-04-30",
    "theme": "Demo page",
    "impact": 3,
    "summary": "Demo UI: presets/clear now flip the filtered view",
    "detail": "hdApplyPreset() and hdClearAll() now call hdToggleFilteredView() instead of plain hdRenderFilteredView(), so applying a preset enters the filtered-view mode automatically.",
    "benefit": "Prospective customers see the same UI in the demo as the router ships with — no 'wait, the real thing looks different' jolt at unboxing.",
    "ref": "47a9d12654"
  },
  {
    "id": 441,
    "date": "2026-04-30",
    "theme": "Demo page",
    "impact": 3,
    "summary": "Demo page: header reverted to single-line \"Lulhaven - Haven - n of 100\"",
    "detail": "Backed out the stacked brand experiment; single inline title reads better in the constrained demo header.",
    "benefit": "Prospective customers see the same UI in the demo as the router ships with — no 'wait, the real thing looks different' jolt at unboxing.",
    "ref": "35177cc537"
  },
  {
    "id": 437,
    "date": "2026-04-30",
    "theme": "Demo page",
    "impact": 3,
    "summary": "Demo page: subscription table zebra striping added",
    "detail": "Alternating row backgrounds for #hd-sub-table — translucent white on odd rows, translucent black on even rows. Visibly improves scannability of the filter list.",
    "benefit": "Prospective customers see the same UI in the demo as the router ships with — no 'wait, the real thing looks different' jolt at unboxing.",
    "ref": "9794873d4a"
  },
  {
    "id": 436,
    "date": "2026-04-30",
    "theme": "Demo page",
    "impact": 3,
    "summary": "Demo page: Basic/Advanced mode toggle added",
    "detail": "New Basic-mode CSS class hides advanced controls (delayed-filter, search, import/export, filter-view, badges); Basic/Advanced button + hdToggleMode() persisted via localStorage. 44 lines of new CSS + JS function + class wiring in demo.html and js/haven-ui.js.",
    "benefit": "Prospective customers see the same UI in the demo as the router ships with — no 'wait, the real thing looks different' jolt at unboxing.",
    "ref": "125b8567cc"
  },
  {
    "id": 439,
    "date": "2026-04-30",
    "theme": "Demo page",
    "impact": 2,
    "summary": "Demo page: zebra-stripe rules forced with !important",
    "detail": "Without !important the Bootstrap row-color rules were winning; added !important to the demo-table odd/even rules so the zebra survives the cascade.",
    "benefit": "Prospective customers see the same UI in the demo as the router ships with — no 'wait, the real thing looks different' jolt at unboxing.",
    "ref": "45da3de850"
  },
  {
    "id": 438,
    "date": "2026-04-30",
    "theme": "Demo page",
    "impact": 2,
    "summary": "Demo page: zebra-stripe opacity bumped for readability",
    "detail": "Initial stripe opacities (0.18 / 0.06) were too subtle on most monitors; bumped to 0.4 / 0.10 so the alternation actually reads.",
    "benefit": "Prospective customers see the same UI in the demo as the router ships with — no 'wait, the real thing looks different' jolt at unboxing.",
    "ref": "e8544da0d6"
  },
  {
    "id": 249,
    "date": "2026-04-29",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "feat: super-cats, A-Z, presets, badges + 7 Politics & Government items",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "f7de32b61b"
  },
  {
    "id": 252,
    "date": "2026-04-29",
    "theme": "Demo page",
    "impact": 3,
    "summary": "refactor: split demo.html into focused JS files",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "537f81b686"
  },
  {
    "id": 250,
    "date": "2026-04-29",
    "theme": "Demo page",
    "impact": 3,
    "summary": "haven: add Show Filtered toggle to demo",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "8647953dc8"
  },
  {
    "id": 256,
    "date": "2026-04-29",
    "theme": "Demo page",
    "impact": 2,
    "summary": "ui: fix corp sync — identical entities only, remove subsidiary groupings",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "cc3621b464"
  },
  {
    "id": 255,
    "date": "2026-04-29",
    "theme": "YouHaven anti-algorithm app",
    "impact": 1,
    "summary": "ui: rename Entertainment/Fox Corp back to Fox News, remove fox corp sync group",
    "detail": null,
    "benefit": "Adults get an exit from algorithmic feeds; Haven serves both parents AND grown-up privacy buyers.",
    "ref": "25bfc5fbd6"
  },
  {
    "id": 254,
    "date": "2026-04-29",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "ui: replace hardcoded corp groups with automatic name-match sync",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "eace338be2"
  },
  {
    "id": 253,
    "date": "2026-04-29",
    "theme": "YouHaven anti-algorithm app",
    "impact": 1,
    "summary": "haven: tooltips, AllSides/Drudge, Fox News rename, auto name-sync",
    "detail": null,
    "benefit": "Adults get an exit from algorithmic feeds; Haven serves both parents AND grown-up privacy buyers.",
    "ref": "3e547dd6c9"
  },
  {
    "id": 251,
    "date": "2026-04-29",
    "theme": "Process & discipline",
    "impact": 1,
    "summary": "chore: add CLAUDE.md for session context efficiency",
    "detail": null,
    "benefit": "Less waste, fewer back-and-forths, more shipped work per session.",
    "ref": "9c09e93b51"
  },
  {
    "id": 259,
    "date": "2026-04-28",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "feed: add The Drudge Report to Politics & Government",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "8b336c941b"
  },
  {
    "id": 258,
    "date": "2026-04-28",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "feed: add AllSides to Politics & Government",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "b2ef10ed67"
  },
  {
    "id": 261,
    "date": "2026-04-28",
    "theme": "Demo page",
    "impact": 3,
    "summary": "demo: clickable content links open in new tab",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "d5ba27b4ec"
  },
  {
    "id": 260,
    "date": "2026-04-28",
    "theme": "Demo page",
    "impact": 3,
    "summary": "demo: disable items with no filtering strategy",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "43380fcb50"
  },
  {
    "id": 257,
    "date": "2026-04-28",
    "theme": "Demo page",
    "impact": 3,
    "summary": "ui: corp sync — toggling one property blocks all siblings across categories",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "b173dde1a5"
  },
  {
    "id": 262,
    "date": "2026-04-27",
    "theme": "Build pipeline",
    "impact": 2,
    "summary": "demo: Export/Import, Filter terminology, mobile button fix; add feed.json",
    "detail": null,
    "benefit": "Edits flow source → live in one script. No copy-paste, no stale artifacts.",
    "ref": "6808a2d739"
  },
  {
    "id": 263,
    "date": "2026-04-26",
    "theme": "Marketing & website",
    "impact": 5,
    "summary": "Apply glassmorphism UI to Haven live demo",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "dcb847aa13"
  },
  {
    "id": 264,
    "date": "2026-04-26",
    "theme": "Demo page",
    "impact": 3,
    "summary": "Sync demo with router: full content lists, Block/Delayed Block checkboxes, Select All",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "f9749807da"
  },
  {
    "id": 270,
    "date": "2026-04-25",
    "theme": "Milestones",
    "impact": 5,
    "summary": "Initial commit - lulhaven.com site files",
    "detail": null,
    "benefit": "The Haven project begins. lulhaven.com goes live as the marketing surface.",
    "ref": "8209de7ed5"
  },
  {
    "id": 267,
    "date": "2026-04-25",
    "theme": "Demo page",
    "impact": 5,
    "summary": "Link Live demo button to demo.html",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "f41fe3cf49"
  },
  {
    "id": 269,
    "date": "2026-04-25",
    "theme": "Demo page",
    "impact": 3,
    "summary": "Add Haven interactive demo page",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "20a32856c7"
  },
  {
    "id": 268,
    "date": "2026-04-25",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "Update ship date to November 25, 2026",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "460c07715a"
  },
  {
    "id": 266,
    "date": "2026-04-25",
    "theme": "YouHaven anti-algorithm app",
    "impact": 3,
    "summary": "Sync demo page - search, Big Business, Fox Corp, MSN, Contents",
    "detail": null,
    "benefit": "Adults get an exit from algorithmic feeds; Haven serves both parents AND grown-up privacy buyers.",
    "ref": "91947aca08"
  },
  {
    "id": 265,
    "date": "2026-04-25",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "Alphabetize categories and contents",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and converts more of them into customers.",
    "ref": "80f3e3f44a"
  }
];
