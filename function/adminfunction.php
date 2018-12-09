<?php

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