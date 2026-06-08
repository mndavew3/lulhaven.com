#!/usr/bin/env python3
"""
Seed Haven-namespace wiki pages into D1 (haven-wiki).
Run: python3 wiki_pages_seed.py
Applies via: wrangler d1 execute haven-wiki --remote --file /tmp/wiki_seed.sql
"""
import subprocess, sys, os, textwrap
from datetime import datetime

NOW = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")

# ---------------------------------------------------------------------------
# Page definitions — (slug, title, body_markdown)
# ---------------------------------------------------------------------------
PAGES = []

def page(slug, title, body):
    PAGES.append((slug, title, textwrap.dedent(body).strip()))

# ── Whole-home filtering ────────────────────────────────────────────────────
page("haven/whole-home-filtering", "Whole-home filtering", """
## What it is

Haven filters internet traffic at the **router level**, which means every device that connects to your Wi-Fi or Ethernet is covered automatically. Computers, phones, tablets, smart TVs, game consoles, IoT devices — if it goes through your router, Haven applies your filter rules to it.

No app installation is required on any device. The filter is in the network, not on the device.

## How it works

Haven filters at the DNS layer on the router. When any device looks up a domain name, Haven checks it against the blocklist for the categories you have enabled. If the domain is blocked, the lookup does not resolve to the real site and the connection fails. If it is allowed, it resolves normally.

This approach works regardless of:
- The device's operating system
- Whether the device has been jailbroken or rooted
- What browser or app is making the request

## How to demonstrate

1. Connect any device to your Haven network.
2. Open the Haven Helm at **http://haven.lan** → navigate to Categories.
3. Enable a test category (e.g. "Social Media").
4. On the connected device, open a browser and try visiting a social media site.
5. The site will fail to load. Disable the category and it loads again.

A live interactive simulation is available at **lulhaven.com/demo** — no router required.

## Limitations

- Haven filters by domain **and** blocks known bypass infrastructure by IP address. Reaching a blocked site by its raw IP alone almost never works on the modern web — sites share rotating addresses that route by name, not by IP — and **SNI-based filtering** (coming) closes even that edge by matching the destination name carried inside the connection itself.
- Devices on separate VLANs or connected directly via Ethernet to a downstream switch (not through Haven) are not filtered.
- See [Bypass-resistant](/wiki/?view=page&p=haven/bypass-resistant) for the full picture.
""")

# ── Pre-flashed router ──────────────────────────────────────────────────────
page("haven/pre-flashed-router", "Pre-flashed router", """
## What it is

Every Haven router ships with Haven firmware already installed. You do not need to download, flash, or configure firmware. Plug it in where your old router was and filtering begins immediately.

## What "pre-flashed" means

Haven runs on **OpenWrt 24.10.4**, an open-source Linux-based router operating system, with Haven's LuCI application baked directly into the firmware image. The image includes:

- The Haven Helm (web UI) at `haven.lan`
- Haven's content filtering engine, pre-configured
- Bypass-resistance protections, active out of the box
- The current Haven category database
- Optional off-network filtering
- All required packages — nothing to install

## How to demonstrate

1. Unbox the router.
2. Connect its WAN port to your modem or ISP gateway (the same cable your old router used).
3. Connect a device to Haven's Wi-Fi (SSID is on the label) or a LAN port.
4. Open a browser and go to **http://haven.lan**.
5. The Haven Helm login page appears. Set your admin password.
6. Filtering is active. No further setup required.

## Hardware

| Model | Chip | Wi-Fi | Ports |
|---|---|---|---|
| Haven Navy (GL-MT6000) | MediaTek Filogic 880 | Wi-Fi 6 (802.11ax) | 2× 2.5GbE |
| Haven OD (Linksys E8450) | MediaTek MT7622 | Wi-Fi 6 (802.11ax) | 4× 1GbE |

See [Haven Navy](/wiki/?view=page&p=haven/haven-navy) and [Haven OD](/wiki/?view=page&p=haven/haven-od) for full specs.
""")

# ── Privacy — data on router ────────────────────────────────────────────────
page("haven/data-stays-on-router", "Your data stays on your router", """
## What it is

Your filter preferences, device list, and activity log are stored exclusively on your Haven router — not on Haven's servers, not in the cloud.

## Where data lives

Haven stores two kinds of data on the router itself:

| Data | Contents |
|---|---|
| Your settings | Device list, filter category settings, templates, schedules, always-allow list, activity log |
| The blocklist | Category data that Haven downloads during updates |

Neither is transmitted off the router. When Haven checks for updates, it sends only your router's serial number and the timestamp of your last update — the minimum needed to send you the changes since then.

## How to demonstrate

1. Open the Haven Helm → **Activity Log**.
2. Browse to a few websites on a connected device.
3. The activity log updates in real time — entries appear only in the Helm on your local network.
4. Disconnect the router from the internet entirely. The Helm and its data remain fully accessible on the local network.

## Technical detail

Your settings survive a factory reset. See [Survives a factory reset](/wiki/?view=page&p=haven/survives-factory-reset) for more. Haven's servers store only: serial, subscription token, and the last-sync timestamp. No browsing data, no device names, no logs are ever transmitted.
""")

# ── Privacy — Haven cannot read traffic ────────────────────────────────────
page("haven/haven-cannot-read-traffic", "Haven cannot read your traffic", """
## What it is

Haven filters by **domain name**, not by inspecting the content of your traffic. Haven sees which domain a device is trying to reach — it does not see what you send or receive.

## How this works technically

DNS filtering works by intercepting domain name lookups. When your device asks "what is the IP address of example.com?", Haven intercepts that question and either answers normally (allowed) or returns a sinkhole address (blocked). Haven never sees the HTTP/HTTPS request body, the page content, or any data exchanged after the connection is made.

This is structurally different from:
- **SSL inspection proxies** — which decrypt and re-encrypt your HTTPS traffic (Haven does not do this)
- **Deep packet inspection** — which reads traffic content (Haven does not do this)
- **DNS-over-HTTPS logging services** — which log your DNS queries to a third-party server (Haven's DNS runs locally on the router)

## What Haven does see (locally, on your router)

- Which domains were requested, by which device, at what time (the activity log)
- Whether a request was allowed or blocked

This data stays on your router. See [Your data stays on your router](/wiki/?view=page&p=haven/data-stays-on-router).

## What Haven Inc. sees

Nothing. The feed update request contains your serial and last-sync timestamp. No browsing data is transmitted. See [Haven Inc. cannot read your data](/wiki/?view=page&p=haven/haven-inc-cannot-read-data).
""")

# ── Privacy — Haven Inc. cannot read data ──────────────────────────────────
page("haven/haven-inc-cannot-read-data", "Haven Inc. cannot read your data", """
## What it is

Haven is designed so that Haven Inc. structurally cannot access your browsing data — not because of a privacy policy, but because the data never leaves your router.

## The structural guarantee

Your activity log, device list, filter settings, and browsing history are stored in SQLite databases on a dedicated flash partition on your router. These databases are never transmitted to Haven's servers.

The only data Haven's servers receive:
1. **Your router's serial number** — used to look up your subscription
2. **Your last-sync timestamp** — used to compute the delta update to send you
3. **Your router's IP address** — standard server log, same as any web request

Haven's feed servers are write-only from your perspective: they send data to your router; your router does not send browsing data back.

## Verification

A technically inclined user can confirm this by running a packet capture (e.g. Wireshark or `tcpdump`) on the router's internet-facing interface and inspecting Haven's outbound traffic. The only outbound conversation is the periodic update check, and it carries only the serial, subscription token, and last-sync timestamp — no browsing data, device names, or settings.

## Why "by structure, not by promise"

A privacy policy is a legal document that can change. A structural guarantee — where the data physically cannot leave the device — cannot be violated by a policy change, a data breach at Haven's servers, or a subpoena to Haven (there is nothing to hand over).
""")

# ── YouHaven / Quiet the feed ───────────────────────────────────────────────
page("haven/youhaven-quiet-the-feed", "YouHaven: Quiet the feed", """
## What it is

**YouHaven** is a companion Android app that runs YouTube through a filtering layer. It hides channels, content categories, and recommendation types that you have decided you do not want to see — not just for children, but for any adult who wants a less manipulative YouTube experience.

YouHaven is an intentional choice to take back control of your own attention. The Algorithm is designed to keep you watching. YouHaven lets you watch what you chose to watch, not what the feed decided you should watch next.

## What YouHaven filters

- **Channels by name** — block specific channels entirely
- **Content categories** — political commentary, outrage content, reaction videos, etc.
- **Recommendation types** — autoplay queue, "Up Next" sidebar, trending feed
- Each category can be toggled individually in the Haven Helm under **YouHaven**

## How to demonstrate

1. Install YouHaven from [lulhaven.com/get-uhaven](https://lulhaven.com/get-uhaven).
2. Open the Haven Helm at **http://haven.lan** → **YouHaven**.
3. Enable a content category filter (e.g. hide political commentary).
4. Open YouHaven and browse YouTube — the filtered content type no longer appears in recommendations.
5. Toggle the category off in the Helm — content reappears on the next page load.

## Platforms

| Platform | Status |
|---|---|
| Android (phone/tablet) | Available at lulhaven.com/get-uhaven |
| Android TV / Fire TV | Available at lulhaven.com/get-uhaven |
| Linux desktop | Available at lulhaven.com/get-uhaven |
| Windows | Planned |
| iOS | Not planned (App Store restrictions) |

## How it works technically

YouHaven loads YouTube inside a filtering layer that removes channels, content types, and recommendations matching the rules you set in the Helm — before they reach your screen. Your filter choices are managed from the Haven Helm under **YouHaven**.
""")

# ── Cancel anytime ──────────────────────────────────────────────────────────
page("haven/cancel-anytime", "Cancel anytime — filter keeps working", """
## What it is

If you cancel your Haven subscription, your router keeps filtering. The filter database that was on your router at the time of cancellation continues to work indefinitely.

## What you lose when you cancel

- **Weekly updates** — new domains added to the blocklist, new bypass vectors closed
- **New category additions** — if Haven adds a new category after your cancellation, you do not receive it

## What you keep

- All current filter rules (the blocklist on your router as of last update)
- The Haven Helm and all its features
- Your device list, settings, templates, and schedules
- Off-network filtering (WireGuard tunnel continues to function)
- Everything your router does as a router

## Why this matters

Most subscription content services stop working the moment you cancel. Haven's filtering is router-firmware-based — it does not phone home to check subscription status before filtering. Your filter is a database file on your device, not a cloud service. Cancellation stops updates; it does not disable filtering.

## Reactivating

Reactivate at any time from [lulhaven.com](https://lulhaven.com). Your subscription resumes and your router begins receiving updates again at the next scheduled sync.
""")

# ── Survives factory reset ──────────────────────────────────────────────────
page("haven/survives-factory-reset", "Survives a factory reset", """
## What it is

Pressing the factory reset button on a Haven router restores the firmware to defaults — but your Haven settings (filter preferences, device list, schedules, always-allow list) come back automatically after the reset.

## How this works

Haven keeps your settings in a protected area of the router's storage that a factory reset does not erase. A reset restores the firmware to defaults, then Haven restores your configuration from that protected area automatically.

## What a factory reset does affect

- Your Wi-Fi name (SSID) and password reset to the default (on the router label)
- Your Haven admin password resets (you will set a new one at first login)
- Any OpenWrt system-level customizations outside Haven are lost

## What survives

- All Haven filter category settings
- Device list and device names
- Templates applied to devices
- Access schedules
- Always-allow domain list
- Activity log history
- Off-network (WireGuard) configuration

## To demonstrate

1. Configure a filter setting in the Helm (e.g. enable Social Media filtering).
2. Hold the reset button on the router for 10 seconds until the LED flashes.
3. Wait for reboot (~60 seconds).
4. Reconnect to Haven Wi-Fi and open the Helm.
5. Your Social Media setting is still enabled.
""")

# ── Bypass-resistant ────────────────────────────────────────────────────────
page("haven/bypass-resistant", "Bypass-resistant filtering", """
## What it is

Haven closes the bypass vectors that most DNS-based content filters leave open. The common techniques used to circumvent a standard DNS filter — DNS-over-HTTPS, VPNs, Apple Private Relay, and app-store workarounds — are specifically addressed.

## Bypass vectors and how Haven closes them

### DNS-over-HTTPS (DoH)
Standard DNS filters can be bypassed by using a DoH resolver (e.g. Cloudflare 1.1.1.1, Google 8.8.8.8) that encrypts DNS queries and routes them over HTTPS port 443, bypassing the router's DNS interception.

**Haven's response:** Haven prevents devices from using third-party encrypted DNS to slip past the filter, and ensures DNS resolution goes through Haven regardless of what a device is configured to use.

### VPNs
A device running a VPN tunnels all traffic through an encrypted channel, bypassing the router's DNS entirely.

**Haven's response:** For mobile devices, Haven's off-network filtering enrolls the device so that Haven's filtering follows it even on cellular — which removes the incentive to use a VPN to escape the home filter. See [Filtering follows household members off-network](/wiki/?view=page&p=haven/off-network-filtering).

### Apple Private Relay
Apple Private Relay routes Safari traffic through Apple's relay network, obscuring the destination from the local network.

**Haven's response:** Haven neutralizes Private Relay so that traffic falls back to normal connections, which are then subject to Haven's filtering.

### Direct-to-IP connections
DNS filtering acts on domain lookups. A device that already knows a destination's raw IP address could in principle connect without a lookup. In practice this rarely succeeds — most of the web sits behind shared, rotating addresses that route by name, so a raw IP usually reaches the wrong place or nothing at all.

**Haven's response:** Haven already blocks known bypass infrastructure by IP address — IP filtering is part of how Haven works, not absent from it. **SNI-based filtering** is coming: the destination name travels in plaintext inside the connection setup, so Haven can match it against your blocklist and stop a blocked site even when it is reached directly by IP.

## How to demonstrate

The **bypass demo** at [lulhaven.com/#bypass-demo](https://lulhaven.com/#bypass-demo) shows how common filter products (family routers, phone-based DNS apps) fail against these vectors and how Haven holds.

To test on a live router:
1. Enable a category in the Helm (e.g. Social Media).
2. On a device, turn on a common bypass (a public DNS app, or Private Relay on Safari).
3. Try visiting a site in that category — it stays blocked.
4. Without Haven, the same bypass would defeat the filter.
""")

# ── Off-network / Filtering follows members ────────────────────────────────
page("haven/off-network-filtering", "Filtering follows household members off-network", """
## What it is

Haven can filter a phone or tablet's internet traffic even when it is away from home — on cellular, school Wi-Fi, a coffee shop, or anywhere else. The device's DNS queries are routed back through the Haven router via an encrypted tunnel.

## How it works

Haven uses two complementary approaches:

### Encrypted tunnel
The device runs an encrypted tunnel profile that routes its traffic back through the home Haven router, where the same filter rules as at home are applied.

### No-app option
For devices or networks where a tunnel app is not practical, Haven offers an enrollment that points the device's DNS back to your Haven router securely — no open port on the home network required, and it works even on carrier networks that use shared addressing.

## How to set up off-network filtering

1. Open the Haven Helm → **Off-network**.
2. Select the device to enroll.
3. Scan the QR code with the device — this installs the WireGuard profile (Android: install WireGuard app first; iOS: install WireGuard or use Private DNS profile).
4. Toggle the WireGuard profile on when leaving home.

## Demonstrating

1. Enroll a phone via the Helm's Off-network QR code.
2. Turn off Wi-Fi on the phone (cellular only).
3. Enable the WireGuard profile.
4. Try visiting a site that is blocked by your active category filters.
5. It is blocked, even on cellular.
""")

# ── Multi-administrator ─────────────────────────────────────────────────────
page("haven/multi-administrator", "Multi-administrator", """
## What it is

Multiple people can have equal admin access to the Haven Helm. There is no "primary account" — all administrators have the same permissions.

## Typical use

In a household, both parents can manage the filter settings independently. All changes made by any administrator take effect immediately and are visible to all.

## How to add an administrator

1. Open the Haven Helm → **Settings** → **Administrators**.
2. Click **Add administrator**.
3. Enter the new administrator's display name and set a password.
4. Share the Helm URL (`http://haven.lan`) and the password with them.

## Notes

- Administrators log in at `http://haven.lan` from any device on the network.
- There is no role hierarchy — all admins can add or remove other admins.
- Administrator accounts are stored on the router (not in the cloud).
""")

# ── Templates ───────────────────────────────────────────────────────────────
page("haven/templates", "Templates for real situations", """
## What it is

Templates are one-click starting points that apply a curated set of category filters to a device. Instead of manually selecting from 30+ categories, you pick a template that matches the situation and Haven applies an appropriate baseline.

Templates are editable — applying a template sets your starting point, it does not lock anything.

## Available templates

| Template | Purpose | Key categories enabled |
|---|---|---|
| **Parenting** | Child-safe defaults | Adult content, gambling, violence, self-harm, social media (opt-in) |
| **Senior** | Scam and clickbait protection | Phishing, fake news, clickbait, tech support scams |
| **School** | Homework focus | Social media, gaming, streaming, distraction sites |
| **Workplace** | Distraction control | Social media, gaming, non-work streaming |
| **Recovery** | Support staying away from chosen triggers | Configurable trigger categories (alcohol, gambling, adult) |

## How to apply a template

1. Open the Haven Helm → **Devices**.
2. Select a device from the list.
3. Click **Template**.
4. Choose a template from the list.
5. Click **Apply** — the category settings for that device update immediately.
6. Adjust individual categories as needed.

## Templates vs. global settings

Templates apply at the **device level**. Each device on your network can have a different template applied. Global category settings (the main Categories page) apply to all devices that do not have a device-level override.
""")

# ── Block what you choose ───────────────────────────────────────────────────
page("haven/block-what-you-choose", "Block what you choose", """
## What it is

Haven ships with 30+ content categories and 150+ named providers. You choose what to filter — nothing is filtered by default. Every category and provider can be toggled independently.

## Categories (examples)

Adult content · Gambling · Violence · Self-harm · Social media · Gaming · Streaming · News · Political commentary · Fake news · Phishing · Malware · Ads & trackers · Cryptomining · Alcohol & drugs · Tobacco · Dating · Firearms · Hate speech · Piracy · Proxies & VPNs · Sect & extremism · Chat & messaging · File sharing · Forums · Lingerie & swimwear

## Named providers (examples)

Facebook · Instagram · TikTok · Snapchat · Reddit · Twitter/X · YouTube · Netflix · Hulu · Twitch · Steam · Discord · WhatsApp · Telegram · ESPN · BetMGM · DraftKings · and 130+ more

## How to use

1. Open the Haven Helm → **Categories** (all-categories view).
2. Toggle any category on or off. Changes take effect in under a second.
3. For granular control, open **Providers** within a category to enable/disable specific sites.
4. Use the search box at the top to find a specific category or provider quickly.

## Per-device settings

By default, category settings apply to all devices. To set different rules for a specific device:
1. Go to **Devices** → select a device.
2. Click **Settings** — you can override any global category for this device only.
""")

# ── Updated weekly ──────────────────────────────────────────────────────────
page("haven/updated-weekly", "Updated weekly", """
## What it is

Haven's category database is updated weekly. New domains are added, domains that have changed are updated, and bypass vectors that have been discovered are closed — automatically.

## How updates work

1. Once per week (or on demand), your router checks in with Haven's update service.
2. The router sends only its serial number, subscription token, and the timestamp of its last update.
3. Haven responds with just the changes since your last sync — not the whole list.
4. The router applies those changes to its local blocklist.
5. The new rules take effect within seconds.

## Source of the blocklist data

Haven's blocklist is a curated list drawing on multiple sources, maintained and supplemented by Haven's team.

## Viewing last update time

Open the Haven Helm → **Settings** → **Subscription**. The last successful sync time is shown.

## Manual sync

To trigger an immediate update outside the weekly schedule:
1. Open the Helm → **Settings** → **Subscription**.
2. Click **Check for updates now**.
""")

# ── Adult content off by default ────────────────────────────────────────────
page("haven/adult-content-off-by-default", "Adult content: off until you choose it", """
## What it is

Adult content filtering is **not enabled by default**. When you first set up Haven, nothing is filtered. Adult content is one category among many — you opt in to filtering it, same as any other category.

## Why this matters

Haven is not an "adult content blocker with other stuff." It is a general-purpose content filter where you decide what gets filtered. A household that wants to block gambling but not adult content can do that. A household that wants to filter nothing at all can do that.

## To enable adult content filtering

1. Open the Haven Helm → **Categories**.
2. Find **Adult content** (or search for it).
3. Toggle it on.

When adult content filtering is active, Haven applies its curated adult-content blocklist, with an optional additional upstream filtering layer for extra coverage.

## To disable

Toggle it off. Takes effect immediately.

## Note on the demo

The interactive demo at [lulhaven.com/demo](https://lulhaven.com/demo) reflects the real Helm. Adult content is off by default in the demo as well.
""")

# ── The Helm ────────────────────────────────────────────────────────────────
page("haven/the-helm", "The Haven Helm", """
## What it is

The **Haven Helm** is Haven's web-based control interface. It runs directly on your router and is accessible from any device on your network — no app required.

**Address:** http://haven.lan (also accessible at http://192.168.1.1 if haven.lan does not resolve on your device)

## What you can do in the Helm

- **Dashboard** — current filter status, active devices, recent activity
- **Categories** — enable/disable content categories
- **Devices** — view all devices on your network; apply templates, schedules, and per-device settings
- **Schedules** — set time windows when filtering applies (or is relaxed) per device
- **Always-allow** — domains that are never blocked regardless of category settings
- **Activity log** — see what is being blocked and by which device
- **YouHaven** — manage YouTube filtering category settings
- **Off-network** — enroll devices for filtering away from home
- **Settings** — administrators, subscription, network configuration

## Two modes

- **Simple mode** — a clean, category-focused view for everyday use
- **Advanced mode** — exposes per-provider toggles, raw DNS settings, and system details

Switch between modes using the toggle in the top navigation bar.

## Accessing the Helm

1. Connect a device to your Haven network (Wi-Fi or Ethernet).
2. Open a browser and go to **http://haven.lan**.
3. Log in with your administrator password.

The Helm is only accessible from inside your network — it is not exposed to the internet.
""")

# ── Search across categories ────────────────────────────────────────────────
page("haven/search-categories", "Search across categories and providers", """
## What it is

The Haven Helm includes a search box that searches across all categories and named providers simultaneously. Instead of scrolling through 30+ categories to find a specific site or topic, type a word and results appear instantly.

## How to use

1. Open the Haven Helm → **Categories** (or **Providers**).
2. Type in the search box at the top of the page.
3. Matching categories and providers appear immediately.
4. Toggle directly from the search results — no need to navigate into the category first.

## What it searches

- Category names (e.g. "gambling", "social", "news")
- Provider names (e.g. "TikTok", "ESPN", "Steam")
- Category descriptions

## Example

Typing "video" would surface: Streaming video, YouTube (under Social), Twitch, Vimeo, and similar providers across multiple categories.
""")

# ── Two modes ───────────────────────────────────────────────────────────────
page("haven/simple-advanced-modes", "Simple mode and Advanced mode", """
## What it is

The Haven Helm offers two views:

- **Simple mode** — a clean interface focused on the most common actions: enabling categories, viewing the device list, checking the activity log
- **Advanced mode** — full access to per-provider toggles, finer DNS controls, and detailed system status

## Switching modes

Click the **Simple / Advanced** toggle in the Helm's top navigation bar. The setting is remembered per browser.

## What Advanced mode adds

- Per-provider toggles within each category (enable/disable individual sites rather than entire categories)
- Finer DNS controls
- Detailed subscription and sync status
- Network diagnostics

## Who should use Advanced mode

Advanced mode is intended for users who want granular control or are troubleshooting a specific site. For everyday use — enabling or disabling broad categories, viewing what's blocked — Simple mode covers everything.
""")

# ── Activity log ────────────────────────────────────────────────────────────
page("haven/activity-log", "Activity log", """
## What it is

The Haven Helm's **Activity log** shows a real-time record of DNS queries from devices on your network — which domains were requested, which device made the request, and whether Haven allowed or blocked each request.

## How to access

Open the Haven Helm → **Activity log**.

## What each entry shows

| Field | Description |
|---|---|
| Time | When the request was made |
| Device | Hostname or device name |
| Domain | The domain that was requested |
| Action | Allowed or Blocked |
| Category | If blocked: which category triggered the block |

## Filtering the log

- Filter by device to see activity from one household member's device
- Filter by action (blocked only) to audit what is being caught
- Filter by time range

## Privacy note

The activity log is stored on your router and is never transmitted to Haven's servers. Only administrators logged into the Helm can view it.

## Log retention

By default, the activity log retains the last 30 days of entries. This can be adjusted in **Settings → Activity log**.

## Why this matters

The activity log lets you see exactly what Haven is doing. If a site is being unexpectedly blocked, you can find the entry, identify the category, and either disable that category or add the domain to your always-allow list.
""")

# ── Always-allow list ───────────────────────────────────────────────────────
page("haven/always-allow-list", "Always-allow list", """
## What it is

Domains on your always-allow list are never blocked by Haven, regardless of which categories are enabled. If a site you need is being caught by a broad category filter, adding it to always-allow exempts it permanently.

## How to add a domain

**From the activity log (easiest):**
1. Open the Helm → **Activity log**.
2. Find a blocked entry for the domain you want to allow.
3. Click the **Allow** button next to the entry.
4. The domain is added to your always-allow list and future requests to it are permitted.

**Manually:**
1. Open the Helm → **Always-allow**.
2. Type the domain name (e.g. `work-tool.example.com`) and click **Add**.

## Scope

Always-allow applies network-wide — it is not per-device. A domain on the always-allow list is allowed for every device.

## Wildcard behavior

Adding `example.com` to always-allow covers `example.com` and all subdomains (`www.example.com`, `api.example.com`, etc.).

## Removing a domain

Open the Helm → **Always-allow** → click the **×** next to the domain.
""")

# ── Per-provider settings ───────────────────────────────────────────────────
page("haven/per-provider-settings", "Per-provider settings", """
## What it is

In addition to blocking entire categories, you can enable or disable filtering for individual named providers within a category. This lets you, for example, block most social media but allow one specific platform, or block most news sites but allow a specific outlet.

## How to access

1. Open the Haven Helm → **Categories** (Advanced mode required for full per-provider access).
2. Click into a category (e.g. "Social media").
3. The provider list shows every named provider in that category with individual toggles.

## Example use cases

- Block all social media **except** LinkedIn (work use)
- Block all gambling sites **except** one specific lottery site
- Block streaming video **except** a specific educational platform

## Provider list

Haven includes 150+ named providers across categories. The full list is searchable from the main Categories page. See [Search across categories and providers](/wiki/?view=page&p=haven/search-categories).

## Interaction with category-level toggle

If a category is **off** (globally disabled), per-provider settings within it have no effect — all providers in that category are allowed. Per-provider settings only matter when the parent category is enabled.
""")

# ── Plug in and filter ──────────────────────────────────────────────────────
page("haven/plug-in-and-filter", "Plug in, set a password, you are filtering", """
## What it is

Haven's first-boot experience is designed to reach an active filtering state in under five minutes:

1. Plug the WAN port into your modem
2. Connect a device to Haven's Wi-Fi
3. Open http://haven.lan
4. Set an admin password
5. Done — filtering is active

No configuration wizard, no account creation, no app installation.

## Network auto-detection

Haven detects your existing network configuration at boot. If Haven's default subnet (192.168.1.x) conflicts with your modem or upstream gateway, Haven relocates itself automatically to avoid the conflict. You do not need to know your subnet settings.

## What is filtered on first boot

Nothing. Haven ships with all categories off. After setting your password, the first thing you see in the Helm is the Categories page. Enable what you want to filter.

## If http://haven.lan does not resolve

Some devices cache DNS or don't resolve `.lan` domains. Try:
- **http://192.168.1.1** — Haven's default LAN IP
- If your network uses a different subnet, Haven's IP will be the gateway address shown in your device's network settings

## Changing Wi-Fi settings

After first login, go to **Settings → Wi-Fi** to change the network name (SSID) and password from the defaults on the router label.
""")

# ── Everything your old router did ─────────────────────────────────────────
page("haven/full-router-functionality", "Everything your old router did, Haven does too", """
## What it is

Haven is a full router replacement — not a device you add to your network alongside your existing router. It handles everything a standard home router does, plus Haven's filtering.

## Standard router features included

- **NAT / routing** — shares your ISP connection among all devices
- **DHCP** — assigns IP addresses to devices automatically
- **Wi-Fi** — dual-band 2.4GHz + 5GHz (Wi-Fi 6 on Navy and OD)
- **Firewall** — stateful firewall
- **DNS** — local DNS resolver, with filtering integrated
- **Guest Wi-Fi** — optional isolated guest network
- **Port forwarding** — expose internal services to the internet
- **WireGuard VPN server** — built in (used for off-network filtering; also usable for general VPN access)
- **USB storage** — share a USB drive as network storage (Navy model)
- **Dynamic DNS** — optional

## What Haven adds

- Content filtering (DNS-based, category + provider level)
- Haven Helm management interface
- Device scheduling and per-device settings
- Activity log
- YouHaven (YouTube filtering)
- Off-network filtering via WireGuard tunnel

Nothing is removed from the underlying OpenWrt router capabilities. If your old router supported a feature that OpenWrt supports, Haven supports it too (accessible via the advanced OpenWrt interface at http://192.168.1.1/cgi-bin/luci).
""")

# ── Pricing ─────────────────────────────────────────────────────────────────
page("haven/pricing", "$4/month for category updates", """
## What it costs

| Item | Price |
|---|---|
| Haven Navy router | $299 one-time |
| Category updates subscription | $4/month |
| Haven OD router | Details at lulhaven.com |

## What the subscription covers

The $4/month subscription delivers:
- Weekly blocklist updates (new domains, updated categories)
- New bypass-vector closures as they are discovered
- New category and provider additions
- Software updates to the Haven Helm and router firmware

## Compared to alternatives

Most dedicated content filter subscriptions run $70–$100/year ($5.80–$8.30/month). Haven's subscription is intentionally priced below this range.

DNS-based filtering services (e.g. NextDNS, CleanBrowsing) charge $2–$5/month but are cloud-based — your DNS queries go to their servers. Haven's filtering is local; your queries never leave your network.

## If you cancel

Your router continues filtering with the last downloaded blocklist. See [Cancel anytime](/wiki/?view=page&p=haven/cancel-anytime) for details.

## Founders pricing

Early supporters who purchase during the Founders campaign receive free updates through the launch period.
""")

# ── Haven Navy ──────────────────────────────────────────────────────────────
page("haven/haven-navy", "Haven Navy", """
## What it is

Haven Navy is Haven's primary recommended router, based on the **GL-MT6000** hardware platform.

## Specifications

| Feature | Detail |
|---|---|
| Chipset | MediaTek Filogic 880 (quad-core ARM Cortex-A53, 1.8GHz) |
| RAM | 1GB DDR4 |
| Storage | 8GB eMMC |
| Wi-Fi | Wi-Fi 6 (802.11ax), dual-band 2.4GHz + 5GHz |
| WAN port | 2.5GbE |
| LAN ports | 1× 2.5GbE |
| USB | 1× USB 3.0 |
| Haven firmware | OpenWrt 24.10.4 + Haven |

## Why it is the primary recommendation

- Filogic 880 handles gigabit+ throughput without saturating the CPU
- 1GB RAM gives Haven's filtering engine and databases comfortable headroom
- 2.5GbE WAN is future-proof as multi-gigabit ISP service becomes common
- Wi-Fi 6 (AX) handles dense device environments (many phones, tablets, smart home devices)

## Serial format

Haven Navy serial numbers follow the format `YYMMDDNAV####` (e.g. `260510NAV0001`).

## Availability

Available at [lulhaven.com](https://lulhaven.com). See the Founders campaign for early-supporter pricing.
""")

# ── Haven OD ────────────────────────────────────────────────────────────────
page("haven/haven-od", "Haven OD", """
## What it is

Haven OD is Haven's secondary router model, based on the **Linksys E8450 (UBI)** hardware platform.

## Specifications

| Feature | Detail |
|---|---|
| Chipset | MediaTek MT7622 (dual-core ARM Cortex-A53, 1.35GHz) |
| RAM | 512MB DDR4 |
| Storage | 128MB NAND flash |
| Wi-Fi | Wi-Fi 6 (802.11ax), dual-band 2.4GHz + 5GHz |
| WAN port | 1GbE |
| LAN ports | 4× 1GbE |
| USB | None |
| Haven firmware | OpenWrt 24.10.4 + Haven |

## Notes

Haven OD uses a UBI (Unsorted Block Images) flash layout, which requires a specific sysupgrade procedure during firmware flashing. The Haven pre-flash process handles this correctly.

Haven OD has 512MB RAM vs. the Navy's 1GB. For households with very large device lists or high DNS query volumes, the Navy is recommended.

## Serial format

Haven OD serial numbers follow the format `YYMMDDOLV####`.

## Availability

Details at [lulhaven.com](https://lulhaven.com).
""")

# ── Interactive demo ─────────────────────────────────────────────────────────
page("haven/interactive-demo", "Interactive demo", """
## What it is

Haven's interactive demo at **lulhaven.com/demo** is a simulation of the Haven Helm running in your browser — no router, no signup, no download required.

The demo shows the real Helm interface with simulated filter responses. You can toggle categories, view the device list, and see what the activity log looks like.

## What you can try in the demo

- Enable and disable content categories
- Browse the device list (simulated devices)
- View the activity log (simulated entries)
- Use the search box to find categories and providers
- Switch between Simple and Advanced modes

## Limitations of the demo

- Changes in the demo do not affect a real network
- The demo runs with simulated data — the activity log entries and device list are not real
- Off-network filtering, schedule configuration, and administrator management are shown as UI mockups

## Link

[lulhaven.com/demo](https://lulhaven.com/demo) — no signup required.
""")

# ---------------------------------------------------------------------------
# Generate SQL and apply
# ---------------------------------------------------------------------------
def sq(s):
    return "'" + s.replace("'", "''") + "'"

def generate_sql():
    lines = []
    for slug, title, body in PAGES:
        ns = slug.split("/")[0]
        lines.append(
            "INSERT INTO wiki_pages (slug, namespace, title, body, author_id, created_datetime, modified_datetime, revision) "
            "VALUES ({slug}, {ns}, {title}, {body}, NULL, {ts}, {ts}, 1) "
            "ON CONFLICT(slug) DO UPDATE SET title=excluded.title, body=excluded.body, "
            "modified_datetime=excluded.modified_datetime, revision=revision+1;".format(
                slug=sq(slug), ns=sq(ns), title=sq(title), body=sq(body), ts=sq(NOW)
            )
        )
    return "\n".join(lines)

if __name__ == "__main__":
    sql = generate_sql()
    sql_file = "/tmp/wiki_pages_seed.sql"
    with open(sql_file, "w") as f:
        f.write(sql)
    print(f"Generated {len(PAGES)} page inserts → {sql_file}")
    result = subprocess.run(
        ["wrangler", "d1", "execute", "haven-wiki", "--remote", "--file", sql_file],
        cwd=os.path.expanduser("~/haven/website"),
        capture_output=True, text=True
    )
    print(result.stdout[-2000:] if result.stdout else "")
    if result.returncode != 0:
        print("STDERR:", result.stderr[-1000:], file=sys.stderr)
        sys.exit(1)
    print(f"Done — {len(PAGES)} pages seeded.")
