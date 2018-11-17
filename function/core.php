<?php
$action = $_REQUEST['action'];
require_once('functions.php');

switch ($action) {
    case 'category':
        if (isset($_REQUEST['category'])) {
            category($_REQUEST['category']);
        } else die('No category');
        break;
    case 'loadCart':
        if (isset($_REQUEST['json'])) {
            loadCartGoods($_REQUEST['json']);
        } else die('No JSON-data');
        break;
    case 'getSession':
        getSession();
        break;
    case 'randomProd':
        if (isset($_REQUEST['id'])) {
            randomProd($_REQUEST['id']);
        } else die ('No product id');
        break;
    case 'getShop':
        getShop();
        break;
    case 'uPersonal':
        if (isset($_REQUEST['uid'])) {
            getPersonal($_REQUEST['uid']);
        }
        break;
    case 'uOrder':
        if (isset($_REQUEST['uid'])){
            getOrder($_REQUEST['uid']);
        }
        break;
    case 'uSettings':
        break;
    case 'uSupport':
        break;
}