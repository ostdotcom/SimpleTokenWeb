;
(function (window) {

  var homeNs = ns("simpletoken.home"),
      utilsNs = ns("simpletoken.utils"),
    oThis;

  homeNs.kyc = oThis = {

      uploadParamsResponse: {},
      uploadCount: 0,

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
                  oThis.uploadCount--;
                  if(oThis.uploadCount == 0){
                      oThis.submitData();
                  }
              },
              progress: function(e, data){
                  var percent = Math.round((data.loaded / data.total) * 100);
                  $('#verifyModal .loader-content .progress .progress-bar')
                      .css('width', percent + '%')
                      .text(percent + '%');
              },
          });

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
                 oThis.getSignedUrls();
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

      getSignedUrls: function(){

          $('#verifyModal .close').hide();
          $('#verifyModal .verify-content').hide();
          $('#verifyModal .loader-content .progress').hide();
          $('#verifyModal .loader-content .status').text('Encrypting your upload data...');
          $('#verifyModal .loader-content').show();

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

          $('#verifyModal .loader-content .progress').show();
          $('#verifyModal .loader-content .status').text('Uploading files via secured channel...');

          $.each(data, function(upload_key, upload_value){
              $('#fileupload').fileupload('send', {
                  files:[$('#kycForm input[name=passport_file_path]')[0].files[0]],
                  paramName: ['file'],
                  url: upload_value.url,
                  formData: upload_value.fields
              });
              oThis.uploadCount++;
          });
      },

      submitData: function(){

            $('#verifyModal .loader-content .progress').hide();
            $('#verifyModal .loader-content .status').text('Submitting your KYC data...');

            var $form = $('#kycForm');
            var $data = $form.serializeArray().reduce(function(obj, item) {
                  obj[item.name] = item.value;
                  return obj;
            }, {});
            $.each(oThis.uploadParamsResponse, function(upload_key, upload_value){
                $data[upload_key] = upload_value.fields.key;
            });

            $.ajax({
                url: $form.attr('action'),
                dataType: 'json',
                method: $form.attr('method'),
                data: $data,
                success: function (response) {
                    if (response.success == true) {
                        window.location = '/reserve-token?initTokenSale=1';
                        return false;
                    } else {
                        $('#verifyModal .close').show();
                        $('#verifyModal .verify-content').show();
                        $('#verifyModal .loader-content').hide();
                        $('#verifyModal').modal('hide');
                        simpletoken.utils.errorHandling.displayFormErrors(response);
                    }
                },
                error: function (jqXHR, exception) {
                    alert(utilsNs.errorHandling.xhrErrResponse(jqXHR, exception));
                }
            });
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