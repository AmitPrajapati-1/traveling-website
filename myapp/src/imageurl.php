<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
// Check if the sub_package_id is passed via POST
if (isset($_POST['sub_package_id'])) {
    // Database configuration
    $host = 'localhost';       // Database host
    $username = 'root';        // Database username
    $password = '';            // Database password
    $dbname = 'menagerie'; // Database name

    // Create connection
    $conn = new mysqli($host, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Retrieve the sub_package_id from the POST data
    $sub_package_id = $_POST['sub_package_id']; // Get sub_package_id from POST

    // SQL query to fetch place_name, description, and image_url where sub_package_id is the same
    $sql = "SELECT place_name, description, image_url FROM stay_places WHERE sub_package_id = ?";

    // Prepare and bind the statement to avoid SQL injection
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $sub_package_id); // Bind the sub_package_id to the query

    // Execute the statement
    $stmt->execute();

    // Get the result
    $result = $stmt->get_result();

    // Initialize arrays to hold the results
    $image_urls = [];
    $place_description = [];

    // Check if there are results
    if ($result->num_rows > 0) {
        // Fetch each row and separate the data into respective arrays
        while ($row = $result->fetch_assoc()) {
            $image_urls[] = $row['image_url'];  // Add image_url to image_urls array
            $place_description[] = [
                'place_name' => $row['place_name'],  // Add place_name and description to place_description array
                'description' => $row['description']
            ];
        }
    } else {
        // If no results, return empty arrays
        $image_urls = [];
        $place_description = [];
    }

    // Close the connection
    $stmt->close();
    $conn->close();

    // Return the arrays as a JSON response
    echo json_encode([
        'image_urls' => $image_urls,
        'place_description' => $place_description
    ]);
} else {
    // If sub_package_id is not passed, return an error message
    echo json_encode([
        'error' => 'sub_package_id is required'
    ]);
}
?>
