/**
 * Authentication Utilities
 * Handles user authentication, session management, and UI updates
 */

const API_URL = 'http://localhost/devweb/backend';

// Auth handling functions
const Auth = {
    // DOM Elements
    elements: {
        signInBtn: document.getElementById('signInBtn'),
        authModal: document.getElementById('authModal'),
        closeAuthModal: document.querySelector('.close-auth-modal'),
        authTabs: document.querySelectorAll('.auth-tab'),
        loginForm: document.getElementById('loginForm'),
        signupForm: document.getElementById('signupForm'),
        userProfileBtn: document.getElementById('userProfileBtn'),
        userDropdown: document.getElementById('userDropdown'),
        logoutBtn: document.getElementById('logoutBtn')
    },

    // Initialize auth functionality
    init: function() {
        this.loadUser();
        this.setupEventListeners();
    },

    // Bind event listeners
    bindEvents: function() {
        // Sign In button click
        this.elements.signInBtn?.addEventListener('click', () => {
            this.openAuthModal();
            this.switchTab('login'); // Default to login tab
        });

        // Close modal button click
        this.elements.closeAuthModal?.addEventListener('click', () => this.closeAuthModal());

        // Close modal when clicking outside
        this.elements.authModal?.addEventListener('click', (e) => {
            if (e.target === this.elements.authModal) {
                this.closeAuthModal();
            }
        });

        // Tab switching
        this.elements.authTabs?.forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });

        // Form submissions
        this.elements.loginForm?.addEventListener('submit', (e) => this.handleLogin(e));
        this.elements.signupForm?.addEventListener('submit', (e) => this.handleSignup(e));

        // User profile dropdown
        this.elements.userProfileBtn?.addEventListener('click', () => this.toggleUserDropdown());

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.user-profile-circle') && !e.target.closest('.user-dropdown-menu')) {
                this.closeUserDropdown();
            }
        });

        // Logout button click
        this.elements.logoutBtn?.addEventListener('click', () => this.handleLogout());
    },

    // Open auth modal
    openAuthModal: function() {
        if (this.elements.authModal) {
            this.elements.authModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    },

    // Close auth modal
    closeAuthModal: function() {
        if (this.elements.authModal) {
            this.elements.authModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    },

    // Switch between login and signup tabs
    switchTab: function(tab) {
        // Update tab buttons
        this.elements.authTabs?.forEach(t => {
            t.classList.remove('active');
            if (t.dataset.tab === tab) {
                t.classList.add('active');
            }
        });

        // Update forms
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        
        if (loginForm && signupForm) {
            if (tab === 'login') {
                loginForm.classList.add('active');
                signupForm.classList.remove('active');
            } else {
                loginForm.classList.remove('active');
                signupForm.classList.add('active');
            }
        }
    },

    // Handle login
    handleLogin: async function(event) {
        event.preventDefault();
        
        const form = event.target;
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        try {
            // Disable button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Logging in...';
            
            // Get form data
            const email = form.querySelector('#loginEmail').value;
            const password = form.querySelector('#loginPassword').value;

            // Validate input
            if (!email || !password) {
                throw new Error('Please enter both email and password');
            }

            if (!this.isValidEmail(email)) {
                throw new Error('Please enter a valid email address');
            }
            
            // Attempt login
            const response = await API.auth.login({ email, password });
            
            if (response.status === 'success') {
                // Store token and user data
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                
                // Show success message
                this.showToast('Login successful! Welcome back!', 'success');
                
                // Update UI
                this.updateUIForLoggedInUser(response.data.user);
                this.closeAuthModal();
                
                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'user.html';
                }, 1000);
            } else {
                throw new Error(response.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showToast(error.message || 'Login failed. Please try again.', 'error');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    },

    // Handle signup
    handleSignup: async function(event) {
        event.preventDefault();
        
        const form = event.target;
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        try {
            // Disable button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Creating account...';
            
            // Get form data
            const formData = new FormData(form);
            const userData = {
                action: 'register',
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password'),
                confirm_password: formData.get('confirmPassword'),
                first_name: formData.get('first_name'),
                last_name: formData.get('last_name')
            };
            
            // Check terms agreement
            const termsAgreed = form.querySelector('#termsAgreement').checked;
            if (!termsAgreed) {
                throw new Error('Please agree to the Terms of Service and Privacy Policy');
            }
            
            // Validate input
            if (!userData.username || !userData.email || !userData.password) {
                throw new Error('Username, email and password are required');
            }
            
            if (!this.isValidEmail(userData.email)) {
                throw new Error('Please enter a valid email address');
            }
            
            if (userData.password.length < 6) {
                throw new Error('Password must be at least 6 characters long');
            }
            
            if (userData.password !== userData.confirm_password) {
                throw new Error('Passwords do not match');
            }
            
            // Attempt registration
            const response = await fetch(`${API_URL}/api/auth.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(userData)
            });
            
            const data = await response.json();
            
            if (data.status === 'success') {
                // Show success message
                this.showToast('Registration successful! Welcome to our platform!', 'success');
                
                // Close modal and switch to login tab
                this.closeAuthModal();
                setTimeout(() => {
                    this.openAuthModal();
                    this.switchTab('login');
                    this.showToast('Please login with your new account', 'info');
                }, 1000);
            } else {
                throw new Error(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            this.showToast(error.message || 'Registration failed. Please try again.', 'error');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    },

    // Handle logout
    handleLogout: async function() {
        try {
            await API.auth.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear local storage and redirect regardless of server response
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        }
    },

    // Toggle user dropdown
    toggleUserDropdown: function() {
        this.elements.userDropdown?.classList.toggle('show');
    },

    // Close user dropdown
    closeUserDropdown: function() {
        this.elements.userDropdown?.classList.remove('show');
    },

    // Show toast notification
    showToast: function(message, type = 'success') {
        // Remove existing toasts
        const existingToasts = document.querySelectorAll('.toast');
        existingToasts.forEach(toast => toast.remove());

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        // Add icon based on type
        const icon = type === 'success' ? '✓' : '!';
        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-message">${message}</div>
        `;
        
        // Add styles directly to the toast
        Object.assign(toast.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 25px',
            borderRadius: '8px',
            backgroundColor: type === 'success' ? '#4CAF50' : '#f44336',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: '9999',
            opacity: '0',
            transform: 'translateY(-20px)',
            transition: 'all 0.3s ease-in-out'
        });

        // Style the icon
        const iconElement = toast.querySelector('.toast-icon');
        Object.assign(iconElement.style, {
            fontSize: '20px',
            fontWeight: 'bold'
        });

        // Style the message
        const messageElement = toast.querySelector('.toast-message');
        Object.assign(messageElement.style, {
            fontSize: '14px',
            fontWeight: '500'
        });
        
        // Add to document
        document.body.appendChild(toast);
        
        // Show toast with animation
        requestAnimationFrame(() => {
            Object.assign(toast.style, {
                opacity: '1',
                transform: 'translateY(0)'
            });
        });
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            Object.assign(toast.style, {
                opacity: '0',
                transform: 'translateY(-20px)'
            });
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    // Validate email format
    isValidEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Load user data from localStorage
    loadUser: function() {
        const user = this.getCurrentUser();
        if (user) {
            this.updateUIForLoggedInUser(user);
        }
    },

    // Get current user data
    getCurrentUser: function() {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    },

    // Update UI for logged in user
    updateUIForLoggedInUser: function(user) {
        // Hide sign in button
        if (this.elements.signInBtn) {
            this.elements.signInBtn.style.display = 'none';
        }
        
        // Show user profile button
        if (this.elements.userProfileBtn) {
            this.elements.userProfileBtn.style.display = 'block';
            
            // Update user profile picture if available
            const userProfilePic = user.profile_picture || localStorage.getItem('userProfilePic');
            if (userProfilePic) {
                const profileImg = this.elements.userProfileBtn.querySelector('img');
                if (profileImg) {
                    profileImg.src = userProfilePic;
                }
            }
        }

        // Update user name in dropdown if available
        const userNameElement = document.querySelector('.user-name');
        if (userNameElement && user.first_name) {
            userNameElement.textContent = `${user.first_name} ${user.last_name || ''}`;
        }
    },

    // Setup event listeners
    setupEventListeners: function() {
        this.bindEvents();
    }
};

// Initialize auth when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    Auth.init();
});

// Export Auth
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Auth;
}