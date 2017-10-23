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
      popoverPlacement: 'right',

      init: function (config) {
          oThis.bindButtonActions();
          oThis.refreshIndicator();
          $('#kycForm').setCustomValidity();
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
                  oThis.verifyModal('show-close');
                  oThis.verifyModal('hide-progress');
                  oThis.verifyModal('status-text', utilsNs.errorHandling.xhrErrResponse(jqXHR, exception));
              },
              fail: function(e, data) {
                  var xmlResponse = $( data.jqXHR.responseXML );
                  oThis.verifyModal('show-close');
                  oThis.verifyModal('hide-progress');
                  oThis.verifyModal('status-text', 'Upload Error: '+xmlResponse.find('Code').text()+'. Please contact support.');
              },
          });

          $('input[name=birthdate]')
              .datepicker({
                  format: 'dd/mm/yyyy',
                  autoclose: true,
                  endDate: '31/12/1999',
                  orientation: 'bottom'
              })
              .on('changeDate', function(e) {
                  $(this).trigger('change');
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

          if($(window).width() < 767){
              oThis.popoverPlacement = 'bottom'
          }

          $('#kycForm label[for=selfie_file_path] .badge').popover({
              placement: oThis.popoverPlacement,
              content: $('#selfie-popover').text(),
              html: true,
              trigger: 'click'
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

      refreshIndicator: function(){
          var $refresh = $('#refresh-indicator');
          $refresh.val() == 'yes' ? location.reload(true) : $refresh.val('yes');
      },

      validateForm: function(){

          var v = false;
          simpletoken.utils.errorHandling.clearFormErrors();

          $('#kycForm input[type="file"]').attr('required',false);

          oThis.formNames.forEach(function(value){
              $('#kycForm input[name="'+value+'"]').attr('required',true);
          });

          $('#kycForm').find('input, select, textarea').each(function(){
              $(this).trigger('change');
          });

          if( $('#kycForm .error:not(:empty)').length > 0 ){
              v = false;
          } else {
              v = true;
          }

          if(typeof $('#kycForm .g-recaptcha')[0] != 'undefined' &&  grecaptcha.getResponse() == ''){
              $('.error[data-for="recaptcha"]').text('Please select the reCaptcha checkbox');
              v = false;
          }

          if(v === true) {

              simpletoken.utils.errorHandling.clearFormErrors();

              oThis.verifyModal('verify');

              $('#verifyModal').modal({
                  backdrop: 'static',
                  keyboard: false
              }).modal('show');

          } else {

              grecaptcha.reset();
              $('.error[data-for="general_error"]').text('We found some errors in your KYC form. Please scroll up to review');

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

          oThis.verifyModal('loader');
          oThis.verifyModal('hide-close');
          oThis.verifyModal('hide-progress');
          oThis.verifyModal('status-text', 'Encrypting your upload data...');

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

          oThis.verifyModal('show-progress');
          oThis.verifyModal('status-text', 'Uploading files via secured channel...');

          $.each(data, function(upload_key, upload_value){
              $('#fileupload').fileupload('send', {
                  files:[$('#kycForm input[name='+upload_key+']')[0].files[0]],
                  paramName: ['file'],
                  url: upload_value.url,
                  formData: upload_value.fields
              });
              oThis.uploadCount++;
          });
      },

      submitData: function(){

            oThis.verifyModal('hide-progress');
            oThis.verifyModal('status-text', 'Submitting your KYC data...');

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
                        oThis.verifyModal('show-close');
                        oThis.verifyModal('status-text', response.err.display_text);
                        simpletoken.utils.errorHandling.displayFormErrors(response);
                    }
                },
                error: function (jqXHR, exception) {
                    oThis.verifyModal('show-close');
                    oThis.verifyModal('status-text', utilsNs.errorHandling.xhrErrResponse(jqXHR, exception));
                }
            });
      },

      verifyModal: function(mode, message){

          if(mode == 'verify' || typeof mode == 'undefined'){
              $('#verifyModal .verify-content').show();
              $('#verifyModal .loader-content').hide();
              $('#verifyModal .close').show();
          }

          if(mode == 'loader'){
              $('#verifyModal .verify-content').hide();
              $('#verifyModal .loader-content').show();
          }

          if(mode == 'hide-close'){
              $('#verifyModal .close').hide();
          }

          if(mode == 'show-close'){
              $('#verifyModal .close').show();
          }

          if(mode == 'hide-progress'){
              $('#verifyModal .loader-content .progress').hide();
              $('#verifyModal .loader-content .progress .progress-bar')
                  .css('width', '1%')
                  .text('');
          }

          if(mode == 'show-progress'){
              $('#verifyModal .loader-content .progress').show();
          }

          if(mode == 'status-text'){
              $('#verifyModal .loader-content .status').text(message);
          }

      }

  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

})(window);