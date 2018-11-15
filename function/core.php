<?php
$action = $_REQUEST['action'];
 require_once ('functions.php');

 switch ($action){
     case 'category':
         if (isset($_REQUEST['category'])){
             category($_REQUEST['category']);
         } else die('No category');
         break;
     case 'loadCart':
         if (isset($_REQUEST['json'])){
             loadCartGoods($_REQUEST['json']);
         } else die('No JSON-data');
         break;
     case 'getSession':
         getSession();
         break;
     case 'randomProd':
         if(isset($_REQUEST['id'])){
             randomProd($_REQUEST['id']);
         } else die ('No product id');
         break;
 }