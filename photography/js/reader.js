/* ===========================================
   reader.js — Fullscreen zine reader.
   Opens over the exhibition, builds the editorial
   scroll layout, and tears down on close.
   =========================================== */

(function () {
  const reader      = document.getElementById("reader");
  const readerTitle = document.getElementById("reader-title");
  const readerBody  = document.getElementById("reader-body");
  const zineContent = document.getElementById("zine-content");
  const closeBtn    = document.getElementById("reader-close");

  // Horizontal offsets per block — positive shifts right, negative shifts left.
  // Cycles so neither the left nor right edge is ever a straight line.
  const SHIFTS = [0, 44, -36, 28, -52, 18, 40, -28, 56, -40, 24, -48];

  // Editorial layout sequence — cycles through all photos.
  // "count" = how many images this block consumes.
  const LAYOUTS = [
    { type: "hero",       count: 1 },
    { type: "duo-offset", count: 2 },
    { type: "solo-left",  count: 1 },
    { type: "trio",       count: 3 },
    { type: "solo-right", count: 1 },
    { type: "duo-even",   count: 2 },
  ];

  function buildZine(photos) {
    zineContent.innerHTML = "";

    let photoIndex  = 0;
    let layoutIndex = 0;

    while (photoIndex < photos.length) {
      const layout = LAYOUTS[layoutIndex % LAYOUTS.length];
      const count  = Math.min(layout.count, photos.length - photoIndex);

      const block = document.createElement("div");
      block.className = `zine-block zine-${layout.type}`;
      block.style.setProperty("--shift", SHIFTS[layoutIndex % SHIFTS.length] + "px");

      for (let i = 0; i < count; i++) {
        const photo = photos[photoIndex + i];

        const wrap = document.createElement("div");
        wrap.className = "zine-img-wrap";
        // Stagger siblings in the same block for a cascading reveal
        wrap.style.transitionDelay = `${i * 0.09}s`;

        const img = document.createElement("img");
        img.src     = photo.src;
        img.alt     = "";
        img.loading = "lazy";

        wrap.appendChild(img);
        block.appendChild(wrap);
      }

      zineContent.appendChild(block);
      photoIndex  += count;
      layoutIndex += 1;
    }

    // Reveal images as they scroll into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, root: readerBody }
    );

    zineContent.querySelectorAll(".zine-img-wrap").forEach((w) =>
      observer.observe(w)
    );
  }

  // Exposed so exhibition.js cards can call it
  window.openReader = function (zine) {
    readerTitle.textContent = zine.title.toUpperCase();
    buildZine(zine.photos);
    readerBody.scrollTop = 0;
    reader.classList.add("active");
    reader.removeAttribute("aria-hidden");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  };

  function closeReader() {
    reader.classList.remove("active");
    reader.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    // Clear content after the fade-out transition finishes
    setTimeout(() => {
      zineContent.innerHTML = "";
    }, 380);
  }

  closeBtn.addEventListener("click", closeReader);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && reader.classList.contains("active")) {
      closeReader();
    }
  });
})();
