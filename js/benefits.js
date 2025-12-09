
const cards = document.querySelectorAll(".card");
const modal = document.getElementById("modal-overlay");
const titleEl = document.getElementById("modal-title");
const textEl = document.getElementById("modal-text");
const imgEl = document.getElementById("modal-image");
const closeBtn = document.querySelector(".close-btn");

cards.forEach(card => {
  card.addEventListener("click", () => {
    const title = card.querySelector("h3").textContent;
    const text = card.querySelector("p").textContent;

    // Beispielbild (kannst du ändern)
    const image = "deinbild.jpg";

    // Inhalte einsetzen
    titleEl.textContent = title;
    textEl.textContent = text;
    imgEl.src = image;

    // Modal anzeigen
    modal.style.display = "flex";
  });
});

// Schließen
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Schließen bei Klick auf den Hintergrund
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

