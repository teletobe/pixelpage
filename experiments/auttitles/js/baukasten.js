/* ================================================================
   baukasten.js — Baukasten (Version III) — Drag & Drop Canvas
   Depends on: titlesdata.js (TITLES_DATA), titles.js (prestigeRank, DB_LIMIT, MAX_PRESTIGE)
   ================================================================ */

let BK_TILES = [];
let BK_SECTIONS = [];
const bkTileMap = {};
const bkCanvasChips = {}; // tileId → DOM element

const BK_CATEGORY_ORDER = {
  beamte: 1,
  ehren: 2,
  akademisch_pre: 3,
  akademisch_post: 6,
  militaerisch: 5,
  berufe: 4,
  kirche: 7,
  historisch: 8,
};

const BK_SECTION_LABELS = {
  beamte: "ÖFFENTLICHER DIENST",
  akademisch_pre: "AKADEMISCH — VORANGESTELLT",
  akademisch_post: "AKADEMISCH — NACHGESTELLT",
  militaerisch: "MILITÄRISCH",
  ehren: "EHRENTITEL",
  berufe: "FREIE BERUFE",
  kirche: "KIRCHLICHE WÜRDEN",
  historisch: "HISTORISCHE TITEL",
};

function loadTitlesFromJSON() {
  processTitlesData(TITLES_DATA);
}

function processTitlesData(data) {
  let tileId = 0;
  const sections = {};

  // Process akademisch — praenominal
  if (data.akademisch && data.akademisch.praenominal) {
    if (!sections["akademisch_pre"]) sections["akademisch_pre"] = [];
    data.akademisch.praenominal.forEach((title) => {
      const id = `bk_${tileId++}`;
      BK_TILES.push({
        id,
        order: BK_CATEGORY_ORDER["akademisch_pre"],
        cat: "akademisch_pre",
        pre: title.kuerzel,
        post: null,
        prestige: title.prestige,
        label: title.kuerzel,
        labelFull: title.bezeichnung,
      });
      bkTileMap[id] = BK_TILES[BK_TILES.length - 1];
      sections["akademisch_pre"].push(id);
    });
  }

  // Process akademisch — postnominal
  if (data.akademisch && data.akademisch.postnominal) {
    if (!sections["akademisch_post"]) sections["akademisch_post"] = [];
    data.akademisch.postnominal.forEach((title) => {
      const id = `bk_${tileId++}`;
      BK_TILES.push({
        id,
        order: BK_CATEGORY_ORDER["akademisch_post"],
        cat: "akademisch_post",
        pre: null,
        post: title.kuerzel,
        prestige: title.prestige,
        label: title.kuerzel,
        labelFull: title.bezeichnung,
      });
      bkTileMap[id] = BK_TILES[BK_TILES.length - 1];
      sections["akademisch_post"].push(id);
    });
  }

  // Process militaerisch
  if (data.militaerisch) {
    if (!sections["militaerisch"]) sections["militaerisch"] = [];

    if (data.militaerisch.bundesheer) {
      data.militaerisch.bundesheer.forEach((title) => {
        const id = `bk_${tileId++}`;
        BK_TILES.push({
          id,
          order: BK_CATEGORY_ORDER["militaerisch"],
          cat: "militaerisch",
          pre: title.kuerzel,
          post: null,
          prestige: title.prestige,
          label: title.kuerzel,
          labelFull: title.bezeichnung,
        });
        bkTileMap[id] = BK_TILES[BK_TILES.length - 1];
        sections["militaerisch"].push(id);
      });
    }

    if (data.militaerisch.polizei) {
      data.militaerisch.polizei.forEach((title) => {
        const id = `bk_${tileId++}`;
        BK_TILES.push({
          id,
          order: BK_CATEGORY_ORDER["militaerisch"],
          cat: "militaerisch",
          pre: title.kuerzel,
          post: null,
          prestige: title.prestige,
          label: title.kuerzel,
          labelFull: title.bezeichnung,
        });
        bkTileMap[id] = BK_TILES[BK_TILES.length - 1];
        sections["militaerisch"].push(id);
      });
    }
  }

  // Process beamte
  if (data.beamte) {
    if (!sections["beamte"]) sections["beamte"] = [];

    if (data.beamte.bund) {
      data.beamte.bund.forEach((title) => {
        const id = `bk_${tileId++}`;
        BK_TILES.push({
          id,
          order: BK_CATEGORY_ORDER["beamte"],
          cat: "beamte",
          pre: title.kuerzel,
          post: null,
          prestige: title.prestige,
          label: title.kuerzel,
          labelFull: title.bezeichnung,
        });
        bkTileMap[id] = BK_TILES[BK_TILES.length - 1];
        sections["beamte"].push(id);
      });
    }

    if (data.beamte.laender_gemeinden) {
      data.beamte.laender_gemeinden.forEach((title) => {
        const id = `bk_${tileId++}`;
        BK_TILES.push({
          id,
          order: BK_CATEGORY_ORDER["beamte"],
          cat: "beamte",
          pre: title.kuerzel,
          post: null,
          prestige: title.prestige,
          label: title.kuerzel,
          labelFull: title.bezeichnung,
        });
        bkTileMap[id] = BK_TILES[BK_TILES.length - 1];
        sections["beamte"].push(id);
      });
    }
  }

  // Process ehren
  if (data.ehren) {
    if (!sections["ehren"]) sections["ehren"] = [];

    if (data.ehren.kammer) {
      data.ehren.kammer.forEach((title) => {
        const id = `bk_${tileId++}`;
        BK_TILES.push({
          id,
          order: BK_CATEGORY_ORDER["ehren"],
          cat: "ehren",
          pre: title.kuerzel,
          post: null,
          prestige: title.prestige,
          label: title.kuerzel,
          labelFull: title.bezeichnung,
        });
        bkTileMap[id] = BK_TILES[BK_TILES.length - 1];
        sections["ehren"].push(id);
      });
    }

    if (data.ehren.bildung) {
      data.ehren.bildung.forEach((title) => {
        const id = `bk_${tileId++}`;
        BK_TILES.push({
          id,
          order: BK_CATEGORY_ORDER["ehren"],
          cat: "ehren",
          pre: title.kuerzel,
          post: null,
          prestige: title.prestige,
          label: title.kuerzel,
          labelFull: title.bezeichnung,
        });
        bkTileMap[id] = BK_TILES[BK_TILES.length - 1];
        sections["ehren"].push(id);
      });
    }

    if (data.ehren.kunst_kultur) {
      data.ehren.kunst_kultur.forEach((title) => {
        const id = `bk_${tileId++}`;
        BK_TILES.push({
          id,
          order: BK_CATEGORY_ORDER["ehren"],
          cat: "ehren",
          pre: title.kuerzel,
          post: null,
          prestige: title.prestige,
          label: title.kuerzel,
          labelFull: title.bezeichnung,
        });
        bkTileMap[id] = BK_TILES[BK_TILES.length - 1];
        sections["ehren"].push(id);
      });
    }
  }

  // Process berufe
  if (data.berufe && data.berufe.freie_berufe) {
    if (!sections["berufe"]) sections["berufe"] = [];
    data.berufe.freie_berufe.forEach((title) => {
      const id = `bk_${tileId++}`;
      BK_TILES.push({
        id,
        order: BK_CATEGORY_ORDER["berufe"],
        cat: "berufe",
        pre: title.kuerzel,
        post: null,
        prestige: title.prestige,
        label: title.kuerzel,
        labelFull: title.bezeichnung,
      });
      bkTileMap[id] = BK_TILES[BK_TILES.length - 1];
      sections["berufe"].push(id);
    });
  }

  // Process kirche
  if (data.kirche) {
    if (!sections["kirche"]) sections["kirche"] = [];

    if (data.kirche.katholisch) {
      data.kirche.katholisch.forEach((title) => {
        const id = `bk_${tileId++}`;
        BK_TILES.push({
          id,
          order: BK_CATEGORY_ORDER["kirche"],
          cat: "kirche",
          pre: title.kuerzel,
          post: null,
          prestige: title.prestige,
          label: title.kuerzel,
          labelFull: title.bezeichnung,
        });
        bkTileMap[id] = BK_TILES[BK_TILES.length - 1];
        sections["kirche"].push(id);
      });
    }

    if (data.kirche.evangelisch) {
      data.kirche.evangelisch.forEach((title) => {
        const id = `bk_${tileId++}`;
        BK_TILES.push({
          id,
          order: BK_CATEGORY_ORDER["kirche"],
          cat: "kirche",
          pre: title.kuerzel,
          post: null,
          prestige: title.prestige,
          label: title.kuerzel,
          labelFull: title.bezeichnung,
        });
        bkTileMap[id] = BK_TILES[BK_TILES.length - 1];
        sections["kirche"].push(id);
      });
    }
  }

  // Process historisch
  if (data.historisch && data.historisch.adel) {
    if (!sections["historisch"]) sections["historisch"] = [];
    data.historisch.adel.forEach((title) => {
      const id = `bk_${tileId++}`;
      BK_TILES.push({
        id,
        order: BK_CATEGORY_ORDER["historisch"],
        cat: "historisch",
        pre: title.kuerzel,
        post: null,
        prestige: title.prestige,
        label: title.kuerzel,
        labelFull: title.bezeichnung,
      });
      bkTileMap[id] = BK_TILES[BK_TILES.length - 1];
      sections["historisch"].push(id);
    });
  }

  // Build BK_SECTIONS in order
  const catOrder = [
    "beamte",
    "ehren",
    "akademisch_pre",
    "berufe",
    "militaerisch",
    "akademisch_post",
    "kirche",
    "historisch",
  ];
  catOrder.forEach((cat) => {
    if (sections[cat] && sections[cat].length > 0) {
      BK_SECTIONS.push({
        label: BK_SECTION_LABELS[cat],
        ids: sections[cat],
      });
    }
  });

  bkInit();
}

loadTitlesFromJSON();

// ── Canvas chip management ────────────────────────────────────

function bkAddToCanvas(tileId) {
  // Toggle: click again removes the chip
  if (bkCanvasChips[tileId]) {
    bkRemoveFromCanvas(tileId);
    return;
  }

  const tile = bkTileMap[tileId];
  const canvas = document.getElementById("bk-canvas");
  const chip = createCanvasChip(tile);

  // Append off-screen first to measure dimensions
  chip.style.left = "-9999px";
  canvas.appendChild(chip);

  const chipW = chip.offsetWidth;
  const chipH = chip.offsetHeight;
  const cx = canvas.offsetWidth / 2;
  const cy = canvas.offsetHeight / 2;

  // Place at a random angle + distance from center
  const angle = Math.random() * Math.PI * 2;
  const dist = 75 + Math.random() * 85;
  const left = cx + Math.cos(angle) * dist - chipW / 2;
  const top = cy + Math.sin(angle) * dist - chipH / 2;

  chip.style.left =
    Math.max(4, Math.min(canvas.offsetWidth - chipW - 4, left)) + "px";
  chip.style.top =
    Math.max(4, Math.min(canvas.offsetHeight - chipH - 4, top)) + "px";

  bkCanvasChips[tileId] = chip;

  document.querySelector(`[data-bk-id="${tileId}"]`)?.classList.add("active");
  document.getElementById("bk-canvas-hint")?.classList.add("hidden");

  bkUpdateResult();
}

function bkRemoveFromCanvas(tileId) {
  const chip = bkCanvasChips[tileId];
  if (!chip) return;
  chip.remove();
  delete bkCanvasChips[tileId];

  document
    .querySelector(`[data-bk-id="${tileId}"]`)
    ?.classList.remove("active");

  if (Object.keys(bkCanvasChips).length === 0) {
    document.getElementById("bk-canvas-hint")?.classList.remove("hidden");
  }

  bkUpdateResult();
}

function createCanvasChip(tile) {
  const chip = document.createElement("div");
  chip.className = "bk-canvas-chip";
  chip.dataset.tileId = tile.id;

  const abbr = document.createElement("span");
  abbr.className = "bk-chip-abbr";
  abbr.textContent = tile.label;

  const removeBtn = document.createElement("button");
  removeBtn.className = "bk-chip-remove";
  removeBtn.textContent = "×";
  removeBtn.title = "Entfernen";
  removeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    bkRemoveFromCanvas(tile.id);
  });

  chip.appendChild(abbr);
  chip.appendChild(removeBtn);
  makeDraggable(chip);
  return chip;
}

function makeDraggable(chip) {
  let drag = null;

  chip.addEventListener("pointerdown", (e) => {
    if (e.target.classList.contains("bk-chip-remove")) return;
    e.preventDefault();
    chip.setPointerCapture(e.pointerId);
    drag = {
      id: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      origLeft: parseFloat(chip.style.left) || 0,
      origTop: parseFloat(chip.style.top) || 0,
    };
    chip.classList.add("dragging");
  });

  chip.addEventListener("pointermove", (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const canvas = chip.parentElement;
    const newLeft = Math.max(
      0,
      Math.min(
        canvas.offsetWidth - chip.offsetWidth,
        drag.origLeft + (e.clientX - drag.startX),
      ),
    );
    const newTop = Math.max(
      0,
      Math.min(
        canvas.offsetHeight - chip.offsetHeight,
        drag.origTop + (e.clientY - drag.startY),
      ),
    );
    chip.style.left = newLeft + "px";
    chip.style.top = newTop + "px";
    bkUpdateResult();
  });

  chip.addEventListener("pointerup", () => {
    drag = null;
    chip.classList.remove("dragging");
  });

  chip.addEventListener("lostpointercapture", () => {
    drag = null;
    chip.classList.remove("dragging");
  });
}

// ── Result: read chips left-to-right, name as anchor ─────────

function bkUpdateResult() {
  const canvas = document.getElementById("bk-canvas");
  const chips = Array.from(canvas.querySelectorAll(".bk-canvas-chip"));

  const titleEl = document.getElementById("bk-title-live");
  const ptsEl = document.getElementById("bk-pts");
  const rankEl = document.getElementById("bk-rank");
  const fillEl = document.getElementById("bk-fill");
  const copyBtn = document.getElementById("bk-copy-btn");

  if (chips.length === 0) {
    titleEl.textContent =
      "Titel anklicken um sie auf der Fläche zu sehen. Dann nach belieben anordnen.";
    titleEl.classList.add("empty");
    ptsEl.textContent = "0 Pkt.";
    rankEl.textContent = "";
    fillEl.style.width = "0%";
    copyBtn.disabled = true;
    return;
  }

  // Measure center-x of each chip and both name anchors relative to canvas
  const canvasRect = canvas.getBoundingClientRect();
  const firstName = document.getElementById("bk-name-first");
  const lastName = document.getElementById("bk-name-last");

  function elCX(el) {
    const r = el.getBoundingClientRect();
    return r.left - canvasRect.left + r.width / 2;
  }

  const items = chips.map((chip) => ({
    cx: elCX(chip),
    tileId: chip.dataset.tileId,
    text: null,
  }));
  items.push({ cx: elCX(firstName), tileId: null, text: "Mika" });
  items.push({ cx: elCX(lastName), tileId: null, text: "Musterperson" });
  items.sort((a, b) => a.cx - b.cx);

  const parts = items.map((item) =>
    item.tileId ? bkTileMap[item.tileId].label : item.text,
  );
  const fullTitle = parts.join(" ");

  titleEl.textContent = fullTitle;
  titleEl.classList.remove("empty");

  const totalPrestige = chips.reduce(
    (sum, chip) => sum + (bkTileMap[chip.dataset.tileId]?.prestige || 0),
    0,
  );
  ptsEl.textContent = totalPrestige + " Pkt.";
  const rank = prestigeRank(totalPrestige);
  rankEl.textContent = rank.label;
  fillEl.style.width =
    Math.min(100, Math.round((totalPrestige / MAX_PRESTIGE) * 100)) + "%";

  copyBtn.disabled = false;
}

// ── Controls ──────────────────────────────────────────────────

function bkClear() {
  Object.keys(bkCanvasChips).forEach((id) => bkRemoveFromCanvas(id));
}

function bkCopy() {
  const text = document.getElementById("bk-title-live").textContent;
  navigator.clipboard.writeText(text).catch(() => {});
  const btn = document.getElementById("bk-copy-btn");
  btn.textContent = "KOPIERT ✓";
  setTimeout(() => {
    btn.textContent = "KOPIEREN";
  }, 2000);
}

// ── Init ──────────────────────────────────────────────────────

function bkInit() {
  const sectionsEl = document.getElementById("bk-sections");
  sectionsEl.innerHTML = "";

  BK_SECTIONS.forEach((sec) => {
    const wrap = document.createElement("div");
    wrap.className = "bk-section";

    const hdr = document.createElement("div");
    hdr.className = "bk-section-hdr";
    hdr.textContent = sec.label;
    wrap.appendChild(hdr);

    const tiles = document.createElement("div");
    tiles.className = "bk-tiles";
    sec.ids.forEach((id) => {
      const t = bkTileMap[id];
      const btn = document.createElement("button");
      btn.className = "bk-tile";
      btn.setAttribute("data-bk-id", t.id);
      btn.onclick = () => bkAddToCanvas(t.id);
      btn.innerHTML = `<span class="bk-tile-abbr">${t.label}</span><span class="bk-tile-full">${t.labelFull}</span>`;
      tiles.appendChild(btn);
    });
    wrap.appendChild(tiles);
    sectionsEl.appendChild(wrap);
  });

  bkUpdateResult();
}
