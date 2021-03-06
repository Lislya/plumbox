<!-- Connect to DB -->
<?php require_once('function/connect.php') ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PlumBox</title>
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
    <link href="bower_components/fotorama/fotorama.css" rel="stylesheet">

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
        <!-- grid setting -->
        <div class="container">
            <div class="row">
                <!-- left navbar of catalog || categories -->
                <div class="col-sm">
                    <ul class="catalog">
                        <li value="1">
                            <a class="catalog_item">
								<span class="icon">
									<img src="img/icon/laptop_icon.png" alt="">
								</span>
                                <span class="title">Laptops & Tablets</span>
                            </a>
                        </li>
                        <li value="2">
                            <a class="catalog_item">
								<span class="icon">
									<img src="img/icon/pc_icon.png" alt="">
								</span>
                                <span class="title">PC & Accessories</span>
                            </a>
                        </li>
                        <li value="3">
                            <a class="catalog_item">
								<span class="icon">
									<img src="img/icon/smartphone_icon.png" alt="">
								</span>
                                <span class="title">SmartPhones</span>
                            </a>
                        </li>
                        <li value="4">
                            <a class="catalog_item">
								<span class="icon">
									<img src="img/icon/tv_icon.png" alt="">
								</span>
                                <span class="title">TV & Media</span>
                            </a>
                        </li>
                        <li value="5">
                            <a class="catalog_item">
								<span class="icon">
									<img src="img/icon/game_icon.png" alt="">
								</span>
                                <span class="title">Game Consoles</span>
                            </a>
                        </li>
                        <li value="6">
                            <a class="catalog_item">
								<span class="icon">
									<img src="img/icon/camera_icon.png" alt="">
								</span>
                                <span class="title">Cameras</span>
                            </a>
                        </li>
                        <li value="7">
                            <a class="catalog_item">
								<span class="icon">
									<img src="img/icon/hardware_icon.png" alt="">
								</span>
                                <span class="title">Network Hardware</span>
                            </a>
                        </li>

                    </ul>
                </div>
                <div class="col-9">
                    <!-- shop slots \ ajax-method \ catalog.js file -->
                    <div class="slot_container">
                        <div class="slot">
                            <!-- SLOT ITEM EXAMPLE -->

                            <!-- <div class="slot_item">
                                <a href="#"><img src="img/products/media/48_1.jpg" alt=""></a>
                                <h3>Lorem ipsum dolor sit amet.</h3>
                                <p class="price">1000$</p>
                                <div class="add_to_cart"><button class="button">BUY</button></div>
                            </div> -->

                            <!--  INFROMATION ABOUT A PRODUCT -->
                            <?php
                            if (isset($_GET['product_id'])) {
                                $name = '';
                                $desc = '';
                                $price = 0;
                                $id_ctg = 0;
                                $vendor = 0;
                                $product_id = (int)$_GET['product_id'];
                                $sql = "SELECT * FROM product WHERE id_product='$product_id'";
                                if ($result_set = $connection->query($sql)) {
                                    $row = $result_set->fetch_assoc();
                                    $name = htmlspecialchars($row['name_product']);
                                    $desc = $row['description'];
                                    $price = $row['price_s'];
                                    $id_ctg = $row['id_category'];
                                    $vendor = $row['vendor_code'];
                                    $img = array();
                                }
                                $result_set->free();
                                $sql = "SELECT name_ctg FROM category WHERE id_category='$id_ctg'";
                                if ($result_set = $connection->query($sql)) {
                                    $row = $result_set->fetch_assoc();
                                    $ctg = $row['name_ctg'];
                                }
                                $result_set->free();
                                $sql = "SELECT id_img FROM product_img WHERE id_product='$product_id'";
                                if ($result_set = $connection->query($sql)) {
                                    while ($row = $result_set->fetch_assoc()) {
                                        $id_img = $row['id_img'];
                                        $sql = "SELECT name_img FROM image WHERE id_img=" . "$id_img";
                                        if ($result_set1 = $connection->query($sql)) {
                                            while ($rows = $result_set1->fetch_assoc()) {
                                                $img[] = $rows['name_img'];
                                            }
                                        }
                                        $result_set1->free();
                                    }
                                }
                                $result_set->free();
                                echo
                                    '<div class="col-5">
							    <h2>' . $name . '</h2>
							    <div class="fotorama">
  								    <img src="img/products/' . $ctg . '/' . $img[0] . '">
  								    <img src="img/products/' . $ctg . '/' . $img[1] . '">
  								    <img src="img/products/' . $ctg . '/' . $img[2] . '">
							    </div>
						    </div>';
                                echo
                                    '<div class="col-7">
							<h3>Description:</h3>
							<p>' . $desc . '</p>
							<p class="price">Vendor Code: ' . $vendor . '</p>
							<p class="price">Price: ' . $price . ' &#8381</p>
							<div class="add_to_cart"><button  class="button add-to-cart" data-id="' . $product_id . '" 
							    data-img="' . $ctg . '/' . $img[0] . '" 
							    data-name="' . $name . '">BUY</button></div>
						    </div>';
                            }
                            $connection->close();
                            ?>
                        </div>
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
<script type="text/javascript" src="js/catalog.js"></script>
<script src="bower_components/fotorama/fotorama.js"></script>

</body>
</html>

