// benefits-ui.js — renders the customer benefits list (cbDataset),
// handles the two sort buttons, and supports per-row Details expansion.
//
// Data shape per row:
//   { section: 'top'|'main', lead, body,
//     family_rank, privacy_rank, family_lead, privacy_lead,
//     related_feature_ids, details, link }
//
// Section order on the page: 'top' first, 'main' below. Within each section,
// rows are sorted by the audience-rank.

(function () {
  // Parse ?ids=N,N,N&label=... — when present (e.g. arriving from a feature's
  // "Why this matters →" back-link), restrict to those benefit IDs and show a
  // banner naming the originating feature.
  var params       = new URLSearchParams(window.location.search);
  var idsParam     = params.get('ids');
  var labelParam   = params.get('label');
  var featureFilter = null;
  if (idsParam) {
    var parsedIds = idsParam.split(',').map(function (s) { return parseInt(s, 10); })
                                       .filter(function (n) { return !isNaN(n); });
    if (parsedIds.length) {
      featureFilter = { ids: parsedIds, label: labelParam || '' };
    }
  }

  var SECTION_ORDER  = ['top', 'main'];
  var SECTION_TITLES = { top: null, main: 'More' };
  // 'neither' is the neutral default: no lens chosen. Rows are ordered by the
  // average of the two audience ranks and shown with their base lead/body, so
  // the landing view favors neither audience. Any click off 'neither' is a
  // volitional signal.
  var DEFAULT_AUDIENCE = 'neither';

  // Neutral sort key: average of whatever ranks a row has.
  function neutralRank(r) {
    var fr = r.family_rank, pr = r.privacy_rank;
    if (fr != null && pr != null) return (fr + pr) / 2;
    if (fr != null) return fr;
    if (pr != null) return pr;
    return 999;
  }

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
    var neutral = audience === 'neither';
    var rankKey = audience + '_rank';
    var leadKey = audience + '_lead';
    var rankOf  = neutral ? neutralRank : function (r) { return r[rankKey]; };
    var rows;
    if (featureFilter) {
      var allow = {};
      featureFilter.ids.forEach(function (id) { allow[id] = true; });
      rows = cbDataset.filter(function (r) { return allow[r.id]; });
      rows.sort(function (a, b) {
        var ar = rankOf(a); if (ar == null) ar = neutralRank(a);
        var br = rankOf(b); if (br == null) br = neutralRank(b);
        return ar - br;
      });
    } else {
      rows = cbDataset.filter(function (r) { return rankOf(r) != null; });
      rows.sort(function (a, b) { return rankOf(a) - rankOf(b); });
    }

    var bySection = {};
    rows.forEach(function (r) {
      (bySection[r.section] = bySection[r.section] || []).push(r);
    });

    var html = '';
    SECTION_ORDER.forEach(function (section) {
      var items = bySection[section];
      if (!items || !items.length) return;
      html += '<div class="cb-section">';
      var title = SECTION_TITLES[section];
      if (title) {
        html += '<h2 class="cb-section-title mbr-fonts-style display-5">' + escapeHtml(title) + '</h2>';
      }
      items.forEach(function (r, i) {
        var lead = r[leadKey] || r.lead;
        var leadHtml = escapeHtml(lead);
        if (r.link) {
          leadHtml = '<a href="' + escapeHtml(r.link) + '">' + leadHtml + '</a>';
        }
        var panelId = 'cb-detail-' + section + '-' + i;
        html += '<div class="cb-row mbr-text mbr-fonts-style display-7">';
        html += '<div class="cb-lead">' + leadHtml + '</div>';
        if (r.body) html += '<div class="cb-body">' + escapeHtml(r.body) + '</div>';
        if (r.details) {
          html += '<button type="button" class="cb-details-btn" data-cb-target="' + panelId + '" data-cb-bid="' + r.id + '">Details</button>';
          html += '<div class="cb-details-panel" id="' + panelId + '">' + r.details + '</div>';
        }
        if (r.related_feature_ids) {
          // Filter the features page to the specific customer_features ids
          // that deliver this benefit; features-ui.js parses ?ids=&label= and
          // shows a banner naming the originating benefit.
          var fUrl = 'features.html?ids=' + encodeURIComponent(r.related_feature_ids) +
                     '&label=' + encodeURIComponent(lead);
          html += '<div class="cb-related">' +
                  '<a href="' + fUrl + '">See the features that deliver this →</a>' +
                  '</div>';
        }
        html += '</div>';
      });
      html += '</div>';
    });

    document.getElementById('cb-content').innerHTML = html;

    document.getElementById('cb-sort-neither').classList.toggle('cb-inactive', audience !== 'neither');
    document.getElementById('cb-sort-family').classList.toggle('cb-inactive',  audience !== 'family');
    document.getElementById('cb-sort-privacy').classList.toggle('cb-inactive', audience !== 'privacy');
  }

  function closeAllDetails() {
    var panels = document.querySelectorAll('.cb-details-panel.cb-open');
    for (var i = 0; i < panels.length; i++) panels[i].classList.remove('cb-open');
    var btns = document.querySelectorAll('.cb-details-btn.cb-active');
    for (var j = 0; j < btns.length; j++) btns[j].classList.remove('cb-active');
  }

  // --- sort-engagement tracking ---
  // sortCount: how many sort buttons the visitor has clicked (1 => first click).
  // cur*: the currently-active chosen sort, its order index, and when it became
  // active — so we can report how long they dwelled on each sort order.
  var sortCount = 0;
  var curAud = null, curStart = 0, curOrd = 0;

  function emitSortDwell() {
    if (curAud == null || curStart === 0) return;
    var ms = Date.now() - curStart;
    curStart = 0; // mark paused so duplicate flushes are no-ops
    if (window.havenKyc && window.havenKyc.event) {
      window.havenKyc.event('benefits_sort_dwell', curAud + ':ord' + curOrd + ':ms' + ms);
    }
  }

  function wireButtons() {
    function handler(audience) {
      return function (ev) {
        ev.preventDefault();
        emitSortDwell();          // close out the previous sort order's timer
        sortCount += 1;
        curAud = audience; curOrd = sortCount; curStart = Date.now();
        renderFor(audience);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Record the chosen lens + its click order (ord1 = first sort clicked).
        if (window.havenKyc && window.havenKyc.event) {
          window.havenKyc.event('benefits_sort', audience + ':ord' + sortCount);
        }
      };
    }
    document.getElementById('cb-sort-neither').addEventListener('click', handler('neither'));
    document.getElementById('cb-sort-family').addEventListener('click',  handler('family'));
    document.getElementById('cb-sort-privacy').addEventListener('click', handler('privacy'));

    // Flush the active sort's dwell when the visitor leaves or backgrounds the
    // page; resume the timer if they come back without re-sorting.
    window.addEventListener('pagehide', emitSortDwell);
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') emitSortDwell();
      else if (curAud != null && curStart === 0) curStart = Date.now();
    });

    document.getElementById('cb-content').addEventListener('click', function (ev) {
      var btn = ev.target.closest && ev.target.closest('.cb-details-btn');
      if (!btn) return;
      ev.preventDefault();
      var targetId = btn.getAttribute('data-cb-target');
      var panel = document.getElementById(targetId);
      var wasOpen = panel && panel.classList.contains('cb-open');
      closeAllDetails();
      if (panel && !wasOpen) {
        panel.classList.add('cb-open');
        btn.classList.add('cb-active');
        // Which specific benefit a visitor opened — a stronger intent signal
        // than the lens choice. Tag it with the lens active at expand time.
        if (window.havenKyc && window.havenKyc.event) {
          window.havenKyc.event('benefit_detail', btn.getAttribute('data-cb-bid') + ':' + (curAud || 'neither'));
        }
      }
    });

    document.addEventListener('click', function (ev) {
      if (ev.target.closest && (ev.target.closest('.cb-details-panel') || ev.target.closest('.cb-details-btn'))) return;
      closeAllDetails();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof cbDataset === 'undefined') {
      document.getElementById('cb-content').innerHTML = '<p style="text-align:center;color:#a00;">Benefit data failed to load.</p>';
      return;
    }
    if (featureFilter) {
      var banner = document.getElementById('cb-feature-banner');
      if (banner) {
        banner.innerHTML = 'Showing the benefit behind: <strong>' +
                           escapeHtml(featureFilter.label || 'selected feature') + '</strong>' +
                           '  &middot;  <a href="benefits.html">Show all benefits</a>';
        banner.classList.add('cb-banner-on');
      }
    }
    renderFor(DEFAULT_AUDIENCE);
    wireButtons();
    // Log the neutral landing as the denominator (ord0) and start its dwell
    // timer, so a visitor who never clicks still counts as "saw it, chose
    // neither" and we can measure how long the neutral view held them.
    curAud = 'neither'; curOrd = 0; curStart = Date.now();
    if (window.havenKyc && window.havenKyc.event) {
      window.havenKyc.event('benefits_sort', 'neither:ord0');
    }
  });
})();
