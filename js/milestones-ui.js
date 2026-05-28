// milestones-ui.js — renders the project milestones (milestonesDataset),
// handles sort (newest / biggest), impact filter, and per-row Details.

(function () {
  // Parse ?ids=N,N,N&label=... — when present, restrict the page to those
  // accomplishment IDs and show a banner naming the feature they relate to.
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

  var state = { sort: 'newest', minImpact: featureFilter ? 1 : 4 };

  function escapeHtml(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function comparator(mode) {
    if (mode === 'biggest') {
      return function (a, b) {
        if (b.impact !== a.impact) return b.impact - a.impact;
        return (b.date || '').localeCompare(a.date || '');
      };
    }
    return function (a, b) {
      var c = (b.date || '').localeCompare(a.date || '');
      if (c !== 0) return c;
      return b.impact - a.impact;
    };
  }

  function filtered() {
    var rows = milestonesDataset.filter(function (r) { return r.impact >= state.minImpact; });
    if (featureFilter) {
      var allowed = {};
      featureFilter.ids.forEach(function (id) { allowed[id] = true; });
      rows = rows.filter(function (r) { return allowed[r.id]; });
    }
    return rows;
  }

  var BLURB_BY_LEVEL = {
    5: "These are the heaviest. The most impactful. Our greatest accomplishments — the ones that define what Haven is.",
    4: "Major capabilities and architecture decisions. The shipped work and locked calls that move the needle.",
    3: "Substantial iterations on top of the big moves. The grind that turns &ldquo;it works&rdquo; into &ldquo;it works well.&rdquo;",
    2: "Small fixes, refinements, and tweaks. The polish that compounds into a real product.",
    1: "Some define our product. Others were housekeeping. All necessary to get where we are."
  };

  function updateBlurb(visibleCount) {
    var sel = document.getElementById('ms-filter');
    var label = sel.options[sel.selectedIndex].text.toLowerCase();
    var tail = BLURB_BY_LEVEL[state.minImpact] || BLURB_BY_LEVEL[1];
    document.getElementById('ms-blurb').innerHTML =
      "We have had <strong>" + visibleCount + "</strong> milestones at this level (" + escapeHtml(label) + "). " + tail;
  }

  function render() {
    var rows = filtered().sort(comparator(state.sort));
    var html = '';
    rows.forEach(function (r, i) {
      var panelId = 'ms-detail-' + i;
      html += '<div class="ms-row mbr-text mbr-fonts-style display-7">';
      html += '<div class="ms-meta">';
      html += '<span class="ms-date">' + escapeHtml(r.date) + '</span>';
      if (r.theme)  html += '<span class="ms-theme">'  + escapeHtml(r.theme)  + '</span>';
      if (r.impact) html += '<span class="ms-impact" title="Impact ' + r.impact + ' of 5">' + '★'.repeat(r.impact) + '</span>';
      if (r.features && r.features.length) {
        var fids   = r.features.map(function (f) { return f.id; }).join(',');
        var flabel = r.features.map(function (f) { return f.lead; }).join(' / ');
        var fUrl   = 'features.html?ids=' + encodeURIComponent(fids) +
                     '&label=' + encodeURIComponent(flabel);
        html += '<a class="ms-feature-star" href="' + fUrl +
                '" title="This milestone shipped a feature: ' + escapeHtml(flabel) +
                ' — click to see it">&#10022;</a>';
      }
      html += '</div>';
      html += '<div class="ms-summary"><strong>' + escapeHtml(r.summary) + '</strong></div>';
      if (r.benefit) html += '<div class="ms-benefit">' + escapeHtml(r.benefit) + '</div>';
      if (r.detail) {
        html += ' <button type="button" class="ms-details-btn" data-ms-target="' + panelId + '">Details</button>';
        html += '<div class="ms-details-panel" id="' + panelId + '">' + escapeHtml(r.detail) + '</div>';
      }
      html += '</div>';
    });

    var container = document.getElementById('ms-content');
    container.innerHTML = html || '<p style="text-align:center;opacity:0.5;padding:30px 0;">No milestones at this filter level.</p>';

    document.getElementById('ms-sort-newest').classList.toggle('ms-inactive',  state.sort !== 'newest');
    document.getElementById('ms-sort-biggest').classList.toggle('ms-inactive', state.sort !== 'biggest');
    updateBlurb(rows.length);
  }

  function closeAllDetails() {
    var panels = document.querySelectorAll('.ms-details-panel.ms-open');
    for (var i = 0; i < panels.length; i++) panels[i].classList.remove('ms-open');
    var btns = document.querySelectorAll('.ms-details-btn.ms-active');
    for (var j = 0; j < btns.length; j++) btns[j].classList.remove('ms-active');
  }

  function wire() {
    document.getElementById('ms-sort-newest').addEventListener('click', function (ev) {
      ev.preventDefault();
      state.sort = 'newest';
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.getElementById('ms-sort-biggest').addEventListener('click', function (ev) {
      ev.preventDefault();
      state.sort = 'biggest';
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.getElementById('ms-filter').addEventListener('change', function (ev) {
      state.minImpact = parseInt(ev.target.value, 10);
      render();
    });

    document.getElementById('ms-content').addEventListener('click', function (ev) {
      var btn = ev.target.closest && ev.target.closest('.ms-details-btn');
      if (!btn) return;
      ev.preventDefault();
      var targetId = btn.getAttribute('data-ms-target');
      var panel = document.getElementById(targetId);
      var wasOpen = panel && panel.classList.contains('ms-open');
      closeAllDetails();
      if (panel && !wasOpen) {
        panel.classList.add('ms-open');
        btn.classList.add('ms-active');
      }
    });

    document.addEventListener('click', function (ev) {
      if (ev.target.closest && (ev.target.closest('.ms-details-panel') || ev.target.closest('.ms-details-btn'))) return;
      closeAllDetails();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof milestonesDataset === 'undefined') {
      document.getElementById('ms-content').innerHTML = '<p style="text-align:center;color:#a00;">Milestones data failed to load.</p>';
      return;
    }
    document.getElementById('ms-total').textContent = '(' + milestonesDataset.length + ')';
    if (featureFilter) {
      var banner = document.getElementById('ms-feature-banner');
      banner.innerHTML = 'Showing milestones for feature: <strong>' +
                         escapeHtml(featureFilter.label || 'selected feature') + '</strong>' +
                         '  &middot;  <a href="milestones.html">Show all milestones</a>';
      banner.classList.add('ms-banner-on');
    }
    render();
    wire();
  });
})();
