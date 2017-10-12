;
(function(window){
  var modalNs = ns("simpletoken.utils"),
    oThis;

  modalNs.modal = oThis = {

    init: function (config) {
      oThis.bindButtonActions();
    },

    bindButtonActions: function () {

      $('.modal').on('show.bs.modal', function() {
        $(this).show();
        oThis.setModalMaxHeight(this);
      });

      $(window).resize(function() {
        if ($('.modal.in').length != 0) {
          oThis.setModalMaxHeight($('.modal.in'));
        }
      });

    },

    setModalMaxHeight: function (element) {
      this.$element     = $(element);
      this.$content     = this.$element.find('.modal-content');
      var borderWidth   = this.$content.outerHeight() - this.$content.innerHeight();
      var dialogMargin  = $(window).width() < 768 ? 20 : 60;
      var contentHeight = $(window).height() - (dialogMargin + borderWidth);
      var headerHeight  = this.$element.find('.modal-header').outerHeight() || 0;
      var footerHeight  = this.$element.find('.modal-footer').outerHeight() || 0;
      var maxHeight     = contentHeight - (headerHeight + footerHeight);

      this.$content.css({
        'overflow': 'hidden'
      });

      this.$element
        .find('.modal-body').css({
          'max-height': maxHeight,
          'overflow-y': 'auto'
        });
    }

  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });


})(window);