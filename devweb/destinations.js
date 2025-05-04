document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const searchInput = document.getElementById('searchInput');
    const regionFilter = document.getElementById('regionFilter');
    const typeFilter = document.getElementById('typeFilter');
    const destinationCards = document.querySelectorAll('.destination-card');
    const modal = document.getElementById('destinationModal');
    const closeModal = document.querySelector('.close-modal');
    const modalBody = document.querySelector('.modal-body');

    // Destination data (in a real application, this would come from a backend)
    const destinationData = {
        'Algiers': {
            title: 'Algiers',
            description: 'The capital city of Algeria, known for its white architecture and Mediterranean charm. Explore the historic Casbah, visit the Notre-Dame d\'Afrique, and enjoy the beautiful Mediterranean coastline.',
            highlights: [
                'Historic Casbah',
                'Notre-Dame d\'Afrique',
                'Mediterranean coastline',
                'Modern architecture'
            ],
            bestTime: 'March to May, September to November',
            duration: '3-5 days',
            price: 'Starting from $500'
        },
        'Sahara Desert': {
            title: 'Sahara Desert',
            description: 'Experience the magic of the world\'s largest hot desert. Take a camel trek, sleep under the stars, and witness breathtaking sunsets over the golden dunes.',
            highlights: [
                'Camel trekking',
                'Desert camping',
                'Sand dunes',
                'Traditional music'
            ],
            bestTime: 'October to April',
            duration: '4-7 days',
            price: 'Starting from $800'
        },
        'Oran': {
            title: 'Oran',
            description: 'A vibrant port city with rich history and culture. Visit the Santa Cruz Fort, explore the old town, and enjoy the local cuisine and music scene.',
            highlights: [
                'Santa Cruz Fort',
                'Old town',
                'Local cuisine',
                'Music scene'
            ],
            bestTime: 'April to October',
            duration: '2-3 days',
            price: 'Starting from $300'
        },
        'Oued Souf': {
            title: 'Oued Souf',
            description: 'Discover the unique architecture and desert oasis of Oued Souf. Experience traditional desert life and explore the beautiful palm groves.',
            highlights: [
                'Traditional architecture',
                'Palm groves',
                'Desert oasis',
                'Local crafts'
            ],
            bestTime: 'September to May',
            duration: '2-3 days',
            price: 'Starting from $400'
        }
    };

    // Search and filter functionality
    function filterDestinations() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedRegion = regionFilter.value;
        const selectedType = typeFilter.value;

        destinationCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const region = card.dataset.region;
            const type = card.dataset.type;

            const matchesSearch = title.includes(searchTerm);
            const matchesRegion = !selectedRegion || region === selectedRegion;
            const matchesType = !selectedType || type === selectedType;

            if (matchesSearch && matchesRegion && matchesType) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Event listeners for search and filters
    searchInput.addEventListener('input', filterDestinations);
    regionFilter.addEventListener('change', filterDestinations);
    typeFilter.addEventListener('change', filterDestinations);

    // Modal functionality
    function showDestinationDetails(destination) {
        const data = destinationData[destination];
        if (!data) return;

        modalBody.innerHTML = `
            <div class="destination-details">
                <h2>${data.title}</h2>
                <p class="description">${data.description}</p>
                
                <div class="highlights">
                    <h3>Highlights</h3>
                    <ul>
                        ${data.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                    </ul>
                </div>

                <div class="info-grid">
                    <div class="info-item">
                        <h4>Best Time to Visit</h4>
                        <p>${data.bestTime}</p>
                    </div>
                    <div class="info-item">
                        <h4>Recommended Duration</h4>
                        <p>${data.duration}</p>
                    </div>
                    <div class="info-item">
                        <h4>Price Range</h4>
                        <p>${data.price}</p>
                    </div>
                </div>

                <button class="book-now">Book This Tour</button>
            </div>
        `;

        modal.style.display = 'block';
    }

    // Event listeners for view details buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.destination-card');
            const destination = card.querySelector('h3').textContent;
            showDestinationDetails(destination);
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Book now functionality
    document.querySelectorAll('.book-now').forEach(button => {
        button.addEventListener('click', () => {
            // In a real application, this would redirect to a booking page
            alert('Booking functionality will be implemented soon!');
        });
    });
}); 