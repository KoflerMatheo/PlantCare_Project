const hamburger = document.getElementById("hamburger");
const modalOverlay = document.getElementById("modalOverlay");
const modalBox = document.querySelector(".modal-box");
const closeBtn = document.querySelector(".close-btn");

// Öffnen
hamburger.addEventListener("click", () => {
  modalOverlay.style.display = "flex";
});

// Schließen über X
closeBtn.addEventListener("click", () => {
  modalOverlay.style.display = "none";
});

// Klick im Menü darf NICHT schließen
modalBox.addEventListener("click", (e) => {
  e.stopPropagation();
});

// Schließen nur bei Klick auf dunklen Hintergrund
modalOverlay.addEventListener("click", () => {
  modalOverlay.style.display = "none";
});