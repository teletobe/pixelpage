// State Management
let currentScene = "about";
let currentPhotoIndex = 0;

// Speech bubble messages for each scene
const speechBubbleMessages = {
  about: "Hi! I'm Tobi :)",
  photography: "Check out my photos!",
  university: "My professional experiences",
  contact: "Let's connect!",
};

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
const universityProjects = {
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

// Initialize
function init() {
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
}

// Grass Tile System Functions

// Initialize grass tiles - create enough to fill viewport plus extras
function initGrassTiles() {
  // Clear any existing tiles
  grassContainer.innerHTML = "";

  // Calculate how many tiles we need to cover the viewport
  const viewportWidth = window.innerWidth;
  const tilesNeeded = Math.ceil(viewportWidth / GRASS_TILE_WIDTH) + 4; // Extra tiles for smooth edges

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
  // Each scene = 10 tiles = 1280px
  const totalDistance = distance * TILES_PER_SCENE * GRASS_TILE_WIDTH;

  // Direction: right = negative translateX (tiles move left), left = positive translateX (tiles move right)
  const translateAmount =
    direction === "right" ? -totalDistance : totalDistance;

  // Before animating, add more tiles in the direction of travel if needed
  const viewportWidth = window.innerWidth;
  const tilesNeeded =
    Math.ceil((viewportWidth + totalDistance) / GRASS_TILE_WIDTH) + 6;
  const currentTiles = grassContainer.children.length;

  if (tilesNeeded > currentTiles) {
    const tilesToAdd = tilesNeeded - currentTiles;
    const centerIndex = Math.floor(currentTiles / 2);

    // Add tiles in the direction of travel
    for (let i = 0; i < tilesToAdd; i++) {
      const tile = document.createElement("div");
      tile.className = "grass-tile";

      if (direction === "right") {
        // Add to the right
        const offset = (currentTiles + i - centerIndex) * GRASS_TILE_WIDTH;
        tile.style.left = `calc(50% + ${offset}px - 64px)`;
      } else {
        // Add to the left
        const offset = (-(i + 1) - centerIndex) * GRASS_TILE_WIDTH;
        tile.style.left = `calc(50% + ${offset}px - 64px)`;
      }

      grassContainer.appendChild(tile);
    }
  }

  // Animate the container
  grassContainer.style.transition = "transform 3000ms ease-out";
  grassContainer.style.transform = `translateX(${translateAmount}px)`;
}

// Reset grass after animation completes
function resetGrassPosition() {
  // Disable transition for instant reset
  grassContainer.style.transition = "transform 0ms linear";
  grassContainer.style.transform = "translateX(0)";

  // Reinitialize tiles to center position
  setTimeout(() => {
    initGrassTiles();
  }, 50);
}

// Update speech bubble text based on current scene
function updateSpeechBubble(sceneName) {
  const bubbleText = speechBubble.querySelector(".bubble-text");
  if (bubbleText && speechBubbleMessages[sceneName]) {
    bubbleText.textContent = speechBubbleMessages[sceneName];
  }
}

// Scene Navigation
function navigateToScene(sceneName) {
  if (sceneName === currentScene) return;

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

  roomTitleEl.textContent = roomData.title;

  // Clear previous projects
  roomProjectsEl.innerHTML = "";

  // Add projects
  roomData.projects.forEach((project) => {
    const projectEl = document.createElement("div");
    projectEl.className = "project-item";
    projectEl.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
        `;
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
