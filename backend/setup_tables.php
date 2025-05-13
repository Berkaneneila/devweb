<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');

// Include database configuration
require_once 'config/db.php';

try {
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // Check if users table exists
    $result = $conn->query("SHOW TABLES LIKE 'users'");
    
    if ($result->num_rows == 0) {
        // Create users table
        $sql = "CREATE TABLE users (
            id INT(11) AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            first_name VARCHAR(50),
            last_name VARCHAR(50),
            profile_picture VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )";
        
        if (!$conn->query($sql)) {
            throw new Exception("Error creating users table: " . $conn->error);
        }
        
        echo json_encode([
            'status' => 'success',
            'message' => 'Users table created successfully',
            'details' => [
                'table' => 'users',
                'columns' => [
                    'id', 'username', 'email', 'password', 'first_name', 
                    'last_name', 'profile_picture', 'created_at', 'updated_at'
                ]
            ]
        ]);
    } else {
        // Get table structure
        $result = $conn->query("DESCRIBE users");
        $columns = [];
        while ($row = $result->fetch_assoc()) {
            $columns[] = $row['Field'];
        }
        
        echo json_encode([
            'status' => 'success',
            'message' => 'Users table already exists',
            'details' => [
                'table' => 'users',
                'columns' => $columns
            ]
        ]);
    }
    
    // Close connection
    $conn->close();
    
} catch (Exception $e) {
    // Log error
    error_log("Table setup error: " . $e->getMessage());
    
    // Return error response
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Table setup failed: ' . $e->getMessage(),
        'details' => [
            'error_type' => get_class($e),
            'error_code' => $e->getCode(),
            'error_file' => $e->getFile(),
            'error_line' => $e->getLine()
        ]
    ]);
} 