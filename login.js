document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const loginTab = document.querySelector('.login-tab');
    const signupTab = document.querySelector('.signup-tab');
    const loginForm = document.querySelector('.login-form');
    const signupForm = document.querySelector('.signup-form');

    if (loginTab && signupTab) {
        loginTab.addEventListener('click', () => {
            loginTab.classList.add('active');
            signupTab.classList.remove('active');
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
        });

        signupTab.addEventListener('click', () => {
            signupTab.classList.add('active');
            loginTab.classList.remove('active');
            signupForm.style.display = 'block';
            loginForm.style.display = 'none';
        });
    }

    // Password visibility toggle
    const togglePassword = (button, input) => {
        button.addEventListener('click', () => {
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            button.innerHTML = type === 'password' ? 
                '<i class="fas fa-eye"></i>' : 
                '<i class="fas fa-eye-slash"></i>';
        });
    };

    const loginPasswordToggle = document.querySelector('.login-password-toggle');
    const loginPasswordInput = document.querySelector('.login-password-input');
    if (loginPasswordToggle && loginPasswordInput) {
        togglePassword(loginPasswordToggle, loginPasswordInput);
    }

    const signupPasswordToggle = document.querySelector('.signup-password-toggle');
    const signupPasswordInput = document.querySelector('.signup-password-input');
    if (signupPasswordToggle && signupPasswordInput) {
        togglePassword(signupPasswordToggle, signupPasswordInput);
    }

    // Login form submission
    const loginFormElement = document.querySelector('.login-form');
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.querySelector('.login-username-input').value;
            const password = document.querySelector('.login-password-input').value;
            const loginMessage = document.querySelector('.login-message');
            
            // Clear previous message
            if (loginMessage) {
                loginMessage.textContent = '';
                loginMessage.className = 'login-message';
            }

            // Make AJAX request to login
            fetch('http://localhost/devweb/backend/api/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Store user data in localStorage
                    const userData = {
                        id: data.user.id,
                        username: data.user.username,
                        email: data.user.email,
                        first_name: data.user.first_name || '',
                        last_name: data.user.last_name || '',
                        role: data.user.role
                    };
                    localStorage.setItem('user', JSON.stringify(userData));

                    // Update navbar if auth.js is loaded
                    if (typeof auth !== 'undefined') {
                        auth.updateNavbar();
                    }

                    // Show success message
                    if (loginMessage) {
                        loginMessage.textContent = 'Login successful! Redirecting...';
                        loginMessage.className = 'login-message success';
                    }

                    // Redirect to dashboard after a short delay
                    setTimeout(() => {
                        window.location.href = data.user.role === 'admin' ? 'admin.html' : 'user.html';
                    }, 1000);
                } else {
                    // Show error message
                    if (loginMessage) {
                        loginMessage.textContent = data.message || 'Login failed. Please try again.';
                        loginMessage.className = 'login-message error';
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
                if (loginMessage) {
                    loginMessage.textContent = 'An error occurred. Please try again.';
                    loginMessage.className = 'login-message error';
                }
            });
        });
    }

    // Signup form submission
    const signupFormElement = document.querySelector('.signup-form');
    if (signupFormElement) {
        signupFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.querySelector('.signup-username-input').value;
            const email = document.querySelector('.signup-email-input').value;
            const password = document.querySelector('.signup-password-input').value;
            const firstName = document.querySelector('.signup-firstname-input').value;
            const lastName = document.querySelector('.signup-lastname-input').value;
            const signupMessage = document.querySelector('.signup-message');
            
            // Clear previous message
            if (signupMessage) {
                signupMessage.textContent = '';
                signupMessage.className = 'signup-message';
            }

            // Make AJAX request to register
            fetch('http://localhost/devweb/backend/api/register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                    first_name: firstName,
                    last_name: lastName
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Store user data in localStorage
                    const userData = {
                        id: data.user.id,
                        username: data.user.username,
                        email: data.user.email,
                        first_name: firstName,
                        last_name: lastName,
                        role: data.user.role
                    };
                    localStorage.setItem('user', JSON.stringify(userData));

                    // Show success message
                    if (signupMessage) {
                        signupMessage.textContent = 'Registration successful! Redirecting...';
                        signupMessage.className = 'signup-message success';
                    }

                    // Update navbar if auth.js is loaded
                    if (typeof auth !== 'undefined') {
                        auth.updateNavbar();
                    }

                    // Redirect to appropriate page after a short delay
                    setTimeout(() => {
                        window.location.href = data.user.role === 'admin' ? 'admin.html' : 'user.html';
                    }, 1500);
                } else {
                    // Show error message
                    if (signupMessage) {
                        signupMessage.textContent = data.message || 'Registration failed. Please try again.';
                        signupMessage.className = 'signup-message error';
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
                if (signupMessage) {
                    signupMessage.textContent = 'An error occurred. Please try again.';
                    signupMessage.className = 'signup-message error';
                }
            });
        });
    }
}); 
