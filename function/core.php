<?php
$action = $_REQUEST['action'];
require_once('functions.php');
include_once('adminfunction.php');

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
    case 'promoCheck':
        if (isset($_REQUEST['promo'])) {
            promoCheck($_REQUEST['promo']);
        }
        break;
    case 'quantityCheck':
        if (isset($_REQUEST['order'])) {
            quantityCheck($_REQUEST['order']);
        }
        break;
    case 'bookProd':
        if (isset($_REQUEST['order'])) {
            bookProd($_REQUEST['order']);
        }
        break;
    case 'checkOut':
        if (isset($_REQUEST['order'])) {
            checkOut($_REQUEST['order']);
        }
        break;
    case 'uPersonal':
        if (isset($_REQUEST['uid'])) {
            getPersonal($_REQUEST['uid']);
        }
        break;
    case 'uOrder':
        if (isset($_REQUEST['uid'])) {
            getOrder($_REQUEST['uid']);
        }
        break;
    case 'uSettings':
        break;
    case 'uSupport':
        if (isset($_REQUEST['data'])) {
            sendMessage($_REQUEST['data']);
        }
        break;
    case 'checkSum':
        if (isset($_REQUEST['id_order'])) {
            checkSum($_REQUEST['id_order']);
        }
        break;
    case 'payment':
        if (isset($_REQUEST['id_order'])) {
            payment($_REQUEST['id_order']);
        }
        break;
    case 'uManageOrder':
        manageOrder();
        break;
    case 'getCategory':
        getCategory();
        break;
    case 'getUpdateProductList':
        if (isset($_REQUEST['category_id'])) {
            getUPL($_REQUEST['category_id']);
        }
        break;
    case 'showUpdateInfo':
        if (isset($_REQUEST['id_prod'])) {
            showUpdateInfo($_REQUEST['id_prod']);
        }
        break;
    case 'getStaffList':
        if (isset($_REQUEST['id_role'])){
            getStaffList($_REQUEST['id_role']);
        }
        break;
    case 'showStaffInfo':
        if (isset($_REQUEST['uid'])){
            showStaffInfo($_REQUEST['uid']);
        }
        break;
    case 'productDistribution':
        productDistribution();
        break;
    case 'companyPerformance':
        companyPerformance();
        break;
    case 'topProduct':
        topProduct();
        break;
    case 'removeProd':
        if (isset($_REQUEST['id_product'])){
            removeProd($_REQUEST['id_product']);
        }
        break;
    case 'updateProd':
        if (isset($_REQUEST['product'])){
            updateProd($_REQUEST['product']);
        }
        break;
    case 'updateOrderStatus':
        if (isset($_REQUEST['list'])){
            updateOrderStatus($_REQUEST['list']);
        }
        break;
    case 'updateStaff':
        if (isset($_REQUEST['staff'])){
            updateStaff($_REQUEST['staff']);
        }
        break;
    case 'removeStaff':
        if (isset($_REQUEST['email'])){
            removeStaff($_REQUEST['email']);
        }
        break;
    case 'addStaff':
        if (isset($_REQUEST['staff'])){
            addStaff($_REQUEST['staff']);
        }
        break;
    case 'addProd':
        if (isset($_REQUEST['product'])){
            addProd($_REQUEST['product']);
        }
        break;
}