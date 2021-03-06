var out = ''; //html output
var cart = {}; //mini-cart
var count = 0; //number of products

function randomProd(){
    //loading random slot
    for (var i=0;i<6;i++) {
        var id = Math.floor(Math.random() * (92 - 1 + 1)) + 1;
        $.getJSON({
            url: "function/core.php",
            data: {action: "randomProd", id: id},
            success: slotOut
        });
    }
}

function slotOut(data){
    //slot item output
    for (var id in data){
        out += '<div class="slot_item">';
        out += '<a href="catalog.php?product_id='+id+'"><img src="img/products/'+data[id].category+'/'+data[id].img+'" alt=""></a>';
        out += '<h4>'+data[id].name+'</h4>';
        out += '<p class="price">'+data[id].price+' &#8381</p>';
        out += "<div class='add_to_cart'><button class='button add-to-cart' data-id='"+id+"' data-img='"+data[id].category+"/"+data[id].img+"' data-name='"+data[id].name+"'>BUY</button></div>";
        out += '</div>';
        $('.slot').html(out);
    }
    $('.add-to-cart').on('click',addToCart);
}
//adding to local cart
function addToCart() {
    var id = $(this).attr('data-id');
    var name = $(this).attr('data-name');
    var img = $(this).attr('data-img');
    if(cart[id]===undefined){
        cart[id]={};
        cart[id]['name'] = name;
        cart[id]['img'] = img;
        cart[id]['num'] = 1;
        count ++;
    } else {
        cart[id]['num']++;
        count++;
    }
    saveMiniCart();
    if(count>0) {
        addWidget();
    }
}


function saveMiniCart(){
    //saving mini-cart
    localStorage.setItem('cart',JSON.stringify(cart));
    localStorage.setItem('count', count);
}

function loadMiniCart(){
    //local storage output |  saved mini-cart
    //check if cart defined
    if(localStorage.getItem('cart')){
        //show local storage mini-cart
        if(isJsonString(localStorage.getItem('cart'))){
            cart = JSON.parse(localStorage.getItem('cart'));
            count = localStorage.getItem('count');
            addWidget();
        }
    }
}

function addWidget() {
    //show number of products near the mini-cart icon
        $('#cart-widget').addClass('cart-widget').html(localStorage.getItem('count'));
}

function isJsonString(str) {
    //check if json string is a js object
    try{
        JSON.parse(str);
    } catch (e) {
        alert("Error"+e.name+":"+e.message+"\n"+e.stack);
        return false;
    }
    return true;
}

$(document).ready(function () {
    randomProd();
    loadMiniCart();
});