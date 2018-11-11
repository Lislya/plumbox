<?php
// Connect to DB
require_once 'connect.php';

// if all fields are not empty
if (isset($_POST['username']) && isset($_POST['password']) && isset($_POST['name']) && isset($_POST['s_name']) && isset($_POST['email']) && isset($_POST['d_birth']))
{
    $name = '"'.$connection->real_escape_string($_POST['name']).'"';
    $s_name = '"'.$connection->real_escape_string($_POST['s_name']).'"';
    $username = strtolower('"'.$connection->real_escape_string($_POST['username']).'"');
    $email = '"'.$connection->real_escape_string($_POST['email']).'"';
    $tel = '"'.$connection->real_escape_string($_POST['tel']).'"';
    $d_birth = '"'.$connection->real_escape_string($_POST['d_birth']).'"';
    $id_role = 3;
    $password = $connection->real_escape_string($_POST['password']);
    $hash = '"'.password_hash($password,PASSWORD_DEFAULT).'"';

    //if addt_stat checkbox is checked
    if ($_POST['addr_stat'] == 'on'){
        $addr_stat = 1;
        $region = '"'.$connection->real_escape_string($_POST['region']).'"';
        $city = '"'.$connection->real_escape_string($_POST['city']).'"';
        $street = '"'.$connection->real_escape_string($_POST['street']).'"';
        $house = '"'.$connection->real_escape_string($_POST['house']).'"';
        $corp = '"'.$connection->real_escape_string($_POST['corp']).'"';
        $flat = '"'.$connection->real_escape_string($_POST['flat']).'"';
        $post_index = '"'.$connection->real_escape_string($_POST['post_index']).'"';
    } else{

        $addr_stat = 0;
    }
    //prepare sql-query
    $sql = "INSERT INTO user VALUES (NULL, $name, $s_name, $username, $hash, $d_birth, $email, $tel, $addr_stat, $id_role)";
    $connection->query($sql); //executing

    if ($addr_stat == 1){
        $id_user = $connection->insert_id;
        $sql = "INSERT INTO address VALUES (NULL, $region, $city, $street, $house, $corp, $flat, $post_index, $id_user)";
        $connection->query($sql);
    }
    //Registrattion state message
    if ($connection->errno){
        $fmsg = "Registration failed ".$connection->error;
    } else{
        $smsg = "Registration successful";
        header("refresh: 3; login.php");
    }
}
//Close connection
$connection->close();
?>