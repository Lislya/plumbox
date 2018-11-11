<?php
//Connect to DB
require_once 'connect.php';
//Check if the same username exists
if (isset($_REQUEST['username']))
{
    $username = strtolower('"'.$connection->real_escape_string($_REQUEST['username']).'"');
    $sql ="SELECT username FROM user WHERE username=".$username;
    $result_set = $connection->query($sql);
    if($result_set->num_rows==0){
        echo 1;
    } else{
        echo 0;
        $result_set->free();
    }
}
//Check if the same email is taken
if (isset($_REQUEST['email']))
{
    $email = strtolower('"'.$connection->real_escape_string($_REQUEST['email']).'"');
    $sql = "SELECT email FROM user WHERE email=".$email;
    $result_set = $connection->query($sql);
    if($result_set->num_rows==0){
        echo 1;
    } else{
        echo 0;
        $result_set->free();
    }
}
$connection->close();
?>