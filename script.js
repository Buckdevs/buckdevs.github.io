/* =========================================================================
   Andrew Buck — buckdevs.github.io
   Vanilla JS: signature product/marketing merge, scroll reveals, micro-detail.
   No dependencies. Everything degrades gracefully.
   ========================================================================= */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  /* ---------------------------------------------------------------------
     1) Signature moment — the collapsing line between product & marketing
     --------------------------------------------------------------------- */
  (function mergeInteraction() {
    var stage    = document.querySelector("[data-merge]");
    var range    = document.querySelector("[data-merge-range]");
    var product  = document.querySelector("[data-merge-product]");
    var marketing= document.querySelector("[data-merge-marketing]");
    var divider  = document.querySelector("[data-merge-divider]");
    var readout  = document.querySelector("[data-merge-readout]");
    if (!stage || !range || !product || !marketing || !divider) return;

    // programmatic changes (keyboard, load) ease; live dragging feels instant
    if (!prefersReduced) {
      var t = "transform .32s cubic-bezier(.2,.7,.2,1), opacity .32s ease";
      product.style.transition = t;
      marketing.style.transition = t;
      divider.style.transition = "transform .32s cubic-bezier(.2,.7,.2,1), opacity .32s ease";
    }

    function render(v) {
      var p = v / 100;                     // 0 = two disciplines · 1 = nearly one
      var spread = stage.clientWidth * 0.30;
      // Never fully stack: keep a residual overlap so both words stay legible —
      // the line goes "nearly" gone, not completely.
      var floor = stage.clientWidth * 0.055;
      var dx = Math.max(spread * (1 - p), floor); // px each word sits from centre

      product.style.transform   = "translate(calc(-50% - " + dx + "px), -50%)";
      marketing.style.transform = "translate(calc(-50% + " + dx + "px), -50%)";

      var gap = 1 - p;
      divider.style.opacity = String(Math.max(0, gap * 1.15 - 0.05));
      divider.style.transform = "translate(-50%, -50%) scaleY(" + (0.25 + 0.75 * gap) + ")";

      range.style.setProperty("--fill", v + "%");

      if (readout) {
        readout.textContent = p >= 0.985
          ? "one discipline"
          : Math.round((1 - p) * 100) + "% apart";
      }
    }

    range.addEventListener("input", function () { render(+range.value); });
    window.addEventListener("resize", function () { render(+range.value); });

    render(+range.value);

    // A one-time, gentle self-demo so the idea reads without any interaction.
    if (!prefersReduced) {
      var demoDone = false;
      function cancelDemo() { demoDone = true; }
      range.addEventListener("pointerdown", cancelDemo);
      range.addEventListener("keydown", cancelDemo);

      var io = ("IntersectionObserver" in window)
        ? new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (e) {
              if (!e.isIntersecting || demoDone) return;
              obs.disconnect();
              nudge();
            });
          }, { threshold: 0.6 })
        : null;

      function nudge() {
        // ease from current (34) → 100 → settle at 34, once.
        var start = +range.value, peak = 100;
        step(start, peak, 900, function () {
          if (demoDone) return;
          step(peak, start, 900, function () {});
        });
      }
      function step(from, to, dur, done) {
        var t0 = null;
        function frame(ts) {
          if (demoDone) { range.value = String(to); render(to); return; }
          if (t0 === null) t0 = ts;
          var k = Math.min(1, (ts - t0) / dur);
          var eased = 1 - Math.pow(1 - k, 3);
          var val = from + (to - from) * eased;
          range.value = String(val);
          render(val);
          if (k < 1) requestAnimationFrame(frame); else done();
        }
        requestAnimationFrame(frame);
      }

      if (io) io.observe(stage); // wait until it's on screen
    }
  })();

  /* ---------------------------------------------------------------------
     2) Scroll reveals
     --------------------------------------------------------------------- */
  (function reveals() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (!items.length) return;

    if (prefersReduced || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          obs.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    items.forEach(function (el) { io.observe(el); });
  })();

  /* ---------------------------------------------------------------------
     3) Footer year
     --------------------------------------------------------------------- */
  (function year() {
    var years = document.querySelectorAll("[data-year]");
    if (years.length) {
      var y = new Date().getFullYear();
      Array.prototype.forEach.call(years, function (el) { el.textContent = y; });
    }
  })();

})();
