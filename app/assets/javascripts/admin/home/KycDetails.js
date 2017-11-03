;
(function (window) {

  var homeNs = ns("simpletokenadmin.home"),
    adminUtilsNs = ns("simpletokenadmin.utils"),
    oThis;

  homeNs.kycDetails = oThis = {

    oLogTable: null,
    logTableConfig: {},
    adminKycStatuses: {},
    cynopsisKycStatuses: {},
    $kycLogsTable: $('#kycLogsTable'),
    $modalBox: $('#kycDetailsModal'),

    init: function (config) {
      oThis.initGrid();
      oThis.bindButtonActions();
      oThis.logTableConfig = config.logs_table_config;
      oThis.adminKycStatuses = config.admin_kyc_statuses;
      oThis.cynopsisKycStatuses = config.cynopsis_kyc_statuses;
    },

    initGrid: function (config) {
    },

    bindButtonActions: function (config) {
      $('.kyc-image, .fullScreenIcon').on('click', function () {
        if($(this).find('a').length > 0){
            return;
        }  else {
            oThis.$modalBox.find('.modal-body').html($(this).closest('.kyc-img-block').find('.kyc-img-container').html());
            $('.modal-body iframe').height((window.innerHeight - 100) + 'px');
            $('.modal-body img').css('max-height', (window.innerHeight - 100) + 'px');
            oThis.$modalBox.modal('show');
        }
      });

      $('#openLogs').on('click', function () {
        oThis.getLogs();
      });

      $('#kycDetailsModal').on('hidden.bs.modal', function () {
        $(this).find('.modal-body').html('');
      });

      $('#kycCaseActionModal').on('click', 'input[type=radio][name=message_type]', function(){
        if($('#message_type_standard').prop('checked')){
            $('#custom_message_text').attr('disabled', true);
        } else {
            $('#custom_message_text').attr('disabled', false);
        }
      });

      $('.sticky-action-buttons-container').on('click', '.button-active', function () {

          $dataAction = $(this).data('action-url');
          $kycCaseActionModal = $('#kycCaseActionModal');

          if($dataAction == '/api/admin/kyc/data-mismatch'){
              $kycCaseActionModal.find('.form-fields').html( $('#data_mismatch_form').text() );
          }

          if($dataAction == '/api/admin/kyc/passport-issue' || $dataAction == '/api/admin/kyc/selfie-img-issue' || $dataAction == '/api/admin/kyc/residency-img-issue'){
              $kycCaseActionModal.find('.form-fields').html( $('#image_mismatch_form').text() );
          }

          $('#kycCaseActionModal').modal();
          $('#submit_modal_form').click(function(){
              var $form = $('#modal_form');
              $.ajax({
                  url: $dataAction,
                  dataType: 'json',
                  method: $form.attr('method'),
                  data: $form.serialize(),
                  success: function (response) {
                      if (response.success == true) {
                          window.location = window.location;
                          return false;
                      } else {
                          $('.error[data-for="action_error"]').text(response.err.display_text).fadeIn(10).fadeOut(8000);
                      }
                  },
                  error: function (jqXHR, exception) {
                      adminUtilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
                  }
              });
          });

        //if($(this).data('action-url') === '/api/admin/kyc/data-mismatch'){
        //
        //} else {
        //
        //    var r = confirm('Please confirm the action !!')
        //        , that = this;
        //    $('.error[data-for="action_error"]').hide();
        //    if (r == true) {
        //        var $form = $('#caseActionForm');
        //        $.ajax({
        //            url: $(that).data('action-url'),
        //            dataType: 'json',
        //            method: $form.attr('method'),
        //            data: $form.serialize(),
        //            success: function (response) {
        //                if (response.success == true) {
        //                    window.location = window.location;
        //                    return false;
        //                } else {
        //                    $('.error[data-for="action_error"]').text(response.err.display_text).fadeIn(10).fadeOut(8000);
        //                }
        //            },
        //            error: function (jqXHR, exception) {
        //                adminUtilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
        //            }
        //        });
        //    }
        //
        //}
      });

    },

    getLogs: function () {

      if (!oThis.oLogTable) {
        oThis.logTableConfig.ajax.data = function (data) {
          return $.extend(data, {});
        };

        oThis.logTableConfig.columns.unshift(
          {
            title: "Date / Time",
            data: "date_time",
            render: $.fn.dataTable.render.text()
          },
          {
            title: "Agent",
            data: "agent",
            render: $.fn.dataTable.render.text()
          },
          {
            title: "Activity",
            data: "activity",
            render: $.fn.dataTable.render.text()
          }
        );

        oThis.oLogTable = oThis.$kycLogsTable.DataTable(oThis.logTableConfig);
      }

      $('#kycLogsModal').modal('show');
    },

    getDuplicateKycs: function (case_id) {
      console.log(oThis.adminKycStatuses);
      $.ajax({
        url: '/api/admin/kyc/fetch-duplicate',
        dataType: 'json',
        method: 'GET',
        data: {case_id: case_id},
        success: function (response) {
          if (response.success == true) {
            $duplicateKycData = $('#dupDataTable tbody');
            var totalRows = 0;
            for (var userId in response.data) {
              var dataRow = response.data[userId];

              var displayRow = ''
                + '<tr class="duplicateCase' + (dataRow.active.length==0 ? '' : ' activeStatus') + '">'
                +   '<td class="dupInfo"><a target="_blank" href="/admin/get-kyc-details/?case_id=' + dataRow.case_id + '">' + dataRow.case_id + '</td>'
                +   '<td class="dupInfo">' + oThis.adminKycStatuses[dataRow.admin_status] + '</td>'
                +   '<td class="dupInfo">' + oThis.cynopsisKycStatuses[dataRow.cynopsis_status] + '</td>'
                +   '<td class="dupInfo">' + dataRow.active + '</td>'
                +   '<td class="dupInfo">' + dataRow.inactive +'</td>'
                + '</tr>';

              totalRows++;
              $duplicateKycData.append(displayRow);
            }

            if(totalRows == 0){
              $('.duplicate-kyc-data').remove();
            }
            return false;
          }
        },
        error: function (jqXHR, exception) {
          adminUtilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
        }
      });
    }

  };
})(window);