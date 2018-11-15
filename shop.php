<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>PlumBox</title>
	<!-- index.php style sheet -->
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link rel="stylesheet" type="text/css" href="css/shop.css">
	<!-- Include Raleway font -->
	<link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
	<!-- Include Bootstrap-icon pack for social -->
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="css/libs/bootstrap-grid.min.css">
	<link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
	<!-- Include jQuery lib -->
	<script type="text/javascript" src="js/libs/jquery-3.3.1.min.js"></script>
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
                    <a href="account.php">My Account</a>
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

	</main>
	
	<footer>
		<!-- Social -->
		<div class="icon-pack1">
        <ul>
            <li><a href="https://www.facebook.com"><i class="fab fa-facebook" aria-hidden="true"></i></a></li>
            <li><a href="https://www.google.com"><i class="fab fa-google-plus" aria-hidden="true"></i></a></li>
            <li><a href="https://www.instagram.com"><i class="fab fa-instagram" aria-hidden="true"></i></a></li>
            <li><a href="https://www.twitter.com"><i class="fab fa-twitter" aria-hidden="true"></i></a> </li>
            <li><a href="https://www.ru.linkedin.com"><i class="fab fa-vk" aria-hidden="true"></i></a> </li>
        </ul>
    	</div>
    	<!-- Copyright -->
    	<div id="rights">
    		<p>All rights reserved &copy; <?php echo date('Y'); ?> </p>
    	</div>
	</footer>
</body>
</html>

