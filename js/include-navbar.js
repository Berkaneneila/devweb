// Include navbar in all pages
document.addEventListener('DOMContentLoaded', function() {
    // Add navbar container if it doesn't exist
    if (!document.getElementById('nav-content')) {
        const navContainer = document.createElement('div');
        navContainer.id = 'nav-content';
        document.body.insertBefore(navContainer, document.body.firstChild);
    }

    // Load navbar content
    fetch('navbar.html')
        .then(res => res.text())
        .then(html => {
            document.getElementById('nav-content').innerHTML = html;
            
            // Load navbar styles
            if (!document.querySelector('link[href="navbar.css"]')) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'navbar.css';
                document.head.appendChild(link);
            }

            // Initialize navbar functionality
            if (typeof initializeNavbar === 'function') {
                initializeNavbar();
            }
        })
        .catch(err => console.error('Navbar load failed:', err));
}); 