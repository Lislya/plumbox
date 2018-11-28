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
                    out += '<div class="bottombar-cart">';
                    out += '<div class="col-3 promo"><label for="promocode" class="promocode">Promocode: </label>' +
                        '<input type="text" name="promocode" id="promocode" class="signup-input">' +
                        '<div class="alert" id="alert-promo" style="display: none;" role="alert"></div></div>';
                    if (sessionUser === '') {
                        //if user is not logged in then show buy button
                        out += ' <button class="buy-btn book-btn btn-outline-success btn-lg"' +
                            ' id="btn-buy" type="button" data-toggle="modal" data-target="#order">BUY</button>  ';
                    } else {
                        //if user is  logged in then show book button
                        out += '<div class="buy-book-btn">';
                        out += ' <button class="book-btn btn-outline-success btn-lg "id="btn-book">BOOK</button>';
                        out += ' <button class="buy-btn book-btn btn-outline-success btn-lg"' +
                            ' id="btn-buy" type="button" data-toggle="modal" data-target="#order">BUY</button>  ';
                        out += '</div>';
                    }
                    out += '<div class="cart-sum alert alert-dark alert-link" ">\n' +
                        '        <span class="spincrement" data-cartSum="' + cartSum + '""></span><span> ₽</span>\n' +
                        '         </div>';
                    out += '</div>';

                    $('.cart').html(out);
                    $('#cart-widget').addClass('cart-widget').html(count);
                    $('.remove-btn').on('click', delProd); //delete product num
                    $('.plus-btn').on('click', plusProd); // iterate product num
                    $('.minus-btn').on('click', minusProd); //decrease product num
                    $('#btn-buy').on('click', showPopup); // show instant order checkout window
                    $('#btn-book').on('click', bookProd); //book products
                    $('#checkout-btn').on('click', checkOut);
                    $(".spincrement").spincrement({
                        from: 0,                // Стартовое число
                        to: cartSum,            // Итоговое число. Если false, то число будет браться из элемента с классом spincrement, также сюда можно напрямую прописать число. При этом оно может быть, как целым, так и с плавающей запятой
                        decimalPlaces: 0,       // Сколько знаков оставлять после запятой
                        decimalPoint: ".",      // Разделитель десятичной части числа
                        thousandSeparator: " ", // Разделитель тыcячных
                        duration: 1000          // Продолжительность анимации в миллисекундах
                    });
                    promoCheck();
                    quantityCheck();
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
            let shopName = JSON.parse(response);
            let out = '';
            for (let id in shopName) {
                out += '<option value="' + id + '">' + shopName[id].name + '</option>';
            }
            $('#pickup').html(out);
        }
    });
}

function cartReset(elem) {
    //reset cart after order is booked/bought
    $(elem).hide();
    localStorage.clear();
    location.reload();
}

function quantityCheck() {
    //check product quantity
    let order = {};
    for (let id in cart) {
        order[id] = {};
        order[id].prod_id = parseInt(id);
        order[id].num = cart[id].num;
    }
    order = JSON.stringify(order);
    console.log(order);
    $.ajax({
        url: "function/core.php",
        type: "POST",
        data: {action: "quantityCheck", order: order},
        success: function (response) {
            if (response == 1) {
                let out = 'Unfortunately, there is no such quantity of products';
                out += '<button class="close" type="button" data-dismiss="modal">×</button>';
                $('#bookProd').html(out)
                    .css('display', 'block').css('background-color','#f8d7da')
                    .css('color','#721c24').modal().css('z-index','1050');
            } else{
                $('#bookProd').html('').hide();
            }
        }
    });
}

function bookProd() {
    //product booking
    let order = {};
    for (let id in cart) {
        order[id] = {}; //product id as an object
        order[id].prod_id = parseInt(id);
        order[id].num = cart[id].num; //product num
    }
    order.discount = $('#promocode').val(); //order promocode
    $.post({
        url: "function/core.php",
        data: {action: "getSession"},
        success: function (response) {
            order.uid = response; //get user id
            order = JSON.stringify(order); //json file for server
            $.post({
                url: "function/core.php",
                data: {action: "bookProd", order: order},
                success: function (e) {
                    let out = '';
                    if (e == 1) {
                        out = 'Your order was booked successfully. You can manage it in your Order List';
                        $('#bookProd').html(out).css('display', 'block');
                        setTimeout(cartReset, 5000, '#bookProd');
                    } else {
                        out = 'Booking failed! Something went wrong. Try again!';
                        $('#bookProd').html(out).css('display', 'block');
                        setTimeout(cartReset, 5000, '#bookProd');
                    }
                }
            });
        }
    });

}

function checkOut() {
    //checkout function for all users
    $('#checkout-form').submit(function (e) {
        e.preventDefault();

        let order = {};
        for (let id in cart) {
            order[id] = {};
            order[id].prod_id = parseInt(id);
            order[id].num = cart[id].num = cart[id].num;
        }
        order.discount = $('#promocode').val();
        if ($('#email').val() !== '') {
            order.email = $('#email').val();
            let addr_stat = document.getElementById('addr_stat');
            if (addr_stat.checked) {
                order.addr_stat = true;
                order.region = $('#region').val();
                order.city = $('#city').val();
                order.street = $('#street').val();
                order.house = $('#house').val();
                order.corp = $('#corp').val();
                order.flat = $('#flat').val();
                order.post_index = $('#post_index').val();
            } else {
                order.addr_stat = false;
                order.selfpickup = $('#pickup').val();
            }
            order = JSON.stringify(order);
            $.post({
                url: "function/core.php",
                data: {action: "checkOut", order: order},
                success: function (e) {
                    if (e == 1) {
                        out = 'Your order is processed! Check your email (' + $("#email").val() + ') for more information';
                        $('#checkAlert').html(out).css('display', 'block').removeClass('alert-danger').addClass('alert-success');
                        setTimeout(cartReset, 5000, '#checkAlert');
                    }
                }
            });
        }
    });
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

function promoCheck() {
    $('#promocode').change(function () {
        let promo = $(this).val();
        $.ajax({
            url: "function/core.php",
            data: {action: 'promoCheck', promo: promo},
            success: function (response) {
                if (response == 0) {
                    $('#alert-promo').html('×').css('display', 'block').addClass('alert-danger').removeClass('alert-success');
                    //reset cart if promo doesn't exist
                    setTimeout(loadCart, 1000);
                } else {
                    $('#alert-promo').html(response * 100 + '%').css('display', 'block').addClass('alert-success').removeClass('alert-danger')
                        .on('click', function () {
                            //count new sum with discount
                            let cartSum = Math.ceil($('.spincrement').attr('data-CartSum') * (1 - response));
                            $('.spincrement').html(cartSum);
                        });
                }
            }
        });
    });
}

$(document).ready(function () {
    loadCart();
});