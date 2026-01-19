// Akkordeon Vorteile / Nachteile
document.querySelectorAll(".toggle-btn").forEach(button => {
  button.addEventListener("click", () => {
    const box = button.nextElementSibling;
    if (!box) return;
    box.classList.toggle("hidden");

    button.textContent = box.classList.contains("hidden")
      ? "Anzeigen"
      : "Ausblenden";
  });
});