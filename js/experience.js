/* ===========================================
   experience.js — Experience modal and
   room detail modal (project accordion).

   Depends on: data.js (universityProjects)
   Uses globals from app.js (DOM refs).
   =========================================== */

function openExperience() {
  experienceModal.classList.add("active");
}

function closeExperience() {
  experienceModal.classList.remove("active");
}

// Show the detail overlay for a specific education "room"
function openRoomModal(roomId) {
  const roomData = universityProjects[roomId];
  if (!roomData) return;

  roomTitleEl.dataset.currentRoom = roomId;
  roomTitleEl.textContent = roomData.title;

  roomProjectsEl.innerHTML = "";

  // Gender & Diversity has a single entry — keep it expanded
  const alwaysExpanded = roomId === "room-diversity";

  roomData.projects.forEach((project) => {
    const projectEl = document.createElement("div");
    projectEl.className = `project-item${alwaysExpanded ? " expanded" : ""}`;
    projectEl.innerHTML = `
            <h3>${project.name}</h3>
            <div class="project-description">
              <p>${project.description}</p>
            </div>
        `;

    if (!alwaysExpanded) {
      // Accordion: click to expand/collapse
      projectEl.addEventListener("click", () => {
        const isExpanded = projectEl.classList.contains("expanded");

        roomProjectsEl.querySelectorAll(".project-item").forEach((item) => {
          item.classList.remove("expanded");
        });

        if (!isExpanded) {
          projectEl.classList.add("expanded");
        }
      });
    } else {
      projectEl.classList.add("no-accordion");
    }

    roomProjectsEl.appendChild(projectEl);
  });

  roomModal.classList.add("active");
}

function closeRoomModal() {
  roomModal.classList.remove("active");
}
