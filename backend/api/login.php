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
    $password = $data['password'] ?? '';
    $ip_address = $_SERVER['REMOTE_ADDR'];
    
    if (empty($username) || empty($password)) {
        // Log failed attempt
        $stmt = $conn->prepare("INSERT INTO login_logs (username, ip_address, status, message) VALUES (?, ?, 'failed', 'Missing username or password')");
        $stmt->bind_param("ss", $username, $ip_address);
        $stmt->execute();
        $stmt->close();
        
        echo json_encode(['success' => false, 'message' => 'Username and password are required']);
        exit;
    }
    
    // Prepare SQL statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT id, username, email, password, role FROM users WHERE username = ? OR email = ?");
    $stmt->bind_param("ss", $username, $username); // Check both username and email
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        
        // Verify password
        if (password_verify($password, $user['password'])) {
            // Log successful login
            $log_stmt = $conn->prepare("INSERT INTO login_logs (user_id, username, ip_address, status, message) VALUES (?, ?, ?, 'success', 'Login successful')");
            $log_stmt->bind_param("iss", $user['id'], $user['username'], $ip_address);
            $log_stmt->execute();
            $log_stmt->close();
            
            // Remove password from response
            unset($user['password']);
            
            echo json_encode([
                'success' => true,
                'message' => 'Login successful',
                'user' => $user
            ]);
        } else {
            // Log failed attempt
            $log_stmt = $conn->prepare("INSERT INTO login_logs (username, ip_address, status, message) VALUES (?, ?, 'failed', 'Invalid password')");
            $log_stmt->bind_param("ss", $username, $ip_address);
            $log_stmt->execute();
            $log_stmt->close();
            
            echo json_encode(['success' => false, 'message' => 'Invalid password']);
        }
    } else {
        // Log failed attempt
        $log_stmt = $conn->prepare("INSERT INTO login_logs (username, ip_address, status, message) VALUES (?, ?, 'failed', 'User not found')");
        $log_stmt->bind_param("ss", $username, $ip_address);
        $log_stmt->execute();
        $log_stmt->close();
        
        echo json_encode(['success' => false, 'message' => 'User not found']);
    }
    
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

$conn->close();
?>