<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Replace with your React app URL if needed
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// If it's a preflight OPTIONS request, return 200 status code
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}
// Connect to the database
$servername = "localhost";
$username = "root"; // your database username
$password = ""; // your database password
$dbname = "menagerie"; // your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the main_package_id from the URL parameter
$main_package_id = isset($_GET['main_package_id']) ? $_GET['main_package_id'] : '';

// Validate the input to prevent SQL injection
if (!empty($main_package_id) && is_numeric($main_package_id)) {
    $main_package_id = $conn->real_escape_string($main_package_id);
    
    // Prepare the SQL query to fetch sub-package data for the given main_package_id
    $sql = "SELECT * FROM combined_packages WHERE main_package_id = '$main_package_id'";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        // Output the results as JSON
        $sub_packages = [];
        
        // Group the data by sub_package_name
        while ($row = $result->fetch_assoc()) {
            $sub_package_name = $row['sub_package_name'];
            
            // Check if this sub_package_name is already in the array
            if (!isset($sub_packages[$sub_package_name])) {
                $sub_packages[$sub_package_name] = [
                    'sub_package_id'=>$row['sub_package_id'],
                    'sub_package_name' => $sub_package_name,
                    'price' => $row['price'],
                    'description' => $row['description'],
                    'sightseeing' => $row['sightseeing'],
                    'transfer' => $row['transfer'],
                    'meal_service' => $row['meal_service'],
                    'flight_included' => $row['flight_included'],
                    'total_nights' => $row['total_nights'],
                    'images' => [], // This will hold the images for the sub_package_name
                    'stay_details' => [] // This will hold the stay_nights and place_name for the sub_package_name
                ];
            }
            
            // Add the image URL to the images array for this sub_package_name
            $sub_packages[$sub_package_name]['images'][] = $row['image_url'];
            
            // Add the stay details (stay_nights and place_name) to the stay_details array
            $sub_packages[$sub_package_name]['stay_details'][] = [
                'stay_nights' => $row['stay_nights'],
                'place_name' => $row['place_name']
            ];
        }
        
        // Convert the grouped data to an array of values and send it as JSON
        echo json_encode(array_values($sub_packages));
    } else {
        // If no sub-packages are found, return an error message
        echo json_encode(["error" => "No sub-packages found for this main package ID."]);
    }
} else {
    echo json_encode(["error" => "Invalid or missing main_package_id."]);
}

// Close the connection
$conn->close();
?>