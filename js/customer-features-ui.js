// customer-features-ui.js — renders the customer feature list (cfDataset),
// handles the two sort buttons, and fires a one-time first-click vote
// for default-audience telemetry.

(function () {
  // Parse ?ids=N,N,N&label=... — when present, restrict the page to those
  // customer_features IDs and show a banner naming the benefit they deliver.
  var params      = new URLSearchParams(window.location.search);
  var idsParam    = params.get('ids');
  var labelParam  = params.get('label');
  var benefitFilter = null;
  if (idsParam) {
    var parsedIds = idsParam.split(',').map(function (s) { return parseInt(s, 10); })
                                       .filter(function (n) { return !isNaN(n); });
    if (parsedIds.length) {
      benefitFilter = { ids: parsedIds, label: labelParam || '' };
    }
  }

  var SECTION_ORDER = ['headline', 'main', 'how_it_works', 'what_we_dont', 'coming_soon'];
  var SECTION_TITLES = {
    headline:     null,
    main:         null,
    how_it_works: 'How it works',
    what_we_dont: 'What Haven does not do',
    coming_soon:  'Coming soon'
  };
  var LS_VOTED_KEY = 'cfFirstClick';   // localStorage flag: any non-empty value = already voted
  var DEFAULT_AUDIENCE = 'neither';

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
    var rows;
    if (benefitFilter) {
      var allow = {};
      benefitFilter.ids.forEach(function (id) { allow[id] = true; });
      rows = cfDataset.filter(function (r) { return allow[r.id]; });
      rows.sort(function (a, b) {
        var ar = a[rankKey] != null ? a[rankKey] : (a.family_rank != null ? a.family_rank : 999);
        var br = b[rankKey] != null ? b[rankKey] : (b.family_rank != null ? b.family_rank : 999);
        return ar - br;
      });
    } else if (audience === 'neither') {
      rows = cfDataset.slice(); // all rows, natural order
    } else {
      rows = cfDataset.filter(function (r) { return r[rankKey] != null; });
      rows.sort(function (a, b) { return a[rankKey] - b[rankKey]; });
    }
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
      bullets.forEach(function (r, i) {
        var lead = r[leadKey] || r.lead;
        var leadHtml = escapeHtml(lead);
        if (r.link) {
          leadHtml = '<a href="' + escapeHtml(r.link) + '">' + leadHtml + '</a>';
        }
        var panelId = 'cf-detail-' + section + '-' + i;
        var rowClass = 'cf-bullet mbr-text mbr-fonts-style display-7';
        if (r.image) rowClass += ' cf-bullet-with-image';
        html += '<div class="' + rowClass + '">';
        if (r.image) {
          html += '<img class="cf-bullet-thumb" src="assets/images/' + escapeHtml(r.image) + '" alt="' + escapeHtml(lead) + '">';
        }
        html += '<div class="cf-bullet-text">';
        html += '<strong>' + leadHtml + '</strong>';
        if (r.body) html += escapeHtml(r.body);
        if (r.details) {
          html += ' <button type="button" class="cf-details-btn" data-cf-target="' + panelId + '">Details</button>';
        }
        if (r.milestone_ids) {
          var mUrl = 'milestones.html?ids=' + encodeURIComponent(r.milestone_ids) +
                     '&label=' + encodeURIComponent(lead);
          html += ' <a class="cf-milestone-link" href="' + mUrl + '">See when we built this →</a>';
        }
        if (r.benefits && r.benefits.length) {
          var bIds   = r.benefits.map(function (b) { return b.id; }).join(',');
          var bUrl   = 'benefits.html?ids=' + encodeURIComponent(bIds) +
                       '&label=' + encodeURIComponent(lead);
          html += ' <a class="cf-benefit-link" href="' + bUrl + '">Why this matters →</a>';
        }
        html += '</div>';  // /.cf-bullet-text
        html += '</div>';
        if (r.details) {
          html += '<div class="cf-details-panel" id="' + panelId + '">' + r.details + '</div>';
        }
      });
      html += '</div>';
    });

    document.getElementById('cf-content').innerHTML = html;

    document.getElementById('cf-sort-neither').classList.toggle('cf-inactive', audience !== 'neither');
    document.getElementById('cf-sort-family').classList.toggle('cf-inactive',  audience !== 'family');
    document.getElementById('cf-sort-privacy').classList.toggle('cf-inactive', audience !== 'privacy');
    if (window.havenKyc) window.havenKyc.event('features_sort', audience);
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
    document.getElementById('cf-sort-neither').addEventListener('click', handler('neither'));
    document.getElementById('cf-sort-family').addEventListener('click',  handler('family'));
    document.getElementById('cf-sort-privacy').addEventListener('click', handler('privacy'));

    // Delegated handler for the per-bullet Details buttons. Re-render of
    // cf-content tears off direct listeners, so delegation on the container
    // survives every sort switch.
    document.getElementById('cf-content').addEventListener('click', function (ev) {
      var btn = ev.target.closest && ev.target.closest('.cf-details-btn');
      if (!btn) return;
      ev.preventDefault();
      var targetId = btn.getAttribute('data-cf-target');
      var panel = document.getElementById(targetId);
      var wasOpen = panel && panel.classList.contains('cf-open');
      closeAllDetails();
      if (panel && !wasOpen) {
        panel.classList.add('cf-open');
        btn.classList.add('cf-active');
      }
    });

    // Click outside any bullet/panel closes whatever is open.
    document.addEventListener('click', function (ev) {
      if (ev.target.closest && (ev.target.closest('.cf-details-panel') || ev.target.closest('.cf-details-btn'))) return;
      closeAllDetails();
    });
  }

  function closeAllDetails() {
    var panels = document.querySelectorAll('.cf-details-panel.cf-open');
    for (var i = 0; i < panels.length; i++) panels[i].classList.remove('cf-open');
    var btns = document.querySelectorAll('.cf-details-btn.cf-active');
    for (var j = 0; j < btns.length; j++) btns[j].classList.remove('cf-active');
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof cfDataset === 'undefined') {
      document.getElementById('cf-content').innerHTML = '<p class="mbr-text mbr-fonts-style display-7" style="text-align:center;color:#a00;">Feature data failed to load.</p>';
      return;
    }
    if (benefitFilter) {
      var banner = document.getElementById('cf-benefit-banner');
      if (banner) {
        banner.innerHTML = 'Showing features for: <strong>' +
                           escapeHtml(benefitFilter.label || 'selected') + '</strong>' +
                           '  &middot;  <a href="features.html">Show all features</a>';
        banner.classList.add('cf-banner-on');
      }
    }
    renderFor(DEFAULT_AUDIENCE);
    wireButtons();
  });
})();
