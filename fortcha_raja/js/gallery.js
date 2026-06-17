/* =========================================================================
   gallery.js — Photo gallery year filter + accessible lightbox.
   ========================================================================= */

(function () {
  function initFilter() {
    var bar = document.querySelector(".filter-bar");
    var grid = document.querySelector(".gallery-grid");
    if (!bar || !grid) return;
    bar.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      bar.querySelectorAll("button").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var year = btn.dataset.year;
      grid.querySelectorAll("figure").forEach(function (fig) {
        var show = year === "all" || fig.dataset.year === year;
        fig.style.display = show ? "" : "none";
      });
    });
  }

  function initLightbox() {
    var grid = document.querySelector(".gallery-grid");
    if (!grid) return;
    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.innerHTML = '<button class="close" aria-label="Close">×</button><div class="frame"></div>';
    document.body.appendChild(box);
    var frame = box.querySelector(".frame");
    var last = null;

    function open(fig) {
      last = fig;
      var cap = fig.querySelector("figcaption");
      var img = fig.querySelector("img");
      var icon = fig.querySelector(".ph");
      var capText = cap ? cap.textContent : "Photo";
      if (img) {
        // Real photo — show it full-size in the lightbox.
        var full = document.createElement("img");
        full.src = img.currentSrc || img.getAttribute("src");
        full.alt = img.getAttribute("alt") || capText;
        full.style.cssText = "max-width:100%;max-height:78vh;border-radius:10px;display:block;margin:0 auto";
        frame.innerHTML = "";
        frame.appendChild(full);
        var h = document.createElement("h3");
        h.style.marginTop = ".7rem";
        h.textContent = capText;
        frame.appendChild(h);
      } else {
        // Placeholder tile (no image yet).
        frame.innerHTML =
          '<div style="font-size:4rem">' + (icon ? icon.textContent : "🖼️") + "</div>" +
          '<h3 style="margin-top:.6rem">' + capText + "</h3>" +
          '<p class="text-muted" style="margin-top:.3rem">Year ' + (fig.dataset.year || "") + "</p>";
      }
      box.classList.add("open");
      box.querySelector(".close").focus();
    }
    function close() { box.classList.remove("open"); if (last) last.focus(); }

    grid.querySelectorAll("figure").forEach(function (fig) {
      fig.setAttribute("tabindex", "0");
      fig.setAttribute("role", "button");
      fig.addEventListener("click", function () { open(fig); });
      fig.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(fig); }
      });
    });
    box.querySelector(".close").addEventListener("click", close);
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && box.classList.contains("open")) close();
    });
  }

  function start() { initFilter(); initLightbox(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
