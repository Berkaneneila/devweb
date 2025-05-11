// User Profile Management
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!auth.requireAuth()) {
        return; // Redirect will happen in requireAuth if not logged in
    }

    // Initialize user data
    const user = auth.getCurrentUser();
    updateUserInfo(user);

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
});

// Update user information in the UI
function updateUserInfo(user) {
    const userName = document.querySelector('.user-name');
    const userEmail = document.querySelector('.user-email');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');

    if (userName) userName.textContent = `${user.first_name} ${user.last_name}`;
    if (userEmail) userEmail.textContent = user.email;
    if (fullNameInput) fullNameInput.value = `${user.first_name} ${user.last_name}`;
    if (emailInput) emailInput.value = user.email;
    if (phoneInput) phoneInput.value = user.phone || '';
    if (addressInput) addressInput.value = user.address || '';
}

// Load section data
function loadSectionData(section) {
    switch (section) {
        case 'bookings':
            loadBookings();
            break;
        case 'favorites':
            loadFavorites();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

// Load user's bookings
function loadBookings() {
    const bookingsList = document.querySelector('.bookings-list');
    if (!bookingsList) return;

    bookingsList.innerHTML = '<div class="loading">Loading bookings...</div>';

    // Fetch bookings from the server
    fetch('/api/bookings', {
        headers: {
            'Authorization': `Bearer ${auth.getToken()}`
        }
    })
    .then(response => response.json())
    .then(bookings => {
        if (bookings.length === 0) {
            bookingsList.innerHTML = '<p class="no-data">No bookings found.</p>';
            return;
        }

        bookingsList.innerHTML = bookings.map(booking => `
            <div class="booking-card">
                <div class="card-image">
                    <img src="${booking.destination.image}" alt="${booking.destination.name}">
                    <span class="booking-status ${booking.status.toLowerCase()}">${booking.status}</span>
                </div>
                <div class="card-content">
                    <h4>${booking.destination.name}</h4>
                    <div class="booking-details">
                        <p><i class="fas fa-calendar"></i> ${formatDate(booking.start_date)} - ${formatDate(booking.end_date)}</p>
                        <p><i class="fas fa-users"></i> ${booking.travelers} Travelers</p>
                        <p><i class="fas fa-hotel"></i> ${booking.accommodation}</p>
                    </div>
                    <div class="booking-actions">
                        <button class="view-details-btn" onclick="viewBookingDetails('${booking.id}')">View Details</button>
                        ${booking.status === 'CONFIRMED' ? 
                            `<button class="cancel-booking-btn" onclick="cancelBooking('${booking.id}')">Cancel Booking</button>` : 
                            ''}
                    </div>
                </div>
            </div>
        `).join('');
    })
    .catch(error => {
        console.error('Error loading bookings:', error);
        bookingsList.innerHTML = '<p class="error">Error loading bookings. Please try again later.</p>';
    });
}

// Load user's favorites
function loadFavorites() {
    const favoritesGrid = document.querySelector('.favorites-grid');
    if (!favoritesGrid) return;

    favoritesGrid.innerHTML = '<div class="loading">Loading favorites...</div>';

    // Fetch favorites from the server
    fetch('/api/favorites', {
        headers: {
            'Authorization': `Bearer ${auth.getToken()}`
        }
    })
    .then(response => response.json())
    .then(favorites => {
        if (favorites.length === 0) {
            favoritesGrid.innerHTML = '<p class="no-data">No favorites found.</p>';
            return;
        }

        favoritesGrid.innerHTML = favorites.map(favorite => `
            <div class="favorite-card">
                <div class="card-image">
                    <img src="${favorite.image}" alt="${favorite.name}">
                    <button class="remove-favorite-btn" onclick="removeFavorite('${favorite.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="card-content">
                    <h4>${favorite.name}</h4>
                    <div class="card-meta">
                        <span><i class="fas fa-star"></i> ${favorite.rating}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${favorite.region}</span>
                    </div>
                    <p>${favorite.description}</p>
                    <button class="view-details-btn" onclick="viewDestination('${favorite.id}')">View Details</button>
                </div>
            </div>
        `).join('');
    })
    .catch(error => {
        console.error('Error loading favorites:', error);
        favoritesGrid.innerHTML = '<p class="error">Error loading favorites. Please try again later.</p>';
    });
}

// Load user settings
function loadSettings() {
    // Load notification preferences
    fetch('/api/user/settings', {
        headers: {
            'Authorization': `Bearer ${auth.getToken()}`
        }
    })
    .then(response => response.json())
    .then(settings => {
        const emailNotif = document.getElementById('emailNotif');
        const smsNotif = document.getElementById('smsNotif');
        
        if (emailNotif) emailNotif.checked = settings.emailNotifications;
        if (smsNotif) smsNotif.checked = settings.smsNotifications;
    })
    .catch(error => {
        console.error('Error loading settings:', error);
    });
}

// Handle profile update
function handleProfileUpdate(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        first_name: formData.get('fullName').split(' ')[0],
        last_name: formData.get('fullName').split(' ').slice(1).join(' '),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address')
    };

    fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.getToken()}`
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            showNotification('Profile updated successfully', 'success');
            updateUserInfo(result.user);
        } else {
            showNotification(result.message || 'Error updating profile', 'error');
        }
    })
    .catch(error => {
        console.error('Error updating profile:', error);
        showNotification('Error updating profile. Please try again later.', 'error');
    });
}

// Handle password update
function handlePasswordUpdate(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        currentPassword: formData.get('currentPassword'),
        newPassword: formData.get('newPassword'),
        confirmPassword: formData.get('confirmPassword')
    };

    if (data.newPassword !== data.confirmPassword) {
        showNotification('New passwords do not match', 'error');
        return;
    }

    fetch('/api/user/password', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.getToken()}`
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            showNotification('Password updated successfully', 'success');
            e.target.reset();
        } else {
            showNotification(result.message || 'Error updating password', 'error');
        }
    })
    .catch(error => {
        console.error('Error updating password:', error);
        showNotification('Error updating password. Please try again later.', 'error');
    });
}

// Handle notifications update
function handleNotificationsUpdate(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        emailNotifications: formData.get('emailNotif') === 'on',
        smsNotifications: formData.get('smsNotif') === 'on'
    };

    fetch('/api/user/settings', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.getToken()}`
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            showNotification('Settings updated successfully', 'success');
        } else {
            showNotification(result.message || 'Error updating settings', 'error');
        }
    })
    .catch(error => {
        console.error('Error updating settings:', error);
        showNotification('Error updating settings. Please try again later.', 'error');
    });
}

// Handle profile picture upload
function handleProfilePictureUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profilePicture', file);

        fetch('/api/user/profile/picture', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${auth.getToken()}`
            },
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                const profilePic = document.querySelector('.profile-pic img');
                if (profilePic) {
                    profilePic.src = result.pictureUrl;
                }
                showNotification('Profile picture updated successfully', 'success');
            } else {
                showNotification(result.message || 'Error updating profile picture', 'error');
            }
        })
        .catch(error => {
            console.error('Error uploading profile picture:', error);
            showNotification('Error uploading profile picture. Please try again later.', 'error');
        });
    };

    input.click();
}

// Helper Functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showNotification(message, type = 'info') {
    // You can implement your preferred notification system here
    alert(message);
}

// View booking details
function viewBookingDetails(bookingId) {
    window.location.href = `/booking-details.html?id=${bookingId}`;
}

// Cancel booking
function cancelBooking(bookingId) {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    fetch(`/api/bookings/${bookingId}/cancel`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${auth.getToken()}`
        }
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            showNotification('Booking cancelled successfully', 'success');
            loadBookings(); // Reload bookings
        } else {
            showNotification(result.message || 'Error cancelling booking', 'error');
        }
    })
    .catch(error => {
        console.error('Error cancelling booking:', error);
        showNotification('Error cancelling booking. Please try again later.', 'error');
    });
}

// Remove favorite
function removeFavorite(favoriteId) {
    if (!confirm('Are you sure you want to remove this destination from favorites?')) return;

    fetch(`/api/favorites/${favoriteId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${auth.getToken()}`
        }
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            showNotification('Destination removed from favorites', 'success');
            loadFavorites(); // Reload favorites
        } else {
            showNotification(result.message || 'Error removing favorite', 'error');
        }
    })
    .catch(error => {
        console.error('Error removing favorite:', error);
        showNotification('Error removing favorite. Please try again later.', 'error');
    });
}

// View destination details
function viewDestination(destinationId) {
    window.location.href = `/destination-details.html?id=${destinationId}`;
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
document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userProfilePic');
    window.location.href = 'index.html';
});

// Check auth status when page loads
document.addEventListener('DOMContentLoaded', checkAuth); 