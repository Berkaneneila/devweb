// Configuration settings
const CONFIG = {
    API_URL: 'http://localhost/devweb/backend',
    DEBUG: true,
    VERSION: '1.0.0',
    AUTH: {
        TOKEN_KEY: 'auth_token',
        USER_KEY: 'user_data'
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} 