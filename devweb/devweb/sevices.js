document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('open');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Service data with more details
    const services = {
        'transportation': {
            title: 'Premium Transportation',
            subtitle: 'Luxury Travel Services in Algeria',
            image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            description: 'Our premium transportation services offer the ultimate in comfort and convenience for your travels across Algeria. Choose from our fleet of luxury vehicles, including sedans, SUVs, and limousines, all with professional drivers who know the country well.',
            price: 'From 15,000 DA per day',
            features: [
                { icon: 'fa-car', title: 'Vehicle Options', text: 'Sedans, SUVs, Limousines, and more' },
                { icon: 'fa-clock', title: '24/7 Availability', text: 'Service available anytime across Algeria' },
                { icon: 'fa-user-tie', title: 'Professional Drivers', text: 'Licensed, experienced local drivers' },
                { icon: 'fa-wifi', title: 'Premium Amenities', text: 'WiFi, bottled water, phone chargers included' }
            ],
            category: 'transportation'
        },
        'tour-guides': {
            title: 'Expert Tour Guides',
            subtitle: 'Personalized Algerian Experiences',
            image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            description: 'Our certified Algerian tour guides will transform your trip into an unforgettable experience. With deep knowledge of local history, culture, and hidden gems, they tailor each tour to your interests and pace throughout Algeria.',
            price: 'From 25,000 DA per day',
            features: [
                { icon: 'fa-graduation-cap', title: 'Certified Guides', text: 'Professionally trained and accredited' },
                { icon: 'fa-language', title: 'Multilingual', text: 'Available in Arabic, French, English, and more' },
                { icon: 'fa-map-marked-alt', title: 'Local Experts', text: 'Know all the best spots across Algeria' },
                { icon: 'fa-cogs', title: 'Custom Tours', text: 'Tailored to your specific interests' }
            ],
            category: 'guides'
        },
        'insurance': {
            title: 'Comprehensive Travel Insurance',
            subtitle: 'Peace of Mind Protection in Algeria',
            image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            description: 'Stay protected during your Algerian travels with our comprehensive travel insurance plans that cover medical emergencies, trip cancellations, lost luggage, and more throughout Algeria.',
            price: 'From 3,000 DA per day',
            features: [
                { icon: 'fa-umbrella-beach', title: 'Trip Coverage', text: 'Cancellation, interruption, and delays' },
                { icon: 'fa-medkit', title: 'Medical Protection', text: 'Emergency medical and dental coverage' },
                { icon: 'fa-suitcase', title: 'Baggage Protection', text: 'Lost, stolen, or damaged luggage' },
                { icon: 'fa-headset', title: '24/7 Assistance', text: 'Algeria-wide emergency assistance' }
            ],
            category: 'insurance'
        },
        'ai-planner': {
            title: 'AI Trip Planner',
            subtitle: 'Smart Algeria Travel Planning',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            description: 'Our AI-powered trip planner creates personalized Algerian itineraries based on your preferences, budget, and travel style. It learns from your feedback and adjusts recommendations to perfectly match your needs for exploring Algeria.',
            price: 'Free with premium membership',
            features: [
                { icon: 'fa-robot', title: 'AI Powered', text: 'Smart recommendations for Algeria' },
                { icon: 'fa-user-cog', title: 'Personalized', text: 'Tailored to your interests' },
                { icon: 'fa-sync-alt', title: 'Real-time Updates', text: 'Adjusts based on your feedback' },
                { icon: 'fa-money-bill-wave', title: 'Budget Aware', text: 'Optimizes for your budget in DA' }
            ],
            category: 'planning'
        },
        'luxury-hotels': {
            title: 'Luxury Hotels & Resorts',
            subtitle: 'Exclusive Algerian Accommodations',
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            description: 'Access our curated collection of luxury hotels and resorts throughout Algeria, with exclusive member rates and perks you won\'t find anywhere else.',
            price: 'From 30,000 DA per night',
            features: [
                { icon: 'fa-crown', title: '5-Star Properties', text: 'Only the finest Algerian hotels' },
                { icon: 'fa-percentage', title: 'Exclusive Rates', text: 'Member-only discounts' },
                { icon: 'fa-glass-cheers', title: 'VIP Treatment', text: 'Room upgrades and amenities' },
                { icon: 'fa-concierge-bell', title: 'Priority Service', text: 'Dedicated concierge' }
            ],
            category: 'accommodation'
        },
        'gourmet-dining': {
            title: 'Gourmet Dining Experiences',
            subtitle: 'Algerian Culinary Excellence',
            image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            description: 'Discover Algeria\'s finest restaurants and culinary experiences with our gourmet dining service. From high-end restaurants to hidden local gems, we\'ll secure reservations and arrange unforgettable dining experiences across Algeria.',
            price: 'From 8,000 DA per person',
            features: [
                { icon: 'fa-utensils', title: 'Curated Selection', text: 'Best restaurants in each Algerian city' },
                { icon: 'fa-calendar-check', title: 'Priority Reservations', text: 'Hard-to-get tables secured' },
                { icon: 'fa-wine-glass-alt', title: 'Wine Pairings', text: 'Expert sommelier recommendations' },
                { icon: 'fa-user-chef', title: 'Chef Experiences', text: 'Meet Algerian chefs' }
            ],
            category: 'dining'
        }
    };

    // Service Modal Functionality
    const serviceModal = document.getElementById('serviceModal');
    const modalClose = document.getElementById('modalClose');
    const serviceDetailBtns = document.querySelectorAll('.service-detail-btn');
    const featuredCards = document.querySelectorAll('.featured-card');

    // Open modal with service details
    function openServiceModal(serviceId) {
        const service = services[serviceId];
        if (!service) return;

        document.getElementById('modalTitle').textContent = service.title;
        document.getElementById('modalSubtitle').textContent = service.subtitle;
        document.getElementById('modalImage').src = service.image;
        document.getElementById('modalImage').alt = service.title;
        document.getElementById('modalDescription').textContent = service.description;
        document.getElementById('modalPrice').textContent = service.price;

        const featuresContainer = document.querySelector('.modal-features');
        featuresContainer.innerHTML = '';

        service.features.forEach(feature => {
            const featureItem = document.createElement('div');
            featureItem.className = 'feature-item';
            featureItem.innerHTML = `
                <div class="feature-icon">
                    <i class="fas ${feature.icon}"></i>
                </div>
                <div>
                    <h4>${feature.title}</h4>
                    <p>${feature.text}</p>
                </div>
            `;
            featuresContainer.appendChild(featureItem);
        });

        serviceModal.classList.add('active');
        document.body.classList.add('no-scroll');
    }

    // Close modal
    function closeServiceModal() {
        serviceModal.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    // Event listeners for service buttons
    serviceDetailBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceCard = this.closest('.service-card, .featured-card');
            const serviceId = serviceCard.dataset.service;
            openServiceModal(serviceId);
        });
    });

    featuredCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('button')) {
                const serviceId = this.dataset.service;
                openServiceModal(serviceId);
            }
        });
    });

    modalClose.addEventListener('click', closeServiceModal);
    serviceModal.addEventListener('click', function(e) {
        if (e.target === serviceModal) {
            closeServiceModal();
        }
    });

    // Service filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card, .featured-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter services
            serviceCards.forEach(card => {
                const serviceCategory = card.dataset.service;
                
                if (filter === 'all' || serviceCategory.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Search functionality
    const serviceSearch = document.getElementById('serviceSearch');
    const searchButton = document.getElementById('searchButton');

    function searchServices() {
        const searchTerm = serviceSearch.value.toLowerCase();
        
        serviceCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchButton.addEventListener('click', searchServices);
    serviceSearch.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchServices();
        }
    });

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(counter);
                    stat.textContent = target.toLocaleString();
                } else {
                    stat.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        });
    }

    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        observer.observe(heroStats);
    }

    // Enhanced Chatbot Functionality
    const chatbotButton = document.getElementById('chatbotButton');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');

    // Chatbot state
    let chatState = {
        currentStep: 'welcome',
        selectedServices: [],
        userInfo: {},
        conversationHistory: []
    };

    // Service prices for better estimates (in Algerian Dinar)
    const servicePrices = {
        'transportation': 15000,
        'tour guide': 25000,
        'accommodation': 30000,
        'travel insurance': 3000,
        'ai trip planner': 0,
        'gourmet dining': 8000
    };

    // Chatbot responses with friendly Algerian focus
    const chatbotResponses = {
        welcome: {
            message: "👋 Marhaba! I'm your travel assistant for Algeria. I can help you book transportation, guides, hotels, and more across this beautiful country. How can I help you today?",
            options: ["Plan my Algerian trip", "Book a service", "Get local recommendations"]
        },
        planning: {
            message: "Let's plan your perfect Algerian adventure! What type of trip are you planning?",
            options: ["Cultural exploration", "Business travel", "Sahara adventure", "Coastal getaway"]
        },
        services: {
            message: "What services would you like for your time in Algeria? Choose one or more options below 👇",
            options: []
        },
        booking: {
            message: "Which Algerian service would you like to book?",
            options: ["Transportation", "Tour Guide", "Travel Insurance", "Hotel", "Cancel"]
        },
        recommendations: {
            message: "Based on your interests, I recommend our local tour guide service to help you discover hidden Algerian gems.",
            options: ["Show me tour options", "Other services", "Main menu"]
        },
        confirmation: {
            message: "Would you like to proceed with booking or need more information about Algerian services?",
            options: ["Book now", "More info", "Cancel"]
        },
        goodbye: {
            message: "Shukran for chatting! Is there anything else I can help you with for your Algerian trip?",
            options: ["Yes, please", "No, thank you"]
        }
    };

    // Initialize chatbot with friendly Algerian greeting
    function initChatbot() {
        // Clear previous messages
        chatbotMessages.innerHTML = '';
        
        // Load conversation history if available
        const savedChat = localStorage.getItem('chatHistory');
        if (savedChat) {
            const history = JSON.parse(savedChat);
            history.forEach(msg => {
                addMessage(msg.text, msg.sender, msg.timestamp);
            });
        } else {
            // Add welcome message with local Algerian touch
            addBotMessage(chatbotResponses.welcome.message, chatbotResponses.welcome.options);
            setTimeout(() => {
                addBotMessage("📍 Note: All services are available throughout Algeria's beautiful regions.", []);
            }, 1500);
        }
    }

    // Add message to chat
    function addMessage(text, sender = 'bot', timestamp = new Date()) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        // Format timestamp
        const timeString = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${timeString}</span>
            </div>
        `;
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        // Save to conversation history
        chatState.conversationHistory.push({
            text,
            sender,
            timestamp: timestamp.getTime()
        });
        
        // Save to localStorage
        localStorage.setItem('chatHistory', JSON.stringify(chatState.conversationHistory));
        
        return messageDiv;
    }

    // Add bot message with quick replies
    function addBotMessage(text, quickReplies = []) {
        const messageDiv = addMessage(text, 'bot');
        
        if (quickReplies.length > 0) {
            const repliesDiv = document.createElement('div');
            repliesDiv.className = 'quick-replies';
            
            quickReplies.forEach(reply => {
                const replyBtn = document.createElement('button');
                replyBtn.className = 'quick-reply';
                replyBtn.textContent = reply;
                replyBtn.addEventListener('click', function() {
                    addMessage(reply, 'user');
                    setTimeout(() => {
                        processUserMessage(reply);
                    }, 800);
                });
                repliesDiv.appendChild(replyBtn);
            });
            
            messageDiv.appendChild(repliesDiv);
        }
        
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Process user message with Algerian context
    function processUserMessage(message) {
        message = message.toLowerCase();
        
        switch (chatState.currentStep) {
            case 'welcome':
                if (message.includes('plan') || message.includes('trip')) {
                    chatState.currentStep = 'planning';
                    addBotMessage(chatbotResponses.planning.message, chatbotResponses.planning.options);
                } else if (message.includes('book') || message.includes('service')) {
                    chatState.currentStep = 'booking';
                    addBotMessage(chatbotResponses.booking.message, chatbotResponses.booking.options);
                } else if (message.includes('recommend') || message.includes('suggest')) {
                    chatState.currentStep = 'recommendations';
                    addBotMessage(chatbotResponses.recommendations.message, chatbotResponses.recommendations.options);
                } else {
                    addBotMessage("I'm here to help with your Algerian travel plans. What would you like assistance with?", 
                                chatbotResponses.welcome.options);
                }
                break;
                
            case 'planning':
                // Store trip type with Algerian context
                chatState.userInfo.tripType = message;
                chatState.currentStep = 'selecting_services';
                showServiceOptions();
                break;
                
            case 'selecting_services':
                if (message.includes('done') || message.includes('finish')) {
                    if (chatState.selectedServices.length > 0) {
                        chatState.currentStep = 'confirm_plan';
                        showPlanSummary();
                    } else {
                        addBotMessage("You haven't selected any Algerian services yet. Would you like to choose some?", 
                                    ["Show services again", "Start over"]);
                    }
                } else {
                    // Check if they're selecting a service
                    const serviceSelected = checkServiceSelection(message);
                    if (!serviceSelected) {
                        addBotMessage("You can select multiple services for your Algerian trip. Choose the ones you're interested in or say 'Done' when finished.");
                    }
                }
                break;
                
            case 'confirm_plan':
                if (message.includes('yes') || message.includes('confirm')) {
                    addBotMessage("✅ Excellent! Your Algerian travel plan is ready. Would you like to:", 
                                ["Book now", "Get a detailed quote", "Modify plan"]);
                    chatState.currentStep = 'finalizing';
                } else if (message.includes('no') || message.includes('change')) {
                    chatState.currentStep = 'selecting_services';
                    showServiceOptions();
                } else {
                    addBotMessage("Please confirm if this Algerian travel plan looks good or if you'd like changes.", 
                                ["Yes, confirm", "No, make changes"]);
                }
                break;
                
            case 'booking':
                const service = checkServiceSelection(message);
                if (service) {
                    addBotMessage(`I can help you book ${service} in Algeria. Would you like to proceed?`, 
                                chatbotResponses.confirmation.options);
                    chatState.currentStep = 'finalizing';
                } else if (message.includes('cancel')) {
                    chatState.currentStep = 'welcome';
                    addBotMessage(chatbotResponses.welcome.message, chatbotResponses.welcome.options);
                } else {
                    addBotMessage("I didn't recognize that Algerian service. Please choose from the options or say 'Cancel'.", 
                                chatbotResponses.booking.options);
                }
                break;
                
            case 'recommendations':
                if (message.includes('tour') || message.includes('guide')) {
                    // Open Tour Guide service modal
                    openServiceModal('tour-guides');
                    addBotMessage("I've opened our Algerian tour guide options. Would you like to book this service?", 
                                chatbotResponses.confirmation.options);
                    chatState.currentStep = 'finalizing';
                } else if (message.includes('other')) {
                    chatState.currentStep = 'selecting_services';
                    showServiceOptions();
                } else {
                    chatState.currentStep = 'welcome';
                    addBotMessage(chatbotResponses.welcome.message, chatbotResponses.welcome.options);
                }
                break;
                
            case 'finalizing':
                if (message.includes('book') || message.includes('yes')) {
                    addBotMessage("🎉 Shukran! Your Algerian service booking is being processed. A confirmation will be sent to your email shortly.", 
                                ["Start new request", "Main menu"]);
                    // Reset chat state
                    chatState = {
                        currentStep: 'welcome',
                        selectedServices: [],
                        userInfo: {},
                        conversationHistory: chatState.conversationHistory
                    };
                } else if (message.includes('quote')) {
                    addBotMessage("I'll prepare a detailed quote in Algerian Dinar for you. Please provide your email address:");
                    chatState.currentStep = 'getting_email';
                } else {
                    chatState.currentStep = 'welcome';
                    addBotMessage(chatbotResponses.welcome.message, chatbotResponses.welcome.options);
                }
                break;
                
            case 'getting_email':
                if (validateEmail(message)) {
                    addBotMessage("📧 Thank you! The quote has been sent to your email. Can I help with anything else for your Algerian trip?", 
                                ["Yes, please", "No, thank you"]);
                    chatState.currentStep = 'welcome';
                } else if (message.includes('cancel')) {
                    chatState.currentStep = 'welcome';
                    addBotMessage(chatbotResponses.welcome.message, chatbotResponses.welcome.options);
                } else {
                    addBotMessage("That doesn't look like a valid email address. Please try again or say 'Cancel' to stop.");
                }
                break;
                
            default:
                addBotMessage(chatbotResponses.welcome.message, chatbotResponses.welcome.options);
                chatState.currentStep = 'welcome';
        }
    }

    // Validate email address
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Check if message contains service keywords with Algerian context
    function checkServiceSelection(message) {
        const services = {
            'transportation': ['car', 'drive', 'transport', 'vehicle'],
            'tour guide': ['guide', 'tour', 'local expert', 'explore'],
            'travel insurance': ['insurance', 'protection', 'safe'],
            'ai trip planner': ['planner', 'plan', 'itinerary', 'ai'],
            'accommodation': ['hotel', 'stay', 'riad', 'resort'],
            'gourmet dining': ['dining', 'food', 'restaurant', 'eat']
        };
        
        for (const [service, keywords] of Object.entries(services)) {
            if (keywords.some(keyword => message.includes(keyword))) {
                // If we're in service selection mode, add to selected services
                if (chatState.currentStep === 'selecting_services') {
                    if (!chatState.selectedServices.includes(service)) {
                        chatState.selectedServices.push(service);
                        addBotMessage(`✅ Added ${service} to your Algerian travel plan.`, []);
                    } else {
                        addBotMessage(`You've already selected ${service} for Algeria. Choose another or say 'Done'.`);
                    }
                }
                return service;
            }
        }
        return false;
    }

    // Show service options with Algerian focus
    function showServiceOptions() {
        const serviceOptions = [
            { name: 'Transportation', icon: 'fa-car', keywords: 'car, driver, vehicle' },
            { name: 'Tour Guide', icon: 'fa-user-tie', keywords: 'local expert, guided tour' },
            { name: 'Accommodation', icon: 'fa-hotel', keywords: 'hotel, riad, stay' },
            { name: 'Travel Insurance', icon: 'fa-shield-alt', keywords: 'protection, safety' },
            { name: 'AI Trip Planner', icon: 'fa-robot', keywords: 'itinerary, smart planning' },
            { name: 'Gourmet Dining', icon: 'fa-utensils', keywords: 'food, restaurants' }
        ];
        
        addBotMessage("What Algerian services would you like? Pick one or more below 👇");
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'service-options';
        
        serviceOptions.forEach(service => {
            const option = document.createElement('div');
            option.className = `service-option ${chatState.selectedServices.includes(service.name.toLowerCase()) ? 'selected' : ''}`;
            option.innerHTML = `<i class="fas ${service.icon}"></i>${service.name}`;
            option.addEventListener('click', function() {
                option.classList.toggle('selected');
                const serviceName = service.name.toLowerCase();
                if (option.classList.contains('selected')) {
                    if (!chatState.selectedServices.includes(serviceName)) {
                        chatState.selectedServices.push(serviceName);
                        addBotMessage(`✅ Added ${service.name} for your Algerian trip.`, []);
                    }
                } else {
                    chatState.selectedServices = chatState.selectedServices.filter(s => s !== serviceName);
                    addBotMessage(`❌ Removed ${service.name} from your plan.`, []);
                }
            });
            optionsDiv.appendChild(option);
        });
        
        chatbotMessages.appendChild(optionsDiv);
        
        addBotMessage("Select as many Algerian services as you need, then say 'Done' when finished.", [
            "Done selecting",
            "Cancel"
        ]);
    }

    // Show summary with Algerian pricing
    function showPlanSummary() {
        addBotMessage("📝 Here's your personalized Algerian travel plan:");
        
        const summaryDiv = document.createElement('div');
        summaryDiv.className = 'plan-summary';
        
        const ul = document.createElement('ul');
        
        // Calculate total with individual service prices
        let total = 0;
        chatState.selectedServices.forEach(service => {
            const price = servicePrices[service] || 0;
            total += price;
            
            const li = document.createElement('li');
            li.innerHTML = `<span>${service}</span> <span>${price.toLocaleString()} DA</span>`;
            ul.appendChild(li);
        });
        
        // Add estimated total price
        if (chatState.selectedServices.length > 0) {
            const totalLi = document.createElement('li');
            totalLi.className = 'total';
            totalLi.innerHTML = `<span>Estimated total</span> <span>${total.toLocaleString()} DA</span>`;
            ul.appendChild(totalLi);
            
            // Add local pricing note
            const noteLi = document.createElement('li');
            noteLi.className = 'note';
            noteLi.textContent = "Prices in Algerian Dinar (DA) for services in Algeria";
            ul.appendChild(noteLi);
        }
        
        summaryDiv.appendChild(ul);
        
        // Add action buttons
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'action-buttons';
        actionsDiv.innerHTML = `
            <button class="action-btn primary-btn">Confirm Algerian Plan</button>
            <button class="action-btn secondary-btn">Make Changes</button>
        `;
        
        actionsDiv.querySelector('.primary-btn').addEventListener('click', function() {
            addMessage("Confirm Plan", 'user');
            setTimeout(() => {
                processUserMessage("yes");
            }, 500);
        });
        
        actionsDiv.querySelector('.secondary-btn').addEventListener('click', function() {
            addMessage("Make Changes", 'user');
            setTimeout(() => {
                processUserMessage("no");
            }, 500);
        });
        
        summaryDiv.appendChild(actionsDiv);
        chatbotMessages.appendChild(summaryDiv);
        
        addBotMessage("Does this Algerian travel plan meet your needs?");
    }

    // Toggle chatbot window
    chatbotButton.addEventListener('click', function() {
        chatbotWindow.classList.toggle('active');
        if (chatbotWindow.classList.contains('active')) {
            initChatbot();
            
            // Add pulse animation when first opened
            const pulse = document.querySelector('.chatbot-pulse');
            pulse.style.animation = 'pulse 2s infinite';
            setTimeout(() => {
                pulse.style.animation = 'none';
            }, 2000);
        }
    });

    chatbotClose.addEventListener('click', function() {
        chatbotWindow.classList.remove('active');
    });

    // Send message function
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatbotInput.value = '';
            
            // Show typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'typing-indicator';
            typingIndicator.innerHTML = `
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            `;
            chatbotMessages.appendChild(typingIndicator);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            
            setTimeout(() => {
                // Remove typing indicator
                typingIndicator.remove();
                // Process user message
                processUserMessage(message);
            }, 1500);
        }
    }

    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Floating booking button
    const floatingBooking = document.getElementById('floatingBooking');
    floatingBooking.addEventListener('click', function() {
        // Open a random Algerian service modal for demo purposes
        const serviceKeys = Object.keys(services);
        const randomService = serviceKeys[Math.floor(Math.random() * serviceKeys.length)];
        openServiceModal(randomService);
    });

    // Toast notification with Algerian context
    function showToast(message) {
        const toast = document.getElementById('toastNotification');
        const toastMessage = document.getElementById('toastMessage');
        
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Book now button in modal
    document.getElementById('bookNowBtn')?.addEventListener('click', function() {
        const serviceTitle = document.getElementById('modalTitle').textContent;
        closeServiceModal();
        showToast(`Booking request sent for ${serviceTitle} in Algeria!`);
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;
    
    darkModeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        const icon = this.querySelector('i');
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    
    // Set initial icon
    const icon = darkModeToggle.querySelector('i');
    icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    skipLink.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.setAttribute('tabindex', '-1');
        target.focus();
        setTimeout(() => target.removeAttribute('tabindex'), 1000);
    });
});