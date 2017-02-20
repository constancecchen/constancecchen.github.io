var initSliders = function() {
  if ($(".js-slider").length == 0) { return; }

  $(".js-slider").slick({
    dots: false,
    arrows: false,
    autoplay: true,
    adaptiveHeight: true,
  });
  $(".js-slider").slick("slickGoTo", 0); // Force recalculation of height on init

  $(".js-slider-prev").click(function() {
    $(".js-slider").slick("slickPrev");
  });
  $(".js-slider-next").click(function() {
    $(".js-slider").slick("slickNext");
  });
}

var objectFitFallback = function() {
  $('.portfolio__screenshot').each(function() {
    var $image = $(this),
        $container = $image.parent(),
        containerHeight = $container.height(),
        containerWidth = $container.width();

    $image.css({
      "height": containerHeight,
      "width": "auto",
    });

    if ($image.width() < containerWidth) {
      $image.css({
        "top": "50%",
        "left": 0,
        "height": "auto",
        "width": containerWidth,
        "marginLeft": 0,
      }).css("marginTop", $(this).height() / -2);
    } else {
      $image.css({
        "top": 0,
        "left": "50%",
        "marginTop": 0,
      }).css("marginLeft", $(this).width() / -2);
    }
  });
};

$(document).ready(function() {
  $("#main").smoothState({
    anchors: ".js-smoothState, #portfolio a",
    cacheLength: 20,
    prefetch: true,
    onStart: {
      duration: 600,
      render: function ($container) {
        $container.removeClass("ani-slideInLeft").addClass("ani-slideOutLeft");
      }
    },
    onReady: {
      duration: 0,
      render: function ($container, $newContent) {
        $container.removeClass("ani-slideOutLeft").addClass("ani-slideInLeft");
        $container.html($newContent);
      }
    },
    onAfter: function($container, $newContent) {
      initSliders();
    },
  }).data("smoothState");

  initSliders();

  // Object Fit polyfill, primarily for IE
  if ('objectFit' in document.documentElement.style === false) {
    objectFitFallback();

    // Optional - continue to responsively cover the image on resize
    $(window).scroll(function() {
      objectFitFallback();
    });
  }
});
