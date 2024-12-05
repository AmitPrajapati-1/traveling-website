<?php
// Set headers for CORS if the React app is hosted on a different port
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Connect to the database (replace with your own credentials)
$host = "localhost";
$user = "root";
$password = "";
$dbname = "menagerie";

$conn = new mysqli($host, $user, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get raw POST data
$data = json_decode(file_get_contents("php://input"), true);

// Check if sub_package_id is provided
if (isset($data['sub_package_id'])) {
    $subPackageId = $data['sub_package_id'];
    
    // Fetch itineraries from the database based on sub_package_id
    $sql = "SELECT sub_package_id,day_number, title, description FROM itineraries WHERE sub_package_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $subPackageId);  // "i" means the parameter is an integer
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if any itineraries were found
    if ($result->num_rows > 0) {
        $itineraries = [];
        while ($row = $result->fetch_assoc()) {
            $itineraries[] = [
                'day_number'=>$row['day_number'],
                'title'=>$row['title'],
                'description'=>$row['description'],

            ];  // Add each itinerary to the array
        }
        
        // Send the response back to the frontend
        echo json_encode([
            'status' => 'success',
            'itineraries' => $itineraries
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'No itineraries found for this Sub Package ID.'
        ]);
    }

    // Close the prepared statement and connection
    $stmt->close();
    $conn->close();
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'sub_package_id is required.'
    ]);
}
?>
