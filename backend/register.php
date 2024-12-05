<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "menagerie"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["message" => "Database connection failed"]));
}
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = $data['password'];

$check_sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($check_sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(["message" => "Email already registered"]);
} else {
    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    // Insert new user
    $insert_sql = "INSERT INTO users (email, password) VALUES (?, ?)";
    $stmt = $conn->prepare($insert_sql);
    $stmt->bind_param("ss", $email, $hashed_password);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Registration successful"]);
    } else {
        echo json_encode(["message" => "Registration failed"]);
    }
}

$stmt->close();
$conn->close();
?>
