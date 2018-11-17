<!-- Регистрация пользователя -->
<?php require 'function/reg.php' ?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Sign Up</title>
	<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link rel="stylesheet" type="text/css" href="css/signup.css">
	<link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
          integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
	<link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
	<script src="bower_components/jquery/dist/jquery.min.js"></script>
</head>
<body>

    <!-- Шапка -->
	<header>
		<div class="logo">
			<a href="index.php"><img src="img/logo.png" alt="PlumBox" class="graphic_logo"></a>
		</div>
	</header>
	<!-- Основной контент -->
	<main>
		<!-- Форма регистрации -->
		<form action="" method="POST" class="form-signup">
            <?php if(isset($smsg)){?> <div class="alert alert-success" role="alert"><?php echo $smsg; ?> </div><?php }?>
            <?php if(isset($fmsg)){?> <div class="alert alert-danger" role="alert"><?php echo $fmsg; ?> </div><?php }?>
			<div class="blank">
			<h1>Registration. Fill the blanks.</h1>
			</div>
			<div class="form-container">
				<div class="form-item">
					<input type="text" name="name" id="name" class="signup-input" required>
					<label for="name" class="signup-label">Name</label>
				</div>
				<div class="form-item">
					<input type="text" name="s_name" id="s_name" class="signup-input" required>
					<label for="s_name" class="signup-label">Surname</label>
				</div>
				<div class="form-item">
					<input type="text" name="username" id="username" class="signup-input" required>
					<div class="alert alert-danger" id="alert_username" role="alert" style="display: none;"></div>
					<label for="username" class="signup-label">Username</label>
				</div>

				<div class="form-item">
					<input type="email" name="email" id="email" class="signup-input" required>
					<div class="alert alert-danger" role="alert" id="alert_email" style="display: none;"></div>
					<label for="email" class="signup-label">Email</label>
				</div>
				<div class="form-item">
					<input type="tel" name="tel" id="tel" class="signup-input" placeholder="Phonenumber">
				</div>
				<div class="form-item">
					<input type="date" name="d_birth" id="d_birth" class="signup-input" required>
				</div>
				<div class="form-item">
					<input type="password" name="password" id="password" class="signup-input" required>
					<label for="password" class="signup-label">Password</label>
				</div>
				<div class="form-item">
					<input type="password" name="repassword" id="repassword" class="signup-input" required>
					<div class="alert alert-danger" id="alert_password" role="alert" style="display: none;"></div>
					<label for="repassword" class="signup-label">Re-enter password</label>
				</div>
				<div class="checkbox">
					<label for="checkbox">Delivery Address?</label>
					<input type="checkbox" name="addr_stat" id="addr_stat" value="on" onchange="ShowHide(this);">
				</div>
				<div class="addr_input" id="addr_input">
					<div class="form-item_addr">
						<input type="text" name="region" id="region" class="signup-input" placeholder="Region">
					</div>
					<div class="form-item_addr">
						<input type="text" name="city" id="city" class="signup-input" placeholder="City">
					</div>
					<div class="form-item_addr">
						<input type="text" name="street" id="street" class="signup-input" placeholder="Street">
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
						<input type="text" name="post_index" id="post_index" class="signup-input" placeholder="Post Index">
					</div>
				</div>
						<input type="submit" value="SIGN UP" class="button-signup">
			</div>
		</form>
		
		<div class="space"></div>

	</main>

	<footer>	
		<div class="icon-pack1">
        <ul>
            <li><a href="https://www.facebook.com"><i class="fab fa-facebook" aria-hidden="true"></i></a></li>
            <li><a href="https://www.google.com"><i class="fab fa-google-plus" aria-hidden="true"></i></a></li>
            <li><a href="https://www.instagram.com"><i class="fab fa-instagram" aria-hidden="true"></i></a></li>
            <li><a href="https://www.twitter.com"><i class="fab fa-twitter" aria-hidden="true"></i></a> </li>
            <li><a href="https://www.vk.com"><i class="fab fa-vk" aria-hidden="true"></i></a> </li>
        </ul>
    	</div>
    	<div id="rights">
    		<p>All rights reserved &copy; <?php echo date('Y'); ?> </p>
    	</div>
	</footer>
	<script type="text/javascript" src="js/signup.js"></script>
</body>
</html>