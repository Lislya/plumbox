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
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/libs/bootstrap-grid.min.css">
	<link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
	<!-- Include jQuery lib -->
	<script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
</head>
<body>
	<!-- Connect to DB -->
    <?php require ('function/connect.php') ?>
	<header>
		<div class="logo">
			<a href="index.php"><img src="img/logo.png" alt="PlumBox" class="graphic_logo"></a>
		</div>
		<!-- Navigation bar -->
		<nav>
			<div class="navbar">
				<div class="navbar-left"><a href="#"><img src="img/icon/cart.png" alt="cart"></a></div>
				<div class="navbar-center">
					<a href="index.php">HOME</a>
					<a href="catalog.php">CATALOG</a>
					<a href="shop.php">SHOPS</a>
					<a href="offer.php">SPECIAL OFFERS</a>
					<a href="about.php">ABOUT US</a>
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
		<!-- grid setting -->
		<div class="container">
			<div class="row">
				<!-- right navbar of catalog -->
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
									<img src="img/icon/hardware_icon.png" alt="" >
								</span>
								<span class="title">Network Hardware</span>
							</a>
						</li>

					</ul>
				</div>
				<div class="col-9">
		<!-- shop slots \ ajax-method -->
					<div class="slot_container">
						<div class="slot">
                            <!-- SLOT ITEM EXAMPLE -->

						<!-- <div class="slot_item">
							<a href="#"><img src="img/products/media/48_1.jpg" alt=""></a>
							<h3>Lorem ipsum dolor sit amet.</h3>
							<p class="price">1000$</p>
							<div class="add_to_cart"><button class="button">BUY</button></div>
						</div> -->

                            <?php echo $_GET['product_id'] ?>

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
	<script type="text/javascript" src="js/catalog.js"></script>
</body>
</html>

