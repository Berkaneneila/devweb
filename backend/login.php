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
    $usernameOrEmail = trim($data['username'] ?? '');
    $password = $data['password'] ?? '';

    if (!$usernameOrEmail || !$password) {
        throw new Exception('All fields are required.');
    }

    // Find user by username or email
    $stmt = $conn->prepare('SELECT id, username, email, password, role, first_name, last_name FROM users WHERE username = ? OR email = ?');
    $stmt->bind_param('ss', $usernameOrEmail, $usernameOrEmail);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user && password_verify($password, $user['password'])) {
        // Log successful login
        $log_stmt = $conn->prepare("INSERT INTO login_logs (user_id, username, ip_address, status, message) VALUES (?, ?, ?, 'success', 'Login successful')");
        $ip_address = $_SERVER['REMOTE_ADDR'];
        $log_stmt->bind_param('iss', $user['id'], $user['username'], $ip_address);
        $log_stmt->execute();
        $log_stmt->close();

        // Success: return user info (never return password!)
        echo json_encode([
            'success' => true,
            'message' => 'Login successful!',
            'user' => [
                'id' => $user['id'],
                'username' => $user['username'],
                'email' => $user['email'],
                'first_name' => $user['first_name'],
                'last_name' => $user['last_name'],
                'role' => $user['role']
            ]
        ]);
    } else {
        // Log failed attempt
        $log_stmt = $conn->prepare("INSERT INTO login_logs (username, ip_address, status, message) VALUES (?, ?, 'failed', 'Invalid credentials')");
        $ip_address = $_SERVER['REMOTE_ADDR'];
        $log_stmt->bind_param('ss', $usernameOrEmail, $ip_address);
        $log_stmt->execute();
        $log_stmt->close();

        throw new Exception('Invalid credentials.');
    }

} catch (Exception $e) {
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
