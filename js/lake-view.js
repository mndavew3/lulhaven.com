// Lake view for the demo. Mirrors luci-app-haven/luasrc/view/haven/lake.htm (router mod #181):
// a second Helm layout with search, device picker, quick actions, category tiles, filter list,
// update banner, filtered-today count and lists-age line. Loaded on first open by
// hdToggleLakePanel (js/haven-ui.js). It reads and writes the same sample data as the classic
// demo Helm (hdDataset, hdSettings, hdPresets, HD_DEMO_DEVICES, HD_SAMPLE_ADVISORIES), so a
// choice made here shows up there. No requests are made; nothing leaves the page.
// Customer wording differs from the router file in one way: the demo says "filtered", never "blocked".
(function () {
  var $ = function (i) { return document.getElementById(i); };
  if (!$('lk')) return;
  var LK = { filtered_today: 312, list_ts: Math.floor(Date.now() / 1000) - 3 * 3600, list_synced: true };
  var HUE = { adult_content: 350, advertising: 200, ai_automation: 160, alcohol_tobacco: 30, anonymous_random_chat: 280, cryptocurrency: 45, dating_relationships: 345, drugs_substances: 140, extremism_radicalization: 15, firearms_weapons: 215, gambling: 130, gaming: 265, scams_predatory_services: 38, social_media: 305, tracking_stalkerware: 180 };
  function norm(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, ''); }
  function cmp(a, b) { return a.localeCompare(b); }

  var cats = hdDataset.slice().sort(function (a, b) { return cmp(a[0], b[0]); }).map(function (c, i) {
    var key = (typeof hdCatKey !== 'undefined' && hdCatKey[c[0]]) || norm(c[0]);
    var h = HUE[key]; if (h === undefined) h = Math.round((i * 137.508 + 20) % 360);
    return { name: c[0], key: key, h: h, items: c[1].map(function (s) { return s[0]; }).sort(cmp).map(function (n) { return { name: n, key: hdMakeKey(c[0], n), cat: null }; }) };
  });
  var groups = {}, allItems = [];
  cats.forEach(function (c) { c.items.forEach(function (it) { it.cat = c; (groups[it.name] = groups[it.name] || []).push(it.key); allItems.push(it); }); });

  var devices = {}, allPrefs = {}, curDev = '', cur = 'all', filt = false, az = false, q = '', limit = 150, rowEls = {}, updCount = 0;
  HD_DEMO_DEVICES.forEach(function (n, i) { devices[String(i + 1)] = { id: i + 1, label: n, enabled: 1 }; });

  function S() { return curDev === '' ? hdSettings : (allPrefs[curDev] = allPrefs[curDev] || {}); }
  function on(d) { return !!d && d.enabled && d.enabled !== '0'; }
  function devName(d) { return d.label || ('#' + d.id); }
  function ago(s) { return s < 90 ? 'just now' : s < 5400 ? Math.round(s / 60) + ' minutes' : s < 172800 ? Math.round(s / 3600) + ' hours' : Math.round(s / 86400) + ' days'; }
  function active(it) { var v = S()[it.key]; return v === 'block' || v === 'delayed'; }
  function toast(t) { var e = $('lk-toast'); e.textContent = t; e.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(function () { e.classList.remove('show'); }, 3500); }
  function dirty() { $('lk-save').classList.add('show'); hdMarkDirty(); }

  var MARK = { on: 'M8 12.5l3 3 5-6', paused: 'M9 6v12M15 6v12' };
  function state() { var d = devices[curDev]; if (curDev !== '' && d && !on(d)) return 'paused'; return 'on'; }
  function paint() {
    var s = state(), nc = 0, tot = 0;
    cats.forEach(function (c) { var k = 0; c.items.forEach(function (it) { if (active(it)) k++; }); c.n = k; tot += k; if (k) nc++; });
    $('lk').dataset.state = s; $('lk-mark').setAttribute('d', MARK[s]);
    $('lk-ptitle').textContent = s === 'on' ? 'Protection is on' : 'Filtering is off for this device';
    var l1 = $('lk-pl1'), l2 = $('lk-pl2'), l3 = $('lk-pl3');
    l1.style.display = l2.style.display = l3.style.display = 'none';
    if (s === 'on') {
      l1.style.display = '';
      var cw = nc === 1 ? ' category' : ' categories';
      l1.innerHTML = nc === 0 ? '<span class="lk-lf">No categories filtered yet</span><span class="lk-ls">&middot; none filtered yet</span>'
        : '<span class="lk-lf"><b>' + nc + '</b>' + cw + ' filtered &middot; <b>' + LK.filtered_today + '</b> filtered today</span><span class="lk-ls">&middot; <b>' + nc + '</b>' + cw + ' &middot; <b>' + LK.filtered_today + '</b> today</span>';
      var a = Math.max(0, Math.floor(Date.now() / 1000) - LK.list_ts);
      $('lk-pl3t').textContent = 'Filter lists ' + (LK.list_synced ? 'updated ' : 'as of ') + ago(a) + ' ago'; l3.style.display = '';
    } else { l2.style.display = ''; l2.textContent = 'This device can reach everything until you switch filtering back on.'; }
    var sw = $('lk-sw'), d = devices[curDev];
    sw.classList.toggle('na', curDev === ''); sw.setAttribute('aria-checked', curDev === '' ? 'false' : String(on(d)));
    $('lk-sws').textContent = curDev === '' ? 'Choose a device first' : on(d) ? 'On now. Tap to turn off' : 'Off now. Tap to turn on';
    $('lk-swi').innerHTML = curDev !== '' && !on(d) ? '<path d="M7 5l12 7-12 7z"/>' : '<path d="M12 3v9M6.3 7a8 8 0 1011.4 0"/>';
    $('lk-nact').textContent = '(' + tot + ' items)';
    $('lk-ren').style.display = curDev === '' ? 'none' : '';
    [].forEach.call($('lk-cl').children, function (li) { var c = li.dataset.i === 'all' ? tot : cats[+li.dataset.i].n; li.querySelector('.lk-cnt').textContent = c; });
  }
  function popDevs() {
    var sel = $('lk-dsel'); sel.innerHTML = '<option value="">Default</option>';
    Object.keys(devices).forEach(function (id) { var o = document.createElement('option'); o.value = id; o.textContent = devName(devices[id]) + (on(devices[id]) ? '' : ' (off)'); sel.appendChild(o); });
    sel.value = curDev;
  }
  function buildCats() {
    var ul = $('lk-cl'); ul.innerHTML = '';
    function add(i, name, tile) {
      var li = document.createElement('li'); li.className = 'lk-crow' + (String(cur) === String(i) ? ' sel' : ''); li.dataset.i = i;
      li.innerHTML = tile + '<span class="nm"></span><em class="lk-cnt">0</em>'; li.querySelector('.nm').textContent = name;
      li.onclick = function () { cur = i === 'all' ? 'all' : +i; limit = 150; [].forEach.call(ul.children, function (x) { x.classList.toggle('sel', x === li); }); render(); };
      ul.appendChild(li);
    }
    add('all', 'All Categories', '<span class="lk-ctile all"><svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-10"/></svg></span>');
    cats.forEach(function (c, i) { add(i, c.name, '<span class="lk-ctile" style="--lk-h:' + c.h + ';--ic:url(assets/icons/categories/' + c.key + '.svg)">' + (c.key === 'adult_content' ? '<b>18+</b>' : '<i></i>') + '</span>'); });
  }
  function setItem(it, v) {
    var names = groups[it.name] || [it.key], st = S();
    names.forEach(function (k) { st[k] = v; });
    dirty(); sync(); paint(); if (filt) render();
  }
  function sync() { for (var k in rowEls) { var r = rowEls[k], v = S()[k]; r.cb.checked = v === 'block'; r.dl.classList.toggle('on', v === 'delayed'); } }
  function mkRow(it) {
    var li = document.createElement('li'); li.className = 'lk-row';
    li.innerHTML = '<span class="lk-fico" style="--lk-h:' + it.cat.h + '"><b></b></span><span class="lk-rtx"><b></b><small></small></span><button type="button" class="lk-delay" title="Delayed Filter: keep reachable for a set time, then filter again"><svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/></svg></button><label class="lk-cb"><input type="checkbox"><i></i></label>';
    li.querySelector('.lk-fico b').textContent = it.name.charAt(0).toUpperCase();
    li.querySelector('.lk-rtx b').textContent = it.name; li.querySelector('.lk-rtx small').textContent = it.cat.name;
    var cb = li.querySelector('input'), dl = li.querySelector('.lk-delay');
    cb.onchange = function () { setItem(it, cb.checked ? 'block' : ''); };
    dl.onclick = function () { setItem(it, S()[it.key] === 'delayed' ? '' : 'delayed'); };
    rowEls[it.key] = { cb: cb, dl: dl }; return li;
  }
  function render() {
    var ul = $('lk-rl'); ul.innerHTML = ''; rowEls = {};
    var list = allItems.filter(function (it) {
      if (cur !== 'all' && cats[cur] !== it.cat) return false;
      if (q && it.name.toLowerCase().indexOf(q) < 0 && it.cat.name.toLowerCase().indexOf(q) < 0) return false;
      if (filt && !active(it)) return false; return true;
    });
    if (az) list.sort(function (a, b) { return cmp(a.name, b.name); });
    var shown = list.slice(0, limit), fr = document.createDocumentFragment();
    shown.forEach(function (it) { fr.appendChild(mkRow(it)); }); ul.appendChild(fr);
    if (list.length > limit) { var m = document.createElement('li'); m.className = 'lk-more'; m.innerHTML = '<button type="button"></button>'; m.firstChild.textContent = 'Show more (' + (list.length - limit) + ' left)'; m.firstChild.onclick = function () { limit += 300; render(); }; ul.appendChild(m); }
    if (!list.length) { var e = document.createElement('li'); e.className = 'lk-empty'; e.textContent = filt && !q ? 'Nothing is filtered here yet.' : 'Nothing matches.'; ul.appendChild(e); }
    sync();
  }
  function adq() {
    var b = $('lk-adq'), a = HD_SAMPLE_ADVISORIES[0];
    if (!a) { b.classList.remove('show'); return; }
    $('lk-adqt').innerHTML = '<b></b> looks like a suspected ad or tracker' + (HD_SAMPLE_ADVISORIES.length > 1 ? ' (+' + (HD_SAMPLE_ADVISORIES.length - 1) + ' more)' : '');
    $('lk-adqt').firstChild.textContent = a.name; b.classList.add('show');
  }
  function verdict(v) {
    var a = HD_SAMPLE_ADVISORIES[0]; if (!a) return;
    HD_SAMPLE_ADVISORIES = HD_SAMPLE_ADVISORIES.filter(function (x) { return x.name !== a.name; });
    hdRenderAdvisories(); adq(); toast(v === 'block' ? 'Filtered.' : 'Allowed.');
  }
  function save() {
    $('lk-save').classList.remove('show');
    if (curDev === '') { $('hd-temp-min').value = $('lk-delay').value || '10'; hdSave(); }
    else hdMarkClean();
    toast('Settings saved.');
  }
  function toggleDevice() {
    if (curDev === '') { toast('Choose a device first.'); $('lk-dsel').focus(); return; }
    var d = devices[curDev]; d.enabled = on(d) ? 0 : 1; popDevs(); paint();
    toast('Filtering ' + (d.enabled ? 'on' : 'off') + ' for ' + devName(d) + '.');
  }
  function rename() {
    var d = devices[curDev]; if (!d) return;
    var l = prompt('Label for this device:', devName(d)); if (l === null) return;
    d.label = l; popDevs(); toast('Renamed.');
  }
  function showUpd(v) { $('lk-updv').textContent = v; $('lk-upd').classList.add('show'); }
  function checkNow() {
    toast('Checking...'); updCount++;
    setTimeout(function () { if (updCount % 2 === 1) { showUpd('ready to install'); toast('A Haven update is available.'); } else { $('lk-upd').classList.remove('show'); toast("You're on the latest version."); } }, 700);
  }
  function install() {
    if (!confirm('Update Haven now?\n\nThis restarts your Haven. Your internet will drop for about 2 minutes, then reconnect automatically.')) return;
    $('lk-upd').innerHTML = 'Updating Haven... your internet will drop briefly, then reconnect. (Demo simulation: nothing is restarted.)';
    setTimeout(function () { $('lk-upd').classList.remove('show'); }, 2500);
  }
  function applyTpl(name, mode) {
    var list = hdPresets[name] || [], st = S();
    if (mode === 'replace') for (var k in st) delete st[k];
    cats.forEach(function (c) { if (list.indexOf(c.name) < 0) return; c.items.forEach(function (it) { st[it.key] = 'block'; }); });
    dirty(); $('lk-tsub').classList.remove('show'); closePops(); paint(); render(); toast(name + ' template ' + (mode === 'replace' ? 'applied.' : 'added.'));
  }
  function buildTpls() {
    var box = $('lk-tpls'); box.innerHTML = '';
    Object.keys(hdPresets).forEach(function (n) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = n;
      b.onclick = function (e) {
        e.stopPropagation();
        if (!Object.keys(S()).some(function (k) { return S()[k]; })) { applyTpl(n, 'replace'); return; }
        var s = $('lk-tsub'); s.innerHTML = 'Apply the ' + n + ' template: <br><button type="button" data-m="replace">Replace my filters</button><button type="button" data-m="merge">Add to my filters</button>'; s.classList.add('show');
        [].forEach.call(s.querySelectorAll('button'), function (x) { x.onclick = function (ev) { ev.stopPropagation(); applyTpl(n, x.dataset.m); }; });
      };
      box.appendChild(b);
    });
  }
  function closePops() { [].forEach.call(document.querySelectorAll('#lk .lk-pop'), function (x) { x.classList.remove('show'); }); }

  [['lk-a-tpl', 'lk-p-tpl'], ['lk-a-set', 'lk-p-set']].forEach(function (p) {
    var a = $(p[0]);
    a.addEventListener('click', function (e) { if (e.target.closest('.lk-pop')) return; var pop = $(p[1]), o = pop.classList.contains('show'); closePops(); if (!o) pop.classList.add('show'); });
    a.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); a.click(); } });
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('#lk .lk-act')) closePops(); });
  $('lk-sw').onclick = toggleDevice; $('lk-sw').onkeydown = function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleDevice(); } };
  $('lk-clr').onclick = function (e) { e.stopPropagation(); var st = S(); for (var k in st) delete st[k]; dirty(); closePops(); paint(); render(); };
  $('lk-dsel').onchange = function () { curDev = this.value; paint(); render(); };
  $('lk-ren').onclick = rename;
  $('lk-q').oninput = function () { q = this.value.trim().toLowerCase(); limit = 150; render(); };
  $('lk-az').onclick = function () { az = !az; this.classList.toggle('on', az); render(); };
  $('lk-fv').onclick = function () { filt = !filt; this.classList.toggle('on', filt); render(); };
  $('lk-ma').onclick = function () { toast('Coming soon'); };
  $('lk-sbtn').onclick = save; $('lk-chk').onclick = checkNow; $('lk-updi').onclick = install; $('lk-updh').onclick = function () { $('lk-upd').classList.remove('show'); };
  $('lk-adqb').onclick = function () { verdict('block'); }; $('lk-adqa').onclick = function () { verdict('allow'); };
  $('lk-more').onclick = function (e) { e.preventDefault(); hdToggleLakePanel(); };
  $('lk-rep').onclick = function (e) { e.preventDefault(); hdOpenReportModal(); };

  // Called each time the panel opens: pick up changes made in the classic Helm meanwhile.
  function refresh() { $('lk-delay').value = $('hd-temp-min').value || '10'; popDevs(); paint(); render(); adq(); }
  window.hdLake = { refresh: refresh };
  buildCats(); buildTpls(); popDevs(); paint(); render(); adq();
  $('lk-delay').value = $('hd-temp-min').value || '10';
})();
