// navbar.js
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
}

function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');
    const authBtn = document.getElementById('authBtn');
    const userAvatar = document.getElementById('userAvatar');

    console.log('Checking auth, user data:', user); // Debug log

    if (user && user.id) { // Vérifier que l'utilisateur existe et a un ID
        // User is logged in
        if (authButtons) authButtons.style.display = 'none';
        if (userMenu) {
            userMenu.style.display = 'block';
            userName.textContent = user.first_name || user.username;
            // Set default avatar if userAvatar exists
            if (userAvatar) {
                userAvatar.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2NjY2NjYyI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgM2MyLjY3IDAgNC44NCAyLjE3IDQuODQgNC44NCAwIDIuNjctMi4xNyA0Ljg0LTQuODQgNC44NC0yLjY3IDAtNC44NC0yLjE3LTQuODQtNC44NCAwLTIuNjcgMi4xNy00Ljg0IDQuODQtNC44NHptMCAxMmM0LjQyIDAgOC4xNy0yLjIyIDkuNTQtNS41NS0yLjY5LTEuNzMtNi4xNC0yLjctOS41NC0yLjctMy40IDAtNi44NS45Ny05LjU0IDIuNyAxLjM3IDMuMzMgNS4xMiA1LjU1IDkuNTQgNS41NXoiLz48L3N2Zz4=';
                userAvatar.onerror = function() {
                    this.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2NjY2NjYyI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgM2MyLjY3IDAgNC44NCAyLjE3IDQuODQgNC44NCAwIDIuNjctMi4xNyA0Ljg0LTQuODQgNC44NC0yLjY3IDAtNC44NC0yLjE3LTQuODQtNC44NCAwLTIuNjcgMi4xNy00Ljg0IDQuODQtNC44NHptMCAxMmM0LjQyIDAgOC4xNy0yLjIyIDkuNTQtNS41NS0yLjY5LTEuNzMtNi4xNC0yLjctOS41NC0yLjctMy40IDAtNi44NS45Ny05LjU0IDIuNyAxLjM3IDMuMzMgNS4xMiA1LjU1IDkuNTQgNS41NXoiLz48L3N2Zz4=';
                };
            }
        }
        if (authBtn) {
            authBtn.style.display = 'none';
        }
    } else {
        // User is not logged in
        if (authButtons) authButtons.style.display = 'flex';
        if (userMenu) userMenu.style.display = 'none';
        if (authBtn) {
            authBtn.style.display = 'block';
            // Check if we're on the login page
            if (window.location.pathname.includes('login.html')) {
                authBtn.textContent = 'Sign Up';
                authBtn.href = 'signup.html';
            } else {
                authBtn.textContent = 'Log In';
                authBtn.href = 'login.html';
            }
        }
    }
}

function setupNavbar() {
    // Setup hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            
            if (hamburger?.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Setup logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        });
    }

    // Check authentication status on load
    checkAuth();

    // Add event listener for storage changes
    window.addEventListener('storage', (e) => {
        if (e.key === 'user') {
            checkAuth();
        }
    });

    // Check auth when page becomes visible
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            checkAuth();
        }
    });

    // Check auth periodically (every 5 seconds)
    setInterval(checkAuth, 5000);
}

// Initialize when navbar is loaded
document.addEventListener('DOMContentLoaded', setupNavbar);

// Also check auth when the page is shown
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        checkAuth();
    }
});

// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load navbar content
    const navContent = document.getElementById('nav-content');
    if (navContent) {
        fetch('navbar.html')
            .then(res => res.text())
            .then(html => {
                navContent.innerHTML = html;
                initializeNavbar();
            })
            .catch(err => console.error('Navbar load failed:', err));
    }

    function initializeNavbar() {
        // Mobile menu toggle
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                hamburger.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks && navLinks.classList.contains('active') && 
                !e.target.closest('.nav-links') && 
                !e.target.closest('.hamburger')) {
                navLinks.classList.remove('active');
                if (hamburger) {
                    hamburger.classList.remove('active');
                }
            }
        });

        // Add active class to current page link
        const currentPage = window.location.pathname.split('/').pop();
        const navLinksList = document.querySelectorAll('.nav-link');
        
        navLinksList.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });

        // Initialize auth state if auth.js is loaded
        if (typeof auth !== 'undefined') {
            auth.init();
        }
    }
});