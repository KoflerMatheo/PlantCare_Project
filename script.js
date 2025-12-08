function toggleMenu() {
  document.getElementById("menu").classList.toggle("open");
}
  function highlightText() {
    let searchValue = document.getElementById("searchInput").value.toLowerCase();

    // Elemente, die durchsucht werden dürfen
    let elements = document.querySelectorAll("h1, p, a, li, div, span");

    elements.forEach(el => {

      // ursprünglichen Text wiederherstellen
      el.innerHTML = el.innerHTML.replace(/<span class="highlight">(.*?)<\/span>/g, "$1");

      if (searchValue.length > 0) {
        let regex = new RegExp("(" + searchValue + ")", "gi");
        el.innerHTML = el.innerHTML.replace(regex, "<span class='highlight'>$1</span>");
      }

    });
  }

  document.getElementById("searchInput").addEventListener("input", highlightText);
