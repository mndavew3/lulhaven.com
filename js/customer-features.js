var cfDataset = [
  {
    "id": 1,
    "section": "headline",
    "lead": "Every connected device",
    "body": "Set filters once. Every phone, tablet, computer, and TV that connects gets the same protection. Nothing anyone can disable on their own device.",
    "family_rank": 1,
    "privacy_rank": 1,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>Filtering at Haven covers everything you let onto your network — anything plugged in by Ethernet, anything joining over Wi-Fi: desktops and laptops, phones and tablets, smart TVs and streaming sticks, game consoles, e-readers, even the smart speaker in the kitchen. There is no per-device app to install and nothing for anyone to disable on their own phone.</p><p>When a new device joins the network — a friend's tablet, a delivered phone, a desktop just plugged in by Ethernet, a new TV — it is filtered the same way as everything else from the moment it connects.</p>",
    "image": null,
    "milestone_ids": "20,338,460",
    "wiki_slug": "haven/whole-home-filtering",
    "benefits": [
      {
        "id": 4,
        "lead": "Covers every device you've got"
      }
    ]
  },
  {
    "id": 2,
    "section": "headline",
    "lead": "Plug in and it works",
    "body": "Comes with Haven already installed. Unbox it, plug it in, and filtering is active immediately — before any device even connects.",
    "family_rank": 2,
    "privacy_rank": 2,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>Plug in the power, connect to your modem the same way your old router did, set a Wi-Fi password — you are filtering. Haven seeks the same subnet that was in use. No flashing firmware, no following a YouTube tutorial, no command-line, no DNS settings to change on every device you own.</p><p>The filtering runs at Haven itself, ahead of any device. So filtering is in effect from the very first connection, before a single phone touches the network.</p>",
    "image": null,
    "milestone_ids": "69,114,117,340,378,379,383,417,467,522",
    "wiki_slug": "haven/pre-flashed-router",
    "benefits": [
      {
        "id": 7,
        "lead": "Plug in, set a password, finished"
      }
    ]
  },
  {
    "id": 3,
    "section": "headline",
    "lead": "Cancel your subscription, keep your filter",
    "body": "Stop paying, and the filter still works. We just stop sending you updates to the content list.",
    "family_rank": 3,
    "privacy_rank": 3,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>The monthly subscription pays for category and provider list updates — new sites get added, new bypass tricks get countered, every week. Cancel it and the filter keeps working with whatever the most recent list update was. Nothing locks. Nothing degrades. Haven is yours.</p><p>If you decide to come back later, restart the subscription and the next weekly update slots in automatically.</p>",
    "image": null,
    "milestone_ids": null,
    "wiki_slug": "haven/cancel-anytime",
    "benefits": [
      {
        "id": 5,
        "lead": "No vendor lock-in"
      }
    ]
  },
  {
    "id": 4,
    "section": "headline",
    "lead": "We're built so we can't see what you're doing",
    "body": "By structure, not by promise. We literally cannot access your filter settings, device list, or blocked requests even if we wanted to.",
    "family_rank": 4,
    "privacy_rank": 4,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>Haven was built with a hard architectural rule: the company that makes Haven cannot read what flows through it. Haven never uploads what you do, what you block, who is on your network, or how you configured it. The only outbound conversation is a once-a-day check for new category lists — and that request does not include your settings, your device list, or your activity.</p><p>If you opt in to encrypted cloud backup, the encryption happens on your Haven with a key your Haven holds. Haven Inc. stores the encrypted blob; Haven Inc. cannot decrypt it. Math, not a promise.</p>",
    "image": null,
    "milestone_ids": "112",
    "wiki_slug": "haven/haven-inc-cannot-read-data",
    "benefits": [
      {
        "id": 2,
        "lead": "Real privacy, not promised privacy"
      }
    ]
  },
  {
    "id": 5,
    "section": "main",
    "lead": "Everything stays local",
    "body": "Your filter preferences, device list, activity log — nothing leaves your Haven. It all stays with you.",
    "family_rank": 20,
    "privacy_rank": 1,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>Every choice you make in the Haven Helm is stored on Haven itself, in a partition designed to survive a factory reset. Filter prefs, device list, the timestamped activity log — none of it ever leaves your network.</p><p>The routing software talks to Haven Inc. exactly once per day, for one reason: to check whether the category lists have been updated. That request does not include who you are, what is on your network, or what got blocked. Haven Inc. cannot read your traffic because Haven Inc. is not in your traffic.</p>",
    "image": null,
    "milestone_ids": "112",
    "wiki_slug": "haven/data-stays-on-router",
    "benefits": [
      {
        "id": 2,
        "lead": "Real privacy, not promised privacy"
      }
    ]
  },
  {
    "id": 6,
    "section": "main",
    "lead": "We can't see what you're browsing",
    "body": "The system is built so that even if someone breached our servers, your internet activity isn't there to read — Haven never sends it off your network.",
    "family_rank": 21,
    "privacy_rank": 2,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>This is intentional and structural, not aspirational. Haven examines metadata — the names of sites being requested, the categories they belong to — and decides allow or block at that level. It does not buffer page contents, does not capture browsing history, does not assemble a profile of who browses what.</p><p>The decision to design Haven this way locked in early. Every later choice — where settings live, how subscriptions work, how cloud backup is encrypted — flows from the rule that Haven Inc. does not get to see your traffic.</p>",
    "image": null,
    "milestone_ids": "40,112",
    "wiki_slug": "haven/haven-cannot-read-traffic",
    "benefits": [
      {
        "id": 2,
        "lead": "Real privacy, not promised privacy"
      }
    ]
  },
  {
    "id": 7,
    "section": "coming_soon",
    "lead": "Optional encrypted cloud backup",
    "body": "even Haven cannot decrypt it (math, not promises)",
    "family_rank": 22,
    "privacy_rank": 3,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>If you want a safety net for your settings — protection against your Haven failing, a fire, a move — turn on encrypted cloud backup. Haven encrypts a copy of your settings and activity log with a key that never leaves Haven itself, then ships the encrypted blob up to Haven Inc. We store it. We cannot decrypt it.</p><p>To restore: print or save your recovery phrase from the Helm. That phrase is the only thing that can unlock the backup. Lose the phrase, lose the backup — and that is the point. If we could unlock it for you, so could anyone else with the right court order.</p>",
    "image": null,
    "milestone_ids": "112",
    "wiki_slug": null,
    "benefits": [
      {
        "id": 2,
        "lead": "Real privacy, not promised privacy"
      }
    ]
  },
  {
    "id": 8,
    "section": "main",
    "lead": "Better YouTube for you",
    "body": "U-Haven (Android companion app) hides YouTube channels you don't want to see and stops YouTube from recommending things you never asked for.",
    "family_rank": 23,
    "privacy_rank": 4,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>YouTube decides what to recommend to you, whether you watch on your phone, your tablet, a smart TV, or in a browser on your computer. U-Haven is a companion Android app that puts that decision back in your hands. Tell it the channels you have decided you do not want to see, and it hides them. From the home feed, from recommendations, from the sidebar.</p><p>This pairs with the router-level filtering — U-Haven shapes what the YouTube apps you do allow show you, while Haven blocks the apps you decided to not have at all.</p>",
    "image": null,
    "milestone_ids": "127,290,449",
    "wiki_slug": "haven/youhaven-quiet-the-feed",
    "benefits": [
      {
        "id": 10,
        "lead": "Your choices, not algorithmic ones"
      }
    ]
  },
  {
    "id": 9,
    "section": "main",
    "lead": "Cancel your subscription, keep your filter",
    "body": "Stop paying, and the filter still works. We just stop sending you updates to the content list.",
    "family_rank": 24,
    "privacy_rank": 5,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>No lock-in. Haven is yours; the filter on it is yours. The monthly subscription pays for ongoing list updates and improvements — the moment you cancel, those stop, but the filter keeps doing what it was doing.</p><p>This matters specifically because trust in subscription services has been eroded by years of companies that hold features hostage when payment stops. Haven does not.</p>",
    "image": null,
    "milestone_ids": null,
    "wiki_slug": "haven/cancel-anytime",
    "benefits": [
      {
        "id": 5,
        "lead": "No vendor lock-in"
      }
    ]
  },
  {
    "id": 10,
    "section": "main",
    "lead": "Your settings survive a restart",
    "body": "Even if Haven is reset to factory defaults, your settings come back automatically.",
    "family_rank": 25,
    "privacy_rank": 6,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>Your settings live in a partition of Haven that the normal factory reset does not touch. Press and hold the reset button, watch the lights blink, Haven comes back up — with the same filter preferences, the same device list, the same admin accounts.</p><p>This is on purpose. Reset buttons are reachable. We do not want the difference between filtered and unfiltered to be ten seconds with a paperclip.</p>",
    "image": null,
    "milestone_ids": "112,366",
    "wiki_slug": "haven/survives-factory-reset",
    "benefits": [
      {
        "id": 5,
        "lead": "No vendor lock-in"
      },
      {
        "id": 8,
        "lead": "Survives the real-world stress test"
      }
    ]
  },
  {
    "id": 12,
    "section": "main",
    "lead": "Block what you choose",
    "body": "Pick from 9 sections — or go more specific with 49 categories. That's 613 content providers total you can control one by one, by category, or by section. One click per content provider.",
    "family_rank": 2,
    "privacy_rank": 31,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>Categories are broad buckets — Adult Content, Gambling, Mobile Game Ads, Trackers, Social Media, Misinformation, Violence, and around two dozen more. Toggle a category on and every site in it is blocked across every device on the premises.</p><p>Inside each category there are 150+ named content providers. So instead of \"block all social media,\" you can block specific platforms; instead of \"block all gambling,\" you can block the specific gambling brands that show up in your YouTube ads. Toggle the bucket, or open it and pick individual items. One click either way.</p>",
    "image": null,
    "milestone_ids": "20,249,265,351",
    "wiki_slug": "haven/block-what-you-choose",
    "benefits": []
  },
  {
    "id": 13,
    "section": "main",
    "lead": "Zero tolerance for bypass",
    "body": "We've closed the loopholes that other filters miss — VPNs, hidden DNS tricks, app workarounds. Your filter actually works.",
    "family_rank": 3,
    "privacy_rank": 5,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>Old content filters break when their bypasses become well known — and over time, every bypass becomes well known. The workarounds that circulate online — encrypted DNS, VPN apps, Private Relay, browser-built-in DoH, manual DNS changes — do not work against content Haven is actively filtering.</p><p>What gets closed off:</p><ul><li><strong>Encrypted DNS (DoH).</strong> Apps and browsers that try to look up sites through Cloudflare, Google, Quad9, etc. are routed back through Haven.</li><li><strong>Apple Private Relay.</strong> The iCloud+ feature that hides browsing from the network is shut down — Haven sees and filters anyway.</li><li><strong>VPN apps.</strong> Consumer VPN apps that pretend to be other traffic are detected and blocked from establishing tunnels.</li><li><strong>Manual DNS changes.</strong> Setting \"Cloudflare DNS\" or \"Google DNS\" in a device's network settings does nothing to reach content Haven is actively filtering — Haven catches those too.</li><li><strong>Browser-built-in encrypted lookups.</strong> DNS-over-HTTPS shipped inside Chrome, Firefox, and Edge — built in to dodge local filters automatically — is intercepted before it leaves your network. Same for any app that ships its own encrypted-lookup library.</li></ul><p><strong>Even a changed device stays covered.</strong> No device slips through unfiltered just by changing its network address — set your default protection to a level you&rsquo;re comfortable with, and every device on your network, even a brand-new or changed one, is covered by at least that.</p><p>This is the difference between \"we have a blocklist\" and \"the blocklist actually holds.\"</p>",
    "image": null,
    "milestone_ids": "19,20,67,132,338,367",
    "wiki_slug": "haven/bypass-resistant",
    "benefits": [
      {
        "id": 3,
        "lead": "The bypasses don't bypass this"
      },
      {
        "id": 8,
        "lead": "Survives the real-world stress test"
      }
    ]
  },
  {
    "id": 14,
    "section": "main",
    "lead": "Filter works on the go too",
    "body": "When a device leaves your network — on cellular, at school, at a friend's place — your filter accompanies them (requires quick setup on their device).",
    "family_rank": 4,
    "privacy_rank": 33,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>Haven keeps filtering a device after it leaves your network, in two ways &mdash; you pick the one that fits each device:</p><p><strong>Lightweight (recommended).</strong> The device gets a small <em>Private DNS</em> setting that points at Haven. Its name lookups travel over an encrypted WireGuard tunnel to <em>your own Haven router</em>, which does the filtering exactly as it does on your own network &mdash; ask for a blocked site on cellular and the block still lands. No VPN icon, no battery drain, no app traffic re-routed. Setup is a one-time Private DNS entry; scan the QR on the router&rsquo;s Helm screen and you&rsquo;re finished.</p><p><strong>Full protection (Pro tier).</strong> The phone connects to your router as a private VPN, so every app and connection runs through Haven&rsquo;s filter. The trade-off: a VPN icon in the status bar, slightly more battery, and a few VPN-shy apps may complain.</p><p>Both work where ordinary consumer VPNs cannot &mdash; including mobile carriers and ISPs that share one public address across many customers (carrier-grade NAT). Haven runs the relay itself; it never sees your traffic in the clear.</p>",
    "image": null,
    "milestone_ids": "38,40,71,81,82,123,133,367",
    "wiki_slug": "haven/off-network-filtering",
    "benefits": [
      {
        "id": 4,
        "lead": "Covers every device you've got"
      }
    ]
  },
  {
    "id": 15,
    "section": "main",
    "lead": "Multi-administrator",
    "body": "Mom, Dad, named additions; all admins are equal",
    "family_rank": 5,
    "privacy_rank": 34,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>The Haven Helm supports any number of administrator accounts, each with a name. There is no \"primary admin\" / \"secondary admin\" hierarchy — Mom, Dad, a grandparent, an older sibling who has been brought in: all administrators see the same screens, can make the same changes, and share the same view of the whole network.</p><p>Every change is timestamped against the admin who made it, so when somebody asks \"who turned X back on last Tuesday,\" the answer is in the history. Running a network is not a solo operation; Haven is built that way.</p>",
    "image": null,
    "milestone_ids": "137,157,281,360,447",
    "wiki_slug": "haven/multi-administrator",
    "benefits": [
      {
        "id": 1,
        "lead": "Stop being the internet police"
      },
      {
        "id": 9,
        "lead": "Shared control, no master account"
      }
    ]
  },
  {
    "id": 16,
    "section": "main",
    "lead": "Templates for real situations",
    "body": "Parenting (child-safe defaults) · Senior (scam and clickbait protection) · School (homework focus) · Workplace (distraction control) · Recovery (support staying away from chosen triggers)",
    "family_rank": 6,
    "privacy_rank": 35,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>Templates are starting points, not lock-ins. Each one flips a thoughtful set of category toggles in a single click — useful when you do not feel like reading every bullet from scratch.</p><ul><li><strong>Parenting.</strong> Adult content, gambling, mobile game ads, misinformation off by default. Social media on a delayed-allow schedule.</li><li><strong>Senior.</strong> Scam sites, crypto pump-and-dump, fake-virus pop-ups, fake invoices, \"your computer is infected\" pages — all turned off. Built around the kinds of attacks that target older adults specifically.</li><li><strong>School.</strong> Homework-time pass that blocks games and social during a configurable window, then opens back up.</li></ul><p>Apply a template, then refine. Anything a template turned on, you can turn back off individually.</p>",
    "image": null,
    "milestone_ids": "4,192,193,249,442",
    "wiki_slug": "haven/templates",
    "benefits": [
      {
        "id": 1,
        "lead": "Stop being the internet police"
      }
    ]
  },
  {
    "id": 17,
    "section": "coming_soon",
    "lead": "New devices appear automatically",
    "body": "see every new device the moment it joins your network",
    "family_rank": 7,
    "privacy_rank": 36,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>Every time a device joins your network that Haven has never seen before — over Wi-Fi or plugged in by Ethernet — it appears in the device list on the Helm. It is named the way the device named itself (\"Sarah's iPhone,\" \"Dad-Desktop,\" \"Roku Ultra,\" \"Pixel-7\"), with the time it joined, and you mark it known in one click.</p><p>This matters when a guest brings a tablet over, when a new computer gets plugged in for the first time, when a delivery driver's hotspot lingers on your network, when a new smart-home gadget you forgot you ordered finally arrives, or — occasionally — when something is connecting that nobody on-site can identify.</p>",
    "image": null,
    "milestone_ids": "139,279,363,365",
    "wiki_slug": null,
    "benefits": [
      {
        "id": 9,
        "lead": "Shared control, no master account"
      }
    ]
  },
  {
    "id": 18,
    "section": "main",
    "lead": "Updated daily",
    "body": "new sites, new tricks, automatically",
    "family_rank": 8,
    "privacy_rank": 37,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>Every day, Haven pulls down a fresh set of category and provider lists (adult-content lists specifically refresh weekly). New gambling fronts, freshly registered scam domains, copy-cat social platforms, new ad networks running mobile game spam — they all land in the lists before they show up in your local environment.</p><p>Bypass tactics get the same treatment. When a new encrypted-DNS provider goes mainstream, when a browser ships a new way of looking up sites that tries to dodge network filters, the next daily update closes that route. You do not need to do anything; Haven just keeps getting better at the job.</p>",
    "image": null,
    "milestone_ids": "39,43,198,352",
    "wiki_slug": "haven/updated-weekly",
    "benefits": [
      {
        "id": 3,
        "lead": "The bypasses don't bypass this"
      }
    ]
  },
  {
    "id": 19,
    "section": "main",
    "lead": "Adult content: off until you choose it",
    "body": "one category among many — nothing's blocked by default",
    "family_rank": 9,
    "privacy_rank": 38,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>Haven ships filtering nothing, adult content included — it's one category among roughly fifty, off by default. An administrator switches it on in the Helm, directly or via a template that lists it.</p><p>When it's on, Haven layers extra protection on that one category: a dedicated adult-site blocklist plus family-safe upstream DNS. Until then, nothing about adult content is touched.</p>",
    "image": null,
    "milestone_ids": "172,203,213,220",
    "wiki_slug": "haven/adult-content-off-by-default",
    "benefits": [
      {
        "id": 10,
        "lead": "Your choices, not algorithmic ones"
      }
    ]
  },
  {
    "id": 20,
    "section": "how_it_works",
    "lead": "The Helm — where you steer",
    "body": "web-based; reach it from any device on your network at haven.lan",
    "family_rank": 1,
    "privacy_rank": 1,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>The Haven Helm is the steering wheel — a web page you reach by typing <code>haven.lan</code> in a browser on any device connected to your network. Desktop, laptop, phone, tablet, even a Kindle. No app install, no account login the first time, no QR code dance.</p><p>From the Helm: change category toggles, see what was blocked, manage admin accounts, mark devices known, set up scheduled filters, restore from backup. Every filtering choice there is to make lives here.</p>",
    "image": null,
    "milestone_ids": "105,221,222,263,407,411",
    "wiki_slug": "haven/the-helm",
    "benefits": []
  },
  {
    "id": 21,
    "section": "how_it_works",
    "lead": "Search across categories and providers",
    "body": null,
    "family_rank": 2,
    "privacy_rank": 2,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>The Helm has a search bar at the top. Type a few letters of any category or provider name and it filters the page in real time. \"Discord\" returns Discord's row and the category it belongs to. \"Casino\" returns every named gambling provider plus the parent category. \"Mobile\" returns the Mobile Game Ads category and every advertiser in it.</p><p>Useful when you suspect a specific site is the problem and want to confirm Haven knows about it, or when a friend mentions a platform you have not heard of and you want to see whether Haven already handles it.</p>",
    "image": null,
    "milestone_ids": "86",
    "wiki_slug": "haven/search-categories",
    "benefits": []
  },
  {
    "id": 22,
    "section": "how_it_works",
    "lead": "Two modes",
    "body": "Simple mode for everyday use, Advanced when you want to tinker",
    "family_rank": 3,
    "privacy_rank": 3,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>Simple mode is the default. It shows the category toggles, the active template, the alerts page, the always-allow list, and the activity feed. That is enough for most networks on most days.</p><p>Advanced mode unlocks per-provider tuning, scheduled filters (homework hours, bedtime, weekends), the detailed admin audit log, custom always-block additions, and the router-level diagnostics. The toggle is in the corner of the Helm; flip back to Simple whenever you do not feel like seeing all of it.</p>",
    "image": null,
    "milestone_ids": "86,177,425,436,444",
    "wiki_slug": "haven/simple-advanced-modes",
    "benefits": []
  },
  {
    "id": 23,
    "section": "how_it_works",
    "lead": "Activity log",
    "body": "see what is being blocked",
    "family_rank": 4,
    "privacy_rank": 4,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>Every block is logged with a timestamp, the device that tried, the destination it was trying to reach, and the category or provider rule that caught it. Scroll the timeline to see what is happening on your network — or filter by device to see what a specific computer, phone, tablet, or smart TV has been bumping into.</p><p>What the log does not show: any traffic that was allowed through. Haven only records the blocks. The pages your people successfully visit are their business, not Haven's audit trail.</p>",
    "image": null,
    "milestone_ids": null,
    "wiki_slug": "haven/activity-log",
    "benefits": [
      {
        "id": 1,
        "lead": "Stop being the internet police"
      },
      {
        "id": 9,
        "lead": "Shared control, no master account"
      }
    ]
  },
  {
    "id": 24,
    "section": "how_it_works",
    "lead": "Always-allow list",
    "body": "sites you mark are never blocked, no matter the category",
    "family_rank": 5,
    "privacy_rank": 5,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>Some sites should never be blocked, even if the category they belong to is. School portals that happen to be in social-media-adjacent buckets. A grandparent's tiny blog hosted on a free service the rest of which is full of garbage. A specific subreddit someone uses for research. Add the address to the always-allow list and Haven never blocks it, regardless of what category it would otherwise be in.</p><p>Only administrators can add to the list, and every addition is logged in the admin history so everyone knows what got allowed and when.</p>",
    "image": null,
    "milestone_ids": "212",
    "wiki_slug": "haven/always-allow-list",
    "benefits": [
      {
        "id": 1,
        "lead": "Stop being the internet police"
      }
    ]
  },
  {
    "id": 25,
    "section": "how_it_works",
    "lead": "Per-provider settings",
    "body": "tune anything individually",
    "family_rank": 6,
    "privacy_rank": 6,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>Categories are buckets, but inside each bucket every named provider is its own toggle. So you can block all gambling sites except the one your spouse uses for the office football pool. Block all social media except a niche platform your teen actually uses constructively. Allow all news but block specific outlets you have decided are not news.</p><p>Nobody is stuck with \"all\" or \"none\" on any category. Open it, scan the provider list, click the ones that fit.</p>",
    "image": null,
    "milestone_ids": null,
    "wiki_slug": "haven/per-provider-settings",
    "benefits": []
  },
  {
    "id": 26,
    "section": "how_it_works",
    "lead": "Plug in, set a password, you are filtering",
    "body": "detects your existing network and avoids conflicts",
    "family_rank": 7,
    "privacy_rank": 7,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>You do not have to choose between \"replace my ISP router\" and \"set up a complicated double-NAT.\" Plug Haven in, give it a Wi-Fi password, and it figures out what kind of network it sees on the other side. If the cable goes to a real modem, Haven runs as your main router. If it goes to an ISP router that is already handing out addresses, Haven runs in transparent mode and filters everything coming through it without fighting the upstream.</p><p>The most common silent killer of consumer routers — IP-address conflicts — does not happen here. Haven detects them and adjusts before there is a problem.</p>",
    "image": null,
    "milestone_ids": "69,117,340,379,417,467,522",
    "wiki_slug": "haven/plug-in-and-filter",
    "benefits": [
      {
        "id": 7,
        "lead": "Plug in, set a password, finished"
      }
    ]
  },
  {
    "id": 27,
    "section": "how_it_works",
    "lead": "Everything your old router did, Haven does too",
    "body": "Haven adds, never subtracts",
    "family_rank": 8,
    "privacy_rank": 8,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>Haven is built on top of OpenWrt, the mainstream open-source router platform. Everything you would expect from a real router is here: port forwarding, guest networks, DHCP reservations, traffic shaping, VPN client and server, dynamic DNS, QoS, the works. The original OpenWrt admin pages are reachable from a menu in the Helm for anyone who wants them.</p><p>Haven adds filtering, the Helm, the subscription, the alerts — but it never removes anything the router could do otherwise. If you bring power-user expectations to it, they will all be met.</p>",
    "image": null,
    "milestone_ids": null,
    "wiki_slug": "haven/full-router-functionality",
    "benefits": [
      {
        "id": 5,
        "lead": "No vendor lock-in"
      }
    ]
  },
  {
    "id": 28,
    "section": "how_it_works",
    "lead": "A low monthly fee for category updates",
    "body": "below the typical $70–$100/year competitor range",
    "family_rank": 9,
    "privacy_rank": 9,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>The subscription pays for: weekly category and provider list updates, the underlying research that adds new sites and new bypass tactics to those lists, the cloud-side infrastructure that delivers updates, and one off-network device on the lightweight mobile filtering tier.</p><p>For comparison, consumer content-filter products on the market sit between $70 and $100 per year for similar baseline coverage, frequently with paywalls in front of basic features. Haven keeps the basics in the base price and clearly names the few optional add-ons (encrypted cloud backup, Pro-tier off-network filtering) for those who want them.</p>",
    "image": null,
    "milestone_ids": "39,80,85",
    "wiki_slug": "haven/pricing",
    "benefits": [
      {
        "id": 6,
        "lead": "Genuinely affordable"
      }
    ]
  },
  {
    "id": 29,
    "section": "how_it_works",
    "lead": "Haven Navy",
    "body": "Wi-Fi 6, dual 2.5GbE, our primary recommendation",
    "family_rank": 10,
    "privacy_rank": 10,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>Haven Navy is built on the GL.iNet MT6000. Wi-Fi 6 dual-band, four 2.5GbE LAN ports plus a 2.5GbE WAN, USB 3 for storage, generous RAM and CPU headroom for heavy filtering across many devices. If you have a multi-gigabit internet plan or a local environment full of streaming, gaming, and smart-home traffic, Navy is the right choice.</p><p>This is our primary recommendation. The hardware leaves room for Haven to grow into features that the entry-level model would have to throttle.</p>",
    "image": "haven-navy-gnome.png",
    "milestone_ids": "2,77,100,133,329,413,422,426",
    "wiki_slug": "haven/haven-navy",
    "benefits": []
  },
  {
    "id": 30,
    "section": "how_it_works",
    "lead": "Haven Olive Green",
    "body": "Wi-Fi 6, secondary",
    "family_rank": 11,
    "privacy_rank": 11,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>Haven Olive Green is built on the Linksys E8450 — a well-supported, widely deployed Wi-Fi 6 router that has been a community favorite on OpenWrt for years. Dual-band Wi-Fi 6 (AX3200), four gigabit LAN ports, USB 3. For most setups this is more than enough.</p><p>Pick Olive Green if you want the Haven experience at the lower price point, or if your network has gigabit-class internet rather than multi-gig. The filtering is identical to Navy; the difference is in network capacity at peak load.</p>",
    "image": "haven-olive-gnome.png",
    "milestone_ids": "70,83,100,105,329,413,422,454",
    "wiki_slug": "haven/haven-olive-green",
    "benefits": []
  },
  {
    "id": 31,
    "section": "how_it_works",
    "lead": "Interactive demo at lulhaven.com/demo",
    "body": "no signup",
    "family_rank": 12,
    "privacy_rank": 12,
    "family_lead": null,
    "privacy_lead": null,
    "link": "https://lulhaven.com/demo",
    "details": "<p>Visit <a href=\"demo.html\">lulhaven.com/demo</a> to use a working copy of the Haven Helm in your browser. The categories are real, the toggles work, the activity log fills in as you click. Decide whether the interface feels right before you spend a cent.</p><p>No signup, no email capture, no \"free trial\" with a credit card. Everything you do in the demo resets when you close the tab, so feel free to make a mess.</p>",
    "image": null,
    "milestone_ids": "86,252,267,269,440,442",
    "wiki_slug": "haven/interactive-demo",
    "benefits": []
  },
  {
    "id": 32,
    "section": "what_we_dont",
    "lead": "We block at the network level",
    "body": "we can stop you reaching bad sites but never read what you do on the good ones",
    "family_rank": 1,
    "privacy_rank": 1,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>Network-level filtering means Haven sees the names of sites being asked for and decides allow or block at that level. It does not buffer page contents, transcribe what people type, or capture screenshots of what they viewed on sites that did get through.</p><p>This trade-off is on purpose. Filters that work at the page-content level have to read everything to make their decisions — and once a thing is being read by a piece of software, it can be logged, transmitted, leaked, subpoenaed, or sold. Haven made the architectural choice that \"we can stop you from reaching it\" is more important than \"we can tell you what was on it once you got there.\" The good sites stay private.</p>",
    "image": null,
    "milestone_ids": "20,338",
    "wiki_slug": "haven/whole-home-filtering",
    "benefits": []
  },
  {
    "id": 33,
    "section": "coming_soon",
    "lead": "Per-device profiles",
    "body": "different rules for different devices on your network",
    "family_rank": 1,
    "privacy_rank": 1,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>Today, every device on the network sees the same rules. That is the right default — it covers the whole local environment uniformly without anyone having to think about which phone is which. Coming soon: the option to attach specific category rules to specific devices, so one person's phone can be on stricter rules than the shared TV.</p><p>We held this feature back deliberately. Device identification has to be reliable before per-device rules can be safe — otherwise the wrong rules end up on the wrong device. The new-device alerts and device-naming work in the Helm are the foundation that makes per-device profiles trustworthy.</p>",
    "image": null,
    "milestone_ids": "135,283,284,460,461,462",
    "wiki_slug": null,
    "benefits": []
  },
  {
    "id": 34,
    "section": "coming_soon",
    "lead": "Emergency-unblock button",
    "body": "15-minute pass on every block page, parent notified; always-allowed list for poison control / Red Cross / Mayo",
    "family_rank": 2,
    "privacy_rank": 2,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>Block pages will carry an \"Unblock for 15 minutes\" button. Tapping it opens a brief justification field and unblocks the specific destination for a quarter hour. The temporary unblock is shown in the Helm for every administrator to see, so everyone involved can have a calm conversation about it later.</p><p>Independent of the unblock button, certain destinations are always allowed and cannot be blocked by anything: poison control, suicide and crisis hotlines, 911-adjacent services, the IRS, Social Security. The filter never gets in the way of someone reaching help.</p>",
    "image": null,
    "milestone_ids": "134,285",
    "wiki_slug": null,
    "benefits": []
  },
  {
    "id": 35,
    "section": "coming_soon",
    "lead": "Family dashboard at family.lulhaven.com",
    "body": null,
    "family_rank": 3,
    "privacy_rank": 3,
    "family_lead": null,
    "privacy_lead": null,
    "link": null,
    "details": "<p>The Helm runs on Haven and is reachable from inside your network. The Family Dashboard at <strong>family.lulhaven.com</strong> is the companion for when you're away. Multiple Havens tied to one family account, alerts and a weekly summary consolidated, a \"what got blocked\" view that you can check from work or from a parent helping with a grandparent's Haven.</p><p>It does not replace the Helm. It does not change router settings remotely. It is a read-and-summarize view designed so that conversation can happen with the data in front of everyone, not just the person standing in the closet next to the router.</p>",
    "image": null,
    "milestone_ids": null,
    "wiki_slug": null,
    "benefits": []
  },
  {
    "id": 36,
    "section": "main",
    "lead": "Live status on a $40 screen",
    "body": "Add a 3.5-inch display and a small USB hub — about $40 — and Haven shows live bandwidth, system health and every connected device on the unit itself. Free, open source, no app or website needed.",
    "family_rank": 7,
    "privacy_rank": 39,
    "family_lead": null,
    "privacy_lead": null,
    "link": "https://lulhaven.com/screen-haven",
    "details": "<p>Screen Haven is a free, open status display that runs on the Haven unit itself. It cycles through six screens &mdash; live download and upload rates on auto-ranging graphs, CPU load, memory and temperature, WAN and LAN status with per-port link lights, every connected device with a live reachability dot, and a quiet clock.</p><p><strong>Press the mouse wheel and it saves a screenshot.</strong> Whatever is on the panel is written as a clean 480&times;320 PNG &mdash; no camera, no glare, no phone held at an angle. Each capture is saved twice: onto the unit, where any admin can view and download it from the Helm, and straight onto a USB stick if one is plugged in.</p><p>The hardware is about $40 &mdash; the 3.5-inch screen and a small USB hub, because a single USB port has to carry both the screen and a mouse. Any USB or wireless mouse will do. Screen Haven is open source under the MIT license and reads only your own network&rsquo;s state; nothing it displays leaves the unit.</p>",
    "image": null,
    "milestone_ids": null,
    "wiki_slug": "haven/screen-haven",
    "benefits": [
      {
        "id": 22,
        "lead": "See it at a glance — and capture it"
      }
    ]
  }
];
