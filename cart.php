<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PlumBox</title>
    <!-- index.php style sheet -->
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="css/signup.css">
    <!-- Include Raleway font -->
    <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
    <!-- Include Bootstrap css stylesheet  -->
    <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
          integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
    <!--        Tab Icon    -->
    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
    <!-- Include jQuery lib -->
    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="bower_components/jquery-spincrement/jquery.spincrement.min.js"></script>
    <script src="bower_components/card-info/dist/card-info.min.js"></script>
    <script src="bower_components/jquery-mask-plugin/dist/jquery.mask.min.js"></script>
    <!--    Include Bootstrap js-->
    <script type="text/javascript" src="js/libs/bootstrap.min.js"></script>
</head>
<body>
<!-- Connect to DB -->
<?php require('function/connect.php'); ?>
<div class="wrapper">
    <header>
        <div class="logo">
            <a href="index.php"><img src="img/logo.png" alt="PlumBox" class="graphic_logo"></a>
        </div>
        <!-- Navigation bar -->
        <nav>
            <div class="navbar">
                <div class="navbar-left"><a href="cart.php"><img src="img/icon/cart.png" alt="cart"></a> <span
                            id="cart-widget"></span></div>
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
                        <p> | </p>
                        <a href="function/logout.php">Log Out</a>
                    <?php else : ?>
                        <a href="login.php">Sign In</a>
                        <p> | </p>
                        <a href="signup.php">Sign Up</a>
                    <?php endif; ?>
                </div>
            </div>
        </nav>
    </header>
    <main>
        <!--        Main cart       -->
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
                        <form method="POST" action="" class="">
                            <div class="form-item">
                                <input type="email" name="email" id="email" class="signup-input" required>
                                <div class="alert alert-danger" role="alert" id="alert_email"
                                     style="display: none;"></div>
                                <label for="email" class="signup-label">Email</label>

                                <div id="cards">
                                    <div id="front">
                                        <a target="_blank" href="#" id="bank-link"></a>
                                        <img src="js/libs/dist/brands-logos/maestro-colored.svg" alt="" id="brand-logo">
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
                                <pre id="instance"></pre>

                            </div>
                            <div class="checkbox">
                                <input type="checkbox" id="addr_stat" name="addr_stat" value="on"
                                       onclick="ShowHide(this)">
                                <label for="addr_stat">Delivery address?</label>
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
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-success" type="button">CHECKOUT</button>
                    </div>
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
</div>

<script src="js/cart.js"></script>
<script src="js/signup.js"></script>
</body>
</html>

