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
    <link rel="stylesheet" type="text/css" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/1.css">

    <!-- index.php style sheet -->
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="css/catalog.css">
    <!-- Include Raleway font -->
    <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
    <!-- Include Bootstrap-icon pack for social -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
          integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="bower_components/bootstrap/dist/css/bootstrap-grid.min.css">
    <!--    <link rel="stylesheet" type="text/css" href="bower_components/bootstrap/dist/css/bootstrap.min.css">-->


    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
    <!-- Include jQuery lib -->
    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <!--    <script src="bower_components/popup/js/popup.js"></script>-->

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
    <main>
        <!--        Main cart       -->
        <div class="alert alert-success" role="alert" id="bookProd" style="display: none    ;"></div>
        <div class="cart"></div>
        <!--            Pop-up window with customer information input   -->
        <div id="order" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="spincrement"></h4><h4>&nbsp;₽</h4>
                        <button class="close" type="button" data-dismiss="modal">×</button>
                    </div>
                    <div class="modal-body ">
                        <form method="POST" action="function/checkout.php">
                            <div class="form-item">
                                <input type="email" name="email" id="email" class="signup-input" required>
                                <div class="alert alert-danger" role="alert" id="alert_email"
                                     style="display: none;"></div>
                                <label for="email" class="signup-label">Email</label>
                                <!--CC Widget-->
                                <div id="cards">
                                    <div id="front">
                                        <a target="_blank" href="#" id="bank-link"></a>
                                        <img src="" alt="" id="brand-logo">
                                        <div id="front-fields">
                                            <input class="field" id="number" type="text"
                                                   placeholder="0000 0000 0000 0000">
                                            <label class="label">Valid until</label>
                                            <input class="field expired" id="mm" type="text" placeholder="MM">
                                            <input class="field expired" id="yy" type="text" placeholder="YY">
                                        </div>
                                    </div>
                                    <div id="back">
                                        <input class="field" id="code" type="password" placeholder="">
                                        <label id="code-label" class="label">CVV/CVC</label>
                                    </div>
                                </div>
                            </div>

                            <div class="checkbox">
                                <label for="addr_stat">Delivery address?</label>

                                <input type="checkbox" id="addr_stat" name="addr_stat" value="on"
                                       onclick="ShowHide(this)">

                                <select class="form-control" id="pickup">

                                </select>
                            </div>
                            <div class="addr_input" id="addr_input">
                                <div class="form-item_addr">
                                    <input type="text" name="region" id="region" class="signup-input"
                                           placeholder="Region">
                                </div>
                                <div class="form-item_addr">
                                    <input type="text" name="city" id="city" class="signup-input" placeholder="City">
                                </div>
                                <div class="form-item_addr">
                                    <input type="text" name="street" id="street" class="signup-input"
                                           placeholder="Street">
                                </div>
                                <div class="form-item_addr">
                                    <input type="text" name="house" id="house" class="signup-input" placeholder="House">
                                </div>
                                <div class="form-item_addr">
                                    <input type="text" name="corp" id="corp" class="signup-input" placeholder="Corp">
                                </div>
                                <div class="form-item_addr">
                                    <input type="text" name="flat" id="flat" class="signup-input" placeholder="Flat">
                                </div>
                                <div class="form-item_addr">
                                    <input type="text" name="post_index" id="post_index" class="signup-input"
                                           placeholder="Post Index">
                                </div>

                            </div>
                            <div class="modal-footer">
                                <input class="btn btn-success" type="submit" value="CHECKOUT">
                            </div>
                        </form>
                    </div>
                </div>
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

<script src="js/cart.js"></script>
<script src="js/signup.js"></script>

</body>
</html>

