<?php

class Product
{
    private $name, $vendor, $quantity, $price_s, $img = array(), $cat;

    public function getName() {
        return $this->name;
    }

    public function getVendor() {
        return $this->vendor;
    }

    public function getP() {
        return $this->price_s;
    }

    public function getImg() {
        return $this->img[0];
    }

    public function getQ() {
        return $this->quantity;
    }

    public function getCtg() {
        return $this->cat;
    }

    public function setImg($img) {
        $this->img[] = $img;
    }

    public function setCtg($ctg) {
        $this->cat = $ctg;
    }

    public function prodSet($n, $v, $p, $c, $q) {
        $this->name = $n;
        $this->vendor = $v;
        $this->price_s = $p;
        $this->cat = $c;
        $this->quantity = $q;
    }
}

function connect() {
    //connection function
    $conn = new mysqli('localhost', 'root', '', 'plumbox');
    $conn->set_charset('utf-8');
    if ($conn->connect_error) {
        die('Connect Error (' . $conn->connect_errno . ') ' . $conn->connect_error);
    }
    session_start();
    return $conn;
}

function category($cat) {
    //category product output
    $conn = connect();
    //Product class

    if (isset($cat)) {
        //array for json file
        $list = array();

        //prepare $category for sql-request

        //prepare sql request
        $sql = "SELECT * FROM product WHERE id_category=" . $cat;

        //get assoc array in $result_set
        if ($result_set = $conn->query($sql)) {

            while ($rows = $result_set->fetch_assoc()) {
                $product = new Product();
                $product->prodSet($rows['name_product'], $rows['vendor_code'], $rows['price_s'], $rows['id_category'], $rows['quantity']);
                $id_product = $rows['id_product'];
                //get id_img
                $sql = "SELECT id_img FROM product_img WHERE id_product=" . "$id_product";
                //get assoc array in $result_set1
                if ($result_set1 = $conn->query($sql)) {
                    while ($rows1 = $result_set1->fetch_assoc()) {
                        $id_img = $rows1['id_img'];
                        //get image name
                        $sql = "SELECT name_img FROM image WHERE id_img=" . "$id_img";
                        if ($result_set2 = $conn->query($sql)) {
                            while ($rows2 = $result_set2->fetch_assoc()) {
                                $product->setImg($rows2['name_img']);
                            }
                            $result_set2->free();
                        }
                    }
                    $result_set1->free();
                }
                $id_ctg = $rows['id_category'];
                //get category name
                $sql = "SELECT name_ctg FROM category WHERE id_category=" . "$id_ctg";
                $result_set1 = $conn->query($sql);
                $rows1 = $result_set1->fetch_assoc();
                $vendor = $product->getVendor();
                //preparing array for JSON class encoding
                $list[$vendor] = array();
                $list[$vendor]['id'] = $rows['id_product'];
                $list[$vendor]['name'] = $product->getName();
                $list[$vendor]['price'] = $product->getP();
                $list[$vendor]['quantity'] = $product->getQ();
                $list[$vendor]['img'] = $product->getImg();
                $list[$vendor]['category'] = $rows1['name_ctg'];
                $result_set1->free();
            }
            $result_set->free();

        }
        echo json_encode($list, JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE);
    }
    $conn->close();
}

function loadCartGoods($json) {
    //loading goods to cart.php
    $conn = connect();
    $cart = json_decode($json, TRUE);
    if (json_last_error() === JSON_ERROR_NONE) {
        foreach ($cart as $id => $value) {
            $id_product = $id;
            $sql = "SELECT price_s FROM product WHERE id_product='$id_product'";
            if ($result_set = $conn->query($sql)) {
                $row = $result_set->fetch_assoc();
                $cart[$id]['price'] = $row['price_s'];
            }
        }
        echo json_encode($cart, JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE);
    } else die("It's not JSON format");
    $conn->close();
}

function getSession() {
    // get id user from global SESSION array
    $conn = connect();
    echo $_SESSION['id_user'];
    $conn->close();
}

function randomProd($id) {
    $conn = connect();

    $list = array(); //array for json file

    //get info about random slot in index.php
    $product = new Product(); //initialize one slot
    //prepare sql query
    $sql = "SELECT * FROM product WHERE id_product='$id'";
    if ($result_set = $conn->query($sql)) {
        $row = $result_set->fetch_assoc();
        $product->prodSet($row['name_product'], $row['vendor_code'], $row['price_s'], $row['id_category'], $row['quantity']);
    }
    $result_set->free();
    //get images id
    $sql = "SELECT id_img FROM product_img WHERE id_product = '$id'";
    if ($result_set = $conn->query($sql)) {
        while ($rows = $result_set->fetch_assoc()) {
            $id_img = $rows['id_img'];

            //get image name
            $sql = "SELECT name_img FROM image WHERE id_img = '$id_img'";
            if ($result_set1 = $conn->query($sql)) {
                $row = $result_set1->fetch_assoc();
                $product->setImg($row['name_img']);
            }
            $result_set1->free();
        }
        $result_set->free();
    }
    //get category name
    $id_ctg = $product->getCtg();
    $sql = "SELECT name_ctg FROM category WHERE id_category = '$id_ctg'";
    if ($result_set = $conn->query($sql)) {
        $row = $result_set->fetch_assoc();
        $product->setCtg($row['name_ctg']);
    }
    $result_set->free();

    //setting list array
    $list[$id]['name'] = $product->getName();
    $list[$id]['price'] = $product->getP();
    $list[$id]['category'] = $product->getCtg();
    $list[$id]['img'] = $product->getImg();
    echo json_encode($list, JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE);
    $conn->close();
}

function promoCheck($promo) {
    // ajax promocode validation in cart.php/js
    $conn = connect();
    $sql = "SELECT value FROM discount WHERE code='$promo'";
    if ($result_set = $conn->query($sql)) {
        if ($result_set->num_rows == 0) {
            echo 0;
        } else {
            $row = $result_set->fetch_assoc();
            $value = $row['value'];
            echo $value;
        }
    }
}

function bookProd($order) {
    // Book order in cart.php for logged user
    $conn = connect();

    $product_list = json_decode($order); //decode order list

    $addr_stat = 0;
    if (json_last_error() === JSON_ERROR_NONE) {
        $datestamp = date("Y-m-d H:i:s");
        $promocode = $product_list->{'discount'};
        $id_user = $product_list->{'uid'};

        $sql = "SELECT addr_stat FROM user WHERE id_user ='$id_user'";
        if ($result_set = $conn->query($sql)) {
            $row = $result_set->fetch_assoc();
            if ($row['addr_stat'] == 1) {
                $addr_stat = 1;
            }
        }
        $result_set->free();

        $sql = "SELECT id_discount FROM discount WHERE code = '$promocode'";
        if ($result_set = $conn->query($sql)) {
            if ($result_set->num_rows==0){
                $id_discount = 0;
            } else{
                $row = $result_set->fetch_assoc();
                $id_discount = $row['id_discount'];
            }
        }
        $result_set->free();

        $sql = "INSERT INTO `order` VALUES (NULL,'$addr_stat',0,'$datestamp','$id_user','$id_discount')";
        if (!$result_set = $conn->query($sql)) {
            die ("ERROR: " . $conn->error);
        }

        $id_order = $conn->insert_id;
        foreach ($product_list as $id => $val) {
            if (is_object($product_list->$id)) {
                $prod_id = $product_list->$id->{"prod_id"};
                $num = $product_list->$id->{"num"};
                $sql = "INSERT INTO `order_product` VALUES ('$id_order','$prod_id','$num')";
                if (!$result = $conn->query($sql)) {
                    die("Order_product Error: " . $conn->error);
                }
            }

            $sql = "UPDATE product SET booked = booked + '$num' WHERE id_product = '$id'";
            if (!$result = $conn->query($sql)) {
                die ("Booking error: " . $conn->error);
            }
        }
    }
}

function getShop() {
    //get shops information
    $shopName = array();
    $conn = connect();
    $sql = "SELECT name_shop FROM shop";
    if ($result_set = $conn->query($sql)) {
        while ($rows = $result_set->fetch_assoc()) {
            $shopName[] = $rows['name_shop'];
        }
    }
    $result_set->free();

    echo json_encode($shopName, JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE);
    $conn->close();
}

function getPersonal($uid) {
    //get user personal information in account.php
    $conn = connect();
    $list = array();
    $sql = "SELECT * FROM user WHERE id_user='$uid'";
    if ($result_set = $conn->query($sql)) {
        $row = $result_set->fetch_assoc();
        $list['name'] = $row['name'];
        $list['s_name'] = $row['s_name'];
        $list['username'] = $row['username'];
        $list['d_birth'] = $row['d_birth'];
        $list['email'] = $row['email'];
        $list['tel'] = $row['tel'];
        $list['id_role'] = $row['id_role'];
        $list['addr_stat'] = $row['addr_stat'];

    }
    $result_set->free();

    //get address
    if ($list['addr_stat'] == 1) {
        $sql = "SELECT * FROM address WHERE id_user = '$uid' ";
        if ($result_set = $conn->query($sql)) {
            $row = $result_set->fetch_assoc();
            $list['region'] = $row['region'];
            $list['city'] = $row['city'];
            $list['street'] = $row['street'];
            $list['house'] = $row['house'];
            $list['corp'] = $row['corp'];
            $list['flat'] = $row['flat'];
            $list['post_index'] = $row['post_index'];
        }
        $result_set->free();
    }

    //get role name
    $id_role = $list['id_role'];
    $sql = "SELECT name_role FROM role WHERE id_role='$id_role'";
    if ($result_set = $conn->query($sql)) {
        $row = $result_set->fetch_assoc();
        $list['role'] = $row['name_role'];
    }
    $result_set->free();
    echo json_encode($list, JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE);
    $conn->close();
}

function getOrder($uid) {
    //get user's orders
    $conn = connect();
    $list = array();
    $sql = "SELECT * FROM `order` WHERE id_user = '$uid'";
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
                    }
                    $result_set2->free();
                }
            }
            $result_set1->free();
        }
        $result_set->free();
    }
    echo json_encode($list, JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE);
    $conn->close();
}

function sendMessage($message) {
    //send feedback message grom account.php

}