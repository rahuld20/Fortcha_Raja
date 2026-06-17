/* =========================================================================
   components.js — Shared header, nav, footer, language toggle.
   Injected on every page. Keep nav structure here in one place.
   ========================================================================= */

(function () {
  var FAVICON = "assets/icons/favicon.svg";
  var BRAND   = "assets/img/logo1.png"; // Fortcha Raja lotus emblem — brand mark

  // ---- Navigation model ----------------------------------------------------
  // children: [i18nKey, href, englishLabel]
  var NAV = [
    { label: "nav.home", href: "index.html" },
    { label: "nav.about", href: "about.html" },
    { label: "nav.members", href: "mandal-members.html" },
    {
      label: "nav.darshan", href: "live-darshan.html", children: [
        ["menu.livedarshan", "live-darshan.html", "Live Darshan"],
        ["menu.timings", "timings.html", "Aarti & Timings"],
        ["menu.events", "events.html", "Events Calendar"],
        ["menu.visarjan", "visarjan.html", "Visarjan Route"],
        ["menu.plan", "plan-visit.html", "Plan Your Visit"]
      ]
    },
    {
      label: "nav.media", href: "gallery.html", children: [
        ["menu.gallery", "gallery.html", "Photo Gallery"],
        ["menu.news", "news.html", "News & Updates"],
        ["menu.press", "press.html", "Press / Media"],
        ["menu.blog", "blog.html", "Blog & Devotional"],
        ["menu.downloads", "downloads.html", "Downloads"],
        ["menu.sponsors", "sponsors.html", "Sponsors & Advertise"]
      ]
    },
    { label: "nav.connect", href: "contact.html" }
  ];

  var SOCIAL = {
    instagram: "#", facebook: "https://www.facebook.com/fortcharajaofficial/", youtube: "#", whatsapp: "https://wa.me/917738540020"
  };

  var current = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  // ---- Header --------------------------------------------------------------
  function buildHeader() {
    var links = NAV.map(function (item) {
      if (item.children) {
        var subs = item.children.map(function (c) {
          return '<a href="' + c[1] + '" data-i18n="' + c[0] + '">' + c[2] + "</a>";
        }).join("");
        var active = item.children.some(function (c) { return c[1] === current; }) ? " active" : "";
        return '<div class="has-drop">' +
          '<a href="' + item.href + '" class="droptrigger' + active + '" data-i18n="' + item.label + '">' + item.label + "</a>" +
          '<div class="drop-menu">' + subs + "</div></div>";
      }
      var act = item.href === current ? " active" : "";
      return '<a href="' + item.href + '" class="' + act.trim() + '" data-i18n="' + item.label + '">' + item.label + "</a>";
    }).join("");

    return '' +
      '<div class="live-banner" id="liveBanner" hidden>' +
        '<span class="dot"></span> <span data-i18n="banner.live">LIVE darshan now —</span> ' +
        '<a href="live-darshan.html" style="color:#fff;text-decoration:underline" data-i18n="banner.watch">watch the stream</a>' +
      '</div>' +
      '<div class="ribbon"></div>' +
      '<div class="container nav">' +
        '<a class="brand brand--logo" href="index.html" aria-label="Fortcha Raja — home">' +
          '<img class="brand-emblem" src="' + BRAND + '" alt="" width="40" height="40">' +
          '<span class="brand-word"><b data-mr="फोर्टचा राजा" data-hi="फोर्टचा राजा">Fortcha Raja</b><span data-mr="गणपती मंडळ" data-hi="गणपती मंडल">Ganpati Mandal</span></span>' +
        '</a>' +
        '<nav class="nav-links" aria-label="Primary">' + links + '</nav>' +
        '<div class="nav-actions">' +
          '<div class="action-stack">' +
            '<div class="lang-toggle" role="group" aria-label="' + Lang.t("lang.label") + '">' +
              '<button type="button" data-lang="en" aria-pressed="false">EN</button>' +
              '<button type="button" data-lang="mr" aria-pressed="false">मराठी</button>' +
              '<button type="button" data-lang="hi" aria-pressed="false">हिंदी</button>' +
            '</div>' +
            '<a href="donations.html" class="btn btn-donate btn-sm" data-i18n="cta.donatenow">Donate Now</a>' +
          '</div>' +
          '<button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false"><span></span></button>' +
        '</div>' +
      '</div>';
  }

  function buildMobileNav() {
    var html = "";
    NAV.forEach(function (item) {
      if (item.children) {
        // collapsible accordion: tap the label to open/close its submenu
        var isOpen = item.children.some(function (c) { return c[1] === current; });
        var subs = item.children.map(function (c) {
          return '<a href="' + c[1] + '"' + (c[1] === current ? ' aria-current="page"' : "") +
            ' data-i18n="' + c[0] + '">' + Lang.t(c[0]) + "</a>";
        }).join("");
        html += '<div class="m-group' + (isOpen ? " open" : "") + '">' +
          '<button type="button" class="m-drop" aria-expanded="' + (isOpen ? "true" : "false") + '">' +
            '<span data-i18n="' + item.label + '">' + Lang.t(item.label) + '</span><span class="chev" aria-hidden="true">▾</span></button>' +
          '<div class="m-sub">' + subs + '</div>' +
        '</div>';
      } else {
        html += '<a href="' + item.href + '"' + (item.href === current ? ' aria-current="page"' : "") +
          ' data-i18n="' + item.label + '">' + Lang.t(item.label) + "</a>";
      }
    });
    return html;
  }

  // ---- Footer --------------------------------------------------------------
  // links: [i18nKey, href, englishLabel]
  function col(titleKey, links) {
    return '<div><h4 data-i18n="' + titleKey + '">' + Lang.t(titleKey) + "</h4><ul>" +
      links.map(function (l) {
        return '<li><a href="' + l[1] + '" data-i18n="' + l[0] + '">' + l[2] + "</a></li>";
      }).join("") +
      "</ul></div>";
  }

  function buildFooter() {
    var year = "2026"; // updated on render below if needed
    return '' +
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div>' +
            '<a class="brand" href="index.html" style="margin-bottom:.6rem">' +
              '<img class="footer-emblem" src="' + BRAND + '" alt="" width="44" height="44">' +
              '<span class="brand-word"><b class="goldtext" style="font-size:1.25rem" data-mr="फोर्टचा राजा" data-hi="फोर्टचा राजा">Fortcha Raja</b><span style="color:#e9c45e" data-mr="गणपती मंडळ" data-hi="गणपती मंडल">Ganpati Mandal</span></span>' +
            '</a>' +
            '<p style="color:#e9d3b6;font-size:.9rem;max-width:34ch" data-i18n="footer.tagline">The beloved Ganpati of Fort · Est. 1962</p>' +
            '<p style="color:#d9c2a6;font-size:.85rem;margin-top:.5rem" data-i18n="footer.address">59 Bazargate Street, Near GPO, Fort, Mumbai 400001</p>' +
            '<div class="social">' +
              '<a href="' + SOCIAL.instagram + '" aria-label="Instagram">◎</a>' +
              '<a href="' + SOCIAL.facebook + '" aria-label="Facebook">f</a>' +
              '<a href="' + SOCIAL.youtube + '" aria-label="YouTube">▶</a>' +
              '<a href="' + SOCIAL.whatsapp + '" aria-label="WhatsApp">✆</a>' +
            '</div>' +
          '</div>' +
          col("footer.quick", [
            ["f.about", "about.html", "About"], ["f.history", "about.html#history", "History"],
            ["f.members", "mandal-members.html", "Mandal Members"], ["f.events", "events.html", "Events"],
            ["f.gallery", "gallery.html", "Gallery"], ["f.news", "news.html", "News"]
          ]) +
          col("footer.darshan", [
            ["f.livedarshan", "live-darshan.html", "Live Darshan"], ["f.timings", "timings.html", "Timings"],
            ["f.donate", "donations.html", "Donate (80G)"]
          ]) +
          col("footer.connect", [
            ["f.contact", "contact.html", "Contact"], ["f.faq", "faq.html", "FAQ"],
            ["f.terms", "legal.html", "Terms & Conditions"], ["f.privacy", "privacy.html", "Privacy Policy"],
            ["f.sponsors", "sponsors.html", "Sponsors"]
          ]) +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span>© ' + year + ' <span data-mr="फोर्टचा राजा गणपती मंडळ" data-hi="फोर्टचा राजा गणपती मंडल">Fortcha Raja Ganpati Mandal</span>. <span data-i18n="footer.rights">All rights reserved.</span></span>' +
          '<span><span data-i18n="footer.trust">A registered public charitable trust</span> &nbsp;·&nbsp; ' +
            '<a href="legal.html" data-i18n="footer.terms">Terms</a> · ' +
            '<a href="privacy.html" data-i18n="footer.privacy">Privacy</a> · ' +
            '<a href="sitemap.xml" data-i18n="footer.sitemap">Sitemap</a></span>' +
        '</div>' +
        '<p style="text-align:center;color:var(--gold-light);font-family:var(--font-head);margin-top:1rem">🙏 गणपती बाप्पा मोरया 🙏</p>' +
      '</div>';
  }

  // ---- Mount ---------------------------------------------------------------
  function mount() {
    var header = document.getElementById("site-header");
    var footer = document.getElementById("site-footer");
    if (header) { header.className = "site-header"; header.innerHTML = buildHeader(); }
    if (footer) { footer.className = "site-footer"; footer.innerHTML = buildFooter(); }

    // mobile nav element
    var mob = document.createElement("nav");
    mob.className = "mobile-nav";
    mob.id = "mobileNav";
    mob.setAttribute("aria-label", "Mobile");
    document.body.appendChild(mob);

    var toggle = document.getElementById("navToggle");

    function closeMobileNav() {
      mob.classList.remove("open");
      document.body.classList.remove("nav-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    }

    // (Re)build the mobile menu and (re)wire its handlers. Called on mount and
    // again on every language change — buildMobileNav() renders the labels in the
    // current language, so rebuilding keeps the mobile menu in sync with the
    // language toggle exactly like the desktop nav.
    function renderMobileNav() {
      mob.innerHTML = buildMobileNav();
      // close the menu after tapping any link
      mob.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", closeMobileNav);
      });
      // submenu accordions (Darshan / Media): tap the label to expand/collapse
      mob.querySelectorAll(".m-drop").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var grp = btn.parentNode;
          var open = grp.classList.toggle("open");
          btn.setAttribute("aria-expanded", open ? "true" : "false");
        });
      });
    }
    renderMobileNav();

    if (toggle) {
      toggle.addEventListener("click", function () {
        var open = mob.classList.toggle("open");
        document.body.classList.toggle("nav-open", open);
        toggle.setAttribute("aria-expanded", open);
      });
    }

    // Dropdown behaviour:
    //  - Hover-capable devices (desktop): menus open on hover/focus (CSS).
    //    A click on the parent tab navigates to its page, as expected.
    //  - Touch devices (no hover): first tap opens the menu so sub-items are
    //    reachable; tapping the open tab again follows its link.
    var drops = document.querySelectorAll(".has-drop");
    var canHover = window.matchMedia("(hover: hover)").matches;
    if (!canHover) {
      drops.forEach(function (drop) {
        var trigger = drop.querySelector(".droptrigger");
        if (!trigger) return;
        trigger.addEventListener("click", function (e) {
          if (!drop.classList.contains("open")) {
            e.preventDefault();
            drops.forEach(function (d) { if (d !== drop) d.classList.remove("open"); });
            drop.classList.add("open");
          }
        });
      });
      document.addEventListener("click", function (e) {
        if (!e.target.closest(".has-drop")) {
          drops.forEach(function (d) { d.classList.remove("open"); });
        }
      });
    }

    // Language switcher (EN / Marathi / Hindi) lives in the header bar and stays
    // visible on mobile too (see CSS), so the language is changed the same way as
    // on desktop — no separate in-menu copy needed.
    document.querySelectorAll(".lang-toggle button").forEach(function (b) {
      b.addEventListener("click", function () {
        Lang.set(b.dataset.lang);
        // Rebuild the mobile menu so its labels follow the new language too.
        // (Desktop nav is refreshed by Lang.apply(); the mobile menu is rebuilt
        // from buildMobileNav() in the current language to stay in sync.)
        renderMobileNav();
      });
    });

    // Apply the saved (or default English) language to the freshly built chrome.
    Lang.apply();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else { mount(); }
})();
