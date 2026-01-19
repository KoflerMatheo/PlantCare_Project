// Page-specific product JS: delegate Enter on search to global handler or fallback
window.addEventListener('DOMContentLoaded', () => {
  const searchInputP = document.getElementById('searchInput');
  if (!searchInputP) return;
  searchInputP.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      const term = this.value.trim();
      if (!term) return;
      if (typeof performSiteSearch === 'function') {
        performSiteSearch(term);
      } else {
        window.location.href = 'products.html?q=' + encodeURIComponent(term);
      }
    }
  });
});
