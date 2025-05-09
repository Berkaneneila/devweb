document.addEventListener('DOMContentLoaded', function() {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Hero Slideshow
    const slides = document.querySelectorAll('.slide');
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

    // Destination Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const destinationCards = document.querySelectorAll('.destination-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            destinationCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-filter').includes(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Destination Modal
    const exploreButtons = document.querySelectorAll('.explore-btn');
    const modal = document.querySelector('.destination-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    // Destination data
    const destinations = {
        algiers: {
            title: "Algiers",
            description: "Algiers, known as 'Alger la Blanche' (Algiers the White) for its gleaming white buildings, is a city of contrasts where French colonial architecture meets Ottoman heritage and modern vibrancy. The UNESCO-listed Casbah is a maze of narrow streets and historic buildings, while the modern downtown features wide boulevards and Mediterranean views.",
            highlights: [
                "Explore the UNESCO-listed Casbah with its Ottoman palaces and mosques",
                "Visit the stunning Notre Dame d'Afrique basilica overlooking the sea",
                "Walk along the Mediterranean at the modern waterfront promenade",
                "Discover the Bardo Museum's impressive collection of prehistoric artifacts",
                "Experience vibrant Algerian culture at the National Museum of Fine Arts"
            ],
            bestTime: "March to May and September to November",
            location: "Northern Algeria, on the Mediterranean coast",
            climate: "Mediterranean with mild, wet winters and hot, dry summers",
            unesco: "Kasbah of Algiers (1992)",
            itinerary: [
                {
                    day: "Day 1",
                    activities: "Arrival and Casbah exploration"
                },
                {
                    day: "Day 2",
                    activities: "City center and museums tour"
                },
                {
                    day: "Day 3",
                    activities: "Day trip to Tipaza Roman ruins"
                }
            ],
            images: [
                "photos/algiers.jpg",
                "photos/algiers-2.jpg",
                "photos/algiers-3.jpg",
                "photos/algiers-4.jpg"
            ]
        },
        oran: {
            title: "Oran",
            description: "Oran is Algeria's second largest city and a vibrant cultural hub known as the birthplace of raï music. With its Spanish-influenced architecture, lively arts scene, and beautiful Mediterranean beaches, Oran offers a more relaxed alternative to Algiers while still packing plenty of cultural punch.",
            highlights: [
                "Visit the Santa Cruz Fort and Chapel with panoramic city views",
                "Explore the Bey's Palace and other Ottoman-era landmarks",
                "Enjoy Oran's famous nightlife and raï music scene",
                "Relax at the beautiful beaches of Les Andalouses",
                "Discover the city's unique Spanish colonial heritage"
            ],
            bestTime: "April to June and September to October",
            location: "Northwest Algeria, on the Mediterranean coast",
            climate: "Mediterranean with hot summers and mild winters",
            unesco: "None in Oran proper (nearby M'zab Valley is UNESCO)",
            itinerary: [
                {
                    day: "Day 1",
                    activities: "City center and historical sites"
                },
                {
                    day: "Day 2",
                    activities: "Santa Cruz Fort and beaches"
                },
                {
                    day: "Day 3",
                    activities: "Cultural experiences and nightlife"
                }
            ],
            images: [
                "photos/oran.jpg",
                "photos/oran-2.jpg",
                "photos/oran-3.jpg"
            ]
        },
        constantine: {
            title: "Constantine",
            description: "Perched dramatically on cliffs high above the Rhumel River gorges, Constantine is one of Algeria's most spectacular cities. Known as the 'City of Bridges', it features breathtaking Ottoman architecture, ancient Roman ruins, and stunning natural scenery.",
            highlights: [
                "Walk across the Sidi M'Cid Bridge for breathtaking views",
                "Explore the Palace of Ahmed Bey with its exquisite Ottoman decorations",
                "Visit the Cirta Museum's impressive archaeological collection",
                "Discover the ancient Roman ruins at Tiddis",
                "Experience the traditional Soummaa Valley and its waterfalls"
            ],
            bestTime: "April to June and September to October",
            location: "Northeastern Algeria, inland from the coast",
            climate: "Mediterranean with hot summers and cool winters",
            unesco: "None",
            itinerary: [
                {
                    day: "Day 1",
                    activities: "City center and bridges tour"
                },
                {
                    day: "Day 2",
                    activities: "Palace of Ahmed Bey and museums"
                },
                {
                    day: "Day 3",
                    activities: "Day trip to Tiddis Roman ruins"
                }
            ],
            images: [
                "photos/constantine.jpg",
                "photos/constantine-2.jpg",
                "photos/constantine-3.jpg"
            ]
        },
        ghardaia: {
            title: "Ghardaia",
            description: "The principal city of the M'zab Valley, Ghardaia is a UNESCO World Heritage site renowned for its unique Mozabite architecture and preserved traditional way of life. The city's pyramid-shaped buildings and intricate urban planning are marvels of desert adaptation.",
            highlights: [
                "Explore the ancient ksar (fortified village) with its distinctive architecture",
                "Visit the bustling traditional markets selling carpets and pottery",
                "Learn about Mozabite culture and traditions at the heritage center",
                "See the ingenious ancient water distribution system",
                "Experience sunset over the palm groves from a rooftop terrace"
            ],
            bestTime: "October to April",
            location: "Northern Sahara, in the M'zab Valley",
            climate: "Desert climate with hot days and cool nights",
            unesco: "M'zab Valley (1982)",
            itinerary: [
                {
                    day: "Day 1",
                    activities: "Arrival and Ghardaia ksar exploration"
                },
                {
                    day: "Day 2",
                    activities: "Markets and cultural experiences"
                },
                {
                    day: "Day 3",
                    activities: "Visit to nearby Beni Isguen and El Atteuf"
                }
            ],
            images: [
                "photos/ghardaia.jpg",
                "photos/ghardaia-2.jpg",
                "photos/ghardaia-3.jpg"
            ]
        },
        djanet: {
            title: "Djanet",
            description: "Gateway to the Tassili n'Ajjer National Park, Djanet is an oasis town surrounded by some of the Sahara's most spectacular landscapes. The area is famous for its prehistoric rock art and surreal sandstone formations.",
            highlights: [
                "Visit the famous 'Flying Goat' and other prehistoric rock art sites",
                "Explore the stunning Tadrart Rouge with its towering dunes",
                "Camp under the stars in the desert with Tuareg guides",
                "Discover the ancient oasis gardens and traditional irrigation",
                "Hike through the dramatic canyon of Essendilene"
            ],
            bestTime: "November to March",
            location: "Extreme southeast Algeria, near Libyan border",
            climate: "Extreme desert with hot days and cold nights",
            unesco: "Tassili n'Ajjer (1982)",
            itinerary: [
                {
                    day: "Day 1",
                    activities: "Arrival and Djanet oasis exploration"
                },
                {
                    day: "Day 2-4",
                    activities: "Desert safari to rock art sites"
                },
                {
                    day: "Day 5",
                    activities: "Return to Djanet and departure"
                }
            ],
            images: [
                "photos/djanet.jpg",
                "photos/djanet-2.jpg",
                "photos/djanet-3.jpg"
            ]
        },
        tamanrasset: {
            title: "Tamanrasset",
            description: "The largest city in southern Algeria, Tamanrasset is the gateway to the Hoggar Mountains and a center of Tuareg culture. The surrounding volcanic landscapes are among the most dramatic in the Sahara.",
            highlights: [
                "Visit the Assekrem hermitage with its breathtaking views",
                "Explore the volcanic landscapes of the Atakor massif",
                "Experience Tuareg culture at local markets and camps",
                "See the prehistoric rock engravings at Oued Djerat",
                "Climb Mount Tahat, Algeria's highest peak"
            ],
            bestTime: "November to March",
            location: "Southern Algeria, in the Hoggar Mountains",
            climate: "Desert climate with cooler temperatures due to altitude",
            unesco: "None (but nearby Ahaggar National Park is significant)",
            itinerary: [
                {
                    day: "Day 1",
                    activities: "Arrival and city orientation"
                },
                {
                    day: "Day 2-3",
                    activities: "Excursion to Assekrem and Atakor"
                },
                {
                    day: "Day 4",
                    activities: "Cultural experiences in Tamanrasset"
                }
            ],
            images: [
                "photos/tamanrasset.jpg",
                "photos/tamanrasset-2.jpg",
                "photos/tamanrasset-3.jpg"
            ]
        },
        tipaza: {
            title: "Tipaza",
            description: "This coastal town combines stunning Mediterranean views with impressive Roman ruins. The archaeological site, a UNESCO World Heritage site, features well-preserved remains set against the sea.",
            highlights: [
                "Explore the Roman ruins including theaters, basilicas and villas",
                "Walk along the scenic coastal path through the archaeological park",
                "Visit the Royal Mauritanian Mausoleum with its unique architecture",
                "Relax at the beautiful beaches near the ruins",
                "See the Christian basilica with its ancient mosaics"
            ],
            bestTime: "April to June and September to October",
            location: "Mediterranean coast, about 70km west of Algiers",
            climate: "Mediterranean with mild winters and warm summers",
            unesco: "Tipasa (1982)",
            itinerary: [
                {
                    day: "Day 1",
                    activities: "Full day exploring the ruins and beaches"
                }
            ],
            images: [
                "photos/tipaza.jpg",
                "photos/tipaza-2.jpg",
                "photos/tipaza-3.jpg"
            ]
        },
        bejaia: {
            title: "Bejaia",
            description: "Nestled between the Mediterranean and the Djurdjura Mountains, Bejaia is known for its stunning natural beauty, Kabylian culture, and historic landmarks including a Spanish fortress.",
            highlights: [
                "Visit the 16th-century Spanish Fort and museum",
                "Take the cable car up to the Pic des Singes for panoramic views",
                "Explore the Gouraya National Park with its diverse wildlife",
                "Swim at the beautiful Cap Carbon beach",
                "Experience Kabylian culture at the local markets"
            ],
            bestTime: "May to October",
            location: "Mediterranean coast in Kabylia region",
            climate: "Mediterranean with mild winters and warm summers",
            unesco: "None",
            itinerary: [
                {
                    day: "Day 1",
                    activities: "City tour and fortress visit"
                },
                {
                    day: "Day 2",
                    activities: "Gouraya National Park and beaches"
                }
            ],
            images: [
                "photos/bejaia.jpg",
                "photos/bejaia-2.jpg",
                "photos/bejaia-3.jpg"
            ]
        },
        biskra: {
            title: "Biskra",
            description: "Known as the 'Queen of the Oases', Biskra is famous for its vast palm groves, therapeutic hot springs, and as a historic crossroads of Saharan trade routes.",
            highlights: [
                "Relax in the therapeutic hot springs of Hammam Salahine",
                "Explore the vast palm groves and traditional irrigation systems",
                "Visit the historic ksar (fortified village) of Sidi Okba",
                "See the desert landscapes of the nearby Ziban region",
                "Experience traditional date harvest activities (in season)"
            ],
            bestTime: "October to April",
            location: "Northern edge of the Sahara, southeast of Algiers",
            climate: "Desert climate with hot summers and mild winters",
            unesco: "None",
            itinerary: [
                {
                    day: "Day 1",
                    activities: "City tour and hot springs"
                },
                {
                    day: "Day 2",
                    activities: "Palm groves and Sidi Okba visit"
                }
            ],
            images: [
                "photos/biskra.jpg",
                "photos/biskra-2.jpg",
                "photos/biskra-3.jpg"
            ]
        },
        tlemcen: {
            title: "Tlemcen",
            description: "This Andalusian-influenced city is known for its refined Islamic architecture, including the Great Mosque and the ruins of Mansourah. The surrounding area features beautiful forests and waterfalls.",
            highlights: [
                "Visit the Great Mosque with its exquisite decorations",
                "Explore the ruins of the massive Mansourah fortress",
                "See the El Mechouar Palace and its gardens",
                "Hike to the scenic waterfalls of El Ourit",
                "Experience Andalusi music at cultural events"
            ],
            bestTime: "April to June and September to November",
            location: "Northwest Algeria, near Moroccan border",
            climate: "Mediterranean with mild winters and warm summers",
            unesco: "None",
            itinerary: [
                {
                    day: "Day 1",
                    activities: "City center and Great Mosque"
                },
                {
                    day: "Day 2",
                    activities: "Mansourah and El Ourit waterfalls"
                }
            ],
            images: [
                "photos/tlemcen.jpg",
                "photos/tlemcen-2.jpg",
                "photos/tlemcen-3.jpg"
            ]
        },
        annaba: {
            title: "Annaba",
            description: "This important port city is home to the impressive ruins of Hippo Regius, where Saint Augustine was bishop. The city combines ancient history with modern beach resorts.",
            highlights: [
                "Explore the extensive ruins of Hippo Regius",
                "Visit the Basilica of St. Augustine with its panoramic views",
                "Relax at the beautiful beaches of Seraidi",
                "See the Edough Massif's diverse flora and fauna",
                "Experience the lively Corniche waterfront"
            ],
            bestTime: "May to October",
            location: "Northeast Algeria on the Mediterranean coast",
            climate: "Mediterranean with mild winters and warm summers",
            unesco: "None (but Hippo Regius is significant)",
            itinerary: [
                {
                    day: "Day 1",
                    activities: "Hippo Regius and Basilica"
                },
                {
                    day: "Day 2",
                    activities: "Beaches and Edough Massif"
                }
            ],
            images: [
                "photos/annaba.jpg",
                "photos/annaba-2.jpg",
                "photos/annaba-3.jpg"
            ]
        },
        setif: {
            title: "Setif",
            description: "A high plateau city with a rich Roman heritage, Setif is known for its archaeological museum and as a gateway to the Aurès Mountains and Numidian ruins.",
            highlights: [
                "Visit the Setif Archaeological Museum's excellent collection",
                "Explore the Roman ruins at Djemila (UNESCO site)",
                "See the Ain El Fouara fountain in the city center",
                "Take a day trip to the Numidian ruins at Khemissa",
                "Experience the lively weekly markets"
            ],
            bestTime: "April to June and September to October",
            location: "High plateau of eastern Algeria",
            climate: "Continental with cold winters and warm summers",
            unesco: "Djemila (nearby, 1982)",
            itinerary: [
                {
                    day: "Day 1",
                    activities: "City tour and museum"
                },
                {
                    day: "Day 2",
                    activities: "Day trip to Djemila"
                }
            ],
            images: [
                "photos/setif.jpg",
                "photos/setif-2.jpg",
                "photos/setif-3.jpg"
            ]
        }
    };

    // Open modal with destination data
    exploreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const destinationCard = this.closest('.destination-card');
            const destinationId = destinationCard.getAttribute('data-destination');
            const destinationData = destinations[destinationId];
            
            if (destinationData) {
                // Populate modal with destination data
                document.querySelector('.modal-title').textContent = destinationData.title;
                document.querySelector('.modal-rating .rating-text').textContent = "4.5 (128 reviews)"; // You can make this dynamic if you have actual review data
                document.getElementById('modal-description-text').textContent = destinationData.description;
                
                // Set main image
                const mainImg = document.getElementById('modal-main-img');
                mainImg.src = destinationData.images[0];
                mainImg.alt = destinationData.title;
                
                // Populate highlights
                const highlightsList = document.getElementById('modal-highlights-list');
                highlightsList.innerHTML = '';
                destinationData.highlights.forEach(highlight => {
                    const li = document.createElement('li');
                    li.textContent = highlight;
                    highlightsList.appendChild(li);
                });
                
                // Populate travel info
                document.getElementById('best-time').textContent = destinationData.bestTime;
                document.getElementById('location').textContent = destinationData.location;
                document.getElementById('climate').textContent = destinationData.climate;
                document.getElementById('unesco').textContent = destinationData.unesco;
                
                // Populate itinerary
                const itineraryDays = document.getElementById('itinerary-days');
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
                
                // Populate thumbnails
                const thumbnailsContainer = document.querySelector('.modal-thumbnails');
                thumbnailsContainer.innerHTML = '';
                destinationData.images.forEach((image, index) => {
                    const img = document.createElement('img');
                    img.src = image;
                    img.alt = `${destinationData.title} ${index + 1}`;
                    img.addEventListener('click', () => {
                        mainImg.src = image;
                        document.querySelectorAll('.modal-thumbnails img').forEach(thumb => {
                            thumb.classList.remove('active');
                        });
                        img.classList.add('active');
                    });
                    if (index === 0) img.classList.add('active');
                    thumbnailsContainer.appendChild(img);
                });
                
                // Show modal
                modal.style.display = 'block';
                setTimeout(() => {
                    document.querySelector('.modal-container').classList.add('active');
                }, 10);
            }
        });
    });

    // Close modal
    function closeModal() {
        document.querySelector('.modal-container').classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 500);
    }

    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Close modal when clicking ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

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
            const whereInput = document.querySelector('input[placeholder="Where to?"]').value;
            const whenInput = document.querySelector('input[placeholder="When?"]').value;
            const travelersInput = document.querySelector('input[placeholder="Travelers"]').value;
            
            // In a real implementation, this would filter destinations or redirect to search results
            alert(`Searching for ${travelersInput} travelers going to ${whereInput} during ${whenInput}`);
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
            const email = this.querySelector('input[type="email"]').value;
            // In a real implementation, this would send the email to your newsletter service
            alert(`Thank you for subscribing with ${email}! You'll receive our next newsletter soon.`);
            this.reset();
        });
    }
});