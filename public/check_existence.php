<?php
    if (isset($_POST['name'])) {
        $name = $_POST['name'];
        $conn = mysqli_connect("localhost", "root", "root","zambisa_warrior");
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $query = "SELECT * FROM players WHERE name = '$name'";
        $result = mysqli_query($conn,$query);
        $arr = array();
        if ($result->num_rows > 0) {
            
            if ($record = mysqli_fetch_assoc($result)) {
                $arr[] = [$record["name"],$record["highscore"],$record["gold"],$record["level"],$record["speed"],$record["health"],$record["shield"]];
                echo json_encode($arr);
            }
        }
        else{
            echo 'Player not found';
        }
        $conn->close();
    }
?>
