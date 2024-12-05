<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods (e.g., GET, POST, PUT, DELETE)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// Allow certain headers for requests (add more if needed)
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests (HTTP OPTIONS request)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}
// Database credentials
$servername = "localhost";
$username = "root"; // use your MySQL username
$password = ""; // use your MySQL password
$dbname = "menagerie"; // replace with your database name

// Connect to MySQL database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["message" => "Database connection failed"]));
}

// Get input data
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = $data['password'];

// Query to fetch user
$sql = "SELECT * FROM users WHERE email = ?";   
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    // Verify password
    if (password_verify($password, $user['password'])) {
        echo json_encode(["message" => "Login successful" , "success" => true]);
    } else {
        echo json_encode(["message" => "Invalid credentials"]);
    }
} else {
    echo json_encode(["message" => "User not found"]);
}

$stmt->close();
$conn->close();
?>
