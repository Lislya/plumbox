function prodOut(data) {
	//Category product output
	// var prod = JSON.parse(data);
	// console.log(prod);
	var out='';
	for (var key in data) {
		out += '<div class="slot_item">';
		out += '<a href="catalog.php?product_id='+data[key].id+'"><img src="img/products/'+data[key].category+'/'+data[key].img+'" alt=""></a>';
		out += '<h4>'+data[key].name+'</h4>';
		out += '<p class="price">'+data[key].price+' &#8381</p>';
		out += '<div class="add_to_cart"><button class="button">BUY</button></div>';
		out += '</div>';
	}
	$('.slot').html(out);
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
});
