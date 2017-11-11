;
(function (window) {

  var homeNs = ns("simpletokenadmin.home"),
    adminUtilsNs = ns("simpletokenadmin.utils"),
    oThis;

  homeNs.saleAllDashboard = oThis = {

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
          title: "Etherium Addr",
          data: "ethereum_address",
          render: $.fn.dataTable.render.text()
        },
        {
          title: "Etherium Amount",
          data: "ethereum_value",
          render: $.fn.dataTable.render.text()
        },
        {
          title: "Tokens Sold",
          data: "tokens_sold",
          render: $.fn.dataTable.render.text()
        },
        {
          title: "Spent Dollars ($)",
          data: "usd_value",
          render: $.fn.dataTable.render.text()
        }
      );
      oThis.oTable = oThis.$dataTable.DataTable(config);

    },

    bindButtonActions: function (config) {

    }

  };

})(window);