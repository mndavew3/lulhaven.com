// kyc.js — Know Your Client beacon for lulhaven.com.
//
// Sends one /api/visit POST per pageview, plus /api/event POSTs for every
// click (nav, buttons, outbound, and a catch-all). Owner visits are tagged
// is_owner=1, not blocked — filter at query time, not at write time.
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

  // Compact, legible descriptor of a clicked element for the event value:
  // "tag#id.class | visible text", capped so rows stay readable at review time.
  function describe(el) {
    if (!el || el.nodeType !== 1) return '';
    var tag = (el.tagName || '').toLowerCase();
    var id  = el.id ? '#' + el.id : '';
    var cls = (typeof el.className === 'string' && el.className.trim())
      ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '';
    // Never log what someone typed: a text box's value can be a password or an
    // email address (2026-10-01 a contest password landed here). Typing fields
    // describe themselves by tag/id only; button-type inputs keep their label.
    var type  = ((el.getAttribute && el.getAttribute('type')) || '').toLowerCase();
    var typed = (tag === 'input' && !/^(submit|button|reset)$/.test(type)) ||
                tag === 'textarea' || tag === 'select';
    var txt = (el.getAttribute && el.getAttribute('aria-label')) ||
              (typed ? '' : (el.textContent || el.value || ''));
    txt = String(txt).replace(/\s+/g, ' ').trim().slice(0, 60);
    return (tag + id + cls + (txt ? ' | ' + txt : '')).slice(0, 200);
  }

  // One delegated handler logs EVERY click, classified so the review stays
  // legible: outbound/buy/labeled links keep their own kinds; same-site links
  // log as nav_click; buttons and controls as ui_click; anything else as
  // click. Bare taps on <html>/<body> (background whitespace) are ignored.
  function wireClicks() {
    function onClick(ev) {
      var t = ev.target;
      if (!t || t.nodeType !== 1) return;

      var a = t.closest && t.closest('a[href]');
      if (a) {
        var href   = a.getAttribute('href') || '';
        var custom = a.getAttribute('data-ev');
        // Outbound: absolute http/https to a different host.
        if (/^https?:\/\//i.test(href)) {
          try {
            var u = new URL(href, window.location.href);
            if (u.host !== window.location.host) {
              // Buy/checkout clicks get their own kind (Stripe host or the id).
              if (/(^|\.)stripe\.com$/i.test(u.host) || a.id === 'founders-buy') {
                logEvent('buy_click', href);
              } else if (custom) {
                // Labeled outbound (data-ev="manga_click" data-ev-label="ch1").
                logEvent(custom.slice(0, 64), a.getAttribute('data-ev-label') || href);
              } else {
                logEvent('outbound_click', href);
              }
              return;
            }
          } catch (e) { /* malformed URL — fall through to internal handling */ }
        }
        // Same-site or relative link.
        if (custom) { logEvent(custom.slice(0, 64), a.getAttribute('data-ev-label') || href); return; }
        var label = (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60);
        logEvent('nav_click', href + (label ? ' | ' + label : ''));
        return;
      }

      // Non-link interactive controls.
      var ctl = t.closest && t.closest(
        'button,[role="button"],input[type="submit"],input[type="button"],' +
        'input[type="checkbox"],input[type="radio"],select,summary,label,[data-ev],[onclick]');
      if (ctl) {
        var cev = ctl.getAttribute('data-ev');
        if (cev) { logEvent(cev.slice(0, 64), ctl.getAttribute('data-ev-label') || describe(ctl)); return; }
        logEvent('ui_click', describe(ctl));
        return;
      }

      // Everything else — basically every click. Skip only bare background taps.
      var tag = (t.tagName || '').toLowerCase();
      if (tag === 'html' || tag === 'body') return;
      logEvent('click', describe(t));
    }
    document.addEventListener('click', onClick, true);
    // A middle-click opens a link in a new tab and fires 'auxclick', never
    // 'click' (2026-10-01: Dave's new-tab opens left no click reports). Count
    // it as the same link click; middle-clicks off links are ignored.
    document.addEventListener('auxclick', function (ev) {
      if (ev.button === 1 && ev.target && ev.target.closest && ev.target.closest('a[href]')) onClick(ev);
    }, true);
    // Right-click on a link: no page can see which menu item gets picked, so
    // log that the menu opened on that link; kyc-stats pairs it with the visit
    // that follows (opened in a new tab) or finds none (copied, dismissed...).
    document.addEventListener('contextmenu', function (ev) {
      var a = ev.target && ev.target.closest && ev.target.closest('a[href]');
      if (!a) return;
      var label = (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60);
      logEvent('link_menu', (a.getAttribute('href') || '') + (label ? ' | ' + label : ''));
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      logPageview();
      wireClicks();
    });
  } else {
    logPageview();
    wireClicks();
  }
})();
