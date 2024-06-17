<?php
// Include the database configuration
require 'config.php';

// Your database interaction code here
$sql = "SELECT * FROM players";
$result = mysqli_query($connect, $sql);

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        print_r($row);
    }
} else {
    echo "Query failed: " . mysqli_error($connect);
}
?>
