var mainCart; //Main cart on cart.php

function isJsonString(str) {
    //check if json string is a js object
    try{
        JSON.parse(str);
    } catch (e) {
        alert("Error"+e.name+":"+e.message);
        return false;
    }
    return true;
}

function showCart(data) {
    //html output of the Main cart
    if(data){
        var out = '';
        if (isJsonString(data)){
            var cart = JSON.parse(data);
        }
        for (var id in cart){
            out += '<p>Name: '+cart[id].name+'</p>';
            out += '<img src="img/products/' + cart[id].img + '">';
            out += '<p>Num: ' + cart[id].num + '</p>';
            out += '<p>Price: ' + cart[id].price + '</p>';

        }
        $('.cart').html(out);
    }
}

function loadCart(){
    //load info about Cart
    if (localStorage.getItem('cart')){
        if (isJsonString(localStorage.getItem('cart'))){
            var json = localStorage.getItem('cart');
            $.ajax({
                type: "POST",
                url: "function/core.php",
                data: {action: "loadCart", json : json},
                success: showCart
            });
        }
    } else{
        var out='';
        out += '<div class="alert alert-danger" role="alert">Cart is empty</div>';
        $('.cart').html(out);
    }
}


$(document).ready(function () {
    loadCart();
});