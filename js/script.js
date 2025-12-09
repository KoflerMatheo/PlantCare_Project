// Mobile menu toggle
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    mobileMenu.style.display = mobileMenu.classList.contains("open") ? "block" : "none";
});

// Search highlight
document.getElementById("searchInput").addEventListener("input", function() {
    const searchValue = this.value.toLowerCase();
    const body = document.body;

    // Remove previous highlights
    document.querySelectorAll("span.highlight").forEach(el => {
        el.outerHTML = el.innerText;
    });

    if (searchValue.length > 0) {
        highlightText(body, searchValue);
    }
});

function highlightText(element, search) {
    if (element.children.length === 0 && element.innerText.toLowerCase().includes(search)) {
        let newHTML = element.innerHTML.replace(
            new RegExp(search, "gi"),
            match => `<span class="highlight">${match}</span>`
        );
        element.innerHTML = newHTML;
    } else {
        [...element.children].forEach(child => highlightText(child, search));
    }
}


