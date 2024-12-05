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
    
    // Fetch stay places from the database based on sub_package_id
    $sql = "SELECT place_name, description, image_url FROM stay_places WHERE sub_package_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $subPackageId);  // "i" means the parameter is an integer
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if any stay places were found
    if ($result->num_rows > 0) {
        $stayPlaces = [];
        $imageurl=[];
        while ($row = $result->fetch_assoc()) {
            $stayPlaces[] = [
                'place_name' => $row['place_name'],
                'description' => $row['description'],
            ]; 
            $imageurl[]=[
                'image_url' => $row['image_url']
            ];
             // Add each stay place to the array
        }
        
        // Send the response back to the frontend
        echo json_encode([
            'status' => 'success',
            'stay_places' => $stayPlaces,
            'image_url'=>$imageurl
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'No stay places found for this Sub Package ID.'
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
