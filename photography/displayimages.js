/* ===========================================
   photobook.js — Zine modal: open, close,
   and editorial layout rendering.

   Depends on: data.js (photos)
   Uses globals from app.js (photobookModal).
   =========================================== */

function openPhotobook() {
  photobookModal.classList.add("active");
  photobookModal.scrollTop = 0;
  buildZine();
}

function closePhotobook() {
  photobookModal.classList.remove("active");
}

function buildZine() {
  const container = document.getElementById("zine-container");
  container.innerHTML = "";

  // Layout sequence — cycles across all photos
  // "count" = number of photos consumed by this block
  const layouts = [
    { type: "hero",       count: 1 },
    { type: "duo-offset", count: 2 },
    { type: "solo-left",  count: 1 },
    { type: "trio",       count: 3 },
    { type: "solo-right", count: 1 },
    { type: "duo-even",   count: 2 },
  ];

  let photoIndex  = 0;
  let layoutIndex = 0;

  while (photoIndex < photos.length) {
    const layout = layouts[layoutIndex % layouts.length];
    const count  = Math.min(layout.count, photos.length - photoIndex);

    const block = document.createElement("div");
    block.className = `zine-block zine-${layout.type}`;

    for (let i = 0; i < count; i++) {
      const photo = photos[photoIndex + i];

      const wrap = document.createElement("div");
      wrap.className = "zine-img-wrap";
      // Stagger siblings within the same block
      wrap.style.transitionDelay = `${i * 0.08}s`;

      const img = document.createElement("img");
      img.src     = photo.src;
      img.alt     = photo.caption || "";
      img.loading = "lazy";

      wrap.appendChild(img);
      block.appendChild(wrap);
    }

    container.appendChild(block);
    photoIndex  += count;
    layoutIndex += 1;
  }

  // Reveal images as they scroll into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, root: photobookModal });

  container.querySelectorAll(".zine-img-wrap").forEach((wrap) => {
    observer.observe(wrap);
  });
}
