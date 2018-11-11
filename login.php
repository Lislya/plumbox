<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Sign In</title>
	 <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link rel="stylesheet" type="text/css" href="css/login.css">
	<link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
	<link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
</head>
<body>
	<header>
		<div class="logo">
			<a href="index.php"><img src="img/logo.png" alt="PlumBox" class="graphic_logo"></a>
		</div>
		<nav>
			<div class="navbar">
				<div class="navbar-left"></div>
				<div class="navbar-center">
					<a href="index.php">HOME</a>
					<a href="catalog.php">CATALOG</a>
					<a href="shop.php">SHOPS</a>
					<a href="offer.php">SPECIAL OFFERS</a>
					<a href="about.php">ABOUT US</a>
				</div>
				<div class="navbar-right">
					<!-- <a href="#">Sign In</a> -->
					<a href="signup.php">Sign Up</a>
				</div>
			</div>	
		</nav>
	</header>
	<main>
        <?php
        require ('function/testreg.php');
        ?>
		<form action="" method="POST" class="form">

            <div class="blank">
                <h1>Sign in</h1>
            </div>
            <?php if(isset($smsg)){?> <div class="alert alert-success" role="alert"><?php echo $smsg; ?> </div><?php }?>
            <?php if(isset($fmsg)){?> <div class="alert alert-danger" role="alert"><?php echo $fmsg; ?> </div><?php }?>
			<div class="input-container">
				<input type="text" name="username" id="username" class="login_input" required>
				<label for="login" class="label">Login</label>
			</div>
			<div class="input-container">
				<input type="password" name="password" id="password" class="login_input" required>
				<label for="password" class="label">Password</label>
			</div>
			<input type="submit" value="Sign In" class="button btn-login">
		</form>
	</main>
	
	<footer>	
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
    	<div id="rights">
    		<p>All rights reserved &copy; <?php echo date('Y'); ?> </p>
    	</div>
	</footer>

</body>
</html>

