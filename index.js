document.addEventListener('DOMContentLoaded', function() {
    // Background Image Slider
    const mainImage = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const heroContent = document.querySelector('.hero-content h1');
    const heroDescription = document.querySelector('.hero-content p');
    
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
    setInterval(() => {
        currentIndex = (currentIndex + 1) % destinations.length;
        updateBackground(currentIndex);
        updateActiveThumbnail();
    }, 5000);
    
    function updateBackground(index) {
        mainImage.style.backgroundImage = `url('${destinations[index].image}')`;
        heroContent.textContent = `Discover ${destinations[index].title}`;
        heroDescription.textContent = destinations[index].description;
    }
    
    function updateActiveThumbnail() {
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentIndex);
        });
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
    
    seeMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
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