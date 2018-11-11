<?php
class Good {
    private $name,$price,$desc,$vendor,$img=array(),$cat;

    function __construct($name,$price,$desc,$vendor,$cat)
    {
        $this->name = $name;
        $this->price = $price;
        $this->desc = $desc;
        $this->vendor = $vendor;
        $this->cat = $cat;
    }
    function setImg($img){
        $this->img[] = $img;
    }
    function setCat($c){
        $this->cat = $c;
    }
    function getName(){
        return $this->name;
    }
    function getP(){
        return $this->price;
    }
    function getD(){
        return $this->desc;
    }
    function getVend(){
        return $this->vendor;
    }
    function getCat(){
        return $this->cat;
    }
    function getImg($i){
        return $this->img[$i];
    }
}

require_once('connect.php');
$_GET['product_id'] = 1;
if(isset($_GET['product_id'])){
    $id = $_GET['product_id'];

    $sql = "SELECT * FROM product WHERE id_product="."$id";
    if($result_set = $connection->query($sql)){
        $row = $result_set->fetch_assoc();
        $product = new Good($row['name_product'],$row['price_s'],$row['description'],$row['vendor_code'],$row['id_category']);

        $ctg = $product->getCat();
        $sql = "SELECT name_ctg FROM category WHERE id_category="."$ctg";
        if($result_set_1 = $connection->query($sql)){
            $row_1 = $result_set_1->fetch_assoc();
            $product->setCat($row_1['name_ctg']);
        } $result_set_1->free();

        $sql = "SELECT id_img FROM product_img WHERE id_product="."$id";
        if($result_set_1 = $connection->query($sql)){
            while($row_1 = $result_set_1->fetch_assoc()){
                $id_img = $row_1['id_img'];
                $sql = "SELECT name_img FROM image WHERE id_img="."$id_img";
                if($result_set_2 = $connection->query($sql)){
                    $row_2 = $result_set_2->fetch_assoc();
                    $product->setImg($row_2['name_img']);
                } $result_set_2->free();
            }
        } $result_set_1->free();
    } $result_set->free();
    var_dump($product);
}
?>