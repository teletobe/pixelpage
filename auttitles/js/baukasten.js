/* ================================================================
   baukasten.js — Baukasten (Version III)
   Free-form title composition via toggle tiles.
   Depends on: titlesdata.js (TITLES_DATA), titles.js (prestigeRank, DB_LIMIT, MAX_PRESTIGE)
   ================================================================ */

let BK_TILES = [];
let BK_SECTIONS = [];
const bkTileMap = {};
let bkSelected = new Set();

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

  // Initialize UI
  bkInit();
}

// Load titles from data and initialize
loadTitlesFromJSON();

function bkToggle(id) {
  if (bkSelected.has(id)) bkSelected.delete(id);
  else bkSelected.add(id);
  document
    .querySelector(`[data-bk-id="${id}"]`)
    .classList.toggle("active", bkSelected.has(id));
  bkUpdate();
}

function bkUpdate() {
  const selected = Array.from(bkSelected)
    .map((id) => bkTileMap[id])
    .sort((a, b) => a.order - b.order);

  const pre = selected.filter((t) => t.pre).map((t) => t.pre);
  const post = selected.filter((t) => t.post).map((t) => t.post);
  const totalPrestige = selected.reduce((s, t) => s + t.prestige, 0);

  const name = "Max Mustermann";
  const preStr = pre.join(" ");
  const postStr = post.join(", ");

  let fullTitle = null;
  if (preStr && postStr) fullTitle = `${preStr} ${name}, ${postStr}`;
  else if (preStr) fullTitle = `${preStr} ${name}`;
  else if (postStr) fullTitle = `${name}, ${postStr}`;

  const titleEl = document.getElementById("bk-title-live");
  if (fullTitle) {
    titleEl.textContent = fullTitle;
    titleEl.classList.remove("empty");
  } else {
    titleEl.textContent = "Noch keine Titel ausgewählt.";
    titleEl.classList.add("empty");
  }

  document.getElementById("bk-pts").textContent = totalPrestige + " Pkt.";
  const rank = prestigeRank(totalPrestige);
  document.getElementById("bk-rank").textContent = rank.label;
  const pct = Math.min(100, Math.round((totalPrestige / MAX_PRESTIGE) * 100));
  document.getElementById("bk-fill").style.width = pct + "%";

  const overflow = fullTitle && fullTitle.length > DB_LIMIT;
  document
    .getElementById("bk-overflow")
    .classList.toggle("visible", !!overflow);

  document.getElementById("bk-copy-btn").disabled = !fullTitle;
}

function bkClear() {
  bkSelected.clear();
  document
    .querySelectorAll(".bk-tile.active")
    .forEach((el) => el.classList.remove("active"));
  bkUpdate();
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
      btn.onclick = () => bkToggle(t.id);
      btn.innerHTML = `<span class="bk-tile-abbr">${t.label}</span><span class="bk-tile-full">${t.labelFull}</span>`;
      tiles.appendChild(btn);
    });
    wrap.appendChild(tiles);
    sectionsEl.appendChild(wrap);
  });

  bkUpdate();
}
