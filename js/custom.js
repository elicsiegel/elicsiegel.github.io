$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(window).on('resize scroll', function() {
  $('.bigSection').each(function() {

    if ($(this).isInViewport()) {
      $(this).addClass("animated fadeIn");
    } else {
      // $(this).removeClass("animated bounceInRight");
    }
  });
});
