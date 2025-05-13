// User Profile Management
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Check if user is logged in
        if (!localStorage.getItem('isLoggedIn')) {
            window.location.href = 'index.html';
            return;
        }

        // Initialize user data
        const userData = await API.user.getProfile();
        updateUserInfo(userData);

        // Navigation
        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('.content-section');

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const targetSection = item.getAttribute('data-section');
                
                // Update active states
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                
                sections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === targetSection) {
                        section.classList.add('active');
                    }
                });

                // Load section data
                loadSectionData(targetSection);
            });
        });

        // Profile Form
        const profileForm = document.getElementById('profile-form');
        if (profileForm) {
            profileForm.addEventListener('submit', handleProfileUpdate);
        }

        // Password Form
        const passwordForm = document.getElementById('password-form');
        if (passwordForm) {
            passwordForm.addEventListener('submit', handlePasswordUpdate);
        }

        // Notifications Form
        const notificationsForm = document.getElementById('notifications-form');
        if (notificationsForm) {
            notificationsForm.addEventListener('submit', handleNotificationsUpdate);
        }

        // Profile Picture Upload
        const changePicBtn = document.querySelector('.change-pic-btn');
        if (changePicBtn) {
            changePicBtn.addEventListener('click', handleProfilePictureUpload);
        }

        // Load initial dashboard data
        loadDashboard();
    } catch (error) {
        console.error('Error initializing user dashboard:', error);
        showToast('Error loading user data', 'error');
    }
});

// Update user information in the UI
function updateUserInfo(user) {
    const userName = document.querySelector('.user-name');
    const userEmail = document.querySelector('.user-email');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');

    if (userName) userName.textContent = user.name || 'User';
    if (userEmail) userEmail.textContent = user.email || 'user@example.com';
    if (fullNameInput) fullNameInput.value = user.name || '';
    if (emailInput) emailInput.value = user.email || '';
    if (phoneInput) phoneInput.value = user.phone || '';
    if (addressInput) addressInput.value = user.address || '';
}

// Load section data
async function loadSectionData(section) {
    try {
        switch (section) {
            case 'dashboard':
                await loadDashboard();
                break;
            case 'bookings':
                await loadBookings();
                break;
            case 'favorites':
                await loadFavorites();
                break;
            case 'reviews':
                await loadReviews();
                break;
            case 'settings':
                await loadSettings();
                break;
        }
    } catch (error) {
        console.error(`Error loading ${section} data:`, error);
        showToast(`Error loading ${section} data`, 'error');
    }
}

// Load dashboard data
async function loadDashboard() {
    try {
        const stats = await API.get('user/stats.php');
        
        // Update stats in UI
        document.querySelectorAll('.stat-value').forEach(stat => {
            const label = stat.nextElementSibling.textContent.toLowerCase();
            if (label.includes('booking')) stat.textContent = stats.bookings || 0;
            if (label.includes('favorite')) stat.textContent = stats.favorites || 0;
            if (label.includes('review')) stat.textContent = stats.reviews || 0;
            if (label.includes('city')) stat.textContent = stats.cities || 0;
        });

        // Load upcoming trips
        const trips = await API.get('user/trips.php', { status: 'upcoming' });
        const tripsContainer = document.querySelector('.upcoming-trips');
        if (tripsContainer) {
            if (trips.length === 0) {
                tripsContainer.innerHTML = '<div class="no-data">No upcoming trips</div>';
            } else {
                tripsContainer.innerHTML = trips.map(trip => `
                    <div class="trip-card">
                        <img src="${trip.image}" alt="${trip.destination}">
                        <div class="trip-info">
                            <h4>${trip.destination}</h4>
                            <p>${trip.dates}</p>
                            <span class="trip-status ${trip.status.toLowerCase()}">${trip.status}</span>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Load recent activity
        const activities = await API.get('user/activities.php');
        const activityContainer = document.querySelector('.activity-timeline');
        if (activityContainer) {
            if (activities.length === 0) {
                activityContainer.innerHTML = '<div class="no-data">No recent activity</div>';
            } else {
                activityContainer.innerHTML = activities.map(activity => `
                    <div class="activity-item">
                        <div class="activity-icon">
                            <i class="fas ${getActivityIcon(activity.type)}"></i>
                        </div>
                        <div class="activity-content">
                            <p>${activity.description}</p>
                            <span class="activity-time">${activity.time}</span>
                        </div>
                    </div>
                `).join('');
            }
        }
    } catch (error) {
        console.error('Error loading dashboard:', error);
        showToast('Error loading dashboard data', 'error');
    }
}

// Load bookings
async function loadBookings() {
    try {
        const bookings = await API.get('user/bookings.php');
        const bookingsList = document.querySelector('.bookings-list');
        if (!bookingsList) return;

        if (bookings.length === 0) {
            bookingsList.innerHTML = '<div class="no-data">No bookings found</div>';
        } else {
            bookingsList.innerHTML = bookings.map(booking => `
                <div class="booking-card">
                    <img src="${booking.image}" alt="${booking.destination}">
                    <div class="booking-info">
                        <h4>${booking.destination}</h4>
                        <p>${booking.dates}</p>
                        <span class="booking-status ${booking.status.toLowerCase()}">${booking.status}</span>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading bookings:', error);
        showToast('Error loading bookings', 'error');
    }
}

// Load favorites
async function loadFavorites() {
    try {
        const favorites = await API.get('user/favorites.php');
        const favoritesGrid = document.querySelector('.favorites-grid');
        if (!favoritesGrid) return;

        if (favorites.length === 0) {
            favoritesGrid.innerHTML = '<div class="no-data">No favorites found</div>';
        } else {
            favoritesGrid.innerHTML = favorites.map(favorite => `
                <div class="favorite-card">
                    <img src="${favorite.image}" alt="${favorite.name}">
                    <div class="favorite-info">
                        <h4>${favorite.name}</h4>
                        <p>${favorite.description}</p>
                        <button class="remove-favorite" onclick="removeFavorite(${favorite.id})">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading favorites:', error);
        showToast('Error loading favorites', 'error');
    }
}

// Load reviews
async function loadReviews() {
    try {
        const reviews = await API.get('user/reviews.php');
        const reviewsList = document.querySelector('.reviews-list');
        if (!reviewsList) return;

        if (reviews.length === 0) {
            reviewsList.innerHTML = '<div class="no-data">No reviews found</div>';
        } else {
            reviewsList.innerHTML = reviews.map(review => `
                <div class="review-card">
                    <div class="review-header">
                        <img src="${review.image}" alt="${review.destination}">
                        <div class="review-info">
                            <h4>${review.destination}</h4>
                            <div class="rating">
                                ${generateStars(review.rating)}
                            </div>
                        </div>
                    </div>
                    <p class="review-text">${review.text}</p>
                    <span class="review-date">${review.date}</span>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading reviews:', error);
        showToast('Error loading reviews', 'error');
    }
}

// Load settings
async function loadSettings() {
    try {
        const settings = await API.get('user/settings.php');
        const emailNotif = document.getElementById('emailNotif');
        const smsNotif = document.getElementById('smsNotif');
        const marketingNotif = document.getElementById('marketingNotif');

        if (emailNotif) emailNotif.checked = settings.emailNotifications;
        if (smsNotif) smsNotif.checked = settings.smsNotifications;
        if (marketingNotif) marketingNotif.checked = settings.marketingNotifications;
    } catch (error) {
        console.error('Error loading settings:', error);
        showToast('Error loading settings', 'error');
    }
}

// Handle profile update
async function handleProfileUpdate(e) {
    e.preventDefault();
    
    try {
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address')
        };

        const updatedUser = await API.user.updateProfile(data);
        updateUserInfo(updatedUser);
        showToast('Profile updated successfully', 'success');
    } catch (error) {
        console.error('Error updating profile:', error);
        showToast('Error updating profile', 'error');
    }
}

// Handle password update
async function handlePasswordUpdate(e) {
    e.preventDefault();
    
    try {
        const formData = new FormData(e.target);
        const data = {
            currentPassword: formData.get('currentPassword'),
            newPassword: formData.get('newPassword'),
            confirmPassword: formData.get('confirmPassword')
        };

        if (data.newPassword !== data.confirmPassword) {
            showToast('Passwords do not match', 'error');
            return;
        }

        await API.user.changePassword(data);
        showToast('Password updated successfully', 'success');
        e.target.reset();
    } catch (error) {
        console.error('Error updating password:', error);
        showToast('Error updating password', 'error');
    }
}

// Handle notifications update
async function handleNotificationsUpdate(e) {
    e.preventDefault();
    
    try {
        const formData = new FormData(e.target);
        const data = {
            emailNotifications: formData.get('emailNotif') === 'on',
            smsNotifications: formData.get('smsNotif') === 'on',
            marketingNotifications: formData.get('marketingNotif') === 'on'
        };

        await API.put('user/settings.php', data);
        showToast('Settings updated successfully', 'success');
    } catch (error) {
        console.error('Error updating settings:', error);
        showToast('Error updating settings', 'error');
    }
}

// Handle profile picture upload
async function handleProfilePictureUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append('profilePicture', file);

            const response = await fetch(`${API.baseUrl}/user/profile/picture.php`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to upload profile picture');
            }

            const result = await response.json();
            const profilePic = document.querySelector('.profile-pic img');
            if (profilePic) {
                profilePic.src = result.pictureUrl;
            }
            showToast('Profile picture updated successfully', 'success');
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            showToast('Error uploading profile picture', 'error');
        }
    };

    input.click();
}

// Helper Functions
function getActivityIcon(type) {
    const icons = {
        booking: 'fa-calendar-check',
        review: 'fa-star',
        favorite: 'fa-heart',
        default: 'fa-info-circle'
    };
    return icons[type] || icons.default;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return `
        ${'<i class="fas fa-star"></i>'.repeat(fullStars)}
        ${halfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
        ${'<i class="far fa-star"></i>'.repeat(emptyStars)}
    `;
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Export data
async function exportData() {
    try {
        const data = await API.get('user/export.php');
        const dataStr = JSON.stringify(data, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = 'user-data.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    } catch (error) {
        console.error('Error exporting data:', error);
        showToast('Error exporting data', 'error');
    }
}

// Delete account
async function deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        try {
            await API.delete('user/account.php');
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Error deleting account:', error);
            showToast('Error deleting account', 'error');
        }
    }
}

// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const signInBtn = document.getElementById('signInBtn');
    const userProfileBtn = document.getElementById('userProfileBtn');

    if (isLoggedIn) {
        signInBtn.style.display = 'none';
        userProfileBtn.style.display = 'block';
        
        // Load user profile picture if available
        const userProfilePic = localStorage.getItem('userProfilePic');
        if (userProfilePic) {
            userProfileBtn.querySelector('img').src = userProfilePic;
        }
    } else {
        signInBtn.style.display = 'flex';
        userProfileBtn.style.display = 'none';
    }
}

// Handle logout
document.getElementById('logoutBtn')?.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        await API.auth.logout();
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userProfilePic');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error logging out:', error);
        showToast('Error logging out', 'error');
    }
});

// Check auth status when page loads
document.addEventListener('DOMContentLoaded', checkAuth); 