<?php
header('Content-Type: application/json');
require_once 'config/db.php';

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);
$usernameOrEmail = trim($data['username'] ?? '');
$password = $data['password'] ?? '';

if (!$usernameOrEmail || !$password) {
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit;
}

// Find user by username or email
$stmt = $conn->prepare('SELECT id, username, email, password, role FROM users WHERE username = ? OR email = ?');
$stmt->bind_param('ss', $usernameOrEmail, $usernameOrEmail);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user && password_verify($password, $user['password'])) {
    // Success: return user info (never return password!)
    echo json_encode([
        'success' => true,
        'message' => 'Login successful!',
        'user' => [
            'id' => $user['id'],
            'username' => $user['username'],
            'email' => $user['email'],
            'role' => $user['role']
        ]
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid credentials.']);
}
$stmt->close();
$conn->close();
?>
