<?php
  $db_host = 'us-cluster-east-01.k8s.cleardb.net';
  $db_user = 'b697a2f19bb9ee';
  $db_pass = 'c81af3f0';
  $db_name = 'heroku_a42b3f930ee7d0c';
  //$db_port = 8889;
$connect = mysqli_connect($db_host,$db_user,$db_pass,$db_name) or die("database connection error");



  // $mysqli = new mysqli(
  //   $db_host,
  //   $db_user,
  //   $db_password,
  //   $db_db
  // );
	
//   if ($mysqli->connect_error) {
//     echo 'Errno: '.$mysqli->connect_errno;
//     echo '<br>';
//     echo 'Error: '.$mysqli->connect_error;
//     exit();
//   }


// if ($mysqli->query($sql) === TRUE) {
//     echo "New record created successfully";
//   } else {
//     echo "Error: " . $sql . "<br>" . $conn->error;
//   }

//   echo 'Success: A proper connection to MySQL was made.';
//   echo '<br>';
//   echo 'Host information: '.$mysqli->host_info;
//   echo '<br>';
//   echo 'Protocol version: '.$mysqli->protocol_version;

//   $mysqli->close();
?>
