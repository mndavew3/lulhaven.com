// kyc.js — Know Your Client beacon for lulhaven.com.
//
// Sends one /api/visit POST per pageview, plus /api/event POSTs for outbound
// clicks. Owner visits are tagged is_owner=1, not blocked — filter at query
// time, not at write time.
//
// Owner toggle:
//   https://lulhaven.com/?havenowner=on    -> sets localStorage.havenOwner = 'yes'
//   https://lulhaven.com/?havenowner=off   -> clears it
// Persists in localStorage; set it once per browser/device you use for dev.

(function () {
  // Don't beacon when embedded (e.g. the landing-page demo preview iframe) —
  // that would log a phantom /demo pageview on every homepage visit.
  if (window.top !== window.self) return;

  var ENDPOINT_VISIT = '/api/visit';
  var ENDPOINT_EVENT = '/api/event';
  var OWNER_KEY      = 'havenOwner';
  var SESSION_KEY    = 'havenSession';
  var VISITOR_KEY    = 'havenVisitor';

  // --- owner toggle from query param ---
  try {
    var p = new URLSearchParams(window.location.search);
    var flag = p.get('havenowner');
    if (flag === 'on')  localStorage.setItem(OWNER_KEY, 'yes');
    if (flag === 'off') localStorage.removeItem(OWNER_KEY);
  } catch (e) { /* localStorage unavailable, no-op */ }

  function isOwner() {
    try { return localStorage.getItem(OWNER_KEY) === 'yes'; }
    catch (e) { return false; }
  }

  function newUuid() {
    return (window.crypto && crypto.randomUUID)
      ? crypto.randomUUID()
      : 'id-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);
  }

  function sessionId() {
    try {
      var s = sessionStorage.getItem(SESSION_KEY);
      if (s) return s;
      var u = newUuid();
      sessionStorage.setItem(SESSION_KEY, u);
      return u;
    } catch (e) { return null; }
  }

  function visitorId() {
    // Anonymous persistent identifier — first-party, browser-scoped, no PII.
    // Survives across sessions/days. Resets when localStorage is cleared.
    try {
      var v = localStorage.getItem(VISITOR_KEY);
      if (v) return v;
      v = newUuid();
      localStorage.setItem(VISITOR_KEY, v);
      return v;
    } catch (e) { return null; }
  }

  function sendBeacon(url, payload) {
    var body = JSON.stringify(payload);
    try {
      // sendBeacon survives page unload (outbound clicks especially)
      if (navigator.sendBeacon) {
        var blob = new Blob([body], { type: 'application/json' });
        if (navigator.sendBeacon(url, blob)) return;
      }
    } catch (e) { /* fall through */ }
    fetch(url, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    body,
      keepalive: true
    }).catch(function () { /* fire and forget */ });
  }

  function logPageview() {
    sendBeacon(ENDPOINT_VISIT, {
      path:       window.location.pathname,
      referrer:   document.referrer || null,
      session:    sessionId(),
      visitor_id: visitorId(),
      is_owner:   isOwner() ? 1 : 0
    });
  }

  function logEvent(kind, value) {
    sendBeacon(ENDPOINT_EVENT, {
      kind:       kind,
      value:      value || null,
      path:       window.location.pathname,
      session:    sessionId(),
      visitor_id: visitorId(),
      is_owner:   isOwner() ? 1 : 0
    });
  }
  // Exposed so other pages can fire custom events: window.havenKyc.event(...)
  window.havenKyc = { event: logEvent, isOwner: isOwner };

  function wireOutboundClicks() {
    document.addEventListener('click', function (ev) {
      var a = ev.target.closest && ev.target.closest('a[href]');
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href) return;
      // External http/https links (not same-origin, not mailto/tel/etc anchors)
      var isAbsolute = /^https?:\/\//i.test(href);
      if (!isAbsolute) return;
      try {
        var u = new URL(href, window.location.href);
        if (u.host === window.location.host) return; // same site, ignore
      } catch (e) { return; }
      logEvent('outbound_click', href);
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      logPageview();
      wireOutboundClicks();
    });
  } else {
    logPageview();
    wireOutboundClicks();
  }
})();
