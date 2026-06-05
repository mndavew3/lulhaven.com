/* Haven shared top band (nav). Self-contained — works on any page (no theme CSS needed).
   EDIT THE NAV HERE → change once, applies to every page that includes this script. */
(function () {
  // ===================== EDIT NAV CONTENT HERE =====================
  var BRAND = "Haven";
  var LOGO  = "assets/images/lulhaven20dock20line20art202-64x42.png";
  var LINKS = [
    { label: "Home",     href: "index.html" },
    { label: "Benefits", href: "benefits.html" },
    { label: "Features", href: "features.html" },
    { label: "Demo",     href: "demo.html" },
    { label: "FAQ",      href: "faq.html" }
  ];
  var CTA = { label: "Start now", href: "index.html#notify" };
  // =================================================================

  var TEAL = "#2b7a69";
  var css =
    ".hvn-nav{position:sticky;top:0;z-index:1000;display:flex;align-items:center;gap:18px;flex-wrap:wrap;" +
      "padding:10px 24px;background:#fff;box-shadow:0 2px 12px rgba(0,0,0,.09);" +
      "font-family:'Inter Tight',system-ui,Arial,sans-serif;}" +
    ".hvn-nav .hvn-brand{display:flex;align-items:center;gap:8px;text-decoration:none;color:" + TEAL + ";" +
      "font-weight:800;font-size:1.3rem;}" +
    ".hvn-nav .hvn-brand img{height:34px;width:auto;}" +
    ".hvn-nav .hvn-links{display:flex;gap:20px;flex-wrap:wrap;align-items:center;margin-left:auto;}" +
    ".hvn-nav .hvn-links a{text-decoration:none;color:#222;font-weight:600;font-size:1rem;}" +
    ".hvn-nav .hvn-links a:hover{color:" + TEAL + ";}" +
    ".hvn-nav .hvn-cta{background:" + TEAL + ";color:#fff;padding:9px 22px;border-radius:30px;" +
      "text-decoration:none;font-weight:700;}" +
    ".hvn-nav .hvn-cta:hover{background:#23624f;}";

  function build() {
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    var nav = document.createElement("nav"); nav.className = "hvn-nav";
    var links = LINKS.map(function (l) { return '<a href="' + l.href + '">' + l.label + "</a>"; }).join("");
    nav.innerHTML =
      '<a class="hvn-brand" href="index.html">' + (LOGO ? '<img src="' + LOGO + '" alt="">' : "") +
        "<span>" + BRAND + "</span></a>" +
      '<span class="hvn-links">' + links +
        '<a class="hvn-cta" href="' + CTA.href + '">' + CTA.label + "</a></span>";
    document.body.insertBefore(nav, document.body.firstChild);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
