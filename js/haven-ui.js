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
var hdSectionOpen = {};

var hdSections = [
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
  { name: 'News & Media', cats: ['Conspiracy & Fabricated Claims','Hyperpartisan Commentary — Left','Hyperpartisan Commentary — Right','News & Media','Politics & Government']},
  { name: 'Social & Communication', cats: ['Forums & Community','Messaging & Chat','Social Media']},
  { name: 'Technology', cats: [
    'Advertising','AI & Automation','Cloud Services','File Sharing',
    'Peer-to-Peer & Torrenting','Search Engines','Technology & Hardware','VPN & Privacy Tools'
  ]}
];

// Tooltip copy for the left-rail SECTION headers and CATEGORIES. Lives HERE (static, beside
// hdSections) — NOT in haven-tooltips.js, which the deploy regenerates from haven.db and
// would wipe. Keys match the display names in hdSections / hdDataset.
var hdSectionTips = {
  "Adult & Sensitive":"Categories many customers filter for younger or more sensitive members.",
  "Business & Finance":"Shopping, banking, crypto, jobs, and travel.",
  "Entertainment":"Video, gaming, music, and sports.",
  "Health & Wellness":"Health information — and the fraud that imitates it.",
  "Kids & Education":"Learning, kids' content, and academic-integrity risks.",
  "News & Media":"News, politics, and misinformation.",
  "Social & Communication":"Social networks, messaging, and forums.",
  "Technology":"Ads, AI, cloud, search, and the tools that bypass filtering.",
  "Other":"Categories that don't fit a section above."
};

var hdCatTips = {
  "Adult Content":"Pornography and sexually explicit sites.",
  "Alcohol & Tobacco":"Beer, wine, spirits, vaping, and tobacco brands and retailers.",
  "Anonymous & Random Chat":"Sites that pair you with strangers over webcam or text.",
  "Cult & Coercive Groups":"High-control groups and coercive recruitment networks.",
  "Dating & Relationships":"Dating and hookup apps and sites.",
  "Drugs & Substances":"Recreational-drug sites, dispensaries, and harm-reduction forums.",
  "Extremism & Radicalization":"Sites known for extremist content and radicalization.",
  "Firearms & Weapons":"Gun sellers, marketplaces, and weapon retailers.",
  "Gambling":"Casinos, sportsbooks, and online betting.",
  "Hate & Discriminatory Content":"Sites built around hateful or discriminatory content.",
  "Occult & Alternative Beliefs":"Astrology, tarot, psychics, and occult communities.",
  "Scams & Predatory Services":"Known scams, fraud, and predatory lending.",
  "Self-Harm & Crisis Content":"Forums that promote self-harm or eating disorders.",
  "Tracking & Stalkerware":"Data brokers, people-search, and phone-monitoring tools.",
  "Violence & Graphic Content":"Graphic violence, gore, and shock sites.",
  "Big Business":"Corporate sites of the largest companies.",
  "Cryptocurrency":"Crypto exchanges, wallets, and trading sites.",
  "E-Commerce":"Online stores and shopping marketplaces.",
  "Finance & Banking":"Banks, cards, brokerages, and payment apps.",
  "Job Search & Recruitment":"Job boards and recruiting sites.",
  "Shopping Aggregators":"Deal, coupon, and price-comparison sites.",
  "Travel & Transportation":"Airlines, hotels, rideshare, and booking sites.",
  "Entertainment":"Streaming video and TV services.",
  "Gaming":"Game platforms, stores, and online services.",
  "Sports & Betting":"Sports leagues, news, and betting-adjacent sites.",
  "Streaming Music":"Music-streaming services.",
  "Health & Wellness":"Health information, fitness, and wellness apps.",
  "Pseudo-Medicine & Health Fraud":"Sites promoting unproven or fraudulent health claims.",
  "Cheating & Academic Fraud":"Homework-answer farms and essay-for-hire services.",
  "Education":"Learning platforms and online courses.",
  "Kids & Family":"Children's content and family-oriented sites.",
  "Hyperpartisan Commentary — Right":"Right-leaning opinion and aggregation sites.",
  "Hyperpartisan Commentary — Left":"Left-leaning opinion and aggregation sites.",
  "Conspiracy & Fabricated Claims":"Fabricated claims and conspiracy material — flat earth, QAnon and the like.",
  "News & Media":"News outlets across the spectrum.",
  "Politics & Government":"Party, campaign, advocacy, and government sites across the spectrum.",
  "Forums & Community":"Discussion forums and community sites.",
  "Messaging & Chat":"Messaging and chat apps.",
  "Social Media":"Social networks and feeds.",
  "Advertising":"Ad networks and ad-serving domains.",
  "AI & Automation":"AI chatbots and image or video generators.",
  "Cloud Services":"Cloud hosting and developer platforms.",
  "File Sharing":"File-hosting and cloud-storage services.",
  "Peer-to-Peer & Torrenting":"Torrent sites and file-sharing networks.",
  "Search Engines":"Web search engines.",
  "Technology & Hardware":"Tech manufacturers and hardware retailers.",
  "VPN & Privacy Tools":"VPNs and privacy tools that can be used to bypass filtering.",
  "Security":"Malware, phishing, and command-and-control sources — worth filtering for everyone.",
  "Mobile Game Ads":"Ad networks embedded in mobile games."
};

var hdPresets = {
  School: [
    'Adult Content','Alcohol & Tobacco','Anonymous & Random Chat',
    'Cheating & Academic Fraud','Cult & Coercive Groups','Dating & Relationships',
    'Drugs & Substances','Extremism & Radicalization','Firearms & Weapons','Gambling',
    'Hate & Discriminatory Content','Conspiracy & Fabricated Claims','Occult & Alternative Beliefs',
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
    'Hate & Discriminatory Content','Conspiracy & Fabricated Claims','Mobile Game Ads',
    'Pseudo-Medicine & Health Fraud','Scams & Predatory Services','Self-Harm & Crisis Content',
    'Social Media','Sports & Betting','Tracking & Stalkerware','Violence & Graphic Content'
  ],
  Privacy: [
    'Advertising','AI & Automation','Big Business','Cloud Services','Mobile Game Ads',
    'Search Engines','Social Media','Tracking & Stalkerware'
  ],
  Senior: [
    'Cryptocurrency','Gambling','Conspiracy & Fabricated Claims',
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
    // Blocked state: reveal the red slash overlay (icon interiors are teal-filled at all times).
    items[i].classList.toggle('hd-blocked', active > 0);
  }
}

// Category list-item markup: icon (categories only) + name on the left, badge on the right.
// Icon keyed by hdCatKey[name] -> assets/icons/categories/<key>.svg. Section headers stay bare —
// the absence of an icon is the cue that distinguishes a section from a clickable category.
function hdCatItemHtml(catName) {
  var key = (typeof hdCatKey !== 'undefined') ? hdCatKey[catName] : null;
  var ic = key ? '<span class="hd-ic-wrap"><img class="hd-cat-ic" data-key="' + key + '" src="assets/icons/categories/' + key + '.svg?v=2" alt="">'
    + '<img class="hd-cat-slash" src="assets/icons/slash.svg" alt=""></span>' : '';
  var ctip = (typeof hdCatTips !== 'undefined' && hdCatTips[catName]) ? ' title="' + hdCatTips[catName].replace(/"/g, '&quot;') + '"' : '';
  return '<span class="hd-cat-name"' + ctip + '>' + ic + catName + '</span><span class="hd-badge"></span>';
}

function hdRenderCatList() {
  var ul = document.getElementById('hd-cat-ul');
  ul.innerHTML = '';

  if (hdIsAZView) {
    for (var ci = 0; ci < hdDataset.length; ci++) {
      var li = document.createElement('li');
      li.className = 'hd-cat-item';
      li.setAttribute('data-cat-index', ci);
      li.innerHTML = hdCatItemHtml(hdDataset[ci][0]);
      li.onclick = (function(idx) { return function() { hdSelect(idx); }; })(ci);
      ul.appendChild(li);
    }
  } else {
    var catIndexMap = {};
    for (var ci = 0; ci < hdDataset.length; ci++) catIndexMap[hdDataset[ci][0]] = ci;
    var covered = {};

    for (var si = 0; si < hdSections.length; si++) {
      var sc = hdSections[si];
      var open = hdSectionOpen[sc.name] === true;
      var hdr = document.createElement('li');
      hdr.className = 'hd-section-hdr' + (open ? ' open' : '');
      hdr.setAttribute('data-section-idx', si);
      hdr.innerHTML = '<span class="hd-section-label">' + sc.name + '</span><span class="hd-chevron">&#9658;</span>';
      if (typeof hdSectionTips !== 'undefined' && hdSectionTips[sc.name]) hdr.title = hdSectionTips[sc.name];
      hdr.onclick = (function(idx) { return function(e) { hdToggleSection(idx, !!(e && (e.ctrlKey || e.metaKey))); }; })(si);
      ul.appendChild(hdr);

      for (var ci2 = 0; ci2 < sc.cats.length; ci2++) {
        var catName = sc.cats[ci2];
        var catIdx = catIndexMap[catName];
        if (catIdx === undefined) continue;
        covered[catName] = true;
        var li2 = document.createElement('li');
        li2.className = 'hd-cat-item' + (open ? '' : ' hd-hidden');
        li2.setAttribute('data-cat-index', catIdx);
        li2.setAttribute('data-section-idx', si);
        li2.innerHTML = hdCatItemHtml(catName);
        li2.onclick = (function(idx) { return function() { hdSelect(idx); }; })(catIdx);
        ul.appendChild(li2);
      }
    }

    var extra = [];
    for (var ci = 0; ci < hdDataset.length; ci++) {
      if (!covered[hdDataset[ci][0]]) extra.push(ci);
    }
    if (extra.length) {
      var open2 = hdSectionOpen['__other__'] === true;
      var hdr2 = document.createElement('li');
      hdr2.className = 'hd-section-hdr' + (open2 ? ' open' : '');
      hdr2.setAttribute('data-section-idx', hdSections.length);
      hdr2.innerHTML = '<span class="hd-section-label">Other</span><span class="hd-chevron">&#9658;</span>';
      if (typeof hdSectionTips !== 'undefined' && hdSectionTips['Other']) hdr2.title = hdSectionTips['Other'];
      hdr2.onclick = (function(idx) { return function(e) { hdToggleSection(idx, !!(e && (e.ctrlKey || e.metaKey))); }; })(hdSections.length);
      ul.appendChild(hdr2);
      for (var i = 0; i < extra.length; i++) {
        var catIdx2 = extra[i];
        var li3 = document.createElement('li');
        li3.className = 'hd-cat-item' + (open2 ? '' : ' hd-hidden');
        li3.setAttribute('data-cat-index', catIdx2);
        li3.setAttribute('data-section-idx', hdSections.length);
        li3.innerHTML = hdCatItemHtml(hdDataset[catIdx2][0]);
        li3.onclick = (function(idx) { return function() { hdSelect(idx); }; })(catIdx2);
        ul.appendChild(li3);
      }
    }
  }
  hdUpdateBadges();
}

function hdToggleSection(sectionIdx, additive) {
  var key = sectionIdx < hdSections.length ? hdSections[sectionIdx].name : '__other__';
  var willOpen = hdSectionOpen[key] !== true;  // currently closed (or undef) -> open it
  if (willOpen && !additive) {
    // Accordion: opening one collapses all others. Ctrl/Cmd-click suppresses this.
    for (var k in hdSectionOpen) { hdSectionOpen[k] = false; }
    hdSectionOpen[key] = true;
    var allHdrs = document.querySelectorAll('#hd-cat-ul li.hd-section-hdr');
    for (var h = 0; h < allHdrs.length; h++) {
      var hi = allHdrs[h].getAttribute('data-section-idx');
      var isThis = (hi === String(sectionIdx));
      allHdrs[h].classList.toggle('open', isThis);
      var items = document.querySelectorAll('#hd-cat-ul li.hd-cat-item[data-section-idx="' + hi + '"]');
      for (var i = 0; i < items.length; i++) items[i].classList.toggle('hd-hidden', !isThis);
    }
  } else {
    // Additive toggle: just flip this one, leave others alone.
    hdSectionOpen[key] = willOpen;
    var hdr = document.querySelector('#hd-cat-ul li.hd-section-hdr[data-section-idx="' + sectionIdx + '"]');
    if (hdr) hdr.classList.toggle('open', willOpen);
    var items2 = document.querySelectorAll('#hd-cat-ul li.hd-cat-item[data-section-idx="' + sectionIdx + '"]');
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
      'Apply the ' + name + ' template — replace your current settings or add ' + name + ' items to what you already have?';
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
  hdShowMsg(name + ' template ' + (mode === 'replace' ? 'applied.' : 'merged.'), '#0060a0');
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

// Provider hit counters (Blocked | Reached), demo edition. Live reveals these
// only on mechanism categories (ad / tracker networks) fed by real counts; the
// demo mirrors that with stable sample numbers so the storefront can show the
// single most persuasive pixel on the page (Dave 2026-08-01, delta review #6).
var hdCountableCats = { "Advertising": 1, "Tracking & Stalkerware": 1 };

function hdStatCells(key) {
  // Deterministic per-provider sample counts: hash the key so numbers are
  // stable across visits. Blocked is substantial; Reached is usually zero.
  var h = 0;
  for (var i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  var blocked = 40 + (h % 440);
  var reached = (h % 7 === 0) ? 1 + (h % 5) : 0;
  return '<td class="c hd-stat-col">' + blocked + '</td>' +
         '<td class="c hd-stat-col">' + reached + '</td>';
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
      '<td class="c hd-stat-col">&mdash;</td><td class="c hd-stat-col">&mdash;</td>' +
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
    '<td class="c"><input type="checkbox" title="Filter this provider — it won&#39;t load on your network." id="' + blkId + '"' + (cur==='block'?' checked':'') + ' onchange="hdToggle(\'' + ek + '\',\'block\',\'' + delId + '\')"></td>' +
    '<td class="c hd-delayed-col"><input type="checkbox" title="Allow this provider only for the daily minutes set above, then filter it." id="' + delId + '"' + (cur==='delayed'?' checked':'') + ' onchange="hdToggle(\'' + ek + '\',\'delayed\',\'' + blkId + '\')"></td>' +
    hdStatCells(key) +
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
  // Reveal the Blocked|Reached columns only on mechanism categories, like live.
  document.getElementById('hd-sub-table').classList.toggle('hd-stats-on', !!hdCountableCats[cat[0]]);
  hdShowFilterHint();
}

function hdSearch(term) {
  term = term.trim().toLowerCase();
  var catItems = document.querySelectorAll('#hd-cat-ul li.hd-cat-item');
  if (term === '') { hdClear(); return; }
  var tbody = document.getElementById('hd-sub-body');
  // Search mixes categories, so the per-category stat columns stay hidden.
  document.getElementById('hd-sub-table').classList.remove('hd-stats-on');
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
        // auto-expand the containing section if it's collapsed
        var sectionIdx = item.getAttribute('data-section-idx');
        if (sectionIdx !== null) {
          var sectionKey = parseInt(sectionIdx) < hdSections.length ? hdSections[parseInt(sectionIdx)].name : '__other__';
          if (hdSectionOpen[sectionKey] === false) {
            var hdr = document.querySelector('#hd-cat-ul li.hd-section-hdr[data-section-idx="' + sectionIdx + '"]');
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

var hdHintDismissed = false;
function hdShowFilterHint() {
  if (hdHintDismissed) return;
  var h = document.getElementById('hd-filter-hint');
  if (h) h.style.display = 'block';
}
function hdHideFilterHint() {
  hdHintDismissed = true;
  var h = document.getElementById('hd-filter-hint');
  if (h) h.style.display = 'none';
}

function hdToggle(key, value, otherId) {
  hdHideFilterHint();
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
  // Real router file format (v1 flat doc from lib/config_transfer.lua M.export):
  // a demo export loads straight into a live Haven's Import. Demo keys are
  // "cat/item" exactly as prefs_writer.lua splits them; values block|delayed
  // match the importer's enum. The demo has no devices/whitelist/YT state, so
  // those travel empty. delay_minutes rides in settings, same as the router.
  var delayVal = document.getElementById('hd-temp-min').value;
  var valid = hdValidKeys();
  var prefs = [];
  var keys = [];
  for (var key in hdSettings) { if (hdSettings[key] && valid[key]) keys.push(key); }
  keys.sort();
  for (var i = 0; i < keys.length; i++) {
    var slash = keys[i].indexOf('/');
    prefs.push({ category_key: keys[i].slice(0, slash),
                 item_key: keys[i].slice(slash + 1),
                 value: hdSettings[keys[i]] });
  }
  var doc = {
    haven_config: 1,
    exported_datetime: Math.floor(Date.now() / 1000),
    provenance: { haven_version: 'demo', model: 'Haven Demo (lulhaven.com)' },
    household_prefs: prefs,
    devices: [],
    whitelist: [],
    yt_item_actions: [],
    app_overrides: [],
    app_exclusions: [],
    settings: { delay_minutes: String(parseInt(delayVal) || 0) }
  };
  var d = new Date();
  function p2(n) { return (n < 10 ? '0' : '') + n; }
  var stamp = '' + d.getFullYear() + p2(d.getMonth() + 1) + p2(d.getDate()) +
              '-' + p2(d.getHours()) + p2(d.getMinutes()) + p2(d.getSeconds());
  var blob = new Blob([JSON.stringify(doc, null, 2) + '\n'], {type: 'application/json'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'haven-config-' + stamp + '.json';
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
    var text = e.target.result;
    var newSettings = null;
    var delayMin = null;
    // Router JSON (v1 flat; v2 wraps the same fields in a `payload` string —
    // mirror the router's tolerant reader in config_transfer.lua M.unwrap).
    var doc = null;
    try { doc = JSON.parse(text); } catch (err) { doc = null; }
    if (doc && typeof doc.payload === 'string') {
      try { doc = JSON.parse(doc.payload); } catch (err) { doc = null; }
    }
    if (doc && doc.haven_config !== undefined) {
      newSettings = {};
      var prefs = doc.household_prefs || [];
      for (var i = 0; i < prefs.length; i++) {
        var p = prefs[i];
        if (p && typeof p.category_key === 'string' && typeof p.item_key === 'string' &&
            (p.value === 'block' || p.value === 'delayed')) {
          newSettings[p.category_key + '/' + p.item_key] = p.value;
        }
      }
      if (doc.settings && doc.settings.delay_minutes !== undefined) {
        delayMin = parseInt(doc.settings.delay_minutes);
      }
    } else if (!doc) {
      // Legacy demo .conf (UCI-style text) — grace for files saved before the
      // format matched the router.
      var lines = text.split('\n');
      var imported = {};
      for (var j = 0; j < lines.length; j++) {
        var m = lines[j].match(/^\toption (\S+) '(.*)'$/);
        if (m) imported[m[1]] = m[2];
      }
      if (imported.delay_minutes !== undefined) {
        delayMin = parseInt(imported.delay_minutes);
        delete imported.delay_minutes;
      }
      newSettings = {};
      for (var k in imported) {
        if (k.indexOf('::at') === -1) newSettings[k] = imported[k];
      }
    }
    if (!newSettings) {
      hdShowMsg('Not a Haven config file.', '#a03000');
      input.value = '';
      return;
    }
    if (delayMin !== null && !isNaN(delayMin)) {
      document.getElementById('hd-temp-min').value = delayMin;
    }
    hdSettings = newSettings;
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
  try { localStorage.setItem('havenDemo', JSON.stringify(data)); } catch (e) {}
  hdMarkClean();
  hdShowMsg('Settings saved.');
}

function hdLoad() {
  var raw;
  try { raw = localStorage.getItem('havenDemo'); } catch (e) {}
  if (!raw) return;
  try {
    var data = JSON.parse(raw);
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

// Illustrative parity features (demo facade, mirrors the live Helm) -----------
function hdCheckUpdate() {
  var s = document.getElementById('hd-update-status');
  if (!s) return;
  s.textContent = 'Checking…';
  setTimeout(function () { s.textContent = "You're running the latest version."; }, 700);
}
function hdToggleYTMaster() {
  hdMarkDirty();
}

// Device picker + per-device controls (illustrative — mirrors live "Filtering for").
var HD_DEMO_DEVICES = ['Mom\'s phone','East Lounge TV','Sales department phones','Classroom Chromebooks','Lobby kiosk','Applicant kiosk','Guest Wi-Fi'];
function hdInitDevicePicker() {
  var sel = document.getElementById('hd-device-picker');
  if (!sel) return;
  HD_DEMO_DEVICES.forEach(function (d) { var o = document.createElement('option'); o.value = d; o.textContent = d; sel.appendChild(o); });
}
function hdOnDeviceSwitch() {
  var sel = document.getElementById('hd-device-picker');
  var ctrls = document.getElementById('hd-device-state-controls');
  if (!sel || !ctrls) return;
  ctrls.style.display = sel.value ? 'inline' : 'none';
}
function hdDeviceEnabledToggle() {
  var cb = document.getElementById('hd-device-enabled-cb');
  var lbl = document.getElementById('hd-device-enabled-label');
  if (lbl) lbl.textContent = (cb && cb.checked) ? 'On' : 'Off';
  hdMarkDirty();
}
function hdRenameDevice() {
  var sel = document.getElementById('hd-device-picker');
  if (!sel || !sel.value) return;
  var name = window.prompt('Rename this device:', sel.value);
  if (name) { var o = sel.options[sel.selectedIndex]; o.textContent = name; o.value = name; hdMarkDirty(); }
}
function hdDeviceSchedule() { hdShowMsg('Schedule access hours — available on a live Haven router.'); }
function hdDeviceOffnetQR() { hdShowMsg('Off-network QR — pair this device to filter it away from home.'); }
function hdOpenPairModal() { var m = document.getElementById('hd-pair-modal'); if (m) m.style.display = 'flex'; }
function hdClosePairModal() { var m = document.getElementById('hd-pair-modal'); if (m) m.style.display = 'none'; }
function hdOpenAppsModal() { var m = document.getElementById('hd-apps-modal'); if (m) m.style.display = 'flex'; }
function hdCloseAppsModal() { var m = document.getElementById('hd-apps-modal'); if (m) m.style.display = 'none'; }

// Sample log entries shown in the demo (real log on the router uses live data).
// Domains are fictional cartoon-villain placeholders so customers see the
// experience without us having to display real adult or harmful URLs.
var HD_SAMPLE_LOG = [
  { time: '15:42:08', device: 'Classroom Chromebooks',     domain: 'wile-e-coyote.com',    cat: 'E-Commerce',             item: 'ACME Corp' },
  { time: '15:35:22', device: 'Classroom Chromebooks',     domain: 'snidely-whiplash.com', cat: 'Politics & Government',  item: 'Whiplash Lobbying' },
  { time: '15:28:14', device: 'Mom\'s phone',     domain: 'boris-n-natasha.com',  cat: 'Conspiracy & Fabricated Claims', item: 'Pottsylvania Daily' },
  { time: '15:21:03', device: 'Sales department phones',     domain: 'yosemite-sam.com',     cat: 'Firearms & Weapons',     item: 'Sam\'s Six-Shooters' },
  { time: '14:58:47', device: 'Classroom Chromebooks',     domain: 'gargamel.com',         cat: 'Forums & Community',     item: 'Smurf Hunters Guild' },
  { time: '14:51:22', device: 'Lobby kiosk',    domain: 'mojo-jojo.com',        cat: 'AI & Automation',        item: 'Townsville Takeover' },
  { time: '14:43:09', device: 'East Lounge TV',     domain: 'sideshow-bob.com',     cat: 'Politics & Government',  item: 'Springfield Mayoral Fraud' },
  { time: '14:33:55', device: 'Mom\'s phone',     domain: 'cobra-commander.com',  cat: 'Extremism & Radicalization', item: 'Cobra Recruitment' },
  { time: '14:28:11', device: 'Classroom Chromebooks',     domain: 'shredder.net',         cat: 'Anonymous & Random Chat',item: 'Foot Clan Chat' },
  { time: '14:20:43', device: 'Sales department phones',     domain: 'dick-dastardly.com',   cat: 'Sports & Betting',       item: 'Wacky Race Bookies' },
  { time: '14:11:08', device: 'Lobby kiosk',    domain: 'skeletor.com',         cat: 'Gaming',                 item: 'Eternia Online' },
  { time: '14:02:31', device: 'Classroom Chromebooks',     domain: 'captain-hook.com',     cat: 'Peer-to-Peer & Torrenting', item: 'Neverland Bay' },
  { time: '13:55:18', device: 'Mom\'s phone',     domain: 'cruella-deville.com',  cat: 'Big Business',           item: 'DeVille Fur Holdings' },
  { time: '13:47:44', device: 'East Lounge TV',     domain: 'jafar.com',            cat: 'Politics & Government',  item: 'Agrabah Royal Council' },
  { time: '13:38:02', device: 'Applicant kiosk',    domain: 'ursula.com',           cat: 'Dating & Relationships', item: 'Sea Witch Singles' },
  { time: '13:31:27', device: 'Classroom Chromebooks',     domain: 'maleficent.com',       cat: 'Conspiracy & Fabricated Claims', item: 'Curse News Network' },
  { time: '13:24:55', device: 'Lobby kiosk',    domain: 'plankton.com',         cat: 'E-Commerce',             item: 'Chum Bucket Express' },
  { time: '13:14:39', device: 'Classroom Chromebooks',     domain: 'pinky-n-brain.com',    cat: 'AI & Automation',        item: 'World Domination Labs' },
  { time: '13:06:21', device: 'Sales department phones',     domain: 'lex-luthor.com',       cat: 'Big Business',           item: 'LexCorp' },
  { time: '12:58:53', device: 'Applicant kiosk',    domain: 'mr-burns.com',         cat: 'Big Business',           item: 'Springfield Nuclear' },
  { time: '12:49:14', device: 'Classroom Chromebooks',     domain: 'bowser.com',           cat: 'Gaming',                 item: 'Koopa Castle MMO' },
  { time: '12:41:08', device: 'Mom\'s phone',     domain: 'negaduck.com',         cat: 'Social Media',           item: 'Negaverse Network' },
  { time: '12:32:47', device: 'Lobby kiosk',    domain: 'dr-claw.com',          cat: 'Tracking & Stalkerware', item: 'M.A.D. Surveillance' }
];

function hdRenderSampleLog() {
  var tbody = document.getElementById('hd-log-body');
  if (!tbody) return;
  tbody.innerHTML = HD_SAMPLE_LOG.map(function(e, i) {
    var domEsc = e.domain.replace(/'/g, "\\'");
    var src = (i % 4 === 2) ? 'SNI' : 'DNS';
    return '<tr><td style="padding:6px;">' + e.time + '</td><td style="padding:6px;">' + e.device +
      '</td><td style="padding:6px;">' + src + '</td><td style="padding:6px;">' + e.domain + '</td><td style="padding:6px;">' + e.cat +
      '</td><td style="padding:6px;">' + e.item + '</td><td style="padding:6px;">' +
      '<button title="Allow this domain — add it to the whitelist so it stops being filtered." onclick="hdAllowDomain(\'' + domEsc + '\')" style="font-size:0.8em;padding:2px 8px;">Allow</button>' +
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

// Toggle the Administrators panel. Mirrors hdToggleLog. Shows the multi-admin
// concept — first-run UX, named superusers, lock/remove, no Linux jargon.
function hdToggleAdminPanel() {
  var panel = document.getElementById('hd-admin-panel');
  if (!panel) return;
  var visible = (panel.style.display === 'none' || !panel.style.display);
  panel.style.display = visible ? 'block' : 'none';
  var btn = document.getElementById('hd-admin-btn');
  if (btn) btn.classList.toggle('active', visible);
}

// No-op handlers for the demo admin actions — show a friendly confirmation
// dialog so the visitor experiences the UX without us actually mutating
// anything on the demo page (it has no real backend; the live version on
// the router does the actual work).
function hdAdminDemo(action, name) {
  var verbs = {
    lock:   'Lock administrator "' + name + '"? They would not be able to log in until you unlocked them.',
    unlock: 'Unlock administrator "' + name + '"?',
    remove: 'Remove administrator "' + name + '"? They would no longer be able to log in.'
  };
  alert((verbs[action] || ('Action: ' + action + ' on ' + name)) +
        '\n\nThis is a demo. On your real Haven router, the action would be logged and audited.');
}

function hdAdminAddDemo(ev) {
  if (ev && ev.preventDefault) ev.preventDefault();
  var el = document.getElementById('hd-admin-username');
  var typed = (el && el.value ? el.value : 'Roberta in Shipping').replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
  var loginId = typed.toLowerCase().replace(/ /g, '_');
  alert('On your real Haven router, this would create the administrator "' + typed + '" with the password you typed.\n\nThey sign in as "' + loginId + '" — capitals and spaces don\'t matter.');
  return false;
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
hdInitDevicePicker();
// Landing state: open Social & Communication, select Social Media.
hdSectionOpen['Social & Communication'] = true;
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

// Auto-persist demo state to localStorage (same 'havenDemo' key + format hdLoad
// reads on init) so the windowed landing-page preview and the full /demo page
// resume each other without needing an explicit Save click. localStorage (not a
// cookie) because a full preset is >4KB and would be silently dropped by the
// per-cookie size limit.
(function () {
  function autosave() {
    try {
      var valid = hdValidKeys(), clean = {};
      for (var k in hdSettings) { if (hdSettings[k] && valid[k]) clean[k] = hdSettings[k]; }
      var dm = document.getElementById('hd-temp-min');
      var wl = document.getElementById('hd-whitelist-area');
      var data = { s: clean, m: dm ? dm.value : '', w: wl ? wl.value : '' };
      localStorage.setItem('havenDemo', JSON.stringify(data));
    } catch (e) {}
  }
  setInterval(autosave, 2000);
  window.addEventListener('pagehide', autosave);
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') autosave();
  });
})();
