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
    <link rel="stylesheet" type="text/css" href="bower_components/popup/css/popup.css">
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
<!--    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>-->

</head>
<body>
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
    <!-- grid setting -->
    <div class="container">
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
            </div>

            <div class="col-9">
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

<script src="js/account.js"></script>

</body>
</html>

