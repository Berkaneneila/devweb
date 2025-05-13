// Main application functionality
const App = {
    // DOM Elements
    elements: {
        mainImage: document.getElementById('mainImage'),
        thumbnails: document.querySelectorAll('.thumbnail'),
        prevArrow: document.querySelector('.prev-arrow'),
        nextArrow: document.querySelector('.next-arrow'),
        destinationsSlider: document.querySelector('.destinations-slider'),
        hamburgerBtn: document.getElementById('hamburgerBtn'),
        navLinks: document.getElementById('navLinks')
    },

    // Current slide index
    currentSlide: 0,

    // Initialize application
    init: function() {
        this.bindEvents();
        this.startSlideshow();
    },

    // Bind event listeners
    bindEvents: function() {
        // Thumbnail clicks
        this.elements.thumbnails?.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => this.showSlide(index));
        });

        // Navigation arrows
        this.elements.prevArrow?.addEventListener('click', () => this.showPrevSlide());
        this.elements.nextArrow?.addEventListener('click', () => this.showNextSlide());

        // Mobile menu
        this.elements.hamburgerBtn?.addEventListener('click', () => this.toggleMobileMenu());

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.custom-navbar')) {
                this.closeMobileMenu();
            }
        });
    },

    // Show specific slide
    showSlide: function(index) {
        const slides = this.elements.mainImage?.querySelectorAll('.hero-bg');
        const thumbnails = this.elements.thumbnails;

        if (!slides || !thumbnails) return;

        // Update current slide
        this.currentSlide = index;

        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        // Update thumbnails
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    },

    // Show previous slide
    showPrevSlide: function() {
        const slides = this.elements.mainImage?.querySelectorAll('.hero-bg');
        if (!slides) return;

        const newIndex = (this.currentSlide - 1 + slides.length) % slides.length;
        this.showSlide(newIndex);
    },

    // Show next slide
    showNextSlide: function() {
        const slides = this.elements.mainImage?.querySelectorAll('.hero-bg');
        if (!slides) return;

        const newIndex = (this.currentSlide + 1) % slides.length;
        this.showSlide(newIndex);
    },

    // Start automatic slideshow
    startSlideshow: function() {
        setInterval(() => this.showNextSlide(), 5000);
    },

    // Toggle mobile menu
    toggleMobileMenu: function() {
        this.elements.navLinks?.classList.toggle('show');
        this.elements.hamburgerBtn?.classList.toggle('active');
    },

    // Close mobile menu
    closeMobileMenu: function() {
        this.elements.navLinks?.classList.remove('show');
        this.elements.hamburgerBtn?.classList.remove('active');
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    App.init();
}); 