var cart = {}; // cart object

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
        out += "<div class='add_to_cart'><button class='button add-to-cart' data-name='"+data[key].name+"'>BUY</button></div>";
		out += '</div>';
	}
	$('.slot').html(out);
	$('.add-to-cart').on('click',addToCart);
}

//adding to local cart
function addToCart() {
	var name = $(this).attr('data-name');
	if(cart[name]==undefined){
		cart[name] = 1;
	} else {
		cart[name]++;
	}
	showMiniCart();
	saveMiniCart();
}
function showMiniCart() {
	var out = '';
	for (var key in cart){
		out += key + '-----' + cart[key]+'<br>';
	}
	$('.mini-cart').html(out);
}

function saveMiniCart(){
	//saving mini-cart
	localStorage.setItem('cart',JSON.stringify(cart));
}

function loadMiniCart(){
	//local storage output |  saved mini-cart
	//check if cart defined
	if(localStorage.getItem('cart')){
		//show local storage mini-cart
		if(isJsonString(localStorage.getItem('cart'))){
			cart = JSON.parse(localStorage.getItem('cart'));
			showMiniCart();
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
		url: "function/catalog.php",
		data: {category: cat},
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
