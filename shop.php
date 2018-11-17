<!-- Connect to DB -->
<?php require('function/connect.php'); ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PlumBox</title><!-- index.php style sheet -->
    <link href="css/style.css" rel="stylesheet" type="text/css"><!-- Include Raleway font -->
    <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
    <!-- Include Bootstrap-icon pack for social -->
    <link href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" rel="stylesheet">
    <link href="img/favicon.ico" rel="shortcut icon" type="image/x-icon"><!-- Include jQuery lib -->

    <script src="bower_components/jquery/dist/jquery.min.js" type="text/javascript"></script>
</head>
<body>

<header>
    <div class="logo">
        <a href="index.php"><img alt="PlumBox" class="graphic_logo" src="img/logo.png"></a>
    </div><!-- Navigation bar -->
    <nav>
        <div class="navbar">
            <div class="navbar-left">
                <a href="cart.php"><img alt="cart" src="img/icon/cart.png"></a> <span id="cart-widget"></span>
            </div>
            <div class="navbar-center">
                <a href="index.php">HOME</a>
                <a href="catalog.php">CATALOG</a>
                <a href="shop.php">SHOPS</a>
                <a href="offer.php">SPECIAL OFFERS</a>
                <a href="about.php">ABOUT US</a>
            </div>
            <div class="navbar-right">
                <?php if (isset($_SESSION['username'])) : ?>
                    <a href="account.php"><?php echo $_SESSION['username']; ?></a>
                    <p>|</p><a href="function/logout.php">Log Out</a>
                <?php else : ?>
                    <a href="login.php">Sign In</a>
                    <p>|</p><a href="signup.php">Sign Up</a>
                <?php endif; ?>
            </div>
        </div>
    </nav>
</header>
<main>
</main>
<footer>
    <!-- Social -->
    <div class="icon-pack1">
        <ul>
            <li>
                <a href="https://www.facebook.com"><i aria-hidden="true" class="fab fa-facebook"></i></a>
            </li>
            <li>
                <a href="https://www.google.com"><i aria-hidden="true" class="fab fa-google-plus"></i></a>
            </li>
            <li>
                <a href="https://www.instagram.com"><i aria-hidden="true" class="fab fa-instagram"></i></a>
            </li>
            <li>
                <a href="https://www.twitter.com"><i aria-hidden="true" class="fab fa-twitter"></i></a>
            </li>
            <li>
                <a href="https://www.vk.com"><i aria-hidden="true" class="fab fa-vk"></i></a>
            </li>
        </ul>
    </div><!-- Copyright -->
    <div id="rights">
        <p>All rights reserved &copy; <?php echo date('Y'); ?></p>
    </div>
</footer>

</body>
</html>