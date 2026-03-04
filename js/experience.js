/* ===========================================
   experience.js — Experience modal and
   room dialogue (JRPG-style page-by-page).

   Depends on: data.js (universityProjects)
   Uses globals from app.js (DOM refs).
   =========================================== */

let dialoguePages = [];
let dialoguePage = 0;

function openExperience() {
  experienceModal.classList.add("active");
}

function closeExperience() {
  experienceModal.classList.remove("active");
}

function renderDialoguePage() {
  const page = dialoguePages[dialoguePage];
  const topicEl = document.getElementById("dialogue-topic");
  const counterEl = document.getElementById("dialogue-counter");
  const prevBtn = document.getElementById("dialogue-prev");
  const nextBtn = document.getElementById("dialogue-next");

  if (topicEl) topicEl.textContent = page.name;
  if (counterEl)
    counterEl.textContent = `${dialoguePage + 1} / ${dialoguePages.length}`;

  // Animate text in
  roomProjectsEl.classList.remove("dialogue-entering");
  void roomProjectsEl.offsetWidth; // force reflow to retrigger animation
  roomProjectsEl.innerHTML = page.description;
  roomProjectsEl.classList.add("dialogue-entering");

  if (prevBtn) prevBtn.disabled = dialoguePage === 0;
  if (nextBtn) {
    const isLast = dialoguePage === dialoguePages.length - 1;
    nextBtn.textContent = isLast ? "✕ CLOSE" : "NEXT ▶";
    nextBtn.disabled = false;
  }
}

function openRoomModal(roomId) {
  const roomData = universityProjects[roomId];
  if (!roomData) return;

  // Preserve page position on language switch (same room re-render)
  const isSameRoom = roomTitleEl.dataset.currentRoom === roomId;
  if (!isSameRoom) dialoguePage = 0;

  roomTitleEl.dataset.currentRoom = roomId;
  roomTitleEl.textContent = roomData.title;

  // Expand each project into sub-pages by splitting on paragraph breaks
  dialoguePages = [];
  roomData.projects.forEach((project) => {
    const parts = project.description.split("<br><br>");
    parts.forEach((part) => {
      const trimmed = part.trim();
      if (trimmed) dialoguePages.push({ name: project.name, description: trimmed });
    });
  });

  dialoguePage = Math.min(dialoguePage, dialoguePages.length - 1);

  const prevBtn = document.getElementById("dialogue-prev");
  const nextBtn = document.getElementById("dialogue-next");

  if (prevBtn) {
    prevBtn.onclick = () => {
      if (dialoguePage > 0) {
        dialoguePage--;
        renderDialoguePage();
      }
    };
  }
  if (nextBtn) {
    nextBtn.onclick = () => {
      if (dialoguePage < dialoguePages.length - 1) {
        dialoguePage++;
        renderDialoguePage();
      } else {
        closeRoomModal();
      }
    };
  }

  renderDialoguePage();
  roomModal.classList.add("active");
}

function closeRoomModal() {
  roomModal.classList.remove("active");
}
