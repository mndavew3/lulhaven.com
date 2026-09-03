// generated from haven_wiki.db accomplishments — 753 rows, newest id 768
var milestonesDataset = [
  {
    "id": 766,
    "date": "2026-09-02",
    "theme": "Security & Trust",
    "impact": 5,
    "summary": "A self-audit of the site found a way past the login check, and it was closed the same day: web addresses typed with different capitalization or a trailing slash were treated as different pages and skipped the check entirely.",
    "detail": null,
    "benefit": "The private parts of the site stay private. A trust product cannot ask you to take its word for it, so we audit our own front door and publish what we find.",
    "ref": "39b4668f01",
    "features": []
  },
  {
    "id": 767,
    "date": "2026-09-02",
    "theme": "Reliability & Updates",
    "impact": 4,
    "summary": "Firmware 0.1.99 went live for all four Haven models, and each one was checked on the real update server after publishing rather than assumed to have landed.",
    "detail": null,
    "benefit": "Your router only accepts an update we signed, and we confirm the update it will be offered is the one we meant to ship.",
    "ref": "a534d4e992",
    "features": []
  },
  {
    "id": 768,
    "date": "2026-09-02",
    "theme": "Filtering",
    "impact": 3,
    "summary": "Cleaned the block list: entries pointing at sites that no longer exist were pulled, one provider's entry was narrowed from a broad sweep to the four addresses it actually uses, and the published counts were corrected to match.",
    "detail": null,
    "benefit": "Fewer things blocked by accident, and the number we publish is the number that is actually enforced.",
    "ref": "a866203d21",
    "features": []
  },
  {
    "id": 765,
    "date": "2026-09-01",
    "theme": "Reliability & Updates",
    "impact": 3,
    "summary": "Firmware 0.1.99 built for the Haven router line: list updates now detect changes by fingerprint instead of keeping raw downloaded copies on the router's own storage",
    "detail": null,
    "benefit": "Every list update leaves less leftover data on your router and puts less wear on its storage chip",
    "ref": "a32ef80eab",
    "features": []
  },
  {
    "id": 764,
    "date": "2026-09-01",
    "theme": "Reliability",
    "impact": 3,
    "summary": "Found a software-only way to unlock a frozen status screen and shipped a self-healing ladder that applies it automatically",
    "detail": null,
    "benefit": "A screen that locks up can rescue itself instead of waiting for someone to pull a plug",
    "ref": "c7efa371ae",
    "features": []
  },
  {
    "id": 763,
    "date": "2026-09-01",
    "theme": "Reliability & Updates",
    "impact": 3,
    "summary": "Firmware 0.1.98 built and published for all four router flavors, with the release checker catching a stale first build before it could ship",
    "detail": null,
    "benefit": "Updates reach customers through a gate that provably refuses a bad build instead of trusting that everything went right",
    "ref": "bc25bc112d",
    "features": []
  },
  {
    "id": 761,
    "date": "2026-09-01",
    "theme": "Reliability & Updates",
    "impact": 3,
    "summary": "Firmware 0.1.97 built across all four flavors, the first release produced under the new unsaved-source build guard; over-the-air manifest staged for publish.",
    "detail": null,
    "benefit": "Your router's next update adds dependable hot-plug handling for the status panel and a branded display theme — with a release check built to prove each image carries exactly the code it claims.",
    "ref": "5a350c0670",
    "features": []
  },
  {
    "id": 762,
    "date": "2026-09-01",
    "theme": "Tooling & infrastructure",
    "impact": 2,
    "summary": "usbfix: USB bus-reset and hub port-power recovery tool, proven live curing the status panel's Class-B wedge on the bench.",
    "detail": null,
    "benefit": "Hardware testing keeps moving: a wedged USB panel now recovers in seconds with a targeted reset instead of a machine power-cycle.",
    "ref": "a30c77e4a2",
    "features": []
  },
  {
    "id": 760,
    "date": "2026-08-31",
    "theme": "Trust & transparency",
    "impact": 4,
    "summary": "Caught that a firmware release could be built from edited-but-unsaved source, meaning the exact software on a shipped router might not be rebuildable later; the source behind the current release is now saved and byte-matched to what is inside the images",
    "detail": null,
    "benefit": "Whatever is running on your router can always be rebuilt and inspected — a release can no longer exist that nobody can reproduce",
    "ref": "5eb7ba45ef",
    "features": []
  },
  {
    "id": 759,
    "date": "2026-08-31",
    "theme": "Firmware & overlay",
    "impact": 3,
    "summary": "SmartMonitor panel driver hardened: theme uploads are 3x faster after dropping needless per-report pacing, and the panel handshake now has tracing and stale-input flushing so link problems are visible instead of silent",
    "detail": null,
    "benefit": "The add-on status display loads its look in seconds instead of half a minute, and future panel glitches can be diagnosed instead of guessed at",
    "ref": "58d4a8e090",
    "features": []
  },
  {
    "id": 758,
    "date": "2026-08-31",
    "theme": "Firmware & overlay",
    "impact": 3,
    "summary": "The little pocket-size monitor panel on the workbench now has its own software package inside the router's firmware build, so a router can drive it straight out of the box",
    "detail": null,
    "benefit": "A reviewer or customer who plugs in the small companion display gets live, easy-to-read status cards with no extra setup",
    "ref": "1ec97c1277",
    "features": []
  },
  {
    "id": 757,
    "date": "2026-08-30",
    "theme": "Firmware & overlay",
    "impact": 3,
    "summary": "The small status display planned for the router can now show any number, dial or symbol Haven draws, without altering the display's own built-in software.",
    "detail": "The router's optional status screen draws its numbers and dials from artwork Haven designs, and the router picks which one to show simply by sending a value. That means a clearer or better-looking readout is something Haven can design and send out later, rather than something locked in when the screen was made. There are now twenty screens to move between, and the main one carries two speed dials that track what your network is actually doing, from a trickle up to the fastest connections on the market.",
    "benefit": "Readouts on the router's screen can be improved or added at any time without risky changes to the display hardware, so the screen keeps getting better after the router is on a customer's shelf.",
    "ref": "2610f9ad79",
    "features": []
  },
  {
    "id": 756,
    "date": "2026-08-30",
    "theme": "Tooling & infrastructure",
    "impact": 2,
    "summary": "The workbench can now check its own work with a camera",
    "detail": "A small USB display panel on the workbench shows live data pulled straight off a Haven router. Getting it to draw correctly meant proving what the panel actually does rather than trusting the manufacturer's notes, so a webcam was pointed at the screen: the bench uploads a layout, photographs the panel, reads the photo back, and tries again, with no person in the loop. The layout format also went from about 312 KB per screen to under 5 KB, which is why the panel now refreshes in five seconds instead of fourteen.",
    "benefit": "Claims about Haven hardware get checked by a camera looking at the real thing, not by a script printing that it worked.",
    "ref": "33a2aed0aa",
    "features": []
  },
  {
    "id": 755,
    "date": "2026-08-29",
    "theme": "Testing & quality",
    "impact": 2,
    "summary": "The try-it-yourself demo on the website now matches the software actually shipping, and a category that had lost its icon has it back.",
    "detail": null,
    "benefit": "What you click on the website is what arrives on the router, so trying Haven before you buy it tells you the truth.",
    "ref": "7538cea",
    "features": []
  },
  {
    "id": 752,
    "date": "2026-08-28",
    "theme": "Testing & quality",
    "impact": 5,
    "summary": "A Haven version number is earned by opening the finished image and confirming the new work is inside it byte for byte — evidence a build report on its own cannot give.",
    "detail": null,
    "benefit": "When a Haven release says it contains something, the shipped image itself was opened and checked. The claim rests on the bytes, not on a log.",
    "ref": "fb03cf2a1c",
    "features": []
  },
  {
    "id": 749,
    "date": "2026-08-28",
    "theme": "Security & Trust",
    "impact": 5,
    "summary": "The optional status screen no longer shows your Wi-Fi guest password where anyone standing near the unit could read it. It now sits behind the owner code, along with the new device-presence view.",
    "detail": null,
    "benefit": "Anything on the little screen that could let a stranger onto your network, or reveal who is present, now takes the owner code to see. The open view shows shape only.",
    "ref": "83783910b1",
    "features": []
  },
  {
    "id": 745,
    "date": "2026-08-28",
    "theme": "Trust & transparency",
    "impact": 5,
    "summary": "Every page now says plainly that a new Haven filters nothing until you choose what to filter.",
    "detail": null,
    "benefit": "What the website promises now matches what comes out of the box, so nobody is surprised in either direction — nothing is blocked behind your back, and nothing you expected to be on is quietly off.",
    "ref": "295b33369c",
    "features": []
  },
  {
    "id": 753,
    "date": "2026-08-28",
    "theme": "Trust & transparency",
    "impact": 4,
    "summary": "Contest claims are now reviewed by a judge before they count, and the system itself refuses any outcome the published rules do not allow.",
    "detail": null,
    "benefit": "What the contest rules promise you is what the system will physically allow. A claim can be unconfirmed and invited back; it cannot be thrown out.",
    "ref": "47775c7a2b",
    "features": []
  },
  {
    "id": 751,
    "date": "2026-08-28",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "The status-screen software now starts on an ordinary TV or monitor over HDMI with no USB panel attached, exercised across all four hardware combinations on the bench and carried into the next version.",
    "detail": null,
    "benefit": "When the optional status screen reaches you, the TV-only setup is one we have already run ourselves — and we say which version carries it.",
    "ref": "b804ee5fbb",
    "features": []
  },
  {
    "id": 750,
    "date": "2026-08-28",
    "theme": "Reliability & safety",
    "impact": 4,
    "summary": "Forgot-password recovery was exercised end to end on a running Haven: PIN entry, the printed recovery code, the lockout after repeated wrong guesses, and signing in again with the new password.",
    "detail": null,
    "benefit": "The way back into your own router after a forgotten password is not a promise on a page — it has been walked through, including what happens when someone guesses wrong five times.",
    "ref": "session 2026-08-28",
    "features": []
  },
  {
    "id": 748,
    "date": "2026-08-28",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Every Haven now names its own Wi-Fi network, so you can tell yours apart from any other nearby.",
    "detail": null,
    "benefit": "No more guessing which network is yours when you set up, and no two Havens on the same street look alike.",
    "ref": "27127cf50c",
    "features": []
  },
  {
    "id": 746,
    "date": "2026-08-28",
    "theme": "Marketing & website",
    "impact": 4,
    "summary": "Site updates now reach returning visitors on their very next visit.",
    "detail": null,
    "benefit": "Whatever we publish — new milestones, new copy, a new page — is what a returning visitor sees straight away.",
    "ref": "484d43c1f2",
    "features": []
  },
  {
    "id": 744,
    "date": "2026-08-28",
    "theme": "Trust & transparency",
    "impact": 4,
    "summary": "Removed a product comparison from the public milestone list that we could not back with our own measurements, along with three entries that were publishing internal audience research.",
    "detail": null,
    "benefit": "Everything on the milestone list is now something Haven can show you, not something we assumed; and the page reads as a record of what shipped rather than a look inside our marketing notes.",
    "ref": "176669c8e0",
    "features": []
  },
  {
    "id": 754,
    "date": "2026-08-28",
    "theme": "Trust & transparency",
    "impact": 3,
    "summary": "Made-up records created by an automated helper were found in a live database, measured, and reported instead of quietly cleaned up.",
    "detail": null,
    "benefit": "When something goes wrong inside Haven, the number you get is measured and the report is public — not a reassurance.",
    "ref": "1e9632b4d7",
    "features": []
  },
  {
    "id": 747,
    "date": "2026-08-28",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "Published milestones now speak to every kind of network Haven runs on — schools and offices as much as any private one.",
    "detail": null,
    "benefit": "Anyone running a shared network can read the milestone list and see their own situation described, not somebody else's.",
    "ref": "4361a4bb-b6",
    "features": []
  },
  {
    "id": 741,
    "date": "2026-08-27",
    "theme": "Security & Trust",
    "impact": 4,
    "summary": "Haven's downloadable virtual-machine image is now hardened before release: remote console login is switched off and the build station's private signing key is left out of the image entirely.",
    "detail": null,
    "benefit": "The free copy of Haven you can download and try is sealed off from the machines that build and sign real Haven firmware.",
    "ref": "9063a63d5e",
    "features": []
  },
  {
    "id": 738,
    "date": "2026-08-27",
    "theme": "Security & Trust",
    "impact": 4,
    "summary": "Added an attended tool that produces a printable paper backup of Haven's fleet update-signing keys -- a second, independent recovery copy alongside the existing encrypted USB backup, with per-key checksums to verify it.",
    "detail": null,
    "benefit": "Haven's ability to safely sign and push verified software updates now has a second, offline backup.",
    "ref": "e5ddf3f",
    "features": []
  },
  {
    "id": 743,
    "date": "2026-08-27",
    "theme": "Testing & quality",
    "impact": 3,
    "summary": "The router smoke test now reads the tested unit's own serial number and hardware model live from the device and prints them in its report.",
    "detail": null,
    "benefit": "Every test result names the exact router it ran on, so a Haven unit's pass is backed by evidence from that unit.",
    "ref": "d0998877e7",
    "features": []
  },
  {
    "id": 742,
    "date": "2026-08-27",
    "theme": "Testing & quality",
    "impact": 3,
    "summary": "Haven's blocking-rate measurement now scores tracker and stalkerware test sites as their own category, with each category scored strictly against its own sources.",
    "detail": null,
    "benefit": "The blocking percentages Haven publishes are measured cleanly category by category, so the numbers customers see reflect exactly what the router stops.",
    "ref": "7a5a82ff9e",
    "features": []
  },
  {
    "id": 739,
    "date": "2026-08-27",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "Haven's open design contest now shows a public top-three leaderboard on the website, fed by a new scoring tool the judges use to rank entries.",
    "detail": null,
    "benefit": "Anyone following the contest can see which entries are leading and how they were judged, instead of waiting for a single announcement at the end.",
    "ref": "607900ae58",
    "features": []
  },
  {
    "id": 737,
    "date": "2026-08-27",
    "theme": "Firmware & overlay",
    "impact": 3,
    "summary": "Each Haven router now broadcasts its own unique WiFi name, built from its serial number, instead of every unit sharing the same default network name.",
    "detail": null,
    "benefit": "If two Havens ever end up near each other -- two units on one customer's network, or side by side during setup -- it's now possible to tell which WiFi network belongs to which router.",
    "ref": "9dda7a4b14",
    "features": []
  },
  {
    "id": 736,
    "date": "2026-08-27",
    "theme": "Filtering & enforcement",
    "impact": 3,
    "summary": "Expanded Haven's on-device content catalog with roughly 70 new entries across news outlets, political organizations, big-business brands, and extremism/ragebait sources, so customers get finer-grained blocking choices in those categories.",
    "detail": null,
    "benefit": "More real-world sources customers can specifically allow or block -- sharper control over news, politics, and business content instead of one-size-fits-all filtering.",
    "ref": "2cf951b9ec",
    "features": []
  },
  {
    "id": 740,
    "date": "2026-08-27",
    "theme": "Trust & transparency",
    "impact": 2,
    "summary": "Contest entrants now record their agreement to the contest rules at the moment they submit, and that agreement is stored with the entry.",
    "detail": null,
    "benefit": "Everyone who enters has the same clear terms on record, so there is no argument later about what was agreed to.",
    "ref": "b0a75c5b01",
    "features": []
  },
  {
    "id": 732,
    "date": "2026-08-26",
    "theme": "Trust & transparency",
    "impact": 4,
    "summary": "Haven can now capture a dated speed, ping, and connection-quality reading you can point to if your ISP says everything's fine",
    "detail": null,
    "benefit": "One button press gives you your own timestamped proof of your internet's real performance -- evidence that survives a reboot, not just a claim.",
    "ref": "600dd45d3d",
    "features": []
  },
  {
    "id": 733,
    "date": "2026-08-26",
    "theme": "Filtering & enforcement",
    "impact": 3,
    "summary": "Haven now blocks VPN-tunneled ad and tracker bypass by default, and lets your paired phone ask for a short, verified exception",
    "detail": null,
    "benefit": "Encrypted VPN tunnels can no longer be used to slip past your filtering unnoticed -- and a legitimate app can still ask for the access it needs.",
    "ref": "61a8e103bf",
    "features": []
  },
  {
    "id": 734,
    "date": "2026-08-26",
    "theme": "Firmware & overlay",
    "impact": 2,
    "summary": "Haven's on-device screen can now run on an HDMI display, not just the small panel screen",
    "detail": null,
    "benefit": "Any Haven unit can show its live status on a repurposed monitor or TV -- no special hardware panel required.",
    "ref": "6dc8830c00",
    "features": []
  },
  {
    "id": 735,
    "date": "2026-08-26",
    "theme": "Trust & transparency",
    "impact": 1,
    "summary": "The ad-blocking description text now names the list Haven actually uses (AdGuard DNS + UT1, ~158,000 domains) instead of an outdated one",
    "detail": null,
    "benefit": "What the app tells you about your filtering now matches what it's actually doing.",
    "ref": "bfb28ddc35",
    "features": []
  },
  {
    "id": 727,
    "date": "2026-08-25",
    "theme": "Security & Trust",
    "impact": 5,
    "summary": "Every Haven now signs what it sends with its own key, and the service checks that signature before believing it",
    "detail": null,
    "benefit": "A message that claims to be from your Haven can be proven to be from your Haven, and nothing else can pretend to be it.",
    "ref": "88f004c0d0",
    "features": []
  },
  {
    "id": 719,
    "date": "2026-08-25",
    "theme": "Firmware & overlay",
    "impact": 5,
    "summary": "The saved settings record now fits every Haven, including the model with the smallest hardware vault",
    "detail": null,
    "benefit": "Everything you have set on your Haven is captured in a record small enough to fit every model we sell, so a factory reset hands it all back.",
    "ref": "c33dfcbd9a",
    "features": []
  },
  {
    "id": 718,
    "date": "2026-08-25",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Every Haven now ships with a genuinely unique administrator password, and the burn proves it before the unit passes",
    "detail": null,
    "benefit": "The password we print for your Haven is yours alone - if someone else's unit is compromised, it tells them nothing about yours.",
    "ref": "fa71edd",
    "features": []
  },
  {
    "id": 717,
    "date": "2026-08-25",
    "theme": "Haven Helm",
    "impact": 5,
    "summary": "The recovery PIN can finally be set from a screen a customer can reach",
    "detail": null,
    "benefit": "You can set a six-digit recovery PIN yourself, so a forgotten password is a minor annoyance instead of a support call.",
    "ref": "8ed90fdc75",
    "features": []
  },
  {
    "id": 716,
    "date": "2026-08-25",
    "theme": "Security & Trust",
    "impact": 5,
    "summary": "The recovery code printed on your Haven box now actually gets you back in",
    "detail": null,
    "benefit": "If you forget your Haven password, the code printed on the box gets you back in - and it keeps working after a factory reset.",
    "ref": "9921cbe61e",
    "features": []
  },
  {
    "id": 715,
    "date": "2026-08-25",
    "theme": "Firmware & overlay",
    "impact": 5,
    "summary": "The sealed settings record now publishes an outside-checkable fingerprint from the router's managed schedule",
    "detail": null,
    "benefit": "The record of what changed on your router can be checked from outside it - the one thing that catches a change made behind your back.",
    "ref": "b3f9e66e25",
    "features": []
  },
  {
    "id": 714,
    "date": "2026-08-25",
    "theme": "Filter strategies",
    "impact": 5,
    "summary": "The browser-ads switch now arms all 157,629 domains, proven both directions on a real unit",
    "detail": null,
    "benefit": "Turning on browser ad blocking blocks the ads - and turning it off gives them straight back.",
    "ref": "8bc3e7cfe0",
    "features": []
  },
  {
    "id": 712,
    "date": "2026-08-25",
    "theme": "Firmware & overlay",
    "impact": 5,
    "summary": "Your chosen administrator password now travels through a factory reset on all four Haven models",
    "detail": null,
    "benefit": "The password you chose is still your password after a factory reset, whichever Haven you own.",
    "ref": "254321fbad",
    "features": []
  },
  {
    "id": 708,
    "date": "2026-08-25",
    "theme": "Reliability",
    "impact": 5,
    "summary": "Reset survival is now tested on all four Haven models, not two - and the new test found a real gap",
    "detail": null,
    "benefit": "The promise that a factory reset keeps your settings is now checked on the model you actually own. On two of the four it found the admin password does not come back - caught on the bench, before a single unit ships.",
    "ref": "b437d3abe5",
    "features": []
  },
  {
    "id": 729,
    "date": "2026-08-25",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Version 0.1.90 is built for all four Haven models, signed, and verified against the release key",
    "detail": null,
    "benefit": "Your Haven will only take an update whose signature checks out against Haven's own release key.",
    "ref": "443031c1c1",
    "features": []
  },
  {
    "id": 728,
    "date": "2026-08-25",
    "theme": "Trust & transparency",
    "impact": 4,
    "summary": "The password-reset screen no longer says a code was sent when nothing was sent",
    "detail": null,
    "benefit": "If a reset email cannot go out, you are told on the spot instead of waiting for a code that was never coming.",
    "ref": "5b6f8e23ed",
    "features": []
  },
  {
    "id": 724,
    "date": "2026-08-25",
    "theme": "Trust & transparency",
    "impact": 4,
    "summary": "When Haven is refused a list update it now says so out loud and names which filtering has stopped",
    "detail": null,
    "benefit": "You find out when a kind of filtering is off, instead of owning a router that looks fine while blocking nothing.",
    "ref": "e9fefa25fb",
    "features": []
  },
  {
    "id": 723,
    "date": "2026-08-25",
    "theme": "Reliability & Updates",
    "impact": 4,
    "summary": "A Haven can now keep its filter lists on a plugged-in USB stick and restore them from it instead of re-downloading",
    "detail": null,
    "benefit": "After a reflash or a reset your ad and adult filtering comes straight back from the stick, with no internet and no waiting.",
    "ref": "868bc4ddcb",
    "features": []
  },
  {
    "id": 721,
    "date": "2026-08-25",
    "theme": "Testing & quality",
    "impact": 4,
    "summary": "Restarts now run eight for eight clean on the software test bench, six times faster than before",
    "detail": null,
    "benefit": "Every test we run against Haven now finishes several times faster, so more of the product gets checked before your unit ships.",
    "ref": "f748a3e",
    "features": []
  },
  {
    "id": 720,
    "date": "2026-08-25",
    "theme": "Ad blocking",
    "impact": 4,
    "summary": "A Haven that loses its ad list now refills it within the hour instead of waiting up to a week",
    "detail": null,
    "benefit": "Ad blocking comes back on its own within an hour of anything that wipes the list, instead of leaving you unprotected for days.",
    "ref": "c33dfcbd9a",
    "features": []
  },
  {
    "id": 713,
    "date": "2026-08-25",
    "theme": "Haven Helm",
    "impact": 4,
    "summary": "The off-network setup screen now states the outcome of every enrolment on the spot",
    "detail": null,
    "benefit": "You always know which kind of off-network protection you just set up, and Haven tells you on the spot when a phone needs another try.",
    "ref": "5f434e60a0",
    "features": []
  },
  {
    "id": 711,
    "date": "2026-08-25",
    "theme": "Testing & quality",
    "impact": 4,
    "summary": "A safety test that could quietly switch itself off can no longer do so",
    "detail": null,
    "benefit": "The reset-survival check used a real filter entry as its marker, so on any network that already blocked that entry it skipped - and a skip scored as a pass. It now uses a reserved marker no catalogue ships.",
    "ref": "f8296c0669",
    "features": []
  },
  {
    "id": 709,
    "date": "2026-08-25",
    "theme": "Testing & quality",
    "impact": 4,
    "summary": "Every claim on the features page now has a test behind it",
    "detail": null,
    "benefit": "The live-status screen was the last advertised claim with nothing checking it. Now a running Haven has to prove it is driving that panel with live data before a build can pass.",
    "ref": "7f22b9208d",
    "features": []
  },
  {
    "id": 731,
    "date": "2026-08-25",
    "theme": "Testing & quality",
    "impact": 3,
    "summary": "The test bench can photograph the Haven screen while the screen is asleep",
    "detail": null,
    "benefit": "The bench proves the screen is right on its own, so screen checks run unattended.",
    "ref": "331e96c52f",
    "features": []
  },
  {
    "id": 730,
    "date": "2026-08-25",
    "theme": "Burn procedure & build station",
    "impact": 3,
    "summary": "A Haven updated while keeping your settings now reports the version it is actually running",
    "detail": null,
    "benefit": "The version on the screen matches the software on the unit, so you can tell at a glance whether an update landed.",
    "ref": "b63f8ad9f7",
    "features": []
  },
  {
    "id": 726,
    "date": "2026-08-25",
    "theme": "Security & Trust",
    "impact": 3,
    "summary": "The wifi safety net that falls back to the key shipped in every image now announces itself loudly instead of looking like routine setup",
    "detail": null,
    "benefit": "In the rare case your Haven comes up on the shipped default wifi key rather than your own, the router says so plainly rather than hiding it.",
    "ref": "ad6fcbe",
    "features": []
  },
  {
    "id": 725,
    "date": "2026-08-25",
    "theme": "Filtering & enforcement",
    "impact": 3,
    "summary": "Domains withdrawn from a filter list are now marked rather than erased, so the list can be asked what it looked like on any past day",
    "detail": null,
    "benefit": "If your subscription ever lapses, a factory reset can bring back exactly the protection you paid for, instead of a shorter list.",
    "ref": "07b1fc2",
    "features": []
  },
  {
    "id": 722,
    "date": "2026-08-25",
    "theme": "Off-network filtering",
    "impact": 3,
    "summary": "Haven running as software is now proven to filter a separate machine, not just itself",
    "detail": null,
    "benefit": "The evidence now shows Haven filtering another machine on the network, which is the only claim that matters.",
    "ref": "a758519",
    "features": []
  },
  {
    "id": 710,
    "date": "2026-08-25",
    "theme": "Reliability",
    "impact": 3,
    "summary": "The status screen is now chosen by what it is, not by what plugged in first",
    "detail": null,
    "benefit": "If you have a modem or another USB gadget attached to your Haven, the screen software finds the actual panel instead of streaming pixels at the wrong device.",
    "ref": "7bcd06fd75",
    "features": []
  },
  {
    "id": 705,
    "date": "2026-08-24",
    "theme": "Reliability",
    "impact": 5,
    "summary": "Proved on hardware that a factory reset keeps your settings",
    "detail": null,
    "benefit": "Hold the reset button and the router comes back with your filtering, your devices and your password intact — demonstrated on a real unit, not assumed.",
    "ref": "410",
    "features": []
  },
  {
    "id": 703,
    "date": "2026-08-24",
    "theme": "Filtering",
    "impact": 5,
    "summary": "Added a whole-catalogue audit so every one of the 632 providers is reachable from the template that lists it",
    "detail": null,
    "benefit": "Apply a one-click template and it covers every provider it names — verified across the entire catalogue, on the router's own screen and the website demo alike.",
    "ref": "909317d",
    "features": []
  },
  {
    "id": 704,
    "date": "2026-08-24",
    "theme": "Filtering",
    "impact": 4,
    "summary": "Outrage-farming sites are now one category named for what they do, with each entry's leaning stated",
    "detail": null,
    "benefit": "You can switch off content built to provoke rather than inform, without the filter picking a political side for you — and you can see which way each site leans before you decide.",
    "ref": "909317d",
    "features": []
  },
  {
    "id": 707,
    "date": "2026-08-24",
    "theme": "Reliability",
    "impact": 2,
    "summary": "A single bad frame can no longer end a game run",
    "detail": null,
    "benefit": "Your run ends when you lose it, not when the game trips over itself.",
    "ref": "2d50c11",
    "features": []
  },
  {
    "id": 706,
    "date": "2026-08-24",
    "theme": "Manga / lore",
    "impact": 2,
    "summary": "Every level of the game's first arc now has its own backdrop",
    "detail": null,
    "benefit": "The game stops looking like it is repeating itself, and every level is one you can actually see well enough to play.",
    "ref": "ba89e7e",
    "features": []
  },
  {
    "id": 697,
    "date": "2026-08-23",
    "theme": "Filtering",
    "impact": 5,
    "summary": "Filtering now holds continuously through every settings change",
    "detail": null,
    "benefit": "Your filter stays on duty from the moment you press save — protection runs continuously across every change you make.",
    "ref": "28f1554126",
    "features": []
  },
  {
    "id": 702,
    "date": "2026-08-23",
    "theme": "Testing & quality",
    "impact": 4,
    "summary": "Five automated checks were sharpened to test exactly what they name",
    "detail": null,
    "benefit": "A green test result carries its full weight, because each check now reads the thing it claims to read.",
    "ref": "ed52699",
    "features": []
  },
  {
    "id": 701,
    "date": "2026-08-23",
    "theme": "Trust & transparency",
    "impact": 4,
    "summary": "A strict credential floor now guards every word before it goes public",
    "detail": null,
    "benefit": "Anything resembling a password or a key is held back from the public progress page automatically.",
    "ref": "31fb6ea",
    "features": []
  },
  {
    "id": 700,
    "date": "2026-08-23",
    "theme": "Security & Trust",
    "impact": 4,
    "summary": "The publish list now names exactly what belongs on the website",
    "detail": null,
    "benefit": "Everything the site serves you is real website content.",
    "ref": "0f6fed7",
    "features": []
  },
  {
    "id": 698,
    "date": "2026-08-23",
    "theme": "Reliability & safety",
    "impact": 4,
    "summary": "Reset-survival now re-arms itself on every factory reset",
    "detail": null,
    "benefit": "Every factory reset brings your settings back with it, and sets up the one after that to do the same.",
    "ref": "1230077589",
    "features": []
  },
  {
    "id": 695,
    "date": "2026-08-23",
    "theme": "Testing & quality",
    "impact": 4,
    "summary": "Every automated test now proves which unit it is examining before it runs",
    "detail": "The automated suite gained a standing requirement: every check must read the unit it was asked to examine before it opens a connection, and the test runner refuses to start any check that does not, naming the exact line. Nine checks were brought to that standard in one pass and six more inherited it from a single shared line. Proven with a recorder that logs every destination attempted, and a sweep of the whole suite now passes the requirement with nothing held back.",
    "benefit": "A test result names the unit it came from, so what the suite reports about a Haven is about that Haven.",
    "ref": "f1a939b8cb",
    "features": []
  },
  {
    "id": 699,
    "date": "2026-08-23",
    "theme": "Firmware & overlay",
    "impact": 3,
    "summary": "The Vanilla build now ships with the headroom its settings vault needs",
    "detail": null,
    "benefit": "Every unit arrives ready to store your settings from the moment it leaves the build machine.",
    "ref": "bffb577",
    "features": []
  },
  {
    "id": 696,
    "date": "2026-08-23",
    "theme": "Testing & quality",
    "impact": 3,
    "summary": "Two pre-flight checks learned to recognise a healthy test bench",
    "detail": "The wireless guard now accepts both of the ways a machine reports its radio switched off, verified against six synthetic states where it still refuses the three genuinely unprepared ones. The connectivity canary now reaches for an alternate hardware address when the system has not yet released the first, and only for that one specific condition.",
    "benefit": "A check that refuses only genuinely unsafe conditions is a check people obey, so the guard standing in front of every test run keeps its authority.",
    "ref": "83e362a595",
    "features": []
  },
  {
    "id": 691,
    "date": "2026-08-22",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "The screen's top corner now has a save button and an eject button, each of which tells you what it does when you rest the pointer on it.",
    "detail": null,
    "benefit": "Everything the screen can do is now visible and labelled, instead of being a mouse gesture you had to be told about.",
    "ref": "ff34b9c000",
    "features": []
  },
  {
    "id": 690,
    "date": "2026-08-22",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "A screenshot can no longer be lost: it is always written to the unit first, and only then copied to a USB drive - and the screen tells you which happened.",
    "detail": null,
    "benefit": "Plug a drive in, press the wheel, pull it out - your pictures are on it, and the screen never claims a save that did not happen.",
    "ref": "ff34b9c000",
    "features": []
  },
  {
    "id": 685,
    "date": "2026-08-22",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Self-flashed Olive Green units can now create their settings vault, which a sizing error had made impossible.",
    "detail": null,
    "benefit": "Your settings and history survive a factory reset on every Olive Green, not only the ones built in our shop.",
    "ref": "6fc2ec954e",
    "features": []
  },
  {
    "id": 694,
    "date": "2026-08-22",
    "theme": "Firmware & overlay",
    "impact": 3,
    "summary": "Shipped 0.1.85 to all four Haven editions over the air: the screen keeps a save button and an eject button, captures are far smaller, and a capture can no longer be lost.",
    "detail": null,
    "benefit": "The improvements to the screen reach a unit you already own without you doing anything but accepting the update.",
    "ref": "cdc0723d5b",
    "features": []
  },
  {
    "id": 693,
    "date": "2026-08-22",
    "theme": "Demo page",
    "impact": 3,
    "summary": "The online demo now shows seven real captures taken from a Haven's own 3.5-inch screen, and you can download any of them.",
    "detail": null,
    "benefit": "You can see exactly what the little screen looks like before you own one, instead of taking a drawing's word for it.",
    "ref": "8ec37c5228",
    "features": []
  },
  {
    "id": 689,
    "date": "2026-08-22",
    "theme": "Firmware & overlay",
    "impact": 3,
    "summary": "Screenshots taken from the 3.5-inch screen are now about fifty times smaller, so capturing a run of them no longer eats the unit's memory.",
    "detail": null,
    "benefit": "You can take as many screenshots as you like without worrying about the unit running short of memory.",
    "ref": "ff34b9c000",
    "features": []
  },
  {
    "id": 688,
    "date": "2026-08-22",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "The Screen Haven page shows a photograph of a real unit for the first time, in place of drawn mock-ups.",
    "detail": null,
    "benefit": "You can see what you would actually receive before you buy it.",
    "ref": "6f432f1",
    "features": []
  },
  {
    "id": 687,
    "date": "2026-08-22",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "Screen Haven now tells visitors the display can be captured: press the mouse wheel and the screen is saved as a clean image.",
    "detail": null,
    "benefit": "Reviewers and video makers can take publication-ready pictures straight off the screen, with no capture card.",
    "ref": "52ec5d2",
    "features": []
  },
  {
    "id": 684,
    "date": "2026-08-22",
    "theme": "Firmware & overlay",
    "impact": 3,
    "summary": "A factory reset no longer leaves your Haven believing it is the day the firmware was built.",
    "detail": null,
    "benefit": "Everything your Haven records right after a reset carries the right date, even before it reaches the internet.",
    "ref": "636cfa054f",
    "features": []
  },
  {
    "id": 692,
    "date": "2026-08-22",
    "theme": "Marketing & website",
    "impact": 2,
    "summary": "The milestone history now calls the product by its name throughout, instead of describing it as a router.",
    "detail": null,
    "benefit": "The history reads as the story of a product rather than of a piece of network equipment.",
    "ref": "ff34b9c000",
    "features": []
  },
  {
    "id": 686,
    "date": "2026-08-22",
    "theme": "Firmware & overlay",
    "impact": 2,
    "summary": "The screen now shows a save icon in its top corner, so anyone looking at it knows the display can be captured.",
    "detail": null,
    "benefit": "You can take a picture of any screen with one click of the mouse wheel, and the icon itself never appears in the saved image.",
    "ref": "7caa87c9b6",
    "features": []
  },
  {
    "id": 683,
    "date": "2026-08-21",
    "theme": "Reliability",
    "impact": 4,
    "summary": "The virtual-machine edition of Haven was put through a full factory reset on the bench and came back with its identity and its saved settings intact.",
    "detail": null,
    "benefit": "Every edition of Haven, not just the routers, now has its settings-survival proven on real hardware rather than assumed.",
    "ref": "",
    "features": []
  },
  {
    "id": 681,
    "date": "2026-08-21",
    "theme": "Live-fire findings",
    "impact": 4,
    "summary": "Confirmed on real hardware that your settings, your login, and your saved device list all come back after a factory reset.",
    "detail": "Bench-verified end to end on an Olive Green unit running 0.1.83. Three automated checks now cover the whole path: your filter choices and admin login returning after a reset-button press, the protected-storage layer's own behaviour across 17 separate assertions, and the dedicated storage area plus its contents coming through a full factory reset with a marker confirmed present afterwards. All three run against the shipping firmware and are now permanent members of the standing test regimen, so the guarantee is re-checked on every future release.",
    "benefit": "Confidence that resetting your Haven never costs you the setup you built.",
    "ref": "38d1fe2",
    "features": []
  },
  {
    "id": 682,
    "date": "2026-08-21",
    "theme": "Reliability",
    "impact": 3,
    "summary": "Haven now keeps the correct date and time through a factory reset, so the activity log reads correctly from the moment the router comes back.",
    "detail": null,
    "benefit": "After a reset your activity log shows when things actually happened, instead of dates from months earlier.",
    "ref": "636cfa054f",
    "features": []
  },
  {
    "id": 679,
    "date": "2026-08-21",
    "theme": "Testing & quality",
    "impact": 3,
    "summary": "Confirmed the interactive demo on lulhaven.com matches the current shipped release, feature for feature.",
    "detail": "Audited every change in the seven releases up to 0.1.83 against what the demo presents — the hand-off control and all four filter-evasion categories are present and behave as they do on a real Haven. The demo now states the release it was measured against, and that claim is re-checked automatically before every publish.",
    "benefit": "What you try in the browser is what you get on the router — and the version it names is one somebody actually verified.",
    "ref": "ca58b1b",
    "features": []
  },
  {
    "id": 680,
    "date": "2026-08-21",
    "theme": "Trust & transparency",
    "impact": 2,
    "summary": "Milestones now reach lulhaven.com in the same session they are recorded.",
    "detail": "The milestones page is regenerated and published as part of closing out every working session, so the record you read is the record as it stands.",
    "benefit": "What you see on the milestones page is current, every day we work.",
    "ref": "",
    "features": []
  },
  {
    "id": 678,
    "date": "2026-08-21",
    "theme": "Manga / lore",
    "impact": 2,
    "summary": "Haven's free browser game now changes its setting as you climb through the first chapter — the rooftop view shifts from one city to another as you advance.",
    "detail": "Four backdrops now rotate across the ten levels of chapter one, each a different skyline. Playable in any browser on a phone or a desktop, with nothing to install.",
    "benefit": "More to look at as you play, free, with no app and no sign-up.",
    "ref": "ca58b1b",
    "features": []
  },
  {
    "id": 677,
    "date": "2026-08-20",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Added steps to improve the security of your filters and your login even further.",
    "detail": "Bench-identified on an Olive unit: three opportunities to further secure your filters and your login. All three were taken — an unnecessary data seek removed, password retention strengthened, and backup and restore made more resilient. Shipped in 0.1.83 to all four Haven models.",
    "benefit": "Even more protection around the settings and the login you set up.",
    "ref": "6b54dc8242",
    "features": []
  },
  {
    "id": 674,
    "date": "2026-08-20",
    "theme": "Open source",
    "impact": 4,
    "summary": "Screen Haven, our free status display for the little 3.5-inch router screen, was formally submitted to the open-source community's shared package library and accepted for review.",
    "detail": null,
    "benefit": "The screen software is free for anyone to install, and Haven's work is now visible to the wider open-source world.",
    "ref": "67e426a",
    "features": []
  },
  {
    "id": 676,
    "date": "2026-08-20",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "Haven's free browser game got a second chapter: after the city rooftop, the fight moves to the floor of a hospital, an airport, a train station and a city traffic control room, where little robotic vacuums carrying Haven hunt down infections before they reach the router they are protecting.",
    "detail": "The new chapter opens with Haven explaining why two of them in one building can never keep up, and what they do about it. A five-second animated cold open plays before the level starts. Your score carries straight through from the first chapter instead of resetting, and a second vacuum joins you partway in, going after whatever you are not covering.",
    "benefit": "More of the Haven story, free and in a browser, with no app to install and nothing to sign up for.",
    "ref": "0d73cd3",
    "features": []
  },
  {
    "id": 675,
    "date": "2026-08-20",
    "theme": "Website",
    "impact": 3,
    "summary": "Gave the Haven comics their own home page, Manga Haven, so one button opens the whole story instead of three buttons crowding the page.",
    "detail": null,
    "benefit": "Readers find every chapter in one place, and the page is less cluttered on a phone.",
    "ref": "67e426a",
    "features": []
  },
  {
    "id": 673,
    "date": "2026-08-20",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "Released Screen Haven: a free, open-source status display package for routers — seven live screens carrying the Haven brand mark — plus a product page on lulhaven.com showcasing it.",
    "detail": "Open-core split locked: the commodity display engine is MIT-licensed and public; Haven's filtering, content, and brand stay private. Builds to a real installable package (proven on x86-64) with bandwidth, system, network, devices, clock, and about screens; the About screen is an honest QR signpost to lulhaven.com, never a decoy. Upstream package submission staged; website page committed, in the site nav.",
    "benefit": "Anyone with a compatible router can experience Haven's polish for free, and every screen carries a signpost to the full product.",
    "ref": "d7b1b88292",
    "features": []
  },
  {
    "id": 672,
    "date": "2026-08-19",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Shipped 0.1.82: the router's 3.5-inch status screen can capture itself. Middle-click the deck and it saves the live screen as a downloadable image — grab it from the web dashboard (Helm) or straight onto a plugged-in USB drive. Universal drive-format support (exFAT and HFS+ added) means a thumb drive from Windows, macOS, or Linux just works, and the router never has to format anything.",
    "detail": null,
    "benefit": "Reviewers and customers can capture and share a real snapshot of Haven's live filtering and throughput screen — proof of what the router is actually doing, taken straight off the hardware, no phone camera needed.",
    "ref": "29bfe9e",
    "features": []
  },
  {
    "id": 670,
    "date": "2026-08-19",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Shipped 0.1.80 with password recovery: if you forget your Haven admin password, a factory reset now reveals a 'Reset Haven password' button on the login screen. Prove it's you with a PIN you set ahead of time or a printed recovery code, then choose a new password — so a forgotten password can never permanently lock you out of your own router. The release also restores ad- and tracker-blocking and gives every Haven a uniquely-named Wi-Fi network out of the box.",
    "detail": null,
    "benefit": "A forgotten password can no longer strand you from your own network, your Haven is easy to tell apart from any other network nearby, and ad and tracker blocking works properly again for the customers who switch it on.",
    "ref": "#397",
    "features": []
  },
  {
    "id": 671,
    "date": "2026-08-19",
    "theme": "Firmware & overlay",
    "impact": 3,
    "summary": "Released 0.1.81, a reliability pass that closes gaps where shipped features were not fully wired: blocked ad and tracker connections are now severed instantly instead of lingering on an already-open page, and every unit's automatic settings backup keeps running so a factory reset restores your current setup rather than the day it was first configured.",
    "detail": null,
    "benefit": "The protection you pay for behaves the way it should — ads and trackers are cut the moment they are blocked, and your settings stay continuously and safely backed up.",
    "ref": "4c3c1e3a98",
    "features": []
  },
  {
    "id": 666,
    "date": "2026-08-18",
    "theme": "Firmware & overlay",
    "impact": 5,
    "summary": "0.1.78 also rescued three finished-but-never-shipped protections: the hand-off wipe that really erases, the reset-surviving vault (a factory reset recovers your setup instead of erasing your life), and Helm's new filter categories for VPN/DNS filter-evasion apps. A permanent tripwire now stops finished work from stranding again.",
    "detail": null,
    "benefit": "Selling or resetting your Haven is now safe by default, and finished protections can no longer silently miss the release train.",
    "ref": "981bc8f",
    "features": []
  },
  {
    "id": 665,
    "date": "2026-08-18",
    "theme": "Firmware & overlay",
    "impact": 5,
    "summary": "Shipped 0.1.78: the router's 3.5\" screen gained a Plain English card — an AI-written, on-router explanation of network health. Zero bytes leave the customer's network; works with the internet down.",
    "detail": null,
    "benefit": "Metrics become sentences anyone can read, without sending a single byte of your network's story to anyone — including us.",
    "ref": "43aa775",
    "features": []
  },
  {
    "id": 668,
    "date": "2026-08-18",
    "theme": "Process & discipline",
    "impact": 4,
    "summary": "Completed full redundancy for the firmware release-signing keys: a printed recovery copy in the safe plus three encrypted copies in separate systems, all hash-verified identical.",
    "detail": null,
    "benefit": "The keys that guarantee every update really came from Haven can now survive fire, theft, or a forgotten passphrase — your Haven's trust anchor is protected for the long haul.",
    "ref": "359c2b0a",
    "features": []
  },
  {
    "id": 667,
    "date": "2026-08-18",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Shipped 0.1.79 same day: the screen now finds its hardware on any USB port and heals itself after unplugs, crashes, and reboots — plus a screenshot channel that lets support see the screen remotely when you ask for help.",
    "detail": null,
    "benefit": "Plug it in any port, any order — the screen just works, and keeps working.",
    "ref": "aa4c92d",
    "features": []
  },
  {
    "id": 669,
    "date": "2026-08-18",
    "theme": "Process & discipline",
    "impact": 3,
    "summary": "Audited every customer-facing screen in the shipped 0.1.79 firmware byte-by-byte — login, control panels, block page — confirming each one renders Haven's version, closing the class of bug where a theme silently replaces a page.",
    "detail": null,
    "benefit": "What you see on your Haven is provably what we built — every screen verified against the exact bytes we shipped.",
    "ref": "359c2b0a",
    "features": []
  },
  {
    "id": 661,
    "date": "2026-08-17",
    "theme": "Process & discipline",
    "impact": 4,
    "summary": "Worked the frozen backlog in one autonomous evening pass under a new rule — a 'needs Dave' answer means rewrite the prompt, not stop: eight items closed and six more built, staged, and verified in under two hours.",
    "detail": "Closed: haven-seek concept search, /api/redeem endpoint, download-flow beacon strip, overlay back-port, stale-fix sweeps (,,,). Staged+verified: consent screen, intake rewrite, offnet enrollment pieces. Copy overclaim scoped to 'actively filtered' (/).",
    "benefit": "Open items stop waiting on meetings; the backlog shrinks on its own, and the ship date gets protected instead of pushed.",
    "ref": "65ae767430",
    "features": []
  },
  {
    "id": 660,
    "date": "2026-08-17",
    "theme": "Marketing & website",
    "impact": 4,
    "summary": "The router's actual display firmware — the same C program the hardware runs — now runs live in the browser on the 'Give Haven back its head' page. Visitors wheel through the screens, run the speed test, and unlock the owner ring with the shuffled keypad, exactly as on the glass.",
    "detail": null,
    "benefit": "The display demo is the firmware itself, not a video or mockup — a trust statement a screenshot can't make.",
    "ref": "c7771bb94b",
    "features": []
  },
  {
    "id": 663,
    "date": "2026-08-17",
    "theme": "Customer features (website)",
    "impact": 3,
    "summary": "The Challenge download flow now runs end to end: detect your hardware, sign off, redeem a code, download — with the consent screen wired to live release metadata instead of placeholders.",
    "detail": "'Get on the list' replaced by a 3-step flow (detect, verdict/sign-off, delivery-of-code); a manual hardware chooser covers the no-detector path; /api/redeem endpoint with a pure logic core (9/9 tests); kyc.js stripped so nothing beacons before consent. Eyes-on verified via the browser test framework. Staged, not in the publish path.",
    "benefit": "Contestants get their firmware through one clear, consent-first path instead of a mailing-list promise.",
    "ref": "6405234000",
    "features": []
  },
  {
    "id": 662,
    "date": "2026-08-17",
    "theme": "Off-network filtering",
    "impact": 3,
    "summary": "Built the off-network enrollment pipeline: a claim-queue endpoint on the relay plus a router-side poller, authenticated so the enrollment secret never leaves the router.",
    "detail": "Decision 1A: /api/offnet-claim queue endpoint with bearer auth derived as HMAC(secret, serial); the router long-polls the claim queue over the tunnel and posts the pairing payload on match. 9/9 node tests including JS-to-shell HMAC construction match. Staged-inert.",
    "benefit": "Phones and laptops will be able to keep Haven's protection when they leave your network, through a pairing flow that cannot leak the key that guards it.",
    "ref": "e24589d5e7",
    "features": []
  },
  {
    "id": 658,
    "date": "2026-08-17",
    "theme": "Product definition",
    "impact": 3,
    "summary": "Rewrote the router status-screen demo in lean C: all 18 screens now run live on the real panel from binaries totaling about 150 KB, replacing a stack measured at over 9 MB.",
    "detail": "Footprint audit with measured receipts: vanilla the router firmware bake 10.7 MB, Haven 0.1.76 at 37.4 MB, the C deck about 150 KB. Includes credentials gate with shuffled keypad, QR pairing, live speed/weather/gamer screens, idle screensaver, and a per-process memory collector. Bench work only — the product build stays behind the backlog freeze.",
    "benefit": "A status screen this small fits the router's tight storage without crowding out the filtering features you bought it for.",
    "ref": "ce8ceb4",
    "features": []
  },
  {
    "id": 656,
    "date": "2026-08-17",
    "theme": "Bypass resistance",
    "impact": 3,
    "summary": "Helm now lists the new filter-evasion categories by name -- DDNS tunneling, encrypted-DNS resolvers, SmartDNS services, and free VPN apps -- each with a plain-language explanation of what it covers.",
    "detail": null,
    "benefit": "You can see and choose exactly which evasion routes are closed on your network, instead of trusting a vague 'bypass' switch.",
    "ref": "3f67324504",
    "features": []
  },
  {
    "id": 655,
    "date": "2026-08-17",
    "theme": "Product definition",
    "impact": 3,
    "summary": "Prototyped a small status screen for the router: a working bench demo cycling through network health, per-port activity, live speed, and connection status on real display hardware.",
    "detail": "Overnight deep dive settled the recommended six screens, the depth verdict, and the privacy rules the display must follow; the bench demo proves the panel hardware works end to end. Product build is deliberately gated behind the current backlog freeze.",
    "benefit": "A glanceable screen on the router itself means you can see your network is healthy without opening an app.",
    "ref": "0461a77ae5",
    "features": []
  },
  {
    "id": 664,
    "date": "2026-08-17",
    "theme": "Tooling & infrastructure",
    "impact": 2,
    "summary": "Built haven-seek, a concept search engine over Haven's design surfaces — ask in plain words, get the sections that already cover the idea, even when no keyword matches.",
    "detail": "FTS5/porter/BM25 over section-granular chunks with w2vgrep query expansion; indexes 3,376 chunks in 0.3 seconds; all three acid tests pass (reset/factory, config-inject-the DNS layer, subscription-lapse).",
    "benefit": "Design decisions stop getting remade from scratch because the earlier answer could not be found.",
    "ref": "c96bc548c8",
    "features": []
  },
  {
    "id": 657,
    "date": "2026-08-17",
    "theme": "Website / Marketing",
    "impact": 2,
    "summary": "lulhaven.com pages now share one navigation header and footer, stamped automatically at build time so no page can drift out of date.",
    "detail": "Also added a Halloween tribute page (head.html): the Headless Horseman in monochrome with a burning jack-o'-lantern, tagline 'Do you know what your network is doing?', linked from a third pill on the home page.",
    "benefit": "Wherever you land on the site, the same menu takes you to the demo, features, benefits, and milestones in one click.",
    "ref": "9af4f9ec9c",
    "features": []
  },
  {
    "id": 654,
    "date": "2026-08-15",
    "theme": "Reliability & safety",
    "impact": 3,
    "summary": "Added an internal alarm that fires if the router's SNI-inspection queue starts backing up, instead of failing silently.",
    "detail": null,
    "benefit": "Catches a filtering slowdown before it becomes a customer-visible problem.",
    "ref": "9f03faa1b1",
    "features": []
  },
  {
    "id": 653,
    "date": "2026-08-15",
    "theme": "Manga / lore",
    "impact": 2,
    "summary": "The Haven game now has a story beat between levels -- Al's cold-open intro and a mock-ad break, both fully pausing gameplay until the player is ready to continue.",
    "detail": "New between-level screen sequence: Al's cold-open flash leads into an illustrated mock-ad beat; clicking the ad opens lulhaven.com in a new tab and swaps the countdown for a manual Continue button so the run stays paused until the player comes back on their own. Escape/returnToGate cleans up both timers so a mid-screen exit can't leave the next run stuck.",
    "benefit": "Adds personality and pacing to the game instead of levels running back-to-back.",
    "ref": "d2a8887a",
    "features": []
  },
  {
    "id": 652,
    "date": "2026-08-15",
    "theme": "Reliability",
    "impact": 2,
    "summary": "Cleaned up the flagged-attempt report so it shows only real blocked attempts from devices on your network, not the router's own routine self-check.",
    "detail": null,
    "benefit": "Your flagged-attempt report now shows only real blocked attempts from devices on your network.",
    "ref": "44727b17bb",
    "features": []
  },
  {
    "id": 651,
    "date": "2026-08-13",
    "theme": "Security & Trust",
    "impact": 4,
    "summary": "Haven's admin sign-in password is now derived per router from its own unique key.",
    "detail": "Extends the root web-backdoor rekey design (locked earlier) to the haven admin account: install-haven.sh now derives it from a separate per-unit key instead of reusing the shared bootstrap constant. Closes whetstone.",
    "benefit": "Each router's admin password is unique to that router by design, making it more secure.",
    "ref": "5c5c1dc025",
    "features": []
  },
  {
    "id": 650,
    "date": "2026-08-12",
    "theme": "Testing & quality",
    "impact": 4,
    "summary": "Haven's filtering passed its first real accuracy test -- zero mistaken blocks across 500 known-safe sites.",
    "detail": "Built a measurement harness that runs the real the content-filtering module module against a real generated config and queries it with dig, rather than a mock. Tested a hand-verified ad-tech list (36.7% blocked, 11/30) and a must-not-block Tranco top-500 snapshot (0 true false positives after removing ad-tech infrastructure Haven deliberately blocks from the corpus). Honest limitations logged: feed snapshot ~3.5 months stale, DNS-layer only, 2 of 37 categories tested, dev-box conditions not real customer network. Whetstone (harness) and (publish methodology) apply; publishing any percentage is gated by the accuracy-claim-strategy decision (raw counts over a weak percentage) made the same day.",
    "benefit": "We now have real, tested evidence for how well Haven's filtering actually works, and proof it doesn't wrongly block sites you visit every day -- not just a claim.",
    "ref": "",
    "features": []
  },
  {
    "id": 649,
    "date": "2026-08-12",
    "theme": "Ad & Tracker Blocking",
    "impact": 4,
    "summary": "Haven's ad and tracker blocklist now ships complete, direct from our own server -- 157,000+ additional domains now reaching every router.",
    "detail": "Built a dedicated blocklist_domains table + sync/export pipeline (sync-blocklist-domains.py, export_blocklist_ads_db.py/delta.py) separate from the main <database>, after finding <database>'s own export script had been silently excluding these 157,606 domains to stay under Cloudflare's 25MiB asset limit. Rewrote the router-side fetch-ads.sh to match the existing delta-then-full sync pattern. Tested end-to-end (full sync, delta sync, tombstone round-trip) against real exported data; not yet run on physical hardware or included in a build. Commits: router /, data ///, website..",
    "benefit": "Every domain we curate is actually in your filter, and no third party ever sees which lists your Haven pulls.",
    "ref": "abe295d",
    "features": []
  },
  {
    "id": 647,
    "date": "2026-08-12",
    "theme": "Reliability & safety",
    "impact": 4,
    "summary": "Hardened security on the router's admin pages and the website's login and export.",
    "detail": "Fixed: router-side code %q used as SQL quoting (not SQL-safe) let a hostname containing a quote break a schedule query; an unvalidated display name written into <system auth file> and rendered unescaped in the admin user list; timing-unsafe password compare on the website's <admin tool>enance login; CSV export allowed spreadsheet-formula injection via attacker-controlled email. Same pattern fixed identically in the downstream build overlay tree; build/flash/capture tooling hardened (image size+md5 verified before flashing, concurrent-build lock added, silent DB-failure version fallback removed).",
    "benefit": "Your Haven's admin pages and lulhaven.com are hardened against code-injection and timing attacks.",
    "ref": "9d87ad35c9",
    "features": []
  },
  {
    "id": 648,
    "date": "2026-08-12",
    "theme": "Trust & transparency",
    "impact": 3,
    "summary": "Corrected our site copy to accurately describe Haven's default filtering settings and update schedule.",
    "detail": null,
    "benefit": "The website accurately describes what your Haven does.",
    "ref": "8914fb3a0a",
    "features": []
  },
  {
    "id": 646,
    "date": "2026-08-10",
    "theme": "Product definition",
    "impact": 3,
    "summary": "Routers now stop pulling fresh block-list updates automatically once a subscription lapses or was never started",
    "detail": "New check-entitlement.sh gate sourced into fetch-feed.sh (overlay + package copies): checks a cached entitlement state (1hr TTL) against the router's own serial, fails open on connectivity trouble, fails closed (skip fetch, keep cached lists) when genuinely unentitled or unregistered. Not yet hardware-verified -- needs a Fuego/Shakedown pass.",
    "benefit": "Filtering keeps working exactly as it always has on the lists you already have; fresh updates simply pause until your subscription is active again.",
    "ref": "eba8d8d",
    "features": []
  },
  {
    "id": 645,
    "date": "2026-08-08",
    "theme": "Marketing & website",
    "impact": 4,
    "summary": "Built the customer registration and checkout flow, the system that turns a router's serial number into an active subscription, and verified the whole path end to end in a real test run: sign up, pay, and have your Haven recognized as entitled.",
    "detail": "Register + checkout endpoints, subscription/customer schema, entitlement check wired to router-side downloads, contest-claim bridge into registration. Verified via real local Workers runtime (not code review): fresh-serial registration, checkout writing the row, entitlement read-back, squad options, already-registered handling. Not yet deployed to the live site; Stripe live keys and a Hearst publish are still needed before real customers can use it.",
    "benefit": "This is the missing link between a Haven in a box and a Haven actually filtering your network on your plan. Once it's switched on for real customers, registering a router and starting a subscription will just work.",
    "ref": "2ea264fbd1",
    "features": []
  },
  {
    "id": 643,
    "date": "2026-08-08",
    "theme": "Reliability & safety",
    "impact": 4,
    "summary": "Hardened how your Haven manages network address settings, keeping automatic address handout (DHCP) rock-solid for every device on your network.",
    "detail": "Root cause: a stored network address field sometimes carried a routing suffix (CIDR notation, e.g. /24) that downstream code expected to be a bare address. Found live on hardware during bench troubleshooting, fixed the first two instances, then a full sibling-pattern sweep of Haven's own code and the underlying the router firmware tree confirmed no further occurrences remained.",
    "benefit": "Your devices reliably get online after a settings change or reset.",
    "ref": "5d6bca5647",
    "features": []
  },
  {
    "id": 644,
    "date": "2026-08-08",
    "theme": "Product definition",
    "impact": 3,
    "summary": "Finalized how Haven's subscription pricing, multi-router discounts, and account recovery work.",
    "detail": "Reconciled a long chain of earlier, sometimes-conflicting pricing decisions by date (newer wins); locked a new multi-subscription discount with anti-gaming protections found and fixed during design; designed a self-service password-recovery flow offering a choice of verification methods after a factory reset.",
    "benefit": "Customers get a consistent, honest pricing story (with a real discount for running more than one Haven) and a way back into a forgotten account that doesn't depend on calling anyone.",
    "ref": "",
    "features": []
  },
  {
    "id": 642,
    "date": "2026-08-07",
    "theme": "Reliability & safety",
    "impact": 3,
    "summary": "Strengthened protections for the built-in recovery account in the admin panel.",
    "detail": "Closed a gap where a second admin account could delete the built-in 'haven' recovery account; it now gets the same protection the root account already had.",
    "benefit": "Your way back in after a factory reset always stays intact.",
    "ref": "8773d8e1a9",
    "features": []
  },
  {
    "id": 641,
    "date": "2026-08-07",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "The Haven game now has a real difficulty ladder — ten levels to climb, gnome rewards along the way, and clearer instructions for lining up your shot.",
    "detail": "Ported V1's 10-level difficulty campaign and gnome reward system onto the AR interaction demo; replaced the old time-survival mode with count-based levels; restored the crosshair-trim aiming instructions that had gone missing from onboarding.",
    "benefit": "Players get a game that grows with them instead of a flat timer, with a payoff for sticking with it.",
    "ref": "e8598f0764",
    "features": []
  },
  {
    "id": 637,
    "date": "2026-08-06",
    "theme": "Reliability & Updates",
    "impact": 5,
    "summary": "Haven firmware 0.1.71 went live for all four models, and the first real over-the-air update ran end to end: a production router took itself from 0.1.69 to 0.1.71 through the same signed channel every customer will use.",
    "detail": null,
    "benefit": "Your Haven keeps itself current: fixes arrive over the air, verified against Haven's signature, without you touching a cable.",
    "ref": "866a045af9",
    "features": []
  },
  {
    "id": 634,
    "date": "2026-08-06",
    "theme": "Reliability & Updates",
    "impact": 5,
    "summary": "Strengthened our internal nightly build jobs.",
    "detail": "Every Haven router spreads its nightly work across a random minute so the whole fleet does not hit our servers at once. That random minute was being computed from a number far too large for the router's small shell to handle, and it came out as minus one. Minus one is not a minute, so the router's scheduler threw the whole line away — silently. Four jobs died with it: the blocklist refresh, the adult-list refresh, the update check, and the watchdog that is supposed to notice when something has stopped. Measured on the bench unit, not reasoned about: the first explanation we had was wrong and was thrown out after the box was asked directly.",
    "benefit": "Every Haven we ship has its background update jobs verified working before it ever reaches a customer.",
    "ref": "",
    "features": []
  },
  {
    "id": 639,
    "date": "2026-08-06",
    "theme": "Trust & transparency",
    "impact": 4,
    "summary": "We implemented the complete erase workflow for the 'Hand this unit to someone else' button and validated it works reliably before a single customer ever pressed it.",
    "detail": null,
    "benefit": "Problems get caught and fixed on our bench, before they ever reach you.",
    "ref": "",
    "features": []
  },
  {
    "id": 638,
    "date": "2026-08-06",
    "theme": "Product definition",
    "impact": 4,
    "summary": "We locked the design that makes a factory reset useless as an escape hatch: one export file that backs up your settings, moves them to a new router, enters the contest, and survives a reset — with every choice about what to share made by you, at import time.",
    "detail": null,
    "benefit": "Pressing the reset button hands back a router with the same filters, the same users, and the same passwords it had before — and your backups stay yours, encrypted under your passphrase.",
    "ref": "",
    "features": []
  },
  {
    "id": 636,
    "date": "2026-08-06",
    "theme": "Process & discipline",
    "impact": 4,
    "summary": "Strengthened our internal development tools.",
    "detail": "A long working session periodically compresses its own memory, and until now that could happen automatically, with nobody watching, throwing away anything not yet written to disk. There is now an interlock: before any compaction, manual or automatic, the state is pushed to safe storage, the fill level is reported as a real number rather than a guess, and any work that is sitting unsaved is named out loud so it survives the boundary. If unsaved work looks like it contains a credential, the compaction is refused outright.",
    "benefit": "Findings about the routers stay on the record, from discovery through to the fix.",
    "ref": "",
    "features": []
  },
  {
    "id": 635,
    "date": "2026-08-06",
    "theme": "Manga / lore",
    "impact": 4,
    "summary": "The Haven game grew a tutorial, a villain you cannot lose track of, and something to lose.",
    "detail": "The opening screen now explains the story instead of assuming what you are holding: Al notices IP42 is getting faster and builds an interface that gives it a face, so Haven can be told which one to deal with first. The creature blinks pure white for a single frame — and blinks faster the closer it gets — so it can be picked out against a bright city instead of hunted for on the radar. The radar itself waves for attention early and then stops once you have found it. And there is now an integrity bar: anything that reaches you takes a bite out of it, and at zero the screen reads OVERRUN.",
    "benefit": "The demo now teaches itself. Anyone can be handed one link, on any device, and the game works out what they are holding rather than guessing.",
    "ref": "631a0f6",
    "features": []
  },
  {
    "id": 632,
    "date": "2026-08-06",
    "theme": "Manga / lore",
    "impact": 4,
    "summary": "The game's enemy got a face. The thing you shoot at is now a living, shifting shape — a translucent body with a glowing core that never holds the same outline twice — seen the way a soldier sees through a night scope, in green.",
    "detail": "Each target carries its own readout: how far away it is in metres and what compass bearing it sits on, printed right at its brackets so two targets on screen can never be confused for one another. LOCK appears only when the crosshair is actually inside the shape, not merely near it. Targets now arrive one at a time, a few seconds apart, and grow as they close the distance — how long they take to arrive is the difficulty dial. The game also plays on a computer now, with the arrow keys to look around and the mouse wheel to zoom.",
    "benefit": "Haven's story is what makes people remember a filtering router, and a story needs something to fight. The virus now looks like something worth being afraid of, and the display around it reads like a real instrument instead of a cartoon.",
    "ref": "be9cb071c7",
    "features": []
  },
  {
    "id": 633,
    "date": "2026-08-06",
    "theme": "Testing & quality",
    "impact": 3,
    "summary": "The game only shows a compass bearing it actually measured. When the phone has no magnetometer, or the browser refuses it, the heading is clearly labelled as simulated.",
    "detail": "The honest-label check was originally written to fire only when a sensor looked absent — and a test browser that claims to have a compass it does not have defeated it completely, so a made-up bearing was printed as if measured. The label is now always printed, one way or the other. The same day turned up a second invisible fault: the code that gives the creature its texture was returning the same number every time, so two rounds of tuning were spent adjusting something that was not doing anything.",
    "benefit": "Haven sells trust: where a reading is estimated rather than measured, the game says so plainly, every time.",
    "ref": "",
    "features": []
  },
  {
    "id": 640,
    "date": "2026-08-06",
    "theme": "Session continuity",
    "impact": 2,
    "summary": "Strengthened our internal development workflow.",
    "detail": null,
    "benefit": "A working session closes and publishes its results with a single, reliable command.",
    "ref": "6c34cf17",
    "features": []
  },
  {
    "id": 631,
    "date": "2026-08-05",
    "theme": "Manga / lore",
    "impact": 4,
    "summary": "The Haven game became playable on a real phone. You aim by moving the phone itself, nudge the aim point with your thumb, and it fires on its own once you hold steady on a target.",
    "detail": "Aiming was smoothed so the view stops jittering when the phone is held still, and a small map in the corner shows where you are looking within the whole scene. Dave played it end to end and cleared every target.",
    "benefit": "The game that carries Haven's story is no longer a demo of one motion — it is something a person can pick up and play, which is what makes the story spread.",
    "ref": "3739b8f2b1",
    "features": []
  },
  {
    "id": 630,
    "date": "2026-08-05",
    "theme": "Trust & transparency",
    "impact": 3,
    "summary": "Thirty-six invitations went out to prospective Haven Challenge judges.",
    "detail": null,
    "benefit": "The Challenge needs independent judges who are not us. These are the first real invitations.",
    "ref": "a8d7765",
    "features": []
  },
  {
    "id": 629,
    "date": "2026-08-05",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "The Haven game's augmented-reality view was proven on a real phone: move the phone, and the world moves behind a fixed crosshair.",
    "detail": "The phone's motion axes were read directly off the running page over a network debug link rather than taken from the specification, which had been wrong three times. An eighteen-second recording confirmed the painted position matched the predicted position on every sample.",
    "benefit": "Before committing to an AR game we built the smallest thing that could disprove it — a working pan on a real handset, measured rather than assumed.",
    "ref": "2e59bde",
    "features": []
  },
  {
    "id": 628,
    "date": "2026-08-05",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "The Milestones page now shows every milestone by default, newest first.",
    "detail": null,
    "benefit": "The Milestones page shows everything by default, newest first, unless you choose to narrow it.",
    "ref": "825973f",
    "features": []
  },
  {
    "id": 627,
    "date": "2026-08-05",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "Improved website caching on lulhaven.com so updates show up right away.",
    "detail": null,
    "benefit": "What you read on lulhaven.com is always exactly what we published.",
    "ref": "a405cf1f9f",
    "features": []
  },
  {
    "id": 626,
    "date": "2026-08-04",
    "theme": "Filtering",
    "impact": 4,
    "summary": "Haven now mirrors its filter lists onto its own server.",
    "detail": "Every list is checked against its own previous size before anything is published; a list that comes back short or empty is rejected on its own and the last good copy is kept. If too many fail at once, the whole update is thrown away rather than shipped.",
    "benefit": "Filter updates come directly from Haven's own server, keeping your categories consistently up to date.",
    "ref": "7e68cea3ca",
    "features": []
  },
  {
    "id": 625,
    "date": "2026-08-03",
    "theme": "Trust & transparency",
    "impact": 4,
    "summary": "The full rules for the Haven Halloween Challenge are now published and readable by anyone.",
    "detail": null,
    "benefit": "You can see exactly what counts as a finding, how entries are judged, and what the prizes are before you decide whether to take part.",
    "ref": "eb859bb",
    "features": []
  },
  {
    "id": 624,
    "date": "2026-08-01",
    "theme": "Demo page",
    "impact": 3,
    "summary": "The demo now shows Haven's blocked-connection counts and explains U-Haven on tap",
    "detail": null,
    "benefit": "On ad and tracker categories you can see per-provider Blocked counts — the concrete work Haven does — and a Details button explains device-specific U-Haven enforcement without needing hover tooltips.",
    "ref": "05fb72b",
    "features": []
  },
  {
    "id": 623,
    "date": "2026-08-01",
    "theme": "Customer features (website)",
    "impact": 3,
    "summary": "Improved how the Helm reports failed update checks.",
    "detail": null,
    "benefit": "If you're signed out, it takes you to the sign-in page; if your internet is down, it tells you plainly.",
    "ref": "82c75d2",
    "features": []
  },
  {
    "id": 621,
    "date": "2026-07-30",
    "theme": "Filter strategies",
    "impact": 5,
    "summary": "Haven now does nothing at all until you ask it to. With no filters turned on, a Haven behaves exactly like the same router without Haven — your devices reach the internet, and the DNS settings you chose, untouched.",
    "detail": "Every enforcement layer — DNS redirection, encrypted-DNS blocking, VPN and Tor blocking, connection inspection — now switches off completely when nothing is being filtered, and switches back on the moment you filter anything. Verified on real hardware from a device behind the router: with filters off it reached the resolver it asked for and encrypted DNS worked; with one filter on, everything clamped again.",
    "benefit": "You decide what gets filtered. Until you do, Haven stays out of the way — no blocking, no redirecting, nothing you can notice.",
    "ref": "c832a345c0",
    "features": []
  },
  {
    "id": 622,
    "date": "2026-07-30",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "The update arrived the way a customer's would: a signed release published, the router noticed it on its own, and one button press installed it.",
    "detail": "Both Haven models were built to the same release on the same day, so the entry model no longer trails behind.",
    "benefit": "Improvements reach your Haven without a computer, a cable, or a file to find — your Haven checks, tells you, and updates itself when you say go.",
    "ref": "c217605",
    "features": []
  },
  {
    "id": 619,
    "date": "2026-07-29",
    "theme": "Marketing & website",
    "impact": 4,
    "summary": "Improved the accuracy of the Haven Challenge pages.",
    "detail": null,
    "benefit": "Every finding stays credited to the version it was found on, and the published rules match the contest you actually enter.",
    "ref": "6d81a02",
    "features": []
  },
  {
    "id": 618,
    "date": "2026-07-29",
    "theme": "Product definition",
    "impact": 4,
    "summary": "Take part in the Haven Challenge using a ready-to-run virtual machine on the computer you already have.",
    "detail": null,
    "benefit": "You can put Haven to the test today without buying hardware or reflashing anything you depend on",
    "ref": "8532fbf",
    "features": []
  },
  {
    "id": 617,
    "date": "2026-07-29",
    "theme": "Product definition",
    "impact": 4,
    "summary": "The Haven Challenge was pinned to a real calendar: applications through August, Haven available to everyone from September 1, the contest running the whole of October and closing on Halloween, winners announced November 13",
    "detail": null,
    "benefit": "Anyone who wants to test Haven knows exactly when to sign up, when they can get it, and how long they have",
    "ref": "91906e3",
    "features": []
  },
  {
    "id": 616,
    "date": "2026-07-29",
    "theme": "Marketing & website",
    "impact": 4,
    "summary": "Improved how the site displays the launch and Challenge dates.",
    "detail": null,
    "benefit": "You can see exactly how long until Haven is available and until the Challenge opens, without hunting for dates",
    "ref": "6d81a02",
    "features": []
  },
  {
    "id": 620,
    "date": "2026-07-29",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "The Challenge now has a name and a published schedule: the Haven Halloween Challenge opens October 1, closes on Halloween night, and names winners on November 13 — with seasonal artwork and a lightning flash when the closing date scrolls into view.",
    "detail": "The page previously showed a countdown but never stated the contest dates anywhere, and still described a superseded seven-day format.",
    "benefit": "Anyone considering the Challenge can finally see when it starts and when it ends, instead of only a countdown with no dates attached.",
    "ref": "0b4d435097",
    "features": []
  },
  {
    "id": 613,
    "date": "2026-07-27",
    "theme": "Trust & transparency",
    "impact": 4,
    "summary": "Published lulhaven.com/source: the complete open-source position — exact pinned revisions, build config downloads, the written source offer, and attribution for every third-party dataset",
    "detail": null,
    "benefit": "Anyone can verify exactly what open software is inside their router and get its source — the transparency a trust product owes",
    "ref": "be2d149",
    "features": []
  },
  {
    "id": 611,
    "date": "2026-07-27",
    "theme": "Demo page",
    "impact": 4,
    "summary": "Political-commentary filtering is now three separate switches you choose between, so Haven sorts by tone rather than deciding what is true.",
    "detail": null,
    "benefit": "You decide which side, both sides, or neither gets filtered on your network — Haven does not take a position for you",
    "ref": "session",
    "features": []
  },
  {
    "id": 615,
    "date": "2026-07-27",
    "theme": "Trust & transparency",
    "impact": 3,
    "summary": "Added a standard security-disclosure channel (security.txt) so researchers can reach us privately",
    "detail": null,
    "benefit": "A published, monitored path for reporting vulnerabilities — problems reach us before they reach anyone else",
    "ref": "2ff5e2b",
    "features": []
  },
  {
    "id": 614,
    "date": "2026-07-27",
    "theme": "Demo page",
    "impact": 3,
    "summary": "Demo exports now use the real router's configuration file format — settings built in the demo import straight into a Haven",
    "detail": null,
    "benefit": "Try filters in the browser, keep the file, and load the same choices onto your Haven when it arrives",
    "ref": "8b91aa4",
    "features": []
  },
  {
    "id": 612,
    "date": "2026-07-27",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "Administrator names now accept spaces and capitals — type 'Roberta in Shipping' and Haven works out the sign-in name for you",
    "detail": null,
    "benefit": "You name people the way you actually say their names, and capitals or spaces never stop anyone signing in",
    "ref": "5046704aff",
    "features": []
  },
  {
    "id": 610,
    "date": "2026-07-27",
    "theme": "Demo page",
    "impact": 3,
    "summary": "Haven's content list is now organised in three plain layers — Sections hold Categories, Categories hold the individual sites and services you switch on or off",
    "detail": null,
    "benefit": "You can work as broadly or as precisely as you like: shut off a whole section, narrow to one category, or pick a single provider",
    "ref": "session",
    "features": []
  },
  {
    "id": 609,
    "date": "2026-07-27",
    "theme": "Build maintenance UI",
    "impact": 3,
    "summary": "Every control on the router's Helm now explains itself on hover — 47 category and 9 section descriptions, log-column guides, and richer button help ported from the demo page after a side-by-side review",
    "detail": null,
    "benefit": "You can learn what any switch does by pointing at it, without a manual",
    "ref": "120ddbed22",
    "features": []
  },
  {
    "id": 607,
    "date": "2026-07-24",
    "theme": "Haven Helm",
    "impact": 5,
    "summary": "Over-the-air firmware updates now work end to end: a Haven checks for a new version, and one click downloads it, verifies its signature, installs it, and reboots into the new firmware — no cable, no computer.",
    "detail": "Proven end to end on a live unit: 0.1.62 to 0.1.63 over the air, download + sha256 verify + sysupgrade, settings preserved.",
    "benefit": "Your Haven keeps itself current on its own. Updates arrive over the internet and are cryptographically signed, so only genuine Haven firmware can ever install.",
    "ref": "71a54e0761",
    "features": []
  },
  {
    "id": 608,
    "date": "2026-07-24",
    "theme": "Haven Helm",
    "impact": 3,
    "summary": "Added hover tooltips to every interactive control in the Helm — buttons, links, checkboxes, the schedule editor, the sidebar menu, and all 630 filter-list items — so each control explains what it does before you click.",
    "detail": null,
    "benefit": "New users understand the interface at a glance instead of guessing what a button or a filter entry does.",
    "ref": "ce6d27c074",
    "features": []
  },
  {
    "id": 605,
    "date": "2026-07-23",
    "theme": "Filter strategies",
    "impact": 5,
    "summary": "Haven's content filter now covers both name-based and direct-IP connections -- verified with zero leaks in real browser testing.",
    "detail": null,
    "benefit": "The filter holds reliably, on every path a device uses to reach the internet.",
    "ref": "a7a2e40a60",
    "features": []
  },
  {
    "id": 606,
    "date": "2026-07-23",
    "theme": "Haven Helm",
    "impact": 4,
    "summary": "The activity log now shows every blocked request with why it was caught — a name-lookup block versus a direct-connection block — plus the exact site and which device, and any site can be allowed with a single click.",
    "detail": null,
    "benefit": "See exactly what Haven is filtering and why, and allow a site instantly with one click — no digging through settings.",
    "ref": "25decc9495",
    "features": []
  },
  {
    "id": 602,
    "date": "2026-07-21",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Haven firmware now builds for Olive, the second supported router model",
    "detail": "The Olive build had never completed. Three separate blockers: its build kit was never fetched, the kit shipped without two Haven-specific packages, and the build tool looked for the wrong output file type for this model. All three fixed; Olive 0.1.60 built and registered.",
    "benefit": "Buyers get a second hardware choice — Haven is no longer effectively a one-router product.",
    "ref": "5756b31",
    "features": []
  },
  {
    "id": 604,
    "date": "2026-07-21",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "The Challenge page is now easier to find through search engines, and we improved its page-loading reliability.",
    "detail": "The Challenge page had been deliberately hidden from search. It is now open to indexing, which takes weeks to take effect and so had to be done well before launch. Separately, the file that tells search engines how to crawl the site had a whole web page accidentally pasted into it, and had been serving that way since the site's first commit.",
    "benefit": "People looking for the Haven Challenge can find it through search.",
    "ref": "3d0ecfd",
    "features": []
  },
  {
    "id": 603,
    "date": "2026-07-21",
    "theme": "Live-fire findings",
    "impact": 3,
    "summary": "Improved phone pairing in the Helm.",
    "detail": "Reproduced on a disposable test rig. The pairing store was the only one of Haven's reset-surviving databases with no setup step, so its storage was never created; the failure was then silently discarded and surfaced later as an unrelated-looking crash.",
    "benefit": "Pairing a phone to Haven works reliably.",
    "ref": "a21a8a55aa",
    "features": []
  },
  {
    "id": 601,
    "date": "2026-07-20",
    "theme": "Helm UI",
    "impact": 4,
    "summary": "The Helm — Haven's control screen — got clearer and easier to trust. It now shows the running version on every screen, a one-tap Check-for-updates, a tidy one-section-at-a-time category list that's simple to scan, and readable text on TV browsers. Most importantly, the activity log now shows exactly what Haven filtered — every blocked tracker and ad domain, with the time and the device — so you can see your protection actually working.",
    "detail": "Session: parse-log.lua read logread but the DNS layer logs to a file -> Helm log blank though blocks recorded; fixed to read the logfacility file + dynamic LAN IP + tail + file-format timestamp. Plus version-on-every-screen, update_run check-button, collapsed one-open accordion, argon light-mode default, short-viewport login fit. Found live on a Fire TV Cube via adb/scrcpy.",
    "benefit": "You can see Haven working and stay in control: what it blocked and when, which version you are on, and an update a tap away — all readable on any screen, even a television.",
    "ref": "791b9d34",
    "features": []
  },
  {
    "id": 600,
    "date": "2026-07-20",
    "theme": "Reliability & Updates",
    "impact": 4,
    "summary": "Haven's over-the-air update system was proven end-to-end on a live Haven instance: it checked for a new version, downloaded it, verified it was authentic and undamaged, installed it itself, and came back online running the new release — no computer, no cables, one tap. This is the mechanism that keeps every Haven current with the latest protections over its lifetime.",
    "detail": "First real version-change over-the-air update proven end-to-end on live Haven hardware (0.1.56 to 0.1.57): signed manifest verified against the baked release key, one-tap apply, download plus integrity check, self-install, reboot, confirmed running the new version. Retires the version-change-untested flag.",
    "benefit": "Your Haven keeps itself up to date. New safeguards and fixes arrive over the internet and install with a single tap, so the Haven instance you own quietly keeps getting better and safer without you ever plugging into a computer.",
    "ref": "791b9d34",
    "features": []
  },
  {
    "id": 599,
    "date": "2026-07-19",
    "theme": "Process / Quality",
    "impact": 3,
    "summary": "Strengthened our automated quality control process.",
    "detail": null,
    "benefit": "Fewer defects reach the routers we ship, because our own software is inspected and stress-tested by machines before a unit ever goes out the door.",
    "ref": "791b9d34",
    "features": []
  },
  {
    "id": 596,
    "date": "2026-07-17",
    "theme": "Filtering",
    "impact": 4,
    "summary": "Privacy protection expanded: Smart TV viewing-recognition, device telemetry, and data-broker endpoints join the filter catalog (44 research-verified additions), and security blocking joins the one-tap Privacy template",
    "detail": null,
    "benefit": "One tap now also stops TVs reporting what you watch, gadgets quietly reporting usage, and data brokers collecting your identity",
    "ref": "37ab20f",
    "features": []
  },
  {
    "id": 595,
    "date": "2026-07-17",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Improved off-network filtering reliability through router updates.",
    "detail": null,
    "benefit": "A family phone keeps its own filtering rules anywhere it goes — and the address on the phone keeps working for good",
    "ref": "4e3585aa08",
    "features": []
  },
  {
    "id": 597,
    "date": "2026-07-17",
    "theme": "Process / Quality",
    "impact": 3,
    "summary": "Every Haven ships with a current filter list, a unique serial number, and an encrypted, restore-tested backup of its support credentials.",
    "detail": null,
    "benefit": "Your Haven ships with a current filter list ready to go, and support access that's safely backed up.",
    "ref": "747e5b7",
    "features": []
  },
  {
    "id": 598,
    "date": "2026-07-17",
    "theme": "Process / Quality",
    "impact": 2,
    "summary": "Strengthened our internal publishing process.",
    "detail": null,
    "benefit": "What we say we shipped and what the site shows always match.",
    "ref": "eef527a",
    "features": []
  },
  {
    "id": 593,
    "date": "2026-07-15",
    "theme": "Process & discipline",
    "impact": 3,
    "summary": "Strengthened our build-and-ship process.",
    "detail": null,
    "benefit": "A product is only as trustworthy as the process behind it. Continuously researching and upgrading our own methods — and acting on the findings the same day — is how Haven stays worthy of being the device a family trusts",
    "ref": "791b9d34-3",
    "features": []
  },
  {
    "id": 594,
    "date": "2026-07-15",
    "theme": "Tooling & infrastructure",
    "impact": 2,
    "summary": "Strengthened our internal development process.",
    "detail": null,
    "benefit": "Development paces its own workload, so big improvements land on schedule and Haven's updates keep flowing steadily.",
    "ref": "791b9d34-3",
    "features": []
  },
  {
    "id": 591,
    "date": "2026-07-14",
    "theme": "Process & discipline",
    "impact": 3,
    "summary": "Strengthened our internal build-and-ship process.",
    "detail": "Campaign survived a hard resource-limit wall, an 18-hour machine suspend, and a process kill with zero work lost — every pass checkpoints its findings to SQLite as it completes",
    "benefit": "The process that builds Haven now checks itself automatically, before every Haven ships.",
    "ref": "4ce5016f-2",
    "features": []
  },
  {
    "id": 592,
    "date": "2026-07-14",
    "theme": "Tooling & infrastructure",
    "impact": 2,
    "summary": "Strengthened our internal development process.",
    "detail": "Off-the-shelf collector vetted against sources; a proposed 500-line custom extension rejected in favor of a one-line hook injection; task estimates anchored to measured sweep costs",
    "benefit": "Large automated work sessions pace themselves within budget, for steadier progress toward shipping.",
    "ref": "791b9d34-3",
    "features": []
  },
  {
    "id": 590,
    "date": "2026-07-10",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Strengthened our pre-ship quality checks.",
    "detail": "<router serial> 0.1.51 reburn T6 QC caught (1) a sync that mirrored a stale static index.html over the redirect page and (2) that nothing recorded unit creds. Both fixed; T6 re-run PASS 17/17.",
    "benefit": "Every burned router shows the correct landing page on first boot and has its passwords safely recorded.",
    "ref": "fdecf93",
    "features": []
  },
  {
    "id": 585,
    "date": "2026-07-10",
    "theme": "Bypass resistance",
    "impact": 3,
    "summary": "Improved filtering when away from the local network.",
    "detail": "Well-known public resolver addresses are captured into the on-phone filter; their lookups are redirected to Haven while ordinary traffic is left untouched, so it stays light on the battery.",
    "benefit": "Protection holds on cellular, not just on your local network.",
    "ref": "4ce5016f",
    "features": []
  },
  {
    "id": 584,
    "date": "2026-07-10",
    "theme": "Tooling & infrastructure",
    "impact": 2,
    "summary": "Strengthened our internal wireless testing tools.",
    "detail": "The phone discovers its own debug endpoint on-device and sends it to its Haven unit; a helper reads it back and connects automatically, even after the phone reboots onto a new port.",
    "benefit": "Faster, more reliable device testing means fixes and features reach shipped units sooner.",
    "ref": "4ce5016f",
    "features": []
  },
  {
    "id": 583,
    "date": "2026-07-09",
    "theme": "Off-network filtering",
    "impact": 5,
    "summary": "Confirmed on a real phone that Haven keeps filtering after the phone leaves the local network — on a cellular connection a blocked site stayed blocked while an ordinary site loaded normally.",
    "detail": "The phone resolves names over an encrypted channel back to its own Haven unit when off-network, so the same category rules apply on the road as at the local network.",
    "benefit": "The protection travels with the person, not the building — a filtered phone stays filtered on cellular data, away from any local network.",
    "ref": "4ce5016f",
    "features": []
  },
  {
    "id": 578,
    "date": "2026-07-09",
    "theme": "Off-network filtering",
    "impact": 5,
    "summary": "Choose how each content category follows a phone away from your network — and Haven works out the rest per app",
    "detail": "End-to-end control plane shipped and confirmed on a real phone: a per-category Remote Filter selector in the dashboard (Full / Fast / None, with Fast as the sensible everyday default and Full kept rare); the phone app reports its installed apps; Haven classifies them (games, social, streaming, storefronts) and shows every app with the connection it would use; the administrator can pin any single app; and the phone pulls the finished policy back with one tap. On the first real phone: 185 apps — 6 on Full (the games and browsers that need deep protection), 179 on Fast, none unprotected.",
    "benefit": "You set intent once per category (Full protection, Fast checks, or None); every app on the phone automatically gets the right treatment, and the rare heavy-duty path is reserved for the apps that actually need it.",
    "ref": "38ade0cbd2",
    "features": []
  },
  {
    "id": 582,
    "date": "2026-07-09",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Proved a phone can carry Haven's per-app filtering on the device itself.",
    "detail": "The companion app now runs an on-device filter that reads the per-app policy, leaves opted-out apps untouched, and routes every other app's DNS to Haven. Proven end-to-end on a real phone against a live Haven router: blocked domains fail, allowed ones resolve, all through the on-device path. Engineering milestone, not yet a shipped customer feature; the away-from-network path is built but not yet field-tested.",
    "benefit": "Groundwork for filtering that rides along per app — the right treatment for each app, set once and carried out the door.",
    "ref": "4ce5016f",
    "features": []
  },
  {
    "id": 581,
    "date": "2026-07-09",
    "theme": "Bypass resistance",
    "impact": 4,
    "summary": "Strengthened Haven's filtering against proxies and the Tor network.",
    "detail": "Added a Web Proxies category (43 proxy/unblocker sites) and expanded the Tor block with its directory-authority and default-bridge addresses plus circumvention-tool sites (Psiphon, Lantern, Shadowsocks, V2Ray, Snowflake). Blocking the Tor directory authorities stops the Tor client from even starting, which a plain exit-node list never did. Both ship as opt-in toggles over the normal update feed.",
    "benefit": "Flip on the new Web Proxies and Tor blocks and the common evasion sites stop working on your devices, no tinkering required.",
    "ref": "fb2e1c5",
    "features": []
  },
  {
    "id": 579,
    "date": "2026-07-09",
    "theme": "Haven brand",
    "impact": 3,
    "summary": "Settled how Haven introduces itself: an internet shield for your network",
    "detail": "Category descriptor decided after weighing alternatives: internet shield beats digital shield (says what is shielded) and beats system-style names (too corporate). Haven remains the brand; internet shield is the plain-language shelf label beneath it. Guarantee language keeps its honesty: we adapt as content providers adapt, and if the shield drops, you will know.",
    "benefit": "A stranger in the store aisle instantly understands what Haven is — the thing that stands between your network and the internet — without a word of jargon.",
    "ref": "",
    "features": []
  },
  {
    "id": 577,
    "date": "2026-07-08",
    "theme": "Off-network filtering",
    "impact": 5,
    "summary": "Demonstrated Haven filtering a phone that was off the network entirely — on its cellular connection — with mobile-game ads blocked just as they would be on your own network.",
    "detail": "First end-to-end proof: a real Android phone on a cellular network played a game with its ads removed by your router. Engineering milestone; not yet a shipped customer feature.",
    "benefit": "Your protection follows each device out the door: a phone on cellular gets the same ad and content filtering as one on your own Wi-Fi.",
    "ref": "",
    "features": []
  },
  {
    "id": 575,
    "date": "2026-07-08",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Off-network phone filtering proven live end-to-end: a real Android on Haven's Private-DNS address, filtered by its Haven",
    "detail": null,
    "benefit": "Your rules follow your phone everywhere — cellular included — with nothing to install",
    "ref": "262",
    "features": []
  },
  {
    "id": 580,
    "date": "2026-07-08",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "Customer paperwork drafted: a printable user manual anyone can follow, plus a private credential card for each unit",
    "detail": "Two-part documentation model: a GENERIC manual (safe to host on the website and print identically for every unit — what Haven does, plugging it in, opening the dashboard, turning on filtering, getting help) and a per-unit CREDENTIAL CARD template holding the Wi-Fi name/password and admin login placeholders. The manual points to your card; the card points to the manual.",
    "benefit": "A new owner can plug in, log in, and turn on filtering from one friendly document — while passwords ship only on a physical card in the box, never printed in any manual or posted online.",
    "ref": "9b69ef286a",
    "features": []
  },
  {
    "id": 576,
    "date": "2026-07-08",
    "theme": "Haven Helm",
    "impact": 3,
    "summary": "Administrator accounts simplified to a single friendly Name — capitalization never matters again at creation or login",
    "detail": null,
    "benefit": "Type your name any way you like; the router just knows you",
    "ref": "c2288dbf72",
    "features": []
  },
  {
    "id": 573,
    "date": "2026-07-06",
    "theme": "Ad & Tracker Blocking",
    "impact": 3,
    "summary": "Blocked the Smaato ad exchange after spotting a real ad it served in a phone game — found its infrastructure in the router logs and shipped the block.",
    "detail": null,
    "benefit": "One more programmatic ad network can no longer reach devices on your network.",
    "ref": "e7bf81c",
    "features": []
  },
  {
    "id": 574,
    "date": "2026-07-06",
    "theme": "Marketing & website",
    "impact": 2,
    "summary": "Improved site navigation on lulhaven.com.",
    "detail": null,
    "benefit": "You can always get back to the rest of the site from any page you land on.",
    "ref": "e46825d",
    "features": []
  },
  {
    "id": 570,
    "date": "2026-07-05",
    "theme": "Reliability & Updates",
    "impact": 5,
    "summary": "Update your Haven with a single tap: the dashboard now tells you when a new version is ready and offers to install it for you — safely verified — with no cables or files to handle.",
    "detail": null,
    "benefit": "Security and feature updates reach you effortlessly, so your protection always stays current without any technical steps.",
    "ref": "387b221",
    "features": []
  },
  {
    "id": 571,
    "date": "2026-07-05",
    "theme": "Ad & Tracker Blocking",
    "impact": 4,
    "summary": "Haven can now block thousands of additional ad and tracker networks with one checkbox, on top of the named brands it already covers.",
    "detail": null,
    "benefit": "Fewer ads and far less tracking across every device on your network, from the moment you tick the box.",
    "ref": "f0cfcb0",
    "features": []
  },
  {
    "id": 572,
    "date": "2026-07-05",
    "theme": "Reliability & Updates",
    "impact": 3,
    "summary": "Improved Haven's ad and tracker filtering with large block lists.",
    "detail": null,
    "benefit": "Your ad and tracker blocking stays on around the clock, without interruptions.",
    "ref": "9bcb16d",
    "features": []
  },
  {
    "id": 567,
    "date": "2026-07-04",
    "theme": "In-game ad filtering",
    "impact": 5,
    "summary": "Proved on real hardware that a targeted ad can be stopped before it appears: on the bench router a rewarded video that had played moments earlier was blocked on the next request, and no ad showed.",
    "detail": "First end-to-end visible kill: phone flags the ad, the router identifies the real ad infrastructure off the wire (SNI), a Block installs a DNS sink + SNI reset, and the next ad load fails to materialize. Proven A/B (same trigger: ad before, no ad after).",
    "benefit": "The ads that interrupt a game — the ones you sit through before you can continue — can be made to simply not appear, on your own network, without touching the app.",
    "ref": "4ce5016f",
    "features": []
  },
  {
    "id": 568,
    "date": "2026-07-04",
    "theme": "In-game ad filtering",
    "impact": 4,
    "summary": "Made your ad-block decisions permanent: a domain you block now stays blocked through a settings refresh, a reboot, and even a factory reset.",
    "detail": null,
    "benefit": "Once you tell Haven to block an ad source, it stays blocked — you don't have to do it again after an update or a power cycle.",
    "ref": "",
    "features": []
  },
  {
    "id": 569,
    "date": "2026-07-04",
    "theme": "In-game ad filtering",
    "impact": 3,
    "summary": "The companion app now shows the status of every flagged connection with a clear block / allow / off control you can change either way, so you always see and control what Haven is filtering.",
    "detail": null,
    "benefit": "You can see exactly which connections are blocked, allowed, or untouched — and change any of them with a tap.",
    "ref": "",
    "features": []
  },
  {
    "id": 566,
    "date": "2026-07-03",
    "theme": "Filtering & enforcement",
    "impact": 4,
    "summary": "Proved the full phone-to-router ad-control loop on real hardware: flag an ad on your phone, the router identifies the real source and blocks it.",
    "detail": null,
    "benefit": "Point your phone at an ad you don't want and the router acts on it — control that follows what you actually see.",
    "ref": "2026-07-03-session",
    "features": []
  },
  {
    "id": 564,
    "date": "2026-07-03",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Improved Haven's filtering reliability through a router restart.",
    "detail": null,
    "benefit": "Your protection keeps working across reboots and power blips.",
    "ref": "2026-07-03-session",
    "features": []
  },
  {
    "id": 562,
    "date": "2026-07-03",
    "theme": "Process / Quality",
    "impact": 4,
    "summary": "Strengthened our internal development tooling.",
    "detail": "Triggered by finding a finished filtering component that had been quietly rebuilt from scratch because nothing was using the original, so it looked un-built. The catalog is generated from the code, names each component's state and what depends on it, blocks a duplicate at the moment it would be created, and won't let a session close quietly while something sits built-but-unused past a review date.",
    "benefit": "Effort goes toward new work instead of duplicating what already exists, and finished pieces surface automatically.",
    "ref": "2026-07-03-session",
    "features": []
  },
  {
    "id": 565,
    "date": "2026-07-03",
    "theme": "Haven Helm",
    "impact": 3,
    "summary": "Added a quiet 'Filter lists updated' date to the Helm so you can always see how current your filtering data is.",
    "detail": null,
    "benefit": "You can see at a glance whether your lists are fresh — honest about the age of your protection, no fine print.",
    "ref": "2026-07-03-session",
    "features": []
  },
  {
    "id": 563,
    "date": "2026-07-03",
    "theme": "Build pipeline",
    "impact": 3,
    "summary": "Every Haven ships with the complete ad-filtering system built in, with safeguards to keep it that way.",
    "detail": "The router code had two downstream copies that had drifted apart; the image that bakes was missing the newest ad-identification work while carrying a half-wired newer piece. Rebuilt from a single reconciled source into a consistent image, and made the copy that bakes generated-from-source so this can't recur unnoticed.",
    "benefit": "The router image you receive is built from one consistent source, so it reliably contains the features it's supposed to.",
    "ref": "2026-07-03-session",
    "features": []
  },
  {
    "id": 561,
    "date": "2026-07-02",
    "theme": "Tutored Modeling",
    "impact": 4,
    "summary": "Haven can now pinpoint the exact ad domains behind an on-screen ad and block them by name — proven end-to-end on real hardware, from tapping a flag on the phone to the block taking effect.",
    "detail": null,
    "benefit": "When an ad slips through, you flag it once and Haven identifies and blocks the actual source — not a guess, the real domain — so it stops for good.",
    "ref": "HVN-11 ad-spine A+C",
    "features": []
  },
  {
    "id": 560,
    "date": "2026-07-02",
    "theme": "Filtering & enforcement",
    "impact": 4,
    "summary": "Built a Haven companion app for Android: pair it to your Haven, tap to flag an ad on your screen, and review-and-block the flagged connections from your phone.",
    "detail": null,
    "benefit": "Manage what Haven blocks right from your phone — flag an ad the moment you see it, then block or allow with one tap.",
    "ref": "companion-mvp-20260702",
    "features": []
  },
  {
    "id": 544,
    "date": "2026-07-01",
    "theme": "Haven Helm",
    "impact": 4,
    "summary": "One-tap review in the Helm: connections Haven flagged as likely ads or trackers appear for a single-tap Block or Allow.",
    "detail": null,
    "benefit": "See what Haven flagged and decide in one tap, right from your Helm.",
    "ref": "d6a3d51",
    "features": []
  },
  {
    "id": 543,
    "date": "2026-07-01",
    "theme": "Ad blocking",
    "impact": 4,
    "summary": "Tutored Modeling: Haven learns which connections behave like ads or trackers and blocks them, sharpening every time you confirm one — no blocklist to keep current.",
    "detail": null,
    "benefit": "Point Haven at what you don't want on your screen and it gets better at catching it — ads, trackers, and more.",
    "ref": "d6a3d51",
    "features": []
  },
  {
    "id": 555,
    "date": "2026-06-30",
    "theme": "Filtering & enforcement",
    "impact": 5,
    "summary": "Built and hardware-verified Haven's on-router detection loop that spots likely ads and trackers, plus a secure phone-to-router link.",
    "detail": null,
    "benefit": "Haven can flag unwanted connections right on your network and let you act from your phone.",
    "ref": "2b2cf5d",
    "features": []
  },
  {
    "id": 554,
    "date": "2026-06-30",
    "theme": "Testing & quality",
    "impact": 5,
    "summary": "Strengthened how we review Haven's product specification.",
    "detail": null,
    "benefit": "Haven's standards get stress-tested at a scale hand-review can't match, then confirmed by a person.",
    "ref": "d7d38de",
    "features": []
  },
  {
    "id": 559,
    "date": "2026-06-30",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Specified Haven's off-network connection model — cache-first and key-authenticated — for filtering that follows a device off your network.",
    "detail": null,
    "benefit": "Groundwork for keeping a device filtered even when it leaves your own Wi-Fi.",
    "ref": "4cd5285",
    "features": []
  },
  {
    "id": 558,
    "date": "2026-06-30",
    "theme": "Process / Quality",
    "impact": 4,
    "summary": "Strengthened Haven's behavior specification.",
    "detail": null,
    "benefit": "The standard Haven is built to keeps getting more accurate.",
    "ref": "fc8e92b",
    "features": []
  },
  {
    "id": 557,
    "date": "2026-06-30",
    "theme": "Customer features (website)",
    "impact": 4,
    "summary": "Added human product support — help from a real person — as a subscription benefit.",
    "detail": null,
    "benefit": "Your subscription includes help from a real person, not just documentation.",
    "ref": "a14167e",
    "features": []
  },
  {
    "id": 556,
    "date": "2026-06-30",
    "theme": "Planning & roadmap",
    "impact": 4,
    "summary": "Defined the Haven companion app (Android first) with 32 specified behaviors.",
    "detail": null,
    "benefit": "A phone app is on the roadmap to extend Haven's control beyond the browser.",
    "ref": "07d40c1",
    "features": []
  },
  {
    "id": 542,
    "date": "2026-06-30",
    "theme": "Architecture & data model",
    "impact": 4,
    "summary": "Privacy by design: Havens don't retain your public IP address; visitor identifiers are keyed with a server-side secret.",
    "detail": null,
    "benefit": "Your network's public IP is never stored — Haven keeps less about you, by design.",
    "ref": "e976601",
    "features": []
  },
  {
    "id": 553,
    "date": "2026-06-28",
    "theme": "Process & discipline",
    "impact": 4,
    "summary": "Strengthened our internal build process.",
    "detail": null,
    "benefit": "Fewer mistakes reach the product — a safety net around how Haven is built.",
    "ref": "a2e7012",
    "features": []
  },
  {
    "id": 552,
    "date": "2026-06-28",
    "theme": "Marketing & website",
    "impact": 4,
    "summary": "Added a pre-announcement page and short survey for owners of OpenWRT-compatible routers.",
    "detail": null,
    "benefit": "Owners of compatible routers can register interest and tell us what they run.",
    "ref": "b1a757d",
    "features": []
  },
  {
    "id": 549,
    "date": "2026-06-27",
    "theme": "Firmware & overlay",
    "impact": 5,
    "summary": "Serial provisioning: each Haven mints its own unique serial number the first time it reaches the internet, recorded durably on the device.",
    "detail": null,
    "benefit": "Every Haven is individually identifiable from day one — the backbone of support and warranty.",
    "ref": "609b4c4",
    "features": []
  },
  {
    "id": 551,
    "date": "2026-06-27",
    "theme": "Marketing & website",
    "impact": 4,
    "summary": "Reworked site copy to speak to any network, large or small, not only families.",
    "detail": null,
    "benefit": "Haven is for anyone who wants control of their network — families, seniors, small offices, schools.",
    "ref": "a3a8d51",
    "features": []
  },
  {
    "id": 550,
    "date": "2026-06-27",
    "theme": "Marketing & website",
    "impact": 4,
    "summary": "Opened public pre-registration for the Haven Challenge.",
    "detail": null,
    "benefit": "Early sign-up for the Challenge.",
    "ref": "8753041",
    "features": []
  },
  {
    "id": 545,
    "date": "2026-06-26",
    "theme": "Testing & quality",
    "impact": 5,
    "summary": "Established Haven's behavioral specification — 10 domains and roughly 173 defined behaviors — as the single source of truth for how every feature must act and be tested.",
    "detail": null,
    "benefit": "Every Haven feature is measured against a written standard, so behavior stays consistent and verifiable.",
    "ref": "224a065",
    "features": []
  },
  {
    "id": 548,
    "date": "2026-06-26",
    "theme": "Website",
    "impact": 4,
    "summary": "The homepage now honors reduced-motion accessibility preferences — keeping content rotation without the motion for sensitive users.",
    "detail": null,
    "benefit": "The site respects your device's accessibility settings.",
    "ref": "ab5dcc6",
    "features": []
  },
  {
    "id": 547,
    "date": "2026-06-26",
    "theme": "Marketing & website",
    "impact": 4,
    "summary": "Introduced the Haven Challenge program page with application intake.",
    "detail": null,
    "benefit": "A way for interested router owners to raise their hand for the Haven Challenge.",
    "ref": "bbf313b",
    "features": []
  },
  {
    "id": 546,
    "date": "2026-06-26",
    "theme": "Multi-administrator UI",
    "impact": 4,
    "summary": "Defined Haven's account-security model: a unique password per unit printed on the box, a forced change at first login, and a concealed recovery path.",
    "detail": null,
    "benefit": "Your Haven isn't guarded by a factory-default password everyone knows — each unit is unique and yours to control.",
    "ref": "224a065",
    "features": []
  },
  {
    "id": 541,
    "date": "2026-06-25",
    "theme": "Hardware / Burn",
    "impact": 3,
    "summary": "Verified the current Haven build boots and runs end-to-end on Raspberry Pi 5 hardware — booting from a USB-attached M.2 SSD, with dual-2.5-gigabit networking via an add-on board, and confirmed it survives a clean reboot unattended.",
    "detail": "Flashed a freshly built Pi factory image via the easyas-fuego skill; full stack came up (filtering Helm, WAN auto-detect, internet, NTP) and a clean reboot returned in ~35s self-configured.",
    "benefit": "Haven isn't locked to one router model — it runs on widely available Raspberry Pi hardware, broadening where it can be deployed.",
    "ref": "ead56e8aa4",
    "features": []
  },
  {
    "id": 540,
    "date": "2026-06-24",
    "theme": "Product definition",
    "impact": 3,
    "summary": "Determined Haven's subscription discounts — yearly pricing, deeper first-year pricing, and a perpetual discount for early adopters.",
    "detail": "Set the structure of the list-update subscription: an annual plan as the best value, an introductory first-year rate for new customers, and a standing discount the first adopters keep for life.",
    "benefit": "Early supporters get Haven's best price for as long as they stay; everyone gets a break for subscribing yearly and an extra discount in their first year.",
    "ref": "727e158dfa",
    "features": []
  },
  {
    "id": 538,
    "date": "2026-06-23",
    "theme": "Burn Automation",
    "impact": 4,
    "summary": "Every Haven ships with a per-unit Wi-Fi password and an owner login that must be changed on first use.",
    "detail": "Consolidated the production burn onto one personalizer that creates the owner's admin account, arms the first-login password reset, derives per-unit Wi-Fi credentials, and lays down the filter and network config. Verified end-to-end in the test VM; final hardware-burn validation pending.",
    "benefit": "A safe, consistent first-contact experience on every shipped Haven: no shared passwords, and the owner sets their own login the first time they connect.",
    "ref": "744f1549f4",
    "features": []
  },
  {
    "id": 539,
    "date": "2026-06-23",
    "theme": "Haven Helm",
    "impact": 3,
    "summary": "The Helm login now greets the owner with a castle gateway: enter the correct password and a portcullis raises to open the gate and let you in.",
    "detail": "Login backdrop shows a closed portcullis at rest; a correct password plays a short raise animation and enters the dashboard, while a wrong password leaves the gate shut. Built and VM-verified end-to-end; ships when the firmware image is rebuilt.",
    "benefit": "A warm, on-brand first moment that makes Haven feel like it guards your network and opens its gates for the person in charge.",
    "ref": "33fa7ff87b",
    "features": []
  },
  {
    "id": 537,
    "date": "2026-06-23",
    "theme": "Haven brand",
    "impact": 2,
    "summary": "The Haven Helm's login screen and browser-tab icon now wear the Haven Gold Seabee mascot.",
    "detail": "Login logo (sysauth.htm) + the full favicon set (16/32/96/192 + apple sizes + favicon.ico) swapped to the gold Seabee and downscaled from the 2.9MB source to a 168K logo + 4-96K favicons; baked via haven-overlay.",
    "benefit": "A distinctly-Haven first screen — the product looks like itself the moment you open it, not a generic router page.",
    "ref": "7ca1ecb167",
    "features": []
  },
  {
    "id": 536,
    "date": "2026-06-22",
    "theme": "Haven Helm",
    "impact": 4,
    "summary": "Built and verified Haven's first-contact login: every unit greets the customer with one simple username ('haven', any capitalization), the admin account stays safely locked until they set their own password, and filtering is live the moment it is plugged in.",
    "detail": "Phase 1a of the locked credential model: the login defaults to 'haven' (case-insensitive), the stock OpenWrt password page is disabled and points to the Haven Administrator screen, root is invisible to the Helm on shipped units, and an automated check blocks any shipping image from carrying developer-only credentials. Verified end-to-end in an x86/64 test VM (shipping and developer images).",
    "benefit": "The very first thing a new owner touches just works, and that first moment is what decides whether they trust the product.",
    "ref": "e99ff79e4b",
    "features": []
  },
  {
    "id": 535,
    "date": "2026-06-22",
    "theme": "Tooling & infrastructure",
    "impact": 3,
    "summary": "Built an x86/64 VM test rig -- a real Haven image now boots in a VM (real kernel, firewall, DNS, the Helm), so we can test login and filtering in minutes.",
    "detail": "build-haven-image.sh --target vm; havensni cross-compiled for x86; qemu/KVM with a host tap; the Helm is reachable on the LAN.",
    "benefit": "Faster, faithful testing means first-contact problems get caught and fixed before any unit ships.",
    "ref": "b67128d37e",
    "features": []
  },
  {
    "id": 533,
    "date": "2026-06-20",
    "theme": "Hardware / Burn",
    "impact": 4,
    "summary": "Brought Haven up on the Raspberry Pi 5 — built a Haven Pi image and flashed it; the Helm runs natively, same filtering, on inexpensive hardware.",
    "detail": "build-haven-image.sh --target pi (bcm2712) with first-boot WAN auto-detect; flashed via the easyas-fuego SD path; Helm renders the argon theme. A persistence partition is still pending.",
    "benefit": "Haven isn't tied to one router brand — it can run on inexpensive, easy-to-find hardware, widening who can protect their network.",
    "ref": "32cfd58ec7",
    "features": []
  },
  {
    "id": 534,
    "date": "2026-06-19",
    "theme": "Testing & quality",
    "impact": 3,
    "summary": "Expanded the automated test regimen from 92 to 104 checks from a functional-coverage review, and made two product improvements based on what it found.",
    "detail": "Landed Do-Now 5 from specs/2026-06-18-test-protocol-functional-review.md; product fixes: IPv6 port-53 handling and a daemon self-test exclusion.",
    "benefit": "More of what Haven promises is now verified automatically on every build, so problems get caught before a router ever ships.",
    "ref": "8bdfee0e79",
    "features": []
  },
  {
    "id": 532,
    "date": "2026-06-18",
    "theme": "Filtering & enforcement",
    "impact": 4,
    "summary": "Flagged-attempt report + email notifications: Haven now keeps a persistent, device-attributed log of blocked attempts, renders it as a printable per-device report (save as PDF), and can send a content-free email notification when activity is flagged — duty-of-care evidence without surveillance.",
    "detail": null,
    "benefit": "A parent or staff meeting can rest on a specific device's record of what it tried to reach, and the right person gets a heads-up — while Haven still never reads what anyone says or sends a thing to our servers.",
    "ref": "b4f797a",
    "features": []
  },
  {
    "id": 530,
    "date": "2026-06-17",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "Expanded the Benefits page from 10 to 19 customer benefits, informed by a survey of 95 competitors.",
    "detail": "Benefits are sourced from <database>; added off-network filtering, ~50-category granularity, per-person rules, activity-log visibility, app-level blocking, ad/tracker blocking and more. Removed false 'email alert' copy (Haven sends no email; new devices appear in the Helm device list) and an unbuilt off-network claim. Brand-voice pass: 'router' reads as 'Haven' where it means the unit.",
    "benefit": "Visitors see the full breadth of what Haven does — and every benefit shown is one Haven genuinely delivers.",
    "ref": "a84467e",
    "features": []
  },
  {
    "id": 529,
    "date": "2026-06-17",
    "theme": "Hardware / Burn",
    "impact": 3,
    "summary": "Hardened and fully validated our automated process for building a router from the ground up -- strengthened the build script and added a safety check for the network cable before starting. The finished router then passed a full 87-point test with zero real defects, confirmed by independent review.",
    "detail": "Burn chain hardened: a flash-script exit-code bug fixed and a cable-safety prompt added; the rebuilt unit then passed an 87-point automated test suite with no real defects (transient failures all traced to expected unconfigured/no-internet state).",
    "benefit": "Every Haven we ship runs through a repeatable, self-checking rebuild-and-test cycle for consistent, verified reliability.",
    "ref": "34618c3",
    "features": []
  },
  {
    "id": 531,
    "date": "2026-06-17",
    "theme": "Marketing & website",
    "impact": 2,
    "summary": "Expanded the Benefits page to 20 entries, adding Delayed Filtering and a clearer explanation of how granular Haven's controls really are (down to the individual content source within a category), and rewrote the page to speak to any kind of buyer.",
    "detail": null,
    "benefit": "Clearer, broader benefits page that speaks to families and institutions alike.",
    "ref": "b00f4d89",
    "features": []
  },
  {
    "id": 528,
    "date": "2026-06-15",
    "theme": "Ad blocking",
    "impact": 4,
    "summary": "Network-wide ad, pop-up, and pop-under blocking for every device on the house network — and it goes a step further: it filters PER DEVICE, so a child’s tablet and the adults’ phones can carry different rules, all from one screen. No separate box, no software to run, nothing to install on each device. A one-tap “Miscellaneous Browser Ads” control adds an always-updated list of more than 150,000 ad and tracker domains, including the pop-under networks that blocking the named brands alone misses.",
    "detail": "Built by integrating the open HaGeZi ad/pop-up blocklists into Haven's existing DNS filtering, so the comprehensive list ships as a single Helm toggle rather than something the customer has to assemble.",
    "benefit": "Whole-house ad and pop-up blocking with nothing to build and nothing to maintain — plus straightforward per-device control. One switch turns on more than 150,000 ad and tracker domains across the whole network, and you can still tighten or loosen filtering for any single device.",
    "ref": "9b42161228",
    "features": []
  },
  {
    "id": 527,
    "date": "2026-06-15",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Haven’s filtering accompanies your devices off the network — what people normally bolt Tailscale onto their network to get — built in, with no app to install and no separate VPN account. Proven end-to-end this session: a device away from your network still receives Haven’s filtered answers through your Haven’s own private tunnel, with allowed sites working and blocked ones stopped. And it’s built for dependability: an always-reachable cloud relay backstops the connection, so filtering keeps working even on carrier networks that block direct connections — coverage doesn’t drop.",
    "detail": null,
    "benefit": "Protection that travels with the device — what people use Tailscale for, without running Tailscale — and more dependable, thanks to a redundant path that keeps filtering active at all times.",
    "ref": "f52390bd0f",
    "features": []
  },
  {
    "id": 526,
    "date": "2026-06-15",
    "theme": "Website",
    "impact": 3,
    "summary": "The Helm's category icons gained color and a blocked indicator: interiors tinted a soft brand teal, and any category you're filtering now shows a red 'no entry' slash — plus hand-traced custom marks for the sensitive categories.",
    "detail": "Teal fill on enclosed interior areas only; a single shared slash overlay shown only on blocked categories (no duplicate icon set); traced custom art for weapons, cult, and dating from reference images.",
    "benefit": "You can see at a glance which categories are being filtered, and the icons read as designed rather than plain — more polished and legible for the owner.",
    "ref": "d1c41ab",
    "features": []
  },
  {
    "id": 524,
    "date": "2026-06-11",
    "theme": "Burn Automation",
    "impact": 4,
    "summary": "Ran a full factory-to-Haven-to-quality-check round-trip on the second router and it passed every stage; the unit is built and ready to ship.",
    "detail": "Round-tripped a unit stock->Haven->ship gate, all stages pass; the first-boot customer-experience suite passed 18 of 18; two build scripts hardened along the way (a post-flash exit-code bug and a DNS check that didn't follow a CNAME).",
    "benefit": "Proves the build pipeline reliably takes a router from stock all the way to a quality-checked, ship-ready Haven — and that a customer's very first boot passes every landing, filtering, Wi-Fi, and login-security check.",
    "ref": "60ef780",
    "features": []
  },
  {
    "id": 525,
    "date": "2026-06-11",
    "theme": "Website",
    "impact": 3,
    "summary": "Gave every content category in the Helm its own icon (and on the live demo), with section headers left bare so the icon itself signals a clickable category.",
    "detail": "One line-icon per category from a consistent set, plus four deliberately-chosen custom marks for sensitive categories; shipped live to lulhaven.com and into the router UI source.",
    "benefit": "The Helm reads like a designed app instead of a plain text settings list — clearer at a glance and more inviting for the non-technical owner.",
    "ref": "1b87c9b",
    "features": []
  },
  {
    "id": 523,
    "date": "2026-06-11",
    "theme": "Haven Helm",
    "impact": 3,
    "summary": "Secure first login: every Haven now requires its owner to set a personal admin password before the dashboard opens — no unit is usable with a shared setup password.",
    "detail": "Built into the shipping firmware and proven end-to-end on the first unit: signing in with the shared setup password forces the owner to choose their own before anything else loads.",
    "benefit": "Out-of-the-box security: a Haven is controllable only by the owner who set it up, with a unique password from first boot.",
    "ref": "",
    "features": []
  },
  {
    "id": 521,
    "date": "2026-06-09",
    "theme": "Burn Automation",
    "impact": 5,
    "summary": "Completed the first fully-automated, end-to-end router burn — from factory-stock to a ready-to-ship, personalized Haven — with no manual reflashing, recorded step-by-step by the burn black box.",
    "detail": "Factory restore, automated setup, OpenWrt, the Haven image, per-unit personalization, and a customer-experience QC pass — every step scripted and journaled, run start to finish autonomously.",
    "benefit": "Proves Havens can be produced reliably and repeatably ahead of the first shipment: the build pipeline works end to end.",
    "ref": "209",
    "features": []
  },
  {
    "id": 522,
    "date": "2026-06-09",
    "theme": "Live-fire findings",
    "impact": 4,
    "summary": "Plug-and-play setup proven at a real customer site — Haven resolved a network address conflict on its own",
    "detail": "Field-tested at a real customer site that sits behind an existing router on the common 192.168.1.x range. Haven detected the address-range collision and automatically relocated its own network to a free range, keeping every connected device filtered — no manual setup, no IP settings to change. The live result matched the bench prediction exactly.",
    "benefit": "You can plug Haven in anywhere: it adapts to your existing network and sidesteps IP-range conflicts automatically, with nothing to configure.",
    "ref": "#146",
    "features": [
      {
        "id": 2,
        "lead": "Plug in and it works"
      },
      {
        "id": 26,
        "lead": "Plug in, set a password, choose what to filter"
      }
    ]
  },
  {
    "id": 520,
    "date": "2026-06-08",
    "theme": "Haven Helm",
    "impact": 4,
    "summary": "Built SNI-based filtering: Haven reads the destination site name from the secure web handshake and blocks a filtered site even when a device connects straight to its IP address -- catching connections that name-only filters miss.",
    "detail": null,
    "benefit": "A blocked site stays blocked even when reached directly by address, not just by name.",
    "ref": "3adb299",
    "features": []
  },
  {
    "id": 519,
    "date": "2026-06-08",
    "theme": "Haven Helm",
    "impact": 4,
    "summary": "Launched the Haven Wiki on lulhaven.com — a help and community knowledge base where each Haven feature is explained and customers can add pages and help each other, with a help link from every feature on the features page.",
    "detail": null,
    "benefit": "Customers get in-depth, searchable help and can contribute their own knowledge; every feature now has a discoverable explainer.",
    "ref": "deb79d9",
    "features": []
  },
  {
    "id": 518,
    "date": "2026-06-08",
    "theme": "Haven Helm",
    "impact": 4,
    "summary": "Added per-device scheduling to the Helm -- drag to set when each device's internet access is allowed throughout the week.",
    "detail": "Scheduler binds to hostname (MAC-randomization-safe). Green=allowed, red=blocked. Right-click to add/remove segments. Edge handles auto-hidden. nftables haven_schedule table updated every minute via cron. CGI GET/POST. Verified on <router serial> running 0.1.19.",
    "benefit": "Parents can block a device entirely during scheduled hours (bedtime, school) — no bypass",
    "ref": "ef8d88f",
    "features": []
  },
  {
    "id": 516,
    "date": "2026-06-07",
    "theme": "Helm UI",
    "impact": 4,
    "summary": "Haven's branding -- the gnome logo and watermark -- is now built into the router's firmware itself, so it survives a factory reset.",
    "detail": null,
    "benefit": "Haven visual identity is present from first boot on every router without extra steps",
    "ref": "c630a33",
    "features": []
  },
  {
    "id": 514,
    "date": "2026-06-07",
    "theme": "Burn Automation",
    "impact": 4,
    "summary": "Improved our-flashing process.",
    "detail": null,
    "benefit": "Burn chain no longer requires operator browser interaction for OEM→initramfs stage",
    "ref": "c078ab3",
    "features": []
  },
  {
    "id": 517,
    "date": "2026-06-07",
    "theme": "Burn Automation",
    "impact": 3,
    "summary": "Haven's <bypass mitigation> rules now automatically reapply themselves whenever the router's network connection resets, so filtering stays continuous.",
    "detail": null,
    "benefit": "DNS bypass protection is active from first WAN connect without waiting for hourly watchdog",
    "ref": "f82b8f5",
    "features": []
  },
  {
    "id": 515,
    "date": "2026-06-07",
    "theme": "Burn Automation",
    "impact": 3,
    "summary": "Automated our recovery process.",
    "detail": null,
    "benefit": "When router lands in U-Boot failsafe, operator runs one script instead of using a browser",
    "ref": "c078ab3",
    "features": []
  },
  {
    "id": 511,
    "date": "2026-06-06",
    "theme": "Hardware / Burn",
    "impact": 4,
    "summary": "Improved Haven's startup reliability on fresh-flashed routers.",
    "detail": null,
    "benefit": "Haven nftables rules, DNS intercept, and DoH blocks now activate automatically on first boot; no manual intervention required after flash",
    "ref": "54a0b313f5",
    "features": []
  },
  {
    "id": 510,
    "date": "2026-06-06",
    "theme": "Hardware / Burn",
    "impact": 4,
    "summary": "Confirmed the Haven Helm's two-part Helm/Administrators menu works correctly.",
    "detail": null,
    "benefit": "Shane's router (<router serial>) now runs current Haven with all shipped features; every future GL-MT6000 starts from a proven, non-stale baseline",
    "ref": "54a0b313f5",
    "features": []
  },
  {
    "id": 509,
    "date": "2026-06-06",
    "theme": "Hardware / Burn",
    "impact": 4,
    "summary": "Documented our official process for turning a stock router into a Haven, and strengthened our-recovery procedures.",
    "detail": "5 wrinkles documented: factory.bin/sysupgrade.bin distinction, GL.iNet 4.8.4 security hardening, U-Boot signature check, TFTP not available, failsafe unreachable from boot loop. Correct path: U-Boot web recovery → GL.iNet 4.6.2 → sysupgrade Haven.bin",
    "benefit": "<router serial> (Shane's router) is ready for Haven sysupgrade flash; burn procedure for all future MT6000 units is validated and documented in wiki",
    "ref": "-204",
    "features": []
  },
  {
    "id": 512,
    "date": "2026-06-06",
    "theme": "Testing / QA",
    "impact": 3,
    "summary": "Improved router first-boot setup.",
    "detail": null,
    "benefit": "Schema now initializes correctly on first boot, every time.",
    "ref": "54a0b313f5",
    "features": []
  },
  {
    "id": 513,
    "date": "2026-06-06",
    "theme": "Testing / QA",
    "impact": 2,
    "summary": "Ran a 32-test battery against a production router build and confirmed no real firmware defects.",
    "detail": null,
    "benefit": "Test suite baseline established for <router serial>; re-run after make-ship-ready.sh expected to clear 28 failures, leaving only intentional mutating-test guards",
    "ref": "f4fb4c1",
    "features": []
  },
  {
    "id": 503,
    "date": "2026-06-05",
    "theme": "Website / Marketing",
    "impact": 4,
    "summary": "Redesigned lulhaven.com's structure to be far more scannable -- content is now organized across dedicated pages (Features, Benefits, FAQ, Fun, About), with a homepage less than half its old length.",
    "detail": null,
    "benefit": "Homepage is now a tight conversion funnel; every section has a proper place; edit-once nav means link changes propagate site-wide.",
    "ref": "db97629",
    "features": []
  },
  {
    "id": 508,
    "date": "2026-06-05",
    "theme": "Website / Marketing",
    "impact": 3,
    "summary": "Moved the social media icons to a more visible spot on the About page, added a subject option to the contact form so beta testers and reviewers can identify themselves, and drafted the first social media posts recruiting beta testers and reviewers.",
    "detail": null,
    "benefit": "Haven now has a clear call-to-action for beta testers and reviewers across all social channels, with a sortable intake form.",
    "ref": "d09542634b",
    "features": []
  },
  {
    "id": 506,
    "date": "2026-06-05",
    "theme": "Website / Marketing",
    "impact": 3,
    "summary": "Established Haven social media presence: Facebook (facebook.com/lulhaven), X (@lulhaven), YouTube (@lulhaven). Profile photo, banners, bios set. Social click telemetry live in footer. Instagram/TikTok deferred.",
    "detail": null,
    "benefit": "Haven now has a social footprint for the Charter Member campaign launch.",
    "ref": "996e2d6b34",
    "features": []
  },
  {
    "id": 505,
    "date": "2026-06-05",
    "theme": "Process / Quality",
    "impact": 3,
    "summary": "Strengthened our internal quality-assurance process.",
    "detail": null,
    "benefit": "Debugging now has full visibility, keeping rework to a minimum.",
    "ref": "session-2026-06-05",
    "features": []
  },
  {
    "id": 504,
    "date": "2026-06-05",
    "theme": "Website / Marketing",
    "impact": 3,
    "summary": "Redesigned the Features page with a clearer How It Works section, side-by-side demo comparisons, a mobile-friendly layout, and a popup explaining Haven's 47 filtering strategies.",
    "detail": null,
    "benefit": "Features page has brand identity and works at any viewport width; sort telemetry captures visitor intent.",
    "ref": "3017b6e6e4",
    "features": []
  },
  {
    "id": 507,
    "date": "2026-06-05",
    "theme": "Website / Marketing",
    "impact": 2,
    "summary": "Improved the Fun page's video playback and the site footer's navigation.",
    "detail": null,
    "benefit": "Visitors can watch the NCC video without it autoplaying on load; play intent is tracked.",
    "ref": "326f58c6b2",
    "features": []
  },
  {
    "id": 500,
    "date": "2026-06-04",
    "theme": "Bypass resistance",
    "impact": 4,
    "summary": "Improved filtering coverage for encrypted DNS lookups, and strengthened automatic device detection.",
    "detail": null,
    "benefit": "Haven stays ahead of the latest tricks for sneaking around the filter, and recognizes the devices on your network more dependably.",
    "ref": "e42ba18ee8",
    "features": []
  },
  {
    "id": 502,
    "date": "2026-06-04",
    "theme": "Website",
    "impact": 3,
    "summary": "Sharpened the homepage around one clear idea: Haven is the software, not the box. Renamed the Haven lineup to 'Meet Haven,' added a 'these two identical routers — one has Haven' visual, and reframed the page title and description from 'router' to 'router software.'",
    "detail": null,
    "benefit": "Visitors grasp in a line that they're buying the intelligence, not the hardware — and that it runs on our or one they already own.",
    "ref": "275348d",
    "features": []
  },
  {
    "id": 501,
    "date": "2026-06-04",
    "theme": "Website",
    "impact": 3,
    "summary": "Reworked the homepage to show the real depth of control — 600+ individual sources across 50 groups you can flip one at a time or by the whole group — plus set-once-for-everyone (or per-device if you want), and an honest take on what happens to competitors' filtering when you stop paying.",
    "detail": null,
    "benefit": "Visitors immediately see how much finer-grained and easier Haven's control is than the on/off boxes other products ship.",
    "ref": "f2f6963",
    "features": []
  },
  {
    "id": 499,
    "date": "2026-06-04",
    "theme": "Website",
    "impact": 3,
    "summary": "Homepage now proves Haven's edge and unifies its audiences: an interactive demo shows VPNs and encrypted DNS defeating ordinary parental controls but failing against Haven, a new 'Why not all three?' section ties parental controls + privacy + less-algorithm into one promise for everyone on the network, and an FAQ with structured data was added for search.",
    "detail": null,
    "benefit": "Visitors can finally see the bypass-resistance that sets Haven apart, instead of taking it on faith — and the messaging stops competing on features rivals also have.",
    "ref": "16bb1b6",
    "features": []
  },
  {
    "id": 495,
    "date": "2026-06-02",
    "theme": "Architecture & data model",
    "impact": 4,
    "summary": "Tuned Haven to scale: a full performance pass made the router, app, and update service do far less repeated work for identical protection",
    "detail": "Per-update router work dropped sharply (fewer database queries, no needless service restarts, one firewall apply instead of many); large blocklists are only re-fetched when they actually change; the app opens without re-downloading everything each time. Verified behavior-identical at every step.",
    "benefit": "Filter changes apply smoothly, routers sip data instead of re-downloading lists they already have, and the monthly update service stays cheap and predictable whether there are ten routers or thousands.",
    "ref": "#178",
    "features": []
  },
  {
    "id": 497,
    "date": "2026-06-02",
    "theme": "YouHaven anti-algorithm app",
    "impact": 3,
    "summary": "U-Haven, the YouTube content-filter companion app, is now downloadable for both Android and Linux — the Linux build is a self-contained desktop app, and a new chooser page lets people pick their platform.",
    "detail": "Linux desktop is an Electron AppImage; Android is the existing APK; both hosted on GitHub Releases; lulhaven.com/get-uhaven is the platform chooser.",
    "benefit": "Customers can extend Haven's filtering to YouTube on the devices they actually watch on, not just at the router.",
    "ref": "75ca060abc",
    "features": []
  },
  {
    "id": 496,
    "date": "2026-06-02",
    "theme": "Testing & quality",
    "impact": 3,
    "summary": "Improved per-device YouTube filtering reliability.",
    "detail": null,
    "benefit": "Per-device YouTube filtering works as advertised on shipped routers, returning real results.",
    "ref": "34b1ac7",
    "features": []
  },
  {
    "id": 498,
    "date": "2026-06-02",
    "theme": "Haven brand",
    "impact": 2,
    "summary": "Introduced Haven Gold — a build-it-yourself edition for makers — to the Haven lineup on the homepage.",
    "detail": null,
    "benefit": "Gives the maker / DIY crowd a way to run Haven on hardware they flash themselves, with a mascot and identity of its own.",
    "ref": "c35b620abc",
    "features": []
  },
  {
    "id": 491,
    "date": "2026-06-01",
    "theme": "Filtering",
    "impact": 5,
    "summary": "YouTube content filtering in the YouHaven app now covers search, home, and recommendations -- plus a desktop tool to see and verify the filtering directly.",
    "detail": null,
    "benefit": "The product's core promise works again and is now visibly verifiable: over 90% of a blocked source's content is suppressed across the app",
    "ref": "4d06de6",
    "features": []
  },
  {
    "id": 494,
    "date": "2026-06-01",
    "theme": "YouHaven anti-algorithm app",
    "impact": 4,
    "summary": "U-Haven now runs on the desktop as a launchable app that filters YouTube the same way.",
    "detail": "Channel-ID catalog split onto its own release train (build_yt_catalog.py -> yt-catalog.json) fetched whole by the device and intersected locally with per-device blocked items; channels no longer stored on the router; U-Haven desktop app (Linux, launchable) with router IP override box; app rebranded U-Haven",
    "benefit": "You get the same content control on a computer as on the TV, and the channel lists update on their own without touching the router",
    "ref": "7ad5ff1",
    "features": []
  },
  {
    "id": 492,
    "date": "2026-06-01",
    "theme": "Filtering",
    "impact": 4,
    "summary": "Haven can now block known VPN and Tor exit points, using a constantly updated list of thousands of IP ranges — so when a customer turns filtering on, that protection extends to VPN and Tor traffic too.",
    "detail": null,
    "benefit": "Closes a major evasion path for the customers who filter, with the list refreshed on the normal low-traffic update schedule.",
    "ref": "0ff0297",
    "features": []
  },
  {
    "id": 490,
    "date": "2026-06-01",
    "theme": "Testing & quality",
    "impact": 4,
    "summary": "To make sure our tests are trustworthy, we deliberately break Haven's filtering on a test unit and confirm our test suite catches it every time.",
    "detail": null,
    "benefit": "Earned, rock-solid confidence that green tests reflect a working router; it immediately exposed one hollow test, which we fixed",
    "ref": "",
    "features": []
  },
  {
    "id": 489,
    "date": "2026-06-01",
    "theme": "Testing & quality",
    "impact": 4,
    "summary": "Rebuilt how we verify Haven's claims -- breaking every claim down into specific testable pieces, each checked independently, with permanent records of every result.",
    "detail": null,
    "benefit": "We can show, attribute by attribute, that a given router does what we claim — and a failure pinpoints exactly which property and how it was checked",
    "ref": "ba1ace1",
    "features": []
  },
  {
    "id": 488,
    "date": "2026-06-01",
    "theme": "Testing & quality",
    "impact": 4,
    "summary": "Overhauled our internal testing process -- added coverage for every claim we make about Haven, and made sure a release can't ship if any advertised feature isn't verified.",
    "detail": "73 active tests, 0 coverage gaps; turned silent PASS-on-skip stubs into honest skips and made the runner fail-closed (exit 2 on any failure or coverage gap).",
    "benefit": "A passing test run now means the product actually works, and every marketing claim ships fully tested.",
    "ref": "c42ca3a18",
    "features": []
  },
  {
    "id": 493,
    "date": "2026-06-01",
    "theme": "Per-device filtering",
    "impact": 3,
    "summary": "Devices with no name (smart TVs, streaming sticks, many IoT) now appear in the device list automatically as 'Detected #N', identified by hardware address, ready to rename and filter",
    "detail": null,
    "benefit": "Every device on your network is filtered, whether or not it broadcasts a name.",
    "ref": "976eb3ac",
    "features": []
  },
  {
    "id": 485,
    "date": "2026-05-31",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Off-network filtering became per-device and self-serve: a parent picks a device in the Helm, scans its code, and that specific device keeps its own filtering rules on cellular — different devices, different rules, even away from your network.",
    "detail": "Helm enroll action mints an opaque per-device handle and registers it with the relay over the tunnel; relay routes the handle to that device's filter; proven end-to-end on the bench.",
    "benefit": "Each device now carries its own protection off the network, set up in one scan, with the device's name never leaving your Haven.",
    "ref": "",
    "features": []
  },
  {
    "id": 487,
    "date": "2026-05-31",
    "theme": "Feature coverage gate — every claimed feature must be tested",
    "impact": 2,
    "summary": "Ran our full automated test suite to a clean pass.",
    "detail": null,
    "benefit": "Confidence that Haven's features work as claimed, and a test suite that won't throw false alarms.",
    "ref": "5b25f4f",
    "features": []
  },
  {
    "id": 486,
    "date": "2026-05-31",
    "theme": "Haven brand, product lineup & packaging",
    "impact": 2,
    "summary": "Refreshed the Haven lineup on the website: new mascot artwork for both models and renamed Haven Olive to Haven OD.",
    "detail": null,
    "benefit": "A sharper, more consistent product presentation for the two Havens on the homepage.",
    "ref": "1d3ef58",
    "features": []
  },
  {
    "id": 484,
    "date": "2026-05-30",
    "theme": "Off-network filtering",
    "impact": 5,
    "summary": "Off-network filtering went live: a device keeps Haven's protection on cellular with no app, set up by scanning a code on the router. Proven end-to-end on a real phone, and each network routes to its own unit.",
    "detail": "Cloud relay (DoT/DoH) over WireGuard to your router's filter; per-router provisioning scripted into the burn; SNI selector routes each network to its own router; per-device routing mechanism proven.",
    "benefit": "Protection that used to stop at the front door now follows phones and tablets wherever they go, with a one-scan setup and nothing to install.",
    "ref": "",
    "features": []
  },
  {
    "id": 483,
    "date": "2026-05-30",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Locked the no-app off-network design — a phone keeps Haven's filtering on cellular with only a DNS setting (no app to install), routed back to its own Haven; and stood up the live relay server it runs on.",
    "detail": null,
    "benefit": "Filtering follows people wherever they go without installing anything on the phone — a one-time setting, not yet another monitoring app.",
    "ref": "",
    "features": []
  },
  {
    "id": 482,
    "date": "2026-05-30",
    "theme": "Filtering",
    "impact": 4,
    "summary": "Improved always-allowed site filtering.",
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
    "summary": "Every feature Haven advertises must now pass an automated check (or have a documented reason it doesn't) before a release can ship.",
    "detail": null,
    "benefit": "Customers can trust that anything claimed on the site is actually verified — every advertised feature ships fully tested.",
    "ref": "f36cf86",
    "features": []
  },
  {
    "id": 472,
    "date": "2026-05-29",
    "theme": "Marketing & website",
    "impact": 5,
    "summary": "Launched the Haven Charter Member campaign page on lulhaven.com — a Charter Edition Haven Navy router, limited to 100, ships Nov 25 2026.",
    "detail": null,
    "benefit": "Haven's first production run has a public home and a ships-by date.",
    "ref": "36fc519e18",
    "features": []
  },
  {
    "id": 469,
    "date": "2026-05-29",
    "theme": "Marketing & website",
    "impact": 5,
    "summary": "Launched the Haven Charter Member campaign page on lulhaven.com: a Charter Edition router, limited to a run of 100.",
    "detail": "Charter Member band below the hero for the Haven Navy, a manual of-100 counter, and a ships-by date; replaced outdated crowdfunding copy.",
    "benefit": "Haven's first production run has a public home and a ships-by date.",
    "ref": "36fc519e18",
    "features": []
  },
  {
    "id": 480,
    "date": "2026-05-29",
    "theme": "Testing & quality",
    "impact": 4,
    "summary": "Improved automatic device detection, and strengthened our automated test suite.",
    "detail": null,
    "benefit": "Higher confidence the product works as shipped — problems get caught and fixed before customers ever see them.",
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
    "summary": "Haven now identifies devices by their friendly name: one row per name, set the filter once and it follows the name wherever it shows up. Side benefit -- if you give multiple devices the same name (everyone in the sales department named 'sales'), they all share one filter profile by design, no setup required.",
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
    "summary": "Devices that join the network now appear in Haven's per-device picker automatically — name and all — without anyone touching the router; if a device disappears for 30 days it quietly fades from the list, and the moment it comes back its place and any saved choices return with it.",
    "detail": null,
    "benefit": "Anyone can set per-device rules without learning router admin.",
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
    "summary": "Strengthened our internal security practices.",
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
    "summary": "Improved our internal development tooling and data backups.",
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
    "summary": "Streamlined our internal development tooling and documentation to work more efficiently, with no change in behavior.",
    "detail": "Audited the instruction files, moved the Hasta ritual to an on-demand skill, removed duplicated blocks, and documented the harness resource-cost model.",
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
    "summary": "The Haven Helm router UI now wears Haven's own brand -- the Lulhaven sailor gnome in the browser tab and in the sidebar above the Lulhaven name.",
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
    "summary": "Havens now configure themselves to your network the moment you plug them in. The Haven automatically detects and resolves address conflicts with your existing equipment — whether it clashes with your current router's settings or your network is laid out differently than the factory default — so setup stays genuinely plug-and-play with no manual network configuration.",
    "detail": "On first power-up the router examines the network on both sides, chooses an address range that won't conflict, and quietly reconfigures itself if needed. Your existing devices keep working, and the router's filtering and admin page follow the new address automatically. The behavior is covered by an automated regression check. Rollout note: confirm the earliest Early-Adopter units receive this update.",
    "benefit": "A customer can plug a Haven into any network and have it just work — no manual setup — even when their existing router uses the same common address range or an unusual one.",
    "ref": "8ae6134362",
    "features": [
      {
        "id": 2,
        "lead": "Plug in and it works"
      },
      {
        "id": 26,
        "lead": "Plug in, set a password, choose what to filter"
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
    "benefit": "Every Haven change is validated in our lab before customers ever see it.",
    "ref": "wiki-145",
    "features": []
  },
  {
    "id": 462,
    "date": "2026-05-26",
    "theme": "Architecture & data model",
    "impact": 5,
    "summary": "Validated and implemented an improved approach to per-device filtering, ensuring it works as designed before shipping our first router.",
    "detail": "A multi-day deep-dive on how off-the-shelf networking software handles client-specific rules surfaced a quiet limitation that affects every product in this space. We redesigned around it before the feature shipped to customers.",
    "benefit": "Caught a feature limitation in our lab before it ever shipped.",
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
    "summary": "Strengthened our internal test tooling.",
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
    "summary": "Per-device filtering — every device on the network can have its own content rules, independent of the network defaults.",
    "detail": "Customers can now apply different rules to one person's tablet versus another's laptop versus a guest's phone, all from one screen on the router. The defaults stay simple; the per-device controls are there when you want them and out of the way when you don't.",
    "benefit": "You can apply different rules to different devices — strict for some, light-touch for others, all without separate routers or accounts.",
    "ref": "wiki-137",
    "features": [
      {
        "id": 1,
        "lead": "Every connected device"
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
    "summary": "Added internal website analytics to help us understand how visitors use the site, without relying on third-party trackers.",
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
    "summary": "Launched this Milestones page -- a browsable history of Haven's development, filterable by impact and linked to related features.",
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
    "summary": "Launched a new Benefits page explaining why customers should care about Haven, with an initial 10 benefits listed.",
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
    "summary": "Assembled the project history that powers this Milestones page, covering April 25 through May 25.",
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
    "summary": "Launched the new Features page, and set up internal systems to track project history.",
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
    "summary": "Per-device filtering deployed to the bench router — live-fire testing revealed improvements in two filtering paths and a deeper architectural enhancement that shaped the design.",
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
    "summary": "Improved internal record-keeping so project history is automatically prepared for public sharing.",
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
    "summary": "Improved site wording for clarity and broader audience appeal.",
    "detail": "Audited every customer-facing reference to 'Wi-Fi' or 'kid/kids' across features, benefits, and milestones tables. Rewrote network-medium-exclusive copy to include wired Ethernet ('on your network' + explicit Wi-Fi/Ethernet pairing where meaningful). Reworded 'kid/children' mentions in 25 places across all surfaces. Two intentional keeps preserved: Parenting preset name, cultural critique line.",
    "benefit": "Copy now speaks directly to adult self-filtering and senior anti-scam users, alongside families.",
    "ref": "f6e964f533",
    "features": []
  },
  {
    "id": 456,
    "date": "2026-05-25",
    "theme": "Customer features (website)",
    "impact": 4,
    "summary": "Wrote detailed descriptions for 34 product features on the Features page.",
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
    "summary": "\"Meet Haven's Routers\" section added to the homepage -- the Olive and Navy gnomes introduce the product lineup.",
    "detail": "New section between hero and How-It-Works introduces Haven Olive (Essential Wi-Fi 6) and Haven Navy (Performance flagship) with mascot illustrations. The homepage previously named no specific product.",
    "benefit": "Visitors learn which Haven fits their network before clicking through to specifications.",
    "ref": "f6e964f533",
    "features": [
      {
        "id": 30,
        "lead": "Haven Olive Green"
      }
    ]
  },
  {
    "id": 453,
    "date": "2026-05-25",
    "theme": "Marketing & website",
    "impact": 4,
    "summary": "Redesigned the homepage's top section around five clear paths: Benefits, Features, Live Demo, Milestones, and Get Notified.",
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
    "summary": "Improved our software update process.",
    "detail": "Internal-only refinement.",
    "benefit": "OTA upgrades land cleanly, and filtering stays continuously active throughout.",
    "ref": "wiki-144",
    "features": []
  },
  {
    "id": 459,
    "date": "2026-05-25",
    "theme": "Tooling & infrastructure",
    "impact": 3,
    "summary": "Simplified the internal process for publishing updates to the Features, Benefits, and Milestones pages.",
    "detail": "Build + timestamp-based cache-buster bump + deploy in one command. Cache-buster discipline (Cloudflare max-age=14400 means stale browsers without ?v= bump) now automated. Workflow becomes: edit <database> in DB Browser -> <script> -> live.",
    "benefit": "End-to-end publish in one command; cache-busting happens automatically; data edits land on the live site within seconds.",
    "ref": "7df464a598",
    "features": []
  },
  {
    "id": 271,
    "date": "2026-05-25",
    "theme": "Customer features (website)",
    "impact": 3,
    "summary": "Improved internal documentation of Haven's feature set.",
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
    "summary": "Added a Details button to each feature on the website so you can expand just the one you want to read.",
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
    "summary": "Improved our internal development environment management.",
    "detail": "Inventoried all claude-cowork artifacts: <file path> (611M repo), <file path> (158M logs), <file path> (2.3G user data), launchers in <file path>, desktop file, icons, electron+asar via npm. User chose true clean slate. Removed everything except Claude Code CLI itself (which lives at <directory> and <directory> — different paths). One leftover symlink (/sessions, root-owned) requires Dave's sudo to remove. Fresh install path: git clone johnzfitch/claude-cowork-linux + bash install.sh.",
    "benefit": "Claude Desktop state can be reset independently of the working Claude Code CLI that runs the dev work; user data nuked per explicit user choice",
    "ref": "session",
    "features": []
  },
  {
    "id": 447,
    "date": "2026-05-24",
    "theme": "Session continuity",
    "impact": 5,
    "summary": "Made early progress on off-network filtering, multi-admin accounts, notifications, and automated verification -- continuing work toward those features.",
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
    "summary": "Built the initial secure-tunnel and encrypted-DNS infrastructure that will let Haven's filtering keep working even when a router isn't on the customer's home network.",
    "detail": null,
    "benefit": "Content filtering stays active on your devices even off your own Wi-Fi, including over cellular.",
    "ref": "c55539ac80",
    "features": [
      {
        "id": 13,
        "lead": "Zero tolerance for bypass"
      },
      {
        "id": 14,
        "lead": "Filter works on the go too"
      }
    ]
  },
  {
    "id": 279,
    "date": "2026-05-24",
    "theme": "Email notifications",
    "impact": 5,
    "summary": "Haven now emails you automatically when a new device joins your network.",
    "detail": null,
    "benefit": "Parents see what is happening on their network without having to log in and look.",
    "ref": "730fa71d8e",
    "features": [
      {
        "id": 17,
        "lead": "New devices appear automatically"
      }
    ]
  },
  {
    "id": 278,
    "date": "2026-05-24",
    "theme": "Product definition",
    "impact": 5,
    "summary": "Refreshed internal product planning documentation to reflect the project's current state.",
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
    "summary": "Updated internal product planning documentation.",
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
    "summary": "Named the router's control interface 'The Haven Helm.'",
    "detail": null,
    "benefit": "Brand vocabulary locked. Every customer-facing surface uses ONE name for the control surface.",
    "ref": "3e52af069e",
    "features": []
  },
  {
    "id": 275,
    "date": "2026-05-24",
    "theme": "Product definition",
    "impact": 5,
    "summary": "Improved internal product planning documentation.",
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
    "summary": "Updated our internal feature-tracking system.",
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
    "summary": "Haven now emails you automatically whenever a new device joins your network.",
    "detail": "First Haven notification event proven end-to-end in production. You get instant awareness when a new device joins the network — no checking the screen required.",
    "benefit": "Customers find out about activity on their network without having to log in. The system reaches out to them.",
    "ref": "",
    "features": [
      {
        "id": 17,
        "lead": "New devices appear automatically"
      }
    ]
  },
  {
    "id": 136,
    "date": "2026-05-24",
    "theme": "SQLite source-of-truth pipeline",
    "impact": 5,
    "summary": "Designed a way to track which device on your network made each filter change.",
    "detail": "Dave 2026-05-24 09:24 CDT: \"How difficult would it be to keep a file change table?\nEveryone logs in as root, but we could at least know which machine they are locked in\nfrom, right?\"",
    "benefit": "Audit table designs the answer to 'who changed what filter at what time' — accountability when there are multiple admins on the network.",
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
    "benefit": "Every router has a unique secure-tunnel identity from day one, making the whole fleet more secure.",
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
    "benefit": "Customers can factory-reset the router without losing their content rules. Setup happens once, not every time.",
    "ref": "4f200b454a",
    "features": [
      {
        "id": 10,
        "lead": "Your settings survive a restart"
      }
    ]
  },
  {
    "id": 365,
    "date": "2026-05-24",
    "theme": "Email notifications",
    "impact": 4,
    "summary": "Built our internal-status reporting system.",
    "detail": null,
    "benefit": "Parents see what is happening on their network without having to log in and look.",
    "ref": "173f36dbd4",
    "features": [
      {
        "id": 17,
        "lead": "New devices appear automatically"
      }
    ]
  },
  {
    "id": 363,
    "date": "2026-05-24",
    "theme": "Email notifications",
    "impact": 4,
    "summary": "Improved our internal alerting system.",
    "detail": null,
    "benefit": "Admins see what is happening on their network without having to log in and look.",
    "ref": "1072f3dcdb",
    "features": [
      {
        "id": 17,
        "lead": "New devices appear automatically"
      }
    ]
  },
  {
    "id": 361,
    "date": "2026-05-24",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "The list of known devices on your network now lives in <router data partition>, a dedicated persistent storage area on the router.",
    "detail": null,
    "benefit": "First customer-data table living on /<router data partition>. Factory reset preserves the device list, keeping new-device notifications accurate.",
    "ref": "34eb351f3d",
    "features": []
  },
  {
    "id": 281,
    "date": "2026-05-24",
    "theme": "Multi-administrator UI",
    "impact": 4,
    "summary": "Planned improvements to first-time setup and administrator account management.",
    "detail": null,
    "benefit": "Both parents can manage filters from their own accounts; full access to the network always stays protected.",
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
    "summary": "Improved internal tooling for maintaining the website's feature list.",
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
    "summary": "Added an Administrators panel to the website demo, showing how multiple admins can manage a Haven network.",
    "detail": null,
    "benefit": "Both parents can manage filters from their own accounts, with root hidden to keep access simple and safe.",
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
    "summary": "Launched a Features page you can sort by audience — parent, privacy-focused, and more — with behind-the-scenes tracking of what visitors click first.",
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
    "summary": "Designed how each device on your network can have its own filter settings, and which settings win when they overlap.",
    "detail": "Dave 2026-05-24 09:15 CDT, thinking out loud about per-device filtering: \"we could save\nour dataset just with a device label on it, and we could have multiple — we could have\na million of them. And the other thing is, we could also have an overall, like, default\nthat would requir…",
    "benefit": "Per-device filter profile schema designed; we can ship 'Different people's devices can have different rules' without rewriting the data layer.",
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
    "summary": "Strengthened our internal alerting system's security.",
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
    "summary": "Improved our internal alerting system.",
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
    "summary": "Improved our internal account-synchronization tooling.",
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
    "summary": "Designed a way for the router to still allow access to emergency information, like first-aid instructions, even under strict filtering.",
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
    "summary": "Designed how per-device filter profiles would work and take priority over each other, for a future product phase.",
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
    "summary": "Improved the design of per-device filtering.",
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
    "summary": "Designed internal systems to track and audit product changes.",
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
    "summary": "Strengthened internal tooling for managing the website's feature list.",
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
    "summary": "Improved internal feature-list documentation.",
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
    "summary": "Added a bus-and-phone analogy quote to the website, placed above the '47 Strategies' section.",
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
    "summary": "Refined the website's 'Who drives your bus?' messaging.",
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
    "summary": "Replaced the website's screenshot of the Haven interface with a sharper, higher-resolution image.",
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
    "summary": "Improved the Browser-on-Haven page title.",
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
    "summary": "Updated the Browser-on-Haven page copy.",
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
    "summary": "Tweaked homepage wording for a punchier tone.",
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
    "summary": "Broadened the homepage's messaging to speak to both parents and adults who care about algorithm-driven feeds.",
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
    "summary": "Rewrote the homepage's main introduction to speak to your whole network, leading with a clear list of problems Haven fixes.",
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
    "summary": "Published dedicated website pages for families and for privacy-focused customers, each highlighting the features that matter most to them.",
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
    "summary": "Made each homepage feature bullet linkable directly, so specific features can be shared with a link.",
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
    "summary": "Made small wording and layout tweaks to the website's sorting controls and homepage headline.",
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
    "summary": "The first time you log into your Haven, it now takes you straight to creating your admin account — whoever sets it up first is in control from the start.",
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
    "summary": "Designed how Haven responds when someone urgently needs information that gets mistakenly blocked during a real emergency.",
    "detail": "Dave 2026-05-24 09:12 CDT, in a \"mixed feelings\" reflection on filtering: imagine you're\ntrying to figure out how to put together a tourniquet, you're searching online, and a\nHaven category block puts you between you and the page. That's the failure mode where the\nfilter actively…",
    "benefit": "Emergency info-seeking design baked in — poison control, Red Cross, and Mayo Clinic are always reachable, filter or no filter.",
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
    "summary": "Improved the 'Click, Save' card's image display.",
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
    "summary": "Improved the features page's reliability.",
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
    "summary": "Added two export options: a shareable filter-settings file, and an encrypted full backup of your data.",
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
    "summary": "Made the Haven interface screenshot the website's featured full-width image, and renamed that section 'Click, Save.'",
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
    "summary": "Designed two ways to export your data: a shareable version of just your filter settings, and a fully encrypted backup of everything.",
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
    "summary": "YouTube channel-level filtering integrated with the category controls.",
    "detail": "Selecting a category in the Haven controls now drives the YouTube channel blocklist automatically — no separate management, no parallel configuration. One toggle, one effect.",
    "benefit": "YouTube blocklists update themselves as your preferences change. Customers don't manage two lists.",
    "ref": "7e76f5f06f",
    "features": [
      {
        "id": 8,
        "lead": "Better YouTube for you"
      }
    ]
  },
  {
    "id": 287,
    "date": "2026-05-23",
    "theme": "Wiki & documentation",
    "impact": 5,
    "summary": "Approved the plan to build filtering that works even when a device is off your network.",
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
    "summary": "Proved out, end to end, that Haven's filtering can work even when a device is away from your home network.",
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
    "summary": "Off-network filtering proven end-to-end — Haven now filters content even when devices leave your Wi-Fi.",
    "detail": "The hardest gap in this product category — what happens when a phone leaves the network — is closed. Filtering follows the person, not the network.",
    "benefit": "Haven keeps working when devices roam to cellular or guest Wi-Fi, not just your home network.",
    "ref": "",
    "features": [
      {
        "id": 14,
        "lead": "Filter works on the go too"
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
    "summary": "YouTube account-level enforcement shipped in the Haven control screen.",
    "detail": "Customers can opt-in to apply their YouTube channel preferences to their actual YouTube account, not just block at the network layer. Off by default; takes effect only when explicitly enabled.",
    "benefit": "Channel suppression travels with the user's YouTube account — works wherever they sign in, not just on the network.",
    "ref": "",
    "features": [
      {
        "id": 8,
        "lead": "Better YouTube for you"
      }
    ]
  },
  {
    "id": 125,
    "date": "2026-05-23",
    "theme": "SQLite source-of-truth pipeline",
    "impact": 5,
    "summary": "Finalized the data structure behind account-level enforcement, the first step toward shipping the feature.",
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
    "summary": "Improved internal tooling for generating Haven's content lists.",
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
    "summary": "Haven is designed to first prevent someone from bypassing the filter, and if that fails, detect when the network's DNS settings have been tampered with.",
    "detail": "Dave decision 2026-05-23: Haven's bypass story is not pure prevention — it is\nprevention with a monitoring fallback. A determined user will always find a hole\n(VPN, cellular, manual DNS change on the device). The design concession is to\ndetect, not deny, the holes Haven can't phys…",
    "benefit": "Visitors land on a page that explains Haven faster and find it more appealing.",
    "ref": "",
    "features": [
      {
        "id": 13,
        "lead": "Zero tolerance for bypass"
      }
    ]
  },
  {
    "id": 128,
    "date": "2026-05-23",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Finished more of the behind-the-scenes work for account-level enforcement; the feature isn't fully active yet.",
    "detail": "Step D split into two sub-steps. D.1 (this session): plumbing. MainActivity.kt fetchActions() mirrors fetchBlocklist(), pushes window.havenYtActions={v,actions} at onPageFinished; haven_filter.js passive sweep walks every InnerTube response for menuServiceItemRenderer with NOT_IN…",
    "benefit": "Reliable, persistent behavior with no manual setup the customer has to do.",
    "ref": "",
    "features": []
  },
  {
    "id": 448,
    "date": "2026-05-23",
    "theme": "Session continuity",
    "impact": 3,
    "summary": "Reviewed competitive research and refreshed the homepage's main call-to-action.",
    "detail": "Captured a teardown of do-it-yourself router-filtering guides against Haven's pre-flashed approach; refreshed homepage hero CTAs.",
    "benefit": "Decisions and discoveries persist across sessions; future-us picks up where past-us left off.",
    "ref": "165e9beb81",
    "features": []
  },
  {
    "id": 297,
    "date": "2026-05-23",
    "theme": "Session continuity",
    "impact": 3,
    "summary": "Improved internal record-keeping for work sessions.",
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
    "summary": "Improved internal tools so each work session starts with better context.",
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
    "summary": "Reorganized internal development tooling for better reliability.",
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
    "summary": "Improved internal file organization.",
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
    "summary": "Improved internal development workflows.",
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
    "summary": "Improved internal tools that keep development sessions organized and on track.",
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
    "summary": "YouTube channel blocklist now driven dynamically from category preferences.",
    "detail": "",
    "benefit": "Customers manage one list, not two; YouTube blocklists auto-update.",
    "ref": "24de75aecb",
    "features": [
      {
        "id": 8,
        "lead": "Better YouTube for you"
      }
    ]
  },
  {
    "id": 288,
    "date": "2026-05-23",
    "theme": "Wiki & documentation",
    "impact": 3,
    "summary": "Reviewed how competing tools handle content filtering, to inform Haven's approach.",
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
    "summary": "Connected Chapter 2b of the manga to its online reader.",
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
    "summary": "Added a button for manga Chapter 2a on the website and reorganized the page layout.",
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
    "summary": "Reorganized the homepage to put the main buttons higher up, and tightened the subtitle wording.",
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
    "summary": "Studied do-it-yourself filtering setups to sharpen Haven's approach.",
    "detail": "Reviewed the popular do-it-yourself guides that layer ad-blocking and per-domain control on top of a basic filtered-DNS setup, and listed every step they leave to the customer. Those steps are the ones Haven is built to absorb.",
    "benefit": "Catalogued what a do-it-yourself ad-blocking setup actually asks of you — a container to run, blocklists to wire up, upkeep to remember — so that Haven can do that work instead of handing it to you.",
    "ref": "",
    "features": []
  },
  {
    "id": 129,
    "date": "2026-05-23",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "Studied competing filtering tools to sharpen Haven's approach.",
    "detail": "Reviewed the most widely-followed do-it-yourself guides for filtering a home network and catalogued every step they ask a customer to perform. Each of those steps is work Haven is built to absorb.",
    "benefit": "Confirmed that the customers who care about parental control and the customers who care about privacy are largely the same people, wanting the same thing — which keeps Haven pointed at a real need rather than a guess.",
    "ref": "",
    "features": []
  },
  {
    "id": 291,
    "date": "2026-05-23",
    "theme": "YouHaven anti-algorithm app",
    "impact": 1,
    "summary": "Improved internal tooling and reference data supporting filter accuracy.",
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
    "summary": "Rebuilt the backend filter databases to include YouTube channel-level data.",
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
    "summary": "Connected the behind-the-scenes pieces that let a YouTube content-category toggle take effect.",
    "detail": "",
    "benefit": "YouTube channel preferences flow through the Haven controls and reach the app reliably.",
    "ref": "",
    "features": []
  },
  {
    "id": 124,
    "date": "2026-05-22",
    "theme": "Architecture & data model",
    "impact": 4,
    "summary": "Tuned the cloud-filtering service to check in once per video watched, keeping it fast and efficient.",
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
    "summary": "Filtering that protects a device off your network can always reach your Haven for the current rules — even though many internet connections share one address, which normally blocks incoming connections.",
    "detail": "Your settings live on your Haven. Protection that travels with a device checks back for them, so a change you make on your network reaches a device that has left it.",
    "benefit": "Today's design supports tomorrow's features without painful rewrites.",
    "ref": "",
    "features": [
      {
        "id": 14,
        "lead": "Filter works on the go too"
      }
    ]
  },
  {
    "id": 122,
    "date": "2026-05-22",
    "theme": "Architecture & data model",
    "impact": 4,
    "summary": "When you change your filter settings, your Haven automatically syncs the update to the cloud so off-network filtering stays current.",
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
    "summary": "Strengthened the cloud infrastructure behind off-network filtering.",
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
    "benefit": "Filtering follows your devices even off your own Wi-Fi, including on cellular data. No extra device required.",
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
    "summary": "Moved the manga reader to Haven's own web domain for a more consistent experience.",
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
    "summary": "Documented progress notes for an internal project.",
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
    "summary": "Finished Chapter 2b of the Haven manga.",
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
    "summary": "Documented creative-project decisions internally.",
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
    "summary": "Built an internal search tool for past work session records.",
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
    "summary": "Expanded a chapter draft for an internal project.",
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
    "summary": "Expanded a chapter draft for an internal project.",
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
    "summary": "Finished a chapter draft, including an epilogue, for an internal project.",
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
    "summary": "Finished the first full draft of a chapter, ready for the next stage.",
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
    "summary": "Prepared a chapter draft for an internal project.",
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
    "summary": "Documented planning notes for an internal project.",
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
    "summary": "Documented internal creative-project details.",
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
    "summary": "Rewrote the homepage's main messaging to speak more directly to parents, and added a new hero image.",
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
    "summary": "Improved our internal team-collaboration tooling.",
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
    "summary": "Documented character background details for an internal project.",
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
    "summary": "Refined a chapter draft for an internal project.",
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
    "summary": "Built internal tools that automate our-build process.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "d9cc60280d",
    "features": [
      {
        "id": 2,
        "lead": "Plug in and it works"
      }
    ]
  },
  {
    "id": 379,
    "date": "2026-05-16",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Improved our internal build tools.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "b4c9e37b56",
    "features": [
      {
        "id": 2,
        "lead": "Plug in and it works"
      },
      {
        "id": 26,
        "lead": "Plug in, set a password, choose what to filter"
      }
    ]
  },
  {
    "id": 377,
    "date": "2026-05-16",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Refined our internal build tooling.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "e1dba06af6",
    "features": []
  },
  {
    "id": 376,
    "date": "2026-05-16",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Improved our internal build tooling.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "9c9d57af4f",
    "features": []
  },
  {
    "id": 374,
    "date": "2026-05-16",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Improved our internal-restore process.",
    "detail": null,
    "benefit": "Reliable, persistent behavior with no manual setup the customer has to do.",
    "ref": "f3f1fababb",
    "features": []
  },
  {
    "id": 369,
    "date": "2026-05-16",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Improved our internal firmware release-tracking.",
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
        "lead": "Plug in and it works"
      },
      {
        "id": 26,
        "lead": "Plug in, set a password, choose what to filter"
      }
    ]
  },
  {
    "id": 116,
    "date": "2026-05-16",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Strengthened our firmware-recovery process.",
    "detail": "~90-minute exploration documented so future-us doesn't repeat the dead-end. Internal-only learning.",
    "benefit": "Havens ship reliably; we know the safe vs unsafe recovery paths.",
    "ref": "",
    "features": []
  },
  {
    "id": 313,
    "date": "2026-05-16",
    "theme": "Email notifications",
    "impact": 3,
    "summary": "Documented internal systems tracking launch sign-ups and router firmware versions.",
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
    "summary": "Logged internal reminders to keep work on track.",
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
    "summary": "Improved the launch sign-up system to confirm email addresses and track outreach more accurately.",
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
    "summary": "Began an internal archive and outline for a creative project.",
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
    "summary": "Improved our internal build tool.",
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
    "summary": "Strengthened our internal build tool.",
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
    "summary": "Improved the launch signup system to track where each signup came from.",
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
    "summary": "Added email confirmation to the launch signup list, so signups are verified before going out, along with the service that sends those emails.",
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
    "summary": "Built an internal router-firmware restore tool.",
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
    "summary": "Improved our internal recovery documentation.",
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
    "summary": "Improved our production build scripts.",
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
    "summary": "Improved our internal-recovery process.",
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
    "summary": "Documented internal technical notes for future infrastructure work.",
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
    "summary": "Improved how internal development tools load project context, for faster work sessions.",
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
    "summary": "Reorganized internal documentation for clarity.",
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
    "summary": "Routers now come with sensible default personalization already configured out of the box.",
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
    "summary": "Standardized our internal firmware-flashing scripts.",
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
    "summary": "Improved our production firmware-flashing scripts.",
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
    "summary": "Improved our internal build-progress logging.",
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
    "summary": "Improved our internal build tracking.",
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
    "summary": "Improved our internal build tracking.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "c972f30264",
    "features": [
      {
        "id": 2,
        "lead": "Plug in and it works"
      }
    ]
  },
  {
    "id": 319,
    "date": "2026-05-15",
    "theme": "Wiki & documentation",
    "impact": 5,
    "summary": "Confirmed that <router serial>+ units ship with Haven software already installed, ready to use out of the box.",
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
    "summary": "Finished and verified, on real hardware, the process used to load Haven software onto routers before they ship.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "6974f27a64",
    "features": []
  },
  {
    "id": 317,
    "date": "2026-05-15",
    "theme": "Build maintenance UI",
    "impact": 5,
    "summary": "Streamlined our internal build process.",
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
    "summary": "Improved the router's admin experience.",
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
    "summary": "Strengthened our internal build-logging system.",
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
    "summary": "Improved our-flashing process.",
    "detail": "2026-05-15 21:46 CDT — Dave's reaction: \"This was my vision from the\nstart.\" The Phase 2 burn architecture (committed to per is\nnow fully implemented, live-fire tested end-to-end, and operationally\nsound. <router serial> will be the first router burned under this architecture.",
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "",
    "features": [
      {
        "id": 2,
        "lead": "Plug in and it works"
      }
    ]
  },
  {
    "id": 112,
    "date": "2026-05-15",
    "theme": "Architecture & data model",
    "impact": 5,
    "summary": "Decision: all of your settings and history live on your Haven's own storage — the encrypted cloud copy exists only as a backup, never as the primary copy.",
    "detail": "2026-05-15 — Dave's privacy stance crystallized this architecture during Phase 2 design.",
    "benefit": "/<router data partition> concept locked: customer settings survive a factory reset because they live on raw eMMC that firstboot does not touch.",
    "ref": "",
    "features": [
      {
        "id": 4,
        "lead": "We're built so we can't see what you're doing"
      },
      {
        "id": 5,
        "lead": "Everything stays local"
      },
      {
        "id": 6,
        "lead": "We can't see what you're browsing"
      },
      {
        "id": 7,
        "lead": "Optional encrypted cloud backup"
      },
      {
        "id": 10,
        "lead": "Your settings survive a restart"
      }
    ]
  },
  {
    "id": 391,
    "date": "2026-05-15",
    "theme": "Architecture & data model",
    "impact": 4,
    "summary": "Improved our internal-identity tracking.",
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
    "summary": "Improved our internal build tracking.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "a8264cbc98",
    "features": []
  },
  {
    "id": 382,
    "date": "2026-05-15",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Refined our internal build tooling.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "a18f311dc2",
    "features": []
  },
  {
    "id": 381,
    "date": "2026-05-15",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Refined our internal build tooling.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "03120a4862",
    "features": []
  },
  {
    "id": 380,
    "date": "2026-05-15",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Refined our internal build tooling.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
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
    "summary": "Improved our internal build tool.",
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
    "summary": "Cleaned up our internal build scripts.",
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
    "summary": "Refined our internal build tooling.",
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
    "summary": "Strengthened our internal admin-tool logging.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "ce956dae2c",
    "features": []
  },
  {
    "id": 108,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Strengthened our production quality-control process.",
    "detail": "user2's re-burn (2026-05-14) exposed five real defects in the burn\nautomation. All five would have hit <router serial> unaltered. All five are\nnow fixed and committed in ~/haven-station.",
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "",
    "features": []
  },
  {
    "id": 107,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Improved our backup system.",
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
    "summary": "Improved router branding display in the admin screen.",
    "detail": "Live-fire 2026-05-14, user2 <router serial> retrofit. The 3-line brand area\n(\"Lulhaven / Haven Navy / 2 of 100\") refused to render correctly across\n~6 distinct CSS/HTML approaches. Root cause was finally identified:",
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "",
    "features": []
  },
  {
    "id": 400,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Simplified our internal build documentation.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "931866a411",
    "features": []
  },
  {
    "id": 399,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "The router firmware image in production now has the complete Lulhaven / Haven Navy brand design built in.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "d93bc882d2",
    "features": []
  },
  {
    "id": 396,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Refined our internal build tooling.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "c49bfbeee3",
    "features": []
  },
  {
    "id": 395,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Strengthened our pre-ship quality checks.",
    "detail": "Validated admin-screen checks ensure the admin interface works correctly on production routers before they leave the bench.",
    "benefit": "First-boot admin-screen access is verified before every Haven ships.",
    "ref": "81a9a4a5a9",
    "features": []
  },
  {
    "id": 394,
    "date": "2026-05-14",
    "theme": "Build pipeline",
    "impact": 4,
    "summary": "Improved our internal build process.",
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
    "summary": "Improved our internal build process.",
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
    "summary": "Improved our build-station network setup.",
    "detail": "2026-05-14 23:48 — final resolution of tonight's my.lulhaven.com NXDOMAIN\nconfusion. user2 was never broken. The station laptop test environment\nwas the obstacle.",
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "",
    "features": []
  },
  {
    "id": 110,
    "date": "2026-05-14",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Strengthened our internal quality-check process.",
    "detail": "2026-05-14 23:27 — Dave called out that DNS does NOT serve my.lulhaven.com,\nright after I closed user2 <router serial> build #3 with step 16 (QC-5 visual\nverification) marked success. I had claimed \"my.lulhaven.com redirects\nto Haven admin\" without ever testing it.",
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
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
    "summary": "Strengthened our build verification process.",
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
    "summary": "Added a verification step to the build process that confirms every router connects properly before it ships.",
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
    "summary": "Improved our internal build tool.",
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
    "summary": "Improved our internal build tool.",
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
    "summary": "Improved our internal build documentation.",
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
    "summary": "Refined our internal build tooling.",
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
    "summary": "The admin panel now displays a clear three-line brand header — Lulhaven, your Haven model, and its unit number — with Navy blue as the default color.",
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
    "summary": "Improved internal tracking of our build process.",
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
    "summary": "Completed and released an internal router software build.",
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
    "summary": "Improved our internal build checklist.",
    "detail": null,
    "benefit": "Reliable, persistent behavior with no manual setup the customer has to do.",
    "ref": "0be99c48db",
    "features": []
  },
  {
    "id": 401,
    "date": "2026-05-13",
    "theme": "Build maintenance UI",
    "impact": 5,
    "summary": "Strengthened our internal build procedure.",
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
    "summary": "Improved brand-overlay rendering reliability.",
    "detail": "Caught + corrected during the second router's prep. Brand badge now displays consistently across both router models in the Haven admin screen.",
    "benefit": "Customers see a consistent, polished Haven badge in the admin screen — no rough edges.",
    "ref": "",
    "features": [
      {
        "id": 20,
        "lead": "The Helm — where you steer"
      },
      {
        "id": 30,
        "lead": "Haven Olive Green"
      }
    ]
  },
  {
    "id": 413,
    "date": "2026-05-13",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Your Haven's memorable shortname (haven.navyblue / haven.olivegreen) is resilient to IP-address changes.",
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
        "lead": "Haven Olive Green"
      }
    ]
  },
  {
    "id": 409,
    "date": "2026-05-13",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Improved the admin panel's background image display.",
    "detail": null,
    "benefit": "Reliable, persistent behavior with no manual setup the customer has to do.",
    "ref": "76468ace24",
    "features": []
  },
  {
    "id": 406,
    "date": "2026-05-13",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Consolidated our internal build documentation.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "7a6483cac0",
    "features": []
  },
  {
    "id": 404,
    "date": "2026-05-13",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Improved our internal build procedure.",
    "detail": null,
    "benefit": "Reliable, persistent behavior with no manual setup the customer has to do.",
    "ref": "2944273695",
    "features": []
  },
  {
    "id": 403,
    "date": "2026-05-13",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Improved our internal build procedure.",
    "detail": null,
    "benefit": "Reliable, persistent behavior with no manual setup the customer has to do.",
    "ref": "70f2df58e0",
    "features": []
  },
  {
    "id": 326,
    "date": "2026-05-13",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Logged an internal build record.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "58f2200b0a",
    "features": []
  },
  {
    "id": 172,
    "date": "2026-05-13",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Updated website wording from 'filter porn' to the more precise 'filter adult content.'",
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
    "summary": "Improved our admin-screen theme reliability.",
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
    "summary": "Your Haven's memorable web address (like haven.navyblue) keeps working automatically, even if your network's IP settings change.",
    "detail": "Dave 2026-05-13 before user2's burn: 'one of the most frequently used options when setting up a router is to change its IP address. so i'm wondering if there's some way we can, in the boot-up of the router, restore that dns listing to whatever the current ip address is for the ro…",
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "",
    "features": []
  },
  {
    "id": 411,
    "date": "2026-05-13",
    "theme": "LuCI / UI",
    "impact": 3,
    "summary": "Strengthened our production build process.",
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
    "summary": "Improved the admin panel's background display.",
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
    "summary": "Improved the router's brand-overlay rendering.",
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
    "summary": "Improved our internal build process.",
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
    "summary": "Mobile-game ads is now off by default as a filter category.",
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
    "summary": "Strengthened our quality checks for the admin panel.",
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
    "summary": "Began work on making router production fully automated, targeting a ten-minute build process for every unit.",
    "detail": "Ultrathink session 2026-05-13. Dave: 'we need to improve the design of automation with regard to our router burning process. This needs to become a ten minute task with no user interaction.'",
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "",
    "features": []
  },
  {
    "id": 100,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Memorable shortname customers can type to reach the admin screen — haven.navyblue for Navy units, haven.olivegreen for Olive units.",
    "detail": "Customers no longer need to remember the router's IP address. Type the friendly name in any browser on your network and the admin screen loads.",
    "benefit": "Reaching the Haven controls is as easy as typing a memorable name — no IP-address lookup required.",
    "ref": "",
    "features": [
      {
        "id": 29,
        "lead": "Haven Navy"
      },
      {
        "id": 30,
        "lead": "Haven Olive Green"
      }
    ]
  },
  {
    "id": 90,
    "date": "2026-05-12",
    "theme": "Product definition",
    "impact": 5,
    "summary": "Captured an idea for a future mobile app that would extend Haven's protection to phones while traveling.",
    "detail": "Surfaced 2026-05-12 while discussing whether Android is a viable router OS. Conclusion: Android is the wrong platform for the router but the RIGHT platform for a complementary travel/mobile SKU. Dave: 'log the travel app idea for later.'",
    "benefit": "Scope and language locked — every downstream decision is faster and more consistent.",
    "ref": "",
    "features": []
  },
  {
    "id": 86,
    "date": "2026-05-12",
    "theme": "Demo page",
    "impact": 5,
    "summary": "The online demo is now cleaner and easier to navigate, with sections that expand as needed and a smoother experience for visitors coming from social media.",
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
    "summary": "Haven subscription pricing locked in 2026-05-12",
    "detail": "Subscription pricing locked in marketing copy 2026-05-12.",
    "benefit": "Scope and language locked — every downstream decision is faster and more consistent.",
    "ref": "",
    "features": [
      {
        "id": 28,
        "lead": "A low monthly fee for category updates"
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
    "benefit": "The admin screen feels like a polished consumer product, not a 2010-vintage admin panel.",
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
    "benefit": "Customers always know which Haven model they're looking at, without having to check labels.",
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
    "summary": "The first production router's configuration snapshot passed all 38 quality checks and was promoted to the reference standard for future Navy-model builds.",
    "detail": "Live-fire 2026-05-12. user1's <router serial> golden snapshot promoted to <directory> as the founding golden master for the NAV/haven-0.1.0 era. QC-5 result: 38/38 PASS. Reusable check script written: <script> — runs against a…",
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "",
    "features": []
  },
  {
    "id": 72,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Improved our-verification testing tools.",
    "detail": "Live-fire 2026-05-12 (user1 <router serial> Step 16). Two fixes shipped to ~/haven-station/scripts/golden-smoke-test.sh: (1) bare 'ssh' failed because the haven-station key (~/haven-station/credentials/id_ed25519) isn't in operator's default SSH identity set — sibling scripts already use…",
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
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
        "lead": "Filter works on the go too"
      }
    ]
  },
  {
    "id": 430,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Every router now shows 'Haven' in the admin panel sidebar right out of the box, with no setup needed.",
    "detail": null,
    "benefit": "Reliable, persistent behavior with no manual setup the customer has to do.",
    "ref": "9697b6c8f0",
    "features": []
  },
  {
    "id": 428,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Improved the admin panel sidebar display.",
    "detail": null,
    "benefit": "Reliable, persistent behavior with no manual setup the customer has to do.",
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
    "benefit": "Customers see one coherent product across the website, the demo, and the admin screen.",
    "ref": "52727af93a",
    "features": []
  },
  {
    "id": 426,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "The admin panel sidebar now shows 'Haven' and the router model name on two clear lines, built into every router shipped.",
    "detail": null,
    "benefit": "Reliable, persistent behavior with no manual setup the customer has to do.",
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
    "summary": "Filter categories in the admin panel now collapse by default and expand one at a time — hold Ctrl to expand multiple at once.",
    "detail": null,
    "benefit": "Reliable, persistent behavior with no manual setup the customer has to do.",
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
    "summary": "The Haven admin page now opens with the Social & Communication filter category expanded by default.",
    "detail": null,
    "benefit": "Reliable, persistent behavior with no manual setup the customer has to do.",
    "ref": "0bc4742062",
    "features": []
  },
  {
    "id": 423,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "The admin panel can now show your Haven's unit number (like '12 of 100') under the model name.",
    "detail": null,
    "benefit": "Reliable, persistent behavior with no manual setup the customer has to do.",
    "ref": "31ff7e3362",
    "features": []
  },
  {
    "id": 422,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Each router model now has its own easy-to-remember web address — haven.navyblue for Navy, haven.olivegreen for Olive.",
    "detail": null,
    "benefit": "Reliable, persistent behavior with no manual setup the customer has to do.",
    "ref": "d7ad159895",
    "features": [
      {
        "id": 29,
        "lead": "Haven Navy"
      },
      {
        "id": 30,
        "lead": "Haven Olive Green"
      }
    ]
  },
  {
    "id": 420,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Your Haven can now be reached securely at my.lulhaven.com, ready for HTTPS.",
    "detail": null,
    "benefit": "Reliable, persistent behavior with no manual setup the customer has to do.",
    "ref": "3002402011",
    "features": []
  },
  {
    "id": 419,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Strengthened our pre-ship quality testing.",
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
    "summary": "Every router passes 8 automated WiFi checks before it ships.",
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
    "summary": "Built an internal tool that takes a router from flashing to ready-to-ship.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "2384dd7b21",
    "features": [
      {
        "id": 2,
        "lead": "Plug in and it works"
      },
      {
        "id": 26,
        "lead": "Plug in, set a password, choose what to filter"
      }
    ]
  },
  {
    "id": 416,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Built internal tooling to automate our-build process.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "2ce36729db",
    "features": []
  },
  {
    "id": 329,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Named Haven's router colorways Olive and Navy.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "b59285c776",
    "features": [
      {
        "id": 29,
        "lead": "Haven Navy"
      },
      {
        "id": 30,
        "lead": "Haven Olive Green"
      }
    ]
  },
  {
    "id": 328,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Finalized Haven's $4/month subscription pricing.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "2a04729a2f",
    "features": []
  },
  {
    "id": 327,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Documented our approach to automating router builds.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "69076b8af5",
    "features": []
  },
  {
    "id": 102,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Set a production goal: the only manual step in building a router should be the physical actions a person must do; everything else is automated.",
    "detail": "Dave 2026-05-13 ultrathink: '10-minute task with no user interaction.'",
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "",
    "features": []
  },
  {
    "id": 99,
    "date": "2026-05-12",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Organized our internal strategy documentation.",
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
    "summary": "Set an architectural principle for Haven's future operating system: designed so future updates can be integrated with minimal rework.",
    "detail": "Dave 2026-05-12: 'If we are smart, we could design such that future Android versions would plug in and compile.' Architectural discipline addendum to / #96.",
    "benefit": "Today's design is built to support tomorrow's features cleanly.",
    "ref": "",
    "features": []
  },
  {
    "id": 94,
    "date": "2026-05-12",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Refined the long-term Haven OS concept with two additional supporting points.",
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
    "summary": "Explored a long-term concept for Haven to build its own unit operating system from the ground up.",
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
    "summary": "Wrapped up a day of work spanning production, design polish, feature strategy, and marketing updates.",
    "detail": "Comprehensive index of the 2026-05-12 working session. Covers user1 <router serial> ship preparation, brand/UI polish, market research, website rewrite, VPN architecture re-think.",
    "benefit": "Filtering stays active on your devices even when they leave your Wi-Fi and switch to cellular data.",
    "ref": "",
    "features": []
  },
  {
    "id": 82,
    "date": "2026-05-12",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Off-network traffic routing will go through a commercial partner.",
    "detail": "Discussion 2026-05-12 (continuation of exit-node analysis). Dave probed three angles in sequence: (1) hybrid VPN to commercial provider, (2) corporate/wholesale pricing, (3) preservation of the original 'no bandwidth penalty' dream.",
    "benefit": "Filtering stays active on your devices even when they leave your Wi-Fi and switch to cellular data.",
    "ref": "",
    "features": [
      {
        "id": 14,
        "lead": "Filter works on the go too"
      }
    ]
  },
  {
    "id": 81,
    "date": "2026-05-12",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Analyzed a proposed feature letting one customer's traffic route through another customer's router, and identified issues that need solving first.",
    "detail": "Discussion 2026-05-12. Dave's framing: 'If A is sending packets to a website served by B (B's Haven hosts a VPN endpoint), packets go encrypted A->B, decrypted at B, leave B's LAN unencrypted, and something triggers at the NSA, talk me through it.'",
    "benefit": "Filtering stays active on your devices even when they leave your Wi-Fi and switch to cellular data.",
    "ref": "",
    "features": [
      {
        "id": 14,
        "lead": "Filter works on the go too"
      }
    ]
  },
  {
    "id": 79,
    "date": "2026-05-12",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Each router's unit-number display is now written in permanently during manufacturing.",
    "detail": "Dave 2026-05-12: 'Can we just hardwire that at burn?' chose hardwiring over readfile() for the unit-number line because (1) the value never changes per-router so runtime IO is wasted, (2) simpler to inspect. Templates ship with 'const unit_display = '';' (empty). Burn procedure d…",
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
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
    "summary": "Improved our internal build process for router access setup.",
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
    "summary": "Set the website demo's page title to show the product name, model, maker, and unit number.",
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
    "summary": "Simplified the demo page title by removing the specific router model name.",
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
    "summary": "Changed the website demo so sections start collapsed and expand when clicked, keeping the page easier to scan.",
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
    "summary": "Set the website demo to open with Social Media pre-selected, making it easier for first-time visitors to see filtering in action.",
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
    "summary": "Added a row of key selling points to the homepage, plus a 'Why Haven' section comparing us to competitors.",
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
    "summary": "Added a new 'Why Haven' section to the website explaining how Haven compares to other options, so visitors have the full picture before deciding.",
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
    "summary": "Simplified Haven's product lineup naming — Navy and Olive are the current models; older placeholder names were retired.",
    "detail": "Dave 2026-05-12: 'Brands are Navy and Olive at this time. Scrub archaic brand references.'",
    "benefit": "First customer impression before they even plug the router in — sets the trust baseline.",
    "ref": "",
    "features": [
      {
        "id": 30,
        "lead": "Haven Olive Green"
      }
    ]
  },
  {
    "id": 80,
    "date": "2026-05-12",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "Researched the consumer content-filter market — competitor pricing and where Haven has room to stand out.",
    "detail": "Research run 2026-05-12 (Dave SERP for 'consumer content filters' + 'single-click consumer content filter market value'). See sources at the end.",
    "benefit": "Market data behind Haven's pricing. Competitors charge $70–100/yr; Haven undercuts and keeps working if the customer cancels.",
    "ref": "",
    "features": [
      {
        "id": 28,
        "lead": "A low monthly fee for category updates"
      }
    ]
  },
  {
    "id": 421,
    "date": "2026-05-12",
    "theme": "Firmware & overlay",
    "impact": 2,
    "summary": "Improved the Haven admin page's redirect behavior.",
    "detail": null,
    "benefit": "Reliable, persistent behavior with no manual setup the customer has to do.",
    "ref": "b4245d86e9",
    "features": []
  },
  {
    "id": 429,
    "date": "2026-05-12",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "Strengthened our pre-ship quality checks.",
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
    "summary": "Refined our internal build tooling.",
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
    "summary": "Improved the website demo's reliability.",
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
    "summary": "Strengthened our internal backup documentation.",
    "detail": "Knowledge note for production.",
    "benefit": "Havens ship reliably; we know exactly what's captured and what's not.",
    "ref": "",
    "features": []
  },
  {
    "id": 435,
    "date": "2026-05-11",
    "theme": "Milestones",
    "impact": 5,
    "summary": "Built the initial internal codebase for our-build system.",
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
    "summary": "Strengthened our standard build process based on real-world experience.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
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
    "benefit": "The out-of-box experience matches the marketing exactly.",
    "ref": "",
    "features": [
      {
        "id": 30,
        "lead": "Haven Olive Green"
      }
    ]
  },
  {
    "id": 69,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Improved the admin screen's first-boot experience.",
    "detail": "Eliminated a class of \"Haven menu won't load on first try\" issues by ensuring everything ships in the firmware image instead of being downloaded after the fact.",
    "benefit": "First-boot experience just works, right when the customer plugs in the router.",
    "ref": "",
    "features": [
      {
        "id": 2,
        "lead": "Plug in and it works"
      },
      {
        "id": 26,
        "lead": "Plug in, set a password, choose what to filter"
      }
    ]
  },
  {
    "id": 68,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Strengthened our internal data-integrity practices.",
    "detail": "Live-fire 2026-05-11. Tried INSERT OR REPLACE INTO identity (key, value, modified_datetime)... and got 'table identity has no column named modified_datetime'. By design: identity is immutable per-serial — serial doesn't change after burn. Schema: identity(key TEXT PK, value TEXT…",
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "",
    "features": []
  },
  {
    "id": 67,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Updated our internal documentation on encrypted-DNS bypass resistance.",
    "detail": "Updated the burn-procedure checklists to match how the production routers actually report bypass-resistance status. Internal-only.",
    "benefit": "Routers ship with verifiable bypass-resistance — production checklists confirm what's actually active.",
    "ref": "",
    "features": [
      {
        "id": 13,
        "lead": "Zero tolerance for bypass"
      }
    ]
  },
  {
    "id": 66,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Strengthened our production quality checks.",
    "detail": "A guard in the burn pipeline so units in an inconsistent state never leave the bench.",
    "benefit": "Customers receive routers that are completely provisioned and ready to use.",
    "ref": "",
    "features": []
  },
  {
    "id": 65,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Strengthened our production build process.",
    "detail": "Live-fire 2026-05-11. NC#1 in build_id=2: Step 3 couldn't ping GL.iNet at 192.168.8.1 because dev workstation's 'Wired connection 1' (USB-Ethernet enx0050b6ef2e37) had a static 192.168.1.4 override layered on DHCP. NIC was on 192.168.1.x while GL.iNet stock DHCP serves 192.168.8.…",
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "",
    "features": []
  },
  {
    "id": 64,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Corrected our internal production documentation.",
    "detail": "Self-correction surfaced during a live burn QC step. Internal-only.",
    "benefit": "Production procedures always match what the router actually does.",
    "ref": "",
    "features": []
  },
  {
    "id": 63,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Simplified our production deploy process.",
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
    "summary": "Improved our production firmware flashing process.",
    "detail": "Saved a class of \"looks broken, isn't\" puzzles by documenting the exact image format the stock-firmware updater will accept.",
    "benefit": "First-flash succeeds reliably during manufacturing, every time.",
    "ref": "",
    "features": []
  },
  {
    "id": 61,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 5,
    "summary": "Improved reliability of content-filter list updates.",
    "detail": "Live-fire 2026-05-11. user1's router at first boot returned 401 on /api/<database>, /api/feed-delta.db, /api/update.json, /api/feed.json — the entire subscription feed delivery surface — because the Cloudflare Pages middleware gated ALL /api/* paths except /api/auth. Routers have no…",
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "",
    "features": []
  },
  {
    "id": 60,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "Strengthened our production quality-control process.",
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
    "summary": "Strengthened our manufacturing flash procedure.",
    "detail": "Dave noticed a step was using the wrong image variant. Correction documented; production flow now matches reality.",
    "benefit": "The procedure catches issues before a router ships. Every live-fire run hardens the next one.",
    "ref": "",
    "features": []
  },
  {
    "id": 57,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "Improved our production flashing tools.",
    "detail": "Discovered 2026-05-11 21:57 CDT during user1 <router serial> burn — first live exercise of flash-stage-1.sh against actual stock GL.iNet hardware.",
    "benefit": "A real burn strengthened the procedure — fixed at the source before any Haven ships.",
    "ref": "",
    "features": []
  },
  {
    "id": 56,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "Strengthened our production quality checks.",
    "detail": "Discovered 2026-05-11 21:00-21:30 CDT during user1 <router serial> burn. Two procedural gaps in Step 3 as currently written, both surfaced under real conditions.",
    "benefit": "A real burn strengthened the procedure — fixed at the source before any Haven ships.",
    "ref": "",
    "features": []
  },
  {
    "id": 55,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "Improved status-LED visibility on our Havens.",
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
    "summary": "Hardened our build toolchain against upstream changes.",
    "detail": "Helps prioritize future build-stack hardening so the production pipeline stays stable.",
    "benefit": "Sustainable production pipeline — issues caught and fixed at the source.",
    "ref": "",
    "features": []
  },
  {
    "id": 51,
    "date": "2026-05-11",
    "theme": "Product definition",
    "impact": 5,
    "summary": "Requested a single-command way to fully automate router production at remote build locations.",
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
    "summary": "Hardened our build toolchain against upstream changes.",
    "detail": "A compiler-version-vs-system-header mismatch surfaced during a build attempt. Mitigation documented; future builds know to apply it.",
    "benefit": "Sustainable production pipeline, built on upstream issues that are resolved for good.",
    "ref": "",
    "features": []
  },
  {
    "id": 49,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "Improved our internal build documentation.",
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
    "summary": "Hardened our build toolchain against upstream changes.",
    "detail": "A pattern: future-dated upstream versions can ship regressions; we now pin known-good versions and only roll forward intentionally.",
    "benefit": "Production firmware builds reliably and reproducibly, run after run.",
    "ref": "",
    "features": []
  },
  {
    "id": 47,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "Hardened our build toolchain against upstream changes.",
    "detail": "Caught during firmware-image prep. Locked-down version reproducibly builds with the rest of our stack.",
    "benefit": "Secure-tunnel capability is dependable on every Haven we ship.",
    "ref": "",
    "features": []
  },
  {
    "id": 46,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "Strengthened our firmware build process.",
    "detail": "Root-caused and documented; future production runs catch it at the right step.",
    "benefit": "Production firmware ships complete, with every required piece already in place.",
    "ref": "",
    "features": []
  },
  {
    "id": 45,
    "date": "2026-05-11",
    "theme": "Live-fire findings",
    "impact": 5,
    "summary": "Strengthened our firmware build process.",
    "detail": "Naming drift surfaced during firmware-image prep. Internal package list now matches the upstream reality.",
    "benefit": "Production firmware builds reliably, first-try, every time.",
    "ref": "",
    "features": []
  },
  {
    "id": 54,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Updated the order in which early routers go out to specific recipients.",
    "detail": "Dave 2026-05-11 20:32 CDT: 'After user1 comes user2.'",
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "",
    "features": []
  },
  {
    "id": 44,
    "date": "2026-05-11",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Improved our internal production tooling.",
    "detail": "Per Dave 2026-05-11: all router-burning resources moved into one distinct tree at ~/haven-station/. Nothing else lives in that path. Designed for clean migration to other build stations (Southern Missouri etc.).",
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "",
    "features": []
  },
  {
    "id": 43,
    "date": "2026-05-11",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Laid groundwork for expanding router production to additional build locations.",
    "detail": "Per Dave 2026-05-11 (after the burning-strategy discussion + OS-portability question): prepped two of the high-value items from that analysis — image cache + preflight script — and structured them so a remote station (Southern Missouri etc.) can bootstrap from clean with three co…",
    "benefit": "Reliable, persistent behavior with no manual setup the customer has to do.",
    "ref": "",
    "features": [
      {
        "id": 18,
        "lead": "Updated daily"
      }
    ]
  },
  {
    "id": 184,
    "date": "2026-05-11",
    "theme": "Demo page",
    "impact": 3,
    "summary": "Cleaned up website demo code.",
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
    "summary": "Documented our production flashing procedure.",
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
    "summary": "Demo-page privacy audit confirmed lulhaven.com/demo never sends visitor data off-device.",
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
    "summary": "Simplified our pre-burn production sequence.",
    "detail": "",
    "benefit": "Havens ship reliably; less procedural surface to go wrong.",
    "ref": "e39a171ed9",
    "features": []
  },
  {
    "id": 182,
    "date": "2026-05-11",
    "theme": "Demo page",
    "impact": 2,
    "summary": "Improved the demo's preset buttons.",
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
    "summary": "Improved preset selection in the setup modal.",
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
    "summary": "Improved our internal build-sync tooling.",
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
    "summary": "Strengthened our production build process.",
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
    "summary": "Haven's filter-list data stays publicly and openly accessible — no login required to see what's covered.",
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
    "summary": "Improved our internal build-management tools.",
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
    "summary": "Improved our internal production-tracking tool.",
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
    "summary": "Defined our approach to production automation — combining AI-assisted execution with clear step-by-step human instructions and real-time status tracking.",
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
    "summary": "Improved our internal production-tracking tools.",
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
    "summary": "Improved our internal documentation on content-filter bypass protections.",
    "detail": "Two follow-ups from closed: (a) selected categories on the golden router enumerated and added to the snapshot; (b) project_haven_bypass_resistance.md rewritten to reflect the actually-deployed state.",
    "benefit": "Reliable, persistent behavior with no manual setup the customer has to do.",
    "ref": "",
    "features": [
      {
        "id": 1,
        "lead": "Every connected device"
      },
      {
        "id": 12,
        "lead": "Block what you choose"
      },
      {
        "id": 13,
        "lead": "Zero tolerance for bypass"
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
    "summary": "Improved our internal documentation practices.",
    "detail": "Pre-rewrite snapshot. The memory file described bypass resistance as a planned but unshipped gap; the 2026-05-10 golden smoke test confirmed almost all of it is now deployed (port 53 <bypass mitigation>, port 853 reject, DoH endpoint reject, <bypass mitigation> /8 + domain <bypass mitigation>s)…",
    "benefit": "Less waste, fewer back-and-forths, more shipped work per session.",
    "ref": "",
    "features": [
      {
        "id": 13,
        "lead": "Zero tolerance for bypass"
      }
    ]
  },
  {
    "id": 348,
    "date": "2026-05-10",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Strengthened our internal build documentation.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "77d076cdb4",
    "features": []
  },
  {
    "id": 344,
    "date": "2026-05-10",
    "theme": "Wiki & documentation",
    "impact": 4,
    "summary": "Adopted stronger internal operating practices.",
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
    "summary": "Improved our internal delivery-preparation process.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "4e8b24eabf",
    "features": [
      {
        "id": 2,
        "lead": "Plug in and it works"
      },
      {
        "id": 26,
        "lead": "Plug in, set a password, choose what to filter"
      }
    ]
  },
  {
    "id": 336,
    "date": "2026-05-10",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Strengthened our internal-build tracking system.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "016ac8f9ac",
    "features": []
  },
  {
    "id": 335,
    "date": "2026-05-10",
    "theme": "Burn procedure & build station",
    "impact": 4,
    "summary": "Standardized our internal serial-number tracking.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "2c6dc8d691",
    "features": []
  },
  {
    "id": 191,
    "date": "2026-05-10",
    "theme": "Build maintenance UI",
    "impact": 4,
    "summary": "Built our internal build-tracking system.",
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
    "summary": "When you use Haven's VPN, your traffic stays encrypted the whole way through — nothing readable ever touches our servers.",
    "detail": "Dave decision 2026-05-10 21:48 CDT: 'We will host a vpn endpoint (as will all our routers). Any such traffic will be encrypted.'",
    "benefit": "The cardinal: Haven Inc. never sees customer cleartext on its infrastructure. Architecture, not policy — anchors every privacy claim in the product.",
    "ref": "",
    "features": [
      {
        "id": 6,
        "lead": "We can't see what you're browsing"
      },
      {
        "id": 14,
        "lead": "Filter works on the go too"
      }
    ]
  },
  {
    "id": 39,
    "date": "2026-05-10",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Your Haven VPN connection keeps working automatically even when your home's internet address changes — no manual updates or separate service needed.",
    "detail": "Dave decision 2026-05-10 21:45 CDT: DDNS for the VPN endpoint will piggyback on the existing daily subscription check-in. No external DDNS provider (DuckDNS, Dynu, etc.), no separate update daemon — the router already checks in once a day for the subscription delta; we just add …",
    "benefit": "Filtering stays active on your devices even when they leave your Wi-Fi and switch to cellular data.",
    "ref": "",
    "features": [
      {
        "id": 18,
        "lead": "Updated daily"
      },
      {
        "id": 28,
        "lead": "A low monthly fee for category updates"
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
    "benefit": "Filtering stays active on your devices even when they leave your Wi-Fi and switch to cellular data.",
    "ref": "",
    "features": [
      {
        "id": 14,
        "lead": "Filter works on the go too"
      }
    ]
  },
  {
    "id": 37,
    "date": "2026-05-10",
    "theme": "Off-network filtering",
    "impact": 4,
    "summary": "Captured a future product idea for a fully-loaded router built around Raspberry Pi 5 hardware.",
    "detail": "Strategic vision Dave articulated 2026-05-10: 'In time we will send YouTube1 a Pi5 router with everything he has videoed... native VPN, security, FCC compliant, etc.'",
    "benefit": "Filtering stays active on your devices even when they leave your Wi-Fi and switch to cellular data.",
    "ref": "",
    "features": []
  },
  {
    "id": 36,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Explored a possible future business model where Haven's software could be sold on its own, with the router as a premium option.",
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
    "summary": "Reviewed relevant industry commentary that reinforced Haven's strategic positioning in the router market.",
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
    "summary": "Adjusted router recipient policy to prioritize outreach to people already interested in topics like privacy and family online safety.",
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
    "summary": "Strengthened our build procedure documentation.",
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
    "summary": "Standardized our production-tracking system.",
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
    "summary": "Finalized the list of software components built directly into every Haven's firmware from the factory.",
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
    "benefit": "Every Haven we ship is backed by a formal record of how it was made — same discipline used by the most safety-critical industries.",
    "ref": "",
    "features": []
  },
  {
    "id": 22,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Completed a major upgrade to our internal data infrastructure.",
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
    "summary": "Strengthened our internal data infrastructure.",
    "detail": "Internal architecture choice. Same admin-screen UI, more reliable internals.",
    "benefit": "Faster feature delivery over time, with more consistent, predictable behavior for customers.",
    "ref": "",
    "features": []
  },
  {
    "id": 18,
    "date": "2026-05-10",
    "theme": "Firmware & overlay",
    "impact": 4,
    "summary": "Pre-freeze production smoke-test passed; reference unit preserved as a known-good restore point.",
    "detail": "One specific router preserved as the \"everything works on this one\" baseline; future production runs diff against it.",
    "benefit": "Every shipped Haven has a verifiable known-good reference behind it.",
    "ref": "",
    "features": []
  },
  {
    "id": 17,
    "date": "2026-05-10",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Production strategy for first customer unit: build from scratch from a new-in-box unit, with a tested unit held as a safety net.",
    "detail": "Internal production-path decision. Primary: fresh burn. Fallback: pre-tested unit, if the fresh burn surfaces a blocker.",
    "benefit": "First customer gets a Haven built with the full production procedure, not a hand-tuned prototype.",
    "ref": "",
    "features": []
  },
  {
    "id": 16,
    "date": "2026-05-10",
    "theme": "Tooling & infrastructure",
    "impact": 4,
    "summary": "Strengthened our internal reminder system for work reviews.",
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
    "summary": "Reviewed recent work patterns and adopted new internal standards for accurately reporting when a task is actually complete.",
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
    "summary": "Archived an earlier internal process note ahead of a planned revision.",
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
    "summary": "Adopted a small set of internal development practices to speed up ongoing work on Haven.",
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
    "summary": "Streamlined our internal development workflow.",
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
    "summary": "Improved our internal documentation practices.",
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
    "summary": "Adopted a product strategy where the Haven is the core product and branded accessories are sold around it, similar to how Raspberry Pi built its ecosystem.",
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
    "summary": "Made manufacturing reliability a top engineering priority.",
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
    "summary": "Improved our internal documentation system.",
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
    "summary": "Strengthened our internal reporting standards.",
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
    "summary": "Strengthened our internal recordkeeping.",
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
    "summary": "Improved our internal task-tracking tools.",
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
    "summary": "Haven blocks all known encrypted-DNS bypass methods at the router.",
    "detail": "",
    "benefit": "Content filtering stays in effect everywhere, including over encrypted DNS and privacy relays.",
    "ref": "f8d4505b26",
    "features": [
      {
        "id": 1,
        "lead": "Every connected device"
      },
      {
        "id": 13,
        "lead": "Zero tolerance for bypass"
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
    "summary": "Improved our internal documentation.",
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
    "summary": "Strengthened our internal automation practices.",
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
    "summary": "Strengthened our internal build documentation and tracking.",
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
    "summary": "Improved our internal build tool.",
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
    "summary": "Improved our internal build process.",
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
    "summary": "Improved our internal build tool.",
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
    "summary": "Strengthened our internal build tool's navigation and security.",
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
    "summary": "Strengthened our internal build tool's security.",
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
    "summary": "Strengthened login security on our internal production tools.",
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
    "summary": "Improved our production build procedure documentation.",
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
    "summary": "Improved our production build procedure.",
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
    "summary": "Strengthened our production record-keeping.",
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
    "summary": "Improved our internal project-tracking tools.",
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
    "summary": "Improved our deployment scripts.",
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
    "summary": "Strengthened our internal build-quality reference process.",
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
    "summary": "Standardized our internal build terminology.",
    "detail": null,
    "benefit": "Havens ship reliably and quickly; refining the burn procedure improves every future unit.",
    "ref": "d8912e00ac",
    "features": []
  },
  {
    "id": 330,
    "date": "2026-05-10",
    "theme": "Repo hygiene",
    "impact": 1,
    "summary": "Completed an internal test build of Haven's router software.",
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
    "summary": "Updated internal build documentation.",
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
    "summary": "Improved our deployment scripts.",
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
    "summary": "Strengthened our internal backup practices.",
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
    "summary": "Improved our internal data-import process.",
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
    "summary": "Improved our internal data pipeline.",
    "detail": null,
    "benefit": "Single place to edit data; everything else regenerates — no parallel maintenance, no drift.",
    "ref": "188c75ee30",
    "features": [
      {
        "id": 18,
        "lead": "Updated daily"
      }
    ]
  },
  {
    "id": 351,
    "date": "2026-05-09",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Added a new filter category for mobile-game ads, covering the top five ad networks.",
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
    "summary": "Shipped a system that keeps the filter list updated with just the last 30 days of changes, making updates faster and lighter.",
    "detail": null,
    "benefit": "Edits flow source → live in one script. No copy-paste, no stale artifacts.",
    "ref": "c6113ad705",
    "features": [
      {
        "id": 18,
        "lead": "Updated daily"
      }
    ]
  },
  {
    "id": 197,
    "date": "2026-05-09",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Added a Mobile Game Ads category to Haven's filter list.",
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
    "summary": "Strengthened our internal build record-keeping.",
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
    "summary": "Improved our sticker production tooling.",
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
    "summary": "Three new one-click starter presets — Parenting, Privacy, Senior — added to both the demo and the built-in admin screen.",
    "detail": "Customers can apply a sensible-defaults preset with one click on either surface, then refine if they want. First application of the \"include-for-conversation\" principle (when in doubt, include).",
    "benefit": "Setup is one click instead of dozens of decisions — the presets ship with Haven and cover the most common filtering goals the moment you pick one.",
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
    "summary": "Improved our sticker production process.",
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
    "summary": "Improved our packaging sticker design.",
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
    "summary": "Built an internal knowledge base for project history.",
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
    "summary": "Added a 1960 historical photo of Lulhaven on Big Fish Lake to the About Us page.",
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
    "summary": "Added Parenting and Privacy presets to the website demo.",
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
    "summary": "Added a Senior preset to the website demo, focused on blocking scams and content that exploits cognitive decline.",
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
    "summary": "Strengthened our internal database tracking.",
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
    "summary": "Added more mobile-game ad networks to the list Haven can block.",
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
    "summary": "Expanded Haven's filter list to include a broader range of mobile ad networks.",
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
    "summary": "Made the website automatically show the full desktop layout when viewed on a TV's browser.",
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
    "summary": "Strengthened our internal data infrastructure.",
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
    "summary": "Strengthened our internal data infrastructure.",
    "detail": "Internal infrastructure that makes content updates flow from a single source to every customer-facing surface.",
    "benefit": "Customers see consistent, up-to-date content across the website, demo, and router.",
    "ref": "eb5e45c1b6",
    "features": []
  },
  {
    "id": 358,
    "date": "2026-05-08",
    "theme": "SQLite source-of-truth pipeline",
    "impact": 4,
    "summary": "Improved our internal backend code organization.",
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
    "summary": "Improved how we package content-filtering data during builds.",
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
    "summary": "Filled in missing details for the Security and Big Business filter categories.",
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
    "summary": "Improved the accuracy of the website's filter-list pages.",
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
    "summary": "Curated filter data is now shipped to the router as a single package that refreshes automatically.",
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
    "summary": "Improved our internal build-preview tooling.",
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
    "summary": "Improved our filter-list data pipeline.",
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
    "summary": "Enabled Adult Content and ten other items to be linked to their source in the filter-list interface.",
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
    "summary": "Improved the accuracy of Haven's filter-list data.",
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
    "summary": "Filled in missing website addresses for 133 filter-list items that only had partial data before.",
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
    "summary": "Added over 1,500 additional Apple network addresses to the Apple filter category for more complete coverage.",
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
    "summary": "Cleaned up the filter list's network-address data, combining thousands of overlapping entries into a much smaller, more efficient set.",
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
    "summary": "Simplified the Adult Content filter category into a single combined item.",
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
    "summary": "Added iCloud, Me.com, Mac.com, and related Apple domains to the Apple filter category.",
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
    "summary": "Updated the website demo so it mirrors the real router's allow-list feature, including a visual indicator when changes haven't been saved yet.",
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
    "summary": "Replaced the placeholder activity log in the website demo with 24 fun sample entries so visitors can see what real filtering activity looks like.",
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
    "summary": "Improved the homepage heading on phone screens.",
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
    "summary": "Renamed two router color names in the website copy: 'Frank' to 'Blue' and 'Anne' to 'Khaki.'",
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
    "summary": "Improved the homepage heading on phone screens.",
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
    "summary": "Improved mobile readability of the site title.",
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
    "summary": "Renamed the 'Khaki' router color to 'Olive' across the website.",
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
    "summary": "Enabled the Adult Content filter checkboxes, using your regular DNS provider to handle the blocking.",
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
    "summary": "Added bereal.com to the BeReal filter category.",
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
    "summary": "Improved filter accuracy for Twitter/X and TikTok by adding their network ranges.",
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
    "summary": "Improved clarity of the homepage's messaging.",
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
    "summary": "Improved the homepage's messaging.",
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
    "summary": "Strengthened internal development practices.",
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
    "summary": "Improved the visual design of the website's interactive demo.",
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
    "summary": "Improved the website's interactive demo.",
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
    "summary": "Cleaned up duplicate entries in the filter list.",
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
    "summary": "Improved internal documentation.",
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
    "summary": "Improved the Alcohol & Tobacco filter category.",
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
    "summary": "Added a filtering profile covering 47 Meta-owned properties.",
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
    "summary": "Added a contact phone number to the website.",
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
    "summary": "Improved the homepage headline.",
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
    "summary": "Improved the website's preset browsing and search experience.",
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
    "summary": "Improved the website's contact form.",
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
    "summary": "Haven's filter export now keeps exported settings files clean and up to date.",
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
    "summary": "The website contact form now delivers messages to <operator email>.",
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
    "summary": "Improved the homepage's 'Why us' section.",
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
    "summary": "Expanded the Alcohol & Tobacco filter list to 55 items.",
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
    "summary": "Improved the live demo's example content.",
    "detail": "Pruned the Coors / MillerCoors brand from the Alcohol & Tobacco preview list and dropped its itemUrls entry, keeping the demo dataset aligned with the curated production list.",
    "benefit": "Prospective customers see in the demo exactly what ships, so what they try is exactly what they get.",
    "ref": "b24da6f226",
    "features": []
  },
  {
    "id": 444,
    "date": "2026-05-01",
    "theme": "Demo page",
    "impact": 3,
    "summary": "Improved the live demo's default mode.",
    "detail": "Pinned hdBasicMode = true at script load — first-time visitors and returning visitors both land in Basic mode regardless of localStorage (Advanced still reachable via the toggle).",
    "benefit": "Prospective customers see in the demo exactly what ships, so what they try is exactly what they get.",
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
    "summary": "Improved the live demo's page header and item list.",
    "detail": "Header text → \"Haven by Lulhaven - n of 100\". Filtered-view render now skips settings whose key is not in itemUrls (prevents a stray entry from breaking the table). Basic-mode default flipped from \"off unless localStorage says basic\" to \"on unless localStorage says advanced\".",
    "benefit": "Prospective customers see in the demo exactly what ships, so what they try is exactly what they get.",
    "ref": "7045795ae4",
    "features": []
  },
  {
    "id": 237,
    "date": "2026-05-01",
    "theme": "Marketing & website",
    "impact": 3,
    "summary": "Added an up-to-date screenshot of the Haven interface to the website.",
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
    "benefit": "Prospective customers see in the demo exactly what ships.",
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
    "summary": "Improved the live demo's filtered view.",
    "detail": "hdApplyPreset() and hdClearAll() now call hdToggleFilteredView() instead of plain hdRenderFilteredView(), so applying a preset enters the filtered-view mode automatically.",
    "benefit": "Prospective customers see in the demo exactly what ships, so what they try is exactly what they get.",
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
    "summary": "Demo page header simplified to a single, clean line.",
    "detail": "Backed out the stacked brand experiment; single inline title reads better in the constrained demo header.",
    "benefit": "Prospective customers see in the demo exactly what ships, so what they try is exactly what they get.",
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
    "benefit": "Prospective customers see in the demo exactly what ships.",
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
    "benefit": "Prospective customers see in the demo exactly what ships.",
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
    "summary": "Improved the demo page's row-striping display.",
    "detail": "Without !important the Bootstrap row-color rules were winning; added !important to the demo-table odd/even rules so the zebra survives the cascade.",
    "benefit": "Prospective customers see in the demo exactly what ships.",
    "ref": "45da3de850",
    "features": []
  },
  {
    "id": 438,
    "date": "2026-04-30",
    "theme": "Demo page",
    "impact": 2,
    "summary": "Improved the demo page's readability.",
    "detail": "Initial stripe opacities (0.18 / 0.06) were too subtle on most monitors; bumped to 0.4 / 0.10 so the alternation actually reads.",
    "benefit": "Prospective customers see in the demo exactly what ships.",
    "ref": "e8544da0d6",
    "features": []
  },
  {
    "id": 249,
    "date": "2026-04-29",
    "theme": "Filter strategies",
    "impact": 4,
    "summary": "Added 7 new Politics & Government filter items, plus improved demo browsing with organized sections, A-to-Z sorting, and presets.",
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
    "summary": "Improved the code organization behind the website's demo.",
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
    "summary": "Added a toggle to the demo so you can see what content is being filtered.",
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
    "summary": "Improved related-company filter grouping.",
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
    "summary": "Simplified how the Fox News filter category groups related entries.",
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
    "summary": "Filter category groupings now update automatically.",
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
    "summary": "Added helpful tooltips and improved filter-category organization in the website's demo.",
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
    "summary": "Improved internal documentation.",
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
    "summary": "Added The Drudge Report to the Politics & Government filter category.",
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
    "summary": "Added AllSides to the Politics & Government filter category.",
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
    "summary": "Content links in the demo now open in a new browser tab.",
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
    "summary": "Improved filter accuracy in the website's demo.",
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
    "summary": "Turning off one item in a related-company group now also turns off matching items across other filter categories.",
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
    "summary": "Added export and import to the website's demo, and refreshed the underlying filter content list.",
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
    "summary": "Improved the visual design of the website's demo.",
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
    "summary": "Updated the demo to match the router, including full content lists, Block/Delayed Block options, and a Select All control.",
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
    "summary": "Published the first version of the lulhaven.com website.",
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
    "summary": "Improved the website's Live Demo button.",
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
    "id": 589,
    "date": "2026-04-25",
    "theme": "Product definition",
    "impact": 4,
    "summary": "Development began on lulhaven.com, with work on the Haven software starting the very next day.",
    "detail": "website 8209de7 (2026-04-25 initial commit) + router c07f094192 (2026-04-26 luci-app-haven, Argon theme, E8450 build config).",
    "benefit": "Start of the build: from conception (Feb 18) to first code in nine weeks, firmware app on day two",
    "ref": "8209de7",
    "features": []
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
    "summary": "Improved search in the website's demo.",
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
  },
  {
    "id": 588,
    "date": "2026-03-25",
    "theme": "Manga / lore",
    "impact": 3,
    "summary": "Haven manga origin story drafted — Al, Frances Drake, and Haven's first field test (Haven4.txt)",
    "detail": "Full opening arc: the twelfth name on the list, the black boxes, IP 42, accelerator-into-accelerator. Thumb Drive/Lulhaven/Haven4.txt, 2026-03-25.",
    "benefit": "Haven existed as a story before it existed as code: the lore was conceived a month before development began",
    "ref": "4ce5016f-2",
    "features": []
  },
  {
    "id": 587,
    "date": "2026-03-08",
    "theme": "Product definition",
    "impact": 3,
    "summary": "Conceptual design phase — UI concept workbook, Haven product PDF, and full Mobirise mock site",
    "detail": "UI1.xlsx (Mar 4), Haven.pdf (Mar 8), Mobirise mock site (Mar 14) — Thumb Drive/Lulhaven, pre-coding design arc.",
    "benefit": "The product was designed on paper before a line of code: UI, positioning, and site all mocked first",
    "ref": "4ce5016f-2",
    "features": []
  },
  {
    "id": 586,
    "date": "2026-02-18",
    "theme": "Product definition",
    "impact": 4,
    "summary": "Haven conceived — first brand artifacts created (Haven logo and lulhaven dock concept art)",
    "detail": "Oldest Haven artifacts on record: logo.png + lulhaven dock concept, Thumb Drive/Lulhaven, 2026-02-18 13:39. Recovered by filesystem archaeology 2026-07-10.",
    "benefit": "Marks the true product inception: the vision existed as brand and imagery months before any code",
    "ref": "4ce5016f-2",
    "features": []
  }
];
