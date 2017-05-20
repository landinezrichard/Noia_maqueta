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
});