<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers
header('Content-Type: application/json');

require_once 'config/db.php';

try {
    // Create database if it doesn't exist
    $sql = "CREATE DATABASE IF NOT EXISTS worldtours";
    if (!$conn->query($sql)) {
        throw new Exception("Error creating database: " . $conn->error);
    }

    // Select the database
    if (!$conn->select_db("worldtours")) {
        throw new Exception("Error selecting database: " . $conn->error);
    }

    // Drop existing tables in reverse order of dependencies
    $conn->query("DROP TABLE IF EXISTS registration_logs");
    $conn->query("DROP TABLE IF EXISTS login_logs");
    $conn->query("DROP TABLE IF EXISTS users");

    // Create users table
    $sql = "CREATE TABLE users (
        id INT(11) NOT NULL AUTO_INCREMENT,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY username (username),
        UNIQUE KEY email (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

    if (!$conn->query($sql)) {
        throw new Exception("Error creating users table: " . $conn->error);
    }

    // Create login_logs table
    $sql = "CREATE TABLE login_logs (
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
    $sql = "CREATE TABLE registration_logs (
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

    // Insert test admin user
    $admin_password = password_hash('admin123', PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (username, email, password, first_name, last_name, role) VALUES (?, ?, ?, ?, ?, ?)");
    if (!$stmt) {
        throw new Exception("Error preparing admin insert statement: " . $conn->error);
    }
    $admin_username = 'admin';
    $admin_email = 'admin@worldtours.com';
    $admin_firstname = 'Admin';
    $admin_lastname = 'User';
    $admin_role = 'admin';
    $stmt->bind_param('ssssss', $admin_username, $admin_email, $admin_password, $admin_firstname, $admin_lastname, $admin_role);
    $stmt->execute();
    $stmt->close();

    // Insert test regular user
    $user_password = password_hash('user123', PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (username, email, password, first_name, last_name, role) VALUES (?, ?, ?, ?, ?, ?)");
    if (!$stmt) {
        throw new Exception("Error preparing user insert statement: " . $conn->error);
    }
    $user_username = 'user';
    $user_email = 'user@worldtours.com';
    $user_firstname = 'Regular';
    $user_lastname = 'User';
    $user_role = 'user';
    $stmt->bind_param('ssssss', $user_username, $user_email, $user_password, $user_firstname, $user_lastname, $user_role);
    $stmt->execute();
    $stmt->close();

    echo json_encode([
        'status' => 'success',
        'message' => 'Database tables created and test users added successfully',
        'test_users' => [
            'admin' => [
                'username' => 'admin',
                'email' => 'admin@worldtours.com',
                'password' => 'admin123',
                'role' => 'admin'
            ],
            'user' => [
                'username' => 'user',
                'email' => 'user@worldtours.com',
                'password' => 'user123',
                'role' => 'user'
            ]
        ]
    ]);

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}

if (isset($conn)) {
    $conn->close();
}
?> 