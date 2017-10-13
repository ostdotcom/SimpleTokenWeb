;
(function (window) {

  var homeNs = ns("simpletoken.home"),
      utilsNs = ns("simpletoken.utils"),
    oThis;

  homeNs.kyc = oThis = {

      init: function (config) {
          oThis.bindButtonActions();

          //var filelist = [];
          //var paramNames = [];
          //
          //$('#kycForm').fileupload({
          //    dataType: 'json',
          //    url: $('#kycForm').attr('action'),
          //    method: $('#kycForm').attr('method'),
          //    autoUpload: false,
          //    singleFileUploads: false,
          //    add: function (e, data) {
          //        for(var i = 0; i < data.files.length; i++){
          //            filelist.push(data.files[i])
          //            paramNames.push(e.delegatedEvent.target.name);
          //        }
          //    }
          //});
          //
          //$('#kycSubmit').click(function(e){
          //    e.preventDefault();
          //    console.log(filelist, paramNames);
          //    //return;
          //    $('#kycForm').fileupload('send', {files:filelist, paramName: paramNames});
          //})
      },

      bindButtonActions: function () {

          $("#verify-modal-btn").on('click', function () {
              $('#verifyModal').modal({
                  backdrop: 'static',
                  keyboard: false
              });
              $('#verifyModal').modal('show');
          });


          $("#kycSubmit").click(function (event) {
              event.preventDefault();
              oThis.validateForm();
          });

      },

      validateForm: function(){
          //var v = simpletoken.utils.errorHandling.validationGeneric( $('#kycForm input[type="text"], #kycForm input[type="file"]') );
          //if(v === true) {
              $('#verifyModal').modal({
                  backdrop: 'static',
                  keyboard: false
              }).modal('show');
          //}
      },

    //  submit: function () {
    //      var $form = $('#kycForm');
    //      simpletoken.utils.errorHandling.clearFormErrors();
    //      $.ajax({
    //          url: $form.attr('action'),
    //          dataType: 'json',
    //          method: $form.attr('method'),
    //          data: $form.serialize(),
    //          success: function (response) {
    //              console.log(response);
    //              if (response.success == true) {
    //                  window.location = '/reserve-token?initTokenSale=1';
    //                  return false;
    //              } else {
    //                  simpletoken.utils.errorHandling.displayFormErrors(response);
    //                  alert(response.err.display_text);
    //              }
    //          },
    //          error: function (jqXHR, exception) {
    //              alert(utilsNs.errorHandling.xhrErrResponse(jqXHR, exception));
    //          }
    //      });
    //  },

  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

})(window);