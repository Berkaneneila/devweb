<?php
require_once '../config/db.php';

// Test users data
$test_users = [
    [
        'username' => 'admin',
        'email' => 'admin@worldtours.com',
        'password' => password_hash('admin123', PASSWORD_DEFAULT),
        'role' => 'admin'
    ],
    [
        'username' => 'user',
        'email' => 'user@worldtours.com',
        'password' => password_hash('user123', PASSWORD_DEFAULT),
        'role' => 'user'
    ]
];

// Insert test users if they don't exist
foreach ($test_users as $user) {
    // Check if user exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
    $stmt->bind_param("ss", $user['username'], $user['email']);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        // User doesn't exist, insert them
        $insert_stmt = $conn->prepare("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)");
        $insert_stmt->bind_param("ssss", $user['username'], $user['email'], $user['password'], $user['role']);
        $insert_stmt->execute();
        echo "Inserted user: " . $user['username'] . "\n";
    } else {
        echo "User already exists: " . $user['username'] . "\n";
    }
}

echo "Test users setup complete!\n";
?> 