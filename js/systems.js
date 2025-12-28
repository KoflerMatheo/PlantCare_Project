// Mobile menu toggle
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    mobileMenu.style.display = mobileMenu.classList.contains("open") ? "block" : "none";
});

// Akkordeon Vorteile / Nachteile
document.querySelectorAll(".toggle-btn").forEach(button => {
  button.addEventListener("click", () => {
    const box = button.nextElementSibling;
    box.classList.toggle("hidden");

    button.textContent = box.classList.contains("hidden")
      ? "Anzeigen"
      : "Ausblenden";
  });
});