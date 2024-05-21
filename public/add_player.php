<?php
    if (isset($_POST['name'])) {
        $name = $_POST['name'];
        //$conn = mysqli_connect("localhost", "root", "root","zambisa_warrior"); This is old from the old code
        $conn = mysqli_connect("us-cluster-east-01.k8s.cleardb.net", "b697a2f19bb9ee", "c81af3f0","heroku_a42b3f930ee7d0c");
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $query = "INSERT INTO players (name) VALUES ('$name')";
        $result = mysqli_query($conn,$query);
        if (!$result) {
            echo "Error: " . $query . "<br>" . $conn->error;
        }
        else{
            echo 'Player was successfuly added';
        }
        $conn->close();
    }
?>
