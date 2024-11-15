<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Database credentials
$host = 'localhost';
$dbname = 'menagerie';
$username = 'root';
$password = '';

try {
    // Connect to the database
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Query to get data from both tables and join them
    $query = "
        SELECT 
            sp.id,
            sp.main_package_id,
            sp.sub_package_name,
            sp.price,
            sp.description,
            sp.sightseeing,
            sp.transfer,
            sp.meal_service,
            sp.flight_included,
            sp.total_nights,
            GROUP_CONCAT(st.place_name) AS places,
            GROUP_CONCAT(st.image_url) AS images,
            GROUP_CONCAT(st.nights) AS nights
        FROM sub_packages AS sp
        LEFT JOIN stay_places AS st ON sp.id = st.sub_package_id
        GROUP BY sp.id
    ";

    // Execute the query
    $stmt = $pdo->prepare($query);
    $stmt->execute();

    $packages = [];
    
    // Fetch the data and format it
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $packages[] = [
            'id' => $row['id'],
            'main_package_id' => $row['main_package_id'],
            'sub_package_name' => $row['sub_package_name'],
            'price' => $row['price'],
            'description' => $row['description'],
            'sightseeing' => $row['sightseeing'],
            'transfer' => $row['transfer'],
            'meal_service' => $row['meal_service'],
            'flight_included' => $row['flight_included'],
            'total_nights' => $row['total_nights'],
            'places' => explode(',', $row['places']),
            'images' => explode(',', $row['images']),
            'nights' => explode(',', $row['nights']),
        ];
    }

    // Output the packages as JSON
    echo json_encode($packages);

} catch (PDOException $e) {
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
}

?>