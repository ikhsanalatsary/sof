
var owl = $("#header-slider");

	owl.owlCarousel({
		singleItem : true,
		navigation : true,
		navigationText : ["<i class='ion-ios-arrow-thin-left'></i>","<i class='ion-ios-arrow-thin-right'></i>"],
		transitionStyle : "fade",
		pagination: true,
	});

	$("#Client_Logo").owlCarousel({
		autoPlay : 5000,
			items : 6,
			responsiveClass:true,
			responsive: {
						0:{
								items : 1
						},
						480:{
								items : 1
						},
						768:{
								items : 3
						},
						1200:{
								items: 3
						}
				}
	});

$('.menu').onePageNav({
	currentClass: 'active',
	changeHash: true,
	scrollSpeed: 1200,
	top : 0
});

new WOW().init();

// DOM Content Load Event Actions;
$( window ).load(function() {
	$('div#loading').remove();
	$('body').removeClass('loading');
});

$('.carousel').carousel();

$('.counter-digit').counterUp({
	delay: 10,
	time: 2000
});

/**
 * Google Map
 */
if ( $('#googleMap').length ) {
	var mapProp = {
		center: new google.maps.LatLng(-6.1276861,106.9203372),
		zoom:16,
		scrollwheel: false,
		navigationControl: false,
		mapTypeControl: false,
		scaleControl: false,
		draggable: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
}

var topoffset = 0;
	$('#scroll').click(function() {
		if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top-topoffset
				}, 1000);
		return false;
			} // target.length
		} //location hostname
	}); //on click

$.scrollUp({
	scrollDistance: 2000,
	scrollSpeed: 1200,
});
