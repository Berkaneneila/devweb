<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers
header('Content-Type: application/json');

try {
    // Include database configuration
    require_once 'config/db.php';

    // Test database connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // Test database selection
    if (!$conn->select_db("worldtours")) {
        throw new Exception("Database selection failed: " . $conn->error);
    }

    // Test query
    $result = $conn->query("SELECT COUNT(*) as user_count FROM users");
    if (!$result) {
        throw new Exception("Query failed: " . $conn->error);
    }

    $row = $result->fetch_assoc();
    
    echo json_encode([
        'status' => 'success',
        'message' => 'Database connection successful',
        'database' => 'worldtours',
        'user_count' => $row['user_count'],
        'server_info' => $conn->server_info,
        'time' => date('Y-m-d H:i:s')
    ]);

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage(),
        'time' => date('Y-m-d H:i:s')
    ]);
}

// Close connection
if (isset($conn)) {
    $conn->close();
}
?> 