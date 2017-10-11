;
(function (window) {

    var homeNs = ns("simpletokenadmin.home"),
        oThis;

    homeNs.dashboard = oThis = {

        init: function (config) {
            oThis.bindButtonActions();
        },

        bindButtonActions: function () {

        }
    };

    $(document).ready(function () {
        oThis.init({i18n: {}});
    });

})(window);