<!-- Connect to DB -->
<?php require_once('function/connect.php') ?>
<?php if (empty($_SESSION['username'])) {
    echo $_SESSION['username'];
    die ("<h1>Authorized Access Only! <a href='login.php'>Login here</a></h1>");
} ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PlumBox</title>
    <link rel="stylesheet" type="text/css" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="bower_components/popup/css/popup.css">
    <link rel="stylesheet" type="text/css" href="bower_components/chosen_v1.8.7/chosen.min.css">
    <!-- index.php style sheet -->
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="css/catalog.css">
    <!-- Include Raleway font -->
    <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
    <!-- Include Bootstrap-icon pack for social -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
          integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="bower_components/bootstrap/dist/css/bootstrap-grid.min.css">

    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
    <!-- Include jQuery lib -->
    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <!-- Include Card Info Lib -->
    <script src="bower_components/card-info/dist/card-info.min.js"></script>
    <script src="bower_components/jquery-mask-plugin/dist/jquery.mask.min.js"></script>
    <!-- Include bootstrap js for modal windows -->
    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <!-- Include Google Charts  -->
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <!--    Include Chosen Lib -->
    <script type="text/javascript" src="bower_components/chosen_v1.8.7/chosen.jquery.min.js"></script>

</head>
<body>
<div class="wrapper">
    <header>
        <div class="logo">
            <a href="index.php"><img src="img/logo.png" alt="PlumBox" class="graphic_logo"></a>
        </div>
        <!-- Navigation bar -->
        <nav>
            <div class="navbar">
                <div class="navbar-left">
                    <a href="cart.php">
                        <img src="img/icon/cart.png" alt="cart">
                    </a>
                    <span id="cart-widget"></span>
                </div>
                <div class="navbar-center">
                    <a href="index.php">HOME</a>
                    <a href="catalog.php">CATALOG</a>
                    <a href="shop.php">SHOPS</a>
                    <a href="offer.php">SPECIAL OFFERS</a>
                    <a href="about.php">ABOUT US</a>
                </div>

                <div class="navbar-right">
                    <input type="hidden" id="uid" value="<?php echo $_SESSION['id_user'] ?>">
                    <a href="account.php"><?php echo $_SESSION['username']; ?></a>
                    <p> | </p>
                    <a href="function/logout.php">Log Out</a>
                </div>
            </div>
        </nav>
    </header>

    <main>
        <?php
        switch ($_SESSION['role']) {
            case 0:
                echo '<div class="container">
            <div class="row">
                <!-- left navbar of account -->
                <div class="col-sm">
                    <ul class="catalog">
                        <!-- uPersonal means User Personal data -->
                        <li data-option="uPersonal">
                            <a class="catalog_item">
								<span class="icon">
									<img src="img/icon/user_icon.png" alt="">
								</span>
                                <span class="title">Personal Information</span>
                            </a>
                        </li>
                        <li data-option="uOrder">
                            <a class="catalog_item">
								<span class="icon">
									<img src="img/icon/order_icon.png" alt="">
								</span>
                                <span class="title">My Orders</span>
                            </a>
                        </li>
                        <li data-option="uManageOrder">
                            <a class="catalog_item">
								<span class="icon">
									<img src="img/icon/order_management_icon.png" alt="">
								</span>
                                <span class="title">Order Management</span>
                            </a>
                        </li>
                        <li data-option="uManageStaff">
                            <a class="catalog_item">
								<span class="icon">
									<img src="img/icon/add_seller_icon.png" alt="">
								</span>
                                <span class="title">Staff Management</span>
                            </a>
                        </li>
                        <li data-option="uManageProduct">
                            <a class="catalog_item">
								<span class="icon">
									<img src="img/icon/add_product_icon.png" alt="">
								</span>
                                <span class="title">Product Control</span>
                            </a>
                        </li>
                        <li data-option="uStatistic">
                            <a class="catalog_item">
								<span class="icon">
									<img src="img/icon/statistic_icon.png" alt="">
								</span>
                                <span class="title">Statistic</span>
                            </a>
                        </li>

                    </ul>
                </div>';
                break;
            case 1:
                echo '<div class="container">
            <div class="row">
                <!-- left navbar of account -->
                <div class="col-sm">
                    <ul class="catalog">
                        <!-- uPersonal means User Personal data -->
                        <li data-option="uPersonal">
                            <a class="catalog_item">
								<span class="icon">
									<img src="img/icon/user_icon.png" alt="">
								</span>
                                <span class="title">Personal Information</span>
                            </a>
                        </li>
                        <li data-option="uOrder">
                            <a class="catalog_item">
								<span class="icon">
									<img src="img/icon/order_icon.png" alt="">
								</span>
                                <span class="title">My Orders</span>
                            </a>
                        </li>
                        <li data-option="uStatistic">
                            <a class="catalog_item">
								<span class="icon">
									<img src="img/icon/statistic_icon.png" alt="">
								</span>
                                <span class="title">Shop Statistic</span>
                            </a>
                        </li>
                        <li data-option="uSupport">
                            <a class="catalog_item">
								<span class="icon">
									<img src="img/icon/support_icon.png" alt="">
								</span>
                                <span class="title">Help & Support</span>
                            </a>
                        </li>

                    </ul>
                </div>';
                break;
            case 2:
                echo '<div class="container">
            <div class="row">
                <!-- left navbar of account -->
                <div class="col-sm">
                    <ul class="catalog">
                        <!-- uPersonal means User Personal data -->
                        <li data-option="uPersonal">
                            <a class="catalog_item">
								<span class="icon">
									<img src="img/icon/user_icon.png" alt="">
								</span>
                                <span class="title">Personal Information</span>
                            </a>
                        </li>
                        <li data-option="uOrder">
                            <a class="catalog_item">
								<span class="icon">
									<img src="img/icon/order_icon.png" alt="">
								</span>
                                <span class="title">My Orders</span>
                            </a>
                        </li>
                        <li data-option="uControl">
                            <a class="catalog_item">
								<span class="icon">
									<img src="img/icon/manage_icon.png" alt="">
								</span>
                                <span class="title">Shop control panel</span>
                            </a>
                        </li>
                        <li data-option="uSupport">
                            <a class="catalog_item">
								<span class="icon">
									<img src="img/icon/support_icon.png" alt="">
								</span>
                                <span class="title">Help & Support</span>
                            </a>
                        </li>

                    </ul>
                </div>';
                break;
            case 3:
                echo '<div class="container">
            <div class="row">
                <!-- left navbar of account -->
                <div class="col-sm">
                    <ul class="catalog">
                        <!-- uPersonal means User Personal data -->
                        <li data-option="uPersonal">
                            <a class="catalog_item">
								<span class="icon">
									<img src="img/icon/user_icon.png" alt="">
								</span>
                                <span class="title">Personal Information</span>
                            </a>
                        </li>
                        <li data-option="uOrder">
                            <a class="catalog_item">
								<span class="icon">
									<img src="img/icon/order_icon.png" alt="">
								</span>
                                <span class="title">My Orders</span>
                            </a>
                        </li>
                        <li data-option="uSettings">
                            <a class="catalog_item">
								<span class="icon">
									<img src="img/icon/settings_icon.png" alt="">
								</span>
                                <span class="title">Settings</span>
                            </a>
                        </li>
                        <li data-option="uSupport">
                            <a class="catalog_item">
								<span class="icon">
									<img src="img/icon/support_icon.png" alt="">
								</span>
                                <span class="title">Help & Support</span>
                            </a>
                        </li>

                    </ul>
                </div>';
                break;
        }
        ?>

        <div id="hidden" style="display: none;"></div>
        <div class="col-9">
            <div class="start-text">
                <img src="http://x-lines.ru/letters/i/cyrillicscript/0034/000000/20/0/k71saa5xpi11y7dxrbhs67m1rbosga5xqiz8eee.png"
                     alt="Welcome to your account">
            </div>
            <div class="start-text">
                <img src="http://x-lines.ru/letters/i/cyrillicscript/0034/000000/20/0/epwg655ucwog65ufrbzscedwpb1zg3e.png"
                     alt="Choose one of these">
            </div>
            <div class="start-text">
                <img src="img/icon/menu_arrow_icon.png" alt="">
            </div>
        </div>
        <!-- Payment form   -->
        <div id="payment" class="modal fade">

        </div>
    </main>

    <footer>
        <!-- Social -->
        <div class="icon-pack1">
            <ul>
                <li><a href="https://www.facebook.com"><i class="fab fa-facebook" aria-hidden="true"></i></a></li>
                <li><a href="https://www.google.com"><i class="fab fa-google-plus" aria-hidden="true"></i></a></li>
                <li><a href="https://www.instagram.com"><i class="fab fa-instagram" aria-hidden="true"></i></a></li>
                <li><a href="https://www.twitter.com"><i class="fab fa-twitter" aria-hidden="true"></i></a></li>
                <li><a href="https://www.vk.com"><i class="fab fa-vk" aria-hidden="true"></i></a></li>
            </ul>
        </div>
        <!-- Copyright -->
        <div id="rights">
            <p>All rights reserved &copy; <?php echo date('Y'); ?> </p>
        </div>
    </footer>
</div>
<script src="js/account.js"></script>

</body>
</html>

