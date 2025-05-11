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

$steps = [];
$success = true;

try {
    // Step 1: Test basic MySQL connection
    $conn = new mysqli($servername, $username, $password);
    if ($conn->connect_error) {
        throw new Exception("Basic MySQL connection failed: " . $conn->connect_error);
    }
    $steps[] = "Basic MySQL connection successful";

    // Step 2: Check if database exists
    $result = $conn->query("SHOW DATABASES LIKE 'worldtours'");
    if ($result->num_rows == 0) {
        $steps[] = "Database 'worldtours' does not exist, creating it...";
        if (!$conn->query("CREATE DATABASE worldtours")) {
            throw new Exception("Failed to create database: " . $conn->error);
        }
        $steps[] = "Database 'worldtours' created successfully";
    } else {
        $steps[] = "Database 'worldtours' exists";
    }

    // Step 3: Select the database
    if (!$conn->select_db("worldtours")) {
        throw new Exception("Failed to select database: " . $conn->error);
    }
    $steps[] = "Successfully selected 'worldtours' database";

    // Step 4: Test charset
    if (!$conn->set_charset("utf8mb4")) {
        throw new Exception("Failed to set charset: " . $conn->error);
    }
    $steps[] = "Successfully set charset to utf8mb4";

    // Step 5: Get MySQL version
    $version = $conn->server_info;
    $steps[] = "MySQL version: " . $version;

    echo json_encode([
        'status' => 'success',
        'message' => 'Database connection test completed successfully',
        'steps' => $steps,
        'mysql_version' => $version
    ]);

} catch (Exception $e) {
    $success = false;
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage(),
        'steps' => $steps,
        'last_successful_step' => end($steps) ?? 'None'
    ]);
}

if (isset($conn)) {
    $conn->close();
}
?> 