// State Management
let currentScene = "about";
let currentPhotoIndex = 0;
let isTransitioning = false;
let speechBubbleTimeout = null;
let currentLang = localStorage.getItem("pixpage-lang") || "en";

// Static translations for HTML content
const translations = {
  en: {
    "nav.about": "ABOUT",
    "nav.photobook": "PHOTOBOOK",
    "nav.experience": "EXPERIENCE",
    "nav.contact": "CONTACT",
    "lang.toggle": "DE",
    "about.title": "WELCOME!",
    "about.greeting": "Hi! I'm Tobi :) (he/him)",
    "about.description":
      "Welcome to my website! Navigate through different areas to explore my work and interests. Use the buttons above to travel to different locations!",
    "about.level.label": "LEVEL:",
    "about.level.value":
      "Recently graduated MSc. Media & Human-Centred Computing",
    "about.interests.label": "INTERESTS:",
    "about.interests.value":
      "Interactive & Immersive Media, AI, Ethics, Photography",
    "photography.button": "OPEN PHOTOBOOK",
    "experience.button": "EXPLORE EDUCATION & EXPERIENCE",
    "experience.title": "EDUCATION & EXPERIENCE",
    "room.bsc.title": "BSc. INFORMATICS",
    "room.bsc.summary":
      "Computer sciences foundation. (University Innsbruck, 2022).",
    "room.bsc.desc1":
      "I completed my bachelor's degree in Computer Science at the University Innsbruck in 2022.<br />",
    "room.bsc.desc2":
      "It provided a solid foundation in programming, algorithms, and software development.",
    "room.bsc.desc3": "Click to explore what it thought me!",
    "room.msc.title": "MSc. HUMAN-CENTRED COMPUTING",
    "room.msc.desc.mobile": "Graduated from TU Wien, 2026:",
    "room.msc.desc":
      "I graduated from this multidisciplinary master's program at TU Wien in 2026.",
    "room.userresearch.title": "USER RESEARCH",
    "room.interactive.title": "INTERACTIVE MEDIA",
    "room.critical.title": "CRITICAL REFLECTION",
    "room.automation.title": "TEST AUTOMATION",
    "room.automation.summary": "Internship at Becton Dickinson.",
    "room.automation.desc1":
      "Click to see where I obtained professional work experience in IT.",
    "room.automation.desc2":
      "Experience in automated testing frameworks and quality assurance during an internship at a medical technology company.",
    "room.diversity.title": "GENDER & DIVERSITY COMPETENCES",
    "room.diversity.summary": "Certificate at TU Wien with STS classes.",
    "room.diversity.desc":
      "A Certificate in gender and diversity competences. Attended classes on STS. Click to learn what it encompassed.",
    "contact.title": "GET IN TOUCH",
    "contact.text": "Let's connect!",
    "contact.email": "EMAIL",
  },
  de: {
    "nav.about": "\u00dcBER MICH",
    "nav.photobook": "FOTOBUCH",
    "nav.experience": "ERFAHRUNG",
    "nav.contact": "KONTAKT",
    "lang.toggle": "EN",
    "about.title": "WILLKOMMEN!",
    "about.greeting": "Hi! Ich bin Tobi :)",
    "about.description":
      "Willkommen auf meiner Website! Navigiere durch verschiedene Bereiche, um meine Arbeiten zu erkunden. Benutze die Buttons oben!",
    "about.level.label": "STUFE:",
    "about.level.value":
      "K\u00fcrzlich abgeschlossen: MSc. Media & Human-Centred Computing",
    "about.interests.label": "INTERESSEN:",
    "about.interests.value":
      "Interaktive & Immersive Medien, KI, Ethik, Fotografie",
    "photography.button": "FOTOBUCH \u00d6FFNEN",
    "experience.button": "AUSBILDUNG & ERFAHRUNG ENTDECKEN",
    "experience.title": "AUSBILDUNG & ERFAHRUNG",
    "room.bsc.title": "BSc. INFORMATIK",
    "room.bsc.summary":
      "Informatik-Grundlagen. (Universit\u00e4t Innsbruck, 2022).",
    "room.bsc.desc1":
      "Ich habe meinen Bachelor in Informatik an der Universit\u00e4t Innsbruck im Jahr 2022 abgeschlossen.<br />",
    "room.bsc.desc2":
      "Er bot eine solide Grundlage in Programmierung, Algorithmen und Softwareentwicklung.",
    "room.bsc.desc3": "Klicke, um zu entdecken, was ich gelernt habe!",
    "room.msc.title": "MSc. HUMAN-CENTRED COMPUTING",
    "room.msc.desc.mobile": "Abschluss an der TU Wien, 2026:",
    "room.msc.desc":
      "Ich habe dieses interdisziplin\u00e4re Masterprogramm an der TU Wien im Jahr 2026 abgeschlossen.",
    "room.userresearch.title": "NUTZERFORSCHUNG",
    "room.interactive.title": "INTERAKTIVE MEDIEN",
    "room.critical.title": "KRITISCHE REFLEXION",
    "room.automation.title": "TESTAUTOMATISIERUNG",
    "room.automation.summary": "Praktikum bei Becton Dickinson.",
    "room.automation.desc1":
      "Klicke, um zu sehen, wo ich professionelle Berufserfahrung in der IT gesammelt habe.",
    "room.automation.desc2":
      "Erfahrung in automatisierten Test-Frameworks und Qualit\u00e4tssicherung w\u00e4hrend eines Praktikums bei einem Medizintechnik-Unternehmen.",
    "room.diversity.title": "GENDER & DIVERSIT\u00c4TSKOMPETENZEN",
    "room.diversity.summary": "Zertifikat an der TU Wien mit STS-Kursen.",
    "room.diversity.desc":
      "Ein Zertifikat in Gender- und Diversit\u00e4tskompetenzen. Kurse zu STS besucht. Klicke, um mehr dar\u00fcber zu erfahren.",
    "contact.title": "KONTAKT",
    "contact.text": "Schreib mir gern! :)",
    "contact.email": "E-MAIL",
  },
};

// Speech bubble messages for each scene
const speechBubbleMessages_en = {
  about: "Hi! I'm Tobi :)",
  photography: "Check out my photos!",
  university: "My professional experiences",
  contact: "Let's connect!",
};

const speechBubbleMessages_de = {
  about: "Hi! Ich bin Tobi :)",
  photography: "Schau dir meine Fotos an!",
  university: "Meine beruflichen Erfahrungen :)",
  contact: "Schreib mir gern! :)",
};

let speechBubbleMessages = speechBubbleMessages_en;

// Scene order for calculating distance
const sceneOrder = {
  about: 0,
  photography: 1,
  university: 2,
  contact: 3,
};

// Photo portfolio data
const photos = [
  { src: "img/photobook/pf1.jpg", caption: "Photo 1" },
  { src: "img/photobook/pf2.jpg", caption: "Photo 2" },
  { src: "img/photobook/pf3.jpg", caption: "Photo 3" },
  { src: "img/photobook/pf4.jpg", caption: "Photo 4" },
  { src: "img/photobook/pf5.jpg", caption: "Photo 5" },
  { src: "img/photobook/pf6.jpg", caption: "Photo 6" },
  { src: "img/photobook/pf7.jpg", caption: "Photo 7" },
  { src: "img/photobook/pf8.jpg", caption: "Photo 8" },
  { src: "img/photobook/pf9.jpg", caption: "Photo 9" },
  { src: "img/photobook/pf10.jpg", caption: "Photo 10" },
  { src: "img/photobook/pf11.jpg", caption: "Photo 11" },
  { src: "img/photobook/pf12.jpg", caption: "Photo 12" },
  { src: "img/photobook/pf13.jpg", caption: "Photo 13" },
  { src: "img/photobook/pf14.jpg", caption: "Photo 14" },
  { src: "img/photobook/pf15.jpg", caption: "Photo 15" },
  { src: "img/photobook/pf16.jpg", caption: "Photo 16" },
  { src: "img/photobook/pf17.jpg", caption: "Photo 17" },
  { src: "img/photobook/pf18.jpg", caption: "Photo 18" },
  { src: "img/photobook/pf19.jpg", caption: "Photo 19" },
  { src: "img/photobook/pf20.jpg", caption: "Photo 20" },
  { src: "img/photobook/pf21.jpg", caption: "Photo 21" },
  { src: "img/photobook/pf22.jpg", caption: "Photo 22" },
  { src: "img/photobook/pf23.jpg", caption: "Photo 23" },
  { src: "img/photobook/pf24.jpg", caption: "Photo 24" },
  { src: "img/photobook/pf25.jpg", caption: "Photo 25" },
  { src: "img/photobook/pf26.jpg", caption: "Photo 26" },
  { src: "img/photobook/pf27.jpg", caption: "Photo 27" },
  { src: "img/photobook/pf28.jpg", caption: "Photo 28" },
];

// University projects data - CUSTOMIZE WITH YOUR PROJECTS
const universityProjects_en = {
  "room-bsc": {
    title: "BSc. INFORMATICS",
    projects: [
      {
        name: "Competences",
        description:
          "Gained foundational knowledge in data structures & algorithms, math, operating systems, distributed systems. I developed programming skills during small projects in Java, C, Python, and R.",
      },
      {
        name: "Specialisation: Intelligent & Interactive Systems",
        description:
          "I specialised in the Interactive Graphics and Simulation group, focusing on machine learning and computer vision. During my studies, I also obtained the NVIDIA CUDA Deep Learning Certificate.",
      },
      {
        name: "Bachelor Thesis",
        description:
          "In my Thesis 'Map Synthesis for Low-Poly 3D Scenes using Generative Adversarial Networks' I applied GANs to intuitively create 3D worlds by sketching out the area of play. <a href='https://github.com/teletobe/map-synth-ba' target='_blank'>View this repo on GitHub</a>",
      },
    ],
  },
  "room-userresearch": {
    title: "USER RESEARCH",
    projects: [
      {
        name: "Vienna Cycling Infrastrcture",
        description:
          "Conducted a mixed-methods analysis of Vienna’s cycling infrastructure by combining forum discourse, quantitative infrastructure data, and Strava sensor data to evaluate cyclist experiences, identify improvement areas, and propose a transferable framework for urban mobility research.",
      },
      {
        name: "HCI in Health Care",
        description:
          "Empowering Patients through research towards a roadmap for developing an interactive patient-centered EHR system. Conducted Interviews and desiged a framework.",
      },
      {
        name: "Technology Integration in Cognitive Behavioural Therapy",
        description:
          "Scoping review to evaluate the implications of assisting technologies in CBT to explore potential strategies to address identified limitations.",
      },
    ],
  },
  "room-interactive": {
    title: "INTERACTIVE MEDIA",
    projects: [
      {
        name: "Interactive Design Projects",
        description:
          "<strong>PresentWrist:</strong> Hands-free presentation slide control using a M5StackC as a smartwatch. Project included IMU data processing and handheld design. <br/><br/><strong>Open Source Smart Thermostat Project:</strong> Using 3D prints and PCB boards to create a personal thermostat that can be programmed to individual likings. Included prototyping and publishing models. <br/><br/><strong>Bike Intent Signalling:</strong> Prototyping an intent signalling technology for bicycles. Features an app plus a microcontroller with buttons, vibration and sound to communicate turn signals and warn of dangers.",
      },
      {
        name: "Emergent Technologies",
        description:
          "<strong>Text2Image:</strong> lets users scan content they are reading (e.g. books or newspaper) and automatically generates an image that corresponds to the content. Using LLMs and image generation APIs. <br/><br /><strong>VR:</strong> Two player collaborative puzzle game in virtual reality. <br /><br/><strong>AR:</strong> Geography country guessing app in augmented reality.",
      },
    ],
  },
  "room-critical": {
    title: "CRITICAL REFLECTION",
    projects: [
      {
        name: "Socio-Technical-Systems",
        description:
          "Studied critical theory, socio-technical systems, and media communication to understand how technology, culture, and power interact. Gained tools to critically assess digital systems, social narratives, and their real-world impacts.",
      },
      {
        name: "Master Thesis: AI Ethics Auditing",
        description:
          "Employed in a research project at TU Wien to develop a stakeholder-centred approach in evaluation the ethics of AI. Created a methodology featuring a workshop and a webtool to elicit and translate ethical concerns from stakeholders into auditable artefacts, viewable in a prototype dashboard. <a href='https://github.com/teletobe/audit-share' target='_blank'>View this repo on GitHub</a><br/>Co-authored a workshop paper at CHI25 workshop, attended conferences and reviewed academic paper. ",
      },
    ],
  },
  "room-ai": {
    title: "AI ETHICS",
    projects: [
      {
        name: "Algorithmic Bias Research",
        description:
          "Examined bias in machine learning models and proposed frameworks for more equitable AI systems.",
      },
      {
        name: "AI Transparency Project",
        description:
          "Developed visualization tools to make AI decision-making processes more interpretable and accountable.",
      },
      {
        name: "Ethics Guidelines",
        description:
          "Co-authored ethical guidelines for responsible AI development in educational contexts.",
      },
    ],
  },
  "room-automation": {
    title: "TEST AUTOMATION",
    projects: [
      {
        name: "Manual and Automated Testing",
        description:
          "Gained hands-on experience during a four-month internship as a <strong>Test Automation Engineer</strong> at a medical technology company. <br /> Worked in an agile Scrum team on end-to-end tests for safety-critical infusion pump software. Responsibilities included manual system testing as well as developing and maintaining automated tests using <strong>C#</strong> and <strong>Cypress</strong> in a regulated environment.",
      },
      {
        name: "CI/CD DevOps",
        description:
          "Integrated automated tests into CI pipelines using GitHub Actions and managed test planning, documentation, and traceability with <strong>Azure DevOps</strong>. Participated in a formal verification phase where all test cases were systematically executed and documented, gaining insights into structured test concepts, defect analysis, CI/CD workflows, and DevOps processes.",
      },
    ],
  },
  "room-diversity": {
    title: "GENDER & DIVERSITY COMPETENCES",
    projects: [
      {
        name: "Courses",
        description:
          "Trained through courses on <strong>diversity skills and management, feminist technology studies, impacts of technology, and technology assessment,</strong> with an STS-based approach to analyzing how technologies shape social structures, organizations, and users.",
      },
    ],
  },
};

const universityProjects_de = {
  "room-bsc": {
    title: "BSc. INFORMATIK",
    projects: [
      {
        name: "Kompetenzen",
        description:
          "Grundlegende Kenntnisse in Datenstrukturen & Algorithmen, Mathematik, Betriebssystemen, verteilten Systemen erworben. Programmierf\u00e4higkeiten in kleinen Projekten in Java, C, Python und R entwickelt.",
      },
      {
        name: "Spezialisierung: Intelligente & Interaktive Systeme",
        description:
          "Ich hab meine Spezialisierung in der Gruppe f\u00fcr Interaktive Grafik und Simulation gemacht, mit Fokus auf maschinelles Lernen und Computer Vision. W\u00e4hrend meines Studiums habe ich auch das NVIDIA CUDA Deep Learning Zertifikat erworben.",
      },
      {
        name: "Bachelorarbeit",
        description:
          "In meiner Bachelorarbeit 'Map Synthesis for Low-Poly 3D Scenes using Generative Adversarial Networks' habe ich GANs angewendet, um intuitiv 3D-Welten durch Skizzieren des Spielbereichs zu erstellen. <a href='https://github.com/teletobe/map-synth-ba' target='_blank'>Dieses Repo auf GitHub ansehen</a>",
      },
    ],
  },
  "room-userresearch": {
    title: "USER-FORSCHUNG",
    projects: [
      {
        name: "Wiener Radinfrastruktur",
        description:
          "Eine Mixed-Methods-Analyse der Wiener Radinfrastruktur durchgef\u00fchrt, durch Kombination von Forumsdiskursen, quantitativen Infrastrukturdaten und Strava-Sensordaten zur Bewertung von Radfahrerlebnissen, Identifizierung von Verbesserungsbereichen und Vorschlag eines \u00fcbertragbaren Frameworks f\u00fcr urbane Mobilit\u00e4tsforschung.",
      },
      {
        name: "HCI im Gesundheitswesen",
        description:
          "Das Projekt sollte Patient:innen st\u00e4rken, durch Forschung an einer Roadmap zur Entwicklung eines interaktiven, patient:innenzentrierten EHR-Systems. Interviews durchgef\u00fchrt und ein Framework entworfen.",
      },
      {
        name: "Technologien in CBT",
        description:
          "Scoping Review zur Bewertung der Auswirkungen unterst\u00fctzender Technologien in der kognitiven Verhaltenstherapie, um potenzielle Strategien zur Bew\u00e4ltigung identifizierter Einschr\u00e4nkungen zu erforschen.",
      },
    ],
  },
  "room-interactive": {
    title: "INTERAKTIVE MEDIEN",
    projects: [
      {
        name: "UX",
        description:
          "<strong>PresentWrist:</strong> Freih\u00e4ndige Pr\u00e4sentationssteuerung mit einem M5StackC als Smartwatch. Projekt umfasste IMU-Datenverarbeitung und Handheld-Design. <br/><br/><strong>Open Source Smart Thermostat Projekt:</strong> Mit 3D-Drucken und PCB-Platinen einen pers\u00f6nlichen Thermostat erstellt, der individuell programmiert werden kann. Prototyping und Ver\u00f6ffentlichung der Modelle. <br/><br/><strong>Fahrrad Absichten Signalisierung:</strong> Prototypen f\u00fcr Fahrr\u00e4der. Mit App plus Mikrocontroller mit Tasten, Vibration und Sound zur Kommunikation von Abbiegesignalen und Gefahrenwarnungen.",
      },
      {
        name: "VR/AR und KI",
        description:
          "<strong>Text2Image:</strong> Erm\u00f6glicht Nutzern, gelesene Inhalte (z.B. B\u00fccher oder Zeitungen) zu scannen und automatisch ein passendes Bild zu generieren. Mit LLMs und Bildgenerierungs-APIs. <br/><br/><strong>VR:</strong> Kooperatives Zwei-Spieler-Puzzlespiel in virtueller Realit\u00e4t. <br/><br/><strong>AR:</strong> Geografie-L\u00e4nder-Ratespiel in erweiterter Realit\u00e4t.",
      },
    ],
  },
  "room-critical": {
    title: "KRITISCHE REFLEXION",
    projects: [
      {
        name: "Sozio-Technische-Systeme",
        description:
          "Auseinandersetzung mit Critical Theory, sozio-technische Systeme und Medienkommunikation, um zu verstehen, wie Technologie, Kultur und Macht interagieren. Dabei konnte ich Skills erlernen, um digitale Systeme, soziale Narrative und deren reale Auswirkungen kritisch zu bewerten.",
      },
      {
        name: "Masterarbeit: KI-Ethik-Auditing",
        description:
          "Ich war in einem Forschungsprojekt an der TU Wien angestellt, um einen stakeholder-zentrierten Ansatz zur Bewertung der Ethik von KI zu entwickeln. Eine Methodik mit Workshop und Webtool erstellt, um ethische Bedenken von Stakeholdern zu erheben und in \u00fcberpr\u00fcfbare Artefakte zu \u00fcbersetzen, darstellbar in einem Prototyp-Dashboard. <a href='https://github.com/teletobe/audit-share' target='_blank'>Dieses Repo auf GitHub ansehen</a><br/>Co-Autor eines Workshop-Papers bei CHI25, Konferenzteilnahme und akademische Paper-Reviews.",
      },
    ],
  },
  "room-ai": {
    title: "KI-ETHIK",
    projects: [
      {
        name: "Forschung zu algorithmischer Voreingenommenheit",
        description:
          "Untersuchung von Bias in Machine-Learning-Modellen und Vorschlag von Frameworks f\u00fcr gerechtere KI-Systeme.",
      },
      {
        name: "KI-Transparenzprojekt",
        description:
          "Visualisierungstools entwickelt, um KI-Entscheidungsprozesse interpretierbarer und nachvollziehbarer zu machen.",
      },
      {
        name: "Ethik-Richtlinien",
        description:
          "Co-Autor ethischer Richtlinien f\u00fcr verantwortungsvolle KI-Entwicklung im Bildungskontext.",
      },
    ],
  },
  "room-automation": {
    title: "TEST AUTOMATISIERUNG",
    projects: [
      {
        name: "Manuelles und Automatisiertes Testen",
        description:
          "Praktische Erfahrung w\u00e4hrend eines viermonatigen Praktikums als <strong>Test Automation Engineer</strong> bei einem Medizintechnik-Unternehmen gesammelt. <br /> In einem agilen Scrum-Team an End-to-End-Tests f\u00fcr sicherheitskritische Infusionspumpen-Software gearbeitet. Aufgaben umfassten manuelles Systemtesten sowie Entwicklung und Wartung automatisierter Tests mit <strong>C#</strong> und <strong>Cypress</strong> in einer regulierten Umgebung.",
      },
      {
        name: "CI/CD DevOps",
        description:
          "Automatisierte Tests in CI-Pipelines mit GitHub Actions integriert und Testplanung, Dokumentation und R\u00fcckverfolgbarkeit mit <strong>Azure DevOps</strong> verwaltet. An einer formalen Verifikationsphase teilgenommen, bei der alle Testf\u00e4lle systematisch ausgef\u00fchrt und dokumentiert wurden. Einblicke in strukturierte Testkonzepte, Fehleranalyse, CI/CD-Workflows und DevOps-Prozesse gewonnen.",
      },
    ],
  },
  "room-diversity": {
    title: "GENDER & DIVERSIT\u00c4TS- KOMPETENZEN",
    projects: [
      {
        name: "Uni-Kurse:",
        description:
          "Ich habe Kurse belegt in <strong>Diversit\u00e4tskompetenzen und -management, feministischen Technologiestudien, Auswirkungen von Technologie und Technikfolgenabsch\u00e4tzung,</strong> mit einem STS-basierten Ansatz zur Analyse, wie Technologien soziale Strukturen, Organisationen und Nutzer:innen pr\u00e4gen.",
      },
    ],
  },
};

let universityProjects = universityProjects_en;

// DOM Elements - will be initialized after DOM loads
let navButtons, character, backgroundLayers, contentSections;
let photobookModal, openPhotobookBtn, closePhotobookBtn;
let experienceModal, openExperienceBtn, closeExperienceBtn;
let prevPageBtn, nextPageBtn;
let leftPhoto1El, leftPhoto2El, rightPhoto1El, rightPhoto2El;
let leftCaption1El, leftCaption2El, rightCaption1El, rightCaption2El;
let currentPageEl, totalPagesEl;
let roomModal, closeRoomBtn, roomTitleEl, roomProjectsEl, roomButtons;
let backgroundLayer;
let speechBubble;

// Grass animation state
let grassContainer = null;
const GRASS_TILE_WIDTH = 384;
const TILES_PER_SCENE = 5; // Each scene is exactly 10 tiles apart

// Preload critical images to prevent flashing
function preloadImages() {
  const images = [
    "img/grass.png",
    "img/player/Walk.png",
    "img/player/Run.png",
    "img/player/Idle.png",
  ];
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

// Apply language to all translatable elements
function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("pixpage-lang", lang);

  // Update all data-i18n elements (plain text)
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update all data-i18n-html elements (HTML content with <br> etc.)
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Swap dynamic JS data objects
  speechBubbleMessages =
    lang === "de" ? speechBubbleMessages_de : speechBubbleMessages_en;
  universityProjects =
    lang === "de" ? universityProjects_de : universityProjects_en;

  // Update speech bubble text for current scene
  updateSpeechBubble(currentScene);

  // Re-render open room modal if language changes mid-viewing
  if (roomModal && roomModal.classList.contains("active")) {
    const currentRoomId = roomTitleEl.dataset.currentRoom;
    if (currentRoomId) {
      openRoomModal(currentRoomId);
    }
  }

  // Update HTML lang attribute
  document.documentElement.lang = lang;
}

// Initialize
function init() {
  // Preload images first
  preloadImages();

  // Force scroll to top on page load (fixes mobile starting at bottom)
  window.scrollTo(0, 0);
  // Backup scroll after a brief delay for mobile browsers
  setTimeout(() => window.scrollTo(0, 0), 100);

  // Get all DOM elements
  navButtons = document.querySelectorAll(".nav-btn");
  character = document.getElementById("character");
  backgroundLayers = document.querySelectorAll(".background-layer");
  contentSections = document.querySelectorAll(".content-section");
  backgroundLayer = document.getElementById("background-layer");

  // Photobook elements
  photobookModal = document.getElementById("photobook-modal");
  openPhotobookBtn = document.getElementById("open-photobook");
  closePhotobookBtn = document.getElementById("close-photobook");
  prevPageBtn = document.getElementById("prev-page");
  nextPageBtn = document.getElementById("next-page");
  leftPhoto1El = document.getElementById("left-photo-1");
  leftPhoto2El = document.getElementById("left-photo-2");
  rightPhoto1El = document.getElementById("right-photo-1");
  rightPhoto2El = document.getElementById("right-photo-2");
  leftCaption1El = document.getElementById("left-caption-1");
  leftCaption2El = document.getElementById("left-caption-2");
  rightCaption1El = document.getElementById("right-caption-1");
  rightCaption2El = document.getElementById("right-caption-2");
  currentPageEl = document.getElementById("current-page");
  totalPagesEl = document.getElementById("total-pages");

  // Experience modal elements
  experienceModal = document.getElementById("experience-modal");
  openExperienceBtn = document.getElementById("open-experience");
  closeExperienceBtn = document.getElementById("close-experience");

  // Room modal elements
  roomModal = document.getElementById("room-modal");
  closeRoomBtn = document.getElementById("close-room");
  roomTitleEl = document.getElementById("room-title");
  roomProjectsEl = document.getElementById("room-projects");
  roomButtons = document.querySelectorAll(".uni-room");

  // Speech bubble element
  speechBubble = document.getElementById("speech-bubble");

  // Set initial active states
  document.querySelector('[data-scene="about"]').classList.add("active");

  // Set character to idle initially, facing right
  character.classList.add("idle", "face-right");

  // Set initial speech bubble text
  updateSpeechBubble(currentScene);

  // Character click handler for speech bubble
  const clickTarget = document.getElementById("character-click-target");
  clickTarget.addEventListener("click", showSpeechBubble);

  // Initialize background size and position
  initializeBackground();

  // Initialize grass tiles
  grassContainer = document.getElementById("grass-container");
  initGrassTiles();

  // Set total pages
  totalPagesEl.textContent = photos.length;

  // Add event listeners
  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => navigateToScene(btn.dataset.scene));
  });

  // Photobook event listeners with null check
  if (openPhotobookBtn) {
    openPhotobookBtn.addEventListener("click", openPhotobook);
    console.log("Photobook button listener attached");
  } else {
    console.error("Photobook button not found!");
  }

  if (closePhotobookBtn) {
    closePhotobookBtn.addEventListener("click", closePhotobook);
  }

  // Experience modal event listeners
  if (openExperienceBtn) {
    openExperienceBtn.addEventListener("click", openExperience);
  }

  if (closeExperienceBtn) {
    closeExperienceBtn.addEventListener("click", closeExperience);
  }

  if (prevPageBtn) {
    prevPageBtn.addEventListener("click", prevPhoto);
  }

  if (nextPageBtn) {
    nextPageBtn.addEventListener("click", nextPhoto);
  }

  // Room event listeners
  roomButtons.forEach((room) => {
    room.addEventListener("click", () => openRoomModal(room.id));
  });

  if (closeRoomBtn) {
    closeRoomBtn.addEventListener("click", closeRoomModal);
  }

  // Close modals on background click
  photobookModal.addEventListener("click", (e) => {
    if (e.target === photobookModal) closePhotobook();
  });

  experienceModal.addEventListener("click", (e) => {
    if (e.target === experienceModal) closeExperience();
  });

  roomModal.addEventListener("click", (e) => {
    if (e.target === roomModal) closeRoomModal();
  });

  // Keyboard navigation for photobook
  document.addEventListener("keydown", (e) => {
    if (photobookModal.classList.contains("active")) {
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "Escape") closePhotobook();
    }
    if (experienceModal.classList.contains("active")) {
      if (e.key === "Escape") closeExperience();
    }
    if (roomModal.classList.contains("active")) {
      if (e.key === "Escape") closeRoomModal();
    }
  });

  // Handle window resize - reinitialize background and grass
  window.addEventListener("resize", () => {
    const currentIndex = sceneOrder[currentScene];
    if (currentIndex === 0) {
      // For scene 0, just reinitialize which positions correctly
      initializeBackground();
    } else {
      // For other scenes, reinitialize then reposition to current scene
      initializeBackground();
      animateBackgroundToScene(currentIndex, 0); // 0 duration for instant repositioning
    }

    // Reinitialize grass tiles for new viewport size
    initGrassTiles();
  });

  // Language toggle
  const langToggle = document.getElementById("lang-toggle");
  langToggle.addEventListener("click", () => {
    const newLang = currentLang === "en" ? "de" : "en";
    applyLanguage(newLang);
  });

  // Apply saved language on load
  applyLanguage(currentLang);
}

// Grass Tile System Functions

// Initialize grass tiles - create enough to fill viewport plus extras for longest transition
function initGrassTiles() {
  // Clear any existing tiles
  grassContainer.innerHTML = "";

  // Calculate how many tiles we need to cover the viewport PLUS max travel distance (3 scenes)
  const viewportWidth = window.innerWidth;
  const maxTravelDistance = 3 * TILES_PER_SCENE * GRASS_TILE_WIDTH; // Max distance for 3 scene jump
  const tilesNeeded =
    Math.ceil((viewportWidth + maxTravelDistance * 2) / GRASS_TILE_WIDTH) + 16; // Extra large buffer for mobile

  // Create tiles centered around position 0
  const centerIndex = Math.floor(tilesNeeded / 2);

  for (let i = 0; i < tilesNeeded; i++) {
    const tile = document.createElement("div");
    tile.className = "grass-tile";

    // Position tiles in a row, with the center tile at viewport center
    const offset = (i - centerIndex) * GRASS_TILE_WIDTH;
    tile.style.left = `calc(50% + ${offset}px - 64px)`; // -64px to center the 128px tile

    grassContainer.appendChild(tile);
  }

  // Reset container position
  grassContainer.style.transition = "transform 0ms linear";
  grassContainer.style.transform = "translateX(0)";
}

// Animate grass for scene transition
function animateGrassTransition(direction, distance) {
  // Calculate total distance to travel in pixels
  // distance = number of scenes (1, 2, or 3)
  // Each scene = 5 tiles
  const totalDistance = distance * TILES_PER_SCENE * GRASS_TILE_WIDTH;

  // Direction: right = negative translateX (tiles move left), left = positive translateX (tiles move right)
  const translateAmount =
    direction === "right" ? -totalDistance : totalDistance;

  // Just animate - tiles are already created with enough buffer in initGrassTiles
  grassContainer.style.transition = "transform 3000ms ease-out";
  grassContainer.style.transform = `translateX(${translateAmount}px)`;
}

// Reset grass after animation completes
function resetGrassPosition() {
  // Don't reinitialize tiles - just reset the transform instantly
  // Since grass tiles are uniform, the visual result is the same
  grassContainer.style.transition = "none";
  grassContainer.style.transform = "translateX(0)";

  // Force a reflow to apply the instant reset before re-enabling transitions
  grassContainer.offsetHeight;

  // Re-enable transitions for next animation
  grassContainer.style.transition = "transform 3000ms ease-out";
}

// Update speech bubble text based on current scene
function updateSpeechBubble(sceneName) {
  const bubbleText = speechBubble.querySelector(".bubble-text");
  if (bubbleText && speechBubbleMessages[sceneName]) {
    bubbleText.textContent = speechBubbleMessages[sceneName];
  }
}

// Show speech bubble when character is clicked
function showSpeechBubble() {
  if (isTransitioning) return;

  // Clear any existing timeout
  if (speechBubbleTimeout) {
    clearTimeout(speechBubbleTimeout);
  }

  // Show the speech bubble
  speechBubble.classList.add("visible");

  // Hide after 3 seconds
  speechBubbleTimeout = setTimeout(() => {
    speechBubble.classList.remove("visible");
  }, 3000);
}

// Scene Navigation
function navigateToScene(sceneName) {
  if (sceneName === currentScene) return;
  if (isTransitioning) return;

  // Lock navigation during transition
  isTransitioning = true;
  navButtons.forEach((btn) => btn.classList.add("disabled"));

  // Hide speech bubble during transition
  if (speechBubbleTimeout) {
    clearTimeout(speechBubbleTimeout);
  }
  speechBubble.classList.remove("visible");

  // Calculate distance and direction
  const currentIndex = sceneOrder[currentScene];
  const targetIndex = sceneOrder[sceneName];
  const distance = Math.abs(targetIndex - currentIndex);
  const direction = targetIndex > currentIndex ? "right" : "left";

  // Fixed transition time of 3 seconds
  const transitionTime = 3000;

  // Speed class based on distance (distance 2+ = faster animations)
  const speedClass = distance >= 2 ? "speed-fast" : "speed-normal";

  // Movement type based on distance (distance 2+ = running, distance 1 = walking)
  const movementType = distance >= 2 ? "running" : "walking";

  // Update navigation buttons
  navButtons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.scene === sceneName) {
      btn.classList.add("active");
    }
  });

  // Hide current content overlay
  contentSections.forEach((content) => content.classList.remove("active"));

  // Set character direction and speed
  character.classList.remove(
    "face-left",
    "face-right",
    "speed-normal",
    "speed-fast",
  );
  character.classList.add(direction === "right" ? "face-right" : "face-left");
  character.classList.add(speedClass);

  // Start movement animation (walking or running)
  character.classList.remove("idle", "walking", "running");
  character.classList.add(movementType);

  // Animate background to target position
  animateBackgroundToScene(targetIndex, transitionTime);

  // Animate grass tiles - travel exact distance
  animateGrassTransition(direction, distance);

  // After 3 seconds - arrive at destination
  setTimeout(() => {
    // Reset grass to center position
    resetGrassPosition();

    // Switch content overlay to new scene
    document.getElementById(`content-${sceneName}`).classList.add("active");

    // Stop movement, start idle animation
    character.classList.remove(
      "walking",
      "running",
      "speed-normal",
      "speed-fast",
    );
    character.classList.add("idle");

    // Update speech bubble text for new scene
    updateSpeechBubble(sceneName);

    currentScene = sceneName;

    // Unlock navigation
    isTransitioning = false;
    navButtons.forEach((btn) => btn.classList.remove("disabled"));
  }, transitionTime);
}

// Initialize background dimensions
function initializeBackground() {
  const layerContent = backgroundLayer.querySelector(".layer-content");
  const container = document.querySelector(".parallax-container");
  const containerHeight = container.clientHeight;
  const viewportWidth = container.clientWidth;

  // Background image is 1280x128
  // Scale to 45% of container height to show more of the image
  const scaleFactor = (containerHeight / 128) * 0.45;
  const scaledWidth = 1280 * scaleFactor;
  const scaledHeight = 128 * scaleFactor;

  // Make container 3x wider to allow background to extend left and right
  const containerWidth = scaledWidth * 3;
  layerContent.style.width = `${containerWidth}px`;
  layerContent.style.height = `${scaledHeight}px`;

  // Set background-size to scaled dimensions so it can repeat properly
  layerContent.style.backgroundSize = `${scaledWidth}px ${scaledHeight}px`;

  // Position so the character starts in the first area (offset by one background width to the right)
  const sectionWidth = 320 * scaleFactor;
  const initialPosition = -scaledWidth - sectionWidth / 2 + viewportWidth / 2;

  // Disable transition for instant positioning
  layerContent.style.transition = "transform 0ms linear";
  layerContent.style.transform = `translateX(${initialPosition}px)`;

  // Re-enable transition for future animations
  setTimeout(() => {
    layerContent.style.transition = "transform 3s ease-out";
  }, 0);
}

// Animate background to show the correct section for the scene
function animateBackgroundToScene(sceneIndex, duration) {
  const layerContent = backgroundLayer.querySelector(".layer-content");
  const container = document.querySelector(".parallax-container");
  const containerHeight = container.clientHeight;
  const viewportWidth = container.clientWidth;

  // Background image is 1280x128, scaled to 45% of container height
  // Scale factor to 45% of container height to show more of the image
  const scaleFactor = (containerHeight / 128) * 0.45;
  const scaledWidth = 1280 * scaleFactor;
  const scaledHeight = 128 * scaleFactor;

  // Make container 3x wider to allow background to extend left and right
  const containerWidth = scaledWidth * 3;
  layerContent.style.width = `${containerWidth}px`;
  layerContent.style.height = `${scaledHeight}px`;

  // Set background-size to scaled dimensions so it can repeat properly
  layerContent.style.backgroundSize = `${scaledWidth}px ${scaledHeight}px`;

  // Each section is 320px wide in the original image
  // After scaling: 320 * scaleFactor
  const sectionWidth = 320 * scaleFactor;

  // Target position: center of the section minus half viewport width
  // Account for the offset due to wider container
  const sectionCenter = sceneIndex * sectionWidth + sectionWidth / 2;
  const targetPosition = -scaledWidth - sectionCenter + viewportWidth / 2;

  // Apply transition with ease-out for smooth deceleration
  layerContent.style.transition = `transform ${duration}ms ease-out`;
  layerContent.style.transform = `translateX(${targetPosition}px)`;
}

// Photobook Functions
function openPhotobook() {
  photobookModal.classList.add("active");
  currentPhotoIndex = 0;
  displayPhotoSpread();
}

function closePhotobook() {
  photobookModal.classList.remove("active");
}

// Experience Modal Functions
function openExperience() {
  experienceModal.classList.add("active");
}

function closeExperience() {
  experienceModal.classList.remove("active");
}

function displayPhotoSpread() {
  // Display 4 photos at once (2 per page)
  const photoElements = [
    { img: leftPhoto1El, caption: leftCaption1El },
    { img: leftPhoto2El, caption: leftCaption2El },
    { img: rightPhoto1El, caption: rightCaption1El },
    { img: rightPhoto2El, caption: rightCaption2El },
  ];

  // Display each of the 4 photos
  photoElements.forEach((element, index) => {
    const photoIndex = currentPhotoIndex + index;

    if (photoIndex < photos.length) {
      const photo = photos[photoIndex];
      element.img.src = photo.src;
      element.img.alt = photo.caption;
      element.img.style.display = "block";
    } else {
      element.img.style.display = "none";
    }
  });

  // Update page counter
  const endPage = Math.min(currentPhotoIndex + 4, photos.length);
  currentPageEl.textContent = `${currentPhotoIndex + 1}-${endPage}`;

  // Update button states
  prevPageBtn.disabled = currentPhotoIndex === 0;
  nextPageBtn.disabled = currentPhotoIndex >= photos.length - 4;
}

function nextPhoto() {
  // Move forward by 4 photos (one spread)
  if (currentPhotoIndex < photos.length - 4) {
    currentPhotoIndex += 4;
    displayPhotoSpread();
    playPageTurnSound();
  }
}

function prevPhoto() {
  // Move backward by 4 photos (one spread)
  if (currentPhotoIndex >= 4) {
    currentPhotoIndex -= 4;
    displayPhotoSpread();
    playPageTurnSound();
  }
}

function playPageTurnSound() {
  // Optional: Add a page turn sound effect
  // const audio = new Audio('page-turn.mp3');
  // audio.play();
}

// University Room Modal Functions
function openRoomModal(roomId) {
  const roomData = universityProjects[roomId];
  if (!roomData) return;

  roomTitleEl.dataset.currentRoom = roomId;
  roomTitleEl.textContent = roomData.title;

  // Clear previous projects
  roomProjectsEl.innerHTML = "";

  // Check if this room should have all items expanded (Gender & Diversity)
  const alwaysExpanded = roomId === "room-diversity";

  // Add projects
  roomData.projects.forEach((project) => {
    const projectEl = document.createElement("div");
    // All collapsed by default, except room-diversity which stays expanded
    projectEl.className = `project-item${alwaysExpanded ? " expanded" : ""}`;
    projectEl.innerHTML = `
            <h3>${project.name}</h3>
            <div class="project-description">
              <p>${project.description}</p>
            </div>
        `;

    // Add click handler for accordion (not for always-expanded rooms)
    if (!alwaysExpanded) {
      projectEl.addEventListener("click", () => {
        const isExpanded = projectEl.classList.contains("expanded");

        // Collapse all other items
        roomProjectsEl.querySelectorAll(".project-item").forEach((item) => {
          item.classList.remove("expanded");
        });

        // Toggle this item (if it was collapsed, expand it; if expanded, leave collapsed)
        if (!isExpanded) {
          projectEl.classList.add("expanded");
        }
      });
    } else {
      // For always-expanded rooms, add a class to disable accordion styling
      projectEl.classList.add("no-accordion");
    }

    roomProjectsEl.appendChild(projectEl);
  });

  roomModal.classList.add("active");
}

function closeRoomModal() {
  roomModal.classList.remove("active");
}

// Start the application when DOM is fully loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  // DOM is already loaded
  init();
}

// Add some console art for fun
console.log(`
    ╔═══════════════════════════════════╗
    ║   PIXEL PORTFOLIO v1.0            ║
    ║   Welcome to my retro world! 🎮   ║
    ╚═══════════════════════════════════╝

    Built with pure HTML, CSS, and JS
    No frameworks, just pixel vibes ✨
`);
