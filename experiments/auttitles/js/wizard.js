/* ================================================================
   wizard.js — Titelassistent (Version I)
   Branching question tree that builds a title state step-by-step.
   Depends on: titles.js (resolveTitles, prestigeRank, DB_LIMIT, MAX_PRESTIGE)
   ================================================================ */

const STEPS = [
  // ── AKADEMISCH ───────────────────────────────────────
  {
    id: "q1",
    text: "Haben Sie studiert?",
    sub: "Wir meinen das im institutionellen Sinne — also mit Matrikelnummer und gelegentlichem Erscheinen.",
    options: [
      { label: "Ja, intensiv", next: "q2" },
      { label: "Irgendwie schon", next: "q2" },
      { label: "Nein, das Leben war mein Studium", next: "q5" },
    ],
  },
  {
    id: "q2",
    text: "War Ihr Studium etwas, das Ihr Großvater auf Anhieb versteht?",
    sub: "Maßstab: Konnte er es beim Weihnachtsessen in einem Satz erklären, ohne nachzufragen?",
    options: [
      { label: "Ja, er nickte beim Erzählen", next: "q3_stolz" },
      { label: "Er wechselte danach das Thema", next: "q3_naja" },
      { label: '„Und was macht man damit?"', next: "q3_naja" },
    ],
  },
  {
    id: "q3_stolz",
    text: "Ausgezeichnet. Wie weit sind Sie auf diesem respektablen Weg vorangeschritten?",
    sub: "Ihr Fach gilt als seriös. Das System registriert das.",
    options: [
      {
        label: "Bachelor, die solide Grundlage ist gelegt",
        next: "q4_extra",
        data: { degreeLevel: "bachelor", degreeField: "tech" },
      },
      {
        label: "Master oder Diplom, zumindest auf dem Papier fertig",
        next: "q4_extra",
        data: { degreeLevel: "master", degreeField: "tech" },
      },
      {
        label: "Doktorat, Großvater hat es in der Weihnachtskarte erwähnt",
        next: "q4_extra",
        data: { degreeLevel: "doctorate", degreeField: "tech" },
      },
      {
        label:
          "Habilitation — er versteht es nicht mehr ganz, findet es aber sehr eindrucksvoll",
        next: "q4_extra",
        data: { degreeLevel: "habilitation" },
      },
    ],
  },
  {
    id: "q3_naja",
    text: "Kein Problem. Was haben Sie denn studiert?",
    sub: "Rein für die Titelvergabe. Das System urteilt nicht. Das Formular schon.",
    options: [
      {
        label: "Jus, das versteht er dann doch noch",
        next: "q3_level",
        data: { degreeField: "law" },
      },
      {
        label: "Medizin, er ist sofort stolz, aber auch besorgt",
        next: "q4_extra",
        data: { degreeLevel: "master", degreeField: "med" },
      },
      {
        label:
          "Wirtschaft, er findet es irgendwie kapitalistisch, akzeptiert es aber",
        next: "q3_level",
        data: { degreeField: "other" },
      },
      {
        label: "Geisteswiss., Philosophie, Kunst, Kommunikation...",
        next: "q3_level",
        data: { degreeField: "arts" },
      },
    ],
  },
  {
    id: "q3_level",
    text: "Und wie weit sind Sie damit gekommen?",
    sub: "Vollständige Aufrichtigkeit ist nicht erforderlich. Das System fragt trotzdem.",
    options: [
      {
        label: "Bachelor, ein ehrlicher Anfang",
        next: "q4_extra",
        data: { degreeLevel: "bachelor" },
      },
      {
        label: "Master oder Magister, fertig, zumindest offiziell",
        next: "q4_extra",
        data: { degreeLevel: "master" },
      },
      {
        label: "Doktorat, vom eigenen Fach tief überzeugt",
        next: "q4_extra",
        data: { degreeLevel: "doctorate" },
      },
    ],
  },
  {
    id: "q4_extra",
    text: "Noch nicht genug? Gibt es noch etwas obendrauf?",
    sub: "Manche Menschen können einfach nicht aufhören. Das System respektiert das.",
    options: [
      {
        label: "MBA — für den Schwenk in die Privatwirtschaft",
        next: "q5",
        data: { _extra: "mba" },
      },
      {
        label: "Zweites Doktorat (DDr.) — aus Überzeugung oder Gewohnheit",
        next: "q5",
        data: { _extra: "dr2" },
      },
      {
        label:
          "Ingenieur-Titel (Ing.) der Kammer — nicht wie DI, aber man trägt ihn",
        next: "q5",
        data: { _extra: "ing" },
      },
      { label: "Nein, das genügt vollkommen", next: "q5" },
    ],
  },
  // ── MILITÄR ──────────────────────────────────────────
  {
    id: "q5",
    text: "Haben Sie dem Staat gedient? Mit Uniform?",
    sub: "Bundesheer oder Polizei. Zivildienst war gesellschaftlich wertvoll, erzeugt aber leider keine Titelpräfixe.",
    options: [
      { label: "Ja, mit Überzeugung", next: "q6" },
      { label: "Nein, das war nichts für mich", next: "q7" },
    ],
  },
  {
    id: "q6",
    text: "Wie weit haben Sie es gebracht?",
    sub: "Höhere Ränge erfordern längere Kuverts.",
    options: [
      {
        label: "Unteroffizier (Vizeleutnant) — Respekt auf der Kaserne",
        next: "q7",
        data: { militaryRank: "vzlt" },
      },
      {
        label: "Offizier (Hauptmann bis Major) — man trägt Verantwortung",
        next: "q7",
        data: { militaryRank: "hauptmann" },
      },
      {
        label:
          "Stabsoffizier (Oberstleutnant–Oberst) — Logistik ist eine Leidenschaft",
        next: "q7",
        data: { militaryRank: "oberst" },
      },
      {
        label: "Generalsrang (Brigadier oder höher) — die Epauletten sind echt",
        next: "q7",
        data: { militaryRank: "brigadier" },
      },
    ],
  },
  // ── BEAMTE ───────────────────────────────────────────
  {
    id: "q7",
    text: "Waren Sie im öffentlichen Dienst tätig?",
    sub: "Verwaltung, Ministerium, Amt. Mit Pensionsanspruch und der beruhigenden Gewissheit, nicht gekündigt werden zu können.",
    options: [
      { label: "Ja, und ich habe es nie bereut", next: "q8" },
      {
        label: "Nein, ich war anderswo — oder zumindest beschäftigt",
        next: "q9",
      },
    ],
  },
  {
    id: "q8",
    text: "Auf welcher Stufe der Beamtenhierarchie?",
    sub: "Das System kennt die Akten. Ehrlichkeit wird empfohlen.",
    options: [
      {
        label: "Amtsdirektor — bescheiden, aber ehrenwert",
        next: "q9",
        data: { civilRank: "amtsdirektor" },
      },
      {
        label: "Hofrat — der Klassiker; klingt nach mehr, als man erwartet",
        next: "q9",
        data: { civilRank: "hofrat" },
      },
      {
        label: "Ministerialrat — ein Wort, das Türen öffnet",
        next: "q9",
        data: { civilRank: "ministerialrat" },
      },
      {
        label:
          "Sektionschef — hier endet die Karriereleiter. Und das Formular.",
        next: "q9",
        data: { civilRank: "sektionschef" },
      },
    ],
  },
  // ── EHRUNGEN ─────────────────────────────────────────
  {
    id: "q9",
    text: "Wurden Sie jemals für etwas geehrt?",
    sub: "Österreich verleiht Ehrentitel für Verdienste — oder für beharrliche Netzwerkpflege. Das System fragt nicht nach dem Unterschied.",
    options: [
      { label: "Ja", next: "q10" },
      { label: "Nicht dass ich wüsste", next: "REVEAL" },
    ],
  },
  {
    id: "q10",
    text: "Was genau wurde Ihnen verliehen?",
    sub: "Bitte so wählen, wie es im Dekret steht.",
    options: [
      {
        label: "Kommerzialrat (KommR) — wirtschaftliche Verdienste",
        next: "REVEAL",
        data: { honorary: "kommerzialrat" },
      },
      {
        label: "Ökonomierat (ÖR) — regionale oder landwirtschaftliche Beiträge",
        next: "REVEAL",
        data: { honorary: "oekonomicrat" },
      },
      {
        label: "Ehrendoktorat (h.c.) — die Universität fand Sie bemerkenswert",
        next: "REVEAL",
        data: { honorary: "honorary_doc" },
      },
      {
        label: "Sonstiger regionaler Ehrentitel",
        next: "REVEAL",
        data: { honorary: "regional" },
      },
    ],
  },
];

const MAX_PATH = 11;

const THINKING_MSGS = [
  "Abgleich mit dem Bundestitelregister…",
  "Konsultation der Wirtschaftskammerarchive…",
  "Überprüfung der Qualifikationen beim Universitätssenat…",
  "Überprüfung der Dienstgradäquivalente (Anhang VII-b)…",
  "Auswertung des Beamtenhandbuchs, §42c, Abs. 3…",
  "Prestigeberechnung läuft. Bitte warten…",
  "Normalisierung der Titelreihenfolge gemäß Formularfeldstandards…",
  "Konsultation des Bundesministeriums für Inneres…",
  "Titelkumulierungsprotokoll wird angewendet…",
  "Abschließende bürokratische Verifikation läuft…",
];

let wState = {};
let wHistory = [];
let wCurrentId = "q1";
let wThinkIdx = 0;

function getStep(id) {
  return STEPS.find((s) => s.id === id);
}

function updateProgress(done) {
  const container = document.getElementById("wizard-progress");
  container.innerHTML = "";
  const answered = wHistory.length;
  for (let i = 0; i < MAX_PATH; i++) {
    const d = document.createElement("div");
    let cls = "p-step";
    if (done) cls += " done";
    else if (i < answered) cls += " done";
    else if (i === answered) cls += " current";
    d.className = cls;
    container.appendChild(d);
  }
}

function renderQuestion(id) {
  wCurrentId = id;
  const step = getStep(id);
  if (!step) return;

  updateProgress(false);

  const card = document.getElementById("wizard-card");
  card.innerHTML = `
    <div class="wz-step-label">SCHRITT ${wHistory.length + 1}</div>
    <div class="wz-question">${step.text}</div>
    <div class="wz-sub">${step.sub}</div>
    <div class="wz-options">
      ${step.options
        .map(
          (o, i) =>
            `<button class="wz-opt" onclick="wizardChoose(${i})">${o.label}</button>`,
        )
        .join("")}
    </div>
  `;

  card.classList.remove("slide-up");
  void card.offsetWidth;
  card.classList.add("slide-up");

  card.style.display = "";
  document.getElementById("wizard-thinking").classList.remove("visible");
  document.getElementById("wizard-result").classList.remove("visible");
}

function wizardChoose(optIdx) {
  const step = getStep(wCurrentId);
  const opt = step.options[optIdx];

  if (opt.data) {
    for (const [k, v] of Object.entries(opt.data)) {
      if (k === "_extra") {
        if (!wState.extra) wState.extra = [];
        wState.extra.push(v);
      } else {
        wState[k] = v;
      }
    }
  }

  wHistory.push(wCurrentId);
  const next = opt.next;
  showThinking(next === "REVEAL" ? showResult : () => renderQuestion(next));
}

function showThinking(callback) {
  document.getElementById("wizard-card").style.display = "none";
  const el = document.getElementById("wizard-thinking");
  document.getElementById("thinking-msg").textContent =
    THINKING_MSGS[wThinkIdx % THINKING_MSGS.length];
  wThinkIdx++;
  el.classList.add("visible");
  setTimeout(callback, 950);
}

function showResult() {
  document.getElementById("wizard-thinking").classList.remove("visible");

  const { fullTitle, prestige, explanations } = resolveTitles(wState);
  const rank = prestigeRank(prestige);
  const result = document.getElementById("wizard-result");
  result.innerHTML = `
    <div class="result-header">— DAS SYSTEM HAT FESTGESTELLT —</div>

    <div class="result-title-box stamp-animate">
      <div class="result-title-lbl">IHR OFFIZIELLER ÖSTERREICHISCHER TITEL</div>
      <div class="result-title-text">${fullTitle}</div>
      <div class="result-rank-stamp">${rank.label}</div>
    </div>

    <div class="result-prestige-box">
      <div>
        <div class="prestige-lbl">PRESTIGEPUNKTE</div>
        <div class="prestige-val">${prestige} Pkt.</div>
      </div>
      <div class="prestige-desc">${rank.desc}</div>
    </div>

    <div class="result-breakdown">
      <div class="breakdown-lbl">SO WURDE DIESER TITEL ERMITTELT</div>
      ${
        explanations.length > 0
          ? explanations
              .map((e) => `<div class="breakdown-item">${e}</div>`)
              .join("")
          : `<div class="breakdown-item" style="font-style:italic;color:#aaa;">Keine formellen Titel erkannt. Sie sind, an diesem Punkt, schlicht eine Person. Auch das ist gültig.</div>`
      }
    </div>

    <div class="result-actions">
      <button class="btn-act btn-primary" id="wz-copy-btn" onclick="wizardCopy()">TITEL KOPIEREN</button>
      <button class="btn-act btn-secondary" onclick="wizardRestart()">VON VORNE</button>
    </div>
  `;

  result.classList.add("visible");
  updateProgress(true);
}

function wizardCopy() {
  const { fullTitle } = resolveTitles(wState);
  navigator.clipboard.writeText(fullTitle).catch(() => {});
  const btn = document.getElementById("wz-copy-btn");
  btn.textContent = "KOPIERT ✓";
  setTimeout(() => {
    btn.textContent = "TITEL KOPIEREN";
  }, 2000);
}

function wizardRestart() {
  wState = {};
  wHistory = [];
  wThinkIdx = 0;
  document.getElementById("wizard-result").classList.remove("visible");
  renderQuestion("q1");
}

// Init
renderQuestion("q1");
