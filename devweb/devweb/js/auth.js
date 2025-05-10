// Auth utilities for all pages
const auth = {
    // Check if user is logged in
    isLoggedIn: function() {
        return localStorage.getItem('user') !== null;
    },

    // Get current user
    getCurrentUser: function() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // Update navbar based on auth state
    updateNavbar: function() {
        const user = this.getCurrentUser();
        const authButtons = document.querySelector('.auth-buttons');
        const userMenu = document.querySelector('.user-menu');
        const userName = document.querySelector('.user-name');
        const authBtn = document.querySelector('.auth-btn');
        const signupBtn = document.querySelector('#signupBtn');
        
        if (user) {
            // User is logged in
            if (authButtons) authButtons.style.display = 'none';
            if (userMenu) {
                userMenu.style.display = 'flex';
                if (userName) {
                    userName.textContent = user.first_name + ' ' + user.last_name;
                }
            }
        } else {
            // User is not logged in
            if (authButtons) {
                authButtons.style.display = 'flex';
                if (authBtn) {
                    authBtn.textContent = 'Log In';
                    authBtn.href = 'login.html';
                }
                if (signupBtn) {
                    signupBtn.textContent = 'Sign Up';
                    signupBtn.href = 'login.html';
                }
            }
            if (userMenu) userMenu.style.display = 'none';
        }
    },

    // Handle logout
    logout: function() {
        localStorage.removeItem('user');
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
        
        // Add logout event listeners
        document.querySelectorAll('.logout-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        });

        // Add event listener for storage changes
        window.addEventListener('storage', (e) => {
            if (e.key === 'user') {
                this.updateNavbar();
            }
        });
    }
};

// Initialize auth when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    auth.init();
}); 