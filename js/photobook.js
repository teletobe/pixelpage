/* ===========================================
   photobook.js — Photobook modal: open, close,
   page navigation, and spread rendering.

   Depends on: data.js (photos)
   Uses globals from app.js (DOM refs, currentPhotoIndex).
   =========================================== */

function openPhotobook() {
  photobookModal.classList.add("active");
  currentPhotoIndex = 0;
  displayPhotoSpread();
}

function closePhotobook() {
  photobookModal.classList.remove("active");
}

// Render 4 photos at once (2 per page, left + right)
function displayPhotoSpread() {
  const photoElements = [
    { img: leftPhoto1El, caption: leftCaption1El },
    { img: leftPhoto2El, caption: leftCaption2El },
    { img: rightPhoto1El, caption: rightCaption1El },
    { img: rightPhoto2El, caption: rightCaption2El },
  ];

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

  const endPage = Math.min(currentPhotoIndex + 4, photos.length);
  currentPageEl.textContent = `${currentPhotoIndex + 1}-${endPage}`;

  prevPageBtn.disabled = currentPhotoIndex === 0;
  nextPageBtn.disabled = currentPhotoIndex >= photos.length - 4;
}

function nextPhoto() {
  if (currentPhotoIndex < photos.length - 4) {
    currentPhotoIndex += 4;
    displayPhotoSpread();
    playPageTurnSound();
  }
}

function prevPhoto() {
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
