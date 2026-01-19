// Mobile menu toggle
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
        mobileMenu.style.display = mobileMenu.classList.contains("open") ? "block" : "none";
    });
}

// Search input: local highlight on input, site search+redirect on Enter
const searchInput = document.getElementById("searchInput");
if (searchInput) {
    // local highlight while typing
    searchInput.addEventListener("input", function() {
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

    // On Enter: search other pages and redirect to the first match
    searchInput.addEventListener("keydown", function(e) {
        if (e.key === 'Enter') {
            const term = this.value.trim();
            if (term.length === 0) return;
            performSiteSearch(term);
        }
    });
}

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

window.addEventListener("DOMContentLoaded", () => {
    const sidebarToggle = document.getElementById("sidebarToggle");
    const wrapper = document.getElementById("wrapper");

    // Wenn die Seite mit ?q=... aufgerufen wurde, highlighten und scrollen
    try {
        const params = new URLSearchParams(window.location.search);
        const q = params.get('q');
        if (q && q.length > 0) {
            // Entfernte Highlights zuvor löschen
            document.querySelectorAll("span.highlight").forEach(el => el.outerHTML = el.innerText);
            highlightText(document.body, q.toLowerCase());
            const first = document.querySelector('span.highlight');
            if (first) first.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    } catch (err) {
        // ignore
    }

    if (!sidebarToggle || !wrapper) return;

    // Zustand beim Laden wiederherstellen
    if (localStorage.getItem("sidebar-toggled") === "true") {
        wrapper.classList.add("toggled");
    }

    sidebarToggle.addEventListener("click", (e) => {
        e.preventDefault();

        wrapper.classList.toggle("toggled");

        // Zustand speichern
        localStorage.setItem(
            "sidebar-toggled",
            wrapper.classList.contains("toggled")
        );
    });
});


// Perform a site-wide search by fetching known pages and redirecting to the first match
async function performSiteSearch(term) {
    // keyword -> preferred page mapping (checks first for fast routing)
    const map = {
        'systems.html': ['system', 'tröpf', 'tröpfchen', 'sprinkl', 'sprinkler', 'subsurface', 'oberflächen', 'unterflur'],
        'benefits.html': ['vorteil', 'vorteile', 'benefit', 'wasser', 'effizienz', 'erspar', 'gesund', 'kosten', 'komfort'],
        'products.html': ['produkt', 'produkte', 'shop', 'gerät', 'steuergerät', 'ventil', 'pumpe']
    };

    const lower = term.toLowerCase();

    // direct keyword mapping
    for (const [page, keywords] of Object.entries(map)) {
        for (const k of keywords) {
            if (lower.includes(k)) {
                window.location.href = page + '?q=' + encodeURIComponent(term);
                return;
            }
        }
    }

    // fallback: scan known pages for the term and redirect to first match
    const pages = [
        'index.html',
        'benefits.html',
        'systems.html',
        'products.html'
    ];

    for (const p of pages) {
        try {
            const resp = await fetch(p, {cache: 'no-store'});
            if (!resp.ok) continue;
            const txt = await resp.text();
            if (txt.toLowerCase().includes(lower)) {
                const url = p + '?q=' + encodeURIComponent(term);
                window.location.href = url;
                return;
            }
        } catch (e) {
            // ignore network/read errors for individual pages
        }
    }

    alert('Kein Treffer auf den Seiten gefunden.');
}


