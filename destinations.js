document.addEventListener('DOMContentLoaded', function() {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu Toggle - more robust selector
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links'); // Changed from 'nav ul'
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Hero Slideshow - check if slides exist
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        
        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        // Change slide every 5 seconds
        setInterval(nextSlide, 5000);
    }

    // Destination Filtering - check if elements exist
    const filterButtons = document.querySelectorAll('.filter-btn');
    const destinationCards = document.querySelectorAll('.destination-card');
    
    if (filterButtons.length > 0 && destinationCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                destinationCards.forEach(card => {
                    const cardRegion = card.getAttribute('data-region');
                    
                    if (filterValue === 'all' || cardRegion === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Card Click Handler - check if cards exist
    if (destinationCards.length > 0) {
        destinationCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Don't trigger if clicking on buttons
                if (e.target.closest('.book-now-btn') || e.target.closest('.favorite-btn') || e.target.closest('.explore-btn')) {
                    return;
                }

                const destinationId = this.getAttribute('data-destination');
                const destinationData = destinations[destinationId];
                
                if (destinationData) {
                    openDestinationModal(destinationData);
                }
            });
        });
    }

    // Modal functionality - check if modal exists
    const modal = document.querySelector('.destination-modal');
    if (modal) {
        const closeModalBtn = modal.querySelector('.close-modal');
        const modalOverlay = modal.querySelector('.modal-overlay');
        
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }
        
        if (modalOverlay) {
            modalOverlay.addEventListener('click', closeModal);
        }

        // Close modal when clicking ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
    }

    // View All Destinations button
    const viewAllBtn = document.querySelector('.view-all-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            // In a real implementation, this would load more destinations or navigate to a full listings page
            alert('Loading all 24 destinations...');
        });
    }

    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const whereInput = document.querySelector('input[placeholder="Where to?"]');
            const whenInput = document.querySelector('input[placeholder="When?"]');
            const travelersInput = document.querySelector('input[placeholder="Travelers"]');
            
            if (whereInput && whenInput && travelersInput) {
                // In a real implementation, this would filter destinations or redirect to search results
                alert(`Searching for ${travelersInput.value} travelers going to ${whereInput.value} during ${whenInput.value}`);
            }
        });
    }

    // Video button in hero section
    const videoBtn = document.querySelector('.video-btn');
    if (videoBtn) {
        videoBtn.addEventListener('click', function() {
            // In a real implementation, this would open a video modal or redirect to a video page
            alert('Playing promotional video about Algeria...');
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput) {
                // In a real implementation, this would send the email to your newsletter service
                alert(`Thank you for subscribing with ${emailInput.value}! You'll receive our next newsletter soon.`);
                this.reset();
            }
        });
    }

    // Favorite Button Functionality - use event delegation
    document.addEventListener('click', function(e) {
        if (e.target.closest('.favorite-btn')) {
            e.preventDefault();
            const button = e.target.closest('.favorite-btn');
            const icon = button.querySelector('i');
            
            // Toggle active state
            button.classList.toggle('active');
            
            // Toggle icon
            if (button.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                // Save to favorites
                const destination = button.closest('.destination-card').getAttribute('data-destination');
                saveToFavorites(destination);
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                // Remove from favorites
                const destination = button.closest('.destination-card').getAttribute('data-destination');
                removeFromFavorites(destination);
            }
        }
    });

    // Book Now Button Functionality - use event delegation
    document.addEventListener('click', function(e) {
        if (e.target.closest('.book-now-btn')) {
            const button = e.target.closest('.book-now-btn');
            const destination = button.closest('.destination-card').getAttribute('data-destination');
            const destinationData = destinations[destination];
            
            if (destinationData) {
                // Open booking modal or redirect to booking page
                openBookingModal(destinationData);
            }
        }
    });

    // Explore Button Functionality - use event delegation
    document.addEventListener('click', function(e) {
        if (e.target.closest('.explore-btn')) {
            const button = e.target.closest('.explore-btn');
            const destination = button.closest('.destination-card').getAttribute('data-destination');
            const destinationData = destinations[destination];
            
            if (destinationData) {
                openDestinationModal(destinationData);
            }
        }
    });

    // Helper Functions
    function saveToFavorites(destination) {
        let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (!favorites.includes(destination)) {
            favorites.push(destination);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }

    function removeFromFavorites(destination) {
        let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        favorites = favorites.filter(fav => fav !== destination);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    function openBookingModal(destinationData) {
        // Implement booking modal functionality
        console.log('Booking:', destinationData.title);
        alert(`Booking ${destinationData.title}`);
        // You can add your booking modal implementation here
    }

    function openDestinationModal(destinationData) {
        const modal = document.querySelector('.destination-modal');
        if (!modal) return;
        
        // Populate modal with destination data
        const modalTitle = modal.querySelector('.modal-title');
        if (modalTitle) modalTitle.textContent = destinationData.title;
        
        const ratingText = modal.querySelector('.modal-rating .rating-text');
        if (ratingText) ratingText.textContent = "4.5 (128 reviews)";
        
        const descriptionText = modal.querySelector('#modal-description-text');
        if (descriptionText) descriptionText.textContent = destinationData.description;
        
        // Set main image
        const mainImg = modal.querySelector('#modal-main-img');
        if (mainImg) {
            mainImg.src = destinationData.images[0];
            mainImg.alt = destinationData.title;
        }
        
        // Populate highlights
        const highlightsList = modal.querySelector('#modal-highlights-list');
        if (highlightsList) {
            highlightsList.innerHTML = '';
            destinationData.highlights.forEach(highlight => {
                const li = document.createElement('li');
                li.textContent = highlight;
                highlightsList.appendChild(li);
            });
        }
        
        // Populate travel info
        const bestTime = modal.querySelector('#best-time');
        if (bestTime) bestTime.textContent = destinationData.bestTime;
        
        const location = modal.querySelector('#location');
        if (location) location.textContent = destinationData.location;
        
        const climate = modal.querySelector('#climate');
        if (climate) climate.textContent = destinationData.climate;
        
        const unesco = modal.querySelector('#unesco');
        if (unesco) unesco.textContent = destinationData.unesco;
        
        // Populate itinerary
        const itineraryDays = modal.querySelector('#itinerary-days');
        if (itineraryDays) {
            itineraryDays.innerHTML = '';
            destinationData.itinerary.forEach(day => {
                const dayDiv = document.createElement('div');
                dayDiv.className = 'itinerary-day';
                dayDiv.innerHTML = `
                    <h4>${day.day}</h4>
                    <p>${day.activities}</p>
                `;
                itineraryDays.appendChild(dayDiv);
            });
        }
        
        // Populate thumbnails
        const thumbnailsContainer = modal.querySelector('.modal-thumbnails');
        if (thumbnailsContainer) {
            thumbnailsContainer.innerHTML = '';
            destinationData.images.forEach((image, index) => {
                const img = document.createElement('img');
                img.src = image;
                img.alt = `${destinationData.title} ${index + 1}`;
                img.addEventListener('click', () => {
                    if (mainImg) mainImg.src = image;
                    modal.querySelectorAll('.modal-thumbnails img').forEach(thumb => {
                        thumb.classList.remove('active');
                    });
                    img.classList.add('active');
                });
                if (index === 0) img.classList.add('active');
                thumbnailsContainer.appendChild(img);
            });
        }
        
        // Show modal
        modal.style.display = 'block';
        setTimeout(() => {
            const modalContainer = modal.querySelector('.modal-container');
            if (modalContainer) modalContainer.classList.add('active');
        }, 10);
    }

    function closeModal() {
        const modal = document.querySelector('.destination-modal');
        if (!modal) return;
        
        const modalContainer = modal.querySelector('.modal-container');
        if (modalContainer) modalContainer.classList.remove('active');
        
        setTimeout(() => {
            modal.style.display = 'none';
        }, 500);
    }

    // Initialize favorites from localStorage
    function initializeFavorites() {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        document.querySelectorAll('.favorite-btn').forEach(button => {
            const destination = button.closest('.destination-card').getAttribute('data-destination');
            if (favorites.includes(destination)) {
                button.classList.add('active');
                const icon = button.querySelector('i');
                if (icon) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                }
            }
        });
    }

    // Call initialization
    initializeFavorites();
});