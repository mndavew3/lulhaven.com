// /api/builds
//   GET   list all builds (or filter by site/status)
//   POST  create a new build + auto-seed 20 standard steps

// Standard 20-step Haven router build procedure.
// Mirror of haven-build.py STANDARD_STEPS so D1 stays in sync with local.
const STANDARD_STEPS = [
    [1, 'action', 'Haven Technician executes: Receive OEM unit',
     'Record hardware model (MT6000 / E8450) and the box / OEM serial label. Stage unit on build bench.',
     'wiki-note-19',
     'Hardware model + OEM box serial recorded; unit unboxed.'],
    [2, 'action', 'Haven Technician executes: 2a — Plug in and tell Claude to begin',
     'Operator: plug power into the router and connect a LAN cable from the router\'s LAN port to the build workstation. Then tell Claude \'router powered on\' so the build can proceed.',
     'wiki-note-19',
     'Operator has signaled the router is powered on and connected.'],
    [3, 'action', 'Claude executes: 2b — Verify router works',
     'Claude pings the router at its OEM default IP (GL.iNet MT6000 = 192.168.8.1, Linksys E8450 = 192.168.1.1) and HTTP-GETs the OEM web UI. Confirms the hardware powered up cleanly and the OEM firmware is reachable before any flash sequence begins.',
     'wiki-note-19',
     'Ping succeeds; OEM web UI returns 200; ready to flash.'],
    [4, 'qc', 'Claude executes: QC-1 Pre-Haven functional test',
     'Verify vanilla router works as-shipped: LAN DHCP, WAN internet, DNS, web UI. Confirms hardware is intact before we modify anything.',
     'wiki-note-19',
     'All vanilla-router functions pass; no Haven artifacts on device.'],
    [5, 'action', 'Claude executes: Flash factory/initramfs image (Stage 1 of 2)',
     'Boot router into uboot recovery mode (or use GL.iNet UI firmware update). Flash the OpenWrt factory.bin / initramfs image — runs OpenWrt from RAM.',
     'OpenWrt-MT6000-wiki',
     'Router boots into OpenWrt initramfs; reachable at 192.168.1.1; LuCI accessible.'],
    [6, 'action', 'Claude executes: Flash sysupgrade image (Stage 2 of 2)',
     'From initramfs OpenWrt, run sysupgrade with the full image (kernel modules baked per wiki note #26). Preserves nothing; full overlay reset.',
     'OpenWrt-MT6000-wiki',
     'Router reboots into full OpenWrt; persistent overlay populated; expected kernel modules present.'],
    [7, 'action', 'Claude executes: Network setup',
     'Confirm router at 192.168.1.1; SSH key authorized; SSH access works from dev workstation.',
     'wiki-note-19',
     'ssh root@192.168.1.1 succeeds with key auth; no password required.'],
    [8, 'qc', 'Claude executes: QC-2 Bare OpenWrt functional test',
     'Pre-Haven baseline: ping out works, DNS resolves, web UI accessible, no Haven files on device, expected kernel modules present.',
     'wiki-note-19',
     'OpenWrt baseline confirmed; expected kmods (wireguard, tun, usb-storage, etc.) loaded or loadable.'],
    [9, 'action', 'Claude executes: Run push-haven.sh <serial>',
     'Deploys Haven files, installs sqlite3-cli, initializes state.db schema, seeds identity + settings from oem-build source.',
     'push-haven.sh@latest',
     'Script completes; state.db has identity (serial), settings (version, server_url, server_pubkey), all 10 tables present.'],
    [10, 'action', 'Claude executes: Verify state.db post-deploy',
     'sqlite3 /etc/haven/state.db ".tables" returns the 10 expected tables; identity.serial matches; settings rows present.',
     'wiki-note-23',
     'All 10 tables; identity.serial matches expected; settings rows present and source=oem-build.'],
    [11, 'qc', 'Claude executes: QC-3 Haven-installed functional test',
     'apply.lua runs clean; domain-map.json produced; nft tables (haven_dns, haven_doh, haven) present; dnsmasq running.',
     'apply.lua@latest',
     'apply.lua exits 0; nft has all three haven tables; dnsmasq listening on 127.0.0.1:53 and 192.168.1.1:53.'],
    [12, 'action', 'Claude executes: Run configure-jason.sh <serial>',
     'Customer-configures the unit. Per current policy ships CLEAN — no prefs set. Verifies serial.',
     'configure-jason.sh@latest',
     'Script completes; prefs table contains zero rows.'],
    [13, 'action', 'Claude executes: Verify prefs table empty',
     'sqlite3 /etc/haven/state.db "SELECT COUNT(*) FROM prefs" returns 0.',
     'wiki-note-19',
     'Prefs count = 0. (Jason ships clean.)'],
    [14, 'qc', 'Claude executes: QC-4 Customer-configured functional test',
     'Identity matches expected serial; prefs empty; bypass-resistance machinery active despite zero category selections.',
     'wiki-note-19',
     'Identity correct, prefs empty, nft tables still present and active.'],
    [15, 'action', 'Claude executes: DNS smoke test',
     'nslookup example.com (resolves real), mask.icloud.com (sinkholes to 192.168.1.1), unityads.unity3d.com (resolves normally with empty prefs).',
     'wiki-note-20',
     'example.com resolves; mask.icloud.com sinkholes; unityads resolves normally.'],
    [16, 'action', 'Claude executes: Run golden-smoke-test.sh against built unit',
     'Capture full state snapshot to ~/haven/data/build-log-<date>/<serial>-snapshot/ for archival and diff.',
     'golden-smoke-test.sh@latest',
     'Full snapshot captured.'],
    [17, 'qc', 'Claude executes: QC-5 Compare built snapshot to golden',
     'Diff package list, nft ruleset shape, /etc/haven file set against the golden snapshot. Allowed differences: identity rows, customer-specific settings. Disallowed: missing packages, missing files, unexpected files.',
     'wiki-note-20',
     'No disallowed differences from golden.'],
    [18, 'action', 'Haven Technician executes: Pack-in artifacts',
     'Affix Haven Gnome sticker (matching serial); insert pack-in card; close packaging.',
     'wiki-note-9 (accessory ecosystem)',
     'Sticker on unit; pack-in card included; box sealed.'],
    [19, 'action', 'Haven Technician executes: Final visual inspection',
     'Exterior intact, all included accessories (power adapter, ethernet cable) present, no shipping damage.',
     '—',
     'No visual defects; complete kit.'],
    [20, 'qc', 'Haven Technician executes: QC-6 Release sign-off',
     'Independent operator confirms ship-ready: all prior QCs passed, NCRs all closed/accepted, packaging complete. This is the "go for delivery" gate.',
     'wiki-note-25',
     'Build marked overall_status=success, released_by + released_datetime populated, unit ready to ship.'],
];

// Validate serial: yymmddMODnnnn
function parseSerial(serial) {
    const m = /^(\d{6})([A-Z]{3})(\d{4})$/.exec(serial);
    if (!m) return null;
    return { date: m[1], model_code: m[2], unit_number: parseInt(m[3], 10) };
}

export async function onRequestGet(context) {
    const { env, request } = context;
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "50", 10);

    const result = await env.haven_builds.prepare(
        `SELECT id, serial, model_code, unit_number, hardware, customer, site,
                firmware_version, started_datetime, ended_datetime,
                overall_status, released_by, released_datetime, notes
           FROM builds
          ORDER BY started_datetime DESC
          LIMIT ?`
    ).bind(limit).all();

    return new Response(JSON.stringify({ builds: result.results }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

export async function onRequestPost(context) {
    const { request, env } = context;

    let body;
    try {
        body = await request.json();
    } catch {
        return new Response(JSON.stringify({ error: "Invalid JSON" }), {
            status: 400, headers: { "Content-Type": "application/json" },
        });
    }

    const { serial, hardware, customer, site, firmware_version, feed_db_version,
            manifest_hash, notes } = body;

    if (!serial) {
        return new Response(JSON.stringify({ error: "serial is required" }), {
            status: 400, headers: { "Content-Type": "application/json" },
        });
    }
    const parsed = parseSerial(serial);
    if (!parsed) {
        return new Response(JSON.stringify({
            error: "serial does not match yymmddMODnnnn (e.g. 260510NAV0001)"
        }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    // Insert the build row
    const ins = await env.haven_builds.prepare(
        `INSERT INTO builds
            (serial, model_code, unit_number, hardware, customer, site,
             firmware_version, feed_db_version, manifest_hash, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
        serial, parsed.model_code, parsed.unit_number, hardware || null,
        customer || null, site || "mn-st-cloud",
        firmware_version || null, feed_db_version || null,
        manifest_hash || null, notes || null
    ).run();

    const buildId = ins.meta.last_row_id;

    // Auto-seed the standard steps. Batch for atomicity.
    // 7th element (addresses_issue) is optional — STANDARD_STEPS is pending a
    // rewrite to match BURN procedure reality; when rewritten, every step gets
    // its addresses_issue filled. Until then a 6-element entry seeds NULL.
    const stmts = STANDARD_STEPS.map(
        ([order, kind, name, description, ref, expected, addresses]) =>
            env.haven_builds.prepare(
                `INSERT INTO build_steps
                    (build_id, step_order, step_kind, step_name,
                     description, procedure_ref, expected_result, addresses_issue)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
            ).bind(buildId, order, kind, name, description, ref, expected, addresses || null)
    );
    await env.haven_builds.batch(stmts);

    return new Response(JSON.stringify({
        ok: true,
        build_id: buildId,
        serial,
        model_code: parsed.model_code,
        unit_number: parsed.unit_number,
        steps_seeded: STANDARD_STEPS.length
    }), { status: 201, headers: { "Content-Type": "application/json" } });
}
