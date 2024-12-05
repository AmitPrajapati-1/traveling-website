<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$servername = "localhost"; 
$username = "root";        
$password = "";           
$dbname = "menagerie";   

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed"]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $to_email = $data['toEmail'];
    $user_name = $data['userName'];
    $package_name = $data['packageName'];
    $package_price = $data['packagePrice'];
    $num_persons = $data['numPersons'];
    $travel_date = $data['travelDate'];
    $individual_details = json_encode($data['individualDetails']); // Convert array to JSON string
    $total_price = $data['totalPrice'];

    $sql = "INSERT INTO bookings (to_email, user_name, package_name, package_price, num_persons, travel_date, individual_details, total_price) 
            VALUES ('$to_email', '$user_name', '$package_name', '$package_price', '$num_persons', '$travel_date', '$individual_details', '$total_price')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Booking data stored successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
    }

    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>
