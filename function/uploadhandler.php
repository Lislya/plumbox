<?php
/**
 * Created by PhpStorm.
 * User: Данил
 * Date: 12.12.2018
 * Time: 0:39
 */

require_once('connect.php');

if (isset($_POST['img_upload'])) {
    $keys = array();
    foreach ($_POST as $key => $value) {
        $keys[] = $key;
    }
    $id_prod = array_pop($keys);
    $sql = "SELECT name_ctg as category FROM product INNER JOIN category c on product.id_category = c.id_category WHERE id_product = '$id_prod'";
    if (!$result = $connection->query($sql)) {
        die("Error");
    } else {
        $row = $result->fetch_assoc();
        $category = $row['category'];
    }
    $result->free();

    $uploaddir = '../img/products/' . $category;
    if (!is_dir($uploaddir))
        mkdir($uploaddir, 0777);

    $files = $_FILES; // полученные файлы
    $done_files = array();

    foreach ($files as $file) {
        $file_name = $file['name'];
        $sql = "INSERT INTO image VALUES (null,'$file_name')";
        $connection->query($sql);
        $img_id = $connection->insert_id;
        $sql = "INSERT INTO product_img VALUES ('$id_prod','$img_id')";
        $connection->query($sql);

        if (move_uploaded_file($file['tmp_name'], "$uploaddir/$file_name")) {
            $done_files[] = realpath("$uploaddir/$file_name");
        }
    }

    $data = $done_files ? array('files' => $done_files) : array('error' => 'Ошибка загрузки файлов.');
    $connection->close();
    die();
}