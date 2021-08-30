<?php
    if(isset($_POST['name'])){
        $name = $_POST['name'];
        $level = $_POST['level'];
        $gold = $_POST['gold'];
        $highscore = $_POST['highscore'];
        $health = $_POST['health'];
        $speed = $_POST['speed'];
        $shield = $_POST['shield'];
        $conn = mysqli_connect("localhost", "root", "root","zambisa_warrior");
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $query = "UPDATE players SET highscore=$highscore ,level=$level, gold=$gold, health=$health, speed=$speed, shield=$shield WHERE name = '$name'";
        // $result = mysqli_query($conn,$query);
        if ($conn->query($query) === TRUE) {
            echo "Record updated successfully";
          } else {
            echo "Error updating record: " . $conn->error;
          }
        $conn->close();
    }
?>