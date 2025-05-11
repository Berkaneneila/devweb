// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    // User Profile Dropdown Functionality
    const userProfileBtn = document.getElementById('userProfileBtn');
    const signInBtn = document.getElementById('signInBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const dropdownMenu = document.querySelector('.user-dropdown');

    // Check auth status
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // Update UI based on auth state
    function updateAuthUI() {
        if (isLoggedIn) {
            if (signInBtn) signInBtn.style.display = 'none';
            if (userProfileBtn) userProfileBtn.style.display = 'flex';
        } else {
            if (signInBtn) signInBtn.style.display = 'flex';
            if (userProfileBtn) userProfileBtn.style.display = 'none';
            if (dropdownMenu) dropdownMenu.classList.remove('show');
        }
    }
    
    // Initialize UI
    updateAuthUI();

    // Toggle dropdown menu
    if (userProfileBtn) {
        userProfileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.user-profile-circle') && dropdownMenu.classList.contains('show')) {
            dropdownMenu.classList.remove('show');
        }
    });

    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            updateAuthUI();
            window.location.href = 'index.html';
        });
    }

    // Mobile menu functionality
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-links') && !event.target.closest('.hamburger')) {
                navLinks.classList.remove('active');
                hamburgerBtn.classList.remove('active');
            }
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburgerBtn.classList.remove('active');
            });
        });
    }

    // Scroll event for navbar
    const navbar = document.querySelector('.custom-navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // For testing - simulate login when clicking login button in modal
    document.querySelector('.btn-login')?.addEventListener('click', function() {
        localStorage.setItem('isLoggedIn', 'true');
        updateAuthUI();
        document.getElementById('loginModal').classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

function initializeNavbar() {
    const navbar = document.querySelector('.custom-navbar');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    const signInBtn = document.getElementById('signInBtn');
    const userProfileBtn = document.getElementById('userProfileBtn');
    const authModal = document.getElementById('authModal');
    const closeAuthModal = document.getElementById('closeAuthModal');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const logoutBtn = document.getElementById('logoutBtn');

    // Check authentication status
    function checkAuthStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
            signInBtn.style.display = 'none';
            userProfileBtn.style.display = 'flex';
        } else {
            signInBtn.style.display = 'flex';
            userProfileBtn.style.display = 'none';
        }
    }

    // Initialize auth status
    checkAuthStatus();

    // Scroll event for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburgerBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburgerBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-links') && !event.target.closest('.hamburger')) {
            navLinks.classList.remove('active');
            hamburgerBtn.classList.remove('active');
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburgerBtn.classList.remove('active');
        });
    });

    // Auth modal functionality
    signInBtn.addEventListener('click', () => {
        authModal.classList.add('active');
    });

    closeAuthModal.addEventListener('click', () => {
        authModal.classList.remove('active');
    });

    // Close modal when clicking outside
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.classList.remove('active');
        }
    });

    // Tab switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            
            // Update active tab
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding form
            authForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${target}Form`) {
                    form.classList.add('active');
                }
            });
        });
    });

    // User profile dropdown
    const userDropdown = document.querySelector('.user-dropdown');

    if (userProfileBtn && userDropdown) {
        // Toggle dropdown on profile button click
        userProfileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!userProfileBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.style.display = 'none';
            }
        });

        // Handle logout
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userProfilePic');
                userDropdown.style.display = 'none';
                checkAuthStatus();
                window.location.href = 'index.html';
            });
        }
    }

    // Form submissions
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Here you would typically make an API call to verify credentials
        // For demo purposes, we'll just simulate a successful login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify({ email }));
        
        authModal.classList.remove('active');
        checkAuthStatus();
    });

    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Here you would typically make an API call to create the account
        // For demo purposes, we'll just simulate a successful signup
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify({ name, email }));
        
        authModal.classList.remove('active');
        checkAuthStatus();
    });
} 