<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

// Database connection details
$host = 'localhost';
$dbname = 'menagerie';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sub_package_id = $_GET['sub_package_id']; // Assuming sub_package_id is passed as a query parameter

    // Fetch places data
    $stmtPlaces = $pdo->prepare("SELECT * FROM stay_places WHERE sub_package_id = :sub_package_id");
    $stmtPlaces->execute(['sub_package_id' => $sub_package_id]);
    $places = $stmtPlaces->fetchAll(PDO::FETCH_ASSOC);

    // Fetch itinerary data
    $stmtItinerary = $pdo->prepare("SELECT * FROM itineraries WHERE sub_package_id = :sub_package_id ORDER BY day_number ASC");
    $stmtItinerary->execute(['sub_package_id' => $sub_package_id]);
    $itinerary = $stmtItinerary->fetchAll(PDO::FETCH_ASSOC);

    // Combine the results into a structured array
    $response = [
        'package' => [
            'places' => $places,
            'itinerary' => $itinerary
        ]
    ];

    echo json_encode($response);

} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
