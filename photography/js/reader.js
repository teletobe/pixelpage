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

  // Editorial layout sequence — desktop: full variety including heroes and solos.
  const LAYOUTS = [
    { type: "hero",       count: 1 },
    { type: "duo-offset", count: 2 },
    { type: "solo-left",  count: 1 },
    { type: "trio",       count: 3 },
    { type: "solo-right", count: 1 },
    { type: "duo-even",   count: 2 },
  ];

  // Mobile layout sequence — mix of 2/3-up and offset singles for variety.
  const MOBILE_LAYOUTS = [
    { type: "duo-even",   count: 2 },
    { type: "trio",       count: 3 },
    { type: "solo-left",  count: 1 },
    { type: "duo-even",   count: 2 },
    { type: "trio",       count: 3 },
    { type: "solo-right", count: 1 },
    { type: "duo-offset", count: 2 },
    { type: "duo-even",   count: 2 },
    { type: "solo-left",  count: 1 },
    { type: "trio",       count: 3 },
  ];

  function buildZine(photos) {
    zineContent.innerHTML = "";

    let photoIndex  = 0;
    let layoutIndex = 0;

    const activeLayouts = window.innerWidth <= 640 ? MOBILE_LAYOUTS : LAYOUTS;

    while (photoIndex < photos.length) {
      const layout = activeLayouts[layoutIndex % activeLayouts.length];
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
        img.src      = photo.src;
        img.alt      = "";
        img.loading  = "lazy";
        img.decoding = "async";

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
      { threshold: 0.08, root: readerBody, rootMargin: "500px 0px" }
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
