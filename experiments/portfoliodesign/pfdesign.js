/* ===========================================
   pfdesign.js — Content data and layout builder.

   Edit `content` to add/remove photos or text
   labels. { src } = photo, { text } = one-liner.
   =========================================== */

const content = [
  { src: "../../informatics/img/photobook/pf1.jpg" },
  { src: "../../informatics/img/photobook/pf2.jpg" },
  { src: "../../informatics/img/photobook/pf3.jpg" },
  { src: "../../informatics/img/photobook/pf4.jpg" },
  { src: "../../informatics/img/photobook/pf5.jpg" },
  { src: "../../informatics/img/photobook/pf6.jpg" },
  { text: "You can even show off pretty text..." },
  { src: "../../informatics/img/photobook/pf7.jpg" },
  { src: "../../informatics/img/photobook/pf8.jpg" },
  { src: "../../informatics/img/photobook/pf9.jpg" },
  { src: "../../informatics/img/photobook/pf10.jpg" },
  { src: "../../informatics/img/photobook/pf11.jpg" },
  { src: "../../informatics/img/photobook/pf12.jpg" },
  { text: "some of my portfolio images as examples" },
  { src: "../../informatics/img/photobook/pf13.jpg" },
  { src: "../../informatics/img/photobook/pf14.jpg" },
  { src: "../../informatics/img/photobook/pf15.jpg" },
  { src: "../../informatics/img/photobook/pf16.jpg" },
  { src: "../../informatics/img/photobook/pf17.jpg" },
  { src: "../../informatics/img/photobook/pf18.jpg" },
  { text: "I don't usually think images should need text" },
  { src: "../../informatics/img/photobook/pf19.jpg" },
  { src: "../../informatics/img/photobook/pf20.jpg" },
  { src: "../../informatics/img/photobook/pf21.jpg" },
  { src: "../../informatics/img/photobook/pf22.jpg" },
  { src: "../../informatics/img/photobook/pf23.jpg" },
  { src: "../../informatics/img/photobook/pf24.jpg" },
  { text: "but sometimes it can be nice :)" },
  { src: "../../informatics/img/photobook/pf25.jpg" },
  { src: "../../informatics/img/photobook/pf26.jpg" },
  { src: "../../informatics/img/photobook/pf27.jpg" },
  { src: "../../informatics/img/photobook/pf28.jpg" },
];

const layouts = [
  { type: "hero",       count: 1 },
  { type: "duo-offset", count: 2 },
  { type: "solo-left",  count: 1 },
  { type: "trio",       count: 3 },
  { type: "solo-right", count: 1 },
  { type: "duo-even",   count: 2 },
];

const textPositions = ["--center", "--left-a", "--left-b", "--right-a", "--right-b"];

// -- Layout builder --

function buildZine(items = content) {
  const container = document.getElementById("zine-container");
  container.innerHTML = "";

  const revealTargets = [];
  let i = 0;
  let layoutIndex = 0;

  while (i < items.length) {
    const item = items[i];

    // Text one-liner
    if (item.text) {
      const pos = textPositions[Math.floor(Math.random() * textPositions.length)];
      const el = document.createElement("p");
      el.className = `zine-text-break zine-text-break${pos}`;
      el.textContent = item.text;
      container.appendChild(el);
      revealTargets.push(el);
      i++;
      continue;
    }

    // Photo block — count consecutive photos before next text or end
    let available = 0;
    for (let j = i; j < items.length && items[j].src; j++) available++;

    const layout = layouts[layoutIndex % layouts.length];
    const count = Math.min(layout.count, available);

    const block = document.createElement("div");
    block.className = `zine-block zine-${layout.type}`;

    for (let k = 0; k < count; k++) {
      const wrap = document.createElement("div");
      wrap.className = "zine-img-wrap";
      wrap.style.transitionDelay = `${k * 0.08}s`;

      const img = document.createElement("img");
      img.src = items[i + k].src;
      img.alt = "";
      img.loading = "lazy";

      wrap.appendChild(img);
      block.appendChild(wrap);
      revealTargets.push(wrap);
    }

    container.appendChild(block);
    i += count;
    layoutIndex++;
  }

  // Reveal everything as it scrolls into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  revealTargets.forEach((el) => observer.observe(el));
}

// -- Upload handling --

let activeObjectURLs = [];

function revokeActiveURLs() {
  activeObjectURLs.forEach((url) => URL.revokeObjectURL(url));
  activeObjectURLs = [];
}

function loadUserImages(files) {
  revokeActiveURLs();

  const items = Array.from(files).map((f) => {
    const url = URL.createObjectURL(f);
    activeObjectURLs.push(url);
    return { src: url };
  });

  buildZine(items);
  document.getElementById("zine-container").scrollIntoView({ behavior: "smooth", block: "start" });

  // Switch upload zone to active state
  document.getElementById("upload-prompt").hidden = true;
  document.getElementById("upload-active").hidden = false;
  document.getElementById("upload-count").textContent =
    `${files.length} image${files.length !== 1 ? "s" : ""} loaded`;
}

function resetToDefault() {
  revokeActiveURLs();
  buildZine(content);

  document.getElementById("upload-prompt").hidden = false;
  document.getElementById("upload-active").hidden = true;
  document.getElementById("file-input").value = "";
}

document.getElementById("file-input").addEventListener("change", (e) => {
  if (e.target.files.length) loadUserImages(e.target.files);
});

document.getElementById("reset-btn").addEventListener("click", resetToDefault);

// Drag and drop on the upload zone
const uploadZone = document.getElementById("upload-zone");

uploadZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadZone.classList.add("drag-over");
});

uploadZone.addEventListener("dragleave", (e) => {
  if (!uploadZone.contains(e.relatedTarget)) {
    uploadZone.classList.remove("drag-over");
  }
});

uploadZone.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadZone.classList.remove("drag-over");
  const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
  if (files.length) loadUserImages(files);
});

// -- Init --

buildZine();
