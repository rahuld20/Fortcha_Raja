/* =========================================================================
   main.js — Countdown, reveal animations, FAQ accordion, form validation,
   live-queue meters, live banner.
   ========================================================================= */

(function () {
  "use strict";

  /* ---- Countdown to Ganesh Chaturthi -----------------------------------
     [confirm] the festival start date. Defaulting to 2026 estimate. */
  function initCountdown() {
    var el = document.getElementById("countdown");
    if (!el) return;
    var target = new Date(el.dataset.date || "2026-09-14T06:00:00+05:30").getTime();
    var boxes = {
      d: el.querySelector('[data-unit="d"] b'),
      h: el.querySelector('[data-unit="h"] b'),
      m: el.querySelector('[data-unit="m"] b'),
      s: el.querySelector('[data-unit="s"] b')
    };
    function tick() {
      var diff = target - Date.now();
      if (diff < 0) { el.innerHTML = '<p style="font-size:1.3rem">🎉 गणेशोत्सव सुरू! Ganpati Bappa Morya 🎉</p>'; return; }
      var d = Math.floor(diff / 864e5),
          h = Math.floor(diff % 864e5 / 36e5),
          m = Math.floor(diff % 36e5 / 6e4),
          s = Math.floor(diff % 6e4 / 1e3);
      if (boxes.d) boxes.d.textContent = d;
      if (boxes.h) boxes.h.textContent = String(h).padStart(2, "0");
      if (boxes.m) boxes.m.textContent = String(m).padStart(2, "0");
      if (boxes.s) boxes.s.textContent = String(s).padStart(2, "0");
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---- Reveal on scroll ------------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length || !("IntersectionObserver" in window)) {
      items.forEach(function (i) { i.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (i) { io.observe(i); });
  }

  /* ---- FAQ / accordion -------------------------------------------------- */
  function initAccordion() {
    document.querySelectorAll(".accordion button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var acc = btn.closest(".accordion");
        var open = acc.classList.toggle("open");
        btn.setAttribute("aria-expanded", open);
      });
    });
  }

  /* ---- Form validation + submission (progressive enhancement) -----------
     Validates required fields, then submits via fetch to the form's `action`
     when it points at a real endpoint with a configured key (e.g. Web3Forms /
     Formspree → email delivery). Forms without a real endpoint fall back to a
     local "thank you" demo so nothing feels broken before a backend is wired. */
  /* ---- Field-level rules ------------------------------------------------ */
  // Robust email: local@domain.tld, real TLD (2+ letters), no consecutive dots.
  var EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;
  function isEmail(v) {
    v = v.trim();
    return v.length <= 254 && !/\.\./.test(v) && !/^\.|\.$/.test(v) && EMAIL_RE.test(v);
  }
  // Indian mobile: 10 digits starting 6–9, with optional +91 / 0 prefix and
  // spaces/dashes that we strip before checking. Rejects 7-digit/landline junk.
  function isMobile(v) {
    var d = (v || "").replace(/\D/g, "");
    if (d.length === 12 && d.indexOf("91") === 0) d = d.slice(2);
    else if (d.length === 11 && d.charAt(0) === "0") d = d.slice(1);
    return /^[6-9]\d{9}$/.test(d);
  }
  // Name: ≥2 chars, at least one letter (Latin or Devanagari), no digits, and
  // only letters/spaces/. ' - allowed. Rejects "123", "!!!", "a", "   ".
  function isName(v) {
    v = (v || "").trim();
    return v.length >= 2 && !/\d/.test(v) &&
      /[A-Za-zऀ-ॿ]/.test(v) && /^[A-Za-zऀ-ॿ\s.'’-]+$/.test(v);
  }

  // Validate a single field. Returns true/false; empty optional fields pass.
  function fieldValid(input) {
    var v = input.value;
    var required = input.hasAttribute("required");
    if (v.trim() === "") return !required;            // empty: ok unless required
    var rule = input.getAttribute("data-rule") || input.type;
    if (rule === "email") return isEmail(v);
    if (rule === "mobile" || rule === "tel") return isMobile(v);
    if (rule === "name") return isName(v);
    return input.checkValidity();
  }

  function validateForm(form) {
    var ok = true, firstBad = null;
    // Check every field that is required OR carries a validation rule.
    form.querySelectorAll("[required],[data-rule]").forEach(function (input) {
      var field = input.closest(".field");
      var valid = fieldValid(input);
      if (field) field.classList.toggle("invalid", !valid);
      if (!valid && !firstBad) firstBad = input;
      if (!valid) ok = false;
    });
    if (firstBad) firstBad.focus();
    return ok;
  }

  function isLiveEndpoint(form) {
    var action = form.getAttribute("action") || "";
    if (!/^https?:\/\//i.test(action)) return false;
    // If an access_key field still holds the placeholder, treat as not-yet-configured.
    var key = form.querySelector('input[name="access_key"]');
    if (key && /paste-your|replace|access-key-here|your-web3forms/i.test(key.value)) return false;
    return true;
  }

  function initForms() {
    document.querySelectorAll("form[data-validate]").forEach(function (form) {
      form.setAttribute("novalidate", "");
      var success = form.querySelector(".form-success");
      var errorBox = form.querySelector(".form-error");

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (success) success.classList.remove("show");
        if (errorBox) errorBox.classList.remove("show");
        if (!validateForm(form)) return;

        // No real backend yet → friendly local confirmation (demo).
        if (!isLiveEndpoint(form)) {
          if (success) success.classList.add("show");
          form.reset();
          return;
        }

        // Real submission → deliver to the mandal's inbox.
        var btn = form.querySelector("[type=submit]");
        var label = btn ? btn.textContent : "";
        if (btn) { btn.disabled = true; btn.dataset.label = label; btn.textContent = "Sending…"; }

        fetch(form.getAttribute("action"), {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: new FormData(form)
        }).then(function (res) {
          return res.json().then(function (d) { return { ok: res.ok, data: d }; },
                                 function () { return { ok: res.ok, data: {} }; });
        }).then(function (r) {
          var good = r.ok && (r.data.success === undefined || r.data.success === true);
          if (good) { if (success) success.classList.add("show"); form.reset(); }
          else if (errorBox) errorBox.classList.add("show");
        }).catch(function () {
          if (errorBox) errorBox.classList.add("show");
        }).then(function () {
          if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || label; }
        });
      });

      form.querySelectorAll("input,select,textarea").forEach(function (i) {
        var rule = i.getAttribute("data-rule");
        i.addEventListener("input", function () {
          // REAL-TIME character filtering so invalid input can't even be typed:
          if (rule === "name") {
            // letters (Latin + Devanagari), spaces, . ' - only — no digits/symbols
            var cleanName = i.value.replace(/[^A-Za-zऀ-ॿ\s.'’-]/g, "");
            if (cleanName !== i.value) i.value = cleanName;
          } else if (rule === "mobile") {
            // digits only; strip a pasted +91 / 0 prefix, then cap at 10
            var nums = i.value.replace(/\D/g, "");
            if (nums.length === 12 && nums.indexOf("91") === 0) nums = nums.slice(2);
            else if (nums.length === 11 && nums.charAt(0) === "0") nums = nums.slice(1);
            nums = nums.slice(0, 10);
            if (nums !== i.value) i.value = nums;
          }
          // typing clears the error so it doesn't nag mid-edit
          var f = i.closest(".field"); if (f) f.classList.remove("invalid");
        });
        // block non-numeric keystrokes on the mobile field (keypad/desktop)
        if (rule === "mobile") {
          i.addEventListener("keypress", function (e) {
            if (e.key.length === 1 && /\D/.test(e.key)) e.preventDefault();
          });
        }
        // leaving a *filled* field re-checks its format (empty fields wait for submit)
        i.addEventListener("blur", function () {
          var f = i.closest(".field");
          if (f && i.value.trim() !== "") f.classList.toggle("invalid", !fieldValid(i));
        });
      });
    });
  }

  /* ---- Live queue meters -----------------------------------------------
     In production a small API updates data-queue (0-100) per gate.
     See README step 6. */
  function initQueue() {
    document.querySelectorAll("[data-queue]").forEach(function (m) {
      var pct = Math.max(0, Math.min(100, parseInt(m.dataset.queue, 10) || 0));
      var bar = m.querySelector("i");
      if (bar) bar.style.width = pct + "%";
      m.classList.toggle("high", pct > 70);
      var label = m.parentElement.querySelector("[data-queue-label]");
      if (label) {
        var wait = Math.round(pct * 0.9); // rough minutes
        label.textContent = pct > 70 ? ("Heavy · ~" + wait + " min wait")
          : pct > 40 ? ("Moderate · ~" + wait + " min wait")
          : ("Light · ~" + wait + " min wait");
      }
    });
  }

  /* ---- Live banner toggle ----------------------------------------------
     Show the top "LIVE now" banner during darshan hours. */
  function initLiveBanner() {
    var banner = document.getElementById("liveBanner");
    if (!banner) return;
    var h = new Date().getHours();
    // [confirm] live darshan window; default 6:00–22:00
    if (h >= 6 && h < 22 && document.body.dataset.festival === "on") {
      banner.hidden = false;
    }
  }

  /* ---- Footer year ------------------------------------------------------ */
  function initYear() {
    // Use a dedicated attribute. (Previously this matched [data-year], which the
    // gallery uses as its filter key — so it wiped every gallery tile's image and
    // caption, replacing them with the current year. Don't reintroduce that.)
    document.querySelectorAll("[data-current-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  function start() {
    initCountdown(); initReveal(); initAccordion();
    initForms(); initQueue(); initLiveBanner(); initYear();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
