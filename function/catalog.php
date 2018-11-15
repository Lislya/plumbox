<?php
//connect to DB
require_once ('connect.php');
//$_REQUEST['category']=1;
//Product class
class Product{
    private $name,$vendor, $quantity, $price_s,$img=array(),$cat;
    public function getName(){
        return $this->name;
    }
    public function getVendor(){
        return $this->vendor;
    }
    public function getP() {
        return $this->price_s;
    }
    public function getImg(){
        return $this->img[0];
    }
    public function getQ() {
        return $this->quantity;
    }
    public function setImg($img)
    {
        $this->img[]=$img;
    }
    public function prodSet($n,$v,$p,$c,$q){
        $this->name = $n;
        $this->vendor = $v;
        $this->price_s = $p;
        $this->cat=$c;
        $this->quantity=$q;
    }
}

if(isset($_REQUEST['category']))
{
    //array for json file
    $list=array();

    //prepare $category for sql-request
    $category = '"'.$connection->real_escape_string($_REQUEST['category']).'"';

    //prepare sql request
    $sql = "SELECT * FROM product WHERE id_category=".$category;

    //get assoc array in $result_set
    if($result_set = $connection->query($sql)){

        while($rows = $result_set->fetch_assoc()){
            $product = new Product();
            $product->prodSet($rows['name_product'],$rows['vendor_code'],$rows['price_s'],$rows['id_category'],$rows['quantity']);
            $id_product = $rows['id_product'];
            //get id_img
            $sql = "SELECT id_img FROM product_img WHERE id_product="."$id_product";
            //get assoc array in $result_set1
            if($result_set1 = $connection->query($sql)){
                while($rows1=$result_set1->fetch_assoc()){
                    $id_img = $rows1['id_img'];
                    //get image name
                    $sql = "SELECT name_img FROM image WHERE id_img="."$id_img";
                    if($result_set2=$connection->query($sql)){
                        while($rows2=$result_set2->fetch_assoc()){
                            $product->setImg($rows2['name_img']);
                        } $result_set2->free();
                    }
                } $result_set1->free();
            }
            $id_ctg = $rows['id_category'];
            //get category name
            $sql = "SELECT name_ctg FROM category WHERE id_category="."$id_ctg";
            $result_set1 = $connection->query($sql);
            $rows1 = $result_set1->fetch_assoc();
            $vendor = $product->getVendor();
            //preparing array for JSON class encoding
            $list[$vendor]=array();
            $list[$vendor]['id']=$rows['id_product'];
            $list[$vendor]['name']=$product->getName();
            $list[$vendor]['price']=$product->getP();
            $list[$vendor]['quantity']=$product->getQ();
            $list[$vendor]['img']=$product->getImg();
            $list[$vendor]['category']=$rows1['name_ctg'];
            $result_set1->free();
        } $result_set->free();

    }
    echo json_encode($list,JSON_NUMERIC_CHECK|JSON_UNESCAPED_UNICODE);
}
$connection->close();

