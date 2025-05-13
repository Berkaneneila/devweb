<?php
// Prevent any output before headers
ob_start();

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0); // Disable display_errors to prevent HTML output
ini_set('log_errors', 1); // Enable error logging

// Set headers for JSON response and CORS
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Function to send JSON response
function sendResponse($status, $message, $data = null) {
    // Clear any previous output
    ob_clean();
    
    // Set response code based on status
    http_response_code($status === 'error' ? 400 : 200);
    
    echo json_encode([
        'status' => $status,
        'message' => $message,
        'data' => $data
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

// Function to handle errors
function handleError($message, $code = 400) {
    error_log("API Error: " . $message);
    sendResponse('error', $message);
}

try {
    // Include database configuration
    if (!file_exists('../config/db.php')) {
        handleError('Database configuration not found');
    }
    require_once '../config/db.php';

    // Verify database connection
    if (!isset($pdo) || !($pdo instanceof PDO)) {
        handleError('Database connection not available');
    }

    // Function to generate JWT token
    function generateJWT($userId, $username, $role = 'user') {
        $secret = 'your-secret-key'; // Change this to a secure secret key
        $issuedAt = time();
        $expiration = $issuedAt + 3600; // Token valid for 1 hour

        $payload = [
            'iat' => $issuedAt,
            'exp' => $expiration,
            'user_id' => $userId,
            'username' => $username,
            'role' => $role
        ];

        return base64_encode(json_encode($payload)) . '.' . 
               base64_encode(hash_hmac('sha256', json_encode($payload), $secret, true));
    }

    // Function to validate email
    function validateEmail($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    // Function to validate password
    function validatePassword($password) {
        return strlen($password) >= 6;
    }

    // Function to log authentication attempts
    function logAuthAttempt($pdo, $type, $userId, $username, $status, $message) {
        try {
            $table = $type === 'login' ? 'login_logs' : 'registration_logs';
            $stmt = $pdo->prepare("INSERT INTO $table (user_id, username, ip_address, status, message) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$userId, $username, $_SERVER['REMOTE_ADDR'], $status, $message]);
            return true;
        } catch (Exception $e) {
            error_log("Error logging auth attempt: " . $e->getMessage());
            return false;
        }
    }

    // Verify request method
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        handleError('Invalid request method');
    }

    // Get and validate POST data
    $data = $_POST;
    if (empty($data)) {
        handleError('No data received');
    }

    $action = $data['action'] ?? '';
    if (empty($action)) {
        handleError('Action not specified');
    }

    switch ($action) {
        case 'login':
            // Validate required fields
            if (empty($data['email']) || empty($data['password'])) {
                handleError('Email and password are required');
            }

            // Validate email format
            if (!validateEmail($data['email'])) {
                handleError('Invalid email format');
            }

            // Check credentials
            $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
            $stmt->execute([$data['email']]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user || !password_verify($data['password'], $user['password'])) {
                logAuthAttempt($pdo, 'login', $user['id'] ?? null, $data['email'], 'failed', 'Invalid credentials');
                handleError('Invalid email or password');
            }

            // Generate JWT token
            $token = generateJWT($user['id'], $user['username'], $user['role']);

            // Log successful login
            logAuthAttempt($pdo, 'login', $user['id'], $user['username'], 'success', 'Login successful');

            // Return success response
            sendResponse('success', 'Login successful', [
                'token' => $token,
                'user' => [
                    'id' => $user['id'],
                    'username' => $user['username'],
                    'email' => $user['email'],
                    'first_name' => $user['first_name'],
                    'last_name' => $user['last_name'],
                    'role' => $user['role']
                ]
            ]);
            break;

        case 'register':
            // Validate required fields
            $requiredFields = ['username', 'email', 'password', 'confirm_password', 'first_name', 'last_name'];
            foreach ($requiredFields as $field) {
                if (empty($data[$field])) {
                    handleError(ucfirst(str_replace('_', ' ', $field)) . ' is required');
                }
            }

            // Validate email format
            if (!validateEmail($data['email'])) {
                handleError('Invalid email format');
            }

            // Validate password
            if (!validatePassword($data['password'])) {
                handleError('Password must be at least 6 characters long');
            }

            // Check if passwords match
            if ($data['password'] !== $data['confirm_password']) {
                handleError('Passwords do not match');
            }

            // Check if username or email already exists
            $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE username = ? OR email = ?");
            $stmt->execute([$data['username'], $data['email']]);
            if ($stmt->fetchColumn() > 0) {
                handleError('Username or email already exists');
            }

            // Hash password
            $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

            // Insert new user
            $stmt = $pdo->prepare("INSERT INTO users (username, email, password, first_name, last_name, role) VALUES (?, ?, ?, ?, ?, 'user')");
            $stmt->execute([
                $data['username'],
                $data['email'],
                $hashedPassword,
                $data['first_name'],
                $data['last_name']
            ]);

            $userId = $pdo->lastInsertId();

            // Log successful registration
            logAuthAttempt($pdo, 'register', $userId, $data['username'], 'success', 'Registration successful');

            // Return success response
            sendResponse('success', 'Registration successful', [
                'user' => [
                    'id' => $userId,
                    'username' => $data['username'],
                    'email' => $data['email'],
                    'first_name' => $data['first_name'],
                    'last_name' => $data['last_name'],
                    'role' => 'user'
                ]
            ]);
            break;

        default:
            handleError('Invalid action');
    }
} catch (PDOException $e) {
    error_log("Database Error: " . $e->getMessage());
    handleError('Database error occurred');
} catch (Exception $e) {
    error_log("General Error: " . $e->getMessage());
    handleError('An unexpected error occurred');
} finally {
    // Clean and end output buffer
    ob_end_flush();
} 