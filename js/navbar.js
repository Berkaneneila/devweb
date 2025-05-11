// Check if user is logged in
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    const authBtn = document.getElementById('authBtn');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');

    if (user) {
        // User is logged in
        authBtn.style.display = 'none';
        userMenu.style.display = 'block';
        userName.textContent = user.first_name || user.username;
    } else {
        // User is not logged in
        authBtn.style.display = 'block';
        userMenu.style.display = 'none';
        // Check if we're on the login page
        if (window.location.pathname.includes('login.html')) {
            authBtn.textContent = 'Sign Up';
            authBtn.href = 'signup.html';
        } else {
            authBtn.textContent = 'Log In';
            authBtn.href = 'login.html';
        }
    }
}

// Handle logout
document.getElementById('logoutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    window.location.href = 'index.html';
});

// Mobile menu toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Check auth status on page load
document.addEventListener('DOMContentLoaded', checkAuth); 