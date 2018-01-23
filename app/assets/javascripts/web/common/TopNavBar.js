(function (window, $) {
  $( function () {
    $("#nav-products").mouseenter( function () {
      $(this).addClass('open');
    });
    $("#nav-products").mouseleave( function () {
      $(this).removeClass('open');
    });
  })

})(window,jQuery)