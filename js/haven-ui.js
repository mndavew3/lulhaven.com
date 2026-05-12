var hdNameGroups = {};
var hdKeyNameMap = {};
var hdBasicMode = false;
function hdBuildNameGroups() {
  hdNameGroups = {};
  hdKeyNameMap = {};
  for (var ci = 0; ci < hdDataset.length; ci++) {
    var catName = hdDataset[ci][0];
    var items = hdDataset[ci][1];
    for (var si = 0; si < items.length; si++) {
      var subName = items[si][0];
      var key = hdMakeKey(catName, subName);
      hdKeyNameMap[key] = subName;
      if (!hdNameGroups[subName]) hdNameGroups[subName] = [];
      hdNameGroups[subName].push(key);
    }
  }
  for (var name in hdNameGroups) {
    if (hdNameGroups[name].length < 2) delete hdNameGroups[name];
  }
}

function hdSortDataset() {
  hdDataset.sort(function(a, b) { return a[0].localeCompare(b[0]); });
  hdDataset.forEach(function(cat) {
    cat[1].sort(function(a, b) { return a[0].localeCompare(b[0]); });
  });
}
hdSortDataset();
hdBuildNameGroups();

var hdSettings = {};
var hdCurrentCat = 0;
for (var _hdi = 0; _hdi < hdDataset.length; _hdi++) { if (hdDataset[_hdi][0] === 'Social Media') { hdCurrentCat = _hdi; break; } }
var hdIsFilteredView = false;
var hdIsAZView = false;
var hdSuperOpen = {};

var hdSuperCats = [
  { name: 'Adult & Sensitive', cats: [
    'Adult Content','Alcohol & Tobacco','Anonymous & Random Chat',
    'Cult & Coercive Groups','Dating & Relationships','Drugs & Substances',
    'Extremism & Radicalization','Firearms & Weapons','Gambling',
    'Hate & Discriminatory Content','Occult & Alternative Beliefs','Scams & Predatory Services',
    'Self-Harm & Crisis Content','Tracking & Stalkerware','Violence & Graphic Content'
  ]},
  { name: 'Business & Finance', cats: [
    'Big Business','Cryptocurrency','E-Commerce','Finance & Banking',
    'Job Search & Recruitment','Shopping Aggregators','Travel & Transportation'
  ]},
  { name: 'Entertainment', cats: ['Entertainment','Gaming','Sports & Betting','Streaming Music']},
  { name: 'Health & Wellness', cats: ['Health & Wellness','Pseudo-Medicine & Health Fraud']},
  { name: 'Kids & Education', cats: ['Cheating & Academic Fraud','Education','Kids & Family']},
  { name: 'News & Media', cats: ['Misinformation & Conspiracy','News & Media','Politics & Government']},
  { name: 'Social & Communication', cats: ['Forums & Community','Messaging & Chat','Social Media']},
  { name: 'Technology', cats: [
    'Advertising','AI & Automation','Cloud Services','File Sharing',
    'Peer-to-Peer & Torrenting','Search Engines','Technology & Hardware','VPN & Privacy Tools'
  ]}
];

var hdPresets = {
  School: [
    'Adult Content','Alcohol & Tobacco','Anonymous & Random Chat',
    'Cheating & Academic Fraud','Cult & Coercive Groups','Dating & Relationships',
    'Drugs & Substances','Extremism & Radicalization','Firearms & Weapons','Gambling',
    'Hate & Discriminatory Content','Misinformation & Conspiracy','Occult & Alternative Beliefs',
    'Scams & Predatory Services','Self-Harm & Crisis Content','Tracking & Stalkerware',
    'Violence & Graphic Content'
  ],
  Workplace: [
    'Adult Content','Dating & Relationships','Extremism & Radicalization','Gambling',
    'Hate & Discriminatory Content','Scams & Predatory Services','Self-Harm & Crisis Content',
    'Violence & Graphic Content'
  ],
  Recovery: [
    'Adult Content','Alcohol & Tobacco','Cult & Coercive Groups',
    'Dating & Relationships','Drugs & Substances','Extremism & Radicalization','Gambling',
    'Hate & Discriminatory Content','Occult & Alternative Beliefs','Scams & Predatory Services',
    'Self-Harm & Crisis Content','Violence & Graphic Content'
  ],
  Parenting: [
    'Adult Content','AI & Automation','Alcohol & Tobacco','Anonymous & Random Chat',
    'Cheating & Academic Fraud','Cult & Coercive Groups','Dating & Relationships',
    'Drugs & Substances','Extremism & Radicalization','Firearms & Weapons','Gambling',
    'Hate & Discriminatory Content','Misinformation & Conspiracy','Mobile Game Ads',
    'Pseudo-Medicine & Health Fraud','Scams & Predatory Services','Self-Harm & Crisis Content',
    'Social Media','Sports & Betting','Tracking & Stalkerware','Violence & Graphic Content'
  ],
  Privacy: [
    'Advertising','AI & Automation','Big Business','Cloud Services','Mobile Game Ads',
    'Search Engines','Social Media','Tracking & Stalkerware'
  ],
  Senior: [
    'Cryptocurrency','Gambling','Misinformation & Conspiracy',
    'Pseudo-Medicine & Health Fraud','Scams & Predatory Services',
    'Security','Sports & Betting'
  ]
};

function hdUpdateBadges() {
  var items = document.querySelectorAll('#hd-cat-ul li.hd-cat-item');
  for (var i = 0; i < items.length; i++) {
    var idx = parseInt(items[i].getAttribute('data-cat-index'));
    var cat = hdDataset[idx];
    if (!cat) continue;
    var total = 0, active = 0;
    for (var j = 0; j < cat[1].length; j++) {
      var key = hdMakeKey(cat[0], cat[1][j][0]);
      if (key in itemUrls) { total++; if (hdSettings[key]) active++; }
    }
    var badge = items[i].querySelector('.hd-badge');
    if (badge) {
      badge.textContent = active > 0 ? '(' + active + '/' + total + ')' : '';
      badge.className = 'hd-badge' + (active > 0 ? ' hd-badge-active' : '');
    }
  }
}

function hdRenderCatList() {
  var ul = document.getElementById('hd-cat-ul');
  ul.innerHTML = '';

  if (hdIsAZView) {
    for (var ci = 0; ci < hdDataset.length; ci++) {
      var li = document.createElement('li');
      li.className = 'hd-cat-item';
      li.setAttribute('data-cat-index', ci);
      li.innerHTML = hdDataset[ci][0] + '<span class="hd-badge"></span>';
      li.onclick = (function(idx) { return function() { hdSelect(idx); }; })(ci);
      ul.appendChild(li);
    }
  } else {
    var catIndexMap = {};
    for (var ci = 0; ci < hdDataset.length; ci++) catIndexMap[hdDataset[ci][0]] = ci;
    var covered = {};

    for (var si = 0; si < hdSuperCats.length; si++) {
      var sc = hdSuperCats[si];
      var open = hdSuperOpen[sc.name] === true;
      var hdr = document.createElement('li');
      hdr.className = 'hd-super-hdr' + (open ? ' open' : '');
      hdr.setAttribute('data-super-idx', si);
      hdr.innerHTML = '<span class="hd-super-label">' + sc.name + '</span><span class="hd-chevron">&#9658;</span>';
      hdr.onclick = (function(idx) { return function(e) { hdToggleSuperCat(idx, !!(e && (e.ctrlKey || e.metaKey))); }; })(si);
      ul.appendChild(hdr);

      for (var ci2 = 0; ci2 < sc.cats.length; ci2++) {
        var catName = sc.cats[ci2];
        var catIdx = catIndexMap[catName];
        if (catIdx === undefined) continue;
        covered[catName] = true;
        var li2 = document.createElement('li');
        li2.className = 'hd-cat-item' + (open ? '' : ' hd-hidden');
        li2.setAttribute('data-cat-index', catIdx);
        li2.setAttribute('data-super-idx', si);
        li2.innerHTML = catName + '<span class="hd-badge"></span>';
        li2.onclick = (function(idx) { return function() { hdSelect(idx); }; })(catIdx);
        ul.appendChild(li2);
      }
    }

    var extra = [];
    for (var ci = 0; ci < hdDataset.length; ci++) {
      if (!covered[hdDataset[ci][0]]) extra.push(ci);
    }
    if (extra.length) {
      var open2 = hdSuperOpen['__other__'] === true;
      var hdr2 = document.createElement('li');
      hdr2.className = 'hd-super-hdr' + (open2 ? ' open' : '');
      hdr2.setAttribute('data-super-idx', hdSuperCats.length);
      hdr2.innerHTML = '<span class="hd-super-label">Other</span><span class="hd-chevron">&#9658;</span>';
      hdr2.onclick = (function(idx) { return function(e) { hdToggleSuperCat(idx, !!(e && (e.ctrlKey || e.metaKey))); }; })(hdSuperCats.length);
      ul.appendChild(hdr2);
      for (var i = 0; i < extra.length; i++) {
        var catIdx2 = extra[i];
        var li3 = document.createElement('li');
        li3.className = 'hd-cat-item' + (open2 ? '' : ' hd-hidden');
        li3.setAttribute('data-cat-index', catIdx2);
        li3.setAttribute('data-super-idx', hdSuperCats.length);
        li3.innerHTML = hdDataset[catIdx2][0] + '<span class="hd-badge"></span>';
        li3.onclick = (function(idx) { return function() { hdSelect(idx); }; })(catIdx2);
        ul.appendChild(li3);
      }
    }
  }
  hdUpdateBadges();
}

function hdToggleSuperCat(superIdx, additive) {
  var key = superIdx < hdSuperCats.length ? hdSuperCats[superIdx].name : '__other__';
  var willOpen = hdSuperOpen[key] !== true;  // currently closed (or undef) -> open it
  if (willOpen && !additive) {
    // Accordion: opening one collapses all others. Ctrl/Cmd-click suppresses this.
    for (var k in hdSuperOpen) { hdSuperOpen[k] = false; }
    hdSuperOpen[key] = true;
    var allHdrs = document.querySelectorAll('#hd-cat-ul li.hd-super-hdr');
    for (var h = 0; h < allHdrs.length; h++) {
      var hi = allHdrs[h].getAttribute('data-super-idx');
      var isThis = (hi === String(superIdx));
      allHdrs[h].classList.toggle('open', isThis);
      var items = document.querySelectorAll('#hd-cat-ul li.hd-cat-item[data-super-idx="' + hi + '"]');
      for (var i = 0; i < items.length; i++) items[i].classList.toggle('hd-hidden', !isThis);
    }
  } else {
    // Additive toggle: just flip this one, leave others alone.
    hdSuperOpen[key] = willOpen;
    var hdr = document.querySelector('#hd-cat-ul li.hd-super-hdr[data-super-idx="' + superIdx + '"]');
    if (hdr) hdr.classList.toggle('open', willOpen);
    var items2 = document.querySelectorAll('#hd-cat-ul li.hd-cat-item[data-super-idx="' + superIdx + '"]');
    for (var j = 0; j < items2.length; j++) items2[j].classList.toggle('hd-hidden', !willOpen);
  }
}

function hdToggleAZView() {
  hdIsAZView = !hdIsAZView;
  var btn = document.getElementById('hd-az-btn');
  btn.classList.toggle('active', hdIsAZView);
  hdRenderCatList();
  var item = document.querySelector('#hd-cat-ul li.hd-cat-item[data-cat-index="' + hdCurrentCat + '"]');
  if (item) item.classList.add('hd-selected');
}

var hdPendingPreset = null;

function hdApplyPreset(name) {
  if (Object.keys(hdSettings).length > 0) {
    hdPendingPreset = name;
    document.getElementById('hd-preset-modal-msg').textContent =
      'Apply ' + name + ' preset — replace your current settings or add ' + name + ' items to what you already have?';
    document.getElementById('hd-preset-modal').classList.add('show');
    return;
  }
  hdDoApplyPreset(name, 'replace');
}

function hdDoPreset(mode) {
  // Capture the pending preset BEFORE closing the modal — hdClosePresetModal()
  // sets hdPendingPreset = null, so we must snapshot it first or the apply call
  // sees a null name and returns early (silent no-op).
  var name = hdPendingPreset;
  hdClosePresetModal();
  hdDoApplyPreset(name, mode);
}

function hdClosePresetModal() {
  document.getElementById('hd-preset-modal').classList.remove('show');
  hdPendingPreset = null;
}

function hdDoApplyPreset(name, mode) {
  var cats = hdPresets[name];
  if (!cats) return;
  if (mode === 'replace') hdSettings = {};
  for (var ci = 0; ci < hdDataset.length; ci++) {
    var catName = hdDataset[ci][0];
    if (cats.indexOf(catName) === -1) continue;
    var subs = hdDataset[ci][1];
    for (var si = 0; si < subs.length; si++) {
      var key = hdMakeKey(catName, subs[si][0]);
      if (key in itemUrls) hdSettings[key] = 'block';
    }
  }
  hdUpdateBadges();
  if (!hdIsFilteredView) hdToggleFilteredView();
  else hdRenderFilteredView();
  hdShowMsg(name + ' preset ' + (mode === 'replace' ? 'applied.' : 'merged.'), '#0060a0');
}

function hdClearAll() {
  hdSettings = {};
  hdUpdateBadges();
  if (hdIsFilteredView) hdToggleFilteredView();
  else hdSelect(hdCurrentCat);
}

function hdShowMsg(text, color) {
  var msg = document.getElementById('hd-save-msg');
  msg.style.color = color || '#007a40';
  msg.textContent = text;
  msg.style.display = 'inline';
  setTimeout(function() { msg.style.display = 'none'; msg.style.color = ''; msg.textContent = 'Settings saved.'; }, 3000);
}

function hdApplyMode() {
  var demo = document.getElementById('haven-demo');
  var btn  = document.getElementById('hd-mode-btn');
  if (hdBasicMode) {
    demo.classList.add('hd-basic');
    btn.textContent = 'Advanced';
    btn.classList.add('hd-basic-active');
  } else {
    demo.classList.remove('hd-basic');
    btn.textContent = 'Basic';
    btn.classList.remove('hd-basic-active');
  }
}

function hdToggleMode() {
  hdBasicMode = !hdBasicMode;
  hdApplyMode();
}

function hdRenderFilteredView() {
  var catItems = document.querySelectorAll('#hd-cat-ul li.hd-cat-item');
  for (var i = 0; i < catItems.length; i++) catItems[i].classList.remove('hd-selected', 'hd-highlighted');
  var tbody = document.getElementById('hd-sub-body');
  tbody.innerHTML = '';
  var count = 0;
  for (var ci = 0; ci < hdDataset.length; ci++) {
    var catName = hdDataset[ci][0];
    var subs = hdDataset[ci][1];
    for (var si = 0; si < subs.length; si++) {
      var subName = subs[si][0];
      var key = hdMakeKey(catName, subName);
      if (hdSettings[key] && (key in itemUrls)) {
        tbody.innerHTML += hdMakeRow(key, subName, catName, true);
        count++;
      }
    }
  }
  document.getElementById('hd-sub-title').textContent = count > 0
    ? 'Active filters (' + count + ' item' + (count > 1 ? 's' : '') + ')'
    : 'Nothing filtered yet';
}

function hdToggleFilteredView() {
  hdIsFilteredView = !hdIsFilteredView;
  var btn = document.getElementById('hd-filter-view-btn');
  if (hdIsFilteredView) {
    btn.classList.add('active');
    btn.textContent = 'Show All';
    document.getElementById('hd-search-input').value = '';
    hdRenderFilteredView();
  } else {
    btn.classList.remove('active');
    btn.textContent = 'Show Filtered';
    hdSelect(hdCurrentCat);
  }
}

function hdMakeKey(catName, subName) {
  function norm(s) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  }
  return norm(catName) + '/' + norm(subName);
}

function hdMakeRow(key, subName, catName, showCat) {
  var hasStrategy = key in itemUrls;
  var url = hasStrategy ? (itemUrls[key] || '') : '';
  var catHtml = showCat ? '<br><span class="hd-cat-label">' + catName + '</span>' : '';

  if (!hasStrategy) {
    var nameHtml = '<span class="no-strategy-name" title="We\'re building filtering support for this content — check back soon">' + subName + '</span>';
    return '<tr data-key="' + key + '" class="no-strategy">' +
      '<td>' + nameHtml + catHtml + '</td>' +
      '<td class="c"><input type="checkbox" disabled></td>' +
      '<td class="c hd-delayed-col"><input type="checkbox" disabled></td>' +
      '</tr>';
  }

  var cur = hdSettings[key] || '';
  var safeId = key.replace(/\//g, '__');
  var blkId = 'blk_' + safeId;
  var delId = 'del_' + safeId;
  var ek = key.replace(/'/g, "\\'");
  var tip = itemTooltips[key] ? ' title="' + itemTooltips[key].replace(/"/g, '&quot;') + '"' : '';
  var nameHtml = url
    ? '<a href="' + url + '" target="_blank" rel="noopener noreferrer" class="item-link"' + tip + '>' + subName + '</a>'
    : (tip ? '<span' + tip + '>' + subName + '</span>' : subName);
  return '<tr data-key="' + key + '">' +
    '<td>' + nameHtml + catHtml + '</td>' +
    '<td class="c"><input type="checkbox" id="' + blkId + '"' + (cur==='block'?' checked':'') + ' onchange="hdToggle(\'' + ek + '\',\'block\',\'' + delId + '\')"></td>' +
    '<td class="c hd-delayed-col"><input type="checkbox" id="' + delId + '"' + (cur==='delayed'?' checked':'') + ' onchange="hdToggle(\'' + ek + '\',\'delayed\',\'' + blkId + '\')"></td>' +
    '</tr>';
}

function hdSelect(index) {
  hdCurrentCat = index;
  document.getElementById('hd-search-input').value = '';
  var catItems = document.querySelectorAll('#hd-cat-ul li.hd-cat-item');
  for (var i = 0; i < catItems.length; i++) catItems[i].classList.remove('hd-selected');
  var item = document.querySelector('#hd-cat-ul li.hd-cat-item[data-cat-index="' + index + '"]');
  if (item) item.classList.add('hd-selected');
  var cat = hdDataset[index];
  document.getElementById('hd-sub-title').textContent = cat[0];
  var tbody = document.getElementById('hd-sub-body');
  tbody.innerHTML = '';
  for (var j = 0; j < cat[1].length; j++) {
    var subName = cat[1][j][0];
    tbody.innerHTML += hdMakeRow(hdMakeKey(cat[0], subName), subName, cat[0], false);
  }
}

function hdSearch(term) {
  term = term.trim().toLowerCase();
  var catItems = document.querySelectorAll('#hd-cat-ul li.hd-cat-item');
  if (term === '') { hdClear(); return; }
  var tbody = document.getElementById('hd-sub-body');
  tbody.innerHTML = '';
  var count = 0;
  for (var i = 0; i < catItems.length; i++) catItems[i].classList.remove('hd-highlighted', 'hd-selected');
  for (var ci = 0; ci < hdDataset.length; ci++) {
    var catName = hdDataset[ci][0];
    var subs = hdDataset[ci][1];
    var catMatched = false;
    for (var si = 0; si < subs.length; si++) {
      var subName = subs[si][0];
      if (subName.toLowerCase().indexOf(term) !== -1) {
        tbody.innerHTML += hdMakeRow(hdMakeKey(catName, subName), subName, catName, true);
        catMatched = true; count++;
      }
    }
    if (catMatched) {
      var item = document.querySelector('#hd-cat-ul li.hd-cat-item[data-cat-index="' + ci + '"]');
      if (item) {
        item.classList.add('hd-highlighted');
        // auto-expand the containing super-cat if it's collapsed
        var superIdx = item.getAttribute('data-super-idx');
        if (superIdx !== null) {
          var superKey = parseInt(superIdx) < hdSuperCats.length ? hdSuperCats[parseInt(superIdx)].name : '__other__';
          if (hdSuperOpen[superKey] === false) {
            var hdr = document.querySelector('#hd-cat-ul li.hd-super-hdr[data-super-idx="' + superIdx + '"]');
            if (hdr) hdr.classList.add('open');
            item.classList.remove('hd-hidden');
          }
        }
      }
    }
  }
  document.getElementById('hd-sub-title').textContent = count > 0
    ? 'Search results (' + count + ' match' + (count > 1 ? 'es' : '') + ')'
    : 'No results found';
}

function hdClear() {
  document.getElementById('hd-search-input').value = '';
  if (hdIsFilteredView) {
    hdIsFilteredView = false;
    var btn = document.getElementById('hd-filter-view-btn');
    btn.classList.remove('active');
    btn.textContent = 'Show Filtered';
  }
  hdRenderCatList();
  hdSelect(hdCurrentCat);
}

function hdToggle(key, value, otherId) {
  var safeId = key.replace(/\//g, '__');
  var cb = document.getElementById((value === 'block' ? 'blk_' : 'del_') + safeId);
  var newVal = (cb && cb.checked) ? value : '';
  hdSettings[key] = newVal;
  if (typeof hdMarkDirty === 'function') hdMarkDirty();
  if (newVal) {
    var other = document.getElementById(otherId);
    if (other) other.checked = false;
  }
  var siblings = hdNameGroups[hdKeyNameMap[key]];
  if (siblings) {
    for (var i = 0; i < siblings.length; i++) {
      var sKey = siblings[i];
      if (sKey === key) continue;
      hdSettings[sKey] = newVal;
      var sSafeId = sKey.replace(/\//g, '__');
      var sBlk = document.getElementById('blk_' + sSafeId);
      var sDel = document.getElementById('del_' + sSafeId);
      if (sBlk) sBlk.checked = (newVal === 'block');
      if (sDel) sDel.checked = (newVal === 'delayed');
    }
  }
  hdUpdateBadges();
  if (hdIsFilteredView) hdRenderFilteredView();
}

function hdSelectAll(type) {
  var rows = document.querySelectorAll('#hd-sub-body tr');
  var prefix = type === 'block' ? 'blk_' : 'del_';
  var allChecked = true;
  for (var i = 0; i < rows.length; i++) {
    var cb = rows[i].querySelector('input[id^="' + prefix + '"]');
    if (cb && !cb.checked) { allChecked = false; break; }
  }
  for (var i = 0; i < rows.length; i++) {
    var key = rows[i].getAttribute('data-key');
    var blk = rows[i].querySelector('input[id^="blk_"]');
    var del = rows[i].querySelector('input[id^="del_"]');
    if (!key || !blk || !del) continue;
    if (allChecked) {
      blk.checked = false; del.checked = false; hdSettings[key] = '';
    } else if (type === 'block') {
      blk.checked = true; del.checked = false; hdSettings[key] = 'block';
    } else {
      del.checked = true; blk.checked = false; hdSettings[key] = 'delayed';
    }
  }
  hdUpdateBadges();
}

function hdValidKeys() {
  var keys = {};
  for (var i = 0; i < hdDataset.length; i++) {
    var items = hdDataset[i][1];
    for (var j = 0; j < items.length; j++) {
      keys[hdMakeKey(hdDataset[i][0], items[j][0])] = true;
    }
  }
  return keys;
}

function hdExport() {
  var delayVal = document.getElementById('hd-temp-min').value;
  var now = Math.floor(Date.now() / 1000);
  var delaySeconds = parseInt(delayVal) * 60;
  var valid = hdValidKeys();
  var lines = ["config haven 'settings'", "\toption delay_minutes '" + delayVal + "'"];
  for (var key in hdSettings) {
    if (hdSettings[key] && valid[key]) {
      lines.push("\toption " + key + " '" + hdSettings[key] + "'");
      if (hdSettings[key] === 'delayed') {
        lines.push("\toption " + key + "::at '" + (now + delaySeconds) + "'");
      }
    }
  }
  var blob = new Blob([lines.join('\n') + '\n'], {type: 'text/plain'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'haven.conf';
  a.click();
  URL.revokeObjectURL(a.href);
}

function hdImport() {
  document.getElementById('hd-import-file').click();
}

function hdHandleImport(input) {
  var file = input.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    var lines = e.target.result.split('\n');
    var imported = {};
    for (var i = 0; i < lines.length; i++) {
      var m = lines[i].match(/^\toption (\S+) '(.*)'$/);
      if (m) imported[m[1]] = m[2];
    }
    if (imported.delay_minutes) {
      document.getElementById('hd-temp-min').value = imported.delay_minutes;
      delete imported.delay_minutes;
    }
    hdSettings = {};
    for (var k in imported) {
      if (k.indexOf('::at') === -1) hdSettings[k] = imported[k];
    }
    hdUpdateBadges();
    hdSelect(hdCurrentCat);
    hdShowMsg('Imported. Click Save to apply.', '#0060a0');
    input.value = '';
  };
  reader.readAsText(file);
}

function hdSave() {
  var valid = hdValidKeys();
  var clean = {};
  for (var k in hdSettings) { if (hdSettings[k] && valid[k]) clean[k] = hdSettings[k]; }
  var wlArea = document.getElementById('hd-whitelist-area');
  var data = {
    s: clean,
    m: document.getElementById('hd-temp-min').value,
    w: wlArea ? wlArea.value : ''
  };
  var exp = new Date();
  exp.setFullYear(exp.getFullYear() + 1);
  document.cookie = 'haven_demo=' + encodeURIComponent(JSON.stringify(data)) +
    '; expires=' + exp.toUTCString() + '; path=/; SameSite=Lax';
  hdMarkClean();
  hdShowMsg('Settings saved.');
}

function hdLoad() {
  var match = document.cookie.match(/(?:^|;\s*)haven_demo=([^;]+)/);
  if (!match) return;
  try {
    var data = JSON.parse(decodeURIComponent(match[1]));
    if (data.s) hdSettings = data.s;
    if (data.m) document.getElementById('hd-temp-min').value = data.m;
    if (data.w !== undefined) {
      var wl = document.getElementById('hd-whitelist-area');
      if (wl) wl.value = data.w;
    }
  } catch(e) {}
}

// Unsaved-changes indicator — mirrors router UI behavior
var hdPendingChanges = false;
function hdMarkDirty() {
  hdPendingChanges = true;
  var ind = document.getElementById('hd-dirty-indicator');
  if (ind) ind.style.display = 'inline';
}
function hdMarkClean() {
  hdPendingChanges = false;
  var ind = document.getElementById('hd-dirty-indicator');
  if (ind) ind.style.display = 'none';
}

// Append a domain to the whitelist textarea — user must click Save to persist.
function hdAllowDomain(domain) {
  var area = document.getElementById('hd-whitelist-area');
  if (!area) return;
  var existing = area.value.split(/\r?\n/).map(function(s){return s.trim();}).filter(Boolean);
  if (existing.indexOf(domain) === -1) existing.push(domain);
  area.value = existing.join('\n');
  hdMarkDirty();
  hdShowMsg('Added to whitelist: ' + domain + ' — click Save to apply');
}

// Sample log entries shown in the demo (real log on the router uses live data).
// Domains are fictional cartoon-villain placeholders so customers see the
// experience without us having to display real adult or harmful URLs.
var HD_SAMPLE_LOG = [
  { time: '15:42:08', device: 'iPad-Kids',     domain: 'wile-e-coyote.com',    cat: 'E-Commerce',             item: 'ACME Corp' },
  { time: '15:39:51', device: 'Laptop-Den',    domain: 'dr-doofenshmirtz.com', cat: 'Tracking & Stalkerware', item: 'Doofenshmirtz Evil Inc.' },
  { time: '15:35:22', device: 'iPad-Kids',     domain: 'snidely-whiplash.com', cat: 'Politics & Government',  item: 'Whiplash Lobbying' },
  { time: '15:28:14', device: 'Phone-Mom',     domain: 'boris-n-natasha.com',  cat: 'Misinformation & Conspiracy', item: 'Pottsylvania Daily' },
  { time: '15:21:03', device: 'Phone-Dad',     domain: 'yosemite-sam.com',     cat: 'Firearms & Weapons',     item: 'Sam\'s Six-Shooters' },
  { time: '14:58:47', device: 'iPad-Kids',     domain: 'gargamel.com',         cat: 'Forums & Community',     item: 'Smurf Hunters Guild' },
  { time: '14:51:22', device: 'Laptop-Den',    domain: 'mojo-jojo.com',        cat: 'AI & Automation',        item: 'Townsville Takeover' },
  { time: '14:43:09', device: 'TV-Family',     domain: 'sideshow-bob.com',     cat: 'Politics & Government',  item: 'Springfield Mayoral Fraud' },
  { time: '14:33:55', device: 'Phone-Mom',     domain: 'cobra-commander.com',  cat: 'Extremism & Radicalization', item: 'Cobra Recruitment' },
  { time: '14:28:11', device: 'iPad-Kids',     domain: 'shredder.net',         cat: 'Anonymous & Random Chat',item: 'Foot Clan Chat' },
  { time: '14:20:43', device: 'Phone-Dad',     domain: 'dick-dastardly.com',   cat: 'Sports & Betting',       item: 'Wacky Race Bookies' },
  { time: '14:11:08', device: 'Laptop-Den',    domain: 'skeletor.com',         cat: 'Gaming',                 item: 'Eternia Online' },
  { time: '14:02:31', device: 'iPad-Kids',     domain: 'captain-hook.com',     cat: 'Peer-to-Peer & Torrenting', item: 'Neverland Bay' },
  { time: '13:55:18', device: 'Phone-Mom',     domain: 'cruella-deville.com',  cat: 'Big Business',           item: 'DeVille Fur Holdings' },
  { time: '13:47:44', device: 'TV-Family',     domain: 'jafar.com',            cat: 'Politics & Government',  item: 'Agrabah Royal Council' },
  { time: '13:38:02', device: 'Tablet-Sis',    domain: 'ursula.com',           cat: 'Dating & Relationships', item: 'Sea Witch Singles' },
  { time: '13:31:27', device: 'iPad-Kids',     domain: 'maleficent.com',       cat: 'Misinformation & Conspiracy', item: 'Curse News Network' },
  { time: '13:24:55', device: 'Laptop-Den',    domain: 'plankton.com',         cat: 'E-Commerce',             item: 'Chum Bucket Express' },
  { time: '13:14:39', device: 'iPad-Kids',     domain: 'pinky-n-brain.com',    cat: 'AI & Automation',        item: 'World Domination Labs' },
  { time: '13:06:21', device: 'Phone-Dad',     domain: 'lex-luthor.com',       cat: 'Big Business',           item: 'LexCorp' },
  { time: '12:58:53', device: 'Tablet-Sis',    domain: 'mr-burns.com',         cat: 'Big Business',           item: 'Springfield Nuclear' },
  { time: '12:49:14', device: 'iPad-Kids',     domain: 'bowser.com',           cat: 'Gaming',                 item: 'Koopa Castle MMO' },
  { time: '12:41:08', device: 'Phone-Mom',     domain: 'negaduck.com',         cat: 'Social Media',           item: 'Negaverse Network' },
  { time: '12:32:47', device: 'Laptop-Den',    domain: 'dr-claw.com',          cat: 'Tracking & Stalkerware', item: 'M.A.D. Surveillance' }
];

function hdRenderSampleLog() {
  var tbody = document.getElementById('hd-log-body');
  if (!tbody) return;
  tbody.innerHTML = HD_SAMPLE_LOG.map(function(e) {
    var domEsc = e.domain.replace(/'/g, "\\'");
    return '<tr><td style="padding:6px;">' + e.time + '</td><td style="padding:6px;">' + e.device +
      '</td><td style="padding:6px;">' + e.domain + '</td><td style="padding:6px;">' + e.cat +
      '</td><td style="padding:6px;">' + e.item + '</td><td style="padding:6px;">' +
      '<button onclick="hdAllowDomain(\'' + domEsc + '\')" style="font-size:0.8em;padding:2px 8px;">Allow</button>' +
      '</td></tr>';
  }).join('');
}

function hdToggleLog() {
  var panel = document.getElementById('hd-log-panel');
  var btn = document.getElementById('hd-log-btn');
  var visible = panel.classList.toggle('hd-log-visible');
  btn.classList.toggle('active', visible);
  if (visible) hdRenderSampleLog();
}

// Shift+click on the Log button opens the password-gated Build Maintenance UI
// (admin-only). Normal click toggles the log panel as usual. The wrapper is
// invoked via the demo.html onclick; the modifier-key branch is fully in JS
// per the project's "no JS in demo.html" rule.
function hdHandleLogClick(e) {
  if (e && e.shiftKey) {
    e.preventDefault();
    window.open('/build-maint/', '_blank', 'noopener');
    return;
  }
  hdToggleLog();
}

// Wire up live inputs for dirty tracking
document.addEventListener('DOMContentLoaded', function() {
  var wl = document.getElementById('hd-whitelist-area');
  if (wl) wl.addEventListener('input', hdMarkDirty);
  var dm = document.getElementById('hd-temp-min');
  if (dm) dm.addEventListener('input', hdMarkDirty);
});

hdRenderCatList();
hdLoad();
// Landing state: open Social & Communication, select Social Media.
hdSuperOpen['Social & Communication'] = true;
hdRenderCatList();
var _initialIdx = 0;
for (var _i = 0; _i < hdDataset.length; _i++) {
  if (hdDataset[_i][0] === 'Social Media') { _initialIdx = _i; break; }
}
hdSelect(_initialIdx);
hdUpdateBadges();
hdBasicMode = true;
hdApplyMode();
hdUpdateBadges();
