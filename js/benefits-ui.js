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
  var SECTION_ORDER  = ['top', 'main'];
  var SECTION_TITLES = { top: null, main: 'More' };
  var DEFAULT_AUDIENCE = 'family';

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
    var rows = cbDataset.filter(function (r) { return r[rankKey] != null; });
    rows.sort(function (a, b) { return a[rankKey] - b[rankKey]; });

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
          html += '<button type="button" class="cb-details-btn" data-cb-target="' + panelId + '">Details</button>';
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

    document.getElementById('cb-sort-family').classList.toggle('cb-inactive',  audience !== 'family');
    document.getElementById('cb-sort-privacy').classList.toggle('cb-inactive', audience !== 'privacy');
  }

  function closeAllDetails() {
    var panels = document.querySelectorAll('.cb-details-panel.cb-open');
    for (var i = 0; i < panels.length; i++) panels[i].classList.remove('cb-open');
    var btns = document.querySelectorAll('.cb-details-btn.cb-active');
    for (var j = 0; j < btns.length; j++) btns[j].classList.remove('cb-active');
  }

  function wireButtons() {
    function handler(audience) {
      return function (ev) {
        ev.preventDefault();
        renderFor(audience);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    }
    document.getElementById('cb-sort-family').addEventListener('click',  handler('family'));
    document.getElementById('cb-sort-privacy').addEventListener('click', handler('privacy'));

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
    renderFor(DEFAULT_AUDIENCE);
    wireButtons();
  });
})();
