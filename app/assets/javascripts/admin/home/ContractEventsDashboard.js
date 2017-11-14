;
(function (window) {

  var homeNs = ns("simpletokenadmin.home"),
    adminUtilsNs = ns("simpletokenadmin.utils"),
    oThis;

  homeNs.contractEventsDashboard = oThis = {

    oTable: null,
    page: 0,
    $dataTable: $('#contractEventsDashboard'),

    init: function (config) {
      oThis.initGrid(config.table_config);
      oThis.bindButtonActions();
    },

    initGrid: function (config) {

      config.ajax.error = function (jqXHR, textStatus, errorThrown) {
        adminUtilsNs.errorHandling.xhrErrResponse(jqXHR, errorThrown);
      };

      config.ajax.dataSrc = function(response) {
        oThis.allTimeData = response.all_time_data;
        return response.data;
      };

      config.columns.unshift(
        {
          title: "Block Number",
          data: "block_number",
          render: $.fn.dataTable.render.text(),
          width: "7%"
        },
        {
          title: "Event Name",
          data: "event_name",
          render: $.fn.dataTable.render.text(),
          width: "12%"
        },
        {
          title: "Receiver Contract Address",
          data: "contract_address",
          render: $.fn.dataTable.render.text(),
          width: "27%"
        },
        {
          title: "Event Vars",
          data: "processed_event_data",
          render: $.fn.dataTable.render.text()
        }
      );
      oThis.oTable = oThis.$dataTable.DataTable(config);

    },

    bindButtonActions: function (config) {
    }

  };

})(window);