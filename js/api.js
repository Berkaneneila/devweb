/**
 * API Utilities
 * Handles all API requests and server communication
 */

const API = {
    // Base API URL
    baseUrl: 'http://localhost/devweb/backend',

    // Maximum number of retries for failed requests
    maxRetries: 3,

    // Delay between retries (in milliseconds)
    retryDelay: 1000,

    // Get headers with auth token
    getHeaders: function() {
        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
    },

    // Handle API response
    handleResponse: async (response) => {
        try {
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'API request failed');
            }
            
            return data;
        } catch (error) {
            if (error.name === 'SyntaxError') {
                throw new Error('Invalid response from server');
            }
            throw error;
        }
    },

    // Retry function for failed requests
    async retry(fn, retries = API.maxRetries, delay = API.retryDelay) {
        try {
            return await fn();
        } catch (error) {
            if (retries === 0) {
                throw error;
            }
            await new Promise(resolve => setTimeout(resolve, delay));
            return API.retry(fn, retries - 1, delay);
        }
    },

    // Check server status
    checkServerStatus: async function() {
        try {
            const response = await fetch(`${this.baseUrl}/test.php`);
            const data = await response.json();
            return data.status === 'success';
        } catch (error) {
            console.error('Server status check failed:', error);
            return false;
        }
    },

    // Generic request handler
    request: async function(endpoint, options = {}) {
        try {
            // Add default headers
            const headers = {
                'Content-Type': 'application/json',
                ...options.headers
            };

            // Add auth token if available
            const token = localStorage.getItem('token');
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            // Make request
            const response = await fetch(`${this.baseUrl}/${endpoint}`, {
                ...options,
                headers
            });

            // Parse response
            const data = await response.json();

            // Handle errors
            if (!response.ok) {
                throw new Error(data.message || 'Request failed');
            }

            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    },

    // HTTP methods
    get: function(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'GET' });
    },

    post: function(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    put: function(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    delete: function(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'DELETE' });
    },

    // Auth endpoints
    auth: {
        login: function(credentials) {
            return API.post('login.php', credentials);
        },

        register: function(userData) {
            return API.post('register.php', userData);
        },

        logout: function() {
            return API.post('logout.php');
        }
    },

    // User endpoints
    user: {
        getProfile: function() {
            return API.get('user/profile.php');
        },

        updateProfile: function(profileData) {
            return API.put('user/profile.php', profileData);
        },

        updatePassword: function(passwordData) {
            return API.put('user/password.php', passwordData);
        },

        getDashboard: function() {
            return API.get('user/dashboard.php');
        },

        getBookings: function() {
            return API.get('user/bookings.php');
        },

        getFavorites: function() {
            return API.get('user/favorites.php');
        },

        getReviews: function() {
            return API.get('user/reviews.php');
        },

        getSettings: function() {
            return API.get('user/settings.php');
        },

        updateSettings: function(data) {
            return API.put('user/settings.php', data);
        },

        uploadProfilePicture: function(formData) {
            return API.post('user/upload.php', formData, {
                headers: {
                    // Don't set Content-Type, let the browser set it with the boundary
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
        }
    }
};

// Export API
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API;
} 