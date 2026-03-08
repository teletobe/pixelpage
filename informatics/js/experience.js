/* ===========================================
   experience.js — Experience modal and
   room dialogue (JRPG-style page-by-page).

   Depends on: data.js (universityProjects)
   Uses globals from app.js (DOM refs).
   =========================================== */

let dialoguePages = [];
let dialoguePage = 0;
let currentRoomId = null;
let currentTopicIndex = -1; // -1 = topic selection screen is showing

function openExperience() {
  experienceModal.classList.add("active");
}

function closeExperience() {
  experienceModal.classList.remove("active");
}

// ---- Topic selection screen ----

function showTopicSelection() {
  const roomData = universityProjects[currentRoomId];
  if (!roomData) return;

  currentTopicIndex = -1;

  const choicesEl = document.getElementById("dialogue-choices");
  const footerEl = document.querySelector(".dialogue-footer");
  const topicBarEl = document.querySelector(".dialogue-topic-bar");
  const topicEl = document.getElementById("dialogue-topic");
  const topicArrow = document.querySelector(".dialogue-topic-arrow");
  const questionEl = document.getElementById("dialogue-question");
  const choiceListEl = document.getElementById("dialogue-choice-list");

  if (choicesEl) choicesEl.style.display = "flex";
  if (roomProjectsEl) roomProjectsEl.style.display = "none";
  if (footerEl) footerEl.style.display = "none";
  if (topicBarEl) topicBarEl.style.display = "none";
  if (topicEl) topicEl.textContent = "";
  if (topicArrow) topicArrow.style.visibility = "hidden";

  if (questionEl)
    questionEl.textContent =
      currentLang === "de"
        ? "Was willst du wissen?"
        : "What are you interested in?";

  if (choiceListEl) {
    choiceListEl.innerHTML = "";
    roomData.projects.forEach((project, index) => {
      const btn = document.createElement("button");
      btn.className = "dialogue-choice-btn";
      btn.innerHTML = project.name;
      btn.onclick = () => selectDialogueTopic(index);
      choiceListEl.appendChild(btn);
    });
  }
}

// ---- Switch from selection → dialogue ----

function showDialogueView() {
  const choicesEl = document.getElementById("dialogue-choices");
  const footerEl = document.querySelector(".dialogue-footer");
  const topicBarEl = document.querySelector(".dialogue-topic-bar");
  const topicArrow = document.querySelector(".dialogue-topic-arrow");

  if (choicesEl) choicesEl.style.display = "none";
  if (roomProjectsEl) roomProjectsEl.style.display = "block";
  if (footerEl) footerEl.style.display = "flex";
  if (topicBarEl) topicBarEl.style.display = "";
  if (topicArrow) topicArrow.style.visibility = "visible";
}

// ---- Build pages from a project entry ----

function buildDialoguePages(project) {
  dialoguePages = [];
  const parts = project.description.split("<br><br>");
  parts.forEach((part) => {
    const trimmed = part.trim();
    if (trimmed)
      dialoguePages.push({ name: project.name, description: trimmed });
  });
}

// ---- Wire prev / next buttons for current topic ----

function wireDialogueButtons() {
  const prevBtn = document.getElementById("dialogue-prev");
  const nextBtn = document.getElementById("dialogue-next");

  if (prevBtn) {
    prevBtn.onclick = () => {
      if (dialoguePage > 0) {
        dialoguePage--;
        renderDialoguePage();
      } else {
        const roomData = universityProjects[currentRoomId];
        if (roomData && roomData.projects.length === 1) {
          closeRoomModal();
        } else {
          showTopicSelection();
        }
      }
    };
  }

  if (nextBtn) {
    nextBtn.onclick = () => {
      if (dialoguePage < dialoguePages.length - 1) {
        dialoguePage++;
        renderDialoguePage();
      } else {
        const roomData = universityProjects[currentRoomId];
        if (roomData && roomData.projects.length === 1) {
          closeRoomModal();
        } else {
          showTopicSelection();
        }
      }
    };
  }
}

function selectDialogueTopic(index) {
  const roomData = universityProjects[currentRoomId];
  if (!roomData) return;

  currentTopicIndex = index;
  buildDialoguePages(roomData.projects[index]);
  dialoguePage = 0;
  wireDialogueButtons();
  showDialogueView();
  renderDialoguePage();
}

// ---- Render current dialogue page ----

function renderDialoguePage() {
  const page = dialoguePages[dialoguePage];
  const topicEl = document.getElementById("dialogue-topic");
  const counterEl = document.getElementById("dialogue-counter");
  const prevBtn = document.getElementById("dialogue-prev");
  const nextBtn = document.getElementById("dialogue-next");

  if (topicEl) topicEl.innerHTML = page.name;
  if (counterEl)
    counterEl.textContent = `${dialoguePage + 1} / ${dialoguePages.length}`;

  // Animate text in
  roomProjectsEl.classList.remove("dialogue-entering");
  void roomProjectsEl.offsetWidth; // force reflow to retrigger animation
  roomProjectsEl.innerHTML = page.description;
  roomProjectsEl.classList.add("dialogue-entering");

  if (prevBtn) {
    prevBtn.disabled = false;
    prevBtn.textContent = dialoguePage === 0 ? "< BACK" : "<";
  }
  if (nextBtn) {
    const isLast = dialoguePage === dialoguePages.length - 1;
    const roomData = universityProjects[currentRoomId];
    const isSingleTopic = roomData && roomData.projects.length === 1;
    nextBtn.textContent = isLast
      ? isSingleTopic
        ? "CLOSE"
        : "TOPICS"
      : "NEXT >";
    nextBtn.disabled = false;
  }
}

// ---- Open / close room modal ----

function openRoomModal(roomId) {
  const roomData = universityProjects[roomId];
  if (!roomData) return;

  const isSameRoom = currentRoomId === roomId;
  currentRoomId = roomId;

  roomTitleEl.dataset.currentRoom = roomId;
  roomTitleEl.textContent = roomData.title;
  roomModal.classList.add("active");

  if (isSameRoom && currentTopicIndex >= 0) {
    // Language switch mid-dialogue — rebuild at same position
    buildDialoguePages(roomData.projects[currentTopicIndex]);
    dialoguePage = Math.min(dialoguePage, dialoguePages.length - 1);
    wireDialogueButtons();
    showDialogueView();
    renderDialoguePage();
  } else if (roomData.projects.length === 1) {
    // Single-topic room — skip selection screen, open dialogue immediately
    selectDialogueTopic(0);
  } else {
    // New room, or was already on selection screen
    currentTopicIndex = -1;
    showTopicSelection();
  }
}

function closeRoomModal() {
  roomModal.classList.remove("active");
  currentTopicIndex = -1;
}
