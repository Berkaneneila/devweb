// Services Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize service filtering
    initializeServiceFilters();
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize service cards interactions
    initializeServiceCards();
});

// Service Filtering
function initializeServiceFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            serviceCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
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

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const serviceCards = document.querySelectorAll('.service-card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            serviceCards.forEach(card => {
                const title = card.querySelector('.service-title').textContent.toLowerCase();
                const description = card.querySelector('.service-description').textContent.toLowerCase();
                const tags = Array.from(card.querySelectorAll('.service-tag'))
                    .map(tag => tag.textContent.toLowerCase());

                if (title.includes(searchTerm) || 
                    description.includes(searchTerm) || 
                    tags.some(tag => tag.includes(searchTerm))) {
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
    }
}

// Service Cards Interactions
function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        // Favorite button functionality
        const favoriteBtn = card.querySelector('.favorite-btn');
        if (favoriteBtn) {
            favoriteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                favoriteBtn.classList.toggle('active');
                // Add animation
                favoriteBtn.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    favoriteBtn.style.transform = 'scale(1)';
                }, 200);
            });
        }

        // Card hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });

        // Book now button click
        const bookNowBtn = card.querySelector('.book-now-btn');
        if (bookNowBtn) {
            bookNowBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Add booking animation
                bookNowBtn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    bookNowBtn.style.transform = 'scale(1)';
                }, 200);
                // Here you can add the booking modal or redirect logic
            });
        }
    });
}

// Service Details Modal
function showServiceDetails(serviceId) {
    // Implementation for showing service details in a modal
    console.log('Showing details for service:', serviceId);
}

// Service Booking
function bookService(serviceId) {
    // Implementation for booking a service
    console.log('Booking service:', serviceId);
}

// Service Rating
function rateService(serviceId, rating) {
    // Implementation for rating a service
    console.log('Rating service:', serviceId, 'with rating:', rating);
}

// Export functions if needed
window.serviceModule = {
    showServiceDetails,
    bookService,
    rateService
}; 