<?php
require_once('connect.php');

if (isset($_POST['username']) and isset($_POST['password'])) {
    $username = strtolower($connection->real_escape_string($_POST['username']));
    $password = $connection->real_escape_string($_POST['password']);
    $sql = "SELECT id_user,username, password, id_role FROM user WHERE username='$username' OR email='$username'";
    if ($result_set = $connection->query($sql)) {
        $row = $result_set->fetch_assoc();
        if (password_verify($password, $row['password'])) {

            $_SESSION['id_user'] = $row['id_user']; // add user id to session array
            $_SESSION['username'] = ucfirst($row['username']); // add username to session array
            $_SESSION['role'] = $row['id_role']; //add id_role to session array

            $smsg = "You're logged in";
            header("refresh: 2; ./index.php");
        } else {
            $fmsg = "Wrong username or password";
        }
        $result_set->free();
    }
}
$connection->close();
?>