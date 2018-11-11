//Slider by jQuery
$(document).ready(function(){
//NextButton func
	$('#next').click(function(){
		var currentImg = $('.img.current');
		var currentImgIndex = $('.img.current').index();
		var nextImgIndex = currentImgIndex + 1;
		var nextImg = $('.img').eq(nextImgIndex-1);
		currentImg.removeClass('current');
		currentImg.hide();

		if(nextImgIndex == ($('.img:last').index()+1)){
			$('.img').eq(0).addClass('current');
			$('.img').eq(0).fadeIn(1000);
		} else {
			nextImg.fadeIn(1000);
			nextImg.addClass('current');
		}
	});
	//PrevButton func
	$('#prev').click(function(){
		var currentImg = $('.img.current');
		var currentImgIndex = $('.img.current').index();
		var prevImgIndex = currentImgIndex - 1;
		var prevImg = $('.img').eq(prevImgIndex-1);
		currentImg.removeClass('current');
		currentImg.hide();
		prevImg.fadeIn(1000);
		prevImg.addClass('current');
		console.log(currentImg);
	});
});