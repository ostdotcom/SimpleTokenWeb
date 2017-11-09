;
(function (window) {

  var homeNs = ns("simpletokenadmin.home"),
    adminUtilsNs = ns("simpletokenadmin.utils"),
    oThis;

  homeNs.saleDashboard = oThis = {

    oTable: null,
    page: 0,
    $dataTable: $('#saleDashboard'),

    init: function (config) {
      oThis.initGrid(config.table_config);
      oThis.bindButtonActions();
    },

    initGrid: function (config) {

      config.ajax.error = function (jqXHR, textStatus, errorThrown) {
        adminUtilsNs.errorHandling.xhrErrResponse(jqXHR, errorThrown);
      };

      config.columns.unshift(
        {
          title: "Date (PST)",
          data: "date_time",
          render: $.fn.dataTable.render.text()
        },
        {
          title: "Total Etherium",
          data: "total_etherium",
          render: $.fn.dataTable.render.text()
        },
        {
          title: "Total Tokens Sold",
          data: "total_tokens_sold",
          render: $.fn.dataTable.render.text()
        },
        {
          title: "$",
          data: "total_dollers_value",
          render: $.fn.dataTable.render.text()
        }
      );
      oThis.oTable = oThis.$dataTable.DataTable(config);

    },

    bindButtonActions: function (config) {

    }

  };

})(window);