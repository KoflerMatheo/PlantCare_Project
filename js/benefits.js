
const cards = document.querySelectorAll(".card");
const modal = document.getElementById("modal-overlay");
const titleEl = document.getElementById("modal-title");
const textEl = document.getElementById("modal-text");
const imgEl = document.getElementById("modal-image");
const closeBtn = document.querySelector(".close-btn");

if (modal && titleEl && textEl && imgEl) {
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const h = card.querySelector("h3");
      const p = card.querySelector("p");
      const title = h ? h.textContent : "";
      const text = p ? p.textContent : "";

      const image = "deinbild.jpg";

      titleEl.textContent = title;
      textEl.textContent = text;
      imgEl.src = image;

      modal.style.display = "flex";
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
}

// Ensure Enter in the page search delegates to the global search handler
const searchInputB = document.getElementById('searchInput');
if (searchInputB) {
  searchInputB.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      const term = this.value.trim();
      if (!term) return;
      if (typeof performSiteSearch === 'function') {
        performSiteSearch(term);
      } else {
        // fallback: navigate to benefits page with query param
        window.location.href = 'benefits.html?q=' + encodeURIComponent(term);
      }
    }
  });
}

