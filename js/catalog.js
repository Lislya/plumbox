var cart = {}; // cart object
var count = 0;

function prodOut(data) {
	//CATEGORY PRODUCT OUTPUT
	// var prod = JSON.parse(data);
	// console.log(prod);
	var out='';
	//key = vendor code
	for (var key in data) {
		out += '<div class="slot_item">';
		out += '<a href="catalog.php?product_id='+data[key].id+'"><img src="img/products/'+data[key].category+'/'+data[key].img+'" alt=""></a>';
		out += '<h4>'+data[key].name+'</h4>';
		out += '<p class="price">'+data[key].price+' &#8381</p>';
        out += "<div class='add_to_cart'><button class='button add-to-cart' data-id='"+data[key].id+"' data-img='"+data[key].category+"/"+data[key].img+"' data-name='"+data[key].name+"'>BUY</button></div>";
		out += '</div>';
	}
	$('.slot').html(out);
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
		count++;
	} else {
		cart[id]['num']++;
        count++;
	}
	saveMiniCart();
    if (count>0){
        addWidget();
    }
}

function saveMiniCart(){
	//saving mini-cart
	localStorage.setItem('cart',JSON.stringify(cart));
	localStorage.setItem('count',count);
}

function addWidget(){
	$('#cart-widget').addClass('cart-widget').html(localStorage.getItem('count'));
}

function loadMiniCart(){
	//local storage output |  saved mini-cart
	//check if cart defined
	if(localStorage.getItem('cart')){
		//show local storage mini-cart
		if(isJsonString(localStorage.getItem('cart'))){
			cart = JSON.parse(localStorage.getItem('cart'));
			count = localStorage.getItem('count');
			if(count>0) {
                addWidget();
            }
		}
	}
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

function init(cat){
	//Request JSON-file
	$.getJSON({
		url: "function/core.php",
		data: {action: 'category',category: cat},
		success: prodOut
	});
}

$(document).ready(function(){
	$('li').click(function(){
		var category = $(this).val();
		if(category)
		{
			init(category);
		}
	});
	loadMiniCart();
});
