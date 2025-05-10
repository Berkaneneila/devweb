<?php
// Allow from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);
    
    $username = $data['username'] ?? '';
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    $ip_address = $_SERVER['REMOTE_ADDR'];
    
    // Validate input
    if (empty($username) || empty($email) || empty($password)) {
        // Log failed attempt
        $stmt = $conn->prepare("INSERT INTO registration_logs (username, email, ip_address, status, message) VALUES (?, ?, ?, 'failed', 'Missing required fields')");
        $stmt->bind_param("sss", $username, $email, $ip_address);
        $stmt->execute();
        $stmt->close();
        
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit;
    }
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Log failed attempt
        $stmt = $conn->prepare("INSERT INTO registration_logs (username, email, ip_address, status, message) VALUES (?, ?, ?, 'failed', 'Invalid email format')");
        $stmt->bind_param("sss", $username, $email, $ip_address);
        $stmt->execute();
        $stmt->close();
        
        echo json_encode(['success' => false, 'message' => 'Invalid email format']);
        exit;
    }
    
    // Check if username or email already exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
    $stmt->bind_param("ss", $username, $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        // Log failed attempt
        $log_stmt = $conn->prepare("INSERT INTO registration_logs (username, email, ip_address, status, message) VALUES (?, ?, ?, 'failed', 'Username or email already exists')");
        $log_stmt->bind_param("sss", $username, $email, $ip_address);
        $log_stmt->execute();
        $log_stmt->close();
        
        echo json_encode(['success' => false, 'message' => 'Username or email already exists']);
        exit;
    }
    
    // Hash password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert new user
    $stmt = $conn->prepare("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'user')");
    $stmt->bind_param("sss", $username, $email, $hashed_password);
    
    if ($stmt->execute()) {
        $user_id = $conn->insert_id;
        
        // Log successful registration
        $log_stmt = $conn->prepare("INSERT INTO registration_logs (user_id, username, email, ip_address, status, message) VALUES (?, ?, ?, ?, 'success', 'Registration successful')");
        $log_stmt->bind_param("isss", $user_id, $username, $email, $ip_address);
        $log_stmt->execute();
        $log_stmt->close();
        
        echo json_encode([
            'success' => true,
            'message' => 'Registration successful! You can now log in.',
            'user' => [
                'id' => $user_id,
                'username' => $username,
                'email' => $email,
                'role' => 'user'
            ]
        ]);
    } else {
        // Log failed attempt
        $log_stmt = $conn->prepare("INSERT INTO registration_logs (username, email, ip_address, status, message) VALUES (?, ?, ?, 'failed', 'Database error during registration')");
        $log_stmt->bind_param("sss", $username, $email, $ip_address);
        $log_stmt->execute();
        $log_stmt->close();
        
        echo json_encode(['success' => false, 'message' => 'Registration failed. Please try again.']);
    }
    
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

$conn->close();
?> 