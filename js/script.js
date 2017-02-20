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
      objectFitPolyfill();
    },
  }).data("smoothState");

  initSliders();
});
