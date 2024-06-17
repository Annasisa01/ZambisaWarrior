<?php
    if (isset($_POST['name'])) {
        $name = $_POST['name'];
        $conn = mysqli_connect("us-cluster-east-01.k8s.cleardb.net", "b697a2f19bb9ee", "c81af3f0","heroku_a42b3f930ee7d0c");
        echo 'here';
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        echo 'here2';
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
