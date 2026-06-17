/* =========================================================================
   booking.js — Darshan time-slot picker + seva/prasad cart.
   FRONT-END DEMO ONLY. No payment is processed and no data is stored.
   Wire to a real payment gateway server-side before going live (README step 5).
   ========================================================================= */

(function () {
  var fmt = function (n) { return "₹" + Number(n).toLocaleString("en-IN"); };

  /* ---- Slot picker ------------------------------------------------------ */
  function initSlots() {
    var grid = document.querySelector(".slot-grid");
    if (!grid) return;
    var out = document.getElementById("selectedSlot");
    grid.addEventListener("click", function (e) {
      var slot = e.target.closest(".slot");
      if (!slot || slot.classList.contains("full")) return;
      grid.querySelectorAll(".slot").forEach(function (s) { s.classList.remove("selected"); });
      slot.classList.add("selected");
      if (out) out.value = slot.dataset.slot;
      var hidden = document.getElementById("slotField");
      if (hidden) hidden.value = slot.dataset.slot;
    });
  }

  /* ---- Cart ------------------------------------------------------------- */
  function initCart() {
    var menu = document.querySelector("[data-cart]");
    if (!menu) return;
    var cart = {}; // id -> {name, price, qty}

    function render() {
      var lines = document.getElementById("cartLines");
      var totalEl = document.getElementById("cartTotal");
      var countEl = document.getElementById("cartCount");
      var total = 0, count = 0, html = "";
      Object.keys(cart).forEach(function (id) {
        var it = cart[id];
        if (it.qty <= 0) return;
        total += it.qty * it.price;
        count += it.qty;
        html += '<div class="cart-line"><span>' + it.name + " × " + it.qty +
                "</span><span>" + fmt(it.qty * it.price) + "</span></div>";
      });
      if (lines) lines.innerHTML = html || '<p class="text-muted" style="padding:.6rem 0">Your cart is empty.</p>';
      if (totalEl) totalEl.textContent = fmt(total);
      if (countEl) countEl.textContent = count;
      var checkout = document.getElementById("checkoutBtn");
      if (checkout) checkout.disabled = count === 0;
    }

    menu.querySelectorAll(".menu-item").forEach(function (row) {
      var id = row.dataset.id;
      var name = row.dataset.name;
      var price = Number(row.dataset.price);
      cart[id] = { name: name, price: price, qty: 0 };
      var qtyEl = row.querySelector("[data-qty]");
      row.querySelector("[data-inc]").addEventListener("click", function () {
        cart[id].qty++; qtyEl.textContent = cart[id].qty; render();
      });
      row.querySelector("[data-dec]").addEventListener("click", function () {
        if (cart[id].qty > 0) cart[id].qty--; qtyEl.textContent = cart[id].qty; render();
      });
    });

    var checkout = document.getElementById("checkoutBtn");
    if (checkout) {
      checkout.addEventListener("click", function () {
        var modal = document.getElementById("checkoutNote");
        if (modal) modal.classList.add("show");
        /* Demo only — integrate Razorpay/PayU here, server-side order creation. */
      });
    }
    render();
  }

  /* ---- Donation amount picker ------------------------------------------ */
  function initDonate() {
    var grid = document.querySelector(".amount-grid");
    if (!grid) return;
    var custom = document.getElementById("customAmount");
    grid.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      grid.querySelectorAll("button").forEach(function (b) { b.classList.remove("selected"); });
      btn.classList.add("selected");
      if (custom) custom.value = btn.dataset.amount;
    });
    if (custom) custom.addEventListener("input", function () {
      grid.querySelectorAll("button").forEach(function (b) { b.classList.remove("selected"); });
    });
  }

  function start() { initSlots(); initCart(); initDonate(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
