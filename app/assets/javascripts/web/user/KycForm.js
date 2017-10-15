;
(function (window) {

  var homeNs = ns("simpletoken.home"),
      utilsNs = ns("simpletoken.utils"),
    oThis;

  homeNs.kyc = oThis = {

      uploadParamsResponse: {},
      uploadCount: 0,
      isChinese: false,
      formNames: ['passport_file_path','selfie_file_path'],

      init: function (config) {
          oThis.bindButtonActions();
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
              error: function(jqXHR, exception) {
                  $('#verifyModal .loader-content .status').text(utilsNs.errorHandling.xhrErrResponse(jqXHR, exception));
                  $('#verifyModal .close').show();
                  $('#verifyModal .loader-content .progress').hide();
              },
              fail: function(e, data) {
                  var xmlResponse = $( data.jqXHR.responseXML );
                  $('#verifyModal .loader-content .status').text('Upload Error: '+xmlResponse.find('Code').text()+'. Please contact support.');
                  $('#verifyModal .close').show();
                  $('#verifyModal .loader-content .progress').hide();
              },
          });

          $('input[name=birthdate]')
              .datepicker()
              .on('dateChanged.bs.datepicker', function(e) {
                  $(this).datepicker('hide');
              });

          $('select[name="nationality"]').on('changed.bs.select', function (e) {
              if($(this).val() == 'CHINESE'){
                  oThis.isChinese = true;
                  $('.residence-proof').show();
                  oThis.formNames.push('residence_proof_file_path');
              } else {
                  oThis.isChinese = false;
                  $('.residence-proof').hide();
                  if(oThis.formNames.length == 3) {oThis.formNames.pop()}
              }
          });

          $('#kycForm input').change(function(){
              $(this).removeClass('border-error');
              $(this).closest('.form-group').find('.error[data-for]').text('');
          });

          $('#kycForm input[type="file"]').change(function(){
              $(this).closest('.form-group').find('.file-name').text($(this).val().split('\\').pop());
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
          var validate_selectors = [
              '#kycForm input[type="text"][name]'
          ];
          oThis.formNames.forEach(function(value){
              validate_selectors.push('#kycForm input[name="'+value+'"]');
          });

          var v = simpletoken.utils.errorHandling.validationGeneric( $(validate_selectors.join(',')) );

          if(/^(0x)?[0-9a-f]{40}$/i.test($('#kycForm input[name=ethereum_address]').val()) != true){
              $('input[name=ethereum_address]').addClass('border-error');
              $('.error[data-for="ethereum_address"]').text('Invalid ethereum address');
              v = false;
          }

          if(typeof $('#kycForm .g-recaptcha')[0] != 'undefined' &&  grecaptcha.getResponse() == ''){
              $('.error[data-for="recaptcha"]').text('Please select the reCaptcha checkbox');
              v = false;
          }

          oThis.formNames.forEach(function(value){
              if(typeof $('#kycForm input[name='+value+']')[0].files[0] != 'undefined'){
                  if( $('#kycForm input[name='+value+']')[0].files[0].size < 1024*200  ){
                      $('.error[data-for="'+value+'"]').text('File size too small');
                      v = false;
                  }
                  if( $('#kycForm input[name='+value+']')[0].files[0].size > 1024*1024*15 ){
                      $('.error[data-for="'+value+'"]').text('File size too large. Should be less than 15 mb.');
                      v = false;
                  }
              }
          });

          if(v === true) {
              simpletoken.utils.errorHandling.clearFormErrors();
              $('#verifyModal').modal({
                  backdrop: 'static',
                  keyboard: false
              }).modal('show');
          }
      },

      makeFileParams: function(){
          var fileParams = '';
          var formSelectors = [];

          oThis.formNames.forEach(function(value){
              formSelectors.push('#kycForm input[name="'+value+'"]');
          });

          $.each( $(formSelectors.join(',')), function(key, value){

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
                        window.location = '/reserve-token';
                        return false;
                    } else {
                        $('#verifyModal .close').show();
                        $('#verifyModal .verify-content').show();
                        $('#verifyModal .loader-content').hide();
                        $('#verifyModal').modal('hide');
                        utilsNs.errorHandling.displayFormErrors(response);
                    }
                },
                error: function (jqXHR, exception) {
                  utilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
                }
            });
      }

  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

})(window);