var cart = {}; //Main cart on cart.php
var count = 0; //Number of products

$(function () {
    //Credit Card Widget
    var $front = $('#front'); // front side of the CC
    var $bankLink = $('#bank-link'); // backside of the CC
    var $brandLogo = $('#brand-logo'); //logo of payment system | VISA, MASTERCARD
    var $number = $('#number'); // CC number
    var $code = $('#code'); // CVV|CVC
    $number.on('keyup change paste', function () {
        var cardInfo = new CardInfo($number.val()); //CardInfo Object
        if (cardInfo.bankUrl) {
            $bankLink
                .attr('href', cardInfo.bankUrl)
                .css('backgroundImage', 'url("' + cardInfo.bankLogo + '")')
                .show();
        } else {
            $bankLink.hide();
        }
        $front
            .css('background', cardInfo.backgroundGradient)
            .css('color', cardInfo.textColor);
        $code.attr('placeholder', cardInfo.codeName ? cardInfo.codeName : '');
        $number.mask(cardInfo.numberMask);
        if (cardInfo.brandLogo) {
            $brandLogo
                .attr('src', cardInfo.brandLogo)
                .attr('alt', cardInfo.brandName)
                .show();
        } else {
            $brandLogo.hide();
        }
    }).trigger('keyup');
});

function loadCart() {
    //load info about Cart
    if (localStorage.getItem('cart')) {
        if (isJsonString(localStorage.getItem('cart'))) {
            var json = localStorage.getItem('cart');
            count = localStorage.getItem('count');
            $.ajax({
                type: "POST",
                url: "function/core.php",
                data: {action: "loadCart", json: json},
                success: showCart
            });
        }
    } else {
        var out = '';
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
            $('#cart-widget').css('display', 'none');
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
                    for (let id in cart) {
                        let sum = 0;
                        out += ' <div class="col-1"> <button data-id="' + id + '" class="button remove-btn">&times;</button></div>';
                        out += '<div class="col-2"><img src="img/products/' + cart[id].img + '"></div>';
                        out += '<div class="col-3"><p>' + cart[id].name + '</p></div>';
                        out += '<div class="col-2"><p>' + cart[id].price + ' &#8381</p></div>';
                        out += '<div class="col-2"><p>' + cart[id].num + '</p></div>';
                        out += '<div class="col-2">\n' +
                            '            <button data-id="' + id + '" class="button minus-btn">-</button>\n' +
                            '            <button data-id="' + id + '" class="button plus-btn">+</button>\n' +
                            '        </div>';
                        sum = cart[id].num * cart[id].price;
                        cartSum += sum;
                    }
                    if (sessionUser === '') {
                        //if user is not logged in then show buy button
                        out += ' <button class="buy-btn book-btn btn-outline-success btn-lg" type="button" data-toggle="modal" data-target="#order">BUY</button>  ';
                    } else {
                        //if user is  logged in then show book button
                        out += ' <button class="book-btn btn-outline-success btn-lg ">BOOK</button>';
                    }
                    out += '<div class="cart-sum alert alert-dark alert-link" ">\n' +
                        '        <span class="spincrement"></span><span> ₽</span>\n' +
                        '         </div>';
                    $('.cart').html(out);
                    $('#cart-widget').addClass('cart-widget').html(count);
                    $('.remove-btn').on('click', delProd); //delete product num
                    $('.plus-btn').on('click', plusProd); // iterate product num
                    $('.minus-btn').on('click', minusProd); //decrease product num
                    $('.buy-btn').on('click', showPopup); // show instant order checkout window
                    $('.book-btn').on('click',bookProd); //book products
                    $(".spincrement").spincrement({
                        from: 0,                // Стартовое число
                        to: cartSum,            // Итоговое число. Если false, то число будет браться из элемента с классом spincrement, также сюда можно напрямую прописать число. При этом оно может быть, как целым, так и с плавающей запятой
                        decimalPlaces: 0,       // Сколько знаков оставлять после запятой
                        decimalPoint: ".",      // Разделитель десятичной части числа
                        thousandSeparator: " ", // Разделитель тыcячных
                        duration: 1000          // Продолжительность анимации в миллисекундах
                    });
                }
            });
        }
    }
}

function delProd() {
    //delete product from the Main Cart
    var id = $(this).attr('data-id');
    count -= cart[id].num;
    delete cart[id];
    saveToCart();
    showCart(localStorage.getItem('cart'));
}

function plusProd() {
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
    if (cart[id].num === 1) {
        delete cart[id];
        count--;
    }
    else {
        cart[id].num--;
        count--;
    }
    saveToCart();
    showCart(localStorage.getItem('cart'));
}

function showPopup() {
    //show Pop-Up Window for not logged user
    $('#order').modal();
    //Fill select section with shops information
    $.post({
        url: "function/core.php",
        data: {action: "getShop"},
        success: function (response) {
            let shopName= JSON.parse(response);
            let out = '';
            for (let i=0;i<shopName.length;i++){
                out += '<option value="'+i+'">'+shopName[i]+'</option>';
            }
            $('#pickup').html(out);
        }
    });
}

function bookProd() {
    
}

function saveToCart() {
    //saving cart to the local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('count', count);
}

function isJsonString(str) {
    //check if json string is a js object
    try {
        JSON.parse(str);
    } catch (e) {
        alert("Error" + e.name + ":" + e.message);
        return false;
    }
    return true;
}

function isEmpty(object) {
    //check if object is empty
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            return true;
        }
    }
    return false;
}


$(document).ready(function () {
    loadCart();
});