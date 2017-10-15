;
(function (window) {

  var homeNs = ns("simpletokenadmin.home"),
    oThis;

  homeNs.kycDetails = oThis = {

    init: function (config) {
      oThis.initGrid();
      oThis.bindButtonActions();
    },

    initGrid: function (config) {
    },

    bindButtonActions: function (config) {
      $('.kyc-image').on('click', function () {
        var modalBox = $('#kycDetailsModal');
        modalBox.find('.modal-body').html('<img class="kyc-image" src="'+$(this).attr('src')+'">');
        modalBox.modal('show');
      });

      $('#kycDetailsModal').on('hidden.bs.modal', function () {
        $(this).find('.modal-body').html('');
      });

    }

  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });
})(window);