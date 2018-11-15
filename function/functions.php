<?php

class Product
{
    private $name, $vendor, $quantity, $price_s, $img = array(), $cat;

    public function getName()
    {
        return $this->name;
    }

    public function getVendor()
    {
        return $this->vendor;
    }

    public function getP()
    {
        return $this->price_s;
    }

    public function getImg()
    {
        return $this->img[0];
    }

    public function getQ()
    {
        return $this->quantity;
    }

    public function getCtg()
    {
        return $this->cat;
    }

    public function setImg($img)
    {
        $this->img[] = $img;
    }

    public function setCtg($ctg)
    {
        $this->cat = $ctg;
    }

    public function prodSet($n, $v, $p, $c, $q)
    {
        $this->name = $n;
        $this->vendor = $v;
        $this->price_s = $p;
        $this->cat = $c;
        $this->quantity = $q;
    }
}

function connect()
{
    //connection function
    $conn = new mysqli('localhost', 'root', '', 'plumbox');
    $conn->set_charset('utf-8');
    if ($conn->connect_error) {
        die('Connect Error (' . $conn->connect_errno . ') ' . $conn->connect_error);
    }
    session_start();
    return $conn;
}

function category($cat)
{
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
}

function loadCartGoods($json)
{
    //loading goods to cart.php
    $conn = connect();
    $cart = json_decode($json, true);
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
}

function getSession()
{
    // get username from global SESSION array
    $conn = connect();
    echo $_SESSION['username'];
}

function randomProd($id)
{
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
}