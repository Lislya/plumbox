var cart = {}; //Main cart on cart.php
var count = 0;

function loadCart(){
    //load info about Cart
    if (localStorage.getItem('cart')){
        if (isJsonString(localStorage.getItem('cart'))){
            var json = localStorage.getItem('cart');
            count = localStorage.getItem('count');
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


function showCart(data) {
    //html output of the Main cart
    var out = '';
    count = localStorage.getItem('count');
        if (data) {
            if (isJsonString(data)) {
                cart = JSON.parse(data);
            }
            if (!isEmpty(cart)) {
                //check if cart object is empty
                out += '<div class="alert alert-danger" role="alert">Cart is empty</div>';
                $('.cart').html(out);
                $('#cart-widget').hide();
                localStorage.clear();
            } else {
                //get $_SESSION['username'] value
                $.ajax({
                    type: "POST",
                    url: "function/core.php",
                    data: {action: "getSession"},
                    success: function (response) {
                        var sessionUser = response;
                        var cartSum = 0;
                        for (var id in cart) {
                            var sum = 0;
                            out += ' <div class="col-1"> <button data-id="' + id + '" class="button remove-btn">&times;</button></div>';
                            out += '<div class="col-2"><img src="img/products/' + cart[id].img + '"></div>';
                            out += '<div class="col-3"><p>' + cart[id].name + '</p></div>';
                            out += '<div class="col-2"><p>' + cart[id].price + ' &#8381</p></div>';
                            out += '<div class="col-2"><p>' + cart[id].num + '</p></div>';
                            out += '<div class="col-2">\n' +
                                '            <button data-id="'+id+'" class="button minus-btn">-</button>\n' +
                                '            <button data-id="'+id+'" class="button plus-btn">+</button>\n' +
                                '        </div>';
                            sum = cart[id].num * cart[id].price;
                            cartSum += sum;
                        }
                        if (sessionUser === ''){
                            out += ' <div class="buy-btn book-btn btn-outline-success btn-lg" role="button">BUY</div>';
                        } else {
                            out += ' <div class="book-btn btn-outline-success btn-lg " role="button">BOOK</div>';
                        }
                        out += '<div class="cart-sum alert alert-dark alert-link" ">\n' +
                            '        <span class="spincrement">'+cartSum+'</span><span> &#8381</span>\n' +
                            '         </div>';
                        $('.cart').html(out);
                        $('#cart-widget').addClass('cart-widget').html(count);
                        $('.remove-btn').on('click', delProd);
                        $('.plus-btn').on('click',plusProd);
                        $('.minus-btn').on('click',minusProd);
                        $(".spincrement").spincrement({
                            from: 0,                // Стартовое число
                            to: cartSum,              // Итоговое число. Если false, то число будет браться из элемента с классом spincrement, также сюда можно напрямую прописать число. При этом оно может быть, как целым, так и с плавающей запятой
                            decimalPlaces: 1,       // Сколько знаков оставлять после запятой
                            decimalPoint: ".",      // Разделитель десятичной части числа
                            thousandSeparator: " ", // Разделитель тыcячных
                            duration: 1000         // Продолжительность анимации в миллисекундах
                        });
                    }
                });
            }
        }
}

function delProd(){
    //delete product from the Main Cart
    var id = $(this).attr('data-id');
    count -= cart[id].num;
    delete cart[id];
    saveToCart();
    showCart(localStorage.getItem('cart'));
}
function plusProd(){
    //increment product in the Main Cart
    var id = $(this).attr('data-id');
    cart[id].num++;
    count++;
    saveToCart();
    showCart(localStorage.getItem('cart'));
}
function minusProd() {
    //decrement product in the Main Cart
    var id = $(this).attr('data-id');
    if (cart[id].num === 1){
        delete cart[id];
        count--;
    }
     else{
        cart[id].num--;
        count--;
    }
    saveToCart();
    showCart(localStorage.getItem('cart'));
}

function  saveToCart() {
    //saving cart to the local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('count',count);
}

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
    //check if object is empty
    for (var key in object)
        if (object.hasOwnProperty(key)) return true;
    return false;
}


$(document).ready(function () {
    loadCart();
});