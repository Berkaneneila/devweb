document.addEventListener('DOMContentLoaded', function() {
    // Auth System
    const auth = {
        isLoggedIn: false,
        currentUser: null,

        init: function() {
            this.loadUser();
            this.setupEventListeners();
        },

        loadUser: function() {
            const user = localStorage.getItem('currentUser');
            if (user) {
                this.currentUser = JSON.parse(user);
                this.isLoggedIn = true;
                this.updateUI();
            }
        },

        login: function(email, password) {
            // In a real app, you would make an API call here
            // For demo purposes, we'll simulate a successful login
            this.currentUser = {
                email: email,
                name: email.split('@')[0], // Simulate name from email
                profilePic: 'https://randomuser.me/api/portraits/men/32.jpg'
            };
            this.isLoggedIn = true;
            
            // Save to localStorage
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            
            // Update UI
            this.updateUI();
            
            // Close modal
            this.closeAuthModal();
            
            // Show success message
            this.showToast('Successfully logged in!', 'success');
            
            return true;
        },

        logout: function() {
            this.currentUser = null;
            this.isLoggedIn = false;
            localStorage.removeItem('currentUser');
            this.updateUI();
            this.showToast('Successfully logged out!', 'success');
        },

        updateUI: function() {
            const signInBtn = document.getElementById('signInBtn');
            const userProfileBtn = document.getElementById('userProfileBtn');
            
            if (this.isLoggedIn) {
                // User is logged in
                if (signInBtn) signInBtn.style.display = 'none';
                if (userProfileBtn) {
                    userProfileBtn.style.display = 'block';
                    // Update profile picture
                    const profilePic = userProfileBtn.querySelector('img');
                    if (profilePic && this.currentUser?.profilePic) {
                        profilePic.src = this.currentUser.profilePic;
                    }
                }
            } else {
                // User is not logged in
                if (signInBtn) signInBtn.style.display = 'flex';
                if (userProfileBtn) userProfileBtn.style.display = 'none';
            }
        },

        setupEventListeners: function() {
            // Sign In Button
            const signInBtn = document.getElementById('signInBtn');
            if (signInBtn) {
                signInBtn.addEventListener('click', () => {
                    this.openAuthModal('login');
                });
            }

            // Auth Modal
            const authModal = document.getElementById('authModal');
            const closeAuthModal = document.querySelector('.close-auth-modal');
            
            if (closeAuthModal && authModal) {
                closeAuthModal.addEventListener('click', () => {
                    this.closeAuthModal();
                });

                // Close when clicking outside modal
                authModal.addEventListener('click', (e) => {
                    if (e.target === authModal) {
                        this.closeAuthModal();
                    }
                });
            }

            // Tab Switching
            const authTabs = document.querySelectorAll('.auth-tab');
            const authFormsContainer = document.querySelector('.auth-forms-container');
            
            if (authTabs.length > 0 && authFormsContainer) {
                authTabs.forEach(tab => {
                    tab.addEventListener('click', () => {
                        // Remove active class from all tabs
                        authTabs.forEach(t => t.classList.remove('active'));
                        
                        // Add active class to clicked tab
                        tab.classList.add('active');
                        
                        // Slide to the appropriate form
                        const formIndex = tab.dataset.tab === 'login' ? 0 : 1;
                        authFormsContainer.style.transform = `translateX(-${formIndex * 50}%)`;
                    });
                });
            }

            // Login Form
            const loginForm = document.getElementById('loginForm');
            if (loginForm) {
                loginForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const email = document.getElementById('loginEmail').value;
                    const password = document.getElementById('loginPassword').value;
                    
                    if (email && password) {
                        this.login(email, password);
                    }
                });
            }

            // Signup Form
            const signupForm = document.getElementById('signupForm');
            if (signupForm) {
                signupForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const name = document.getElementById('signupName').value;
                    const email = document.getElementById('signupEmail').value;
                    const password = document.getElementById('signupPassword').value;
                    const confirmPassword = document.getElementById('confirmPassword').value;
                    const termsAgreed = document.getElementById('termsAgreement').checked;
                    
                    if (name && email && password && confirmPassword) {
                        if (password !== confirmPassword) {
                            this.showToast('Passwords do not match!', 'error');
                            return;
                        }
                        
                        if (!termsAgreed) {
                            this.showToast('Please agree to the Terms of Service', 'error');
                            return;
                        }
                        
                        // For demo, we'll just log in with the new credentials
                        this.login(email, password);
                    }
                });
            }

            // User Dropdown
            const userProfileBtn = document.getElementById('userProfileBtn');
            const userDropdown = document.getElementById('userDropdown');
            
            if (userProfileBtn && userDropdown) {
                userProfileBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    userDropdown.classList.toggle('show');
                });

                // Close dropdown when clicking outside
                document.addEventListener('click', (e) => {
                    if (!userProfileBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                        userDropdown.classList.remove('show');
                    }
                });
            }

            // Logout Button
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.logout();
                    if (userDropdown) userDropdown.classList.remove('show');
                });
            }
        },

        openAuthModal: function(tab = 'login') {
            const authModal = document.getElementById('authModal');
            if (!authModal) return;
            
            authModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Set active tab
            const authTabs = document.querySelectorAll('.auth-tab');
            const authFormsContainer = document.querySelector('.auth-forms-container');
            
            authTabs.forEach(t => t.classList.remove('active'));
            const activeTab = document.querySelector(`.auth-tab[data-tab="${tab}"]`);
            if (activeTab) {
                activeTab.classList.add('active');
                const formIndex = tab === 'login' ? 0 : 1;
                authFormsContainer.style.transform = `translateX(-${formIndex * 50}%)`;
            }
        },

        closeAuthModal: function() {
            const authModal = document.getElementById('authModal');
            if (authModal) {
                authModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        },

        showToast: function(message, type = 'success') {
            const toast = document.createElement('div');
            toast.className = `toast-notification ${type}`;
            toast.textContent = message;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.classList.add('show');
            }, 100);
            
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 300);
            }, 3000);
        }
    };

    // Initialize auth system
    auth.init();

    // Other existing code (hero slider, navigation, etc.)
    // Mobile Navigation Toggle
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburgerBtn.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Hero Image Slider
    const heroBackgrounds = document.querySelectorAll('.hero-bg');
    const thumbnails = document.querySelectorAll('.thumbnail');
    let currentIndex = 0;
    let slideInterval;

    function showSlide(index) {
        heroBackgrounds.forEach(bg => bg.classList.remove('active'));
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        
        heroBackgrounds[index].classList.add('active');
        thumbnails[index].classList.add('active');
        
        currentIndex = index;
    }

    function nextSlide() {
        const newIndex = (currentIndex + 1) % heroBackgrounds.length;
        showSlide(newIndex);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            if (index !== currentIndex) {
                clearInterval(slideInterval);
                showSlide(index);
                startSlideShow();
            }
        });
    });

    showSlide(0);
    startSlideShow();

    // Destination Slider Navigation
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const destinationsSlider = document.querySelector('.destinations-slider');
    
    if (prevArrow && nextArrow && destinationsSlider) {
        prevArrow.addEventListener('click', () => {
            destinationsSlider.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });
        
        nextArrow.addEventListener('click', () => {
            destinationsSlider.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.custom-navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
});