<?php
    if (isset($_POST['name'])) {
        $name = $_POST['name'];
        $conn = mysqli_connect("localhost", "root", "root","zambisa_warrior");
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