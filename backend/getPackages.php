<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection settings
$servername = "localhost";  // Database server (usually localhost)
$username = "root";         // Your database username
$password = "";             // Your database password
$dbname = "menagerie";      // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to fetch all packages
$sql = "SELECT * FROM travel_packages";
$result = $conn->query($sql);

// Check if there are results
if ($result->num_rows > 0) {
    // Create an array to store the packages
    $packages = array();

    while($row = $result->fetch_assoc()) {
        $packages[] = array(
            "image" => $row["image"],
            "title" => $row["title"],
            "price" => $row["price"],
            "id"=>$row["id"]
        );
    }

    // Set header to application/json
    header('Content-Type: application/json');
    // Return the JSON response
    echo json_encode($packages);
} else {
    echo json_encode([]);
}

// Close the database connection
$conn->close();
?>
