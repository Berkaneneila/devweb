document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    const inputs = contactForm.querySelectorAll('input, textarea');
    const sendButton = contactForm.querySelector('.send-message');

    // Form validation
// Update the existing form validation code
function validateForm() {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    
    // Validate name
    const nameInput = document.getElementById('name');
    if (!nameInput.value.trim()) {
        nameInput.parentElement.classList.add('error');
        isValid = false;
    } else {
        nameInput.parentElement.classList.remove('error');
    }
    
    // Validate email with better feedback
    const emailInput = document.getElementById('email');
    if (!emailInput.value.trim()) {
        emailInput.parentElement.classList.add('error');
        emailInput.nextElementSibling.textContent = 'Please enter your email';
        isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
        emailInput.parentElement.classList.add('error');
        emailInput.nextElementSibling.textContent = 'Please enter a valid email address';
        isValid = false;
    } else {
        emailInput.parentElement.classList.remove('error');
    }
    
    // Validate phone if provided
    const phoneInput = document.getElementById('phone');
    if (phoneInput.value.trim() && !phoneRegex.test(phoneInput.value)) {
        phoneInput.parentElement.classList.add('error');
        phoneInput.nextElementSibling.textContent = 'Please enter a valid phone number';
        phoneInput.nextElementSibling.style.display = 'block';
        isValid = false;
    } else {
        phoneInput.parentElement.classList.remove('error');
        phoneInput.nextElementSibling.style.display = 'none';
    }
    
    // Validate subject
    const subjectInput = document.getElementById('subject');
    if (!subjectInput.value) {
        subjectInput.parentElement.classList.add('error');
        isValid = false;
    } else {
        subjectInput.parentElement.classList.remove('error');
    }
    
    // Validate message with minimum length
    const messageInput = document.getElementById('message');
    if (!messageInput.value.trim()) {
        messageInput.parentElement.classList.add('error');
        messageInput.nextElementSibling.textContent = 'Please enter your message';
        isValid = false;
    } else if (messageInput.value.trim().length < 20) {
        messageInput.parentElement.classList.add('error');
        messageInput.nextElementSibling.textContent = 'Message should be at least 20 characters';
        isValid = false;
    } else {
        messageInput.parentElement.classList.remove('error');
    }
    
    return isValid;
}

// Add input event listeners for real-time validation
document.getElementById('email').addEventListener('input', function() {
    if (this.value.trim()) {
        this.parentElement.classList.remove('error');
    }
});

document.getElementById('message').addEventListener('input', function() {
    if (this.value.trim() && this.value.trim().length >= 20) {
        this.parentElement.classList.remove('error');
    }
});

    // Simulate API call
    function simulateApiCall(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form data:', data);
                resolve();
            }, 1500);
        });
    }

    // Notification system
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Add styles dynamically
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '1rem 2rem';
        notification.style.borderRadius = '5px';
        notification.style.color = 'white';
        notification.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
        notification.style.zIndex = '1000';
        notification.style.animation = 'slideIn 0.5s ease';

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }

    // Add these styles to your CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }

        .invalid {
            border-color: #f44336 !important;
        }

        .notification {
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
    `;
    document.head.appendChild(style);
}); 

// Back to top button
const backToTopBtn = document.createElement('div');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});