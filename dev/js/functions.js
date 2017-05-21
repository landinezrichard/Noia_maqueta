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
});