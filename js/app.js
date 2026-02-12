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
let prevPageBtn, nextPageBtn;
let leftPhoto1El, leftPhoto2El, rightPhoto1El, rightPhoto2El;
let leftCaption1El, leftCaption2El, rightCaption1El, rightCaption2El;
let currentPageEl, totalPagesEl;
let roomModal, closeRoomBtn, roomTitleEl, roomProjectsEl, roomButtons;
let backgroundLayer;
let speechBubble;
let grassContainer = null;

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

  // Re-render room modal if it's open during a language switch
  if (roomModal && roomModal.classList.contains("active")) {
    const currentRoomId = roomTitleEl.dataset.currentRoom;
    if (currentRoomId) {
      openRoomModal(currentRoomId);
    }
  }

  document.documentElement.lang = lang;
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

  totalPagesEl.textContent = photos.length;

  // ---- Event Listeners ----

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => navigateToScene(btn.dataset.scene));
  });

  if (openPhotobookBtn) {
    openPhotobookBtn.addEventListener("click", openPhotobook);
    console.log("Photobook button listener attached");
  } else {
    console.error("Photobook button not found!");
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

  if (prevPageBtn) {
    prevPageBtn.addEventListener("click", prevPhoto);
  }

  if (nextPageBtn) {
    nextPageBtn.addEventListener("click", nextPhoto);
  }

  roomButtons.forEach((room) => {
    room.addEventListener("click", () => openRoomModal(room.id));
  });

  if (closeRoomBtn) {
    closeRoomBtn.addEventListener("click", closeRoomModal);
  }

  // Close modals on backdrop click
  photobookModal.addEventListener("click", (e) => {
    if (e.target === photobookModal) closePhotobook();
  });

  experienceModal.addEventListener("click", (e) => {
    if (e.target === experienceModal) closeExperience();
  });

  roomModal.addEventListener("click", (e) => {
    if (e.target === roomModal) closeRoomModal();
  });

  // Keyboard shortcuts
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

  // Language toggle
  const langToggle = document.getElementById("lang-toggle");
  langToggle.addEventListener("click", () => {
    const newLang = currentLang === "en" ? "de" : "en";
    applyLanguage(newLang);
  });

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
