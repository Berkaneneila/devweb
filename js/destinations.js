// Modern JavaScript with ES6+ features
document.addEventListener('DOMContentLoaded', () => {
    // Modern loader
    const loader = document.querySelector('.loader');
    if (loader) {
        window.addEventListener('load', () => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        });
    }

    // Modern mobile navigation
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
            hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
        });
    }

    // Modern scroll behavior for navigation
    const navLinksList = document.querySelectorAll('.nav-link');
    
    navLinksList.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            navLinksList.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            e.target.classList.add('active');
            
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Modern header scroll effect
    const header = document.querySelector('.custom-navbar');
    if (header) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('scrolled');
                return;
            }
            
            if (currentScroll > lastScroll && !header.classList.contains('scrolled-down')) {
                // Scroll down
                header.classList.add('scrolled-down');
                header.classList.remove('scrolled-up');
            } else if (currentScroll < lastScroll && header.classList.contains('scrolled-down')) {
                // Scroll up
                header.classList.add('scrolled-up');
                header.classList.remove('scrolled-down');
            }
            
            lastScroll = currentScroll;
            
            // Always add scrolled class when not at top
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // DOM Elements
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const cards = document.querySelectorAll('.destination-card');
    const favoriteButtons = document.querySelectorAll('.card-favorite, .modal-favorite');
    const modal = document.querySelector('.destination-modal');
    const modalClose = document.querySelector('.modal-close');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const destinationCards = document.querySelectorAll('.destination-card');
    const searchTrigger = document.querySelector('.search-trigger');
    const searchBtn = document.querySelector('.search-btn');
    
    // Bubble Elements
    const bubbleOverlay = document.querySelector('.bubble-overlay');
    const destinationBubble = document.querySelector('.destination-bubble');
    const bubbleTitle = document.querySelector('.bubble-title');
    const bubbleImage = document.querySelector('.bubble-image');
    const bubbleDescription = document.querySelector('.bubble-description');
    const bubbleHighlights = document.querySelector('.bubble-highlights');
    const bubbleCloseButtons = document.querySelectorAll('.bubble-close');

    // Vérification des éléments de la bulle
    if (!destinationBubble || !bubbleOverlay || !bubbleTitle || !bubbleImage || 
        !bubbleDescription || !bubbleHighlights) {
        console.error('Certains éléments de la bulle sont manquants dans le DOM');
    }

    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    }

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Destination Cards Animation
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Favorite Button Functionality
    favoriteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            button.classList.toggle('active');
            const icon = button.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
        });
    });

    // Show Bubble
    function openBubble(button) {
        const card = button.closest('.destination-card'); // Get the parent card
        const title = card.querySelector('.card-title')?.textContent || 'Unknown Title';
        const imageSrc = card.querySelector('img')?.src || '';
        const description = card.querySelector('.card-description')?.textContent || 'No description available.';
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent);

        // Update the bubble content
        bubbleTitle.textContent = title;
        bubbleImage.src = imageSrc;
        bubbleDescription.textContent = description;

        // Update highlights
        bubbleHighlights.innerHTML = ''; // Clear existing highlights
        tags.forEach(tag => {
            const span = document.createElement('span');
            span.classList.add('bubble-highlight');
            span.textContent = tag;
            bubbleHighlights.appendChild(span);
        });

        // Show the bubble
        bubbleOverlay.classList.add('active');
        destinationBubble.classList.add('active');
    }

    // Function to close the pop-up bubble
    function closeBubble() {
        bubbleOverlay.classList.remove('active');
        destinationBubble.classList.remove('active');
    }

    // Add click event listeners to all Explore buttons
    const exploreButtons = document.querySelectorAll('.explore-btn');
    exploreButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior
            openBubble(button);
        });
    });

    // Add click event listeners to close buttons
    bubbleCloseButtons.forEach(button => {
        button.addEventListener('click', closeBubble);
    });

    // Add click event listener to overlay to close the pop-up
    bubbleOverlay.addEventListener('click', closeBubble);

    // Open Modal
    exploreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const card = button.closest('.destination-card');
            const destination = card.dataset.destination;
            const data = destinations[destination];

            if (data) {
                updateModal(data);
                openModal();
            }
        });
    });

    // Update Modal Content
    function updateModal(data) {
        if (!data) return;

        const modalMainImg = document.getElementById('modal-main-img');
        const modalTitle = document.querySelector('.modal-title');
        const location = document.getElementById('location');
        const ratingText = document.querySelector('.rating-text');
        const modalDescription = document.getElementById('modal-description-text');
        const bestTime = document.getElementById('best-time');
        const climate = document.getElementById('climate');
        const unesco = document.getElementById('unesco');
        const highlightsList = document.getElementById('modal-highlights-list');
        const modalPrice = document.querySelector('.modal-price .amount');
        const modalPriceDinar = document.querySelector('.modal-price .dinar');
        const thumbnailContainer = document.querySelector('.thumbnail-container');

        if (modalMainImg) modalMainImg.src = data.image;
        if (modalTitle) modalTitle.textContent = data.title;
        if (location) location.textContent = data.location;
        if (ratingText) ratingText.textContent = `${data.rating} (${data.reviews} reviews)`;
        if (modalDescription) modalDescription.textContent = data.description;
        if (bestTime) bestTime.textContent = data.bestTime;
        if (climate) climate.textContent = data.climate;
        if (unesco) unesco.textContent = data.unesco;

        // Update highlights
        if (highlightsList && data.highlights) {
            highlightsList.innerHTML = data.highlights.map(highlight => 
                `<li><i class="fas fa-check"></i>${highlight}</li>`
            ).join('');
        }

        // Update price
        if (modalPrice) modalPrice.textContent = `$${data.price}`;
        if (modalPriceDinar) modalPriceDinar.textContent = data.priceDinar;

        // Update gallery
        if (thumbnailContainer && data.images) {
            thumbnailContainer.innerHTML = data.images.map((img, index) => `
                <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                    <img src="${img}" alt="${data.title} - Image ${index + 1}">
                </div>
            `).join('');

            // Add gallery click handlers
            document.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.addEventListener('click', () => {
                    const index = thumb.dataset.index;
                    if (modalMainImg) modalMainImg.src = data.images[index];
                    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                });
            });
        }
    }

    // Modal Functions
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        gsap.from('.modal-container', {
            y: 50,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.out'
        });
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

    // Filter System
    function filterDestinations(category) {
        destinationCards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');

            // Show card if it matches the selected category or if "all" is selected
            if (category === 'all' || categories.includes(category)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove 'active' class from all tabs
            filterTabs.forEach(tab => tab.classList.remove('active'));

            // Add 'active' class to the clicked tab
            this.classList.add('active');

            // Get the category from the clicked tab
            const category = this.getAttribute('data-category');

            // Filter destinations based on the selected category
            filterDestinations(category);
        });
    });

    // Initialize with "all" filter
    filterDestinations('all');

    // Search Functionality
    function openSearch() {
        // Implement search functionality
        console.log('Search opened');
    }

    searchTrigger.addEventListener('click', openSearch);
    searchBtn.addEventListener('click', openSearch);

    // Initialize GSAP Animations
    gsap.from('.hero-content', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });

    gsap.from('.destination-card', {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.destinations-grid',
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        }
    });
});