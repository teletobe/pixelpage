/* ================================================================
   titles.js — Gemeinsames Titelsystem
   Shared by wizard, coord, and baukasten modes.
   ================================================================ */

const DB_LIMIT = 40;
const MAX_PRESTIGE = 55;

function resolveTitles(state) {
  const pre = [];
  const post = [];
  let prestige = 0;
  const explanations = [];

  // Beamte
  if (state.civilRank) {
    const ranks = {
      sektionschef: { t: "SektChef", p: 15, name: "Sektionschef" },
      ministerialrat: { t: "MinR", p: 11, name: "Ministerialrat" },
      hofrat: { t: "HR", p: 8, name: "Hofrat" },
    };
    if (ranks[state.civilRank]) {
      pre.push(ranks[state.civilRank].t);
      explanations.push(`Dienstgrad: ${ranks[state.civilRank].name}`);
      prestige += ranks[state.civilRank].p;
    }
  }

  // Ehrentitel
  if (state.honorary) {
    const honors = {
      kommerzialrat: { t: "KommR", p: 5, name: "Kommerzialrat" },
      oekonomicrat: { t: "ÖR", p: 4, name: "Ökonomierat" },
    };
    if (honors[state.honorary]) {
      pre.push(honors[state.honorary].t);
      explanations.push(`Ehrentitel: ${honors[state.honorary].name}`);
      prestige += honors[state.honorary].p;
    }
  }

  // Akademische Titel
  if (state.degreeLevel && state.degreeLevel !== "none") {
    const field = state.degreeField || "other";

    if (state.degreeLevel === "habilitation") {
      pre.push("Univ.-Prof. Dr.");
      explanations.push("Habilitation mit Universitätsprofessur");
      prestige += 15;
    } else if (state.degreeLevel === "doctorate") {
      const docts = {
        med: { abbr: "Dr. med.", name: "Doktor der Medizin" },
        tech: {
          abbr: "Dr. techn.",
          name: "Doktor der technischen Wissenschaften",
        },
        law: { abbr: "Dr. iur.", name: "Doktor der Rechtswissenschaften" },
        arts: { abbr: "Dr. phil.", name: "Doktor der Philosophie" },
      };
      const doc = docts[field] || { abbr: "Dr.", name: "Doktor" };
      pre.push(doc.abbr);
      explanations.push(doc.name);
      prestige += field === "med" ? 10 : 9;
    } else if (state.degreeLevel === "master") {
      if (field === "tech") {
        pre.push("Dipl.-Ing.");
        explanations.push("Diplom-Ingenieur");
        prestige += 6;
      } else if (field === "law") {
        pre.push("Mag. iur.");
        explanations.push("Magister der Rechtswissenschaften");
        prestige += 5;
      } else if (field === "arts") {
        pre.push("Mag. phil.");
        explanations.push("Magister der Philosophie");
        prestige += 5;
      } else {
        pre.push("Mag.");
        explanations.push("Magister");
        prestige += 5;
      }
    } else if (state.degreeLevel === "bachelor") {
      const bac = field === "tech" ? "BSc" : "BA";
      post.push(bac);
      explanations.push(`Bachelor (${bac})`);
      prestige += 2;
    }
  }

  // DDr
  if (state.extra && state.extra.includes("dr2")) {
    pre.push("DDr.");
    explanations.push("Inhaber zweier Doktorate");
    prestige += 9;
  }

  // Militär
  if (state.militaryRank) {
    const ranks = {
      vzlt: { t: "Vzlt.", p: 2, name: "Vizeleutnant" },
      hauptmann: { t: "Hptm.", p: 5, name: "Hauptmann" },
      oberst: { t: "Obst.", p: 8, name: "Oberst" },
      brigadier: { t: "Bgdr.", p: 13, name: "Brigadier" },
    };
    if (ranks[state.militaryRank]) {
      pre.push(ranks[state.militaryRank].t);
      explanations.push(
        `Militärischer Dienstgrad: ${ranks[state.militaryRank].name}`,
      );
      prestige += ranks[state.militaryRank].p;
    }
  }

  // Ing & MBA
  if (state.extra && state.extra.includes("ing")) {
    pre.push("Ing.");
    explanations.push("Ingenieur (Berufstitel)");
    prestige += 3;
  }
  if (state.extra && state.extra.includes("mba")) {
    post.push("MBA");
    explanations.push("Master of Business Administration");
    prestige += 4;
  }

  const name = "Max Mustermann";
  const preStr = pre.join(" ");
  const postStr = post.join(", ");

  let fullTitle;
  if (preStr && postStr) fullTitle = `${preStr} ${name}, ${postStr}`;
  else if (preStr) fullTitle = `${preStr} ${name}`;
  else if (postStr) fullTitle = `${name}, ${postStr}`;
  else fullTitle = name;

  return { fullTitle, prestige, explanations };
}

function prestigeRank(score) {
  if (score === 0)
    return {
      label: "Anonym",
      desc: "Ein unbeschriebenes Blatt. Nur ein Name. Auf seine Art tief österreichisch.",
    };
  if (score <= 4)
    return {
      label: "Durchschnittsbürger",
      desc: "Das Rückgrat der Gesellschaft. Erledigt Dinge, ohne sie anzukündigen.",
    };
  if (score <= 10)
    return {
      label: "Respektsperson",
      desc: "Lokal anerkannt. Bekommt beim Stammtisch ein respektvolles Nicken.",
    };
  if (score <= 18)
    return {
      label: "Würdenträger",
      desc: "Würdenträger. Visitenkarten erfordern eine etwas größere Schrift.",
    };
  if (score <= 28)
    return {
      label: "Ehrwürdige Exzellenz",
      desc: "Erhält persönliche Grüße vom Bürgermeister. Das Türschild hat eine eigene Zeile.",
    };
  if (score <= 40)
    return {
      label: "Legendäre Persönlichkeit",
      desc: "Das Formular stürzt ab. Die Datenbank klagt. Österreich verneigt sich leicht.",
    };
  return {
    label: "ÜBER-ÖSTERREICHER",
    desc: "Sie haben die Bürokratie selbst transzendiert. Das Datenbankfeld läuft über. Ein neues Formular wird gedruckt.",
  };
}

function titlesFromCoords(x, y) {
  const state = { extra: [] };

  if (x < 8) {
    state.degreeLevel = "none";
  } else if (x < 22) {
    state.degreeLevel = "bachelor";
    state.degreeField = "other";
  } else if (x < 40) {
    state.degreeLevel = "master";
    state.degreeField = "other";
  } else if (x < 58) {
    state.degreeLevel = "master";
    state.degreeField = "tech";
  } else if (x < 76) {
    state.degreeLevel = "doctorate";
    state.degreeField = x > 68 ? "tech" : "other";
  } else {
    state.degreeLevel = "habilitation";
    state.degreeField = "other";
  }

  if (x > 48 && y > 30 && y < 62) {
    state.extra.push("mba");
  }

  if (y < 12) {
    /* Privatperson */
  } else if (y < 26) {
    state.militaryRank = "vzlt";
  } else if (y < 42) {
    state.militaryRank = "hauptmann";
  } else if (y < 56) {
    state.civilRank = "hofrat";
  } else if (y < 70) {
    state.civilRank = "ministerialrat";
  } else if (y < 86) {
    state.civilRank = "sektionschef";
  } else {
    state.civilRank = "sektionschef";
    state.honorary = "kommerzialrat";
  }

  return resolveTitles(state);
}
