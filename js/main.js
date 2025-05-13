document.addEventListener('DOMContentLoaded', function() {
    // Initialize auth
    Auth.init();

    // Hero Section Slider
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    let currentIndex = 0;
    const totalImages = thumbnails.length;

    // Function to update hero image
    function updateHeroImage(index) {
        // Remove active class from all backgrounds
        document.querySelectorAll('.hero-bg').forEach(bg => bg.classList.remove('active'));
        // Add active class to current background
        document.querySelectorAll('.hero-bg')[index].classList.add('active');
        
        // Update thumbnails
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnails[index].classList.add('active');
        
        currentIndex = index;
    }

    // Add click event to thumbnails
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            updateHeroImage(index);
        });
    });

    // Auto slide every 5 seconds
    setInterval(() => {
        const nextIndex = (currentIndex + 1) % totalImages;
        updateHeroImage(nextIndex);
    }, 5000);

    // Destinations Slider
    const slider = document.querySelector('.destinations-slider');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    let slidePosition = 0;
    const slideWidth = 300; // Width of each card + margin

    // Function to update slider position
    function updateSliderPosition() {
        slider.style.transform = `translateX(${slidePosition}px)`;
    }

    // Add click events to arrows
    prevArrow?.addEventListener('click', () => {
        const maxPosition = 0;
        slidePosition = Math.min(slidePosition + slideWidth, maxPosition);
        updateSliderPosition();
    });

    nextArrow?.addEventListener('click', () => {
        const maxPosition = -(slideWidth * (slider.children.length - 3));
        slidePosition = Math.max(slidePosition - slideWidth, maxPosition);
        updateSliderPosition();
    });

    // Mobile Navigation
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');

    hamburgerBtn?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburgerBtn.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.custom-navbar')) {
            navLinks?.classList.remove('active');
            hamburgerBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize any other UI components
    initializeUI();
});

// Function to initialize UI components
function initializeUI() {
    // Add loading animation to buttons
    document.querySelectorAll('.auth-btn, .cta-btn, .see-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });

    // Add hover effects to cards
    document.querySelectorAll('.destination-card, .feature-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
    });
} 