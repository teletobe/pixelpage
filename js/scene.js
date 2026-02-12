/* ===========================================
   scene.js — Scene navigation, parallax background,
   grass tile system, and speech bubble logic.

   Depends on: data.js (sceneOrder, speechBubbleMessages)
   Uses globals from app.js (state & DOM refs).
   =========================================== */

// Grass tile sizing (px). Each scene transition moves TILES_PER_SCENE tiles.
const GRASS_TILE_WIDTH = 384;
const TILES_PER_SCENE = 5;

// Pre-fetch sprites so they don't flash on first use
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

// ---- Grass Tile System ----

// Fill viewport + max travel distance with repeating grass tiles
function initGrassTiles() {
  grassContainer.innerHTML = "";

  const viewportWidth = window.innerWidth;
  const maxTravelDistance = 3 * TILES_PER_SCENE * GRASS_TILE_WIDTH;
  const tilesNeeded =
    Math.ceil((viewportWidth + maxTravelDistance * 2) / GRASS_TILE_WIDTH) + 16;

  const centerIndex = Math.floor(tilesNeeded / 2);

  for (let i = 0; i < tilesNeeded; i++) {
    const tile = document.createElement("div");
    tile.className = "grass-tile";

    const offset = (i - centerIndex) * GRASS_TILE_WIDTH;
    tile.style.left = `calc(50% + ${offset}px - 64px)`;

    grassContainer.appendChild(tile);
  }

  grassContainer.style.transition = "transform 0ms linear";
  grassContainer.style.transform = "translateX(0)";
}

// Slide grass left/right during a scene transition
function animateGrassTransition(direction, distance) {
  const totalDistance = distance * TILES_PER_SCENE * GRASS_TILE_WIDTH;
  const translateAmount =
    direction === "right" ? -totalDistance : totalDistance;

  grassContainer.style.transition = "transform 3000ms ease-out";
  grassContainer.style.transform = `translateX(${translateAmount}px)`;
}

// Snap grass back to center after the transition ends
function resetGrassPosition() {
  grassContainer.style.transition = "none";
  grassContainer.style.transform = "translateX(0)";

  // Force reflow before re-enabling transition
  grassContainer.offsetHeight;

  grassContainer.style.transition = "transform 3000ms ease-out";
}

// ---- Background Parallax ----

// Set initial background size/position based on viewport
function initializeBackground() {
  const layerContent = backgroundLayer.querySelector(".layer-content");
  const container = document.querySelector(".parallax-container");
  const containerHeight = container.clientHeight;
  const viewportWidth = container.clientWidth;

  // Background image is 1280x128; scale to 45 % of container height
  const scaleFactor = (containerHeight / 128) * 0.45;
  const scaledWidth = 1280 * scaleFactor;
  const scaledHeight = 128 * scaleFactor;

  const containerWidth = scaledWidth * 3;
  layerContent.style.width = `${containerWidth}px`;
  layerContent.style.height = `${scaledHeight}px`;
  layerContent.style.backgroundSize = `${scaledWidth}px ${scaledHeight}px`;

  const sectionWidth = 320 * scaleFactor;
  const initialPosition = -scaledWidth - sectionWidth / 2 + viewportWidth / 2;

  layerContent.style.transition = "transform 0ms linear";
  layerContent.style.transform = `translateX(${initialPosition}px)`;

  setTimeout(() => {
    layerContent.style.transition = "transform 3s ease-out";
  }, 0);
}

// Smoothly scroll background to the section matching sceneIndex
function animateBackgroundToScene(sceneIndex, duration) {
  const layerContent = backgroundLayer.querySelector(".layer-content");
  const container = document.querySelector(".parallax-container");
  const containerHeight = container.clientHeight;
  const viewportWidth = container.clientWidth;

  const scaleFactor = (containerHeight / 128) * 0.45;
  const scaledWidth = 1280 * scaleFactor;
  const scaledHeight = 128 * scaleFactor;

  const containerWidth = scaledWidth * 3;
  layerContent.style.width = `${containerWidth}px`;
  layerContent.style.height = `${scaledHeight}px`;
  layerContent.style.backgroundSize = `${scaledWidth}px ${scaledHeight}px`;

  // Each scene maps to a 320 px-wide section in the source image
  const sectionWidth = 320 * scaleFactor;
  const sectionCenter = sceneIndex * sectionWidth + sectionWidth / 2;
  const targetPosition = -scaledWidth - sectionCenter + viewportWidth / 2;

  layerContent.style.transition = `transform ${duration}ms ease-out`;
  layerContent.style.transform = `translateX(${targetPosition}px)`;
}

// ---- Speech Bubble ----

function updateSpeechBubble(sceneName) {
  const bubbleText = speechBubble.querySelector(".bubble-text");
  if (bubbleText && speechBubbleMessages[sceneName]) {
    bubbleText.textContent = speechBubbleMessages[sceneName];
  }
}

function showSpeechBubble() {
  if (isTransitioning) return;

  if (speechBubbleTimeout) {
    clearTimeout(speechBubbleTimeout);
  }

  speechBubble.classList.add("visible");

  speechBubbleTimeout = setTimeout(() => {
    speechBubble.classList.remove("visible");
  }, 3000);
}

// ---- Scene Navigation ----

function navigateToScene(sceneName) {
  if (sceneName === currentScene) return;
  if (isTransitioning) return;

  isTransitioning = true;
  navButtons.forEach((btn) => btn.classList.add("disabled"));

  // Hide speech bubble during walk
  if (speechBubbleTimeout) {
    clearTimeout(speechBubbleTimeout);
  }
  speechBubble.classList.remove("visible");

  const currentIndex = sceneOrder[currentScene];
  const targetIndex = sceneOrder[sceneName];
  const distance = Math.abs(targetIndex - currentIndex);
  const direction = targetIndex > currentIndex ? "right" : "left";

  const transitionTime = 3000;
  const speedClass = distance >= 2 ? "speed-fast" : "speed-normal";
  const movementType = distance >= 2 ? "running" : "walking";

  // Highlight target nav button
  navButtons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.scene === sceneName) {
      btn.classList.add("active");
    }
  });

  // Fade out current content
  contentSections.forEach((content) => content.classList.remove("active"));

  // Flip character & set animation speed
  character.classList.remove(
    "face-left",
    "face-right",
    "speed-normal",
    "speed-fast",
  );
  character.classList.add(direction === "right" ? "face-right" : "face-left");
  character.classList.add(speedClass);

  // Start walk/run
  character.classList.remove("idle", "walking", "running");
  character.classList.add(movementType);

  // Animate world layers
  animateBackgroundToScene(targetIndex, transitionTime);
  animateGrassTransition(direction, distance);

  // Arrive at destination
  setTimeout(() => {
    resetGrassPosition();

    document.getElementById(`content-${sceneName}`).classList.add("active");

    character.classList.remove(
      "walking",
      "running",
      "speed-normal",
      "speed-fast",
    );
    character.classList.add("idle");

    updateSpeechBubble(sceneName);

    currentScene = sceneName;

    isTransitioning = false;
    navButtons.forEach((btn) => btn.classList.remove("disabled"));
  }, transitionTime);
}
