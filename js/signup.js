//Показывает дополнительные поля ввода при регистрации
function ShowHide(addr_stat){
	var addr_input = document.getElementById('addr_input');
	var pickup = document.getElementById('pickup');
	if (addr_stat.checked)
	{
		if(pickup) {
            pickup.style.display = "none";
        }
		addr_input.style.display = "flex";
	} else {
		addr_input.style.display = "none";
		if (pickup){
            pickup.style.display = "block";
		}
    }
}

//Dynamic username validation
$("#username").change(function(){
	var username = $(this).val();
	var mask = /^[a-zA-Z][a-zA-Z0-9-_\.]{3,20}$/g;
	var resUsername = username.search(mask);
	if (resUsername === -1){
		$("#alert_username").hide().text("Incorrect username").css("display","block");
        $('.button-signup').attr('disabled','disabled');
	} else{
		$.ajax({
			url: "function/regCheck.php",
			type: "POST",
			data: ({username: username}),
			dataType: "text",
			success: function(response){
				if(response==0){
					$("#alert_username").hide().text("This username is already taken").css("display","block");
					$('.button-signup').attr('disabled','disabled');
				} else{
					$('.button-signup').removeAttr('disabled');
				}
			}
		});
	}
	if (username==''){
	$("#alert_username").hide().text("");
	}
});
$("#username").keyup(function(){
	$("#alert_username").hide().text("");
});

// Dynamic email validation
$("#email").change(function(){
	var email = $(this).val();
	var mask = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/g;
	var resEmail = email.search(mask);
	if (resEmail === -1){
		$("#alert_email").hide().text("Incorrect mail").css("display","block");
		$("#checkAlert").hide().text("Incorrect mail").css("display","block"); //for cart.php
        $('.button-signup').attr('disabled','disabled');
	} else{
		$.ajax({
			url: "function/regCheck.php",
			type: "POST",
			data: "email="+email,
			success: function(response){
				if (response==0){
					$("#alert_email").hide().text("This email is already taken").css("display","block");
					$('.button-signup').attr('disabled','disabled');
				} else{
					$('.button-signup').removeAttr('disabled');
				}
			}
		})
	}
	if (email==''){
	$("#alert_email").hide().text("");
	$("#checkAlert").hide().text("");
	}
});
$("#email").keyup(function(){
	$("#alert_email").hide().text("");
	$("#checkAlert").hide().text("");
});

//Password and repass checking
$('#password').keyup(function () {
    let pattern = /^[a-zA-Z0-9_][a-zA-Z0-9-_\.]{5,20}$/g;
    let pass = $(this).val();
    let resPass = pass.search(pattern);
    if (resPass === -1){
        $('#alert_password').text('Password minimal length is 6 with no special chars').css('display','block');
        $('.button-signup').attr('disabled','disabled');
    } else{
        $('#alert_password').text("").hide();
        $('.button-signup').removeAttr('disabled');

    }
    if(pass===''){
        $('#alert_password').text('').hide();
        $('.button-signup').removeAttr('disabled');
    }
});

$("#repassword").keyup(function(){
	var pass = $("#password").val();
	var repass = $(this).val();
	if (pass!=repass)
	{
		$("#alert_repassword").text("Passwords do not match").css('display','block');
		$('.button-signup').attr('disabled','disabled');
	} else{
		$('.button-signup').removeAttr('disabled');
		$('#alert_repassword').text("").hide();
	}
});