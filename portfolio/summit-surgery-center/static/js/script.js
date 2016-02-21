$(function() {
	/* Nav menu toggle */
	$(".js-menu-toggle").click(function() {
		$(".js-menu-overlay, .js-menu").toggleClass("is-open");
	});
	$(".js-menu").click(function(event) {
		event.stopPropagation();
	});

	/* Footer testimonial carousel */
	if ($(".js-testimonials").length) {
		$(".js-testimonials").slick({
			autoplay: true,
			fade: true,
			dots: false,
			arrows: false,
		});
	}

	/* Open/close information section toggles */
	$(".js-show-toggle").click(function() {
		$(".js-show").slideToggle();
	});

	/* Meet our Surgeons - 'tabbed' functionality */
	if ($(".js-surgeons").length) {
		$(".js-surgeon-toggle").click(function() {
			// If we're already showing this surgeon, no need to do anything
			if ($(this).hasClass("is-current")) { return; }
			// If we're in the middle of an animation, don't do anything
			if ($(".is-fading-out").length) { return; }

			var surgeons = $(".js-surgeons");
			var surgeonId = $(this).data("surgeon");

			surgeons.find('[data-surgeon]:visible').addClass("is-fading-out").fadeOut(function() {
				$(this).removeClass("is-fading-out");
			});
			surgeons.find('[data-surgeon="' + surgeonId + '"]').fadeIn();

			$(".js-surgeon-toggle.is-current").removeClass("is-current");
			$(this).addClass("is-current");
		});
	}
});