<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers
header('Content-Type: application/json');

// Database configuration
$servername = "localhost";
$username = "root";
$password = "";

try {
    // Create connection without database
    $conn = new mysqli($servername, $username, $password);
    
    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // Create database if it doesn't exist
    $sql = "CREATE DATABASE IF NOT EXISTS worldtours";
    if (!$conn->query($sql)) {
        throw new Exception("Error creating database: " . $conn->error);
    }

    // Select the database
    $conn->select_db("worldtours");

    // Create users table
    $sql = "CREATE TABLE IF NOT EXISTS users (
        id INT(11) NOT NULL AUTO_INCREMENT,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY username (username),
        UNIQUE KEY email (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

    if (!$conn->query($sql)) {
        throw new Exception("Error creating users table: " . $conn->error);
    }

    // Create login_logs table
    $sql = "CREATE TABLE IF NOT EXISTS login_logs (
        id INT(11) NOT NULL AUTO_INCREMENT,
        user_id INT(11) DEFAULT NULL,
        username VARCHAR(50) NOT NULL,
        login_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        ip_address VARCHAR(45) DEFAULT NULL,
        status ENUM('success', 'failed') NOT NULL,
        message VARCHAR(255) DEFAULT NULL,
        PRIMARY KEY (id),
        KEY user_id (user_id),
        CONSTRAINT login_logs_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

    if (!$conn->query($sql)) {
        throw new Exception("Error creating login_logs table: " . $conn->error);
    }

    // Create registration_logs table
    $sql = "CREATE TABLE IF NOT EXISTS registration_logs (
        id INT(11) NOT NULL AUTO_INCREMENT,
        user_id INT(11) DEFAULT NULL,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        registration_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        ip_address VARCHAR(45) DEFAULT NULL,
        status ENUM('success', 'failed') NOT NULL,
        message VARCHAR(255) DEFAULT NULL,
        PRIMARY KEY (id),
        KEY user_id (user_id),
        CONSTRAINT registration_logs_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

    if (!$conn->query($sql)) {
        throw new Exception("Error creating registration_logs table: " . $conn->error);
    }

    // Insert test admin user if not exists
    $admin_password = password_hash('admin123', PASSWORD_DEFAULT);
    $sql = "INSERT IGNORE INTO users (username, email, password, role) 
            VALUES ('admin', 'admin@worldtours.com', ?, 'admin')";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $admin_password);
    $stmt->execute();
    $stmt->close();

    // Insert test regular user if not exists
    $user_password = password_hash('user123', PASSWORD_DEFAULT);
    $sql = "INSERT IGNORE INTO users (username, email, password, role) 
            VALUES ('user', 'user@worldtours.com', ?, 'user')";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $user_password);
    $stmt->execute();
    $stmt->close();

    echo json_encode([
        'status' => 'success',
        'message' => 'Database and tables created successfully!',
        'test_users' => [
            'admin' => [
                'username' => 'admin',
                'email' => 'admin@worldtours.com',
                'password' => 'admin123'
            ],
            'user' => [
                'username' => 'user',
                'email' => 'user@worldtours.com',
                'password' => 'user123'
            ]
        ]
    ]);

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}

$conn->close();
?> 