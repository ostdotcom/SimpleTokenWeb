;
(function (window) {

  var homeNs = ns("simpletoken.home"),
      utilsNs = ns("simpletoken.utils"),
    oThis;

  homeNs.kyc = oThis = {

      uploadParamsResponse: {},

      init: function (config) {
          oThis.bindButtonActions();

          $('#fileupload').fileupload({
              dataType: 'xml',
              method: 'POST',
              autoUpload: false,
              singleFileUploads: false,
              done: function (e, data) {
                  $.each(oThis.uploadParamsResponse, function(upload_key, upload_value){
                      if(upload_value.fields.key == data.formData.key){
                          oThis.uploadParamsResponse[upload_key].status = data.jqXHR.status;
                      }
                  });
              }
          });

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

          $("#kycSubmit").click(function (event) {
              event.preventDefault();
              oThis.validateForm();
          });

          $('#kycVerify').click(function(){
             if(
                 $('#is_correct_information').is(':checked') === true &&
                 $('#is_participating_token_distribution').is(':checked') === true &&
                 $('#cannot_participate').is(':checked') === true &&
                 $('#i_agree_terms_conditions').is(':checked') === true
             ) {
                 simpletoken.utils.errorHandling.clearFormErrors();
                 oThis.submitForm();
             } else {
                 $('.error[data-for="verify_error"]').text('Please verify all above mentioned confirmations');
             }
          });

      },

      validateForm: function(){
          var v = simpletoken.utils.errorHandling.validationGeneric( $('#kycForm input[type="text"], #kycForm input[type="file"]') );
          if(v === true) {
              $('#verifyModal').modal({
                  backdrop: 'static',
                  keyboard: false
              }).modal('show');
          }
      },

      makeFileParams: function(){
          var fileParams = '';

          $.each( $('#kycForm input[type=file]'), function(key, value){

              var file_type = value.files[0].type;
              var file_name = value.name;

              if(file_type.substr(0,5) == 'image'){
                  var file_category = 'images';
              } else if("application/pdf".substr(-3) == 'pdf'){
                  var file_category = 'pdfs';
              }

              fileParams += file_category + '[' + file_name + ']=' + file_type + '&';

          });

          return fileParams;
      },

      submitForm: function(){
          $.ajax({
              url: '/api/user/upload-params/?'+oThis.makeFileParams(),
              success: function(response){
                  if(response.success === true){
                      console.log(response);
                      oThis.uploadParamsResponse = response.data;
                      oThis.uploadFiles(oThis.uploadParamsResponse);
                  }
              }
          })
      },

      uploadFiles: function(data){
          $.each(data, function(upload_key, upload_value){
              $('#fileupload').fileupload('send', {
                  files:[$('#kycForm input[name=passport_file_path]')[0].files[0]],
                  paramName: ['file'],
                  url: upload_value.url,
                  formData: upload_value.fields
              });
          });
      }

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