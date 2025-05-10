// DOM Elements
const dashboardSections = document.querySelectorAll('.dashboard-section');
const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close-modal');
const editProfileBtn = document.querySelector('.edit-profile-btn');
const saveProfileBtn = document.querySelector('.save-btn');
const cancelProfileBtn = document.querySelector('.cancel-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const removeFavoriteBtns = document.querySelectorAll('.remove-favorite-btn');
const cancelBookingBtns = document.querySelectorAll('.cancel-booking-btn');
const avatarUploadBtn = document.querySelector('.upload-btn');
const avatarInput = document.querySelector('#avatar-input');

// Navigation
sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href').substring(1);
        
        // Update active states
        sidebarLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Show target section
        dashboardSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === target) {
                section.classList.add('active');
            }
        });
    });
});

// Modal Handling
function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

editProfileBtn?.addEventListener('click', openModal);
closeModalBtn?.addEventListener('click', closeModal);
cancelProfileBtn?.addEventListener('click', closeModal);

// Close modal when clicking outside
modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Profile Form Handling
saveProfileBtn?.addEventListener('click', () => {
    // Here you would typically handle form submission
    // For now, we'll just close the modal
    closeModal();
});

// Avatar Upload
avatarUploadBtn?.addEventListener('click', () => {
    avatarInput?.click();
});

avatarInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const avatarImg = document.querySelector('.avatar-upload img');
            if (avatarImg) {
                avatarImg.src = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    }
});

// Filter Buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Here you would typically filter the content
        // For now, we'll just log the filter
        console.log('Filter:', btn.dataset.filter);
    });
});

// Remove Favorite
removeFavoriteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.favorite-card');
        if (card) {
            // Here you would typically make an API call to remove the favorite
            // For now, we'll just remove the card from the DOM
            card.remove();
        }
    });
});

// Cancel Booking
cancelBookingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (confirm('Are you sure you want to cancel this booking?')) {
            const card = btn.closest('.booking-card');
            if (card) {
                // Here you would typically make an API call to cancel the booking
                // For now, we'll just remove the card from the DOM
                card.remove();
            }
        }
    });
});

// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Here you would typically save the user's preference
    });
}

// Initialize the first section as active
if (dashboardSections.length > 0) {
    dashboardSections[0].classList.add('active');
    sidebarLinks[0].classList.add('active');
}

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add loading state to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('no-loading')) {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1000);
        }
    });
});

// Add hover effect to cards
document.querySelectorAll('.favorite-card, .booking-card, .review-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Role-based UI logic
const userRole = 'user'; // Change to 'user' to test user view
const adminPanel = document.getElementById('admin-panel');
const roleLabel = document.getElementById('role-label');

if (roleLabel) {
    roleLabel.textContent = userRole.charAt(0).toUpperCase() + userRole.slice(1);
}
if (adminPanel) {
    if (userRole === 'admin') {
        adminPanel.style.display = 'block';
    } else {
        adminPanel.style.display = 'none';
    }
}
// Show sidebar admin link for admins
const sidebarAdminLink = document.getElementById('sidebar-admin-link');
if (sidebarAdminLink) {
    if (userRole === 'admin') {
        sidebarAdminLink.style.display = 'flex';
    } else {
        sidebarAdminLink.style.display = 'none';
    }
}
// Make admin links activate the admin panel section
function activateAdminPanel(e) {
    e.preventDefault();
    // Remove active from all sections and sidebar links
    dashboardSections.forEach(section => section.classList.remove('active'));
    sidebarLinks.forEach(link => link.classList.remove('active'));
    // Show admin panel
    if (adminPanel) adminPanel.classList.add('active');
    // Highlight sidebar link if present
    if (sidebarAdminLink) sidebarAdminLink.classList.add('active');
}
if (sidebarAdminLink) {
    sidebarAdminLink.addEventListener('click', activateAdminPanel);
}
if (profileDropdownMenu && userRole === 'admin') {
    const adminLink = Array.from(profileDropdownMenu.querySelectorAll('a')).find(a => a.textContent === 'Admin Panel');
    if (adminLink) {
        adminLink.addEventListener('click', activateAdminPanel);
    }
}

// Admin panel button actions
const adminContent = document.getElementById('admin-content');
const manageUsersBtn = document.getElementById('manage-users-btn');
const siteAnalyticsBtn = document.getElementById('site-analytics-btn');
const addDestinationBtn = document.getElementById('add-destination-btn');

if (manageUsersBtn) {
    manageUsersBtn.addEventListener('click', function() {
        if (adminContent) {
            adminContent.innerHTML = `
                <h3>Manage Users</h3>
                <table class="admin-table">
                    <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
                    <tbody>
                        <tr><td>John Doe</td><td>johndoe@email.com</td><td>User</td><td><button class="admin-action-btn">Edit</button> <button class="admin-action-btn">Delete</button></td></tr>
                        <tr><td>Jane Admin</td><td>admin@email.com</td><td>Admin</td><td><button class="admin-action-btn">Edit</button> <button class="admin-action-btn">Delete</button></td></tr>
                    </tbody>
                </table>
            `;
        }
    });
}
if (siteAnalyticsBtn) {
    siteAnalyticsBtn.addEventListener('click', function() {
        if (adminContent) {
            adminContent.innerHTML = `
                <h3>Site Analytics</h3>
                <div class="analytics-placeholder">
                    <p><i class="fas fa-chart-bar fa-2x"></i></p>
                    <p>Analytics charts would appear here (e.g., user growth, bookings, revenue).</p>
                </div>
            `;
        }
    });
}
if (addDestinationBtn) {
    addDestinationBtn.addEventListener('click', function() {
        if (adminContent) {
            adminContent.innerHTML = `
                <h3>Add New Destination</h3>
                <form class="add-destination-form">
                    <div class="form-group"><label>Name</label><input type="text" placeholder="Destination Name"></div>
                    <div class="form-group"><label>Location</label><input type="text" placeholder="Location"></div>
                    <div class="form-group"><label>Description</label><textarea placeholder="Description"></textarea></div>
                    <button type="submit" class="save-btn">Add Destination</button>
                </form>
            `;
        }
    });
}

// Enforce admin-only access to admin panel and features
function enforceAdminAccess() {
    if (userRole !== 'admin') {
        // Hide admin panel section
        if (adminPanel) adminPanel.style.display = 'none';
        // Hide sidebar admin link
        if (sidebarAdminLink) sidebarAdminLink.style.display = 'none';
        // Remove admin link from dropdown if present
        if (profileDropdownMenu) {
            const adminDropdownLink = Array.from(profileDropdownMenu.querySelectorAll('a')).find(a => a.textContent === 'Admin Panel');
            if (adminDropdownLink) adminDropdownLink.remove();
        }
        // If user tries to access #admin-panel via hash, redirect to profile
        if (window.location.hash === '#admin-panel') {
            window.location.hash = '#profile';
        }
    }
}
enforceAdminAccess(); 