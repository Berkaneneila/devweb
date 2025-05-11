document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    const inputs = contactForm.querySelectorAll('input, textarea');
    const sendButton = contactForm.querySelector('.send-message');

    // Form validation
    function validateForm() {
        let isValid = true;
        let firstInvalidInput = null;

        inputs.forEach(input => {
            if (input.type === 'radio') return; // Skip radio buttons from required validation

            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('invalid');
                if (!firstInvalidInput) firstInvalidInput = input;
            } else {
                input.classList.remove('invalid');
            }

            // Email validation
            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    input.classList.add('invalid');
                    if (!firstInvalidInput) firstInvalidInput = input;
                }
            }

            // Phone validation
            if (input.type === 'tel' && input.value) {
                const phoneRegex = /^\+?[\d\s-]{10,}$/;
                if (!phoneRegex.test(input.value)) {
                    isValid = false;
                    input.classList.add('invalid');
                    if (!firstInvalidInput) firstInvalidInput = input;
                }
            }
        });

        if (firstInvalidInput) {
            firstInvalidInput.focus();
        }

        return isValid;
    }

    // Handle input events
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('invalid');
        });
    });

    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            showNotification('Please fill in all required fields correctly', 'error');
            return;
        }

        // Get form data
        const formData = {
            firstName: contactForm.querySelector('input[placeholder="Enter your first name"]').value,
            lastName: contactForm.querySelector('input[placeholder="Enter your last name"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            phone: contactForm.querySelector('input[type="tel"]').value,
            subject: contactForm.querySelector('input[name="subject"]:checked')?.value || 'Not specified',
            message: contactForm.querySelector('textarea').value
        };

        // Disable submit button and show loading state
        sendButton.disabled = true;
        sendButton.textContent = 'Sending...';

        try {
            // In a real application, you would send this to your backend
            // For now, we'll simulate an API call
            await simulateApiCall(formData);

            // Show success message
            showNotification('Message sent successfully!', 'success');

            // Reset form
            contactForm.reset();
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Re-enable submit button
            sendButton.disabled = false;
            sendButton.textContent = 'Send Message';
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