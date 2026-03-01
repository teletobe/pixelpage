/* ===========================================
   app.js — Application state, DOM references,
   language system, init(), and event wiring.

   Loaded last — calls functions from the other
   JS files once the DOM is ready.
   =========================================== */

// ---- Shared state (referenced by scene.js, photobook.js, etc.) ----

let currentScene = "about";
let currentPhotoIndex = 0;
let isTransitioning = false;
let speechBubbleTimeout = null;
let currentLang = localStorage.getItem("pixpage-lang") || "en";

// ---- DOM references (assigned in init) ----

let navButtons, character, backgroundLayers, contentSections;
let photobookModal, openPhotobookBtn, closePhotobookBtn;
let experienceModal, openExperienceBtn, closeExperienceBtn;
let roomModal, closeRoomBtn, roomTitleEl, roomProjectsEl, roomButtons;
let backgroundLayer;
let speechBubble;
let grassContainer = null;

// Game Boy overlay refs
let gbOverlay, gbLeftBtn, gbRightBtn, gbSceneDots, gbLangBtn;

// ---- Scene order (used for GB prev/next navigation) ----
const GB_SCENES = ["about", "photography", "university", "contact"];

// ---- Language System ----

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("pixpage-lang", lang);

  // Plain-text elements
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // HTML elements (containing <br> etc.)
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Swap language-dependent data objects
  speechBubbleMessages =
    lang === "de" ? speechBubbleMessages_de : speechBubbleMessages_en;
  universityProjects =
    lang === "de" ? universityProjects_de : universityProjects_en;

  updateSpeechBubble(currentScene);

  // Sync both lang-toggle buttons
  const toggleLabel = lang === "en" ? "DE" : "EN";
  if (document.getElementById("lang-toggle"))
    document.getElementById("lang-toggle").textContent = toggleLabel;
  if (gbLangBtn) gbLangBtn.textContent = toggleLabel;

  // Re-render room modal if it's open during a language switch
  if (roomModal && roomModal.classList.contains("active")) {
    const currentRoomId = roomTitleEl.dataset.currentRoom;
    if (currentRoomId) {
      openRoomModal(currentRoomId);
    }
  }

  document.documentElement.lang = lang;
}

// ---- Game Boy helpers ----

const GB_SCENE_LABELS = {
  about: "ABOUT",
  photography: "PHOTOS",
  university: "WORK",
  contact: "CONTACT",
};

function updateGbSceneDots(sceneName) {
  if (!gbSceneDots) return;
  gbSceneDots.forEach((dot) => {
    dot.classList.toggle("active", dot.dataset.gbScene === sceneName);
  });
}

function updateGbSceneName(sceneName) {
  const label = document.getElementById("gb-scene-name");
  if (label) label.textContent = GB_SCENE_LABELS[sceneName] || sceneName.toUpperCase();
}

function setGbButtonsDisabled(disabled) {
  if (!gbLeftBtn || !gbRightBtn) return;
  gbLeftBtn.classList.toggle("disabled", disabled);
  gbRightBtn.classList.toggle("disabled", disabled);
}

// Called by scene.js hook after each transition completes
function onSceneArrival(sceneName) {
  updateGbSceneDots(sceneName);
  updateGbSceneName(sceneName);
  setGbButtonsDisabled(false);
}

// ---- Return to landing page ----

function goBackToLanding() {
  if (!gbOverlay) return;
  gbOverlay.classList.remove("active");
  const landing = document.getElementById("landing-page");
  landing.style.display = "";
  // small delay so display takes effect before opacity transition
  requestAnimationFrame(() => landing.classList.remove("exiting"));
}

function navigatePrevScene() {
  if (isTransitioning) return;
  const idx = GB_SCENES.indexOf(currentScene);
  if (idx > 0) {
    setGbButtonsDisabled(true);
    navigateToScene(GB_SCENES[idx - 1]);
  }
}

function navigateNextScene() {
  if (isTransitioning) return;
  const idx = GB_SCENES.indexOf(currentScene);
  if (idx < GB_SCENES.length - 1) {
    setGbButtonsDisabled(true);
    navigateToScene(GB_SCENES[idx + 1]);
  }
}

// ---- Landing page → game transition ----

function enterGame() {
  const landing = document.getElementById("landing-page");
  landing.classList.add("exiting");

  setTimeout(() => {
    landing.style.display = "none";

    // Show Game Boy overlay
    gbOverlay = document.getElementById("gameboy-overlay");
    gbOverlay.classList.add("active");

    // Hide the original pixel-nav (Game Boy strip takes over navigation)
    const pixelNav = document.getElementById("pixel-nav");
    if (pixelNav) pixelNav.style.display = "none";

    // Wire up Game Boy controls now that overlay is visible
    initGbControls();
  }, 850);
}

function initGbControls() {
  gbLeftBtn   = document.getElementById("gb-left");
  gbRightBtn  = document.getElementById("gb-right");
  gbSceneDots = document.querySelectorAll(".gb-scene-dot");
  gbLangBtn   = document.getElementById("gb-lang-toggle");

  if (gbLeftBtn)  gbLeftBtn.addEventListener("click", navigatePrevScene);
  if (gbRightBtn) gbRightBtn.addEventListener("click", navigateNextScene);

  // Scene dots act as direct scene links
  gbSceneDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      if (!isTransitioning) {
        setGbButtonsDisabled(true);
        navigateToScene(dot.dataset.gbScene);
      }
    });
  });

  // Language toggle in the GB frame
  if (gbLangBtn) {
    // Sync label to current language (in case it was set before entering)
    gbLangBtn.textContent = currentLang === "en" ? "DE" : "EN";
    gbLangBtn.addEventListener("click", () => {
      const newLang = currentLang === "en" ? "de" : "en";
      applyLanguage(newLang);
    });
  }

  // GoBack brand button
  const gbBackBtn = document.getElementById("gb-back-btn");
  if (gbBackBtn) {
    gbBackBtn.addEventListener("click", goBackToLanding);
  }

  // Sync dots and scene label to current scene
  updateGbSceneDots(currentScene);
  updateGbSceneName(currentScene);

  // Keyboard: arrow keys control left/right
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft")  navigatePrevScene();
    if (e.key === "ArrowRight") navigateNextScene();
  });
}

// ---- Initialization ----

function init() {
  preloadImages();

  // Scroll to top (fixes mobile starting at bottom)
  window.scrollTo(0, 0);
  setTimeout(() => window.scrollTo(0, 0), 100);

  // Cache DOM references
  navButtons = document.querySelectorAll(".nav-btn");
  character = document.getElementById("character");
  backgroundLayers = document.querySelectorAll(".background-layer");
  contentSections = document.querySelectorAll(".content-section");
  backgroundLayer = document.getElementById("background-layer");

  photobookModal = document.getElementById("photobook-modal");
  openPhotobookBtn = document.getElementById("open-photobook");
  closePhotobookBtn = document.getElementById("close-photobook");

  experienceModal = document.getElementById("experience-modal");
  openExperienceBtn = document.getElementById("open-experience");
  closeExperienceBtn = document.getElementById("close-experience");

  roomModal = document.getElementById("room-modal");
  closeRoomBtn = document.getElementById("close-room");
  roomTitleEl = document.getElementById("room-title");
  roomProjectsEl = document.getElementById("room-projects");
  roomButtons = document.querySelectorAll(".uni-room");

  speechBubble = document.getElementById("speech-bubble");

  // Initial UI state
  document.querySelector('[data-scene="about"]').classList.add("active");
  character.classList.add("idle", "face-right");
  updateSpeechBubble(currentScene);

  // Character click → speech bubble
  const clickTarget = document.getElementById("character-click-target");
  clickTarget.addEventListener("click", showSpeechBubble);

  // World setup
  initializeBackground();
  grassContainer = document.getElementById("grass-container");
  initGrassTiles();

  // ---- Event Listeners ----

  // Original nav buttons still work (visible before entering game mode)
  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => navigateToScene(btn.dataset.scene));
  });

  if (openPhotobookBtn) {
    openPhotobookBtn.addEventListener("click", openPhotobook);
  }

  if (closePhotobookBtn) {
    closePhotobookBtn.addEventListener("click", closePhotobook);
  }

  if (openExperienceBtn) {
    openExperienceBtn.addEventListener("click", openExperience);
  }

  if (closeExperienceBtn) {
    closeExperienceBtn.addEventListener("click", closeExperience);
  }

  roomButtons.forEach((room) => {
    room.addEventListener("click", () => openRoomModal(room.id));
  });

  if (closeRoomBtn) {
    closeRoomBtn.addEventListener("click", closeRoomModal);
  }

  // Close modals on backdrop click
  if (photobookModal) {
    photobookModal.addEventListener("click", (e) => {
      if (e.target === photobookModal) closePhotobook();
    });
  }

  if (experienceModal) {
    experienceModal.addEventListener("click", (e) => {
      if (e.target === experienceModal) closeExperience();
    });
  }

  if (roomModal) {
    roomModal.addEventListener("click", (e) => {
      if (e.target === roomModal) closeRoomModal();
    });
  }

  // Keyboard shortcuts (Escape for modals)
  document.addEventListener("keydown", (e) => {
    if (photobookModal && photobookModal.classList.contains("active")) {
      if (e.key === "Escape") closePhotobook();
    }
    if (experienceModal && experienceModal.classList.contains("active")) {
      if (e.key === "Escape") closeExperience();
    }
    if (roomModal && roomModal.classList.contains("active")) {
      if (e.key === "Escape") closeRoomModal();
    }
  });

  // Recalculate on resize
  window.addEventListener("resize", () => {
    const currentIndex = sceneOrder[currentScene];
    if (currentIndex === 0) {
      initializeBackground();
    } else {
      initializeBackground();
      animateBackgroundToScene(currentIndex, 0);
    }
    initGrassTiles();
  });

  // Original language toggle (pre-game-mode)
  const langToggle = document.getElementById("lang-toggle");
  if (langToggle) {
    langToggle.addEventListener("click", () => {
      const newLang = currentLang === "en" ? "de" : "en";
      applyLanguage(newLang);
    });
  }

  // Landing page ENTER button
  const enterBtn = document.getElementById("enter-btn");
  if (enterBtn) {
    enterBtn.addEventListener("click", enterGame);
  }

  applyLanguage(currentLang);
}

// ---- Bootstrap ----

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

console.log(`
    \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557
    \u2551   PIXEL PORTFOLIO v1.0            \u2551
    \u2551   Welcome to my retro world! \ud83c\udfae   \u2551
    \u255a\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255d

    Built with pure HTML, CSS, and JS
    No frameworks, just pixel vibes \u2728
`);
