var hdNameGroups = {};
var hdKeyNameMap = {};
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
      '<td class="c"><input type="checkbox" disabled></td>' +
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
    '<td class="c"><input type="checkbox" id="' + delId + '"' + (cur==='delayed'?' checked':'') + ' onchange="hdToggle(\'' + ek + '\',\'delayed\',\'' + blkId + '\')"></td>' +
    '</tr>';
}

function hdSelect(index) {
  hdCurrentCat = index;
  document.getElementById('hd-search-input').value = '';
  var items = document.querySelectorAll('#hd-cat-ul li');
  for (var i = 0; i < items.length; i++) items[i].classList.remove('hd-selected');
  items[index].classList.add('hd-selected');
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
  var items = document.querySelectorAll('#hd-cat-ul li');
  if (term === '') { hdClear(); return; }
  var tbody = document.getElementById('hd-sub-body');
  tbody.innerHTML = '';
  var count = 0;
  for (var i = 0; i < items.length; i++) items[i].classList.remove('hd-highlighted', 'hd-selected');
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
    if (catMatched) items[ci].classList.add('hd-highlighted');
  }
  document.getElementById('hd-sub-title').textContent = count > 0
    ? 'Search results (' + count + ' match' + (count > 1 ? 'es' : '') + ')'
    : 'No results found';
}

function hdClear() {
  document.getElementById('hd-search-input').value = '';
  var items = document.querySelectorAll('#hd-cat-ul li');
  for (var i = 0; i < items.length; i++) items[i].classList.remove('hd-highlighted');
  hdSelect(hdCurrentCat);
}

function hdToggle(key, value, otherId) {
  var safeId = key.replace(/\//g, '__');
  var cb = document.getElementById((value === 'block' ? 'blk_' : 'del_') + safeId);
  var newVal = (cb && cb.checked) ? value : '';
  hdSettings[key] = newVal;
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
}

function hdExport() {
  var delayVal = document.getElementById('hd-temp-min').value;
  var now = Math.floor(Date.now() / 1000);
  var delaySeconds = parseInt(delayVal) * 60;
  var lines = ["config haven 'settings'", "\toption delay_minutes '" + delayVal + "'"];
  for (var key in hdSettings) {
    if (hdSettings[key]) {
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
    hdSelect(hdCurrentCat);
    var msg = document.getElementById('hd-save-msg');
    msg.style.color = '#0060a0';
    msg.textContent = 'Imported. Click Save to apply.';
    msg.style.display = 'inline';
    setTimeout(function() { msg.style.display = 'none'; msg.style.color = ''; msg.textContent = 'Settings saved.'; }, 5000);
    input.value = '';
  };
  reader.readAsText(file);
}

function hdSave() {
  var data = { s: hdSettings, m: document.getElementById('hd-temp-min').value };
  var exp = new Date();
  exp.setFullYear(exp.getFullYear() + 1);
  document.cookie = 'haven_demo=' + encodeURIComponent(JSON.stringify(data)) +
    '; expires=' + exp.toUTCString() + '; path=/; SameSite=Lax';
  var msg = document.getElementById('hd-save-msg');
  msg.textContent = 'Settings saved.';
  msg.style.display = 'inline';
  setTimeout(function() { msg.style.display = 'none'; }, 3000);
}

function hdLoad() {
  var match = document.cookie.match(/(?:^|;\s*)haven_demo=([^;]+)/);
  if (!match) return;
  try {
    var data = JSON.parse(decodeURIComponent(match[1]));
    if (data.s) hdSettings = data.s;
    if (data.m) document.getElementById('hd-temp-min').value = data.m;
  } catch(e) {}
}

var ul = document.getElementById('hd-cat-ul');
for (var i = 0; i < hdDataset.length; i++) {
  var li = document.createElement('li');
  li.textContent = hdDataset[i][0];
  li.onclick = (function(idx) { return function() { hdSelect(idx); }; })(i);
  ul.appendChild(li);
}
hdLoad();
hdSelect(0);
