<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>PlumBox</title>
	<!-- index.php style sheet -->
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<!-- Include Raleway font -->
	<link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
	<!-- Include Bootstrap-icon pack for social -->
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
	<link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
	<!-- Include jQuery lib -->
	<script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
	<link  href="http://cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.4/fotorama.css" rel="stylesheet">
</head>
<body>
	<!-- Connect to DB -->
    <?php require ('function/connect.php');?>
	<header>
		<div class="logo">
			<a href="index.php"><img src="img/logo.png" alt="PlumBox" class="graphic_logo"></a>
		</div>
		<!-- Navigation bar -->
		<nav>
			<div class="navbar">
				<div class="navbar-left"><a href="cart.php"><img src="img/icon/cart.png" alt="cart"></a></div>
				<div class="navbar-center">
					<a href="index.php">HOME</a>
					<a href="catalog.php">CATALOG</a>
					<a href="shop.html">SHOPS</a>
					<a href="offer.html">SPECIAL OFFERS</a>
					<a href="about.html">ABOUT US</a>
				</div>
				<div class="navbar-right">
                    <?php if(isset($_SESSION['username'])) : ?>
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
		<!-- Ad Slider -->
		<div class="fotorama">
			<img src="img/products/slider/bg.jpg">
			<img src="img/products/slider/bg_1.jpg">
			<img src="img/products/slider/bg_2.jpg">
			<img src="img/products/slider/bg_3.jpg">
			<img src="img/products/slider/bg_4.jpg">
		</div>
		<!-- shop slots * 6 -->
		<div class="slot_container">
			<div class="slot">
				<div class="slot_item">
					<a href="catalog.php?product_id=14"><img src="img/products/pc/14_1.jpg" alt=""></a>
					<h3>Lorem ipsum dolor sit amet.</h3>
					<p class="price">1000$</p>
					<div class="add_to_cart"><button class="button">BUY</button></div>
				</div>
				<div class="slot_item">
					<a href="catalog.php?product_id=31"><img src="img/products/smartphone/31_1.jpg" alt=""></a>
					<h3>Lorem ipsum dolor sit amet.</h3>
					<p class="price">1000$</p>
					<div class="add_to_cart"><button class="button">BUY</button></div>
				</div>
				<div class="slot_item">
					<a href="catalog.php?product_id=1"><img src="img/products/laptop/1_1.jpg" alt=""></a>
					<h3>Lorem ipsum dolor sit amet.</h3>
					<p class="price">1000$</p>
					<div class="add_to_cart"><button class="button">BUY</button></div>
				</div>
				<div class="slot_item">
					<a href="catalog.php?product_id=61"><img src="img/products/game/61_1.jpg" alt=""></a>
					<h3>Lorem ipsum dolor sit amet.</h3>
					<p class="price">1000$</p>
					<div class="add_to_cart"><button class="button">BUY</button></div>
				</div>
				<div class="slot_item">
					<a href="catalog.php?product_id=3"><img src="img/products/laptop/3_1.jpg" alt=""></a>
					<h3>Lorem ipsum dolor sit amet.</h3>
					<p class="price">1000$</p>
					<div class="add_to_cart"><button class="button">BUY</button></div>
				</div>
				<div class="slot_item">
					<a href="catalog.php?product_id=42"><img src="img/products/media/42_1.jpg" alt=""></a>
					<h3>Lorem ipsum dolor sit amet.</h3>
					<p class="price">1000$</p>
					<div class="add_to_cart"><button class="button">BUY</button></div>
				</div>
			
			</div>
		</div>
	</main>
	
	<footer>
		<!-- Social -->
		<div class="icon-pack1">
        <ul>
            <li><a href="https://www.facebook.com"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
            <li><a href="https://www.google.com"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li>
            <li><a href="https://www.instagram.com"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
            <li><a href="https://www.twitter.com"><i class="fa fa-twitter" aria-hidden="true"></i></a> </li>  
             <li><a href="https://www.ru.linkedin.com"><i class="fa fa-linkedin" aria-hidden="true"></i></a> </li>  
        </ul>
        </ul>
    	</div>
    	<!-- Copyright -->
    	<div id="rights">
    		<p>All rights reserved &copy; <?php echo date('Y'); ?> </p>
    	</div>
	</footer>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.4/fotorama.js"></script>
</body>
</html>

