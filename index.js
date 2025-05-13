document.addEventListener('DOMContentLoaded', function() {
// Mobile Navigation Toggle
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');
const signInBtn = document.getElementById('signInBtn');
const userProfileBtn = document.getElementById('userProfileBtn');
const userDropdown = document.getElementById('userDropdown');
const logoutBtn = document.getElementById('logoutBtn');

// Hero Image Slider
const heroBackgrounds = document.querySelectorAll('.hero-bg');
const thumbnails = document.querySelectorAll('.thumbnail');
let currentIndex = 0;
let slideInterval;

function showSlide(index) {
    // Remove active class from all backgrounds and thumbnails
    heroBackgrounds.forEach(bg => bg.classList.remove('active'));
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    // Add active class to selected background and thumbnail
    heroBackgrounds[index].classList.add('active');
    thumbnails[index].classList.add('active');
    
    currentIndex = index;
}

function nextSlide() {
    const newIndex = (currentIndex + 1) % heroBackgrounds.length;
    showSlide(newIndex);
}

// Start the slideshow
function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000);
}

// Thumbnail click event
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        if (index !== currentIndex) {
            // Reset the timer when manually changing slides
            clearInterval(slideInterval);
            showSlide(index);
            startSlideShow();
        }
    });
});

// Initialize the slider
showSlide(0);
startSlideShow();


    // Destination Slider Navigation
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const destinationsSlider = document.querySelector('.destinations-slider');
    
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

    // User Authentication Modal
    const signInBtn = document.getElementById('signInBtn');
    const userProfileBtn = document.getElementById('userProfileBtn');
    const userDropdown = document.getElementById('userDropdown');
    const authModal = document.getElementById('authModal');
    const closeAuthModal = document.getElementById('closeAuthModal');
    const loginModal = document.getElementById('loginModal');
    const closeLoginModal = document.querySelector('.close-modal');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Check if user is logged in (simulated)
    let isLoggedIn = false;
    
    // Toggle auth modal
    signInBtn.addEventListener('click', () => {
        authModal.classList.add('active');
    });
    
    closeAuthModal.addEventListener('click', () => {
        authModal.classList.remove('active');
    });
    
    // Toggle login modal (for protected content)
    document.querySelectorAll('.see-more-btn, .cta-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (!isLoggedIn) {
                e.preventDefault();
                loginModal.classList.add('active');
            }
        });
    });
    
    closeLoginModal.addEventListener('click', () => {
        loginModal.classList.remove('active');
    });
    
    // Toggle user dropdown
    userProfileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        userDropdown.style.display = 'none';
    });
    
    // Auth tabs switching
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(`${tabName}Form`).classList.add('active');
        });
    });
    
    // Form submission
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulate login
        isLoggedIn = true;
        authModal.classList.remove('active');
        signInBtn.style.display = 'none';
        userProfileBtn.style.display = 'block';
        // Show success message
        showToast('Login successful!');
    });
    
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulate signup
        isLoggedIn = true;
        authModal.classList.remove('active');
        signInBtn.style.display = 'none';
        userProfileBtn.style.display = 'block';
        // Show success message
        showToast('Account created successfully!');
    });
    
    logoutBtn.addEventListener('click', () => {
        isLoggedIn = false;
        signInBtn.style.display = 'flex';
        userProfileBtn.style.display = 'none';
        showToast('Logged out successfully');
    });
    
    // Show toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
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
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.custom-navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburgerBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // Add toast notification styles dynamically
    const toastStyles = document.createElement('style');
    toastStyles.textContent = `
        .toast-notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--primary-dark);
            color: var(--white);
            padding: 12px 24px;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 3000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .toast-notification.show {
            opacity: 1;
        }
    `;
    document.head.appendChild(toastStyles);
});
