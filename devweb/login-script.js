document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const title = document.querySelector('h2');
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    // API endpoints
    const API_URL = 'http://localhost:5000/api';

    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and forms
            tabs.forEach(t => t.classList.remove('active'));
            signupForm.classList.remove('active');
            loginForm.classList.remove('active');

            // Add active class to clicked tab and corresponding form
            tab.classList.add('active');
            const formType = tab.dataset.form;
            if (formType === 'signup') {
                title.textContent = 'Sign Up';
                signupForm.classList.add('active');
            } else {
                title.textContent = 'Log In';
                loginForm.classList.add('active');
            }
        });
    });

    // Password toggle
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', () => {
            const input = button.parentElement.querySelector('input');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            button.querySelector('i').classList.toggle('fa-eye');
            button.querySelector('i').classList.toggle('fa-eye-slash');
        });
    });

    // Form submission handlers
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        messageDiv.textContent = '';

        const formData = new FormData(signupForm);
        const data = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                showMessage(result.message || 'Registration successful!', 'success');
                setTimeout(() => {
                    // Switch to login tab after successful registration
                    tabs[1].click();
                }, 1500);
            } else {
                showMessage(result.error || 'Registration failed', 'error');
            }
        } catch (error) {
            showMessage('Network error. Please try again.', 'error');
            console.error('Error:', error);
        }
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        messageDiv.textContent = '';

        const formData = new FormData(loginForm);
        const data = {
            username: formData.get('username'),
            password: formData.get('password')
        };

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                showMessage(result.message || 'Login successful!', 'success');
                // Store the token if provided
                if (result.token) {
                    localStorage.setItem('authToken', result.token);
                }
                // Redirect to home page after successful login
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                showMessage(result.error || 'Login failed', 'error');
            }
        } catch (error) {
            showMessage('Network error. Please try again.', 'error');
            console.error('Error:', error);
        }
    });

    // Social login handlers
    document.querySelectorAll('.social-btn').forEach(button => {
        button.addEventListener('click', () => {
            showMessage('Social login will be implemented soon!', 'info');
        });
    });

    // Message display helper
    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
    }
});