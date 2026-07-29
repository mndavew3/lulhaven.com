/* Haven launch countdowns. Self-contained — drop a target element with
   data-countdown="YYYY-MM-DDTHH:MM:SS-05:00" and data-countdown-label="text"
   anywhere on any page; this script fills in the ticking numbers.
   Central launch dates live here so every page agrees. */
(function () {
  var LAUNCH_DATES = {
    founders: "2026-11-01T00:00:00-05:00",
    challenge: "2026-10-01T00:00:00-05:00"
  };

  function render(el) {
    var key = el.getAttribute("data-countdown");
    var target = LAUNCH_DATES[key] || key;
    var targetMs = new Date(target).getTime();
    var diff = targetMs - Date.now();
    if (isNaN(targetMs)) return;
    if (diff <= 0) {
      el.textContent = el.getAttribute("data-countdown-live") || "It's here";
      return;
    }
    var s = Math.floor(diff / 1000);
    var d = Math.floor(s / 86400); s -= d * 86400;
    var h = Math.floor(s / 3600); s -= h * 3600;
    var m = Math.floor(s / 60); s -= m * 60;
    el.innerHTML =
      '<span class="cd-num">' + d + '</span><span class="cd-unit">d</span> ' +
      '<span class="cd-num">' + h + '</span><span class="cd-unit">h</span> ' +
      '<span class="cd-num">' + m + '</span><span class="cd-unit">m</span> ' +
      '<span class="cd-num">' + s + '</span><span class="cd-unit">s</span>';
  }

  function tick() {
    var els = document.querySelectorAll('[data-countdown]');
    for (var i = 0; i < els.length; i++) render(els[i]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
  function start() {
    tick();
    setInterval(tick, 1000);
  }
})();
