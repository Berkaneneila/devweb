// Auth utilities for all pages
const auth = {
    // Check if user is logged in
    isLoggedIn: function() {
        return localStorage.getItem('isLoggedIn') === 'true';
    },

    // Get current user
    getCurrentUser: function() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // Update navbar based on auth state
    updateNavbar: function() {
        const isLoggedIn = this.isLoggedIn();
        const signInBtn = document.getElementById('signInBtn');
        const userProfileBtn = document.getElementById('userProfileBtn');
        
        if (isLoggedIn) {
            // User is logged in
            if (signInBtn) signInBtn.style.display = 'none';
            if (userProfileBtn) {
                userProfileBtn.style.display = 'block';
                // Update profile picture if available
                const userProfilePic = userProfileBtn.querySelector('img');
                const savedProfilePic = localStorage.getItem('userProfilePic');
                if (savedProfilePic && userProfilePic) {
                    userProfilePic.src = savedProfilePic;
                }
            }
        } else {
            // User is not logged in
            if (signInBtn) signInBtn.style.display = 'flex';
            if (userProfileBtn) userProfileBtn.style.display = 'none';
        }
    },

    // Handle logout
    logout: function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userProfilePic');
        this.updateNavbar();
        window.location.href = 'index.html';
    },

    // Check auth and redirect if needed
    requireAuth: function() {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    },

    // Check if user is admin
    isAdmin: function() {
        const user = this.getCurrentUser();
        return user && user.role === 'admin';
    },

    // Initialize auth state
    init: function() {
        this.updateNavbar();
        
        // Add logout handler
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }

        // Auth Modal Management
        const authModal = document.getElementById('authModal');
        const closeAuthModal = document.getElementById('closeAuthModal');
        const authTabs = document.querySelectorAll('.auth-tab');
        const authForms = document.querySelectorAll('.auth-form');
        const signInBtn = document.getElementById('signInBtn');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');

        // Show modal when clicking Sign In button
        if (signInBtn) {
            signInBtn.addEventListener('click', (e) => {
                e.preventDefault();
                authModal.classList.add('active');
            });
        }

        // Close modal when clicking close button or outside modal
        if (closeAuthModal) {
            closeAuthModal.addEventListener('click', () => {
                authModal.classList.remove('active');
            });
        }

        if (authModal) {
            authModal.addEventListener('click', (e) => {
                if (e.target === authModal) {
                    authModal.classList.remove('active');
                }
            });
        }

        // Switch between login and signup tabs
        authTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and forms
                authTabs.forEach(t => t.classList.remove('active'));
                authForms.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding form
                tab.classList.add('active');
                const formId = tab.dataset.tab + 'Form';
                document.getElementById(formId).classList.add('active');
            });
        });

        // Handle login form submission
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                
                // Here you would typically make an API call to authenticate
                // For demo purposes, we'll just simulate a successful login
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userProfilePic', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2NjY2NjYyI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgM2MyLjY3IDAgNC44NCAyLjE3IDQuODQgNC44NCAwIDIuNjctMi4xNyA0Ljg0LTQuODQgNC44NC0yLjY3IDAtNC44NC0yLjE3LTQuODQtNC44NCAwLTIuNjcgMi4xNy00Ljg0IDQuODQtNC44NHptMCAxMmM0LjQyIDAgOC4xNy0yLjIyIDkuNTQtNS41NS0yLjY5LTEuNzMtNi4xNC0yLjctOS41NC0yLjctMy40IDAtNi44NS45Ny05LjU0IDIuNyAxLjM3IDMuMzMgNS4xMiA1LjU1IDkuNTQgNS41NXoiLz48L3N2Zz4=');
                
                // Update UI
                this.updateNavbar();
                
                // Close modal
                authModal.classList.remove('active');
                
                // Clear form
                loginForm.reset();
            });
        }

        // Handle signup form submission
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('signupName').value;
                const email = document.getElementById('signupEmail').value;
                const password = document.getElementById('signupPassword').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
                
                // Check if passwords match
                if (password !== confirmPassword) {
                    alert('Passwords do not match!');
                    return;
                }
                
                // Here you would typically make an API call to register
                // For demo purposes, we'll just simulate a successful signup
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userProfilePic', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2NjY2NjYyI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgM2MyLjY3IDAgNC44NCAyLjE3IDQuODQgNC44NCAwIDIuNjctMi4xNyA0Ljg0LTQuODQgNC44NC0yLjY3IDAtNC44NC0yLjE3LTQuODQtNC44NCAwLTIuNjcgMi4xNy00Ljg0IDQuODQtNC44NHptMCAxMmM0LjQyIDAgOC4xNy0yLjIyIDkuNTQtNS41NS0yLjY5LTEuNzMtNi4xNC0yLjctOS41NC0yLjctMy40IDAtNi44NS45Ny05LjU0IDIuNyAxLjM3IDMuMzMgNS4xMiA1LjU1IDkuNTQgNS41NXoiLz48L3N2Zz4=');
                
                // Update UI
                this.updateNavbar();
                
                // Close modal
                authModal.classList.remove('active');
                
                // Clear form
                signupForm.reset();
            });
        }
    }
};

// Initialize auth when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    auth.init();
});

// Check if user is logged in and update UI accordingly
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const signInBtn = document.getElementById('signInBtn');
    const userProfileBtn = document.getElementById('userProfileBtn');
    const userProfilePic = document.querySelector('#userProfileBtn img');

    if (isLoggedIn) {
        // User is logged in
        if (signInBtn) signInBtn.style.display = 'none';
        if (userProfileBtn) userProfileBtn.style.display = 'block';
        
        // Update profile picture if available
        const savedProfilePic = localStorage.getItem('userProfilePic');
        if (savedProfilePic && userProfilePic) {
            userProfilePic.src = savedProfilePic;
        }
    } else {
        // User is not logged in
        if (signInBtn) signInBtn.style.display = 'flex';
        if (userProfileBtn) userProfileBtn.style.display = 'none';
    }
}

// Handle logout
document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userProfilePic');
    window.location.href = 'index.html';
});

// Call this when page loads
document.addEventListener('DOMContentLoaded', checkAuth);

// Auth Modal Management
const authModal = document.getElementById('authModal');
const closeAuthModal = document.getElementById('closeAuthModal');
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');
const signInBtn = document.getElementById('signInBtn');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Show modal when clicking Sign In button
signInBtn.addEventListener('click', (e) => {
    e.preventDefault();
    authModal.classList.add('active');
});

// Close modal when clicking close button or outside modal
closeAuthModal.addEventListener('click', () => {
    authModal.classList.remove('active');
});

authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.classList.remove('active');
    }
});

// Switch between login and signup tabs
authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and forms
        authTabs.forEach(t => t.classList.remove('active'));
        authForms.forEach(f => f.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding form
        tab.classList.add('active');
        const formId = tab.dataset.tab + 'Form';
        document.getElementById(formId).classList.add('active');
    });
});

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Here you would typically make an API call to authenticate
    // For demo purposes, we'll just simulate a successful login
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userProfilePic', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2NjY2NjYyI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgM2MyLjY3IDAgNC44NCAyLjE3IDQuODQgNC44NCAwIDIuNjctMi4xNyA0Ljg0LTQuODQgNC44NC0yLjY3IDAtNC44NC0yLjE3LTQuODQtNC44NCAwLTIuNjcgMi4xNy00Ljg0IDQuODQtNC44NHptMCAxMmM0LjQyIDAgOC4xNy0yLjIyIDkuNTQtNS41NS0yLjY5LTEuNzMtNi4xNC0yLjctOS41NC0yLjctMy40IDAtNi44NS45Ny05LjU0IDIuNyAxLjM3IDMuMzMgNS4xMiA1LjU1IDkuNTQgNS41NXoiLz48L3N2Zz4=');
    
    // Update UI
    checkAuth();
    
    // Close modal
    authModal.classList.remove('active');
    
    // Clear form
    loginForm.reset();
});

// Handle signup form submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Here you would typically make an API call to register
    // For demo purposes, we'll just simulate a successful signup
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userProfilePic', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2NjY2NjYyI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgM2MyLjY3IDAgNC44NCAyLjE3IDQuODQgNC44NCAwIDIuNjctMi4xNyA0Ljg0LTQuODQgNC44NC0yLjY3IDAtNC44NC0yLjE3LTQuODQtNC44NCAwLTIuNjcgMi4xNy00Ljg0IDQuODQtNC44NHptMCAxMmM0LjQyIDAgOC4xNy0yLjIyIDkuNTQtNS41NS0yLjY5LTEuNzMtNi4xNC0yLjctOS41NC0yLjctMy40IDAtNi44NS45Ny05LjU0IDIuNyAxLjM3IDMuMzMgNS4xMiA1LjU1IDkuNTQgNS41NXoiLz48L3N2Zz4=');
    
    // Update UI
    checkAuth();
    
    // Close modal
    authModal.classList.remove('active');
    
    // Clear form
    signupForm.reset();
});

// Check auth status on page load
document.addEventListener('DOMContentLoaded', checkAuth);

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in (you would replace this with actual auth check)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    updateAuthUI(isLoggedIn);

    // Sign in button click handler
    document.getElementById('signInBtn')?.addEventListener('click', function() {
        document.getElementById('authModal').classList.add('active');
    });

    // Close auth modal
    document.getElementById('closeAuthModal')?.addEventListener('click', function() {
        document.getElementById('authModal').classList.remove('active');
    });

    // Tab switching in auth modal
    const authTabs = document.querySelectorAll('.auth-tab');
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Update active tab
            authTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.remove('active');
            });
            document.getElementById(tabName + 'Form').classList.add('active');
        });
    });

    // Login form submission
    document.getElementById('loginForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would normally validate and send to server
        localStorage.setItem('isLoggedIn', 'true');
        updateAuthUI(true);
        document.getElementById('authModal').classList.remove('active');
    });

    // Signup form submission
    document.getElementById('signupForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would normally validate and send to server
        localStorage.setItem('isLoggedIn', 'true');
        updateAuthUI(true);
        document.getElementById('authModal').classList.remove('active');
    });

    // Logout button
    document.getElementById('logoutBtn')?.addEventListener('click', function() {
        localStorage.setItem('isLoggedIn', 'false');
        updateAuthUI(false);
    });

    // Function to update UI based on auth state
    function updateAuthUI(loggedIn) {
        const signInBtn = document.getElementById('signInBtn');
        const userProfileBtn = document.getElementById('userProfileBtn');
        
        if (signInBtn) signInBtn.style.display = loggedIn ? 'none' : 'block';
        if (userProfileBtn) userProfileBtn.style.display = loggedIn ? 'block' : 'none';
    }
}); 