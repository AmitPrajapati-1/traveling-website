<?php
// Allow cross-origin requests from localhost:3000
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// If the request is a preflight (OPTIONS), exit early
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Your database connection details
$servername = "localhost";
$username = "root"; // Replace with your database username
$password = ""; // Replace with your database password
$dbname = "menagerie"; // Replace with your database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve POST data
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? null;

if (!$email) {
    http_response_code(400);
    echo json_encode(["error" => "Email is required"]);
    exit;
}

// SQL query to fetch data for the specified email
$sql = $conn->prepare("SELECT * FROM bookings WHERE to_email = ?");
$sql->bind_param("s", $email);
$sql->execute();
$result = $sql->get_result();

$bookings = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Assuming 'individual_details' is stored as JSON
        $row['individual_details'] = json_decode($row['individual_details'], true);
        $bookings[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($bookings);

$conn->close();
?>
