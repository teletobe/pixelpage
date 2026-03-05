/* ================================================================
   coord.js — Prestigekarte (Version II)
   Interactive 2D coordinate map for exploring title combinations.
   Depends on: titles.js (titlesFromCoords, prestigeRank, DB_LIMIT, MAX_PRESTIGE)
   ================================================================ */

let cX = 50,
  cY = 50;
let cLocked = false;
let isDragging = false;

const coordMap = document.getElementById("coord-map");
const coordPoint = document.getElementById("coord-point");

function setPoint(x, y, pulse) {
  cX = Math.max(0, Math.min(100, x));
  cY = Math.max(0, Math.min(100, y));

  coordPoint.style.left = cX + "%";
  coordPoint.style.top = 100 - cY + "%";

  if (pulse) {
    coordPoint.classList.remove("pulse");
    void coordPoint.offsetWidth;
    coordPoint.classList.add("pulse");
  }

  document.getElementById("coord-readout").textContent =
    `Akademisch: ${Math.round(cX)} · Autorität: ${Math.round(cY)}`;

  if (!cLocked) updateCoordResult();
}

function updateCoordResult() {
  const { fullTitle, prestige } = titlesFromCoords(cX, cY);
  const rank = prestigeRank(prestige);

  document.getElementById("coord-title").textContent = fullTitle;
  document.getElementById("coord-pts").textContent = prestige + " Pkt.";

  const pct = Math.min(100, Math.round((prestige / MAX_PRESTIGE) * 100));
  document.getElementById("coord-fill").style.width = pct + "%";
  document.getElementById("coord-rank").textContent = rank.label;

}

function coordRandomize() {
  if (cLocked) return;
  setPoint(
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    true,
  );
}

function coordReset() {
  cLocked = false;
  document.getElementById("coord-lock-btn").textContent = "FESTSETZEN";
  document.getElementById("coord-lock-btn").className = "coord-btn lock";
  document.getElementById("live-dot").classList.remove("locked");
  document.getElementById("coord-status").textContent = "LIVEVORSCHAU";
  document.getElementById("coord-actions").style.display = "none";
  setPoint(50, 50, false);
}

function coordLock() {
  cLocked = !cLocked;
  const btn = document.getElementById("coord-lock-btn");
  const dot = document.getElementById("live-dot");

  if (cLocked) {
    btn.textContent = "FREIGEBEN";
    btn.className = "coord-btn locked";
    dot.classList.add("locked");
    document.getElementById("coord-status").textContent = "GESPERRT";
    document.getElementById("coord-actions").style.display = "flex";
    updateCoordResult();
  } else {
    btn.textContent = "FESTSETZEN";
    btn.className = "coord-btn lock";
    dot.classList.remove("locked");
    document.getElementById("coord-status").textContent = "LIVEVORSCHAU";
    document.getElementById("coord-actions").style.display = "none";
  }
}

function coordCopy() {
  const { fullTitle } = titlesFromCoords(cX, cY);
  navigator.clipboard.writeText(fullTitle).catch(() => {});
  const btn = document.getElementById("coord-copy-btn");
  btn.textContent = "KOPIERT ✓";
  setTimeout(() => {
    btn.textContent = "TITEL KOPIEREN";
  }, 2000);
}

function mapCoords(e) {
  const rect = coordMap.getBoundingClientRect();
  const cx = e.touches ? e.touches[0].clientX : e.clientX;
  const cy = e.touches ? e.touches[0].clientY : e.clientY;
  return {
    x: ((cx - rect.left) / rect.width) * 100,
    y: 100 - ((cy - rect.top) / rect.height) * 100,
  };
}

// ── Mouse events ──────────────────────────────────────
coordMap.addEventListener("mousedown", (e) => {
  if (cLocked) return;
  isDragging = true;
  const { x, y } = mapCoords(e);
  setPoint(x, y, false);
  e.preventDefault();
});

coordPoint.addEventListener("mousedown", (e) => {
  if (cLocked) return;
  isDragging = true;
  e.preventDefault();
  e.stopPropagation();
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging || cLocked) return;
  const { x, y } = mapCoords(e);
  setPoint(x, y, false);
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

// ── Touch events ──────────────────────────────────────
coordMap.addEventListener(
  "touchstart",
  (e) => {
    if (cLocked) return;
    isDragging = true;
    const { x, y } = mapCoords(e);
    setPoint(x, y, false);
    e.preventDefault();
  },
  { passive: false },
);

coordPoint.addEventListener(
  "touchstart",
  (e) => {
    if (cLocked) return;
    isDragging = true;
    e.preventDefault();
    e.stopPropagation();
  },
  { passive: false },
);

document.addEventListener(
  "touchmove",
  (e) => {
    if (!isDragging || cLocked) return;
    const { x, y } = mapCoords(e);
    setPoint(x, y, false);
    e.preventDefault();
  },
  { passive: false },
);

document.addEventListener("touchend", () => {
  isDragging = false;
});

// Init
setPoint(50, 50, false);
updateCoordResult();
