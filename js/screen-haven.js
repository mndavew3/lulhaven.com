// Screen Haven view for the demo. Mirrors luci-app-haven/luasrc/view/haven/instruments.htm:
// the Haven screen's own program (deck.js + deck.wasm, unchanged) runs on a canvas, and the
// router's back panel (Ports) is drawn beside it. The demo has no router, so instead of
// fetching admin/haven/instruments_data it is fed a sample object of exactly that shape.
// Every value is fictional: private 192.168.1.x addresses, 02:00:00:00:00:0N addresses,
// and the demo's own sample device names. Loaded on first use by hdToggleScreenHavenPanel
// (haven-ui.js), which then calls window.hdScreenHaven.start() / .stop().
(function () {
  var DECK_DIR = '/assets/screen-haven/';
  var POLL_MS = 3000;
  var NS = 'http://www.w3.org/2000/svg';
  var W = 960, H = 640;
  var FONT = 'system-ui, -apple-system, Segoe UI, sans-serif';
  var INK = '#16202a', SOFT = '#5b6670', FAINT = '#9aa4ad';
  // port lights, one colour per speed, the same key as the Haven screen's; teal = linked, speed not reported
  var C_NONE = '#c3c9cf', C_TEN = '#d9443a', C_SLOW = '#f0a020', C_GIG = '#2fb35a', C_FAST = '#2f7fe0',
      C_TENG = '#8a5cd8', C_LINK = '#20a0a0';
  var LEGEND = [[C_NONE, 'Nothing plugged in'], [C_TEN, '10 Mb'], [C_SLOW, '100 Mb'], [C_GIG, '1 Gb'],
                [C_FAST, '2.5 or 5 Gb'], [C_TENG, '10 Gb']];
  var RCPT_LOG = '/etc/haven/isp-receipts.log';

  // ---- the sample reading: the shape action_instruments_data returns ----
  var SAMPLE_BASE = 1793300000;   // a fixed moment (seconds since 1970); only the WAN counters and uptime move on
  var polls = 0;
  var sample = {
    model: { id: 'linksys,e8450', name: 'Linksys E8450 (UBI)' },
    ports: [
      { name: 'wan',  role: 'wan', label: 'WAN',   carrier: true,  speed: 1000, duplex: 'full' },
      { name: 'lan1', role: 'lan', label: 'LAN 1', carrier: true,  speed: 1000, duplex: 'full' },
      { name: 'lan2', role: 'lan', label: 'LAN 2', carrier: true,  speed: 100,  duplex: 'full' },
      { name: 'lan3', role: 'lan', label: 'LAN 3', carrier: false },
      { name: 'lan4', role: 'lan', label: 'LAN 4', carrier: false }
    ],
    radios: [
      { name: 'radio0', band: '2g', channel: 6, htmode: 'HE20', up: true, networks: [
        { ifname: 'phy0-ap0', ssid: 'Haven Demo', freq: 2437, clients: [
          { mac: '02:00:00:00:00:01', name: "Mom's phone", proto: 'ax', signal: -58, mhz: 20, tx_mbps: 144, rx_mbps: 130 },
          { mac: '02:00:00:00:00:04', name: 'Lobby kiosk', proto: 'n', signal: -66, mhz: 20, tx_mbps: 72, rx_mbps: 65 } ] } ] },
      { name: 'radio1', band: '5g', channel: 36, htmode: 'HE80', up: true, networks: [
        { ifname: 'phy1-ap0', ssid: 'Haven Demo', freq: 5180, clients: [
          { mac: '02:00:00:00:00:02', name: 'Classroom Chromebooks', proto: 'ac', signal: -52, mhz: 80, tx_mbps: 866, rx_mbps: 780 },
          { mac: '02:00:00:00:00:05', name: 'East Lounge TV', proto: 'ac', signal: -61, mhz: 80, tx_mbps: 433, rx_mbps: 390 } ] } ] }
    ],
    traffic: { dev: 'wan', at: 0, rx_bytes: 48213000000, tx_bytes: 6120000000 },
    devices: [
      { name: "Mom's phone", ip: '192.168.1.21', mac: '02:00:00:00:00:01', active: true },
      { name: 'Classroom Chromebooks', ip: '192.168.1.22', mac: '02:00:00:00:00:02', active: true },
      { name: 'Lobby kiosk', ip: '192.168.1.24', mac: '02:00:00:00:00:04', active: true },
      { name: 'East Lounge TV', ip: '192.168.1.25', mac: '02:00:00:00:00:05', active: true },
      { name: 'Sales department phones', ip: '192.168.1.23', mac: '02:00:00:00:00:03', active: false }
    ],
    health: { wan_up: true, uptime_s: 1234567, dns_ms: 14, filter_ok: true, load1: 0.21, temp_c: 48.5 },
    about: { fw_version: window.HD_CURRENT_VERSION || '', serial: 'H1-20261001-DEMO-E84-000001' },
    speed: { state: 'done', at: SAMPLE_BASE - 3600, down_mbps: 412.6, up_mbps: 38.2 },
    receipts: { total: 3, rows: [
      { at: SAMPLE_BASE - 172800, down: 398.4, up: 36.9, ping: 14.2, loss: 0, grade: 'A' },
      { at: SAMPLE_BASE - 86400, down: 405.1, up: 37.5, ping: 13.8, loss: 0, grade: 'A' },
      { at: SAMPLE_BASE - 3600, down: 412.6, up: 38.2, ping: 14.0, loss: 0, grade: 'A' } ], job: null },
    screen: {
      flavor: 'olive', tz: 'CST6CDT,M3.2.0,M11.1.0', zone: 'America/Chicago', mem_pct: 41,
      ifaces: { wan: { up: true, speed: 1000 }, lan1: { up: true, speed: 1000 }, lan2: { up: true, speed: 100 }, lan3: { up: false } },
      blocks_today: 47, block_age_s: 312,
      recent_blocks: [
        { t: '15:42:08', d: 'wile-e-coyote.com', c: 'e_commerce' },
        { t: '15:35:22', d: 'snidely-whiplash.com', c: 'politics_government' },
        { t: '15:28:14', d: 'boris-n-natasha.com', c: 'conspiracy_fabricated_claims' },
        { t: '15:21:03', d: 'yosemite-sam.com', c: 'firearms_weapons' },
        { t: '14:58:47', d: 'gargamel.com', c: 'forums_community' },
        { t: '14:51:22', d: 'mojo-jojo.com', c: 'ai_automation' },
        { t: '14:43:09', d: 'sideshow-bob.com', c: 'politics_government' },
        { t: '14:33:55', d: 'cobra-commander.com', c: 'extremism_radicalization' } ],
      device_blocks: [
        { n: 'Classroom Chromebooks', c: 19 }, { n: "Mom's phone", c: 12 }, { n: 'Sales department phones', c: 8 },
        { n: 'Lobby kiosk', c: 5 }, { n: 'East Lounge TV', c: 3 } ],
      wifi: { ssid: 'Haven Demo', key: 'sample-key-1234' },
      rss: { havensni: 9120, dnsmasq: 2840, navdeck: 11560 },
      devices: [
        { ip: '192.168.1.21', name: "Mom's phone", mac: '02:00:00:00:00:01', reach: true },
        { ip: '192.168.1.22', name: 'Classroom Chromebooks', mac: '02:00:00:00:00:02', reach: true },
        { ip: '192.168.1.24', name: 'Lobby kiosk', mac: '02:00:00:00:00:04', reach: true },
        { ip: '192.168.1.25', name: 'East Lounge TV', mac: '02:00:00:00:00:05', reach: true },
        { ip: '192.168.1.23', name: 'Sales department phones', mac: '02:00:00:00:00:03', reach: false } ],
      receipt_lines: '1793127200 398.4 36.9 14.2 2.1 0 A\n1793213600 405.1 37.5 13.8 1.9 0 A\n1793296400 412.6 38.2 14.0 2.0 0 A\n'
    },
    errors: {},
    ts: SAMPLE_BASE
  };
  var GAMER_RESULT = { state: 'done', at: SAMPLE_BASE, min: 11.2, avg: 13.8, max: 19.5, jitter: 2.1, loss: 0, idle: 13.0, loaded: 21.4, grade: 'A' };

  // one reading: the sample, with the WAN counters and the uptime moved on since the last one
  function reading() {
    polls++;
    var d = JSON.parse(JSON.stringify(sample));
    d.traffic.at = 86400 * 3 + polls * (POLL_MS / 1000);
    d.traffic.rx_bytes += polls * 1500000;
    d.traffic.tx_bytes += polls * 400000;
    d.health.uptime_s += polls * (POLL_MS / 1000);
    d.ts = Math.floor(Date.now() / 1000);
    if (extra.gamer) d.screen.gamer = extra.gamer;
    if (extra.receipt_lines) { d.screen.receipt_lines += extra.receipt_lines; d.receipts.total += extra.receipt_n; }
    return d;
  }
  var extra = {};   // what a test run inside the demo has added to the sample

  var svg = document.getElementById('hi-svg');
  var statusEl = document.getElementById('hi-status');
  var data = null, lastOk = null, timer = null, view = 'deck', deckStarted = false;
  // ---- drawing helpers (text always via textContent: names come from the network) ----
  function el(tag, attrs, parent, text) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    if (parent) parent.appendChild(e);
    return e;
  }
  function txt(parent, x, y, s, size, o) {
    o = o || {};
    return el('text', { x: x, y: y, 'font-size': size, 'font-family': FONT, 'font-weight': o.weight || 400,
      fill: o.fill || INK, 'text-anchor': o.anchor || 'start' }, parent, s);
  }
  function list(v) { return Array.isArray(v) ? v : []; }
  function clip(s, n) { s = String(s); return s.length > n ? s.slice(0, n - 1) + '…' : s; }
  function heading(g, title, sub) {
    txt(g, 40, 70, title, 40, { weight: 700 });
    if (sub) txt(g, 40, 108, sub, 22, { fill: SOFT });
  }
  function nothing(g, msg) { txt(g, W / 2, 320, msg, 28, { anchor: 'middle', fill: SOFT }); }
  function legend(g, y, items) {   // laid out by measured text width, then centred
    var row = el('g', {}, g), x = 0;
    for (var i = 0; i < items.length; i++) {
      el('circle', { cx: x + 11, cy: y - 7, r: 11, fill: items[i][0] }, row);
      var t = txt(row, x + 30, y, items[i][1], 20, { fill: SOFT }), len = 0;
      try { len = t.getComputedTextLength(); } catch (e) { len = 0; }
      x += 30 + (len || items[i][1].length * 10) + 44;
    }
    row.setAttribute('transform', 'translate(' + Math.round((W - (x - 44)) / 2) + ',0)');
  }

  // ---- screen: Ports ----
  function speedWords(p) {
    if (!p.carrier) return 'No link';
    if (!p.speed) return 'Linked';
    return p.speed >= 1000 ? (p.speed / 1000) + ' Gb' : p.speed + ' Mb';
  }
  function speedColour(p) {
    if (!p.carrier) return C_NONE;
    if (!p.speed) return C_LINK;
    if (p.speed < 100) return C_TEN;
    if (p.speed < 1000) return C_SLOW;
    if (p.speed < 2500) return C_GIG;
    return p.speed < 10000 ? C_FAST : C_TENG;
  }
  function cableColour(wan) { return wan ? '#f2c300' : '#8f989f'; }   // yellow Internet, grey LAN: never a light colour
  function cableLine(g, x1, y1, x2, y2, col, w) {
    el('line', { x1: x1, y1: y1, x2: x2, y2: y2, stroke: '#00000059', 'stroke-width': w + 4, 'stroke-linecap': 'round' }, g);
    el('line', { x1: x1, y1: y1, x2: x2, y2: y2, stroke: col, 'stroke-width': w, 'stroke-linecap': 'round' }, g);
  }
  function led(g, x, y, r, p) {   // the small light beside a jack
    var col = speedColour(p);
    if (p.carrier) el('circle', { cx: x, cy: y, r: r + 3, fill: col, opacity: 0.35 }, g);
    el('circle', { cx: x, cy: y, r: r, fill: col, stroke: '#00000040', 'stroke-width': 1.5 }, g);
  }
  function drawJack(g, x, top, w, p) {
    var cx = x + w / 2, cable = cableColour(p.role === 'wan');
    var sw = Math.min(110, w - 10), sx = cx - sw / 2, sy = top + 62, sh = 84;                   // the socket
    if (p.carrier) cableLine(g, cx, sy + 30, cx, top + 4, cable, 14);                          // the cable, leaving upward
    el('rect', { x: sx, y: sy, width: sw, height: sh, rx: 10, fill: '#2b3138' }, g);
    el('rect', { x: sx + 14, y: sy + 14, width: sw - 28, height: sh - 38, rx: 4, fill: '#0f1418' }, g);
    el('rect', { x: cx - sw * 0.18, y: sy + sh - 26, width: sw * 0.36, height: 14, rx: 2, fill: '#0f1418' }, g);
    if (p.carrier) el('rect', { x: sx + 18, y: sy + 18, width: sw - 36, height: sh - 46, rx: 3, fill: cable, stroke: '#0000004d', 'stroke-width': 2 }, g);   // the plug
    led(g, sx + sw + 10, sy + 10, 7, p);
    txt(g, cx, sy + sh + 46, p.label || p.name, 28, { weight: 700, anchor: 'middle' });
    txt(g, cx, sy + sh + 84, speedWords(p), 26, { anchor: 'middle', fill: p.carrier ? INK : SOFT });
    if (p.carrier && p.duplex === 'half') txt(g, cx, sy + sh + 112, 'half duplex', 20, { anchor: 'middle', fill: '#b3261e' });
  }
  // Real back panels, by board.json model id: the parts top to bottom as they sit on the
  // case, so the screen matches the router turned around. A model with no entry, or one
  // reporting a port its drawing lacks, gets the plain row instead (no port is ever hidden).
  // E8450 (Olive): the Linksys user guide's back-panel figure. The case prints the jacks
  // 1-4 top to bottom; OpenWrt names them lan1-lan4 on switch ports 0-3, wan on port 4.
  // Bench check 2026-10-04: a cable in the jack printed 1 reports as lan1. The "0/1" under
  // Power marks the on/off rocker (Dave's call, same day).
  var E8450 = [
    { t: 'button', label: 'WPS', ring: '#2f6fd8' }, { t: 'button', label: 'Reset', ring: '#d03a3a' }, { t: 'gap' },
    { t: 'jack', dev: 'lan1', name: 'LAN 1', num: '1', grp: 'Ethernet' },
    { t: 'jack', dev: 'lan2', name: 'LAN 2', num: '2', grp: 'Ethernet' },
    { t: 'jack', dev: 'lan3', name: 'LAN 3', num: '3', grp: 'Ethernet' },
    { t: 'jack', dev: 'lan4', name: 'LAN 4', num: '4', grp: 'Ethernet' }, { t: 'gap' },
    { t: 'jack', dev: 'wan', name: 'Internet (WAN)', yellow: 'Internet' },
    { t: 'usb', label: 'USB' }, { t: 'power', label: 'Power' }, { t: 'switch', label: '0/1' }
  ];
  var PANELS = { 'linksys,e8450': E8450, 'linksys,e8450-ubi': E8450 };
  var PART_H = { button: 34, jack: 60, usb: 30, power: 38, 'switch': 30, gap: 18 };

  function covers(parts, ports) {
    var devs = {}, i;
    for (i = 0; i < parts.length; i++) if (parts[i].dev) devs[parts[i].dev] = true;
    for (i = 0; i < ports.length; i++) if (!devs[ports[i].name]) return false;
    return true;
  }
  function caseText(g, x, y, s) { txt(g, x, y, s, 18, { fill: SOFT, anchor: 'end' }); }
  function sideJack(g, cx, y) {   // a jack on an upright router: its latch slot faces sideways
    el('rect', { x: cx - 46, y: y - 25, width: 92, height: 50, rx: 5, fill: '#3a4047' }, g);
    el('rect', { x: cx - 36, y: y - 17, width: 64, height: 34, rx: 3, fill: '#0f1418' }, g);
    el('rect', { x: cx + 28, y: y - 8, width: 10, height: 16, rx: 1.5, fill: '#0f1418' }, g);
  }
  function callout(g, cx, y, p, name, wan) {   // the jack's light; a cable out to the name when plugged in, else a thin leader
    var lx = 500;
    if (p.carrier) {
      el('rect', { x: cx - 36, y: y - 17, width: 64, height: 34, rx: 3, fill: cableColour(wan), stroke: '#0000004d', 'stroke-width': 2 }, g);   // the plug
      cableLine(g, cx + 20, y, lx + 18, y, cableColour(wan), 12);
    } else el('line', { x1: cx + 50, y1: y, x2: lx + 20, y2: y, stroke: '#b8c0c7', 'stroke-width': 2 }, g);
    led(g, cx + 38, y - 17, 5, p);
    txt(g, lx + 34, y + 9, name, 26, { weight: 700 });
    txt(g, lx + 250, y + 9, speedWords(p), 26, { fill: p.carrier ? INK : SOFT });
    if (p.carrier && p.duplex === 'half') txt(g, lx + 250, y + 31, 'half duplex', 18, { fill: '#b3261e' });
  }
  function drawPanel(g, parts, ports, modelName) {
    var byName = {}, grp = {}, i, p, h = 0;
    for (i = 0; i < ports.length; i++) byName[ports[i].name] = ports[i];
    for (i = 0; i < parts.length; i++) h += PART_H[parts[i].t] || 0;
    var cx = 300, bw = 150, left = cx - bw / 2, top = 140, bodyH = h + 44, y = top + 22;
    el('rect', { x: left, y: top, width: bw, height: bodyH, rx: 22, fill: '#23282e' }, g);   // the router, upright
    el('rect', { x: left + 10, y: top + 10, width: bw - 20, height: bodyH - 20, rx: 14, fill: '#2b3138' }, g);
    for (i = 0; i < parts.length; i++) {
      p = parts[i];
      var mid = y + (PART_H[p.t] || 0) / 2;
      if (p.t === 'button') {
        el('circle', { cx: cx, cy: mid, r: 10, fill: '#3a4047', stroke: p.ring || '#6b737b', 'stroke-width': 3 }, g);
        caseText(g, left - 14, mid + 6, p.label);
      } else if (p.t === 'jack') {
        sideJack(g, cx, mid);
        if (p.num) txt(g, left + 19, mid + 6, p.num, 16, { fill: FAINT, anchor: 'middle' });
        if (p.grp) grp[p.grp] = grp[p.grp] ? [grp[p.grp][0], mid] : [mid, mid];
        if (p.yellow) {
          el('rect', { x: left - 106, y: mid - 15, width: 92, height: 30, rx: 4, fill: '#f2c300' }, g);
          txt(g, left - 60, mid + 6, p.yellow, 18, { weight: 700, anchor: 'middle', fill: '#1b1b1b' });
        }
        callout(g, cx, mid, byName[p.dev] || { name: p.dev, carrier: false }, p.name, !!p.yellow);
      } else if (p.t === 'usb') {
        el('rect', { x: cx - 22, y: mid - 8, width: 44, height: 16, rx: 3, fill: '#0f1418' }, g);
        el('rect', { x: cx - 14, y: mid - 3, width: 28, height: 6, fill: '#3a4047' }, g);
        caseText(g, left - 14, mid + 6, p.label);
      } else if (p.t === 'power') {
        el('circle', { cx: cx, cy: mid, r: 13, fill: '#0f1418' }, g);
        el('circle', { cx: cx, cy: mid, r: 4, fill: '#6b737b' }, g);
        caseText(g, left - 14, mid + 6, p.label);
      } else if (p.t === 'switch') {
        el('rect', { x: cx - 18, y: mid - 9, width: 36, height: 18, rx: 4, fill: '#0f1418' }, g);
        el('rect', { x: cx - 14, y: mid - 5, width: 14, height: 10, rx: 2, fill: '#6b737b' }, g);
        if (p.label) caseText(g, left - 14, mid + 6, p.label);
      }
      y += PART_H[p.t] || 0;
    }
    for (var k in grp) if (grp.hasOwnProperty(k)) caseText(g, left - 14, (grp[k][0] + grp[k][1]) / 2 + 6, k);
    if (modelName) txt(g, cx, top + bodyH + 34, modelName + ', back', 18, { anchor: 'middle', fill: SOFT });
    legend(g, top + bodyH + 84, LEGEND);
    return top + bodyH + 112;
  }

  function drawPorts(d, g) {
    heading(g, 'Ports', 'Each light shows whether a cable is plugged in, and how fast it connected.');
    var ports = list(d.ports), n = ports.length;
    if (!n) { nothing(g, 'This router reported no network ports.'); return H; }
    var panel = d.model && PANELS[d.model.id];
    if (panel && covers(panel, ports)) return drawPanel(g, panel, ports, d.model.name);
    var gap = 24, groupGap = 40, groups = 0, i;
    for (i = 1; i < n; i++) if (ports[i].role !== ports[i - 1].role) groups++;
    var jw = Math.min(150, Math.floor((W - 80 - (n - 1) * gap - groups * groupGap) / n));
    var x = (W - (n * jw + (n - 1) * gap + groups * groupGap)) / 2;
    for (i = 0; i < n; i++) {
      if (i > 0 && ports[i].role !== ports[i - 1].role) x += groupGap;   // a little space between WAN and LAN
      drawJack(g, x, 190, jw, ports[i]);
      x += jw + gap;
    }
    legend(g, 580, LEGEND);
    return H;
  }

  // ---- screen: Wireless ----
  // ---- the router's back panel: the drawn Ports page ----
  function renderPorts() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    el('title', {}, svg, 'Ports');
    var bg = el('rect', { x: 0, y: 0, width: W, height: H, fill: '#ffffff' }, svg);   // so a saved picture has a background
    var g = el('g', {}, svg), h = H;
    if (data) h = drawPorts(data, g) || H;
    else { heading(g, 'Ports'); nothing(g, 'Waiting for the router…'); }
    bg.setAttribute('height', h);
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + h);
  }

  // ---- the deck's data: the router's reply, read by hvnweb.c through _hvnWeb ----
  var snapAt = 0, trPrev = null, trCur = null;   // the last two traffic readings, each with the router's own clock
  function path(k) {
    var v = data;
    k.split('.').forEach(function (p) { v = (v === null || v === undefined) ? undefined : v[p]; });
    return v;
  }
  function numOf(v, d) { return typeof v === 'boolean' ? (v ? 1 : 0) : (typeof v === 'number' ? v : d); }
  function strOf(v) { return (v === null || v === undefined) ? '' : String(v); }
  function ago() { return (Date.now() - snapAt) / 1000; }
  // Running byte totals as the deck wants them: played back from the previous reading to the newest
  // over the router's real interval between the two, so the deck's rate is the true rate, never a
  // jump, never backwards (a counter that went down is kept flat).
  var lastCtr = { rx_bytes: 0, tx_bytes: 0 };
  function counter(f) {
    var v = trCur[f];
    if (trPrev && trCur.t > trPrev.t && trCur[f] >= trPrev[f])
      v = trPrev[f] + (trCur[f] - trPrev[f]) * Math.min(1, ago() / (trCur.t - trPrev.t));
    if (v < lastCtr[f] && v > lastCtr[f] * 0.5) v = lastCtr[f];
    return (lastCtr[f] = v);
  }
  // seconds to add to a UTC time for the router's local time: its zone name through Intl, else its
  // POSIX zone string's standard offset ("CST6CDT..." is 6 hours behind), else UTC
  function tzoff(t) {
    var s = (data && data.screen) || {};
    if (s.zone) {
      try {
        var p = {};
        new Intl.DateTimeFormat('en-US', { timeZone: s.zone, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric',
          hour: 'numeric', minute: 'numeric', second: 'numeric' }).formatToParts(new Date(t * 1000)).forEach(function (x) { p[x.type] = +x.value; });
        return Math.round(Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) / 1000 - Math.floor(t));
      } catch (e) {}
    }
    var m = /^[A-Za-z]{3,}([+-]?)(\d{1,2})(?::(\d{2}))?/.exec(s.tz || '');
    return m ? (m[1] === '-' ? 1 : -1) * (+m[2] * 3600 + (+m[3] || 0) * 60) : 0;
  }
  window._hvnWeb = {
    tzoff: tzoff,
    num: function (k, d) {
      var v = numOf(path(k), d);
      if (v === d) return d;
      if ((k === 'traffic.rx_bytes' || k === 'traffic.tx_bytes') && !trCur) return d;
      if (k === 'health.uptime_s') return v + ago();                        // moved on since the poll
      if (k === 'traffic.rx_bytes' || k === 'traffic.tx_bytes') return counter(k.slice(8));
      return v;
    },
    str: function (k) { return strOf(path(k)); },
    alen: function (k) { var v = path(k); return Array.isArray(v) ? v.length : 0; },
    astr: function (k, i, f) { var v = path(k); return strOf(Array.isArray(v) && v[i] ? v[i][f] : ''); },
    anum: function (k, i, f, d) { var v = path(k); return numOf(Array.isArray(v) && v[i] ? v[i][f] : undefined, d); },
    // a test the little screen would run itself. A real router runs it; the demo has no network
    // to measure, so after a short wait it reports a fictional result (0 ok)
    run: function (kind) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          if (kind === 'gamer') extra.gamer = GAMER_RESULT;
          else if (kind === 'receipt') {
            extra.receipt_lines = Math.floor(Date.now() / 1000) + ' 409.8 37.9 14.1 2.0 0 A\n';
            extra.receipt_n = 1;
          }
          resolve(0);
          poll();
        }, 2500);
      });
    },
    // the weather the little screen shows: a fictional reading, never a request out of the demo
    wx: function () { return Promise.resolve([62, 8, 68, 49, 71, 52, 0, 'Partly cloudy']); }
  };
  // files the deck reads at start (FLAVOR names the home screen, serial and firmware version the
  // About screen) and its receipts file; the sample's copies are put into the deck's own file system
  function putFile(FS, p, text) {
    var dir = p.replace(/\/[^\/]*$/, '');
    try { FS.mkdirTree(dir); FS.writeFile(p, text); } catch (e) {}
  }
  function syncFiles() {
    var FS = window.Module && Module.FS;
    if (!FS || !data) return;
    var s = data.screen || {}, a = data.about || {};
    if (s.flavor) putFile(FS, '/usr/share/haven/FLAVOR', s.flavor + '\n');
    if (a.fw_version) putFile(FS, '/usr/share/haven/FIRMWARE_VERSION', a.fw_version + '\n');
    if (a.serial) putFile(FS, '/etc/haven/serial', a.serial + '\n');
    putFile(FS, RCPT_LOG, s.receipt_lines || '');
  }
  function startDeck() {
    if (deckStarted) return;
    deckStarted = true;
    // "web" tells the deck it runs inside this page: its screenshot icon saves here, and it never goes dark
    window.Module = { arguments: ['web'], canvas: document.getElementById('hvndeck'), preRun: [syncFiles],
      locateFile: function (f) { return DECK_DIR + f; }, print: function () {}, printErr: function () {} };
    var sc = document.createElement('script');
    sc.src = DECK_DIR + 'deck.js';
    document.body.appendChild(sc);
  }
  // ---- buttons: Back/Next turn the deck's wheel (-1 next, +1 previous) ----
  // the router-back drawing is a page off to the side: Back / Next from it return to the deck
  function wheel(n) { if (view === 'ports') show('deck'); else if (window._hvn) window._hvn.wheel += n; }
  document.getElementById('hi-prev').onclick = function () { wheel(1); };
  document.getElementById('hi-next').onclick = function () { wheel(-1); };
  function show(v) {
    view = v;
    document.getElementById('hi-deckbox').style.display = v === 'deck' ? '' : 'none';
    document.getElementById('hi-portsbox').style.display = v === 'ports' ? '' : 'none';
    document.getElementById('hi-where').textContent = v === 'deck' ? 'Haven screen  ·  click the screen, or Back / Next turn its wheel' : 'Router back  ·  Ports';
    var b = document.getElementById('hi-dots').getElementsByTagName('button');
    for (var i = 0; i < b.length; i++) {
      var on = b[i].getAttribute('data-v') === v;
      b[i].className = on ? 'hi-on' : '';
      b[i].setAttribute('aria-pressed', on ? 'true' : 'false');
      b[i].onclick = function () { show(this.getAttribute('data-v')); };
    }
    if (v === 'ports') renderPorts();
  }
  // ---- screenshot: what the canvas shows, saved as a PNG ----
  function fileStamp(t) {
    function p(n) { return (n < 10 ? '0' : '') + n; }
    return t.getFullYear() + p(t.getMonth() + 1) + p(t.getDate()) + '-' + p(t.getHours()) + p(t.getMinutes()) + p(t.getSeconds());
  }
  function saveBlob(blob, name) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.parentNode.removeChild(a); }, 1000);
  }
  // the deck's own screenshot icon calls this too (hvnwasm.c), so both save the same picture
  function saveDeck(stampNow) {
    document.getElementById('hvndeck').toBlob(function (b) { saveBlob(b, 'Screen-Haven-' + stampNow + '.png'); }, 'image/png');
  }
  window._hvnShot = function () { saveDeck(fileStamp(new Date())); };
  document.getElementById('hi-save').onclick = function () {
    var stampNow = fileStamp(new Date());
    if (view === 'deck') { saveDeck(stampNow); return; }
    var vb = svg.viewBox.baseVal, scale = 2, img = new Image();
    img.onload = function () {
      var c = document.createElement('canvas');
      c.width = vb.width * scale;
      c.height = vb.height * scale;
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      c.toBlob(function (b) { saveBlob(b, 'haven-ports-' + stampNow + '.png'); }, 'image/png');
    };
    img.onerror = function () { setStatus('The screenshot could not be made in this browser.', true); };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(svg));
  };
  // ---- the sample reading, taken every few seconds while the view is open ----
  function stamp(t) {
    function p(n) { return (n < 10 ? '0' : '') + n; }
    return p(t.getHours()) + ':' + p(t.getMinutes()) + ':' + p(t.getSeconds());
  }
  function setStatus(msg, bad) { statusEl.textContent = msg; statusEl.className = 'hi-status' + (bad ? ' hi-bad' : ''); }
  // one reading, taken the way fetchData takes the router's: the deck gets the counters' rate, not a jump
  function fetchData() {
    var d = reading();
    var now = Date.now(), t = d.traffic;
    var cur = { rx_bytes: t.rx_bytes, tx_bytes: t.tx_bytes, t: t.at };
    lastCtr = { rx_bytes: trCur ? counter('rx_bytes') : cur.rx_bytes, tx_bytes: trCur ? counter('tx_bytes') : cur.tx_bytes };
    trPrev = trCur ? { rx_bytes: lastCtr.rx_bytes, tx_bytes: lastCtr.tx_bytes, t: trCur.t } : null;
    trCur = cur;
    data = d; snapAt = now; lastOk = new Date();
    syncFiles();
    if (view === 'ports') renderPorts();
    return d;
  }
  function poll() {
    clearTimeout(timer);
    if (document.hidden || !window.hdScreenHaven.open) return;   // resumes when the view or tab is shown again
    fetchData();
    setStatus('Updated ' + stamp(lastOk) + '.', false);
    startDeck();   // the deck starts once the first reading is in, so its first screen is real
    timer = setTimeout(poll, POLL_MS);
  }
  document.addEventListener('visibilitychange', function () { if (!document.hidden) poll(); });
  window.hdScreenHaven = {
    open: false,
    start: function () { this.open = true; poll(); },
    stop: function () { this.open = false; clearTimeout(timer); }
  };
  show('deck');
  window.hdScreenHaven.start();
})();
