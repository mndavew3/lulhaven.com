var milestonesDataset = [
  {
    "id": 485,
    "date": "2026-05-31",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Off-network filtering became per-device and self-serve: a parent picks a device in the Helm, scans its code, and that specific device keeps its own filtering rules on cellular — different devices, different rules, even away from home.",
    "detail": "Helm enroll action mints an opaque per-device handle and registers it with the relay over the tunnel; relay routes the handle to that device's filter; proven end-to-end on the bench.",
    "benefit": "Each device now carries its own protection off the home network, set up in one scan, with the device's name never leaving your router.",
    "ref": "",
    "features": []
  },
  {
    "id": 484,
    "date": "2026-05-30",
    "theme": "Off-network filtering",
    "impact": 5,
    "summary": "Off-network filtering went live: a device keeps Haven's protection on cellular with no app, set up by scanning a code on the router. Proven end-to-end on a real phone, and each home routes to its own router.",
    "detail": "Cloud relay (DoT/DoH) over WireGuard to the home router's filter; per-router provisioning scripted into the burn; SNI selector routes each household to its own router; per-device routing mechanism proven.",
    "benefit": "Protection that used to stop at the front door now follows phones and tablets wherever they go, with a one-scan setup and nothing to install.",
    "ref": "",
    "features": []
  },
  {
    "id": 483,
    "date": "2026-05-30",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Locked the no-app off-network design — a phone keeps Haven's filtering on cellular with only a DNS setting (no app to install), routed back to its own home router; and stood up the live relay server it runs on.",
    "detail": null,
    "benefit": "Filtering follows household members wherever they go without installing anything on the phone — a one-time setting, not yet another monitoring app.",
    "ref": "",
    "features": []
  },
  {
    "id": 482,
    "date": "2026-05-30",
    "theme": "Filtering",
    "impact": 4,
    "summary": "Fixed the always-allow list so a site you mark as allowed reliably overrides any category block — even when that exact site is on a blocklist.",
    "detail": null,
    "benefit": "The always-allow / poison-control promise now holds: a domain you trust is never blocked, no matter what category it falls under.",
    "ref": "",
    "features": []
  },
  {
    "id": 481,
    "date": "2026-05-30",
    "theme": "Testing & quality",
    "impact": 4,
    "summary": "Built a feature-coverage gate: every feature Haven advertises must map to an automated test or a recorded exemption, or the test suite fails.",
    "detail": null,
    "benefit": "Customers can trust that anything claimed on the site is actually verified — no advertised feature ships untested.",
    "ref": "f36cf86",
    "features": []
  },
  {
    "id": 472,
    "date": "2026-05-29",
    "theme": "Marketing & website",
    "impact": 5,
    "summary": "Launched the Haven Founders campaign on lulhaven.com — a Founders-edition Haven Navy router buyable now via secure Stripe checkout, limited to 100, ships Nov 25 2026.",
    "detail": null,
    "benefit": "Haven can take real orders today and fund the first production run.",
    "ref": "36fc519e18",
    "features": []
  },
  {
    "id": 469,
    "date": "2026-05-29",
    "theme": "Marketing & website",
    "impact": 5,
    "summary": "Launched the Haven Founders campaign on lulhaven.com: a Founders edition router buyable now through secure checkout, limited to a run of 100.",
    "detail": "Founders band below the hero with Stripe checkout for the 299 dollar Haven Navy, a manual of-100 counter, and a ships-by date; replaced outdated crowdfunding copy.",
    "benefit": "Haven can start taking real orders today, funding the first production run.",
    "ref": "36fc519e18",
    "features": []
  },
  {
    "id": 480,
    "date": "2026-05-29",
    "theme": "Testing & quality",
    "impact": 4,
    "summary": "Rebuilt and hardened Haven's automated test suite and, in the process, caught and fixed a real defect where the feature that auto-detects new devices would quietly stop working after the router refreshed its records. The suite now passes cleanly end to end.",
    "detail": null,
    "benefit": "Higher confidence the product works as shipped; a silent failure caught before customers hit it.",
    "ref": "7e1cb0784b",
    "features": []
  },
  {
    "id": 479,
    "date": "2026-05-29",
    "theme": "Per-device filtering",
    "impact": 4,
    "summary": "Simplified how Haven recognizes devices: it now identifies them purely by their friendly name, with the router resolving the rest behind the scenes. Name several devices the same (all your 'sales' laptops) and they automatically share one set of filters.",
    "detail": null,
    "benefit": "One simple rule — name = filter group — with nothing to maintain per device.",
    "ref": "44f45c0fdc",
    "features": []
  },
  {
    "id": 478,
    "date": "2026-05-29",
    "theme": "Per-device filtering",
    "impact": 4,
    "summary": "Haven now identifies devices by their friendly name instead of their MAC address: one row per name, set the filter once and it follows the name wherever it shows up. Side benefit — if you give multiple devices the same name (everyone in the sales department named 'sales'), they all share one filter profile by design, no setup required.",
    "detail": null,
    "benefit": "Set once, follows everyone using that name — no hidden duplicates.",
    "ref": "3526fdbc88",
    "features": []
  },
  {
    "id": 476,
    "date": "2026-05-29",
    "theme": "Per-device filtering",
    "impact": 4,
    "summary": "Devices that join the home network now appear in Haven's per-device picker automatically — name and all — without anyone touching the router; if a device disappears for 30 days it quietly fades from the list, and the moment it comes back its place and any saved choices return with it.",
    "detail": null,
    "benefit": "Households can set per-device rules without learning router admin.",
    "ref": "108eb6d127",
    "features": []
  },
  {
    "id": 473,
    "date": "2026-05-29",
    "theme": "Demo page",
    "impact": 4,
    "summary": "Embedded the live interactive Haven Helm demo on the homepage as a windowed preview that expands to the full demo and remembers your choices between the two.",
    "detail": null,
    "benefit": "Visitors try the real controls without leaving the landing page.",
    "ref": "2297ac9956",
    "features": []
  },
  {
    "id": 468,
    "date": "2026-05-29",
    "theme": "Demo page",
    "impact": 4,
    "summary": "Put the live interactive Haven Helm demo on the homepage as a windowed preview that expands to the full demo, and made it remember the visitor choices between the preview and the full page.",
    "detail": "Windowed iframe embed with expand-to-full and a Back link; added localStorage persistence and fixed a latent cookie-size bug that silently dropped large selections; suppressed the analytics beacon inside the embed.",
    "benefit": "Visitors can try the controls without leaving the landing page and pick up where they left off in the full demo.",
    "ref": "2297ac9956",
    "features": []
  },
  {
    "id": 475,
    "date": "2026-05-29",
    "theme": "Process & discipline",
    "impact": 3,
    "summary": "Hardened the end-of-session routine and assistant guidelines for reliability and efficiency, and moved a stored password into the system keyring with its git history purged.",
    "detail": null,
    "benefit": "Safer, leaner, more consistent operations.",
    "ref": "b9baea50-8637-449a-8fc6-34d755d70326",
    "features": []
  },
  {
    "id": 474,
    "date": "2026-05-29",
    "theme": "Tooling & infrastructure",
    "impact": 3,
    "summary": "Built a searchable catalog of development tools and adopted ones that make build, data, and feed work faster and cheaper; fixed the conversation-transcript backup to capture every session automatically.",
    "detail": null,
    "benefit": "More reliable, more efficient development behind Haven.",
    "ref": "b9baea50-8637-449a-8fc6-34d755d70326",
    "features": []
  },
  {
    "id": 471,
    "date": "2026-05-29",
    "theme": "Process & discipline",
    "impact": 3,
    "summary": "Slimmed the assistant standing instructions by about half and moved the end-of-session routine into an on-demand skill, cutting ongoing overhead with no loss of behavior.",
    "detail": "Audited the instruction files, moved the Hasta ritual to an on-demand skill, removed duplicated blocks, and documented the harness token-cost model.",
    "benefit": "Lower per-session overhead and cleaner, more reliable instruction-following.",
    "ref": "b9baea50-8637-449a-8fc6-34d755d70326",
    "features": []
  },
  {
    "id": 470,
    "date": "2026-05-29",
    "theme": "Brand & packaging",
    "impact": 3,
    "summary": "Created clean Lulhaven brand assets: a crisp LULHAVEN logo and a square gnome icon, and cleaned up the hand-drawn Live demo note for the site.",
    "detail": "Re-rendered the LULHAVEN sign as a scalable logo, built a 512px gnome icon for store branding, and redrew the demo note arrow and cut it to a transparent image on the teal band.",
    "benefit": "Consistent, professional branding for the storefront and marketing.",
    "ref": "b9baea50-8637-449a-8fc6-34d755d70326",
    "features": []
  },
  {
    "id": 477,
    "date": "2026-05-29",
    "theme": "Demo page",
    "impact": 2,
    "summary": "The Haven Helm router UI now wears Haven's own brand — the Lulhaven sailor gnome in the browser tab and in the sidebar above the Lulhaven name — instead of the generic OpenWrt theme logo.",
    "detail": null,
    "benefit": "Owners see a Haven-branded product from first click, not a stock router admin.",
    "ref": "19cc90f743",
    "features": []
  },
  {
    "id": 467,
    "date": "2026-05-28",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Haven routers now configure themselves to your home network the moment you plug them in. The router automatically detects and resolves address conflicts with your existing equipment — whether it clashes with your current router's settings or your network is laid out differently than the factory default — so setup stays genuinely plug-and-play with no manual network configuration.",
    "detail": "On first power-up the router examines the network on both sides, chooses an address range that won't conflict, and quietly reconfigures itself if needed. Your existing devices keep working, and the router's filtering and admin page follow the new address automatically. The behavior is covered by an automated regression check. Rollout note: confirm the earliest Early-Adopter units receive this update.",
    "benefit": "A customer can plug a Haven router into any home network and have it just work — no manual setup — even when their existing router uses the same common address range or an unusual one.",
    "ref": "8ae6134362",
    "features": [
      {
        "id": 2,
        "lead": "Pre-flashed router"
      },
      {
        "id": 26,
        "lead": "Plug in, set a password, you are filtering"
      }
    ]
  },
  {
    "id": 463,
    "date": "2026-05-26",
    "theme": "Process & discipline",
    "impact": 5,
    "summary": "Automated end-to-end test suite for Haven — every release validated against a documented checklist before it ships.",
    "detail": "Five-tier regimen covers everything from internal schema checks to real-world customer DNS resolution; runs unattended in about a minute and notifies us by phone when a regression appears. Each result is logged so problems can be traced back to the moment they were introduced.",
    "benefit": "Every Haven change is validated before customers see it. Failures are caught in our lab, not in your living room.",
    "ref": "wiki-145",
    "features": []
  },
  {
    "id": 462,
    "date": "2026-05-26",
    "theme": "Architecture & data model",
    "impact": 5,
    "summary": "Discovered a fundamental limitation in a widely-used networking primitive that would have prevented per-device filtering from working as designed. Pivoted to a different approach before shipping.",
    "detail": "A multi-day deep-dive on how off-the-shelf networking software handles client-specific rules surfaced a quiet limitation that affects every product in this space. We redesigned around it before the feature shipped to customers.",
    "benefit": "Avoided shipping a feature that would have failed silently in homes. Caught the limitation in our lab, not in yours.",
    "ref": "wiki-145",
    "features": [
      {
        "id": 33,
        "lead": "Per-device profiles"
      }
    ]
  },
  {
    "id": 464,
    "date": "2026-05-26",
    "theme": "Tooling & infrastructure",
    "impact": 4,
    "summary": "Test-infrastructure validation pass — phone notifications, headless browser tests, simulated LAN clients, and unattended-sudo all working.",
    "detail": "Four of the seven planned test-tooling capabilities proven operational; two need a quick local config change to activate; one is awaiting a small hardware purchase.",
    "benefit": "The test regimen has everything it needs to run unattended overnight and ping us by phone when there's something to look at.",
    "ref": "session",
    "features": []
  },
  {
    "id": 460,
    "date": "2026-05-25",
    "theme": "Filtering",
    "impact": 5,
    "summary": "Per-device filtering — every device on the network can have its own content rules, independent of the household defaults.",
    "detail": "Households can now apply different rules to a kid's tablet versus a parent's laptop versus a guest's phone, all from one screen on the router. The defaults stay simple; the per-device controls are there when you want them and out of the way when you don't.",
    "benefit": "Households apply different rules to different devices — strict for some, light-touch for others, all without separate routers or accounts.",
    "ref": "wiki-137",
    "features": [
      {
        "id": 1,
        "lead": "Whole-home filtering"
      },
      {
        "id": 33,
        "lead": "Per-device profiles"
      }
    ]
  },
  {
    "id": 455,
    "date": "2026-05-25",
    "theme": "Tooling & infrastructure",
    "impact": 5,
    "summary": "Know Your Client (KYC): first-party pageview/event analytics live",
    "detail": "<backend table> + <backend table> tables in D1 <backend table>. Pages Functions /api/visit and /api/event. js/kyc.js beacon wired into every HTML page captures path, referrer, country/region/city, timezone, ASN+org, ua_class, daily-rotating visitor_hash, sessionStorage session_id, localStorage visitor_id for repeat-visit tracking. Owner-tag (not block) via havenowner=on URL flag.",
    "benefit": "First answer to 'is anyone visiting'; queries split lifetime uniques from returners; no third-party trackers, no consent banner needed.",
    "ref": "f6e964f533",
    "features": []
  },
  {
    "id": 452,
    "date": "2026-05-25",
    "theme": "Customer features (website)",
    "impact": 5,
    "summary": "New /milestones page: 436-row data-driven project history with impact filter + feature cross-link",
    "detail": "Milestones page reads accomplishments.public_* columns, paginated by impact (1-5 dropdown), sortable by newest/biggest. Banner-by-level blurb varies copy per impact tier. URL filter (?ids=...&label=...) lets feature rows link to the specific milestones that built them, with 'Show all' escape link.",
    "benefit": "Receipts not promises — 436 dated, themed, impact-scored milestones visible to prospective customers as proof-of-work.",
    "ref": "f6e964f533",
    "features": []
  },
  {
    "id": 451,
    "date": "2026-05-25",
    "theme": "Customer features (website)",
    "impact": 5,
    "summary": "New /benefits page: Why-the-customer-cares surface with 10 seeded benefits",
    "detail": "customer_benefits table (top/main sections, family/privacy ranks, related_feature_ids CSV, details HTML). Benefits-ui.js renders Family/Privacy sort + per-row Details panel + 'See the features that deliver this' cross-link. Pipeline mirrors features: <database> -> build.py -> js/customer-benefits.js -> benefits.html. Each benefit links to the features that deliver it via /features?ids=...&label=..., creating a three-page WHY -> WHAT -> WHEN cascade with filter banners.",
    "benefit": "Visitors land on customer outcomes first, with one-click navigation to the features that deliver them and the milestones that built them.",
    "ref": "f6e964f533",
    "features": []
  },
  {
    "id": 450,
    "date": "2026-05-25",
    "theme": "SQLite source-of-truth pipeline",
    "impact": 5,
    "summary": "Accomplishments table seeded — 421 rows spanning 2026-04-25 → 2026-05-25",
    "detail": "New accomplishments table — source-of-truth for the project history log. Seeded from 140 wiki notes + 281 git commits across website/data/haven-station repos. Theme-classified into 26 themes, with a benefit column populated (374 theme-default + 47 row-specific) so each row carries the outward-facing value, not just a restatement of what changed.",
    "benefit": "Project history captured as queryable data — every meaningful accomplishment in one place, ready to share.",
    "ref": "0ff4c1b63c",
    "features": []
  },
  {
    "id": 446,
    "date": "2026-05-25",
    "theme": "Session continuity",
    "impact": 5,
    "summary": "Session continuity log — accomplishments table + customer-features /features page live",
    "detail": "Wrap-up record capturing the day: accomplishments table seeded with 421 rows; /features page deployed with audience sort + telemetry; demo bullet linked from features list.",
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up where past-us left off.",
    "ref": "30c097f2b3",
    "features": []
  },
  {
    "id": 461,
    "date": "2026-05-25",
    "theme": "Live-fire findings",
    "impact": 4,
    "summary": "Per-device filtering deployed to the bench router — live-fire surfaced and fixed two bugs; a third turned out to be a deeper architectural blocker that pivoted the design.",
    "detail": "Controlled bench testing exposed problems that would have been hard to diagnose from customer reports. All three fixed at the lab, not in the field.",
    "benefit": "Caught critical regressions in a controlled bench environment before any customer shipment.",
    "ref": "wiki-144",
    "features": [
      {
        "id": 33,
        "lead": "Per-device profiles"
      }
    ]
  },
  {
    "id": 458,
    "date": "2026-05-25",
    "theme": "Process & discipline",
    "impact": 4,
    "summary": "Hasta routine extended: step 3 logs accomplishments with auto-scrubbed public columns",
    "detail": "CLAUDE.md and feedback_hasta memory updated to six-step ritual. New step 3: run haven-accomplishment.py for each substantial piece of work. Helper uses redact.py (15-category KYC rules) to auto-populate public_summary/detail/benefit/source_ref. Residue scan flags surviving tokens. Originals stay as-written; public_* is what ships.",
    "benefit": "Every session's work auto-logs to the customer-visible milestones page with public-safe scrubbing baked in; no manual review step needed.",
    "ref": "7df464a598",
    "features": []
  },
  {
    "id": 457,
    "date": "2026-05-25",
    "theme": "Marketing & website",
    "impact": 4,
    "summary": "Wi-Fi-exclusivity sweep + child/kid -> household-member rewrite across all customer surfaces",
    "detail": "Audited every customer-facing reference to 'Wi-Fi' or 'kid/kids' across features, benefits, and milestones tables. Rewrote network-medium-exclusive copy to include wired Ethernet ('on your network' + explicit Wi-Fi/Ethernet pairing where meaningful). Substituted 'kid' -> 'child' then 'children' -> 'household member' in 25 mentions across all surfaces. Two intentional keeps preserved: Parenting preset name, cultural critique line.",
    "benefit": "Copy now welcomes adult-self-filtering and senior-anti-scam users instead of framing Haven as exclusively family-filtering; no one feels excluded by the phrasing.",
    "ref": "f6e964f533",
    "features": []
  },
  {
    "id": 456,
    "date": "2026-05-25",
    "theme": "Customer features (website)",
    "impact": 4,
    "summary": "Customer features Details: 34 entries authored with audit fixes",
    "detail": "Wrote pull-back-curtain Details for 32 customer_features rows (~19000 chars HTML); audited and refined the existing two; corrected id 30 bullet_body Wi-Fi 5 -> Wi-Fi 6; built haven-feature-details.py CLI editor with auto-build + cache-bust on save.",
    "benefit": "Every customer feature claim now has a single click to the engineering reality behind it.",
    "ref": "f6e964f533",
    "features": []
  },
  {
    "id": 454,
    "date": "2026-05-25",
    "theme": "Brand & packaging",
    "impact": 4,
    "summary": "\"Meet Haven's Routers\" section added to the homepage — the Olive and Navy gnomes introduce the two product lineup.",
    "detail": "New section between hero and How-It-Works introduces Haven Olive (Essential Wi-Fi 6) and Haven Navy (Performance flagship) with mascot illustrations. The homepage previously named no specific product.",
    "benefit": "Visitors learn which Haven router fits their household before clicking through to specifications.",
    "ref": "f6e964f533",
    "features": [
      {
        "id": 30,
        "lead": "Haven OD"
      }
    ]
  },
  {
    "id": 453,
    "date": "2026-05-25",
    "theme": "Marketing & website",
    "impact": 4,
    "summary": "Hero restructured: 5 button-relevant pillars (Benefits / Features / Live Demo / Milestones / Get notified)",
    "detail": "Replaced 3-button + 3-product-pillar hero with 5-button row over 5 button-relevant pillars. Interactive Live Demo label pulses gold on green (CSS keyframes, pauses on hover, respects prefers-reduced-motion). Product pillars absorbed into Features page entries per anti-duplication rule.",
    "benefit": "Visitors see five clear doors into Haven at a glance; the most important next step is the visually loudest.",
    "ref": "f6e964f533",
    "features": []
  },
  {
    "id": 465,
    "date": "2026-05-25",
    "theme": "Burn procedure & build station",
    "impact": 3,
    "summary": "Internal deploy pipeline now migrates router data cleanly on first push. No more brief filter outage on the initial upgrade.",
    "detail": "Internal-only refinement.",
    "benefit": "OTA upgrades land cleanly; no brief filter gap on first push.",
    "ref": "wiki-144",
    "features": []
  },
  {
    "id": 459,
    "date": "2026-05-25",
    "theme": "Tooling & infrastructure",
    "impact": 3,
    "summary": "publish-content.sh: unified one-shot publish for /features /benefits /milestones",
    "detail": "Build + timestamp-based cache-buster bump + deploy in one command. Cache-buster discipline (Cloudflare max-age=14400 means stale browsers without ?v= bump) now automated. Workflow becomes: edit <database> in DB Browser -> <script> -> live.",
    "benefit": "End-to-end publish in one command; no human-error path for cache-busters; data edits land on the live site within seconds.",
    "ref": "7df464a598",
    "features": []
  },
  {
    "id": 271,
    "date": "2026-05-25",
    "theme": "Customer features (website)",
    "impact": 3,
    "summary": "sql: customer_features.details column + cellular explainer",
    "detail": null,
    "benefit": "One canonical feature surface — visitors find the angle relevant to them without us maintaining two pages.",
    "ref": "fa2fa8970e",
    "features": []
  },
  {
    "id": 141,
    "date": "2026-05-25",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "website: per-bullet Details button + one-at-a-time expand panel",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "ee2248006f",
    "features": []
  },
  {
    "id": 466,
    "date": "2026-05-25",
    "theme": "Tooling & infrastructure",
    "impact": 2,
    "summary": "claude-desktop (claude-cowork-linux GitHub install) fully removed including <file path> (2.3GB), fresh reinstall path documented; Claude Code CLI verified intact",
    "detail": "Inventoried all claude-cowork artifacts: <file path> (611M repo), <file path> (158M logs), <file path> (2.3G user data), launchers in <file path>, desktop file, icons, electron+asar via npm. User chose true clean slate. Removed everything except Claude Code CLI itself (which lives at <directory> and <directory> — different paths). One leftover symlink (/sessions, root-owned) requires Dave's sudo to remove. Fresh install path: git clone johnzfitch/claude-cowork-linux + bash install.sh.",
    "benefit": "Recovers from broken claude-desktop state without disturbing the working Claude Code CLI that runs the dev work; user data nuked per explicit user choice",
    "ref": "session",
    "features": []
  },
  {
    "id": 447,
    "date": "2026-05-24",
    "theme": "Session continuity",
    "impact": 5,
    "summary": "Session continuity log — Phase 0 off-network POC + multi-admin auth + notify v1 + verify hooks",
    "detail": "Massive session wrap-up: Phase 0 off-network filtering POC validated; multi-administrator auth shipped; notification subsystem v1 closed-loop in production; per-write verification hook added to feedback set.",
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up where past-us left off.",
    "ref": "efa92e34d7",
    "features": [
      {
        "id": 15,
        "lead": "Multi-administrator"
      }
    ]
  },
  {
    "id": 367,
    "date": "2026-05-24",
    "theme": "Off-network filtering",
    "impact": 5,
    "summary": "overlay+scripts: bake-in Cloudflare Tunnel + DoH stack (Phase 0 off-network)",
    "detail": null,
    "benefit": "Filtering follows household members off home Wi-Fi — closes the cellular bypass that defeats most competitors.",
    "ref": "c55539ac80",
    "features": [
      {
        "id": 13,
        "lead": "Bypass-resistant"
      },
      {
        "id": 14,
        "lead": "Filtering follows household members wherever they go"
      }
    ]
  },
  {
    "id": 279,
    "date": "2026-05-24",
    "theme": "Email notifications",
    "impact": 5,
    "summary": "data: — notify subsystem v1 closed loop live (new MAC → email)",
    "detail": null,
    "benefit": "Parents see what is happening on their network without having to log in and look.",
    "ref": "730fa71d8e",
    "features": [
      {
        "id": 17,
        "lead": "New-device email alerts"
      }
    ]
  },
  {
    "id": 278,
    "date": "2026-05-24",
    "theme": "Product definition",
    "impact": 5,
    "summary": "product: feature inventory v0.2 — full rewrite from memory + wiki",
    "detail": null,
    "benefit": "Scope and language locked — every downstream decision is faster and more consistent.",
    "ref": "e1f1fdc37e",
    "features": []
  },
  {
    "id": 277,
    "date": "2026-05-24",
    "theme": "Product definition",
    "impact": 5,
    "summary": "data: — product feature inventory v0.2 logged",
    "detail": null,
    "benefit": "Scope and language locked — every downstream decision is faster and more consistent.",
    "ref": "406a14d090",
    "features": []
  },
  {
    "id": 276,
    "date": "2026-05-24",
    "theme": "Product definition",
    "impact": 5,
    "summary": "product: inventory v0.2 — incorporate 'The Haven Helm' terminology (Section A10 + C-15 resolved)",
    "detail": null,
    "benefit": "Brand vocabulary locked. Every customer-facing surface uses ONE name for the control surface — no 'dashboard' vs 'admin UI' confusion.",
    "ref": "3e52af069e",
    "features": []
  },
  {
    "id": 275,
    "date": "2026-05-24",
    "theme": "Product definition",
    "impact": 5,
    "summary": "product: terse feature list companion to v0.2 inventory",
    "detail": null,
    "benefit": "Scope and language locked — every downstream decision is faster and more consistent.",
    "ref": "9e3550e4cf",
    "features": []
  },
  {
    "id": 140,
    "date": "2026-05-24",
    "theme": "Product definition",
    "impact": 5,
    "summary": "Product feature inventory v0.2 — internal source-of-truth spec, supersedes v0.1.",
    "detail": "Rewrote the master capability list from primary sources rather than a single conversation transcript. Every marketing surface — website, demo, support docs — now derives from one accurate document.",
    "benefit": "What we promise customers matches what we ship. One source feeds every external surface.",
    "ref": "",
    "features": []
  },
  {
    "id": 139,
    "date": "2026-05-24",
    "theme": "Email notifications",
    "impact": 5,
    "summary": "Notification system v1 — closed-loop live: a new device on your network triggers an email.",
    "detail": "First Haven notification event proven end-to-end in production. Parents get instant awareness when a new device joins the home network — no checking the screen required.",
    "benefit": "Customers find out about activity on their network without having to log in. The system reaches out to them.",
    "ref": "",
    "features": [
      {
        "id": 17,
        "lead": "New-device email alerts"
      }
    ]
  },
  {
    "id": 136,
    "date": "2026-05-24",
    "theme": "SQLite source-of-truth pipeline",
    "impact": 5,
    "summary": "Change-log / audit table — knowing which machine made a filter change (Phase 1.5)",
    "detail": "Dave 2026-05-24 09:24 CDT: \"How difficult would it be to keep a file change table?\nEveryone logs in as root, but we could at least know which machine they are locked in\nfrom, right?\"",
    "benefit": "Audit table designs the answer to 'who changed what filter at what time' — accountability when there are multiple admins in the house.",
    "ref": "",
    "features": []
  },
  {
    "id": 368,
    "date": "2026-05-24",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Each router auto-generates its own unique secure-tunnel keypair at first boot — no shared secrets across the fleet.",
    "detail": "Internal-only refinement on how each router establishes its crypto identity.",
    "benefit": "Every router has a unique secure-tunnel identity from day one — no central key escrow, no fleet-wide compromise risk.",
    "ref": "e189a96a9c",
    "features": []
  },
  {
    "id": 366,
    "date": "2026-05-24",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Dedicated persistent storage area implemented for the Navy router model — survives a factory reset.",
    "detail": "Customer settings now live in a partition that the reset button doesn't touch. Reset clears the firmware; your filter choices stay.",
    "benefit": "Customers can factory-reset the router without losing their content rules. Setup is once, not every time something goes wrong.",
    "ref": "4f200b454a",
    "features": [
      {
        "id": 10,
        "lead": "Survives a factory reset"
      }
    ]
  },
  {
    "id": 365,
    "date": "2026-05-24",
    "theme": "Email notifications",
    "impact": 4,
    "summary": "notify subsystem v1: Cloudflare Worker + router detector + cron",
    "detail": null,
    "benefit": "Parents see what is happening on their network without having to log in and look.",
    "ref": "173f36dbd4",
    "features": [
      {
        "id": 17,
        "lead": "New-device email alerts"
      }
    ]
  },
  {
    "id": 363,
    "date": "2026-05-24",
    "theme": "Email notifications",
    "impact": 4,
    "summary": "notify: D1-backed multi-household routing + dispatch audit log",
    "detail": null,
    "benefit": "Parents see what is happening on their network without having to log in and look.",
    "ref": "1072f3dcdb",
    "features": [
      {
        "id": 17,
        "lead": "New-device email alerts"
      }
    ]
  },
  {
    "id": 361,
    "date": "2026-05-24",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "haven-overlay: migrate known_macs to /<router data partition> via symlink",
    "detail": null,
    "benefit": "First customer-data table living on /<router data partition>. Factory reset preserves device list — new-device notification doesn't flood after every reset.",
    "ref": "34eb351f3d",
    "features": []
  },
  {
    "id": 281,
    "date": "2026-05-24",
    "theme": "Multi-administrator UI",
    "impact": 4,
    "summary": "data: — first-run UX, multi-admin, root invisible (Phase 1.5 design)",
    "detail": null,
    "benefit": "Both parents can manage filters from their own accounts; root is hidden so a misclick cannot lock the family out.",
    "ref": "3e2c8a9e4f",
    "features": [
      {
        "id": 15,
        "lead": "Multi-administrator"
      }
    ]
  },
  {
    "id": 273,
    "date": "2026-05-24",
    "theme": "SQLite source-of-truth pipeline",
    "impact": 4,
    "summary": "sql: replace.md feature exporters with single JS dataset",
    "detail": null,
    "benefit": "Single place to edit data; everything else regenerates — no parallel maintenance, no drift.",
    "ref": "04207d6cdd",
    "features": []
  },
  {
    "id": 157,
    "date": "2026-05-24",
    "theme": "Multi-administrator UI",
    "impact": 4,
    "summary": "demo: Administrators panel — multi-admin UX showcase on the website",
    "detail": null,
    "benefit": "Both parents can manage filters from their own accounts; root is hidden so a misclick cannot lock the family out.",
    "ref": "97a372ff53",
    "features": [
      {
        "id": 15,
        "lead": "Multi-administrator"
      }
    ]
  },
  {
    "id": 145,
    "date": "2026-05-24",
    "theme": "Customer features (website)",
    "impact": 4,
    "summary": "website: Features page with sort-by-audience + first-click telemetry",
    "detail": null,
    "benefit": "Visitors browse Haven's full feature set via either Family or Privacy sort — same content, audience-led order.",
    "ref": "46511f4c5e",
    "features": []
  },
  {
    "id": 135,
    "date": "2026-05-24",
    "theme": "Architecture & data model",
    "impact": 4,
    "summary": "Per-device filter profiles — schema + precedence model for v1.5",
    "detail": "Dave 2026-05-24 09:15 CDT, thinking out loud about per-device filtering: \"we could save\nour dataset just with a device label on it, and we could have multiple — we could have\na million of them. And the other thing is, we could also have an overall, like, default\nthat would requir…",
    "benefit": "Per-device filter profile schema designed; we can ship 'Different household members' devices can have different rules' without rewriting the data layer.",
    "ref": "",
    "features": [
      {
        "id": 33,
        "lead": "Per-device profiles"
      }
    ]
  },
  {
    "id": 364,
    "date": "2026-05-24",
    "theme": "Email notifications",
    "impact": 3,
    "summary": "notify: bearer-token auth on Worker + router script",
    "detail": null,
    "benefit": "Parents see what is happening on their network without having to log in and look.",
    "ref": "4115cb678e",
    "features": []
  },
  {
    "id": 362,
    "date": "2026-05-24",
    "theme": "Email notifications",
    "impact": 3,
    "summary": "notify: per-(serial, event_type) rate limit on Worker",
    "detail": null,
    "benefit": "Parents see what is happening on their network without having to log in and look.",
    "ref": "9a1b60fc06",
    "features": []
  },
  {
    "id": 360,
    "date": "2026-05-24",
    "theme": "Multi-administrator UI",
    "impact": 3,
    "summary": "haven-overlay: <auth sync script> — single source of truth <system auth file>",
    "detail": null,
    "benefit": "Data-driven multi-admin auth: <system auth file> is the single source of truth for who can log into the Helm — no parallel <auth daemon> config drift.",
    "ref": "b7c3a5523b",
    "features": [
      {
        "id": 15,
        "lead": "Multi-administrator"
      }
    ]
  },
  {
    "id": 285,
    "date": "2026-05-24",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "data: wiki — emergency info-seeking design (tourniquet scenario)",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "fbf722c23b",
    "features": [
      {
        "id": 34,
        "lead": "Emergency-unblock button"
      }
    ]
  },
  {
    "id": 284,
    "date": "2026-05-24",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "data: wiki — per-device filter profiles schema + precedence (v1.5 design)",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "abe4377b9e",
    "features": [
      {
        "id": 33,
        "lead": "Per-device profiles"
      }
    ]
  },
  {
    "id": 283,
    "date": "2026-05-24",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "data: amend — per-device filter design collapsed by one-password threat model",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "2210393efb",
    "features": [
      {
        "id": 33,
        "lead": "Per-device profiles"
      }
    ]
  },
  {
    "id": 282,
    "date": "2026-05-24",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "data: — change_log / audit table design for Phase 1.5",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "6dedaafc3b",
    "features": []
  },
  {
    "id": 274,
    "date": "2026-05-24",
    "theme": "Customer features (website)",
    "impact": 3,
    "summary": "sql: customer_features table + audience-routed exporter",
    "detail": null,
    "benefit": "Single canonical feature surface for /features and any future audience page. Audience-led views from one row set.",
    "ref": "c409266529",
    "features": []
  },
  {
    "id": 272,
    "date": "2026-05-24",
    "theme": "Customer features (website)",
    "impact": 3,
    "summary": "sql: customer_features.link column + demo row linked",
    "detail": null,
    "benefit": "One canonical feature surface — visitors find the angle relevant to them without us maintaining two pages.",
    "ref": "0b96178b07",
    "features": []
  },
  {
    "id": 156,
    "date": "2026-05-24",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "website: bus-and-phone quote above \"47 Strategies\" card",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "d3c1b27480",
    "features": []
  },
  {
    "id": 155,
    "date": "2026-05-24",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "website: refine bus quote — 'Who drives your bus?' framing",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "acbe91f3e4",
    "features": []
  },
  {
    "id": 152,
    "date": "2026-05-24",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "website: replace haven-ui screenshot with full-resolution 1918x957 capture",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "6e6f6be2e2",
    "features": []
  },
  {
    "id": 151,
    "date": "2026-05-24",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "Website browser-on-Haven card retitled for faster customer understanding.",
    "detail": "",
    "benefit": "Visitors get the value proposition faster; conversion up.",
    "ref": "931c0db9ad",
    "features": []
  },
  {
    "id": 150,
    "date": "2026-05-24",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "Browser-on-Haven body copy rewritten to match new title and drop third-party-firmware references.",
    "detail": "",
    "benefit": "Visitors land on a page that explains Haven faster.",
    "ref": "956eadfc84",
    "features": []
  },
  {
    "id": 149,
    "date": "2026-05-24",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "website: hero subtitle 'feed them garbage' → 'spew garbage'",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "fc69024a38",
    "features": []
  },
  {
    "id": 148,
    "date": "2026-05-24",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "website: hero body — broaden to households (parents + algorithm-conscious adults)",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "2060937011",
    "features": []
  },
  {
    "id": 147,
    "date": "2026-05-24",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "website: hero body — 'whole household', 'It fixes:' lead, one-grievance-per-line layout",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "7506d876bf",
    "features": []
  },
  {
    "id": 146,
    "date": "2026-05-24",
    "theme": "Customer features (website)",
    "impact": 3,
    "summary": "website: customer feature landing pages (family + privacy)",
    "detail": null,
    "benefit": "One canonical feature surface — visitors find the angle relevant to them without us maintaining two pages.",
    "ref": "0d30f20df6",
    "features": []
  },
  {
    "id": 144,
    "date": "2026-05-24",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "website: equal-width hero buttons + linkable feature bullets",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "d410675a8f",
    "features": []
  },
  {
    "id": 142,
    "date": "2026-05-24",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "website: shorter sort buttons + 'Sort:' label; hero line swap",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "16620cb035",
    "features": []
  },
  {
    "id": 137,
    "date": "2026-05-24",
    "theme": "Brand & packaging",
    "impact": 3,
    "summary": "First-run UX — soft-redirect root login to administrator-create page; Mom IS the superuser",
    "detail": "Dave 2026-05-24 09:32 CDT: \"I think that the root user is only a thing for Linux people,\nand that to make this a friendlier, less Linux specific kind of application, we're gonna\nend up with additional users.\"",
    "benefit": "First-run UX locked: Mom names herself the admin, root disappears. Customer never sees the word 'root' or has to think about Linux user accounts.",
    "ref": "",
    "features": [
      {
        "id": 15,
        "lead": "Multi-administrator"
      }
    ]
  },
  {
    "id": 134,
    "date": "2026-05-24",
    "theme": "Planning & roadmap",
    "impact": 3,
    "summary": "Emergency information-seeking — design responses to false-positive blocks during a real emergency",
    "detail": "Dave 2026-05-24 09:12 CDT, in a \"mixed feelings\" reflection on filtering: imagine you're\ntrying to figure out how to put together a tourniquet, you're searching online, and a\nHaven category block puts you between you and the page. That's the failure mode where the\nfilter actively…",
    "benefit": "Emergency info-seeking design baked in. Anyone bleeding out can always reach poison control / Red Cross / Mayo — filter never blocks the actual emergency.",
    "ref": "",
    "features": [
      {
        "id": 34,
        "lead": "Emergency-unblock button"
      }
    ]
  },
  {
    "id": 153,
    "date": "2026-05-24",
    "theme": "Marketing & website",
    "impact": 2,
    "summary": "website: fix Click,Save card — item-img height:auto so the hero-sized image doesn't overflow",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "f2a75e47ce",
    "features": []
  },
  {
    "id": 143,
    "date": "2026-05-24",
    "theme": "Customer features (website)",
    "impact": 2,
    "summary": "website: bump customer-features cache-buster (v=20260525-2)",
    "detail": null,
    "benefit": "One canonical feature surface — visitors find the angle relevant to them without us maintaining two pages.",
    "ref": "d5cdc1516d",
    "features": []
  },
  {
    "id": 280,
    "date": "2026-05-24",
    "theme": "Wiki & documentation",
    "impact": 1,
    "summary": "data: — two-tier export (filter shareable + user-data encrypted backup)",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "83f03449ff",
    "features": []
  },
  {
    "id": 154,
    "date": "2026-05-24",
    "theme": "Marketing & website",
    "impact": 1,
    "summary": "website: promote Haven UI screenshot to full-width hero-sized card; rename to 'Click, Save'",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "22eb606ae3",
    "features": []
  },
  {
    "id": 138,
    "date": "2026-05-24",
    "theme": "Firmware & overlay",
    "impact": 1,
    "summary": "Two-tier export — shareable filter export + encrypted user-data backup (Phase 1.5)",
    "detail": "Dave 2026-05-24 10:02 CDT, in the factory-reset recovery discussion: \"if we add user data\nto the export, you might have a quick way to get back to when you made your export...\nWe would need to make a separate user data specific export. You don't want to give your\ncredentials to t…",
    "benefit": "Two-tier export design: customers can share their filter set with a friend, OR back up everything with a passphrase Haven cannot decrypt.",
    "ref": "",
    "features": []
  },
  {
    "id": 449,
    "date": "2026-05-23",
    "theme": "Session continuity",
    "impact": 5,
    "summary": "YouTube channel-level filtering integrated with the household category controls.",
    "detail": "Selecting a category in the household controls now drives the YouTube channel blocklist automatically — no separate management, no parallel configuration. One toggle, one effect.",
    "benefit": "YouTube blocklists update themselves as household preferences change. Customers don't manage two lists.",
    "ref": "7e76f5f06f",
    "features": [
      {
        "id": 8,
        "lead": "Quiet the feed"
      }
    ]
  },
  {
    "id": 287,
    "date": "2026-05-23",
    "theme": "Wiki & documentation",
    "impact": 5,
    "summary": "data: wiki — Phase 0 POC greenlit (off-network architecture)",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "d5421c6bd6",
    "features": []
  },
  {
    "id": 286,
    "date": "2026-05-23",
    "theme": "Wiki & documentation",
    "impact": 5,
    "summary": "data: wiki — Phase 0 POC COMPLETE (off-network filtering proven end-to-end)",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "c1e360bcdd",
    "features": []
  },
  {
    "id": 133,
    "date": "2026-05-23",
    "theme": "Architecture & data model",
    "impact": 5,
    "summary": "Off-network filtering proven end-to-end — Haven now filters content even when devices leave the home Wi-Fi.",
    "detail": "The hardest gap in this product category — what happens when the kid's phone leaves the house — is closed. Filtering follows the household member, not the network.",
    "benefit": "Haven keeps working when devices roam to cellular or guest Wi-Fi. The gap that breaks every competitor is closed.",
    "ref": "",
    "features": [
      {
        "id": 14,
        "lead": "Filtering follows household members wherever they go"
      },
      {
        "id": 29,
        "lead": "Haven Navy"
      }
    ]
  },
  {
    "id": 131,
    "date": "2026-05-23",
    "theme": "Architecture & data model",
    "impact": 5,
    "summary": "Off-network filtering architecture greenlit — covering both no-setup mass-market and Pro-tier customer paths.",
    "detail": "Strategic decision: ship two complementary off-network approaches so the full customer spectrum is covered, from \"just plug it in\" to \"I want full-tunnel everywhere.\"",
    "benefit": "No customer is forced to choose; the right off-network path is matched to how they actually use the internet.",
    "ref": "",
    "features": []
  },
  {
    "id": 127,
    "date": "2026-05-23",
    "theme": "LuCI / UI",
    "impact": 5,
    "summary": "YouTube account-level enforcement shipped in the household control screen.",
    "detail": "Customers can opt-in to apply their YouTube channel preferences to their actual YouTube account, not just block at the network layer. Off by default; takes effect only when explicitly enabled.",
    "benefit": "Channel suppression travels with the user's YouTube account — works wherever they sign in, not just on the home network.",
    "ref": "",
    "features": [
      {
        "id": 8,
        "lead": "Quiet the feed"
      }
    ]
  },
  {
    "id": 125,
    "date": "2026-05-23",
    "theme": "SQLite source-of-truth pipeline",
    "impact": 5,
    "summary": "Account-enforcement Step A schema locked",
    "detail": "<database> gets yt_item_actions (PK category_key+item_key+action, CHECK action IN ('dont_recommend'), CHECK enabled IN (0,1), STRICT, modified-trigger, idx on enabled+modified). Item-keyed (not channel-keyed) — parent toggles per-entity (e.g. Fox News); router expands to channel_id…",
    "benefit": "Single place to edit data; everything else regenerates — no parallel maintenance, no drift.",
    "ref": "",
    "features": []
  },
  {
    "id": 289,
    "date": "2026-05-23",
    "theme": "SQLite source-of-truth pipeline",
    "impact": 4,
    "summary": "data: export_main_htm.py emits YTITEMS block; wiki notes 127-130",
    "detail": null,
    "benefit": "Single place to edit data; everything else regenerates — no parallel maintenance, no drift.",
    "ref": "b92805e25e",
    "features": []
  },
  {
    "id": 132,
    "date": "2026-05-23",
    "theme": "Marketing & website",
    "impact": 4,
    "summary": "Design: bypass posture is prevention + monitoring fallback (DNS-tamper detection)",
    "detail": "Dave decision 2026-05-23: Haven's bypass story is not pure prevention — it is\nprevention with a monitoring fallback. A determined user will always find a hole\n(VPN, cellular, manual DNS change on the device). The design concession is to\ndetect, not deny, the holes Haven can't phys…",
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "",
    "features": [
      {
        "id": 13,
        "lead": "Bypass-resistant"
      }
    ]
  },
  {
    "id": 128,
    "date": "2026-05-23",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Account-enforcement Step D plumbing done; firing stubbed",
    "detail": "Step D split into two sub-steps. D.1 (this session): plumbing. MainActivity.kt fetchActions() mirrors fetchBlocklist(), pushes window.havenYtActions={v,actions} at onPageFinished; haven_filter.js passive sweep walks every InnerTube response for menuServiceItemRenderer with NOT_IN…",
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "",
    "features": []
  },
  {
    "id": 448,
    "date": "2026-05-23",
    "theme": "Session continuity",
    "impact": 3,
    "summary": "Session continuity log — NetworkChuck competitive notes + hero CTA refresh",
    "detail": "Captured competitive teardown of NetworkChuck-style DIY router pitches against Haven's pre-flashed approach; refreshed homepage hero CTAs.",
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up where past-us left off.",
    "ref": "165e9beb81",
    "features": []
  },
  {
    "id": 297,
    "date": "2026-05-23",
    "theme": "Session continuity",
    "impact": 3,
    "summary": "data: add session_summary table to <database>",
    "detail": null,
    "benefit": "Hasta ritual closes every session by recording what shipped + what's pending. Next session starts oriented, not re-discovering.",
    "ref": "09d7272ea7",
    "features": []
  },
  {
    "id": 296,
    "date": "2026-05-23",
    "theme": "Session continuity",
    "impact": 3,
    "summary": "orient: inject session_summary into SessionStart hook + CLAUDE.md",
    "detail": null,
    "benefit": "Hasta ritual closes every session by recording what shipped + what's pending. Next session starts oriented, not re-discovering.",
    "ref": "9afd08edde",
    "features": []
  },
  {
    "id": 295,
    "date": "2026-05-23",
    "theme": "Session continuity",
    "impact": 3,
    "summary": "orient: add orient.sh to git tracking (moved from.claude/, symlinked back)",
    "detail": null,
    "benefit": "Sessions resume with full context; no rediscovery, no lost decisions.",
    "ref": "3efea8c26a",
    "features": []
  },
  {
    "id": 294,
    "date": "2026-05-23",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "data: remove manga draft docs and chapter images (moved to external storage)",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "852919ecdd",
    "features": []
  },
  {
    "id": 293,
    "date": "2026-05-23",
    "theme": "Session continuity",
    "impact": 3,
    "summary": "data: session summary row 4 — orient/hasta/git fixes (2026-05-23)",
    "detail": null,
    "benefit": "Hasta ritual closes every session by recording what shipped + what's pending. Next session starts oriented, not re-discovering.",
    "ref": "d48b8fdc22",
    "features": []
  },
  {
    "id": 292,
    "date": "2026-05-23",
    "theme": "Session continuity",
    "impact": 3,
    "summary": "orient.sh: add MANDATORY orientation directive + scheduled reminders",
    "detail": null,
    "benefit": "Sessions resume with full context; no rediscovery, no lost decisions.",
    "ref": "ec89f47380",
    "features": []
  },
  {
    "id": 290,
    "date": "2026-05-23",
    "theme": "YouHaven anti-algorithm app",
    "impact": 3,
    "summary": "YouTube channel blocklist now driven dynamically from household category preferences.",
    "detail": "",
    "benefit": "Customers manage one list, not two; YouTube blocklists auto-update.",
    "ref": "24de75aecb",
    "features": [
      {
        "id": 8,
        "lead": "Quiet the feed"
      }
    ]
  },
  {
    "id": 288,
    "date": "2026-05-23",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "data: wiki notes #131, #132 — NetworkChuck OpenDNS + PiHole competitive read",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "6fa064e804",
    "features": []
  },
  {
    "id": 161,
    "date": "2026-05-23",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "website: point Chapter 2b to heyzine + Google Drive reader",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "d8ff425978",
    "features": []
  },
  {
    "id": 160,
    "date": "2026-05-23",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "website: add Chapter 2a button; move NCC section below copyright",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "5333183c5c",
    "features": []
  },
  {
    "id": 158,
    "date": "2026-05-23",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "website: move hero CTAs above pillars; tighten subtitle to \"It shouldn't feed them garbage.\"",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "744b1d34e2",
    "features": []
  },
  {
    "id": 130,
    "date": "2026-05-23",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "NetworkChuck PiHole sequel — DIY escalation tier, security holes, off-network validation",
    "detail": "Sequel to wiki (OpenDNS tutorial). NetworkChuck's \"BLOCK EVERYTHING w/ PiHole\non Docker, OpenDNS and IFTTT\" (May 2020, 920K views, 891 comments) is the DIY-IT\nESCALATION TIER — the viewer who started with OpenDNS and now wants ad-blocking, granular\ndomain control, and v…",
    "benefit": "PiHole comparison cataloged — Haven covers what PiHole forces hobbyists to figure out themselves.",
    "ref": "",
    "features": []
  },
  {
    "id": 129,
    "date": "2026-05-23",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "NetworkChuck OpenDNS tutorial — competitive read + voice-of-customer quotes",
    "detail": "The canonical DIY \"block adult sites at home\" YouTube tutorial is NetworkChuck's \"block\nADULT sites and other BAD STUFF on your home network (EASY)\" — Apr 2020, 5.27M-subscriber\nchannel, 638K views, walks IT-literate viewers through setting OpenDNS as their home\nrouter's upstream…",
    "benefit": "NetworkChuck's audience identified as the parent-and-privacy crossover Haven also targets — competitive read confirms Haven's positioning is durable.",
    "ref": "",
    "features": []
  },
  {
    "id": 291,
    "date": "2026-05-23",
    "theme": "YouHaven anti-algorithm app",
    "impact": 1,
    "summary": "data: golden /youtubei/v1/search sample + gitignore Chrome debug profile",
    "detail": null,
    "benefit": "Adults get an exit from algorithmic feeds; Haven serves both parents AND grown-up privacy buyers.",
    "ref": "9ef8910d1a",
    "features": []
  },
  {
    "id": 159,
    "date": "2026-05-23",
    "theme": "Build pipeline",
    "impact": 1,
    "summary": "api: regenerate <database> + feed-delta.db with item_yt_channels",
    "detail": null,
    "benefit": "Edits flow source → live in one script. No copy-paste, no stale artifacts.",
    "ref": "a52ce93e1a",
    "features": []
  },
  {
    "id": 126,
    "date": "2026-05-23",
    "theme": "Firmware & overlay",
    "impact": 1,
    "summary": "Internal plumbing for the YouTube account-action layer wired up — completes the chain from category toggle to the YouHaven app.",
    "detail": "",
    "benefit": "YouTube channel preferences flow through the household controls and reach the app reliably.",
    "ref": "",
    "features": []
  },
  {
    "id": 124,
    "date": "2026-05-22",
    "theme": "Architecture & data model",
    "impact": 4,
    "summary": "Cloud proxy round-trip granularity — one per video play, not per packet",
    "detail": "QUESTION: How many tunnel callback round trips does the cloud proxy require?",
    "benefit": "Today's design supports tomorrow's features without painful rewrites.",
    "ref": "",
    "features": []
  },
  {
    "id": 123,
    "date": "2026-05-22",
    "theme": "Architecture & data model",
    "impact": 4,
    "summary": "Cloud proxy callback to router — CGNAT problem solved by Cloudflare Tunnel",
    "detail": "QUESTION: Can the cloud proxy call back to the router's dynamic IP to get the blocklist in real time?",
    "benefit": "Today's design supports tomorrow's features without painful rewrites.",
    "ref": "",
    "features": [
      {
        "id": 14,
        "lead": "Filtering follows household members wherever they go"
      }
    ]
  },
  {
    "id": 122,
    "date": "2026-05-22",
    "theme": "Architecture & data model",
    "impact": 4,
    "summary": "Cloud proxy filter data flow — router pushes blocklist to D1 on preference change",
    "detail": "HOW FILTER DATA REACHES THE CLOUD PROXY:",
    "benefit": "Today's design supports tomorrow's features without painful rewrites.",
    "ref": "",
    "features": []
  },
  {
    "id": 121,
    "date": "2026-05-22",
    "theme": "Architecture & data model",
    "impact": 4,
    "summary": "Cloud proxy heavy lifting breakdown — Cloudflare Workers is strongest option",
    "detail": "BREAKDOWN: What the cloud proxy does (heavy lifting moved off router):\n 1. TLS termination — decrypts HTTPS from router using cloud cert\n 2. Request inspection — identifies /youtubei/v1/player vs browse/search endpoints\n 3. Payload parsing — extracts channelId from player resp…",
    "benefit": "Today's design supports tomorrow's features without painful rewrites.",
    "ref": "",
    "features": []
  },
  {
    "id": 120,
    "date": "2026-05-22",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Cloud-proxy and secure-tunnel features coexist on the Navy router — no auxiliary hardware needed.",
    "detail": "Both off-network capabilities run on the standard Navy hardware without conflict; customers don't need a separate Raspberry Pi or NAS to enable them.",
    "benefit": "Filtering follows household members off home Wi-Fi — closes the cellular bypass that defeats most competitors. No extra device required.",
    "ref": "",
    "features": []
  },
  {
    "id": 163,
    "date": "2026-05-21",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "Add Chapter 2b manga page and button",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "a739f87378",
    "features": []
  },
  {
    "id": 162,
    "date": "2026-05-21",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "Switch manga reader to media.lulhaven.com custom domain",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "f9873aba81",
    "features": []
  },
  {
    "id": 298,
    "date": "2026-05-20",
    "theme": "Repo hygiene",
    "impact": 5,
    "summary": "cowork 2026-05-20: Ch2b milestone note; Anifusion workflow documented",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "af93c89a96",
    "features": []
  },
  {
    "id": 119,
    "date": "2026-05-20",
    "theme": "Process & discipline",
    "impact": 5,
    "summary": "MILESTONE 2026-05-20: Chapter 2b manga complete (Anifusion)",
    "detail": "## MILESTONE — Chapter 2b Complete (Anifusion)\nDate: 2026-05-20\nTool: Anifusion (replacing mangaka.app as of this chapter)",
    "benefit": "Less waste, fewer back-and-forths, more shipped work per session.",
    "ref": "",
    "features": []
  },
  {
    "id": 309,
    "date": "2026-05-17",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "manga: harvest Chapter 2 session decisions into manga.db",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "f1c51a212d",
    "features": []
  },
  {
    "id": 308,
    "date": "2026-05-17",
    "theme": "Session continuity",
    "impact": 3,
    "summary": "transcript index: add transcripts.db (FTS5) + indexer scripts",
    "detail": null,
    "benefit": "Sessions resume with full context; no rediscovery, no lost decisions.",
    "ref": "b5cef21b6b",
    "features": []
  },
  {
    "id": 307,
    "date": "2026-05-17",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "Chapter 2: append pages 20-26 (Unit Test through The Tip), renumber old pages to 27-33, 8 new manga.db entries",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "9b650624c3",
    "features": []
  },
  {
    "id": 306,
    "date": "2026-05-17",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "Chapter 2: append pages 27-28 (Imagine + The Job), renumber old pages to 29-35, 3 new manga.db entries",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "82399211a0",
    "features": []
  },
  {
    "id": 305,
    "date": "2026-05-17",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "Chapter 2: word trim + epilogue (Open Box Therapy / Ain't Misbe-Haven), 3 new manga.db entries — pages 1-28+epilogue = 4,460 words",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "b4a214ee9d",
    "features": []
  },
  {
    "id": 303,
    "date": "2026-05-17",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "Chapter 2 Draft 1 trimmed to 4948 words — ready for mangaka.app",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "79b4d6eed5",
    "features": []
  },
  {
    "id": 302,
    "date": "2026-05-17",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "Strip heading # markers — 4909 words for mangaka.app",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "3eb0cdfa84",
    "features": []
  },
  {
    "id": 300,
    "date": "2026-05-17",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "Log epilogue Droste recursion gag — supplied image, last page",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "7c5388f458",
    "features": []
  },
  {
    "id": 299,
    "date": "2026-05-17",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "manga: harvest Chapter 2a + 2b decisions; commit drafts; lore update",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "2bb1c4f493",
    "features": []
  },
  {
    "id": 164,
    "date": "2026-05-17",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "hero: parent-positioning rewrite + new hero image",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "f86359c118",
    "features": []
  },
  {
    "id": 118,
    "date": "2026-05-17",
    "theme": "Process & discipline",
    "impact": 3,
    "summary": "Cowork session continuity infrastructure (May 17 2026)",
    "detail": "Wired up in Cowork session c3a808c9:",
    "benefit": "Less waste, fewer back-and-forths, more shipped work per session.",
    "ref": "",
    "features": []
  },
  {
    "id": 304,
    "date": "2026-05-17",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "Ch2: Jessica Erickson (Norse/NCC nod) + Bella canon entries, story-text pipeline note, character block in storyboard header",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "f576f6c66d",
    "features": []
  },
  {
    "id": 301,
    "date": "2026-05-17",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "Aggressive edit pass — 4576 words (from 4909)",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "f63ee15d11",
    "features": []
  },
  {
    "id": 378,
    "date": "2026-05-16",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Phase 2 orchestrators: full-haven-from-oem.sh + full-refresh-haven.sh",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "d9cc60280d",
    "features": [
      {
        "id": 2,
        "lead": "Pre-flashed router"
      }
    ]
  },
  {
    "id": 379,
    "date": "2026-05-16",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "flash-haven + start-burn: 3 cosmetic + UX fixes from 2026-05-16 chain test",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "b4c9e37b56",
    "features": [
      {
        "id": 2,
        "lead": "Pre-flashed router"
      },
      {
        "id": 26,
        "lead": "Plug in, set a password, you are filtering"
      }
    ]
  },
  {
    "id": 377,
    "date": "2026-05-16",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "start-burn.sh: REDO path now backfills customer/hardware/firmware from D1",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "e1dba06af6",
    "features": []
  },
  {
    "id": 376,
    "date": "2026-05-16",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "start-burn.sh: also uppercase serial input (matches model normalization)",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "9c9d57af4f",
    "features": []
  },
  {
    "id": 374,
    "date": "2026-05-16",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "reset-to-oem.sh: re-run wireless.sh at end to restore split-DNS baseline",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "f3f1fababb",
    "features": []
  },
  {
    "id": 369,
    "date": "2026-05-16",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Firmware-image release-tracking refined — every shipped image is registered and traceable.",
    "detail": "Internal-only registry change. Each customer router's firmware version can be looked up against a known build.",
    "benefit": "When a customer asks \"what firmware is on my router?\", we know — and can match it to a known-good build.",
    "ref": "e63c222b06",
    "features": []
  },
  {
    "id": 117,
    "date": "2026-05-16",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Standing policy: capture the original factory firmware image from every new-in-box router before flashing Haven onto it.",
    "detail": "Every NIB router we burn gets its factory firmware preserved (byte-for-byte) before we write Haven. Duplicates are de-duplicated; uniques are kept as restoration baselines.",
    "benefit": "Customers can always be returned to a factory-original state. Haven never burns a bridge.",
    "ref": "",
    "features": [
      {
        "id": 2,
        "lead": "Pre-flashed router"
      },
      {
        "id": 26,
        "lead": "Plug in, set a password, you are filtering"
      }
    ]
  },
  {
    "id": 116,
    "date": "2026-05-16",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Internal investigation into a low-level firmware-recovery dead-end on one router model. Surfaced what NOT to do during recovery.",
    "detail": "~90-minute exploration documented so future-us doesn't repeat the dead-end. Internal-only learning.",
    "benefit": "Routers ship reliably; we know the safe vs unsafe recovery paths.",
    "ref": "",
    "features": []
  },
  {
    "id": 313,
    "date": "2026-05-16",
    "theme": "Email notifications",
    "impact": 3,
    "summary": "builds_schema: document launch_signups + builds.oem_firmware_version",
    "detail": null,
    "benefit": "'Get notified at launch' captures every pre-launch interested visitor; CAN-SPAM compliant; double-opt-in ready.",
    "ref": "5369e53304",
    "features": []
  },
  {
    "id": 312,
    "date": "2026-05-16",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "wiki + reminders: today's adds #119, OEM-capture reminder)",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "a36b609227",
    "features": []
  },
  {
    "id": 311,
    "date": "2026-05-16",
    "theme": "Email notifications",
    "impact": 3,
    "summary": "builds_schema: launch_signups gains double-opt-in + outbound tracking columns",
    "detail": null,
    "benefit": "'Get notified at launch' captures every pre-launch interested visitor; CAN-SPAM compliant; double-opt-in ready.",
    "ref": "ce5e20ac9a",
    "features": []
  },
  {
    "id": 310,
    "date": "2026-05-16",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "Add manga.db (Chapter 2 lore archive) and Chapter 2 storyboard draft 1",
    "detail": null,
    "benefit": "Brand depth no generic security competitor can match — emotional hook for the customer who cares.",
    "ref": "7ee2095f49",
    "features": []
  },
  {
    "id": 168,
    "date": "2026-05-16",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "<admin tool> detail: render unit 0 instead of 'unit ?' (falsy-zero bug)",
    "detail": null,
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "3b12ac828f",
    "features": []
  },
  {
    "id": 167,
    "date": "2026-05-16",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "<admin tool>: add oem_firmware_version column",
    "detail": null,
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "5b2da0bbcc",
    "features": []
  },
  {
    "id": 166,
    "date": "2026-05-16",
    "theme": "Email notifications",
    "impact": 3,
    "summary": "launch-signups: add source attribution + sync feature into repo",
    "detail": null,
    "benefit": "'Get notified at launch' captures every pre-launch interested visitor; CAN-SPAM compliant; double-opt-in ready.",
    "ref": "662ae497eb",
    "features": []
  },
  {
    "id": 165,
    "date": "2026-05-16",
    "theme": "Email notifications",
    "impact": 3,
    "summary": "launch-signups: double-opt-in flow + Resend outbound integration",
    "detail": null,
    "benefit": "'Get notified at launch' captures every pre-launch interested visitor; CAN-SPAM compliant; double-opt-in ready.",
    "ref": "b45db81a6e",
    "features": []
  },
  {
    "id": 375,
    "date": "2026-05-16",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "reset-to-oem.sh: restore a router to OEM stock firmware (hybrid script)",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "626ff78b52",
    "features": []
  },
  {
    "id": 373,
    "date": "2026-05-16",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "reset-to-oem.sh: spell out the LAN port swap in detail (port location + why LAN 1 won't work)",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "4537b85df5",
    "features": []
  },
  {
    "id": 372,
    "date": "2026-05-16",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "Production script corrected to match the Navy router's physical port layout (5 LAN, 1 WAN).",
    "detail": "",
    "benefit": "Production routines match real hardware; setup steps work first try.",
    "ref": "0d0db203f5",
    "features": []
  },
  {
    "id": 371,
    "date": "2026-05-16",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "reset-to-oem: align with GL.iNet's official U-Boot recovery procedure",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "6e3e63685d",
    "features": []
  },
  {
    "id": 370,
    "date": "2026-05-16",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "Inline documentation note on a known production-path risk and the planned migration off it.",
    "detail": "",
    "benefit": "Production knowledge captured in the place it's needed; tribal knowledge becomes durable knowledge.",
    "ref": "d8de20051d",
    "features": []
  },
  {
    "id": 315,
    "date": "2026-05-16",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "cowork: add lazy-load bootstrap for Haven workspace",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "a93e5711c6",
    "features": []
  },
  {
    "id": 314,
    "date": "2026-05-16",
    "theme": "Session continuity",
    "impact": 1,
    "summary": "cowork: rename bootstrap 00-START-HERE.md → MEMORY.md",
    "detail": null,
    "benefit": "Sessions resume with full context; no rediscovery, no lost decisions.",
    "ref": "538e82a947",
    "features": []
  },
  {
    "id": 392,
    "date": "2026-05-15",
    "theme": "Repo hygiene",
    "impact": 5,
    "summary": "Phase 2: install-haven.sh + baked default personalization (haven-0.1.10)",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "043684302f",
    "features": []
  },
  {
    "id": 390,
    "date": "2026-05-15",
    "theme": "Repo hygiene",
    "impact": 5,
    "summary": "Production-naming pass on the firmware-flashing toolchain.",
    "detail": "Internal-only cleanup so the burn procedure reads consistently from preflight to ship. No customer-visible change.",
    "benefit": "Faster, less-error-prone production runs as Haven moves from one router at a time to many.",
    "ref": "e74188388c",
    "features": []
  },
  {
    "id": 389,
    "date": "2026-05-15",
    "theme": "Repo hygiene",
    "impact": 5,
    "summary": "Production firmware-flashing scripts finalized.",
    "detail": "Internal-only cleanup; companion to the naming pass.",
    "benefit": "Faster, less-error-prone production runs at scale.",
    "ref": "a7c2529437",
    "features": []
  },
  {
    "id": 386,
    "date": "2026-05-15",
    "theme": "Product definition",
    "impact": 5,
    "summary": "Phase 2: wire D1 build-step logging into the four production scripts",
    "detail": null,
    "benefit": "Scope and language locked — every downstream decision is faster and more consistent.",
    "ref": "972a220a1e",
    "features": []
  },
  {
    "id": 385,
    "date": "2026-05-15",
    "theme": "Build maintenance UI",
    "impact": 5,
    "summary": "scripts: renumber D1_STEP_ORDER to match new Phase 2 <backend table>",
    "detail": null,
    "benefit": "Burn procedure lives in D1 as data, not in code. Refinement is a SQL UPDATE — every site/Claude instantly uses the new procedure.",
    "ref": "d7189c43b8",
    "features": []
  },
  {
    "id": 383,
    "date": "2026-05-15",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Phase 2: auto-attach to D1 build via session file + interactive start-burn",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "c972f30264",
    "features": [
      {
        "id": 2,
        "lead": "Pre-flashed router"
      }
    ]
  },
  {
    "id": 319,
    "date": "2026-05-15",
    "theme": "Wiki & documentation",
    "impact": 5,
    "summary": ": <router serial>+ ships from baked Haven firmware (decision locked 2026-05-15)",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "3d0d806e06",
    "features": []
  },
  {
    "id": 318,
    "date": "2026-05-15",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": ": MILESTONE — Phase 2 burn architecture complete and live-fire verified",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "6974f27a64",
    "features": []
  },
  {
    "id": 317,
    "date": "2026-05-15",
    "theme": "Build maintenance UI",
    "impact": 5,
    "summary": "<backend table>: rewrite for Phase 2 (23 → 19 steps, script-named actors)",
    "detail": null,
    "benefit": "Burn procedure lives in D1 as data, not in code. Refinement is a SQL UPDATE — every site/Claude instantly uses the new procedure.",
    "ref": "d6e94c0fd6",
    "features": []
  },
  {
    "id": 316,
    "date": "2026-05-15",
    "theme": "Wiki & documentation",
    "impact": 5,
    "summary": ": MILESTONE 22:43 — D1 logging cardinal closed; operator UX shipped",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "a557ffc02c",
    "features": []
  },
  {
    "id": 115,
    "date": "2026-05-15",
    "theme": "Process & discipline",
    "impact": 5,
    "summary": "MILESTONE 2026-05-15 (22:43): D1 logging complete — auto-attach, idempotent, operator-friendly",
    "detail": "Extends (Phase 2 architecture milestone). Tonight's second\npush closes the D1-logging cardinal gap and delivers an operator-\nexperience pass that makes the chain ergonomic in the real world.",
    "benefit": "Less waste, fewer back-and-forths, more shipped work per session.",
    "ref": "",
    "features": []
  },
  {
    "id": 114,
    "date": "2026-05-15",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "MILESTONE 2026-05-15: Phase 2 burn architecture complete and live-fire verified end-to-end",
    "detail": "2026-05-15 21:46 CDT — Dave's reaction: \"This was my vision from the\nstart.\" The Phase 2 burn architecture (committed to per is\nnow fully implemented, live-fire tested end-to-end, and operationally\nsound. <router serial> will be the first router burned under this architecture.",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "",
    "features": [
      {
        "id": 2,
        "lead": "Pre-flashed router"
      }
    ]
  },
  {
    "id": 112,
    "date": "2026-05-15",
    "theme": "Architecture & data model",
    "impact": 5,
    "summary": "Architecture decision: /<router data partition> persistent partition is the SOLE data location; encrypted server-side blob is disaster-recovery only",
    "detail": "2026-05-15 — Dave's privacy stance crystallized this architecture during Phase 2 design.",
    "benefit": "/<router data partition> concept locked: customer settings survive a factory reset because they live on raw eMMC that firstboot does not touch.",
    "ref": "",
    "features": [
      {
        "id": 4,
        "lead": "Haven Inc. cannot read your data"
      },
      {
        "id": 5,
        "lead": "Your data stays on your router"
      },
      {
        "id": 6,
        "lead": "Haven cannot read your traffic"
      },
      {
        "id": 7,
        "lead": "Optional encrypted cloud backup"
      },
      {
        "id": 10,
        "lead": "Survives a factory reset"
      }
    ]
  },
  {
    "id": 391,
    "date": "2026-05-15",
    "theme": "Architecture & data model",
    "impact": 4,
    "summary": "brand-area: identity bridge from U-Boot env to <database>; cap 1-100 → 0-100",
    "detail": null,
    "benefit": "Today's design supports tomorrow's features without painful rewrites.",
    "ref": "fd7d6bb42a",
    "features": []
  },
  {
    "id": 384,
    "date": "2026-05-15",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "start-burn.sh: self-log step 1 success after POST /api/builds",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "a8264cbc98",
    "features": []
  },
  {
    "id": 382,
    "date": "2026-05-15",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "start-burn.sh: ask for --model first; auto-propose next serial from D1",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "a18f311dc2",
    "features": []
  },
  {
    "id": 381,
    "date": "2026-05-15",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "start-burn.sh: loop constrained-value prompts; flag REDO explicitly",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "03120a4862",
    "features": []
  },
  {
    "id": 380,
    "date": "2026-05-15",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "start-burn.sh: pre-fill serial prompt with readline-editable default",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "20978e0896",
    "features": []
  },
  {
    "id": 113,
    "date": "2026-05-15",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Production routers now ship from a single unified Haven firmware image — Haven IS the firmware, not an add-on.",
    "detail": "Customers receive a cohesive Haven product, not third-party firmware with our software bolted on top.",
    "benefit": "Customers receive a polished Haven product, not a kit. The router was Haven before it left our bench.",
    "ref": "",
    "features": []
  },
  {
    "id": 169,
    "date": "2026-05-15",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "<admin tool>: idempotent POST /api/builds — reuse in-progress build for same serial",
    "detail": null,
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "957bfd25a1",
    "features": []
  },
  {
    "id": 388,
    "date": "2026-05-15",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "remove vestigial 20_flash_stage_1.sh",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "8e87e228cf",
    "features": []
  },
  {
    "id": 387,
    "date": "2026-05-15",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "flash-haven.sh: HTTP readiness probe + station SSH key install (chain-safe)",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "7431799fb9",
    "features": []
  },
  {
    "id": 398,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "burn-router: CARDINAL-compliant <admin tool> logging",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "ce956dae2c",
    "features": []
  },
  {
    "id": 108,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Five burn-router defects exposed and fixed by user2 <router serial> live-fire",
    "detail": "user2's re-burn (2026-05-14) exposed five real defects in the burn\nautomation. All five would have hit <router serial> unaltered. All five are\nnow fixed and committed in ~/haven-station.",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "",
    "features": []
  },
  {
    "id": 107,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Production gap caught: the daily router backup was overwriting itself instead of preserving history.",
    "detail": "Burn-procedure step adjusted so each day's backup is preserved with a datestamp — never overwritten — and a diff against the prior known-good is run before ship.",
    "benefit": "Every router has a verifiable golden baseline; any drift is caught before the unit leaves the bench.",
    "ref": "",
    "features": []
  },
  {
    "id": 106,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Brand-area JS rewrite was the root cause of multi-hour brand render battle",
    "detail": "Live-fire 2026-05-14, user2 <router serial> retrofit. The 3-line brand area\n(\"Lulhaven / Haven Navy / 2 of 100\") refused to render correctly across\n~6 distinct CSS/HTML approaches. Root cause was finally identified:",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "",
    "features": []
  },
  {
    "id": 400,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "docs: demote BURN-GOLDEN-PROCEDURE.md to a pointer",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "931866a411",
    "features": []
  },
  {
    "id": 399,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "haven-0.1.7: current burn image (Lulhaven/Haven Navy brand spec baked in)",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "d93bc882d2",
    "features": []
  },
  {
    "id": 396,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "make-ship-ready: install the station SSH key as step 0 (self-sufficient)",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "c49bfbeee3",
    "features": []
  },
  {
    "id": 395,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Production check now verifies the admin screen is actually live before declaring a router \"ready to ship.\"",
    "detail": "Robust check replaces a brittle one; production routers prove the admin screen works before they leave the bench.",
    "benefit": "First-boot admin-screen access is verified before ship — customers never get a router with a broken admin interface.",
    "ref": "81a9a4a5a9",
    "features": []
  },
  {
    "id": 394,
    "date": "2026-05-14",
    "theme": "Build pipeline",
    "impact": 4,
    "summary": "burn fixes #4+#5: push <database> from station; 40 has idempotent fast-path",
    "detail": null,
    "benefit": "Edits flow source → live in one script. No copy-paste, no stale artifacts.",
    "ref": "a2b5fcc02f",
    "features": []
  },
  {
    "id": 324,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "builds: <backend table> table — the burn checklist as D1 data, not code",
    "detail": null,
    "benefit": "Burn procedure lives in D1 as data, not in code. Refinement is a SQL UPDATE — every site/Claude instantly uses the new procedure.",
    "ref": "5058091c8b",
    "features": []
  },
  {
    "id": 111,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Station laptop split-DNS: route *.lulhaven.com to user2, internet on Wi-Fi",
    "detail": "2026-05-14 23:48 — final resolution of tonight's my.lulhaven.com NXDOMAIN\nconfusion. user2 was never broken. The station laptop test environment\nwas the obstacle.",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "",
    "features": []
  },
  {
    "id": 110,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Skipping my.lulhaven.com verification has bitten Haven repeatedly",
    "detail": "2026-05-14 23:27 — Dave called out that DNS does NOT serve my.lulhaven.com,\nright after I closed user2 <router serial> build #3 with step 16 (QC-5 visual\nverification) marked success. I had claimed \"my.lulhaven.com redirects\nto Haven admin\" without ever testing it.",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "",
    "features": []
  },
  {
    "id": 109,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Navy router's admin-screen accent color is baked to Navy Blue at the factory — matches the model.",
    "detail": "Per-model branding refinement so the admin screen accent matches the physical router.",
    "benefit": "Visual continuity between the router's outside and its admin screen — same product family, same colors.",
    "ref": "",
    "features": []
  },
  {
    "id": 322,
    "date": "2026-05-14",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "<backend table>: restore all 4 prompted wireless/wired flip steps",
    "detail": null,
    "benefit": "Burn procedure lives in D1 as data, not in code. Refinement is a SQL UPDATE — every site/Claude instantly uses the new procedure.",
    "ref": "a287a91fd4",
    "features": []
  },
  {
    "id": 320,
    "date": "2026-05-14",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "<backend table> 16: bake my.lulhaven.com verification requirement; -#112",
    "detail": null,
    "benefit": "Burn procedure lives in D1 as data, not in code. Refinement is a SQL UPDATE — every site/Claude instantly uses the new procedure.",
    "ref": "34d82c1319",
    "features": []
  },
  {
    "id": 171,
    "date": "2026-05-14",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "<admin tool>: wire addresses_issue column through worker + UI",
    "detail": null,
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "101e6c318b",
    "features": []
  },
  {
    "id": 170,
    "date": "2026-05-14",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "<admin tool>: POST /api/builds seeds steps from D1 <backend table>",
    "detail": null,
    "benefit": "Burn procedure lives in D1 as data, not in code. Refinement is a SQL UPDATE — every site/Claude instantly uses the new procedure.",
    "ref": "b034de59bb",
    "features": []
  },
  {
    "id": 323,
    "date": "2026-05-14",
    "theme": "Build maintenance UI",
    "impact": 2,
    "summary": "<backend table>: fix procedure_refs that pointed at the demoted doc",
    "detail": null,
    "benefit": "Burn procedure lives in D1 as data, not in code. Refinement is a SQL UPDATE — every site/Claude instantly uses the new procedure.",
    "ref": "6b44c057cc",
    "features": []
  },
  {
    "id": 397,
    "date": "2026-05-14",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "40_install_ssh_key.sh: plain ssh is the primary method",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "659636c617",
    "features": []
  },
  {
    "id": 393,
    "date": "2026-05-14",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "brand area: 3-line render (Lulhaven / Haven {model} / N of 100) + navy primary",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "fd3d7a2b08",
    "features": []
  },
  {
    "id": 325,
    "date": "2026-05-14",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "builds schema: add build_steps.addresses_issue column",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "3417f141aa",
    "features": []
  },
  {
    "id": 321,
    "date": "2026-05-14",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "release: 260513<router serial> (released_by dave)",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "c492ed9016",
    "features": []
  },
  {
    "id": 405,
    "date": "2026-05-13",
    "theme": "Firmware & overlay",
    "impact": 5,
    "summary": "docs: golden procedure Phase 0.2 — Claude prompts for wireless-default",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "0be99c48db",
    "features": []
  },
  {
    "id": 401,
    "date": "2026-05-13",
    "theme": "Build maintenance UI",
    "impact": 5,
    "summary": "procedure: CARDINAL Step 0.0 — open <admin tool> row before anything else",
    "detail": null,
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "95ebbf2fdc",
    "features": []
  },
  {
    "id": 105,
    "date": "2026-05-13",
    "theme": "LuCI / UI",
    "impact": 5,
    "summary": "Fixed a brand-overlay rendering bug discovered during a production-batch retrofit.",
    "detail": "Caught + corrected during the second router's prep. Brand badge now displays consistently across both router models in the household admin screen.",
    "benefit": "Customers see a consistent, polished Haven badge in the admin screen — no rough edges.",
    "ref": "",
    "features": [
      {
        "id": 20,
        "lead": "The Helm — where you steer"
      },
      {
        "id": 30,
        "lead": "Haven OD"
      }
    ]
  },
  {
    "id": 413,
    "date": "2026-05-13",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Memorable router shortname (haven.navyblue / haven.olivegreen) now resilient to IP-address changes.",
    "detail": "Internal refinement on how the friendly name resolves — works even if the router's IP changes.",
    "benefit": "The friendly name keeps working regardless of network configuration — one less thing for customers to maintain.",
    "ref": "9c8c1d4ded",
    "features": [
      {
        "id": 29,
        "lead": "Haven Navy"
      },
      {
        "id": 30,
        "lead": "Haven OD"
      }
    ]
  },
  {
    "id": 409,
    "date": "2026-05-13",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "overlay: actually include the bleed-thru bg image (was phantom-referenced)",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "76468ace24",
    "features": []
  },
  {
    "id": 406,
    "date": "2026-05-13",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "docs: golden burn procedure — single authoritative source",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "7a6483cac0",
    "features": []
  },
  {
    "id": 404,
    "date": "2026-05-13",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "docs: bake wireless/wired flips into procedure at every cable-touch point",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "2944273695",
    "features": []
  },
  {
    "id": 403,
    "date": "2026-05-13",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "docs: wireless/wired flip is a prompted step, not silent",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "70f2df58e0",
    "features": []
  },
  {
    "id": 326,
    "date": "2026-05-13",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "+ user2 <router serial> burn-log snapshot",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "58f2200b0a",
    "features": []
  },
  {
    "id": 172,
    "date": "2026-05-13",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "index: 'filter porn' -> 'filter adult content'",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "0652c53196",
    "features": [
      {
        "id": 19,
        "lead": "Adult content: off until you choose it"
      }
    ]
  },
  {
    "id": 104,
    "date": "2026-05-13",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Theme package now baked directly into the production firmware image — fixes a thrice-recurring \"missing piece\" issue.",
    "detail": "Internal-only: the admin-screen theme is now part of the firmware itself rather than installed after the fact.",
    "benefit": "Production routers ship with the polished admin-screen theme already in place — no post-install surprises.",
    "ref": "",
    "features": []
  },
  {
    "id": 103,
    "date": "2026-05-13",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Shortname DNS resolves dynamically via interface-name= (survives customer LAN-IP change)",
    "detail": "Dave 2026-05-13 before user2's burn: 'one of the most frequently used options when setting up a router is to change its IP address. so i'm wondering if there's some way we can, in the boot-up of the router, restore that dns listing to whatever the current ip address is for the ro…",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "",
    "features": []
  },
  {
    "id": 411,
    "date": "2026-05-13",
    "theme": "LuCI / UI",
    "impact": 3,
    "summary": "Production build station now vendors the admin-screen theme locally — eliminates an upstream-dependency surprise.",
    "detail": "",
    "benefit": "Production builds reliably; theme is always available.",
    "ref": "d4a06efcba",
    "features": [
      {
        "id": 20,
        "lead": "The Helm — where you steer"
      }
    ]
  },
  {
    "id": 407,
    "date": "2026-05-13",
    "theme": "LuCI / UI",
    "impact": 3,
    "summary": "Admin-screen background isolated from the login-page rendering path.",
    "detail": "",
    "benefit": "Login screen stays clean; admin screen keeps the polished look.",
    "ref": "0bdf0dec6f",
    "features": [
      {
        "id": 20,
        "lead": "The Helm — where you steer"
      }
    ]
  },
  {
    "id": 410,
    "date": "2026-05-13",
    "theme": "LuCI / UI",
    "impact": 2,
    "summary": "Brand-overlay fix shipped with a new pre-flight verifier so the issue can never silently recur.",
    "detail": "",
    "benefit": "Customers see consistent branding in the admin screen — verified before ship.",
    "ref": "92cf4a79a2",
    "features": []
  },
  {
    "id": 412,
    "date": "2026-05-13",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "station: bake <router serial> fixes (passwords, manifest, scp -O, SSH stage-1, password-set check)",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "fccff7d321",
    "features": []
  },
  {
    "id": 408,
    "date": "2026-05-13",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "haven-0.1.5: brand-CSS specificity fix + drop mobile_game_ads default",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "c42aac3031",
    "features": []
  },
  {
    "id": 402,
    "date": "2026-05-13",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "brand: 3-line area is \"Lulhaven / Haven Navy / N of 100\" (not Haven/Navy)",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "375bcd833c",
    "features": []
  },
  {
    "id": 101,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Burn-procedure automation architecture — 10-min target, scaffolding shipped 2026-05-13",
    "detail": "Ultrathink session 2026-05-13. Dave: 'we need to improve the design of automation with regard to our router burning process. This needs to become a ten minute task with no user interaction.'",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "",
    "features": []
  },
  {
    "id": 100,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Memorable shortname customers can type to reach the router admin screen — haven.navyblue for Navy units, haven.olivegreen for Olive units.",
    "detail": "Customers no longer need to remember the router's IP address. Type the friendly name in any browser on your network and the admin screen loads.",
    "benefit": "Reaching the household controls is as easy as typing a memorable name — no IP-address lookup required.",
    "ref": "",
    "features": [
      {
        "id": 29,
        "lead": "Haven Navy"
      },
      {
        "id": 30,
        "lead": "Haven OD"
      }
    ]
  },
  {
    "id": 90,
    "date": "2026-05-12",
    "theme": "Product definition",
    "impact": 5,
    "summary": "Future SKU idea — 'Haven Travel' mobile app (Android VpnService / iOS Network Extension)",
    "detail": "Surfaced 2026-05-12 while discussing whether Android is a viable router OS. Conclusion: Android is the wrong platform for the home router but the RIGHT platform for a complementary travel/mobile SKU. Dave: 'log the travel app idea for later.'",
    "benefit": "Scope and language locked — every downstream decision is faster and more consistent.",
    "ref": "",
    "features": []
  },
  {
    "id": 86,
    "date": "2026-05-12",
    "theme": "Demo page",
    "impact": 5,
    "summary": "Demo UX overhaul 2026-05-12 — collapsed-by-default + accordion + Social Media landing + cache-busting",
    "detail": "Dave 2026-05-12 incremental UX requests, all deployed.",
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "",
    "features": [
      {
        "id": 21,
        "lead": "Search across categories and providers"
      },
      {
        "id": 22,
        "lead": "Two modes"
      },
      {
        "id": 31,
        "lead": "Interactive demo at lulhaven.com/demo"
      }
    ]
  },
  {
    "id": 85,
    "date": "2026-05-12",
    "theme": "Product definition",
    "impact": 5,
    "summary": "Haven subscription price set to $4/month 2026-05-12 (was placeholder ~$2/mo)",
    "detail": "Dave 2026-05-12 in marketing copy: '$4/mo'.",
    "benefit": "Scope and language locked — every downstream decision is faster and more consistent.",
    "ref": "",
    "features": [
      {
        "id": 28,
        "lead": "$4/month for category updates"
      }
    ]
  },
  {
    "id": 77,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Two-line \"Haven / model name\" sidebar branding shipped in the admin screen.",
    "detail": "Subtle visual refinement so the admin screen consistently shows which Haven model the customer is using.",
    "benefit": "Customers see product identity on every page of the admin screen.",
    "ref": "",
    "features": [
      {
        "id": 29,
        "lead": "Haven Navy"
      }
    ]
  },
  {
    "id": 76,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Admin screen now has the same frosted-glass design language as lulhaven.com.",
    "detail": "Visual continuity between the marketing site and the in-router experience — customers recognize they're in the same product family.",
    "benefit": "The router admin screen feels like a polished consumer product, not a 2010-vintage admin panel.",
    "ref": "",
    "features": []
  },
  {
    "id": 75,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Admin screen sidebar shows both \"Haven\" and the model name on two lines — a subtle but clear product identification.",
    "detail": "Internal-only branding polish so the model is always visible in the sidebar.",
    "benefit": "Customers always know which Haven router model they're looking at, without having to check labels.",
    "ref": "",
    "features": []
  },
  {
    "id": 74,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Routers ship with \"Haven\" as the default name everywhere it appears in the admin screen.",
    "detail": "Removed stale third-party-firmware mentions from the default branding so the customer's first impression is Haven, not the open-source firmware Haven is built on.",
    "benefit": "Customers see Haven, not the plumbing it runs on.",
    "ref": "",
    "features": []
  },
  {
    "id": 73,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "user1 <router serial> snapshot promoted to founding NAV-haven-0.1.0 golden master (QC-5 38/38)",
    "detail": "Live-fire 2026-05-12. user1's <router serial> golden snapshot promoted to <directory> as the founding golden master for the NAV/haven-0.1.0 era. QC-5 result: 38/38 PASS. Reusable check script written: <script> — runs against a…",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "",
    "features": []
  },
  {
    "id": 72,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "golden-smoke-test.sh fixes: station SSH key + BusyBox tar -X for exclude patterns",
    "detail": "Live-fire 2026-05-12 (user1 <router serial> Step 16). Two fixes shipped to ~/haven-station/scripts/golden-smoke-test.sh: (1) bare 'ssh' failed because the haven-station key (~/haven-station/credentials/id_ed25519) isn't in operator's default SSH identity set — sibling scripts already use…",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "",
    "features": []
  },
  {
    "id": 71,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Each router ships with a unique secure-tunnel keypair, generated at manufacture, ready for future off-network features.",
    "detail": "No per-customer manual provisioning needed — every shipped router has its own crypto identity baked in.",
    "benefit": "Each router is uniquely identifiable from day one; future off-network capabilities can light up without sending technicians on-site.",
    "ref": "",
    "features": [
      {
        "id": 14,
        "lead": "Filtering follows household members wherever they go"
      }
    ]
  },
  {
    "id": 430,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "haven-overlay: add 30-haven-hostname uci-defaults — sidebar reads 'Haven' OOB",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "9697b6c8f0",
    "features": []
  },
  {
    "id": 428,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "haven-overlay: add 45-haven-brand-css — sidebar shows 'Haven' + model as two lines",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "66924b8876",
    "features": []
  },
  {
    "id": 427,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Frosted-glass design language extended into the Haven admin screen so it matches the marketing site.",
    "detail": "Internal refinement on the admin-screen background.",
    "benefit": "Customers see one coherent product across the website, the demo, and the router admin screen.",
    "ref": "52727af93a",
    "features": []
  },
  {
    "id": 426,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "haven-overlay: bake the two-line 'Haven / Navy' sidebar into the image",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "8a2080e17f",
    "features": [
      {
        "id": 29,
        "lead": "Haven Navy"
      }
    ]
  },
  {
    "id": 425,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "haven-overlay: cat-list collapses by default + accordion (Ctrl=additive)",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "a966af2120",
    "features": [
      {
        "id": 22,
        "lead": "Two modes"
      }
    ]
  },
  {
    "id": 424,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "haven-overlay: land Haven page with Social & Communication open",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "0bc4742062",
    "features": []
  },
  {
    "id": 423,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "haven-overlay: add optional 'N of 100' unit line under model in brand",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "31ff7e3362",
    "features": []
  },
  {
    "id": 422,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "haven-overlay: per-model shortname (haven.navyblue / haven.olivegreen)",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "d7ad159895",
    "features": [
      {
        "id": 29,
        "lead": "Haven Navy"
      },
      {
        "id": 30,
        "lead": "Haven OD"
      }
    ]
  },
  {
    "id": 420,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "haven-overlay: add my.lulhaven.com as primary shortname (HTTPS-ready)",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "3002402011",
    "features": []
  },
  {
    "id": 419,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "station: add customer-experience-test.sh — unit-test customer landing flow",
    "detail": null,
    "benefit": "Unit-tests the customer's actual landing experience before shipping — first impression is verified, not assumed.",
    "ref": "66aefa16bc",
    "features": []
  },
  {
    "id": 418,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "customer-experience-test: add 8 WiFi checks via SSH to router",
    "detail": null,
    "benefit": "Unit-tests the customer's actual landing experience before shipping — first impression is verified, not assumed.",
    "ref": "33068e95b0",
    "features": []
  },
  {
    "id": 417,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "station: add make-ship-ready.sh — one command from flashed router to ship",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "2384dd7b21",
    "features": [
      {
        "id": 2,
        "lead": "Pre-flashed router"
      },
      {
        "id": 26,
        "lead": "Plug in, set a password, you are filtering"
      }
    ]
  },
  {
    "id": 416,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "station: burn-router.sh scaffolding + lib + preflight + README",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "2ce36729db",
    "features": []
  },
  {
    "id": 329,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "brand scrub (Brass/Steel → Olive/Navy) + wiki updates from user1 <router serial> burn",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "b59285c776",
    "features": [
      {
        "id": 29,
        "lead": "Haven Navy"
      },
      {
        "id": 30,
        "lead": "Haven OD"
      }
    ]
  },
  {
    "id": 328,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "data: ship user1 <router serial> day-2 wiki + golden snapshot + $4/mo pricing",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "2a04729a2f",
    "features": []
  },
  {
    "id": 327,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "wiki: #103 burn-automation architecture + #104 operator-physical philosophy",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "69076b8af5",
    "features": []
  },
  {
    "id": 102,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Burn automation philosophy — operator-physical only; everything else scripted",
    "detail": "Dave 2026-05-13 ultrathink: '10-minute task with no user interaction.'",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "",
    "features": []
  },
  {
    "id": 99,
    "date": "2026-05-12",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Android-router / Haven OS conversation archive — 2026-05-12 thread index",
    "detail": "Comprehensive index of the Android-router / Haven OS conversation thread on 2026-05-12. The thread began as a 'complacency check' on platform assumptions and crystallized into a multi-phase strategic vision for Haven OS as a long-term differentiator.",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "",
    "features": []
  },
  {
    "id": 95,
    "date": "2026-05-12",
    "theme": "Architecture & data model",
    "impact": 4,
    "summary": "Haven OS architectural discipline — design for future Android versions to drop in and compile",
    "detail": "Dave 2026-05-12: 'If we are smart, we could design such that future Android versions would plug in and compile.' Architectural discipline addendum to / #96.",
    "benefit": "Today's design supports tomorrow's features without painful rewrites.",
    "ref": "",
    "features": []
  },
  {
    "id": 94,
    "date": "2026-05-12",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Haven OS addendum — Android Security Bulletin as our drop + the '1983 argument' reframe",
    "detail": "Dave 2026-05-12 added two points that significantly strengthen the Haven OS case. Logged here as addendum.",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "",
    "features": []
  },
  {
    "id": 93,
    "date": "2026-05-12",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Long-term roadmap captured: Haven's hardware-and-software stack will evolve over 18-36 months in three phases, each delivering value on its own.",
    "detail": "Staged plan documents what ships now, what ships next, and what ships years out — each phase validates the next.",
    "benefit": "Customers can buy today knowing Haven has a multi-year forward path, not a one-shot product.",
    "ref": "",
    "features": []
  },
  {
    "id": 92,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Captured strategic motivation for Haven's longer-term platform direction — modern developer experience is a forcing function for the next generation.",
    "detail": "Internal-only product-direction note. Helps prioritize platform choices for years 2-3.",
    "benefit": "Haven's roadmap is grounded in real product-development friction we've felt — not theory.",
    "ref": "",
    "features": []
  },
  {
    "id": 91,
    "date": "2026-05-12",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Haven OS concept — AOSP-fork purpose-built for routers, proprietary stack, first-mover moat",
    "detail": "Strategic vision Dave articulated 2026-05-12. Re-opens an earlier (pre-archive) conversation about Android-as-router-platform. Concept refined this session.",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "",
    "features": []
  },
  {
    "id": 89,
    "date": "2026-05-12",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Session archive 2026-05-12 — user1 burn finish + brand polish + VPN architecture pivot + marketing rewrite",
    "detail": "Comprehensive index of the 2026-05-12 working session. Covers user1 <router serial> ship preparation, brand/UI polish, market research, website rewrite, VPN architecture re-think.",
    "benefit": "Filtering follows household members off home Wi-Fi — closes the cellular bypass that defeats most competitors.",
    "ref": "",
    "features": []
  },
  {
    "id": 82,
    "date": "2026-05-12",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Haven distributed-VPN strategy pivot: wholesale-partner exit + smart routing replaces peer-mesh exit",
    "detail": "Discussion 2026-05-12 (continuation of exit-node analysis). Dave probed three angles in sequence: (1) hybrid VPN to commercial provider, (2) corporate/wholesale pricing, (3) preservation of the original 'no bandwidth penalty' dream.",
    "benefit": "Filtering follows household members off home Wi-Fi — closes the cellular bypass that defeats most competitors.",
    "ref": "",
    "features": [
      {
        "id": 14,
        "lead": "Filtering follows household members wherever they go"
      }
    ]
  },
  {
    "id": 81,
    "date": "2026-05-12",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Distributed VPN exit-node analysis — A's traffic via B's Haven, with two complications that force a re-think",
    "detail": "Discussion 2026-05-12. Dave's framing: 'If A is sending packets to a website served by B (B's Haven hosts a VPN endpoint), packets go encrypted A->B, decrypted at B, leave B's LAN unencrypted, and something triggers at the NSA, talk me through it.'",
    "benefit": "Filtering follows household members off home Wi-Fi — closes the cellular bypass that defeats most competitors.",
    "ref": "",
    "features": [
      {
        "id": 14,
        "lead": "Filtering follows household members wherever they go"
      }
    ]
  },
  {
    "id": 79,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Third sidebar line 'N of 100' is hardwired at burn (empty default + sed)",
    "detail": "Dave 2026-05-12: 'Can we just hardwire that at burn?' chose hardwiring over readfile() for the unit-number line because (1) the value never changes per-router so runtime IO is wasted, (2) simpler to inspect. Templates ship with 'const unit_display = '';' (empty). Burn procedure d…",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "",
    "features": []
  },
  {
    "id": 78,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "First customer's router shipped with mobile game ads pre-blocked — one-off customer request.",
    "detail": "Override of the default \"ships clean\" policy for that customer's specific request. Other shipped routers still ship clean by default.",
    "benefit": "Customer-specific configurations are supported when requested — Haven doesn't force a one-size-fits-all setup.",
    "ref": "",
    "features": []
  },
  {
    "id": 414,
    "date": "2026-05-12",
    "theme": "Brand & packaging",
    "impact": 3,
    "summary": "station: ssh-key install (step 40) + pack-in card PDF (step 99)",
    "detail": null,
    "benefit": "Customer's first 5 minutes go right — the card answers the only four questions they have (Wi-Fi password, login URL, login, support).",
    "ref": "79cca903df",
    "features": []
  },
  {
    "id": 179,
    "date": "2026-05-12",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "demo: three-line title 'Haven / Navy / by Lulhaven · Unit 001 of 100'",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "612cd573e3",
    "features": []
  },
  {
    "id": 178,
    "date": "2026-05-12",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "demo: drop model-specific 'Navy' line from title",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "8483acd444",
    "features": []
  },
  {
    "id": 177,
    "date": "2026-05-12",
    "theme": "Demo page",
    "impact": 3,
    "summary": "demo: super-categories collapse by default + accordion on click",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "cc7157dfec",
    "features": [
      {
        "id": 22,
        "lead": "Two modes"
      }
    ]
  },
  {
    "id": 175,
    "date": "2026-05-12",
    "theme": "Demo page",
    "impact": 3,
    "summary": "demo: land with Social Media selected + Social & Communication open",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "737e08808e",
    "features": []
  },
  {
    "id": 174,
    "date": "2026-05-12",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "index: hero pillar strip + 'Why Haven' competitive section",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "7407e4d1d6",
    "features": []
  },
  {
    "id": 98,
    "date": "2026-05-12",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "Tramp video addendum — IBM PC ran Charlie Chaplin/Tramp ads 1981-1983; our spot pays direct callback",
    "detail": "Dave 2026-05-12 surfaces a critical piece of context for the Little Tramp video concept :\n '1983 IBM marketing featured the tramp.'",
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "",
    "features": []
  },
  {
    "id": 97,
    "date": "2026-05-12",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "Tramp video addendum — add Reagan ('Ronnie Raygun') to 1983 montage as cultural marker",
    "detail": "Dave 2026-05-12 adds 'Ronnie Raygun' to the 1983 montage in the Little Tramp video concept.",
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "",
    "features": []
  },
  {
    "id": 96,
    "date": "2026-05-12",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "Marketing video concept — Little Tramp + 1983 montage + 'How old is your router?'",
    "detail": "Dave 2026-05-12 video concept. Sharp execution of the 1983-argument marketing pillar.",
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "",
    "features": []
  },
  {
    "id": 88,
    "date": "2026-05-12",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "Customer-facing copy frames Haven as curator, never leads with a single upstream source name",
    "detail": "Dave 2026-05-12 caught a draft 'Why Haven' card that led with 'Backed by the <data source> blacklist...' Dave's correction: 'We had a blacklist before we added <data source>. Isn't <data source> just one of our blacklist sources?'",
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "",
    "features": []
  },
  {
    "id": 84,
    "date": "2026-05-12",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "lulhaven.com index.html — hero pillars + 'Why Haven' competitive section added 2026-05-12",
    "detail": "Dave 2026-05-12: 'Our web page was developed in total ignorance of any competition. We need to address our strengths from the larger market context.'",
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "",
    "features": []
  },
  {
    "id": 83,
    "date": "2026-05-12",
    "theme": "Brand & packaging",
    "impact": 3,
    "summary": "Brand scrub 2026-05-12 — archaic Brass/Steel/Blue removed; active brands are Navy and Olive",
    "detail": "Dave 2026-05-12: 'Brands are Navy and Olive at this time. Scrub archaic brand references.'",
    "benefit": "First customer impression before they even plug the router in — sets the trust baseline.",
    "ref": "",
    "features": [
      {
        "id": 30,
        "lead": "Haven OD"
      }
    ]
  },
  {
    "id": 80,
    "date": "2026-05-12",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "Consumer content-filter market data 2026 — pricing, competitors, Haven positioning headroom",
    "detail": "Research run 2026-05-12 (Dave SERP for 'consumer content filters' + 'single-click consumer content filter market value'). See sources at the end.",
    "benefit": "Market data behind the $4/month price point. Competitors charge $70–100/yr; Haven undercuts and keeps working if the customer cancels.",
    "ref": "",
    "features": [
      {
        "id": 28,
        "lead": "$4/month for category updates"
      }
    ]
  },
  {
    "id": 421,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 2,
    "summary": "haven-overlay: fix redirect path — Haven is at /admin/haven, not /admin/services/haven",
    "detail": null,
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "b4245d86e9",
    "features": []
  },
  {
    "id": 429,
    "date": "2026-05-12",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "station: brand scrub (Brass→Olive, BRS→OLV) + golden-smoke/qc5 hardening",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "52cf689fc9",
    "features": []
  },
  {
    "id": 415,
    "date": "2026-05-12",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "station: GL.iNet 4.x JSON-RPC client + scripts/20_flash_stage_1.sh",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "e1d9da9086",
    "features": []
  },
  {
    "id": 176,
    "date": "2026-05-12",
    "theme": "Demo page",
    "impact": 1,
    "summary": "demo: cache-bust js/* via ?v=20260512b query string",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "1aae137266",
    "features": []
  },
  {
    "id": 87,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 1,
    "summary": "Internal investigation into what a router-state backup actually captures vs misses. Documented for future production runs.",
    "detail": "Knowledge note for production.",
    "benefit": "Routers ship reliably; we know exactly what's captured and what's not.",
    "ref": "",
    "features": []
  },
  {
    "id": 435,
    "date": "2026-05-11",
    "theme": "Milestones",
    "impact": 5,
    "summary": "Initial commit — Haven Build Station consolidated tree",
    "detail": null,
    "benefit": "Anchor points for 'we got here' — orientation in a long project.",
    "ref": "ff9a46d233",
    "features": []
  },
  {
    "id": 431,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "build-haven-image: live-fire bake-in updates from user1 <router serial> burn",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "2de69c6f84",
    "features": []
  },
  {
    "id": 70,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "The modern admin-screen theme is now baked into every router's firmware from the factory.",
    "detail": "Customers see the polished admin experience the moment they first log in — no extra setup, no theme to install.",
    "benefit": "Out-of-box experience matches the marketing — no \"configure this first\" friction.",
    "ref": "",
    "features": [
      {
        "id": 30,
        "lead": "Haven OD"
      }
    ]
  },
  {
    "id": 69,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Production firmware image expanded to include all runtime pieces the admin screen needs, so nothing is missing at first boot.",
    "detail": "Eliminated a class of \"Haven menu won't load on first try\" issues by ensuring everything ships in the firmware image instead of being downloaded after the fact.",
    "benefit": "First-boot experience just works — no surprises after the customer plugs the router in.",
    "ref": "",
    "features": [
      {
        "id": 2,
        "lead": "Pre-flashed router"
      },
      {
        "id": 26,
        "lead": "Plug in, set a password, you are filtering"
      }
    ]
  },
  {
    "id": 68,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "identity table is append-only — created_datetime only, no modified_datetime",
    "detail": "Live-fire 2026-05-11. Tried INSERT OR REPLACE INTO identity (key, value, modified_datetime)... and got 'table identity has no column named modified_datetime'. By design: identity is immutable per-serial — serial doesn't change after burn. Schema: identity(key TEXT PK, value TEXT…",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "",
    "features": []
  },
  {
    "id": 67,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Internal-documentation fix on how the encrypted-DNS bypass-resistance layer reports its status.",
    "detail": "Updated the burn-procedure checklists to match how the production routers actually report bypass-resistance status. Internal-only.",
    "benefit": "Routers ship with verifiable bypass-resistance — production checklists confirm what's actually active.",
    "ref": "",
    "features": [
      {
        "id": 13,
        "lead": "Bypass-resistant"
      }
    ]
  },
  {
    "id": 66,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Production-line script now refuses to proceed if the router's identity hasn't been seeded yet — catches a class of half-built routers before they ship.",
    "detail": "A guard in the burn pipeline so units in an inconsistent state never leave the bench.",
    "benefit": "Customers receive routers that are completely provisioned, never half-built.",
    "ref": "",
    "features": []
  },
  {
    "id": 65,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "NetworkManager static-IP override on burn-slot NIC blocks GL.iNet OEM-IP reach (NC#1 root cause)",
    "detail": "Live-fire 2026-05-11. NC#1 in build_id=2: Step 3 couldn't ping GL.iNet at 192.168.8.1 because dev workstation's 'Wired connection 1' (USB-Ethernet enx0050b6ef2e37) had a static 192.168.1.4 override layered on DHCP. NIC was on 192.168.1.x while GL.iNet stock DHCP serves 192.168.8.…",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "",
    "features": []
  },
  {
    "id": 64,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Internal-documentation correction on a data-storage detail that the production playbook had recorded incorrectly.",
    "detail": "Self-correction surfaced during a live burn QC step. Internal-only.",
    "benefit": "Production procedures match what the router actually does. No more guesswork during ship-prep.",
    "ref": "",
    "features": []
  },
  {
    "id": 63,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Production deploy script flagged for simplification — much of what it used to do is now baked into the firmware image directly.",
    "detail": "Burn step now does less work because the factory image already contains what used to be installed post-flash. Faster, simpler, fewer steps that can go wrong.",
    "benefit": "Each new router takes less time to prepare; less time means lower per-unit cost and faster Indiegogo fulfillment.",
    "ref": "",
    "features": []
  },
  {
    "id": 62,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Discovered which firmware-image variant the router-vendor's built-in updater accepts vs rejects — picked the working one for production.",
    "detail": "Saved a class of \"looks broken, isn't\" puzzles by documenting the exact image format the stock-firmware updater will accept.",
    "benefit": "First-flash succeeds reliably during manufacturing — no false-failure detours.",
    "ref": "",
    "features": []
  },
  {
    "id": 61,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Middleware over-gated /api/* blocked router feed fetches (FIXED 8c65dc2)",
    "detail": "Live-fire 2026-05-11. user1's router at first boot returned 401 on /api/<database>, /api/feed-delta.db, /api/update.json, /api/feed.json — the entire subscription feed delivery surface — because the Cloudflare Pages middleware gated ALL /api/* paths except /api/auth. Routers have no…",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "",
    "features": []
  },
  {
    "id": 60,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "Three \"missing piece\" errors caught during the first real-router burn; each fixed at the procedure level so they never reach a customer.",
    "detail": "Production checklists updated to include everything needed for first-boot. Each customer's router gets a known-good experience.",
    "benefit": "Every issue caught during a controlled burn is one issue not reaching a customer.",
    "ref": "",
    "features": []
  },
  {
    "id": 58,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "Operator-caught bug in the manufacturing flash sequence — fixed before the procedure was finalized.",
    "detail": "Dave noticed a step was using the wrong image variant. Correction documented; production flow now matches reality.",
    "benefit": "Procedure caught the bug, not a customer. Every live-fire run hardens the next one.",
    "ref": "",
    "features": []
  },
  {
    "id": 57,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "LIVE-FIRE FINDING #8: GL.iNet 4.8.x admin uses JSON-RPC at /rpc, not REST; flash-stage-1 needs rewrite",
    "detail": "Discovered 2026-05-11 21:57 CDT during user1 <router serial> burn — first live exercise of flash-stage-1.sh against actual stock GL.iNet hardware.",
    "benefit": "A real burn surfaced a real flaw — fixed at the procedure level before any customer hits it.",
    "ref": "",
    "features": []
  },
  {
    "id": 56,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "PROCEDURE UPDATE: nmcli DHCP-refresh + port-22 probe must be part of Step 3",
    "detail": "Discovered 2026-05-11 21:00-21:30 CDT during user1 <router serial> burn. Two procedural gaps in Step 3 as currently written, both surfaced under real conditions.",
    "benefit": "A real burn surfaced a real flaw — fixed at the procedure level before any customer hits it.",
    "ref": "",
    "features": []
  },
  {
    "id": 55,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "Branded-paint application interfered with a router status LED; production procedure adjusted to preserve LED visibility.",
    "detail": "Customer-facing detail caught during burn-prep. Paint area + sticker placement now defined to never cover indicator LEDs.",
    "benefit": "Customers can read router status lights as designed — branding never blocks function.",
    "ref": "",
    "features": []
  },
  {
    "id": 53,
    "date": "2026-05-11",
    "theme": "Firmware & overlay",
    "impact": 5,
    "summary": "First Haven custom firmware image successfully built — Haven now ships as a unified, branded firmware, not a generic image with our software bolted on.",
    "detail": "Took several rounds of trial-and-error before the build pipeline worked; once it did, the build completes in under 30 seconds. Every shipped router will use this pipeline.",
    "benefit": "Haven IS the firmware — not a third-party-firmware image with our software added on top. Customers get one cohesive product.",
    "ref": "",
    "features": []
  },
  {
    "id": 52,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "Discovered a long-standing build-chain bug in an upstream component — internal-only finding.",
    "detail": "Helps prioritize future build-stack hardening so the production pipeline stays stable.",
    "benefit": "Sustainable production pipeline — bugs caught at the source, not in the field.",
    "ref": "",
    "features": []
  },
  {
    "id": 51,
    "date": "2026-05-11",
    "theme": "Product definition",
    "impact": 5,
    "summary": "PRODUCT REQUEST: 'burn_router' single-command CLI for remote build stations",
    "detail": "Dave 2026-05-11 product directive: a one-word command that runs the whole burn end-to-end without operator interaction.",
    "benefit": "Scope and language locked — every downstream decision is faster and more consistent.",
    "ref": "",
    "features": []
  },
  {
    "id": 50,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "Resolved an upstream toolchain conflict that would have blocked future firmware builds.",
    "detail": "A compiler-version-vs-system-header mismatch surfaced during a build attempt. Mitigation documented; future builds know to apply it.",
    "benefit": "Sustainable production pipeline — no time wasted re-fighting the same upstream bug.",
    "ref": "",
    "features": []
  },
  {
    "id": 49,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "Documented a misnamed build-system variable — saves future-us several hours of head-scratching.",
    "detail": "Internal-only documentation correction. Build pipeline reliability up; debugging time down.",
    "benefit": "Sustainable production pipeline; less time fighting build tooling.",
    "ref": "",
    "features": []
  },
  {
    "id": 48,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "Pinned a build-chain component to a known-good version after the upstream version broke things — internal-only fix.",
    "detail": "A pattern: future-dated upstream versions can ship regressions; we now pin known-good versions and only roll forward intentionally.",
    "benefit": "Production firmware builds reliably and reproducibly. No surprise breakage from upstream changes.",
    "ref": "",
    "features": []
  },
  {
    "id": 47,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "Pinned the secure-tunnel component to a known-good version — newer upstream version was incompatible with our kernel.",
    "detail": "Caught during firmware-image prep. Locked-down version reproducibly builds with the rest of our stack.",
    "benefit": "Secure-tunnel capability is dependable on every router we ship.",
    "ref": "",
    "features": []
  },
  {
    "id": 46,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "Internal investigation into why a required kernel module was being silently excluded from the production firmware image.",
    "detail": "Root-caused and documented; future production runs catch it at the right step.",
    "benefit": "Production firmware ships with every required piece — nothing missing at first boot.",
    "ref": "",
    "features": []
  },
  {
    "id": 45,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "Several package-name mismatches between our internal bake-in list and the upstream firmware catalog — caught + corrected.",
    "detail": "Naming drift surfaced during firmware-image prep. Internal package list now matches the upstream reality.",
    "benefit": "Production firmware builds first-try, every time. No mystery \"package not found\" detours.",
    "ref": "",
    "features": []
  },
  {
    "id": 54,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Recipient queue update: user2 queued as <router serial>; YouTube1 slips to <router serial>+",
    "detail": "Dave 2026-05-11 20:32 CDT: 'After user1 comes user2.'",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "",
    "features": []
  },
  {
    "id": 44,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Build station consolidated under ~/haven-station/ — self-contained, migratable tree",
    "detail": "Per Dave 2026-05-11: all router-burning resources moved into one distinct tree at ~/haven-station/. Nothing else lives in that path. Designed for clean migration to other build stations (Southern Missouri etc.).",
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "",
    "features": []
  },
  {
    "id": 43,
    "date": "2026-05-11",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Build-station prep landed: image cache + manifest + fetch + preflight scripts",
    "detail": "Per Dave 2026-05-11 (after the burning-strategy discussion + OS-portability question): prepped two of the high-value items from that analysis — image cache + preflight script — and structured them so a remote station (Southern Missouri etc.) can bootstrap from clean with three co…",
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "",
    "features": [
      {
        "id": 18,
        "lead": "Updated weekly"
      }
    ]
  },
  {
    "id": 184,
    "date": "2026-05-11",
    "theme": "Demo page",
    "impact": 3,
    "summary": "demo: drop dead localStorage haven_mode write; demo persistence is cookie-only",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "2faf150e04",
    "features": []
  },
  {
    "id": 59,
    "date": "2026-05-11",
    "theme": "Process & discipline",
    "impact": 3,
    "summary": "Working two-step flash procedure documented for moving routers from stock vendor firmware to Haven.",
    "detail": "Internal production procedure captured from a real first-customer burn.",
    "benefit": "Less waste, fewer detours, more shipped routers per production session.",
    "ref": "",
    "features": []
  },
  {
    "id": 41,
    "date": "2026-05-11",
    "theme": "Demo page",
    "impact": 3,
    "summary": "Demo-page persistence audit: confirmed lulhaven.com/demo never sends visitor data off-device. One unused write removed.",
    "detail": "",
    "benefit": "Customers can try Haven before they buy; their experiment stays private to their browser.",
    "ref": "",
    "features": []
  },
  {
    "id": 433,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 2,
    "summary": "Pre-burn production sequence consolidated into a smaller, more reliable set of steps.",
    "detail": "",
    "benefit": "Routers ship reliably; less procedural surface to go wrong.",
    "ref": "e39a171ed9",
    "features": []
  },
  {
    "id": 182,
    "date": "2026-05-11",
    "theme": "Demo page",
    "impact": 2,
    "summary": "demo: fix preset 'Add to existing' (and 'Replace') silently doing nothing",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "7d4fa29dde",
    "features": []
  },
  {
    "id": 42,
    "date": "2026-05-11",
    "theme": "Demo page",
    "impact": 2,
    "summary": "Bug fix: household preset \"Add to existing\" and \"Replace\" buttons now actually take effect in the modal flow.",
    "detail": "Bug existed on both the public demo and the in-router admin screen.",
    "benefit": "Presets reliably apply when customers click them — what they see is what they get.",
    "ref": "",
    "features": []
  },
  {
    "id": 434,
    "date": "2026-05-11",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "Internal sync script that refreshes the production build directory from the source tree.",
    "detail": "",
    "benefit": "Production builds always reflect the latest internal code.",
    "ref": "b9ae2fd834",
    "features": []
  },
  {
    "id": 432,
    "date": "2026-05-11",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "Production build path proven end-to-end: firmware image built, baked, manifest registered.",
    "detail": "",
    "benefit": "Every production firmware image is traceable to its build inputs.",
    "ref": "d1b1fc1468",
    "features": []
  },
  {
    "id": 181,
    "date": "2026-05-11",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "middleware: scope auth to /api/builds/* only; feed endpoints public",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "8c65dc2159",
    "features": []
  },
  {
    "id": 333,
    "date": "2026-05-10",
    "theme": "Wiki & documentation",
    "impact": 5,
    "summary": "wiki: — <admin tool> UI deployed",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "134ebd50d2",
    "features": []
  },
  {
    "id": 32,
    "date": "2026-05-10",
    "theme": "Build maintenance UI",
    "impact": 5,
    "summary": "<admin tool> UI: home link on every page + 3-strike redirect on bad password",
    "detail": "Dave noticed there was no exit path from /<admin tool>/ back to the public site, and that a forgotten password locked the form open indefinitely.",
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "",
    "features": []
  },
  {
    "id": 27,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 5,
    "summary": "Haven automation philosophy: maximum Claude + granular human instructions + live D1 updates",
    "detail": "Four principles govern Haven build automation going forward.",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "",
    "features": []
  },
  {
    "id": 26,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 5,
    "summary": "<admin tool> UI deployed — Cloudflare Pages + D1, password-gated",
    "detail": "<admin tool> UI live at <admin URL>. Password-gated (set as Cloudflare Pages secret <admin secret>; <admin password reference>). Backed by a Cloudflare D1 database (<backend table>, id <database id>",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "",
    "features": []
  },
  {
    "id": 20,
    "date": "2026-05-10",
    "theme": "Firmware & overlay",
    "impact": 5,
    "summary": "Golden selected-categories captured + project_haven_bypass_resistance.md rewritten",
    "detail": "Two follow-ups from closed: (a) selected categories on the golden router enumerated and added to the snapshot; (b) project_haven_bypass_resistance.md rewritten to reflect the actually-deployed state.",
    "benefit": "Reliable, persistent router behavior with no manual setup the customer has to do.",
    "ref": "",
    "features": [
      {
        "id": 1,
        "lead": "Whole-home filtering"
      },
      {
        "id": 12,
        "lead": "Block what you choose"
      },
      {
        "id": 13,
        "lead": "Bypass-resistant"
      },
      {
        "id": 32,
        "lead": "We block at the network level"
      }
    ]
  },
  {
    "id": 19,
    "date": "2026-05-10",
    "theme": "Process & discipline",
    "impact": 5,
    "summary": "archive: project_haven_bypass_resistance.md as of 2026-05-10 (pre-deployed-rewrite)",
    "detail": "Pre-rewrite snapshot. The memory file described bypass resistance as a planned but unshipped gap; the 2026-05-10 golden smoke test confirmed almost all of it is now deployed (port 53 <bypass mitigation>, port 853 reject, DoH endpoint reject, <bypass mitigation> /8 + domain <bypass mitigation>s)…",
    "benefit": "Less waste, fewer back-and-forths, more shipped work per session.",
    "ref": "",
    "features": [
      {
        "id": 13,
        "lead": "Bypass-resistant"
      }
    ]
  },
  {
    "id": 348,
    "date": "2026-05-10",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "wiki: add 4 notes from late session — burn discipline, framework, strategy, user1 path",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "77d076cdb4",
    "features": []
  },
  {
    "id": 344,
    "date": "2026-05-10",
    "theme": "Wiki & documentation",
    "impact": 4,
    "summary": "wiki: — adopt three power moves as standard practice",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "5993d80dc6",
    "features": []
  },
  {
    "id": 340,
    "date": "2026-05-10",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "wiki: — user1 delivery strategy change (fresh OEM burn primary)",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "4e8b24eabf",
    "features": [
      {
        "id": 2,
        "lead": "Pre-flashed router"
      },
      {
        "id": 26,
        "lead": "Plug in, set a password, you are filtering"
      }
    ]
  },
  {
    "id": 336,
    "date": "2026-05-10",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "data: burns.db + burn-tracking schema + user1's burn seeded",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "016ac8f9ac",
    "features": []
  },
  {
    "id": 335,
    "date": "2026-05-10",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "burns: serial format yymmddMODnnnn + multi-site schema delta",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "2c6dc8d691",
    "features": []
  },
  {
    "id": 191,
    "date": "2026-05-10",
    "theme": "Build maintenance UI",
    "impact": 4,
    "summary": "<admin tool>: password-gated UI + D1-backed API",
    "detail": null,
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "4066135be9",
    "features": []
  },
  {
    "id": 40,
    "date": "2026-05-10",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Haven hosts a VPN endpoint too; all traffic end-to-end encrypted, no cleartext on our infrastructure",
    "detail": "Dave decision 2026-05-10 21:48 CDT: 'We will host a vpn endpoint (as will all our routers). Any such traffic will be encrypted.'",
    "benefit": "The cardinal: Haven Inc. never sees customer cleartext on its infrastructure. Architecture, not policy — anchors every privacy claim in the product.",
    "ref": "",
    "features": [
      {
        "id": 6,
        "lead": "Haven cannot read your traffic"
      },
      {
        "id": 14,
        "lead": "Filtering follows household members wherever they go"
      }
    ]
  },
  {
    "id": 39,
    "date": "2026-05-10",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "DDNS piggybacks on the existing daily subscription check-in",
    "detail": "Dave decision 2026-05-10 21:45 CDT: DDNS for the VPN endpoint will piggyback on the existing daily subscription check-in. No external DDNS provider (DuckDNS, Dynu, etc.), no separate update daemon — the router already calls home once a day for the subscription delta; we just add …",
    "benefit": "Filtering follows household members off home Wi-Fi — closes the cellular bypass that defeats most competitors.",
    "ref": "",
    "features": [
      {
        "id": 18,
        "lead": "Updated weekly"
      },
      {
        "id": 28,
        "lead": "$4/month for category updates"
      }
    ]
  },
  {
    "id": 38,
    "date": "2026-05-10",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Haven ships with a built-in secure-tunnel endpoint — one toggle activates off-network filtering.",
    "detail": "No third-party VPN service to sign up for; no separate router to configure. Built in.",
    "benefit": "Filtering follows household members off home Wi-Fi — closes the cellular bypass that defeats most competitors.",
    "ref": "",
    "features": [
      {
        "id": 14,
        "lead": "Filtering follows household members wherever they go"
      }
    ]
  },
  {
    "id": 37,
    "date": "2026-05-10",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Future product spec: Pi5 Haven router as YouTube1 Geerling's full-stack endorsement target",
    "detail": "Strategic vision Dave articulated 2026-05-10: 'In time we will send YouTube1 a Pi5 router with everything he has videoed... native VPN, security, FCC compliant, etc.'",
    "benefit": "Filtering follows household members off home Wi-Fi — closes the cellular bypass that defeats most competitors.",
    "ref": "",
    "features": []
  },
  {
    "id": 36,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Possible pivot: sell software (with Pi as reference hardware), appliance becomes the premium SKU",
    "detail": "Dave raised the possibility 2026-05-10 of pivoting Haven's go-to-market from 'pre-flashed routers' to 'software, with optional appliance.' Exploratory, not decided. This note captures the strategic shape so it can be revisited.",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "",
    "features": []
  },
  {
    "id": 35,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "YouTube1 Geerling's 'Homebrew routers' video (2026-03-24): FCC covered list trigger + Haven strategic fit",
    "detail": "Dave shared the YouTube1 Geerling video on 2026-05-10 that prompted the tentative <router serial> send. Full context captured here so the outreach brief stays specific.",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "",
    "features": []
  },
  {
    "id": 34,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Recipient policy shift: send-to-aligned-voices; YouTube1 Geerling = tentative <router serial>",
    "detail": "Dave shifted recipient assignment policy 2026-05-10 from anchor-decided to reactive.",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "",
    "features": []
  },
  {
    "id": 28,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Build playbook lives on the website (D1 <backend table>), not in code",
    "detail": "The Haven router build procedure (per-step executable commands, verification, human-helper instructions) is stored in D1 on lulhaven.com as the canonical source of truth. NOT in a local python script. Any Claude instance at any build site (Dave's, son1's, son2's) fetche…",
    "benefit": "Burn procedure lives in D1 as data, not in code. Refinement is a SQL UPDATE — every site/Claude instantly uses the new procedure.",
    "ref": "",
    "features": []
  },
  {
    "id": 25,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Serial-number format adopted (yymmddMODnnnn) with backing record-keeping schema — supports tracking across multiple production sites in the future.",
    "detail": "Internal record-keeping: every burned router gets a unique date-stamped serial that encodes the model and the unit number within its model.",
    "benefit": "Every router has a unique, traceable identity from manufacture — supports warranty service, support lookups, and recall scope if ever needed.",
    "ref": "",
    "features": []
  },
  {
    "id": 24,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Kernel-module bake-in list adopted (refines — for the firmware that will be burned to all Haven routers",
    "detail": "Adopt the specific kernel-module + small-userspace inclusion list below as the firmware-build configuration for Haven routers, starting with user1's burn. Total firmware weight increase: approximately 3-5 MB on routers with 256+ MB of flash. Zero runtime cost unless a m…",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "",
    "features": []
  },
  {
    "id": 23,
    "date": "2026-05-10",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Production record-keeping system adopted — modeled on the regimens used in military, aerospace, FDA medical-device, and pharma manufacturing.",
    "detail": "Three-table internal schema records every burn step, every test result, every operator action. Built to the same standard professional industries use for procedural traceability.",
    "benefit": "Every router we ship is backed by a formal record of how it was made — same discipline used by the most safety-critical industries.",
    "ref": "",
    "features": []
  },
  {
    "id": 22,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Core data infrastructure migration phases 1-7 complete — Haven now runs on a unified storage backbone across the router fleet.",
    "detail": "Internal-only modernization: legacy text-file storage retired in favor of a structured store. UI on the router unchanged.",
    "benefit": "Easier to ship reliable updates; faster bug-fix turnaround; cleaner future feature surface.",
    "ref": "",
    "features": []
  },
  {
    "id": 21,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Core data infrastructure migration kicked off — Haven router data moves to a structured, query-able backbone.",
    "detail": "Internal architecture choice. Same admin-screen UI, more reliable internals.",
    "benefit": "Faster feature delivery over time; fewer \"where is X stored?\" bugs that customers ever experience.",
    "ref": "",
    "features": []
  },
  {
    "id": 18,
    "date": "2026-05-10",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Pre-freeze production smoke-test passed; reference router preserved as a known-good restore point.",
    "detail": "One specific router preserved as the \"everything works on this one\" baseline; future production runs diff against it.",
    "benefit": "Every shipped router has a verifiable known-good reference behind it.",
    "ref": "",
    "features": []
  },
  {
    "id": 17,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Production strategy for first customer router: build from scratch from a new-in-box unit, with a tested router held as a safety net.",
    "detail": "Internal production-path decision. Primary: fresh burn. Fallback: pre-tested unit, if the fresh burn surfaces a blocker.",
    "benefit": "First customer gets a router built with the full production procedure, not a hand-tuned prototype.",
    "ref": "",
    "features": []
  },
  {
    "id": 16,
    "date": "2026-05-10",
    "theme": "Tooling & infrastructure",
    "impact": 4,
    "summary": "Scheduled /insights week-2 for 2026-05-17 — two-layer fallback after CronCreate session-only limit",
    "detail": "Scheduled the /insights week-2 audit for 2026-05-17 ~09:07 CDT using two independent userspace mechanisms (file-based reminder + systemd-user transient timer). Built after discovering that Claude Code's CronCreate tool ignored `durable: true` and produced a session-only…",
    "benefit": "Daily workflow is faster and more reliable; less cognitive load per task.",
    "ref": "",
    "features": []
  },
  {
    "id": 15,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "/insights audit (2026-05-10) — adopted /insights periodic; new completion-honesty rules",
    "detail": "Two outcomes from running /insights against 7 sessions / 196 messages from 2026-05-05 to 2026-05-10:",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "",
    "features": []
  },
  {
    "id": 14,
    "date": "2026-05-10",
    "theme": "Process & discipline",
    "impact": 4,
    "summary": "archive: feedback_power_moves.md as of 2026-05-10 08:30 CDT (pre-insights-revision)",
    "detail": "Pre-revision snapshot of feedback_power_moves.md before moving /insights from the skip list to adopt-as-periodic-audit. Original content attached as file. The /insights report on 2026-05-10 demonstrated genuine cross-session pattern-detection value that the wiki+memory does not p…",
    "benefit": "Less waste, fewer back-and-forths, more shipped work per session.",
    "ref": "",
    "features": []
  },
  {
    "id": 13,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Adopted three power moves as standard practice",
    "detail": "Adopt three Claude Code features as standard working practice: ULTRATHINK (depth on demand), /loop (backlog burn-down), /schedule (time-bound reminders). Skip /caveman (redundant), /insights and /btw (uncertain). Codified in `feedback_power_moves.md`.",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "",
    "features": []
  },
  {
    "id": 10,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Operate autonomously — kill the permission prompts",
    "detail": "Eliminate Claude Code permission prompts during long-running and routine work. Set `permissions.defaultMode = \"dontAsk\"` in `<config file>`, and add an autonomous-operation paragraph to `<doc file>` plus a feedback memory file (`feedback_operate_autonom…",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "",
    "features": []
  },
  {
    "id": 9,
    "date": "2026-05-10",
    "theme": "Process & discipline",
    "impact": 4,
    "summary": "archive: feedback_haven_wiki_logging.md as of 2026-05-10 06:52 CDT (pre-conventions)",
    "detail": "Pre-conventions snapshot of feedback_haven_wiki_logging.md\narchived prior to applying the 5-point convention update.",
    "benefit": "Less waste, fewer back-and-forths, more shipped work per session.",
    "ref": "",
    "features": []
  },
  {
    "id": 8,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Accessory-ecosystem product strategy (Raspberry Pi model)",
    "detail": "Haven adopts the Raspberry Pi accessory-ecosystem model — sell\nthe router as the core product, then sell branded accessory SKUs around it.",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "",
    "features": []
  },
  {
    "id": 7,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Burn process must be rock-solid — strategic recognition (Dave 2026-05-09)",
    "detail": "Burn process must be rock-solid before scale. Manifest +\nverify-script + golden-snapshot work is NOT infrastructure overhead — it\nIS the actual product engineering. Every burn that ships without\nverification is a customer's bad first impression we paid to manufacture.",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "",
    "features": []
  },
  {
    "id": 347,
    "date": "2026-05-10",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "wiki: add note_links table, retrofit notes 1-11 with 5 conventions",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "cb445e7136",
    "features": []
  },
  {
    "id": 343,
    "date": "2026-05-10",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "wiki: notes #16-17 — /insights audit + completion-honesty rules",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "e35b55aefb",
    "features": []
  },
  {
    "id": 342,
    "date": "2026-05-10",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "wiki: archive full /insights report under wiki_files/meta/",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "81c084df74",
    "features": []
  },
  {
    "id": 341,
    "date": "2026-05-10",
    "theme": "Session continuity",
    "impact": 3,
    "summary": "data: scheduled-reminders.md + session-start hook for due-reminder surfacing",
    "detail": null,
    "benefit": "Sessions resume with full context; no rediscovery, no lost decisions.",
    "ref": "46542a89c7",
    "features": []
  },
  {
    "id": 338,
    "date": "2026-05-10",
    "theme": "Session continuity",
    "impact": 3,
    "summary": "Bypass-resistance baseline captured; all known encrypted-DNS workarounds blocked at the router.",
    "detail": "",
    "benefit": "Bypass attempts (encrypted-DNS, privacy relays) return to Haven's filter — the workarounds don't work.",
    "ref": "f8d4505b26",
    "features": [
      {
        "id": 1,
        "lead": "Whole-home filtering"
      },
      {
        "id": 13,
        "lead": "Bypass-resistant"
      },
      {
        "id": 32,
        "lead": "We block at the network level"
      }
    ]
  },
  {
    "id": 337,
    "date": "2026-05-10",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "Internal documentation synced with the data-infrastructure migration.",
    "detail": "",
    "benefit": "Decisions persist across sessions; future-us picks up cold with full context.",
    "ref": "ee6dcbec4e",
    "features": []
  },
  {
    "id": 332,
    "date": "2026-05-10",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "wiki: — Haven automation philosophy",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "ed968be5f6",
    "features": []
  },
  {
    "id": 331,
    "date": "2026-05-10",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "wiki: — build playbook lives on the website (<backend table> in D1)",
    "detail": null,
    "benefit": "Burn procedure lives in D1 as data, not in code. Refinement is a SQL UPDATE — every site/Claude instantly uses the new procedure.",
    "ref": "18391b400d",
    "features": []
  },
  {
    "id": 190,
    "date": "2026-05-10",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "<admin tool>: commit released-build snapshots to haven-data via GitHub API",
    "detail": null,
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "72201d668b",
    "features": []
  },
  {
    "id": 189,
    "date": "2026-05-10",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "<admin tool>: split step 2 into 2a (human plug-in) + 2b (Claude verify)",
    "detail": null,
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "3f46689831",
    "features": []
  },
  {
    "id": 188,
    "date": "2026-05-10",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "<admin tool>: add executor callout to every step_name",
    "detail": null,
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "8554479e6e",
    "features": []
  },
  {
    "id": 187,
    "date": "2026-05-10",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "<admin tool>: home link on every page + 3-strike redirect on bad password",
    "detail": null,
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "e66f20801e",
    "features": []
  },
  {
    "id": 186,
    "date": "2026-05-10",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "<admin tool>: jettison on every failed password, not just after 3",
    "detail": null,
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "867aeaca2b",
    "features": []
  },
  {
    "id": 33,
    "date": "2026-05-10",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "<admin tool> auth: jettison on every wrong password (one strike, not three)",
    "detail": "Supersedes the 3-strike policy from. Dave's reasoning 2026-05-10: a client-side counter is theater — a determined attacker hits POST /api/auth directly and the JS counter is bypassed. If we can't (yet) enforce real rate limiting at the function layer, the only honest cos…",
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "",
    "features": []
  },
  {
    "id": 31,
    "date": "2026-05-10",
    "theme": "Process & discipline",
    "impact": 3,
    "summary": "Build steps carry executor callout in step_name (Claude / Haven Technician)",
    "detail": "Per Dave 2026-05-10, every step in STANDARD_STEPS leads with an explicit executor callout.",
    "benefit": "Less waste, fewer back-and-forths, more shipped work per session.",
    "ref": "",
    "features": []
  },
  {
    "id": 30,
    "date": "2026-05-10",
    "theme": "Process & discipline",
    "impact": 3,
    "summary": "Build procedure: step 2 split into 2a (human) + 2b (Claude verify)",
    "detail": "Per Dave 2026-05-10, the original step 2 'Power on; confirm OEM firmware reachable' bundled two distinct kinds of work: a human-only physical action (plug in power + LAN) and an automatable check (ping the router; HTTP-GET its web UI). Per the automation philosophy, ev…",
    "benefit": "Less waste, fewer back-and-forths, more shipped work per session.",
    "ref": "",
    "features": []
  },
  {
    "id": 29,
    "date": "2026-05-10",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "D1 -> git archival working end-to-end (smoke test passed)",
    "detail": "Built and verified the durability layer: every successful POST /api/builds/<id>/release now commits a JSON snapshot of the build (header + steps + NCRs) to mndavew3/haven-data at builds/<site>/<serial>.json via the GitHub REST API.",
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "",
    "features": []
  },
  {
    "id": 346,
    "date": "2026-05-10",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "data: track haven-root context file; log autonomous-op closure",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "e02a8d9dda",
    "features": []
  },
  {
    "id": 345,
    "date": "2026-05-10",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "data: gitignore.wrangler/, log wrangler-stray-dir fix",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "ee08342139",
    "features": []
  },
  {
    "id": 339,
    "date": "2026-05-10",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "data: golden router snapshot — pre-freeze verification",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "b91c31d941",
    "features": []
  },
  {
    "id": 334,
    "date": "2026-05-10",
    "theme": "Burn procedure & build station",
    "impact": 1,
    "summary": "data: rename burns -> builds (Dave: \"less alarming to the uninitiated\")",
    "detail": null,
    "benefit": "Routers ship reliably and quickly; refining the burn procedure improves every future router.",
    "ref": "d8912e00ac",
    "features": []
  },
  {
    "id": 330,
    "date": "2026-05-10",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "release: 260510TST0002 (released_by smoke-test-2)",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "2e4619bf68",
    "features": []
  },
  {
    "id": 185,
    "date": "2026-05-10",
    "theme": "Build maintenance UI",
    "impact": 1,
    "summary": "<admin tool>: fix stale \"3-strike\" comment after one-strike change",
    "detail": null,
    "benefit": "The build playbook lives as data — anyone refining the procedure does it with a click, no code redeploy.",
    "ref": "53f078222c",
    "features": []
  },
  {
    "id": 12,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 1,
    "summary": "Wrangler.wrangler/ stray-dir bug — patched both deploy scripts",
    "detail": "Patched <script> and <script> to explicitly `cd \"$SITE_DIR\"` (deploy-lulhaven) and `cd \"$SITE\"` (deploy-all) immediately before invoking `wrangler pages deploy`. Added defense-in-depth `.wrangler/` line to `<config file>`. Cl…",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "",
    "features": []
  },
  {
    "id": 11,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 1,
    "summary": "Closed TODOs from #12 — global mirror + haven-root CLAUDE.md backup",
    "detail": "Closed both follow-up TODOs from.",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "",
    "features": []
  },
  {
    "id": 353,
    "date": "2026-05-09",
    "theme": "SQLite source-of-truth pipeline",
    "impact": 4,
    "summary": "import.py: diff-and-update import (Phase 4 step 2)",
    "detail": null,
    "benefit": "Single place to edit data; everything else regenerates — no parallel maintenance, no drift.",
    "ref": "a0289ca133",
    "features": []
  },
  {
    "id": 352,
    "date": "2026-05-09",
    "theme": "SQLite source-of-truth pipeline",
    "impact": 4,
    "summary": "sql/export_feed_delta.py: rolling delta DB for delta-sync (Phase 4 step 3)",
    "detail": null,
    "benefit": "Single place to edit data; everything else regenerates — no parallel maintenance, no drift.",
    "ref": "188c75ee30",
    "features": [
      {
        "id": 18,
        "lead": "Updated weekly"
      }
    ]
  },
  {
    "id": 351,
    "date": "2026-05-09",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "data: add Mobile Game Ads category with top-5 ad networks",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "bd28fc348a",
    "features": [
      {
        "id": 12,
        "lead": "Block what you choose"
      }
    ]
  },
  {
    "id": 198,
    "date": "2026-05-09",
    "theme": "Build pipeline",
    "impact": 4,
    "summary": "api/feed-delta.db: ship rolling 30-day delta artifact (Phase 4 step 3)",
    "detail": null,
    "benefit": "Edits flow source → live in one script. No copy-paste, no stale artifacts.",
    "ref": "c6113ad705",
    "features": [
      {
        "id": 18,
        "lead": "Updated weekly"
      }
    ]
  },
  {
    "id": 197,
    "date": "2026-05-09",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "data: rebuild artifacts with Mobile Game Ads category",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "9f70106be6",
    "features": []
  },
  {
    "id": 6,
    "date": "2026-05-09",
    "theme": "Tooling & infrastructure",
    "impact": 4,
    "summary": "Haven wiki — design and schema (created 2026-05-09)",
    "detail": "Built a queryable knowledge base for Haven episodic content.\nLives at <database>. Schema in <schema file>.\nHelper script: <script> (subcommands add / search / show /\ntopics / keywords).",
    "benefit": "Daily workflow is faster and more reliable; less cognitive load per task.",
    "ref": "",
    "features": []
  },
  {
    "id": 5,
    "date": "2026-05-09",
    "theme": "Tooling & infrastructure",
    "impact": 4,
    "summary": "make-sticker-pdf.py — variable-data sticker PDF generator",
    "detail": "Built ~/scripts/make-sticker-pdf.py — variable-data sticker PDF\ngenerator. Inputs: a PNG/JPG base design + a CSV of serial numbers + text\nformatting flags. Outputs a multi-page PDF, one sticker per page, sized to\nthe requested label dimensions.",
    "benefit": "Daily workflow is faster and more reliable; less cognitive load per task.",
    "ref": "",
    "features": []
  },
  {
    "id": 4,
    "date": "2026-05-09",
    "theme": "Brand & packaging",
    "impact": 4,
    "summary": "Three new one-click household presets — Parenting, Privacy, Senior — added to both the demo and the in-router admin screen.",
    "detail": "Customers can apply a sensible-defaults preset with one click on either surface, then refine if they want. First application of the \"include-for-conversation\" principle (when in doubt, include).",
    "benefit": "Setup is one click instead of dozens of decisions. The presets cover the most common household goals out of the box.",
    "ref": "",
    "features": [
      {
        "id": 16,
        "lead": "Templates for real situations"
      }
    ]
  },
  {
    "id": 3,
    "date": "2026-05-09",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Marketing is politically agnostic — substance, never named messengers",
    "detail": "Haven's public marketing is politically agnostic in voice and\ncopy. Capture the substance of concerns about surveillance, big-tech\nconsolidation, family agency, and children being products — but never name\npoliticians or political figures in marketing. Direct outreach to po…",
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "",
    "features": []
  },
  {
    "id": 2,
    "date": "2026-05-09",
    "theme": "Brand & packaging",
    "impact": 4,
    "summary": "Navy Gnome sticker recolor pipeline",
    "detail": "Pipeline transforms the Copilot-generated Navy Gnome source PNG\ninto the final printable sticker design with white background, navy outline,\nand a navy label band at the bottom for the 'HAVEN - N OF 100' caption.",
    "benefit": "First customer impression before they even plug the router in — sets the trust baseline.",
    "ref": "",
    "features": [
      {
        "id": 29,
        "lead": "Haven Navy"
      }
    ]
  },
  {
    "id": 1,
    "date": "2026-05-09",
    "theme": "Brand & packaging",
    "impact": 4,
    "summary": "Avery 64510 layout dimensions (verified by test print 2026-05-09)",
    "detail": "12-up Avery 64510 layout dimensions confirmed and codified into a\nreproducible script. Avery 64510 = 2\"x2\" white waterproof film, matte, easy\npeel, laser/pigment-inkjet, print-to-the-edge, 12 labels per US Letter sheet.",
    "benefit": "First customer impression before they even plug the router in — sets the trust baseline.",
    "ref": "",
    "features": []
  },
  {
    "id": 349,
    "date": "2026-05-09",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "data: add Haven wiki — queryable knowledge base for episodic content",
    "detail": null,
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up cold with full context.",
    "ref": "71d5673dc5",
    "features": []
  },
  {
    "id": 195,
    "date": "2026-05-09",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "About us: add 1960 historical photo of Lulhaven on Big Fish Lake",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "c7a5b7fcd3",
    "features": []
  },
  {
    "id": 193,
    "date": "2026-05-09",
    "theme": "Demo page",
    "impact": 3,
    "summary": "demo: add Parenting and Privacy presets",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "ea037baa1f",
    "features": [
      {
        "id": 16,
        "lead": "Templates for real situations"
      }
    ]
  },
  {
    "id": 192,
    "date": "2026-05-09",
    "theme": "Demo page",
    "impact": 3,
    "summary": "demo: add Senior preset (anti-scam, anti-cognitive-decline-exploitation)",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "ff7caa7228",
    "features": [
      {
        "id": 16,
        "lead": "Templates for real situations"
      }
    ]
  },
  {
    "id": 354,
    "date": "2026-05-09",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "schema: add created_datetime / modified_datetime + tombstones (Phase 4 step 1)",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "e8b135257e",
    "features": []
  },
  {
    "id": 350,
    "date": "2026-05-09",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "data: extend Mobile Game Ads with tier-2 networks",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "4a65d565af",
    "features": []
  },
  {
    "id": 196,
    "date": "2026-05-09",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "data: rebuild artifacts with tier-2 mobile ad networks",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "f403351f38",
    "features": []
  },
  {
    "id": 194,
    "date": "2026-05-09",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "index.html: detect TV browsers and force desktop layout",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "677a80688c",
    "features": []
  },
  {
    "id": 357,
    "date": "2026-05-08",
    "theme": "SQLite source-of-truth pipeline",
    "impact": 5,
    "summary": "Phase 2 cutover: <database> is now the source-of-truth",
    "detail": null,
    "benefit": "Filter data centralized in <database>. Every downstream artifact (feed.json, haven-data.js, main.htm) regenerates from one source — no parallel maintenance.",
    "ref": "89e41e01d0",
    "features": []
  },
  {
    "id": 359,
    "date": "2026-05-08",
    "theme": "SQLite source-of-truth pipeline",
    "impact": 4,
    "summary": "Phase 1 of the structured-data foundation shipped — Haven's marketing site and router both now read from one source.",
    "detail": "Internal infrastructure that makes content updates flow from a single source to every customer-facing surface.",
    "benefit": "Customers see consistent content across website, demo, and router — no drift, no stale pages.",
    "ref": "eb5e45c1b6",
    "features": []
  },
  {
    "id": 358,
    "date": "2026-05-08",
    "theme": "SQLite source-of-truth pipeline",
    "impact": 4,
    "summary": "sql/import.py: split into 12 single-responsibility modules under lib/",
    "detail": null,
    "benefit": "Single place to edit data; everything else regenerates — no parallel maintenance, no drift.",
    "ref": "b5069ae495",
    "features": []
  },
  {
    "id": 356,
    "date": "2026-05-08",
    "theme": "Build pipeline",
    "impact": 4,
    "summary": "Phase 3 build pipeline ships structured data to the router as a single binary artifact.",
    "detail": "Internal build refinement; data updates flow from source to live router in one step.",
    "benefit": "When Haven curators add to the filter list, it reaches customer routers reliably and quickly.",
    "ref": "40c8e01d48",
    "features": []
  },
  {
    "id": 201,
    "date": "2026-05-08",
    "theme": "Build pipeline",
    "impact": 4,
    "summary": "feed.json: add missing key fields to Security and Big Business categories",
    "detail": null,
    "benefit": "Edits flow source → live in one script. No copy-paste, no stale artifacts.",
    "ref": "4224c79fe3",
    "features": []
  },
  {
    "id": 200,
    "date": "2026-05-08",
    "theme": "Build pipeline",
    "impact": 4,
    "summary": "data: rebuild feed.json, haven-data.js, haven-tooltips.js from <database>",
    "detail": null,
    "benefit": "Edits flow source → live in one script. No copy-paste, no stale artifacts.",
    "ref": "2bdf080695",
    "features": []
  },
  {
    "id": 199,
    "date": "2026-05-08",
    "theme": "Build pipeline",
    "impact": 4,
    "summary": "Curated filter data now shipped to the router as a single packaged artifact, refreshed automatically.",
    "detail": "Internal infrastructure for delivering filter-list updates from Haven's curation team to customer routers.",
    "benefit": "Customer routers stay current with the curated filter list without any manual customer action.",
    "ref": "4a13f31556",
    "features": []
  },
  {
    "id": 355,
    "date": "2026-05-08",
    "theme": "SQLite source-of-truth pipeline",
    "impact": 2,
    "summary": "build.py: fix dry-run main.htm prep — was using stale list index",
    "detail": null,
    "benefit": "Single place to edit data; everything else regenerates — no parallel maintenance, no drift.",
    "ref": "0db6d8c65a",
    "features": []
  },
  {
    "id": 204,
    "date": "2026-05-07",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "sync UI/feed: drop unmappable items, stage <data source>-mappable ones",
    "detail": null,
    "benefit": "12M curated domains across 30 categories integrated; we benefit from the world's most comprehensive non-commercial blacklist without paying or maintaining it.",
    "ref": "00a725478b",
    "features": []
  },
  {
    "id": 203,
    "date": "2026-05-07",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "itemUrls: enable Adult Content + 10 <data source>-mappable items in UI",
    "detail": null,
    "benefit": "12M curated domains across 30 categories integrated; we benefit from the world's most comprehensive non-commercial blacklist without paying or maintaining it.",
    "ref": "2a86b7f36b",
    "features": [
      {
        "id": 19,
        "lead": "Adult content: off until you choose it"
      }
    ]
  },
  {
    "id": 202,
    "date": "2026-05-07",
    "theme": "Build pipeline",
    "impact": 4,
    "summary": "sync: reconcile dataset, itemUrls, and feed.json",
    "detail": null,
    "benefit": "Edits flow source → live in one script. No copy-paste, no stale artifacts.",
    "ref": "2e6386c092",
    "features": []
  },
  {
    "id": 216,
    "date": "2026-05-06",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "feed: backfill 133 UI items with domain-only entries (gap closure)",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "56a9d8ca9c",
    "features": []
  },
  {
    "id": 215,
    "date": "2026-05-06",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "feed: add 1511 Apple AS714 IP prefixes to apple_corp",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "a7cb9b52fc",
    "features": []
  },
  {
    "id": 214,
    "date": "2026-05-06",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "feed: collapse overlapping CIDRs in i[] arrays (1618 -> 61)",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "7ec0fa02f2",
    "features": []
  },
  {
    "id": 213,
    "date": "2026-05-06",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "haven-data + feed: collapse Adult Content to single item",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "c08d5a4402",
    "features": [
      {
        "id": 19,
        "lead": "Adult content: off until you choose it"
      }
    ]
  },
  {
    "id": 205,
    "date": "2026-05-06",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "feed: Apple Corp — add icloud.com, me.com, mac.com and CDN domains",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "c2c53d69a9",
    "features": []
  },
  {
    "id": 212,
    "date": "2026-05-06",
    "theme": "Demo page",
    "impact": 3,
    "summary": "demo: mirror router whitelist + Allow + dirty-indicator UI",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "a33e94d671",
    "features": [
      {
        "id": 24,
        "lead": "Always-allow list"
      }
    ]
  },
  {
    "id": 211,
    "date": "2026-05-06",
    "theme": "Demo page",
    "impact": 3,
    "summary": "demo: replace placeholder log with 24 cartoon-villain sample entries",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "1425b5ecc9",
    "features": []
  },
  {
    "id": 209,
    "date": "2026-05-06",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "css: let hero h1 wrap naturally on phones",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "eaf12929bf",
    "features": []
  },
  {
    "id": 210,
    "date": "2026-05-06",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "rename: Frank -> Blue, Anne -> Khaki in marketing copy",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "70298644c4",
    "features": []
  },
  {
    "id": 208,
    "date": "2026-05-06",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "css: shrink display-1 to 2.5rem on phones (<=576px)",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "d47d808deb",
    "features": []
  },
  {
    "id": 207,
    "date": "2026-05-06",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "css/html: show ' — ' separator on phones between Haven and Declare",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "a67da715fd",
    "features": []
  },
  {
    "id": 206,
    "date": "2026-05-06",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "rename: Khaki -> Olive in marketing copy",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "84c3c589a6",
    "features": []
  },
  {
    "id": 220,
    "date": "2026-05-05",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "haven-data: enable Adult Content checkboxes (null strategy → upstream DNS)",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "eca54e86b9",
    "features": [
      {
        "id": 19,
        "lead": "Adult content: off until you choose it"
      }
    ]
  },
  {
    "id": 219,
    "date": "2026-05-05",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "feed: add bereal.com to BeReal domain list",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "438e858c64",
    "features": []
  },
  {
    "id": 217,
    "date": "2026-05-05",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "feed: add Twitter/TikTok IP ranges, remove bogus ASNs (Snapchat, Pinterest)",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "780789c6d1",
    "features": []
  },
  {
    "id": 226,
    "date": "2026-05-05",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "index.html: replace hero and We Offer sections with clearer copy",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "3a0573a323",
    "features": []
  },
  {
    "id": 225,
    "date": "2026-05-05",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "index.html: drop \"Cool\" from hero copy",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "83792a5171",
    "features": []
  },
  {
    "id": 224,
    "date": "2026-05-05",
    "theme": "Process & discipline",
    "impact": 3,
    "summary": "CLAUDE.md: add git discipline rule — pull before every session and edit",
    "detail": null,
    "benefit": "Less waste, fewer back-and-forths, more shipped work per session.",
    "ref": "cc7e1627b5",
    "features": []
  },
  {
    "id": 222,
    "date": "2026-05-05",
    "theme": "LuCI / UI",
    "impact": 3,
    "summary": "demo: shift blue accents to aqua/teal (sync with router main.htm)",
    "detail": null,
    "benefit": "Customer interacts with this surface daily; every refinement compounds the experience.",
    "ref": "d1ed216987",
    "features": [
      {
        "id": 20,
        "lead": "The Helm — where you steer"
      }
    ]
  },
  {
    "id": 221,
    "date": "2026-05-05",
    "theme": "LuCI / UI",
    "impact": 3,
    "summary": "demo: sync attributes with router main.htm",
    "detail": null,
    "benefit": "Customer interacts with this surface daily; every refinement compounds the experience.",
    "ref": "f6407abd0e",
    "features": [
      {
        "id": 20,
        "lead": "The Helm — where you steer"
      }
    ]
  },
  {
    "id": 218,
    "date": "2026-05-05",
    "theme": "Filter strategies",
    "impact": 2,
    "summary": "feed: fix duplicate domains (character.ai, duckduckgo)",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "f1114ea019",
    "features": []
  },
  {
    "id": 223,
    "date": "2026-05-05",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "VPN-notes: add VPN notes file",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "0aa6cd4a55",
    "features": []
  },
  {
    "id": 228,
    "date": "2026-05-02",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "haven: remove user1's brands from Alcohol & Tobacco",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "1f3154087d",
    "features": []
  },
  {
    "id": 227,
    "date": "2026-05-02",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "haven: add Meta Corp 47-way blocking profile; update website claim",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "03f709be1d",
    "features": []
  },
  {
    "id": 235,
    "date": "2026-05-02",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "index.html: remove Mobirise branding, set phone, disable social icons",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "7039f333e7",
    "features": []
  },
  {
    "id": 231,
    "date": "2026-05-02",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "index.html: replace hero headline with Haven positioning statement",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "38ea71ec37",
    "features": []
  },
  {
    "id": 236,
    "date": "2026-05-02",
    "theme": "Filter strategies",
    "impact": 2,
    "summary": "haven website: preset modal, search fix, data updates, OTA manifest",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "2f1b1d4c2e",
    "features": []
  },
  {
    "id": 230,
    "date": "2026-05-02",
    "theme": "Marketing & website",
    "impact": 2,
    "summary": "index.html: fix contact form — remove Mobirise formoid interception",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "6d5cea8406",
    "features": []
  },
  {
    "id": 234,
    "date": "2026-05-02",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "haven-ui: filter orphaned keys from save/export",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "93b4920807",
    "features": []
  },
  {
    "id": 233,
    "date": "2026-05-02",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "index.html: fix contact form — Formspree → <operator email>",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "39ca2c2660",
    "features": []
  },
  {
    "id": 232,
    "date": "2026-05-02",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "index.html: replace Why us? placeholder copy with Haven messaging",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "3b61e4ab70",
    "features": []
  },
  {
    "id": 229,
    "date": "2026-05-02",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "haven: expand Alcohol & Tobacco to 55 items; default landing to Social Media",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "3de425a3e7",
    "features": []
  },
  {
    "id": 445,
    "date": "2026-05-01",
    "theme": "Demo page",
    "impact": 3,
    "summary": "Demo dataset: removed Coors / MillerCoors from Alcohol & Tobacco bullets",
    "detail": "Pruned the Coors / MillerCoors brand from the Alcohol & Tobacco preview list and dropped its itemUrls entry, keeping the demo dataset aligned with the curated production list.",
    "benefit": "Prospective customers see the same UI in the demo as the router ships with — no 'wait, the real thing looks different' jolt at unboxing.",
    "ref": "b24da6f226",
    "features": []
  },
  {
    "id": 444,
    "date": "2026-05-01",
    "theme": "Demo page",
    "impact": 3,
    "summary": "Demo page: Basic mode forced as default on every load",
    "detail": "Pinned hdBasicMode = true at script load — first-time visitors and returning visitors both land in Basic mode regardless of localStorage (Advanced still reachable via the toggle).",
    "benefit": "Prospective customers see the same UI in the demo as the router ships with — no 'wait, the real thing looks different' jolt at unboxing.",
    "ref": "7875b2268c",
    "features": [
      {
        "id": 22,
        "lead": "Two modes"
      }
    ]
  },
  {
    "id": 443,
    "date": "2026-05-01",
    "theme": "Demo page",
    "impact": 3,
    "summary": "Demo page: header re-flowed and itemUrls guard tightened",
    "detail": "Header text → \"Haven by Lulhaven - n of 100\". Filtered-view render now skips settings whose key is not in itemUrls (prevents a stray entry from breaking the table). Basic-mode default flipped from \"off unless localStorage says basic\" to \"on unless localStorage says advanced\".",
    "benefit": "Prospective customers see the same UI in the demo as the router ships with — no 'wait, the real thing looks different' jolt at unboxing.",
    "ref": "7045795ae4",
    "features": []
  },
  {
    "id": 237,
    "date": "2026-05-01",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "assets: add current Haven UI screenshot",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "8c58b5a098",
    "features": []
  },
  {
    "id": 440,
    "date": "2026-04-30",
    "theme": "Demo page",
    "impact": 5,
    "summary": "Demo page: stacked brand header experiment",
    "detail": "Tried splitting the title into \"Lulhaven\" + a \"Live Demo\" subscript line, with new .hd-unit-line CSS. Reverted in the next commit (less readable at small widths).",
    "benefit": "Prospective customers see the same UI in the demo as the router ships with — no 'wait, the real thing looks different' jolt at unboxing.",
    "ref": "e5293b7f78",
    "features": [
      {
        "id": 31,
        "lead": "Interactive demo at lulhaven.com/demo"
      }
    ]
  },
  {
    "id": 442,
    "date": "2026-04-30",
    "theme": "Demo page",
    "impact": 3,
    "summary": "Demo UI: presets/clear now flip the filtered view",
    "detail": "hdApplyPreset() and hdClearAll() now call hdToggleFilteredView() instead of plain hdRenderFilteredView(), so applying a preset enters the filtered-view mode automatically.",
    "benefit": "Prospective customers see the same UI in the demo as the router ships with — no 'wait, the real thing looks different' jolt at unboxing.",
    "ref": "47a9d12654",
    "features": [
      {
        "id": 16,
        "lead": "Templates for real situations"
      },
      {
        "id": 31,
        "lead": "Interactive demo at lulhaven.com/demo"
      }
    ]
  },
  {
    "id": 441,
    "date": "2026-04-30",
    "theme": "Demo page",
    "impact": 3,
    "summary": "Demo page: header reverted to single-line \"Lulhaven - Haven - n of 100\"",
    "detail": "Backed out the stacked brand experiment; single inline title reads better in the constrained demo header.",
    "benefit": "Prospective customers see the same UI in the demo as the router ships with — no 'wait, the real thing looks different' jolt at unboxing.",
    "ref": "35177cc537",
    "features": []
  },
  {
    "id": 437,
    "date": "2026-04-30",
    "theme": "Demo page",
    "impact": 3,
    "summary": "Demo page: subscription table zebra striping added",
    "detail": "Alternating row backgrounds for #hd-sub-table — translucent white on odd rows, translucent black on even rows. Visibly improves scannability of the filter list.",
    "benefit": "Prospective customers see the same UI in the demo as the router ships with — no 'wait, the real thing looks different' jolt at unboxing.",
    "ref": "9794873d4a",
    "features": []
  },
  {
    "id": 436,
    "date": "2026-04-30",
    "theme": "Demo page",
    "impact": 3,
    "summary": "Demo page: Basic/Advanced mode toggle added",
    "detail": "New Basic-mode CSS class hides advanced controls (delayed-filter, search, import/export, filter-view, badges); Basic/Advanced button + hdToggleMode() persisted via localStorage. 44 lines of new CSS + JS function + class wiring in demo.html and js/haven-ui.js.",
    "benefit": "Prospective customers see the same UI in the demo as the router ships with — no 'wait, the real thing looks different' jolt at unboxing.",
    "ref": "125b8567cc",
    "features": [
      {
        "id": 22,
        "lead": "Two modes"
      }
    ]
  },
  {
    "id": 439,
    "date": "2026-04-30",
    "theme": "Demo page",
    "impact": 2,
    "summary": "Demo page: zebra-stripe rules forced with !important",
    "detail": "Without !important the Bootstrap row-color rules were winning; added !important to the demo-table odd/even rules so the zebra survives the cascade.",
    "benefit": "Prospective customers see the same UI in the demo as the router ships with — no 'wait, the real thing looks different' jolt at unboxing.",
    "ref": "45da3de850",
    "features": []
  },
  {
    "id": 438,
    "date": "2026-04-30",
    "theme": "Demo page",
    "impact": 2,
    "summary": "Demo page: zebra-stripe opacity bumped for readability",
    "detail": "Initial stripe opacities (0.18 / 0.06) were too subtle on most monitors; bumped to 0.4 / 0.10 so the alternation actually reads.",
    "benefit": "Prospective customers see the same UI in the demo as the router ships with — no 'wait, the real thing looks different' jolt at unboxing.",
    "ref": "e8544da0d6",
    "features": []
  },
  {
    "id": 249,
    "date": "2026-04-29",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "feat: super-cats, A-Z, presets, badges + 7 Politics & Government items",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "f7de32b61b",
    "features": [
      {
        "id": 12,
        "lead": "Block what you choose"
      },
      {
        "id": 16,
        "lead": "Templates for real situations"
      }
    ]
  },
  {
    "id": 252,
    "date": "2026-04-29",
    "theme": "Demo page",
    "impact": 3,
    "summary": "refactor: split demo.html into focused JS files",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "537f81b686",
    "features": [
      {
        "id": 31,
        "lead": "Interactive demo at lulhaven.com/demo"
      }
    ]
  },
  {
    "id": 250,
    "date": "2026-04-29",
    "theme": "Demo page",
    "impact": 3,
    "summary": "haven: add Show Filtered toggle to demo",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "8647953dc8",
    "features": []
  },
  {
    "id": 256,
    "date": "2026-04-29",
    "theme": "Demo page",
    "impact": 2,
    "summary": "ui: fix corp sync — identical entities only, remove subsidiary groupings",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "cc3621b464",
    "features": []
  },
  {
    "id": 255,
    "date": "2026-04-29",
    "theme": "YouHaven anti-algorithm app",
    "impact": 1,
    "summary": "ui: rename Entertainment/Fox Corp back to Fox News, remove fox corp sync group",
    "detail": null,
    "benefit": "Adults get an exit from algorithmic feeds; Haven serves both parents AND grown-up privacy buyers.",
    "ref": "25bfc5fbd6",
    "features": []
  },
  {
    "id": 254,
    "date": "2026-04-29",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "ui: replace hardcoded corp groups with automatic name-match sync",
    "detail": null,
    "benefit": "Cleaner repos and smaller diffs — less time fighting tooling, more time shipping.",
    "ref": "eace338be2",
    "features": []
  },
  {
    "id": 253,
    "date": "2026-04-29",
    "theme": "YouHaven anti-algorithm app",
    "impact": 1,
    "summary": "haven: tooltips, AllSides/Drudge, Fox News rename, auto name-sync",
    "detail": null,
    "benefit": "Adults get an exit from algorithmic feeds; Haven serves both parents AND grown-up privacy buyers.",
    "ref": "3e547dd6c9",
    "features": []
  },
  {
    "id": 251,
    "date": "2026-04-29",
    "theme": "Process & discipline",
    "impact": 1,
    "summary": "chore: add CLAUDE.md for session context efficiency",
    "detail": null,
    "benefit": "Less waste, fewer back-and-forths, more shipped work per session.",
    "ref": "9c09e93b51",
    "features": []
  },
  {
    "id": 259,
    "date": "2026-04-28",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "feed: add The Drudge Report to Politics & Government",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "8b336c941b",
    "features": []
  },
  {
    "id": 258,
    "date": "2026-04-28",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "feed: add AllSides to Politics & Government",
    "detail": null,
    "benefit": "More of what parents and adults actually care about is blockable in one click.",
    "ref": "b2ef10ed67",
    "features": []
  },
  {
    "id": 261,
    "date": "2026-04-28",
    "theme": "Demo page",
    "impact": 3,
    "summary": "demo: clickable content links open in new tab",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "d5ba27b4ec",
    "features": []
  },
  {
    "id": 260,
    "date": "2026-04-28",
    "theme": "Demo page",
    "impact": 3,
    "summary": "demo: disable items with no filtering strategy",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "43380fcb50",
    "features": []
  },
  {
    "id": 257,
    "date": "2026-04-28",
    "theme": "Demo page",
    "impact": 3,
    "summary": "ui: corp sync — toggling one property blocks all siblings across categories",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "b173dde1a5",
    "features": []
  },
  {
    "id": 262,
    "date": "2026-04-27",
    "theme": "Build pipeline",
    "impact": 2,
    "summary": "demo: Export/Import, Filter terminology, mobile button fix; add feed.json",
    "detail": null,
    "benefit": "Edits flow source → live in one script. No copy-paste, no stale artifacts.",
    "ref": "6808a2d739",
    "features": []
  },
  {
    "id": 263,
    "date": "2026-04-26",
    "theme": "Marketing & website",
    "impact": 5,
    "summary": "Apply glassmorphism UI to Haven live demo",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "dcb847aa13",
    "features": [
      {
        "id": 20,
        "lead": "The Helm — where you steer"
      }
    ]
  },
  {
    "id": 264,
    "date": "2026-04-26",
    "theme": "Demo page",
    "impact": 3,
    "summary": "Sync demo with router: full content lists, Block/Delayed Block checkboxes, Select All",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "f9749807da",
    "features": []
  },
  {
    "id": 270,
    "date": "2026-04-25",
    "theme": "Milestones",
    "impact": 5,
    "summary": "Initial commit - lulhaven.com site files",
    "detail": null,
    "benefit": "The Haven project begins. lulhaven.com goes live as the marketing surface.",
    "ref": "8209de7ed5",
    "features": []
  },
  {
    "id": 267,
    "date": "2026-04-25",
    "theme": "Demo page",
    "impact": 5,
    "summary": "Link Live demo button to demo.html",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "f41fe3cf49",
    "features": [
      {
        "id": 31,
        "lead": "Interactive demo at lulhaven.com/demo"
      }
    ]
  },
  {
    "id": 269,
    "date": "2026-04-25",
    "theme": "Demo page",
    "impact": 3,
    "summary": "Add Haven interactive demo page",
    "detail": null,
    "benefit": "Prospective buyers can try Haven before they pay — friction down, conversion up.",
    "ref": "20a32856c7",
    "features": [
      {
        "id": 31,
        "lead": "Interactive demo at lulhaven.com/demo"
      }
    ]
  },
  {
    "id": 268,
    "date": "2026-04-25",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "Update ship date to November 25, 2026",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "460c07715a",
    "features": []
  },
  {
    "id": 266,
    "date": "2026-04-25",
    "theme": "YouHaven anti-algorithm app",
    "impact": 3,
    "summary": "Sync demo page - search, Big Business, Fox Corp, MSN, Contents",
    "detail": null,
    "benefit": "Adults get an exit from algorithmic feeds; Haven serves both parents AND grown-up privacy buyers.",
    "ref": "91947aca08",
    "features": []
  },
  {
    "id": 265,
    "date": "2026-04-25",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "Alphabetize categories and contents",
    "detail": null,
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "80f3e3f44a",
    "features": [
      {
        "id": 12,
        "lead": "Block what you choose"
      }
    ]
  }
];
