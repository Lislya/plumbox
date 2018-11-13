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

function isEmpty(object) {
    for (var key in object)
        if (object.hasOwnProperty(key)) return true;
    return false;
}

function showCart(data) {
    //html output of the Main cart
    if (isEmpty(mainCart)){
        var out='';
        out += '<div class="alert alert-danger" role="alert">Cart is empty</div>';
        $('.cart').html(out);
    } else {
        if (data) {
            var out = '';
            if (isJsonString(data)) {
                mainCart = JSON.parse(data);
            }
            for (var id in mainCart) {
                out += '<p>Name: ' + mainCart[id].name + '</p>';
                out += '<img src="img/products/' + mainCart[id].img + '">';
                out += '<p>Num: ' + mainCart[id].num + '</p>';
                out += '<p>Price: ' + mainCart[id].price + '</p>';
            }
            $('.cart').html(out);
        }
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