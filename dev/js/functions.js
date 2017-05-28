$(document).ready(function() {
	/*Mostrar Menu en Movil*/
	$('.Menu-btn').click(function(event){
		event.preventDefault();
		$('.Menu').slideToggle();
	});

	/*Boton Ir arriba*/
	$('.ButtonIrUp').click(function(){
		$('body, html').animate({
			scrollTop: '0px'
		}, 300);
	});

	$(window).scroll(function(){
		if( $(this).scrollTop() > 0 ){
			$('.ButtonIrUp').slideDown(300);
		} else {
			$('.ButtonIrUp').slideUp(300);
		}
	});

	/*SCRIPTS SOLO HOME*/

	/*Botton home, seccion siguiente*/

	$('.Banner-btnDown').click(function(){
		var target = $('.HomeButtons');
		$('body, html').animate({
			scrollTop: $(target).offset().top
		}, 300);
	});

	/*Cambiar estilo input type= number*/
	var spinnerInputNumber = '<div class="quantity-nav"><div class="quantity-button quantity-up"><span class="icon-flecha-up"></span></div><div class="quantity-button quantity-down"><span class="icon-flecha-down"></span></div></div>';
	$(spinnerInputNumber).insertAfter('.quantity input');
	$('.quantity').each(function() {
		var spinner = $(this),
			input = spinner.find('input[type="number"]'),
			btnUp = spinner.find('.quantity-up'),
			btnDown = spinner.find('.quantity-down'),
			min = input.attr('min'),
			max = input.attr('max');

		btnUp.click(function() {
			var oldValue = parseFloat(input.val());
			if (oldValue >= max) {
				var newVal = oldValue;
			} else {
				var newVal = oldValue + 1;
			}
			spinner.find("input").val(newVal);
			spinner.find("input").trigger("change");
		});

		btnDown.click(function() {
			var oldValue = parseFloat(input.val());
			if (oldValue <= min) {
				var newVal = oldValue;
			} else {
				var newVal = oldValue - 1;
			}
			spinner.find("input").val(newVal);
			spinner.find("input").trigger("change");
		});

	});

	/*Selector Categorya Factory*/
	$('.Factory-categoryTitle').click(function(e){
		e.preventDefault();
		$('.Factory-categoryList').slideToggle();
	});

	/*LUPA*/
	var native_width = 0;
	var native_height = 0;

	$('.Factory-productConfigurator').on('mousemove','.vpc-single-option-wrap', function(e){
		//When the user hovers on the image, the script will first calculate
		//the native dimensions if they don't exist. Only after the native dimensions
		//are available, the script will show the zoomed version.
		// if(!native_width && !native_height)
		// {
			//This will create a new image object with the same image as that in .small
			//We cannot directly get the dimensions from .small because of the 
			//width specified to 200px in the html. To get the actual dimensions we have
			//created this image object.
			var image_object = new Image();
			image_object.src = $(this).find('input').attr("data-img");
			
			//This code is wrapped in the .load function which is important.
			//width and height of the object would return 0 if accessed before 
			//the image gets loaded.
			native_width = image_object.width;
			native_height = image_object.height;

			$(this).find(".imgLupaLarge").css({background:"url("+image_object.src+") no-repeat"});
		// }
		// else
		// {
			
			//x/y coordinates of the mouse
			//This is the position of .magnify with respect to the document.
			var magnify_offset = $(this).offset();
			//We will deduct the positions of .magnify from the mouse positions with
			//respect to the document to get the mouse positions with respect to the 
			//container(.magnify)
			var mx = e.pageX - magnify_offset.left;
			var my = e.pageY - magnify_offset.top;
			
			//Finally the code to fade out the glass if the mouse is outside the container
			if(mx < $(this).width() && my < $(this).height() && mx > 0 && my > 0)
			{
				$(this).find(".imgLupaLarge").fadeIn(100);
			}
			else
			{
				$(this).find(".imgLupaLarge").fadeOut(100);
			}
			if($(this).find(".imgLupaLarge").is(":visible"))
			{
				//The background position of .imgLupaLarge will be changed according to the position
				//of the mouse over the .small image. So we will get the ratio of the pixel
				//under the mouse pointer with respect to the image and use that to position the 
				//large image inside the magnifying glass
				var miniImage = $(this);
				var rx = Math.round(mx/$(miniImage).width()*native_width - $(".imgLupaLarge").width()/2)*-1;
				var ry = Math.round(my/$(miniImage).height()*native_height - $(".imgLupaLarge").height()/2)*-1;
				var bgp = rx + "px " + ry + "px";
				
				//Time to move the magnifying glass with the mouse
				var px = mx - $(".imgLupaLarge").width()/2;
				var py = my - $(".imgLupaLarge").height()/2;
				//Now the glass moves with the mouse
				//The logic is to deduct half of the glass's width and height from the 
				//mouse coordinates to place it with its center at the mouse coordinates
				
				//If you hover on the image now, you should see the magnifying glass in action
				$(this).find(".imgLupaLarge").css({left: px, top: py, backgroundPosition: bgp});
			}
		// }
	});

});