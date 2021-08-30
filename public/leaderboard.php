<?php
    $conn = mysqli_connect("localhost", "root", "root","zambisa_warrior");
    $query = "SELECT * FROM `players`  \n"

    . "ORDER BY `players`.`highscore`  DESC LIMIT 5";
    $result = mysqli_query($conn,$query);
    $arr = array();
    while ($record = mysqli_fetch_assoc($result)) {
        $arr[] = [$record["name"],$record["highscore"],$record["gold"],$record["level"]];
    }
    echo json_encode($arr);

?>