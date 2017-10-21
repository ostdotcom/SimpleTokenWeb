;
(function (window) {

  var homeNs = ns("simpletokenadmin.home"),
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
        oThis.$modalBox.find('.modal-body').html($(this).closest('.kyc-img-container').html());
        $('.modal-body iframe').height((window.innerHeight - 150) + 'px');
        $('.modal-body img').css('max-height', (window.innerHeight - 150) + 'px');
        oThis.$modalBox.modal('show');
      });

      $('#openLogs').on('click', function () {
        oThis.getLogs();
      });

      $('#kycDetailsModal').on('hidden.bs.modal', function () {
        $(this).find('.modal-body').html('');
      });

      $('.sticky-action-buttons-container').on('click', '.button-active', function () {
        var r = confirm('Please confirm the action !!')
          , that = this;
        if (r == true) {
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

    },

    getLogs: function () {

      if (!oThis.oLogTable) {
        oThis.logTableConfig.ajax.data = function (data) {
          return $.extend(data, {});
        };

        oThis.logTableConfig.columns.unshift(
          {
            title: "Date / Time",
            data: "data_time",
            render: $.fn.dataTable.render.text(),
            width: '10%'
          },
          {
            title: "Status",
            data: "status_a",
            render: $.fn.dataTable.render.text(),
            width: '10%'
          },
          {
            title: "Agent",
            data: "agent",
            render: $.fn.dataTable.render.text(),
            width: '10%'
          },
          {
            title: "Email Type",
            data: "email_type",
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
            for (var userId in response.data) {
              var dataRow = response.data[userId];

              var displayRow = ''
                + '<tr class="duplicateCase">'
                +   '<td class="dupInfo"><a target="_blank" href="/admin/get-kyc-details/?case_id=' + dataRow.case_id + '">' + dataRow.case_id + '</td>'
                +   '<td class="dupInfo">' + oThis.adminKycStatuses[dataRow.admin_status] + '</td>'
                +   '<td class="dupInfo">' + oThis.cynopsisKycStatuses[dataRow.cynopsis_status] + '</td>'
                +   '<td class="dupInfo">' + dataRow.active + '</td>'
                +   '<td class="dupInfo">' + dataRow.inactive +'</td>'
                + '</tr>';

              $duplicateKycData.append(displayRow);
            }
            return false;
          }
        },
        error: function (jqXHR, exception) {
        }
      });
    }

  };
})(window);