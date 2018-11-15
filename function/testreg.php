<?php
require_once('connect.php');

if (isset($_POST['username']) and isset($_POST['password'])) {
    $username = strtolower($connection->real_escape_string($_POST['username']));
    $password = $connection->real_escape_string($_POST['password']);
    $sql = "SELECT username, password, id_role FROM user WHERE username='$username' OR email='$username'";
    if ($result_set = $connection->query($sql)) {
        $row = $result_set->fetch_assoc();
        if (password_verify($password, $row['password'])) {

            $_SESSION['username'] = ucfirst($row['username']);
            $_SESSION['role'] = $row['id_role'];
            sleep(1);
            header("Location: /index.php");
        } else {
            $fmsg = "Wrong username or password";
        }
        $result_set->free();
    }
}
$connection->close();
?>