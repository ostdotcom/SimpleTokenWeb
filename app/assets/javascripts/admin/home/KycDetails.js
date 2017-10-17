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
      $('.kyc-image, .fullScreenIcon').on('click', function () {
        var modalBox = $('#kycDetailsModal');
        modalBox.find('.modal-body').html($(this).closest('.kyc-img-container').html());
        $('.modal-body > iframe').height((window.innerHeight-150)+'px');
        //$('.modal-body > img').attr('height', (window.innerHeight-150)+'px');
        $('.modal-body img').css('max-height', (window.innerHeight-150)+'px');
        modalBox.modal('show');
      });

      $('#kycDetailsModal').on('hidden.bs.modal', function () {
        $(this).find('.modal-body').html('');
      });

      $('.sticky-action-buttons-container').on('click', '.button-active', function () {
        var r = confirm('Please confirm the action !!')
          , that = this;
        if(r==true){
          var $form = $('#caseActionForm');
          $.ajax({
            url: $(that).data('action-url'),
            dataType: 'json',
            method: $form.attr('method'),
            data: $form.serialize(),
            success: function (response) {
              if (response.success == true) {
                window.location = window.location;
                return false;
              }
            },
            error: function (jqXHR, exception) {
            }
          });
        }
      });

    }

  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });
})(window);