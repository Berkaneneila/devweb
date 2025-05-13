// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    // Background Image Slider
    const mainImage = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const heroContent = document.querySelector('.hero-content h1');
    const heroDescription = document.querySelector('.hero-content p');
    
    // Only initialize slider if required elements exist
    if (mainImage && thumbnails.length > 0 && heroContent && heroDescription) {
        const destinations = [
            {
                image: 'photos yassir/akger.jpg',
                title: 'Algiers',
                description: 'The capital city known as "Algiers the White" for its beautiful white buildings and Mediterranean charm.'
            },
            {
                image: 'photos yassir/oued souf.jpg',
                title: 'Oued Souf',
                description: 'Discover the unique desert architecture and golden dunes of this Saharan region.'
            },
            {
                image: 'photos yassir/oran.jpg',
                title: 'Oran',
                description: 'Vibrant coastal city with Spanish influences and a thriving cultural scene.'
            },
            {
                image: 'photos yassir/sahara.jpg',
                title: 'Sahara Desert',
                description: 'Experience the vastness of the world\'s largest hot desert with stunning landscapes.'
            },
            {
                image: 'photos yassir/annaba.jpg',
                title: 'Annaba',
                description: 'Beautiful coastal city with Roman ruins and stunning Mediterranean beaches.'
            }
        ];
        
        // Set initial background
        let currentIndex = 0;
        updateBackground(currentIndex);
        
        // Thumbnail click event
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                currentIndex = index;
                updateBackground(currentIndex);
                updateActiveThumbnail();
            });
        });
        
        // Auto slide change
        let slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % destinations.length;
            updateBackground(currentIndex);
            updateActiveThumbnail();
        }, 5000);
        
        // Pause auto-slide on hover
        mainImage.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        mainImage.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % destinations.length;
                updateBackground(currentIndex);
                updateActiveThumbnail();
            }, 5000);
        });
        
        function updateBackground(index) {
            if (index >= 0 && index < destinations.length) {
                const imageUrl = destinations[index].image;
                mainImage.style.backgroundImage = `url('${imageUrl}')`;
                heroContent.textContent = `Discover ${destinations[index].title}`;
                heroDescription.textContent = destinations[index].description;
            }
        }
        
        function updateActiveThumbnail() {
            thumbnails.forEach((thumb, index) => {
                thumb.classList.toggle('active', index === currentIndex);
            });
        }
    }
    
    // Destination Slider
    const slider = document.querySelector('.destinations-slider');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    
    if (slider && prevBtn && nextBtn) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        // Mouse events for dragging
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        slider.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('touchend', () => {
            isDown = false;
        });
        
        slider.addEventListener('touchmove', (e) => {
            if(!isDown) return;
            const x = e.touches[0].pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
        
        // Arrow buttons
        prevBtn.addEventListener('click', () => {
            slider.scrollBy({
                left: -350,
                behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', () => {
            slider.scrollBy({
                left: 350,
                behavior: 'smooth'
            });
        });
    }
    
    // Modal functionality
    const seeMoreButtons = document.querySelectorAll('.see-more-btn');
    const modal = document.getElementById('loginModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (seeMoreButtons.length > 0 && modal && closeModal) {
        seeMoreButtons.forEach(button => {
            button.addEventListener('click', () => {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Navbar scroll effect
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
    
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

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
    if (userProfileBtn && dropdownMenu) {
        userProfileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });
    }
    
    // Close dropdown when clicking outside
    if (dropdownMenu) {
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.user-profile-circle') && dropdownMenu.classList.contains('show')) {
                dropdownMenu.classList.remove('show');
            }
        });
    }
    
    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            updateAuthUI();
            window.location.href = 'index.html';
        });
    }
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