/* ===========================================
   exhibition.js — Zine carousel exhibition.
   Center card is active; adjacent cards are
   smaller/dimmed and navigate on click.
   Supports swipe, keyboard arrows, and dots.
   =========================================== */

(function () {
  const floor = document.getElementById("exhibition-floor");
  let activeIndex = 0;
  const cards = [];

  // ── Inject carousel structure ──────────────
  floor.innerHTML = `
    <div class="car-nav">
      <button class="car-btn car-btn--prev" aria-label="Previous zine">&#8249;</button>
      <div class="car-track" id="car-track"></div>
      <button class="car-btn car-btn--next" aria-label="Next zine">&#8250;</button>
    </div>
    <div class="car-dots" id="car-dots"></div>
  `;

  const track   = document.getElementById("car-track");
  const dotsEl  = document.getElementById("car-dots");
  const prevBtn = floor.querySelector(".car-btn--prev");
  const nextBtn = floor.querySelector(".car-btn--next");

  // ── Build cards ───────────────────────────
  const ROTATIONS = [-2.3, 1.4, -1.0, 2.1, -1.7, 0.8];

  ZINES.forEach((zine, i) => {
    const card = document.createElement("article");
    card.className = "zine-card";
    card.style.setProperty("--rot", ROTATIONS[i % ROTATIONS.length] + "deg");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Open zine: ${zine.title}`);

    card.innerHTML = `
      <div class="zine-card-inner">
        <div class="zine-card-cover">
          <img src="${zine.cover}" alt="${zine.title} cover" loading="lazy" />
        </div>
        <div class="zine-card-label">
          <span class="zc-title">${zine.title.toUpperCase()}</span>
          <span class="zc-sub">${zine.subtitle}</span>
          <span class="zc-open">[ OPEN ]</span>
        </div>
      </div>
    `;

    track.appendChild(card);
    cards.push(card);
  });

  // ── Build dots ────────────────────────────
  ZINES.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "car-dot";
    dot.setAttribute("aria-label", `Go to zine ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsEl.appendChild(dot);
  });

  // ── Carousel logic ────────────────────────

  // Normalized offset with wrap-around (for future >3 zines)
  function normalizedOffset(i) {
    const n = ZINES.length;
    let off = i - activeIndex;
    while (off >  n / 2) off -= n;
    while (off < -n / 2) off += n;
    return off;
  }

  function update() {
    cards.forEach((card, i) => {
      const offset = normalizedOffset(i);
      const abs    = Math.abs(offset);

      // Position
      card.style.setProperty("--offset", offset);

      // Visual state via classes
      card.classList.remove("car-center", "car-side", "car-outer", "car-hidden");

      if (offset === 0) {
        // ── Centre: full size, opens reader ─────
        card.classList.add("car-center");
        card.style.setProperty("--car-scale",   "1");
        card.style.setProperty("--car-opacity", "1");
        card.style.setProperty("--car-z",       "4");
        card.removeAttribute("aria-hidden");
        card.setAttribute("tabindex", "0");
        card.onclick   = () => openReader(ZINES[i]);
        card.onkeydown = (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openReader(ZINES[i]);
          }
        };

      } else if (abs === 1) {
        // ── ±1: medium, navigates on click ──────
        card.classList.add("car-side");
        card.style.setProperty("--car-scale",   "0.80");
        card.style.setProperty("--car-opacity", "0.55");
        card.style.setProperty("--car-z",       "3");
        card.removeAttribute("aria-hidden");
        card.setAttribute("tabindex", "0");
        card.onclick   = () => goTo(i);
        card.onkeydown = (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            goTo(i);
          }
        };

      } else if (abs === 2) {
        // ── ±2: small outer peek, also navigates ─
        card.classList.add("car-outer");
        card.style.setProperty("--car-scale",   "0.62");
        card.style.setProperty("--car-opacity", "0.28");
        card.style.setProperty("--car-z",       "2");
        card.removeAttribute("aria-hidden");
        card.setAttribute("tabindex", "0");
        card.onclick   = () => goTo(i);
        card.onkeydown = (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            goTo(i);
          }
        };

      } else {
        // ── beyond ±2: fully hidden ──────────────
        card.classList.add("car-hidden");
        card.style.setProperty("--car-scale",   "0.5");
        card.style.setProperty("--car-opacity", "0");
        card.style.setProperty("--car-z",       "1");
        card.setAttribute("aria-hidden", "true");
        card.setAttribute("tabindex",    "-1");
        card.onclick   = null;
        card.onkeydown = null;
      }
    });

    // Sync dots
    dotsEl.querySelectorAll(".car-dot").forEach((dot, i) => {
      dot.classList.toggle("car-dot--active", i === activeIndex);
    });
  }

  function preloadZine(zine) {
    zine.photos.slice(0, 8).forEach((p) => {
      const img = new Image();
      img.src = p.src;
    });
  }

  function goTo(i) {
    activeIndex = ((i % ZINES.length) + ZINES.length) % ZINES.length;
    update();
    preloadZine(ZINES[activeIndex]);
  }

  prevBtn.addEventListener("click", () => goTo(activeIndex - 1));
  nextBtn.addEventListener("click", () => goTo(activeIndex + 1));

  // Keyboard arrow nav (only when reader is closed)
  document.addEventListener("keydown", (e) => {
    if (document.getElementById("reader").classList.contains("active")) return;
    if (e.key === "ArrowLeft")  goTo(activeIndex - 1);
    if (e.key === "ArrowRight") goTo(activeIndex + 1);
  });

  // Touch swipe
  let touchStartX = 0;
  track.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  track.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) {
      dx < 0 ? goTo(activeIndex + 1) : goTo(activeIndex - 1);
    }
  }, { passive: true });

  update();
  preloadZine(ZINES[activeIndex]);
})();
