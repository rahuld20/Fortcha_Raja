/* =========================================================================
   lang.js — Language dictionary + toggle (EN / Marathi / Hindi)
   Default language: English.

   Two translation mechanisms (both handled by apply() below):
   1. data-i18n="key"  → text is looked up in the I18N dictionary here.
                         Used for shared chrome (nav, footer, buttons) so a
                         single edit translates every page at once.
   2. data-mr / data-hi → inline per-element translations for page body copy.
                         The original English is auto-captured into data-en.
                         Example:
                           <h1 data-mr="..." data-hi="...">English heading</h1>

   GLOSSARY (keep these consistent across all pages):
     Darshan दर्शन/दर्शन · Seva सेवा/सेवा · Aarti आरती/आरती
     Visarjan विसर्जन/विसर्जन · Navas नवस/नवस · Sankalp संकल्प/संकल्प
     Mandal मंडळ/मंडल · Prasad प्रसाद/प्रसाद · Donate देणगी/दान
   ========================================================================= */

window.I18N = {
  en: {
    /* nav */
    "nav.home": "Home", "nav.about": "About", "nav.darshan": "Darshan",
    "nav.seva": "Seva", "nav.media": "Media", "nav.connect": "Connect",
    "nav.members": "Mandal Team", "nav.more": "More",
    /* dropdown menu items */
    "menu.livedarshan": "Live Darshan", "menu.timings": "Aarti & Timings",
    "menu.events": "Events Calendar", "menu.pass": "Darshan / VIP Pass",
    "menu.visarjan": "Visarjan Route", "menu.plan": "Plan Your Visit",
    "menu.seva": "Seva, Pooja & Prasad", "menu.navas": "Online Navas / Sankalp",
    "menu.donate": "Donate (80G)", "menu.volunteer": "Volunteer & Membership",
    "menu.sponsors": "Sponsors & Advertise", "menu.gallery": "Photo Gallery",
    "menu.news": "News & Updates", "menu.press": "Press / Media",
    "menu.blog": "Blog & Devotional", "menu.downloads": "Downloads",
    /* call to action / banners */
    "cta.donate": "Donate", "cta.donatenow": "Donate Now", "cta.live": "Live Darshan",
    "cta.book": "Book Pass",
    "banner.live": "LIVE darshan now —", "banner.watch": "watch the stream",
    /* footer headings */
    "footer.quick": "Quick Links", "footer.darshan": "Darshan & Seva",
    "footer.connect": "Connect",
    "footer.tagline": "The beloved Ganpati of Fort · Est. 1962",
    "footer.rights": "All rights reserved.",
    "footer.address": "59 Bazargate Street, Near GPO, Fort, Mumbai 400001",
    "footer.trust": "A registered public charitable trust",
    "footer.terms": "Terms", "footer.privacy": "Privacy", "footer.sitemap": "Sitemap",
    /* footer link labels */
    "f.about": "About", "f.history": "History", "f.members": "Mandal Members",
    "f.events": "Events", "f.gallery": "Gallery", "f.news": "News",
    "f.livedarshan": "Live Darshan", "f.timings": "Timings", "f.vippass": "VIP Pass",
    "f.sevaprasad": "Seva & Prasad", "f.navas": "Navas / Sankalp", "f.donate": "Donate (80G)",
    "f.contact": "Contact", "f.faq": "FAQ", "f.terms": "Terms & Conditions",
    "f.privacy": "Privacy Policy", "f.volunteer": "Volunteer", "f.sponsors": "Sponsors",
    "lang.label": "Language"
  },
  mr: {
    "nav.home": "मुख्यपृष्ठ", "nav.about": "आमच्याबद्दल", "nav.darshan": "दर्शन",
    "nav.seva": "सेवा", "nav.media": "मीडिया", "nav.connect": "संपर्क",
    "nav.members": "मंडळ सदस्य", "nav.more": "अधिक",
    "menu.livedarshan": "थेट दर्शन", "menu.timings": "आरती व वेळा",
    "menu.events": "कार्यक्रम दिनदर्शिका", "menu.pass": "दर्शन / व्हीआयपी पास",
    "menu.visarjan": "विसर्जन मार्ग", "menu.plan": "भेटीचे नियोजन",
    "menu.seva": "सेवा, पूजा व प्रसाद", "menu.navas": "ऑनलाइन नवस / संकल्प",
    "menu.donate": "देणगी (८०G)", "menu.volunteer": "स्वयंसेवक व सदस्यत्व",
    "menu.sponsors": "प्रायोजक व जाहिरात", "menu.gallery": "फोटो गॅलरी",
    "menu.news": "बातम्या व अद्यतने", "menu.press": "प्रेस / मीडिया",
    "menu.blog": "ब्लॉग व भक्तिरचना", "menu.downloads": "डाउनलोड",
    "cta.donate": "देणगी", "cta.donatenow": "आता देणगी द्या", "cta.live": "थेट दर्शन",
    "cta.book": "पास बुक करा",
    "banner.live": "आता थेट दर्शन सुरू —", "banner.watch": "प्रवाह पाहा",
    "footer.quick": "द्रुत दुवे", "footer.darshan": "दर्शन व सेवा",
    "footer.connect": "संपर्क",
    "footer.tagline": "फोर्टचा राजा गणपती मंडळ · स्थापना १९६२",
    "footer.rights": "सर्व हक्क राखीव.",
    "footer.address": "५९ बाजारगेट स्ट्रीट, GPO जवळ, फोर्ट, मुंबई ४०० ००१",
    "footer.trust": "नोंदणीकृत सार्वजनिक धर्मादाय न्यास",
    "footer.terms": "अटी", "footer.privacy": "गोपनीयता", "footer.sitemap": "साइटमॅप",
    "f.about": "आमच्याबद्दल", "f.history": "इतिहास", "f.members": "मंडळ सदस्य",
    "f.events": "कार्यक्रम", "f.gallery": "गॅलरी", "f.news": "बातम्या",
    "f.livedarshan": "थेट दर्शन", "f.timings": "वेळा", "f.vippass": "व्हीआयपी पास",
    "f.sevaprasad": "सेवा व प्रसाद", "f.navas": "नवस / संकल्प", "f.donate": "देणगी (८०G)",
    "f.contact": "संपर्क", "f.faq": "नेहमीचे प्रश्न", "f.terms": "अटी व शर्ती",
    "f.privacy": "गोपनीयता धोरण", "f.volunteer": "स्वयंसेवक", "f.sponsors": "प्रायोजक",
    "lang.label": "भाषा"
  },
  hi: {
    "nav.home": "मुखपृष्ठ", "nav.about": "हमारे बारे में", "nav.darshan": "दर्शन",
    "nav.seva": "सेवा", "nav.media": "मीडिया", "nav.connect": "संपर्क",
    "nav.members": "मंडल सदस्य", "nav.more": "और",
    "menu.livedarshan": "लाइव दर्शन", "menu.timings": "आरती व समय",
    "menu.events": "कार्यक्रम कैलेंडर", "menu.pass": "दर्शन / वीआईपी पास",
    "menu.visarjan": "विसर्जन मार्ग", "menu.plan": "अपनी यात्रा की योजना",
    "menu.seva": "सेवा, पूजा व प्रसाद", "menu.navas": "ऑनलाइन नवस / संकल्प",
    "menu.donate": "दान करें (80G)", "menu.volunteer": "स्वयंसेवक व सदस्यता",
    "menu.sponsors": "प्रायोजक व विज्ञापन", "menu.gallery": "फोटो गैलरी",
    "menu.news": "समाचार व अपडेट", "menu.press": "प्रेस / मीडिया",
    "menu.blog": "ब्लॉग व भक्ति", "menu.downloads": "डाउनलोड",
    "cta.donate": "दान करें", "cta.donatenow": "अभी दान करें", "cta.live": "लाइव दर्शन",
    "cta.book": "पास बुक करें",
    "banner.live": "अभी लाइव दर्शन —", "banner.watch": "स्ट्रीम देखें",
    "footer.quick": "त्वरित लिंक", "footer.darshan": "दर्शन व सेवा",
    "footer.connect": "संपर्क",
    "footer.tagline": "फोर्टचा राजा गणपती मंडल · स्थापना 1962",
    "footer.rights": "सर्वाधिकार सुरक्षित.",
    "footer.address": "59 बाज़ारगेट स्ट्रीट, GPO के पास, फोर्ट, मुंबई 400001",
    "footer.trust": "पंजीकृत सार्वजनिक धर्मार्थ ट्रस्ट",
    "footer.terms": "नियम", "footer.privacy": "गोपनीयता", "footer.sitemap": "साइटमैप",
    "f.about": "हमारे बारे में", "f.history": "इतिहास", "f.members": "मंडल सदस्य",
    "f.events": "कार्यक्रम", "f.gallery": "गैलरी", "f.news": "समाचार",
    "f.livedarshan": "लाइव दर्शन", "f.timings": "समय", "f.vippass": "वीआईपी पास",
    "f.sevaprasad": "सेवा व प्रसाद", "f.navas": "नवस / संकल्प", "f.donate": "दान करें (80G)",
    "f.contact": "संपर्क", "f.faq": "अक्सर पूछे जाने वाले प्रश्न", "f.terms": "नियम व शर्तें",
    "f.privacy": "गोपनीयता नीति", "f.volunteer": "स्वयंसेवक", "f.sponsors": "प्रायोजक",
    "lang.label": "भाषा"
  }
};

window.Lang = (function () {
  var KEY = "fortcha-lang";
  var SUPPORTED = { en: 1, mr: 1, hi: 1 };
  var saved = localStorage.getItem(KEY);
  var current = SUPPORTED[saved] ? saved : "en";

  function t(key) {
    var dict = window.I18N[current] || window.I18N.en;
    return dict[key] || (window.I18N.en[key] || key);
  }

  function apply() {
    document.documentElement.lang = current;
    // 1. data-i18n keys → dictionary lookup
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    // 2. inline data-mr / data-hi content swap (original English kept in data-en)
    document.querySelectorAll("[data-mr],[data-hi]").forEach(function (el) {
      if (!el.hasAttribute("data-en")) el.setAttribute("data-en", el.textContent.trim());
      var val = el.getAttribute("data-" + current);
      el.textContent = (current === "en" || !val) ? el.getAttribute("data-en") : val;
    });
    // 3. translatable attributes: data-mr-ph / data-hi-ph swap a placeholder, etc.
    swapAttr("placeholder", "ph");
    swapAttr("aria-label", "al");
    swapAttr("content", "ct"); // meta description, when marked
    // 4. toggle buttons reflect current language
    document.querySelectorAll(".lang-toggle button").forEach(function (b) {
      b.classList.toggle("active", b.dataset.lang === current);
      b.setAttribute("aria-pressed", b.dataset.lang === current);
    });
  }

  // Swap a DOM attribute using data-en-<suffix>/data-mr-<suffix>/data-hi-<suffix>.
  function swapAttr(attr, suffix) {
    document.querySelectorAll("[data-mr-" + suffix + "],[data-hi-" + suffix + "]").forEach(function (el) {
      var enKey = "data-en-" + suffix;
      if (!el.hasAttribute(enKey)) el.setAttribute(enKey, el.getAttribute(attr) || "");
      var val = el.getAttribute("data-" + current + "-" + suffix);
      el.setAttribute(attr, (current === "en" || !val) ? el.getAttribute(enKey) : val);
    });
  }

  function set(lang) {
    if (!SUPPORTED[lang]) lang = "en";
    current = lang;
    localStorage.setItem(KEY, lang);
    apply();
  }

  return { t: t, set: set, apply: apply, get current() { return current; } };
})();
