<?php
    $conn = mysqli_connect("us-cluster-east-01.k8s.cleardb.net", "b697a2f19bb9ee", "c81af3f0","heroku_a42b3f930ee7d0c");
    $query = "SELECT * FROM `players`  \n"

    . "ORDER BY `players`.`highscore`  DESC LIMIT 5";
    $result = mysqli_query($conn,$query);
    $arr = array();
    while ($record = mysqli_fetch_assoc($result)) {
        $arr[] = [$record["name"],$record["highscore"],$record["gold"],$record["level"]];
    }
    echo json_encode($arr);

?>
