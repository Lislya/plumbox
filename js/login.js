$(document).ready(function () {
    if (localStorage.getItem('count')>0) {
        $('#cart-widget').addClass('cart-widget').html(localStorage.getItem('count'));
    } else{
        $('#cart-widget').removeClass('cart-widget');
    }
})