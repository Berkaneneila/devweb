<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Ensure headers are sent before any output
ob_start();

// Set CORS headers
header("Access-Control-Allow-Origin: http://192.168.100.6:5500");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config/db.php';

try {
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);
    $username = trim($data['username'] ?? '');
    $email = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';
    $first_name = trim($data['first_name'] ?? '');
    $last_name = trim($data['last_name'] ?? '');

    // Basic validation
    if (!$username || !$email || !$password) {
        throw new Exception('All fields are required.');
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email format.');
    }

    // Check if user/email already exists
    $stmt = $conn->prepare('SELECT id FROM users WHERE username = ? OR email = ?');
    $stmt->bind_param('ss', $username, $email);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        throw new Exception('Username or email already exists.');
    }
    $stmt->close();

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert user
    $stmt = $conn->prepare('INSERT INTO users (username, email, password, first_name, last_name) VALUES (?, ?, ?, ?, ?)');
    $stmt->bind_param('sssss', $username, $email, $hashedPassword, $first_name, $last_name);
    
    if ($stmt->execute()) {
        $user_id = $conn->insert_id;
        
        // Log successful registration
        $log_stmt = $conn->prepare("INSERT INTO registration_logs (user_id, username, email, ip_address, status, message) VALUES (?, ?, ?, ?, 'success', 'Registration successful')");
        $ip_address = $_SERVER['REMOTE_ADDR'];
        $log_stmt->bind_param('isss', $user_id, $username, $email, $ip_address);
        $log_stmt->execute();
        $log_stmt->close();

        echo json_encode([
            'success' => true,
            'message' => 'Registration successful!',
            'user' => [
                'id' => $user_id,
                'username' => $username,
                'email' => $email,
                'first_name' => $first_name,
                'last_name' => $last_name,
                'role' => 'user'
            ]
        ]);
    } else {
        throw new Exception('Registration failed.');
    }

} catch (Exception $e) {
    // Log failed registration if we have the data
    if (isset($username) && isset($email)) {
        $log_stmt = $conn->prepare("INSERT INTO registration_logs (username, email, ip_address, status, message) VALUES (?, ?, ?, 'failed', ?)");
        $ip_address = $_SERVER['REMOTE_ADDR'];
        $error_message = $e->getMessage();
        $log_stmt->bind_param('ssss', $username, $email, $ip_address, $error_message);
        $log_stmt->execute();
        $log_stmt->close();
    }

    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

if (isset($stmt)) {
    $stmt->close();
}
if (isset($conn)) {
    $conn->close();
}

// Flush output buffer
ob_end_flush();
?> 