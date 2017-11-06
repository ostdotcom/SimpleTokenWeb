;
(function (window) {

    var homeNs = ns("simpletokenadmin.home"),
        adminUtilsNs = ns("simpletokenadmin.utils"),
        oThis;

    homeNs.posDashboard = oThis = {

        init: function (config) {
            oThis.initGrid();
            oThis.bindButtonActions();
        },

        initGrid: function () {

        },

        bindButtonActions: function () {

            $("#exportPosBtn").click(function (event) {
                event.preventDefault();
                $.ajax({
                    url: '/api/admin/kyc/run-pos-bonus-process',
                    method: 'GET',
                    success: function (response) {
                        if (response.success == true) {
                            alert('Success');
                            return false;
                        } else {
                            utilsNs.errorHandling.displayFormErrors(response);
                        }
                    },
                    error: function (jqXHR, exception) {
                        adminUtilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
                    }
                });
            });

            $("#exportAltTokenBtn").click(function (event) {
                event.preventDefault();
                $.ajax({
                    url: '/api/admin/kyc/run-alt-token-bonus-process',
                    method: 'GET',
                    success: function (response) {
                        if (response.success == true) {
                            alert('Success');
                            return false;
                        } else {
                            utilsNs.errorHandling.displayFormErrors(response);
                        }
                    },
                    error: function (jqXHR, exception) {
                        adminUtilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
                    }
                });
            });

        }

    };

})(window);