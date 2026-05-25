// customer-features-ui.js — renders the customer feature list (cfDataset),
// handles the two sort buttons, and fires a one-time first-click vote
// for default-audience telemetry.

(function () {
  var SECTION_ORDER = ['headline', 'main', 'how_it_works', 'what_we_dont', 'coming_soon'];
  var SECTION_TITLES = {
    headline:     null,
    main:         null,
    how_it_works: 'How it works',
    what_we_dont: 'What Haven does not do',
    coming_soon:  'Coming soon'
  };
  var LS_VOTED_KEY = 'cfFirstClick';   // localStorage flag: any non-empty value = already voted
  var DEFAULT_AUDIENCE = 'privacy';    // adjusted manually once vote data accumulates

  function escapeHtml(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderFor(audience) {
    var rankKey = audience + '_rank';
    var leadKey = audience + '_lead';
    var rows = cfDataset.filter(function (r) { return r[rankKey] != null; });
    rows.sort(function (a, b) { return a[rankKey] - b[rankKey]; });
    var bySection = {};
    rows.forEach(function (r) {
      (bySection[r.section] = bySection[r.section] || []).push(r);
    });

    var html = '';
    SECTION_ORDER.forEach(function (section) {
      var bullets = bySection[section];
      if (!bullets || !bullets.length) return;
      html += '<div class="cf-section">';
      var title = SECTION_TITLES[section];
      if (title) {
        html += '<h2 class="cf-section-title mbr-fonts-style display-5">' + escapeHtml(title) + '</h2>';
      }
      bullets.forEach(function (r) {
        var lead = r[leadKey] || r.lead;
        var leadHtml = escapeHtml(lead);
        if (r.link) {
          leadHtml = '<a href="' + escapeHtml(r.link) + '">' + leadHtml + '</a>';
        }
        html += '<div class="cf-bullet mbr-text mbr-fonts-style display-7">';
        html += '<strong>' + leadHtml + '</strong>';
        if (r.body) html += escapeHtml(r.body);
        html += '</div>';
      });
      html += '</div>';
    });

    document.getElementById('cf-content').innerHTML = html;

    document.getElementById('cf-sort-family').classList.toggle('cf-inactive',  audience !== 'family');
    document.getElementById('cf-sort-privacy').classList.toggle('cf-inactive', audience !== 'privacy');
  }

  function recordFirstClick(audience) {
    try {
      if (localStorage.getItem(LS_VOTED_KEY)) return;
      localStorage.setItem(LS_VOTED_KEY, audience);
    } catch (e) { return; }
    fetch('/api/feature-vote', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ audience: audience })
    }).catch(function () { /* fire and forget */ });
  }

  function wireButtons() {
    function handler(audience) {
      return function (ev) {
        ev.preventDefault();
        renderFor(audience);
        recordFirstClick(audience);
      };
    }
    document.getElementById('cf-sort-family').addEventListener('click',  handler('family'));
    document.getElementById('cf-sort-privacy').addEventListener('click', handler('privacy'));
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof cfDataset === 'undefined') {
      document.getElementById('cf-content').innerHTML = '<p class="mbr-text mbr-fonts-style display-7" style="text-align:center;color:#a00;">Feature data failed to load.</p>';
      return;
    }
    renderFor(DEFAULT_AUDIENCE);
    wireButtons();
  });
})();
