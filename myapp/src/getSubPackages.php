<?php
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

if (!empty($main_package_id) && is_numeric($main_package_id)) {
    $main_package_id = $conn->real_escape_string($main_package_id);
    
    // Prepare the SQL query to fetch sub-package data for the given main_package_id
    $sql = "SELECT * FROM combined_package_info1 WHERE main_package_id = '$main_package_id'";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        // Output the results as JSON
        $sub_packages = [];
        
        while ($row = $result->fetch_assoc()) {
            $sub_packages[] = [
                'sub_package_id'=>$row['sub_package_id'],
                'sub_package_name' => $row['sub_package_name'],
                'price' => $row['price'],
                'description' => $row['description'],
                'sightseeing' => $row['sightseeing'],
                'transfer' => $row['transfer'],
                'meal_service' => $row['meal_service'],
                'flight_included' => $row['flight_included'],
                'total_nights' => $row['total_nights'],
                'place_name' => $row['place_name'],
                'stay_nights' => $row['stay_nights'],
                'image_url' => $row['image_url']
            ];
        }

        echo json_encode($sub_packages);
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
