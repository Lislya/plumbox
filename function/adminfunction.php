<?php

function clean($str) {
    return htmlspecialchars(stripslashes(strip_tags(trim($str))));
}

function manageOrder() {
    //show all order list
    $conn = connect();
    $list = array(); //order list for JSON_encode
    $sql = "SELECT * FROM `order`";
    if ($result_set = $conn->query($sql)) {
        while ($rows = $result_set->fetch_assoc()) {
            $list[$rows['id_order']]['order_stat'] = $rows['order_stat'];
            $list[$rows['id_order']]['date'] = $rows['date'];
            $list[$rows['id_order']]['delivery_stat'] = $rows['delivery_stat'];
            $list[$rows['id_order']]['id_discount'] = $rows['id_discount'];

            $id_order = $rows['id_order'];
            $sql = "SELECT id_product, quantity FROM order_product WHERE id_order='$id_order'";
            if ($result_set1 = $conn->query($sql)) {
                while ($rows1 = $result_set1->fetch_assoc()) {

                    $id_product = $rows1['id_product'];
                    $sql = "SELECT name_product, price_s FROM product WHERE id_product = '$id_product'";
                    if ($result_set2 = $conn->query($sql)) {
                        $row = $result_set2->fetch_assoc();
                        $list[$rows['id_order']]['product'][$row['name_product']]['price'] = $row['price_s'];
                        $list[$rows['id_order']]['product'][$row['name_product']]['quantity'] = $rows1['quantity'];
                    } else {
                        echo "Error: " . $conn->error;
                        die;
                    }
                    $result_set2->free();
                }
            } else {
                echo 'Error: ' . $conn->error;
                die;
            }
            $result_set1->free();
        }
        $result_set->free();
    } else {
        echo "Error: " . $conn->error;
        die;
    }
    echo json_encode($list, JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE);
    $conn->close();

}

function getCategory() {
    $conn = connect();
    $category_list = array();
    $sql = "SELECT * FROM category";
    if ($result_set = $conn->query($sql)) {
        while ($rows = $result_set->fetch_assoc()) {
            $category_list[$rows['id_category']] = $rows['name_ctg'];
        }
    } else {
        echo "Error: " . $conn->error;
        die;
    }
    $result_set->free();
    echo json_encode($category_list, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    $conn->close();
}

function getUPL($cat_id) {
    //get list of products of some category by cat_id in product control account.php
    $conn = connect();
    $sql = "SELECT name_product,id_product FROM product WHERE id_category = '$cat_id'";
    $product_list = array();
    if ($result_set = $conn->query($sql)) {
        while ($rows = $result_set->fetch_assoc()) {
            $product_list[$rows['id_product']] = array();
            $product_list[$rows['id_product']]['name_product'] = $rows['name_product'];
        }
    } else {
        echo "Error: " . $conn->error;
        die;
    }
    $result_set->free();
    echo json_encode($product_list, JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE);
    $conn->close();
}

function showUpdateInfo($id_prod) {
    //get product update information for product control menu "update"-tab
    $conn = connect();
    $sql = "SELECT price_s,quantity,description,vendor_code FROM product WHERE id_product = '$id_prod'";
    $product = array();
    if ($result = $conn->query($sql)) {
        $row = $result->fetch_assoc();
        $product['price_s'] = $row['price_s'];
        $product['quantity'] = $row['quantity'];
        $product['description'] = $row['description'];
        $product['vendor_code'] = $row['vendor_code'];
    } else {
        echo "Error: " . $conn->error;
        die;
    }
    $result->free();
    echo json_encode($product, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    $conn->close();
}

function getStaffList($id_role) {
    //get staff list
    $conn = connect();
    $staff_list = array();
    $sql = "SELECT id_user,email FROM user WHERE id_role = '$id_role'";
    if ($result_set = $conn->query($sql)) {
        while ($rows = $result_set->fetch_assoc()) {
            $staff_list[$rows['id_user']] = $rows['email'];
        }
    } else {
        echo "Error: " . $conn->error;
        die;
    }
    $result_set->free();
    echo json_encode($staff_list, JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE);
    $conn->close();
}

function showStaffInfo($uid) {
    //show info about certain staff account
    $conn = connect();
    $user = array();
    $sql = "SELECT name, s_name, tel FROM user WHERE id_user = '$uid'";
    if ($result = $conn->query($sql)) {
        $row = $result->fetch_assoc();
        $user['name'] = $row['name'];
        $user['s_name'] = $row['s_name'];
        $user['tel'] = $row['tel'];
    } else {
        echo "Error: " . $conn->error;
        die;
    }
    $result->free();

    $sql = "SELECT passport_date, passport_given, passport_num FROM passport WHERE id_user = '$uid'";
    if ($result = $conn->query($sql)) {
        $row = $result->fetch_assoc();
        $user['passport_num'] = $row['passport_num'];
        $user['passport_date'] = $row['passport_date'];
        $user['passport_given'] = $row['passport_given'];
    } else die;
    echo json_encode($user, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    $conn->close();
}

function productDistribution() {
    //get piechart data
    $conn = connect();
    $data = array();
    $sql = "SELECT c.name_ctg as category, SUM(quantity) as quantity FROM product INNER JOIN category c on product.id_category = c.id_category GROUP BY product.id_category";
    if ($result_set = $conn->query($sql)) {
        while ($rows = $result_set->fetch_assoc()) {
            $data[$rows['category']] = $rows['quantity'];
        }
    } else {
        echo "Error: " . $conn->error;
        die;
    }
    echo json_encode($data, JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE);
    $conn->close();
}

function companyPerformance() {
    //get data for company performance barchart
    $conn = connect();
    $data = array();
    $sql = "SELECT sum(o.quantity*price_s) as sales, sum(o.quantity*price_b) as expenses ,sum(o.quantity*(price_s-price_b)) as profit FROM product INNER JOIN order_product o 
            on product.id_product = o.id_product";
    if ($result_set = $conn->query($sql)) {
        while ($rows = $result_set->fetch_assoc()) {
            $data['sales'] = $rows['sales'];
            $data['expenses'] = $rows['expenses'];
            $data['profit'] = $rows['profit'];
        }
    } else {
        echo "Error: " . $conn->error;
        die;
    }
    $result_set->free();
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    $conn->close();
}

function topProduct() {
    //get top-3 products
    $conn = connect();
    $list = array();
    $sql = "
SELECT name_product as product, sum(o.quantity) as quantity
FROM product
       INNER JOIN order_product o on product.id_product = o.id_product
GROUP BY o.id_product
ORDER BY sum(o.quantity) DESC
LIMIT 0, 5";
    if ($result_set = $conn->query($sql)) {
        while ($rows = $result_set->fetch_assoc()) {
            $list[$rows['product']] = $rows['quantity'];
        }
    } else {
        echo "Error: " . $conn->error;
        die;
    }
    $result_set->free();
    echo json_encode($list, JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE);
    $conn->close();

}

function updateProd($product) {
    //update product info in DB
    $conn = connect();
    $product = json_decode($product, TRUE);
    foreach ($product as $key => $value) {
        $product[$key] = clean($value);
    }
    $id_product = $product['id_product'];
    $price_s = $product['price_s'];
    $quantity = $product['quantity'];
    $description = $product['description'];
    $sql = "UPDATE product SET price_s ='$price_s', quantity='$quantity',description='$description' WHERE id_product='$id_product'";
    if ($result = $conn->query($sql)) {
        $msg = 'Success';
    } else {
        $msg = "Failed";
    }
    echo $msg;
    $conn->close();
}

function removeProd($id_product) {
    //delete product from DB
    $conn = connect();
    $sql = "DELETE FROM product WHERE id_product = '$id_product'";
    if ($result = $conn->query($sql)) {
        $msg = 1;
        $sql = "DELETE FROM product_img WHERE id_product = '$id_product'";
        $conn->query($sql);
    } else {
        $msg = "Error: " . $conn->error;
    }

    echo $msg;
    $conn->close();
}

function updateOrderStatus($list) {
    //order control status func
    $list = json_decode($list, TRUE);
    $conn = connect();
    $err = array();
    foreach ($list as $key => $value) {
        $sql = "UPDATE `order` SET order_stat = '$value' WHERE id_order = '$key'";
        if (!$result = $conn->query($sql)) {
            $err[] = $conn->error;
            die;
        }
    }
    if (count($err) > 0) {
        echo 'Failed';
    } else {
        echo 'Success';
    }
    $conn->close();
}

function updateStaff($staff) {
    //update staff info
    $staff = json_decode($staff, TRUE);
    foreach ($staff as $key => $value) {
        $staff[$key] = clean($value);
    }
    $email = $staff['email'];
    $tel = $staff['tel'];
    $newPass = password_hash($staff['newPass'], PASSWORD_DEFAULT);

    $conn = connect();
    $sql = "SELECT password FROM user WHERE email ='$email'";
    if ($result = $conn->query($sql)) {
        $row = $result->fetch_assoc();
        $validation = password_verify($staff['oldPass'], $row['password']);
    } else die("Error:" . $conn->error);
    $result->free();

    if (!$validation) {
        die('Wrong password!');
    } else {
        $sql = "UPDATE user SET tel='$tel',password='$newPass' WHERE email = '$email'";
        if ($result = $conn->query($sql)) {
            echo "Information updated successfully";
        } else die("Error: " . $conn->error);
    }

    $conn->close();
}

function removeStaff($email) {
    //remove staff from db
    $conn = connect();
    $sql = "DELETE FROM user WHERE email='$email'";
    if ($result = $conn->query($sql)) {
        echo 'User was removed successfully';
    } else {
        die("Error: " . $conn->error);
    }
    $conn->close();
}

function check_length($min, $value = '') {
    // check string length
    $result = (mb_strlen($value) < $min);
    return !$result;
}

function addStaff($staff) {

    //add new staff
    $staff = json_decode($staff, TRUE);
    foreach ($staff as $key => $value) {
        $staff[$key] = clean($value);
    }
    $name = $staff['name'];
    $s_name = $staff['s_name'];
    $username = $staff['username'];
    $password = $staff['password'];
    $d_birth = $staff['d_birth'];
    $email = $staff['email'];
    $tel = $staff['tel'];
    $id_role = $staff['id_role'];
    $passport_num = $staff['passport_num'];
    $passport_date = $staff['passport_date'];
    $passport_given = $staff['passport_given'];

    $today_date = date('Y-m-d');
    $email_valid = filter_var($email, FILTER_VALIDATE_EMAIL);

    $conn = connect();
    if (check_length(3, $username) && check_length(6, $password) && $email_valid && $d_birth < $today_date) {
        $password = password_hash($password, PASSWORD_DEFAULT);
        $sql = "INSERT INTO user VALUES (null,'$name','$s_name','$username','$password','$d_birth','$email','$tel',0,'$id_role')";
        if ($result = $conn->query($sql)) {
            $id_user = $conn->insert_id;
            $sql = "INSERT INTO passport VALUES ('$passport_num','$passport_given','$passport_date','$id_user')";
            if ($result = $conn->query($sql)) {
                echo 'Registration successful';
            }
        } else {
            echo 'Registration failed';
        }
    } else echo 'Wrong data';

    $conn->close();

}

function addProd($product) {
    //add new product
    $conn = connect();
    $product = json_decode($product, TRUE);
    foreach ($product as $key => $item) {
        $product[$key] = clean($item);
    }
    $name_product = $product['name_product'];
    $vendor = $product['vendor'];
    $quantity = $product['quantity'];
    $price_s = $product['price_s'];
    $price_b = $product['price_b'];
    $description = $product['description'];
    $catId = $product['catId'];



    $sql = "INSERT INTO product VALUES (null,'$name_product','$vendor','$quantity',0,'$price_b','$price_s','$description','$catId')";
    if ($result = $conn->query($sql)) {
        echo $conn->insert_id;
    } else echo 0;
    $conn->close();
}