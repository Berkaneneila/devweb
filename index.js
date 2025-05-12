document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const mainImage = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const heroContent = document.querySelector('.hero-content h1');
    const heroDescription = document.querySelector('.hero-content p');

    // Images with paths and descriptions
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
            description: 'A coastal city known for its beautiful beaches and ancient Roman ruins.'
        }
    ];

    let currentIndex = 0;
    let slideInterval;

    // Function to change the main image
    function changeImage(index) {
        if (!mainImage) return;

        // Update the background image
        mainImage.style.backgroundImage = `url('${destinations[index].image}')`;

        // Update the hero content
        if (heroContent) heroContent.textContent = `Discover ${destinations[index].title}`;
        if (heroDescription) heroDescription.textContent = destinations[index].description;

        // Update the active thumbnail
        updateActiveThumbnail(index);
    }

    // Function to update the active thumbnail
    function updateActiveThumbnail(index) {
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }

    // Start the automatic carousel
    function startCarousel() {
        slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % destinations.length;
            changeImage(currentIndex);
        }, 5000); // Change every 5 seconds
    }

    // Stop the carousel when the mouse is over the main image
    if (mainImage) {
        mainImage.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        mainImage.addEventListener('mouseleave', startCarousel);
    }

    // Add click events to thumbnails
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            currentIndex = index;
            changeImage(currentIndex);

            // Restart the carousel timer
            clearInterval(slideInterval);
            startCarousel();
        });
    });

    // Initialize the slider
    changeImage(0); // Show the first image
    startCarousel(); // Start the carousel

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
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
});