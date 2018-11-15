<?php
//Connection to Plumbox server
//Объектно-ориентированный подход
$servername = 'localhost';
$username = 'root';
$password = '';
$db_name = 'plumbox';
$connection = new mysqli($servername, $username, $password, $db_name);
$connection->set_charset('utf-8');
if ($connection->connect_error) {
    die('Connect Error (' . $connection->connect_errno . ') ' . $connection->connect_error);
}
session_start();
?>