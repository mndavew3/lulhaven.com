/* Haven Halloween Challenge — the Frau Blucher gag.
   The word "Halloween" scrolling into view triggers a lightning flash and a
   thunderclap, once per browser session.

   Safety: two flashes maximum. WCAG 2.3.1 sets the photosensitive-seizure
   threshold at three flashes in one second, and the flash is skipped entirely
   when the visitor's system asks for reduced motion.

   Browsers refuse to play audio before the visitor has clicked, tapped, or
   typed on the page. Scrolling does not count. So on a first visit with no
   interaction the flash fires silently — that is expected, not a bug, and the
   flash is what carries the joke on its own. */
(function () {
  var KEY = "hvn-halloween-fired";
  var triggers = document.querySelectorAll(".hw-trigger");
  if (!triggers.length || !window.IntersectionObserver) return;
  try { if (sessionStorage.getItem(KEY)) return; } catch (e) {}

  var reduced = window.matchMedia &&
                window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var style = document.createElement("style");
  style.textContent =
    "#hw-flash{position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999;" +
    "pointer-events:none;opacity:0;background:#fff;transition:opacity 90ms linear;}" +
    /* Lifted above the overlay on purpose: the word is the cause, so it has to
       stay lit while everything around it goes dark. Gold reads against both the
       white flash and the dark beat. */
    ".hw-trigger.hw-lit{position:relative;z-index:10000;color:#c8a24b;font-weight:700;" +
    "text-shadow:0 0 10px rgba(255,255,255,.95),0 0 26px rgba(200,162,75,.95)," +
    "0 0 44px rgba(200,162,75,.7);}";
  document.head.appendChild(style);

  var flash = document.createElement("div");
  flash.id = "hw-flash";
  document.body.appendChild(flash);

  /* ?v= rotates the edge cache key. The bare URL got poisoned with a 404-HTML
     response on 2026-07-29 by a verification fetch during the post-deploy
     propagation window; bump this if it ever happens again. */
  var audio = new Audio("assets/audio/thunder.mp3?v=2");
  audio.preload = "auto";
  audio.volume = 0.55;

  function at(ms, fn) { setTimeout(fn, ms); }

  function fire(el) {
    try { sessionStorage.setItem(KEY, "1"); } catch (e) {}
    audio.play().catch(function () {});

    if (reduced) return;
    el.classList.add("hw-lit");
    flash.style.opacity = "0.88";                                        // flicker
    at(90,  function () { flash.style.opacity = "0"; });
    at(170, function () { flash.style.opacity = "0.7"; });               // flicker
    at(250, function () { flash.style.background = "#0a0d14";
                          flash.style.opacity = "0.8"; });               // the dark beat
    at(780, function () { flash.style.transition = "opacity 620ms ease-out";
                          flash.style.opacity = "0"; });
    at(1000, function () { el.classList.remove("hw-lit"); });
  }

  var io = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) { io.disconnect(); fire(entries[i].target); return; }
    }
  }, { threshold: 1.0 });

  /* Hold off five seconds before watching. On a tall screen the date can already
     be on screen at load, and a flash during page render reads as a rendering
     glitch rather than as lightning. After five seconds the page has settled, so
     the flash is unmistakably an event. */
  at(5000, function () {
    for (var i = 0; i < triggers.length; i++) io.observe(triggers[i]);
  });
})();
