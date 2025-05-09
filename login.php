<?php
$host = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'travel';

// Connect to the database
$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

session_start(); // Start a session to track logged-in users

// Get form inputs
$username = $_POST['username'];
$password = $_POST['password'];

// Check if user exists
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    // Verify password
    if (password_verify($password, $user['password'])) {
        $_SESSION['username'] = $user['username'];
        echo "Login successful! Welcome, " . $user['username'];
        // You can also redirect: header("Location: dashboard.php");
    } else {
        echo "Invalid password!";
    }
} else {
    echo "No user found with that username!";
}

$conn->close();
?>
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('open');
        navLinks.classList.toggle('active');
    });

    // Service Modals
    const serviceCards = document.querySelectorAll('.service-card, .featured-card');
    const serviceModal = document.getElementById('serviceModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalPrice = document.getElementById('modalPrice');
    const bookNowBtn = document.getElementById('bookNowBtn');
    const contactBtn = document.getElementById('contactBtn');

    // Service data
    const services = {
        'transportation': {
            title: 'Premium Transportation',
            subtitle: 'Luxury Travel Services',
            image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            description: 'Our premium transportation services offer the ultimate in comfort and convenience for your travels. Choose from our fleet of luxury vehicles, including sedans, SUVs, and limousines, all with professional drivers who know the area well.',
            price: '$75 - $300 per day',
            features: [
                { icon: 'fa-car', title: 'Vehicle Options', text: 'Sedans, SUVs, Limousines' },
                { icon: 'fa-clock', title: '24/7 Availability', text: 'Service available anytime' },
                { icon: 'fa-user-tie', title: 'Professional Drivers', text: 'Licensed and experienced' },
                { icon: 'fa-wifi', title: 'Amenities', text: 'WiFi, water, phone chargers' }
            ]
        },
        'tour-guides': {
            title: 'Expert Tour Guides',
            subtitle: 'Personalized Experiences',
            image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            description: 'Our certified tour guides will transform your trip into an unforgettable experience. With deep knowledge of local history, culture, and hidden gems, they tailor each tour to your interests and pace.',
            price: '$120 - $400 per day',
            features: [
                { icon: 'fa-graduation-cap', title: 'Certified Guides', text: 'Professionally trained' },
                { icon: 'fa-language', title: 'Multilingual', text: 'Speak multiple languages' },
                { icon: 'fa-map-marked-alt', title: 'Local Experts', text: 'Know all the best spots' },
                { icon: 'fa-customize', title: 'Custom Tours', text: 'Tailored to your interests' }
            ]
        },
        'ai-planner': {
            title: 'AI Trip Planner',
            subtitle: 'Smart Travel Planning',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            description: 'Our AI-powered trip planner creates personalized itineraries based on your preferences, budget, and travel style. It learns from your feedback and adjusts recommendations to perfectly match your needs.',
            price: 'Free with premium membership',
            features: [
                { icon: 'fa-robot', title: 'AI Powered', text: 'Smart recommendations' },
                { icon: 'fa-user-cog', title: 'Personalized', text: 'Tailored to your preferences' },
                { icon: 'fa-sync-alt', title: 'Real-time Updates', text: 'Adjusts based on feedback' },
                { icon: 'fa-money-bill-wave', title: 'Budget Aware', text: 'Works with your budget' }
            ]
        }
    };

    // Chatbot state and message history
    let chatState = {
        currentStep: 'welcome',
        selectedServices: [],
        userInfo: {}
    };
    let chatMessages = [];

    // Initialize chat history
    function loadChatHistory() {
        const savedChat = localStorage.getItem('chatHistory');
        if (savedChat) {
            try {
                const messages = JSON.parse(savedChat);
                messages.forEach(msg => {
                    const messageDiv = document.createElement('div');
                    messageDiv.className = `message ${msg.sender}-message`;
                    messageDiv.textContent = msg.text;
                    document.getElementById('chatbotMessages').appendChild(messageDiv);
                });
            } catch (e) {
                console.error('Error loading chat history:', e);
            }
        }
    }

    // Save chat history
    function saveChatHistory() {
        const messages = [];
        document.querySelectorAll('#chatbotMessages .message').forEach(msg => {
            messages.push({
                sender: msg.classList.contains('user-message') ? 'user' : 'bot',
                text: msg.textContent
            });
        });
        localStorage.setItem('chatHistory', JSON.stringify(messages));
    }

    // Initialize chat
    function initializeChat() {
        loadChatHistory();
        if (document.getElementById('chatbotMessages').children.length === 0) {
            addBotMessage("Hello! I'm your travel assistant. How can I help you today?", [
                "Plan my trip",
                "Book a service",
                "Get recommendations"
            ]);
        }
    }

    // [Rest of your existing service modal code...]

    // Enhanced Chatbot Functionality
    const chatbotButton = document.getElementById('chatbotButton');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');

    // Initialize chat when page loads
    initializeChat();

    chatbotButton.addEventListener('click', function() {
        chatbotWindow.classList.toggle('active');
        if (chatbotWindow.classList.contains('active')) {
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

    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

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
                typingIndicator.remove();
                processUserMessage(message);
                saveChatHistory();
            }, 1500);
        }
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        chatMessages.push({sender, text});
    }

    function addBotMessage(text, quickReplies = []) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.textContent = text;
        
        if (quickReplies.length > 0) {
            const repliesDiv = document.createElement('div');
            repliesDiv.className = 'quick-replies';
            
            quickReplies.forEach(reply => {
                const replyBtn = document.createElement('div');
                replyBtn.className = 'quick-reply';
                replyBtn.textContent = reply;
                replyBtn.addEventListener('click', function() {
                    addMessage(reply, 'user');
                    setTimeout(() => {
                        processUserMessage(reply);
                    }, 1000);
                });
                repliesDiv.appendChild(replyBtn);
            });
            
            messageDiv.appendChild(repliesDiv);
        }
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        chatMessages.push({sender: 'bot', text});
    }

    function processUserMessage(message) {
        message = message.toLowerCase();
        
        // Handle transportation keyword
        if (message.includes('transportation')) {
            addBotMessage("Let me show you our Transportation options...");
            setTimeout(() => {
                const transportSection = document.querySelector('[data-service="transportation"]');
                if (transportSection) {
                    transportSection.scrollIntoView({ behavior: 'smooth' });
                    transportSection.style.boxShadow = '0 0 0 3px rgba(0,188,212,0.5)';
                    setTimeout(() => {
                        transportSection.style.boxShadow = '';
                    }, 3000);
                }
            }, 1000);
            return;
        }

        // [Rest of your existing processUserMessage logic]
        
        // Save chat after processing
        saveChatHistory();
    }

    // Initialize Flatpickr when entering planning mode
    function initializeDatePickers() {
        flatpickr(".trip-dates", {
            mode: "range",
            minDate: "today",
            dateFormat: "Y-m-d",
            onClose: function(selectedDates) {
                if (selectedDates.length === 2) {
                    addBotMessage(`Trip dates set from ${selectedDates[0].toDateString()} to ${selectedDates[1].toDateString()}.`);
                }
            }
        });
    }

    function startPlanningMode() {
        const template = document.getElementById('planningTemplate');
        const planningTools = template.cloneNode(true);
        planningTools.id = "activePlanningTools";
        planningTools.style.display = 'block';
        chatbotMessages.appendChild(planningTools);
        
        initializeDatePickers();
        
        const budgetSlider = planningTools.querySelector('.budget-slider');
        const budgetValue = planningTools.querySelector('#budgetValue');
        
        budgetSlider.addEventListener('input', () => {
            budgetValue.textContent = `$${budgetSlider.value}`;
        });
        
        planningTools.querySelectorAll('.priority-buttons button').forEach(btn => {
            btn.addEventListener('click', function() {
                planningTools.querySelectorAll('.priority-buttons button').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        planningTools.querySelectorAll('.checklist input').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                savePlan();
            });
        });
    }

    function savePlan() {
        const planData = {
            dates: document.querySelector('.trip-dates')?.value,
            budget: document.querySelector('.budget-slider')?.value,
            checklist: getChecklistStatus()
        };
        localStorage.setItem('travelPlan', JSON.stringify(planData));
    }

    function getChecklistStatus() {
        return Array.from(document.querySelectorAll('.checklist input')).map(el => ({
            name: el.nextSibling.textContent.trim(),
            checked: el.checked
        }));
    }

    // Toast Notification
    function showToast(message) {
        const toast = document.getElementById('toastNotification');
        const toastMessage = document.getElementById('toastMessage');
        
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});

// Initialize Flatpickr after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.trip-dates')) {
        flatpickr(".trip-dates", {
            mode: "range",
            minDate: "today"
        });
    }
});