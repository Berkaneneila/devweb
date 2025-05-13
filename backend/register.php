<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config/db.php';

try {
    // Get POST data
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    // Debug log
    error_log("Registration attempt - Input data: " . print_r($data, true));

    if (!$data) {
        throw new Exception('Invalid JSON data received');
    }

    $username = trim($data['username'] ?? '');
    $email = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';
    $first_name = trim($data['first_name'] ?? '');
    $last_name = trim($data['last_name'] ?? '');

    // Validation
    if (!$username || !$email || !$password) {
        throw new Exception('All fields are required.');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email format.');
    }

    if (strlen($password) < 6) {
        throw new Exception('Password must be at least 6 characters long.');
    }

    // Check if user/email already exists
    $stmt = $conn->prepare('SELECT id FROM users WHERE username = ? OR email = ?');
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }

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
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param('sssss', $username, $email, $hashedPassword, $first_name, $last_name);
    
    if (!$stmt->execute()) {
        throw new Exception("Registration failed: " . $stmt->error);
    }

    $userId = $conn->insert_id;

    // Log successful registration
    $log_stmt = $conn->prepare("INSERT INTO registration_logs (user_id, username, email, ip_address, status, message) VALUES (?, ?, ?, ?, 'success', 'Registration successful')");
    if (!$log_stmt) {
        error_log("Failed to prepare registration log statement: " . $conn->error);
    } else {
        $ip_address = $_SERVER['REMOTE_ADDR'];
        $log_stmt->bind_param('isss', $userId, $username, $email, $ip_address);
        if (!$log_stmt->execute()) {
            error_log("Failed to insert registration log: " . $log_stmt->error);
        }
        $log_stmt->close();
    }

    echo json_encode([
        'success' => true,
        'message' => 'Registration successful! Please login.',
        'user' => [
            'id' => $userId,
            'username' => $username,
            'email' => $email,
            'first_name' => $first_name,
            'last_name' => $last_name
        ]
    ]);

} catch (Exception $e) {
    error_log("Registration error: " . $e->getMessage());
    
    // Log failed registration attempt
    if (isset($username) && isset($email)) {
        $log_stmt = $conn->prepare("INSERT INTO registration_logs (username, email, ip_address, status, message) VALUES (?, ?, ?, 'failed', ?)");
        if ($log_stmt) {
            $ip_address = $_SERVER['REMOTE_ADDR'];
            $error_message = $e->getMessage();
            $log_stmt->bind_param('ssss', $username, $email, $ip_address, $error_message);
            $log_stmt->execute();
            $log_stmt->close();
        }
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
?> 