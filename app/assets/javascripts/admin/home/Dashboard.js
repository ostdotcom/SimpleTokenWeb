;
(function (window) {

    var homeNs = ns("simpletokenadmin.home"),
        oThis;

    homeNs.dashboard = oThis = {

        oTable: null,
        page: 0,
        filters: {},
        sortings: {},
        $dataTable: $('#kycCheckDashboard'),

        init: function (config) {
            oThis.filters = config.filters;
            oThis.sortings = config.sortings;
            oThis.initGrid(config.kyc_table_config);
            oThis.bindButtonActions();
        },

        initGrid: function (config) {

            config.ajax.data = function (data) {
                return $.extend(data, {filters: oThis.filters}, {sortings: oThis.sortings});
            };

            config.columns.unshift(
                {
                    title: "Date / Time",
                    data: null,
                    "render": function (data, type, full, meta) {
                        return data.date_time;
                    }

                },
                {
                    title: "Status",
                    data: null,
                    "render": function (data, type, full, meta) {
                        return data.status;
                    }
                },
                {
                    title: "Duplicate",
                    data: null,
                    "render": function (data, type, full, meta) {
                        return '<div class="' + (data.duplicate ? 'bigGreenDot' : 'bigRedDot') + '"></div>';
                    }
                },
                {
                    title: "Re-Submitted",
                    data: null,
                    "render": function (data, type, full, meta) {
                        return '<div class="' + (data.re_submitted ? "bigGreenDot" : "bigRedDot") + '"></div>';
                    }
                },
                {
                    title: "Name",
                    data: null,
                    "render": function (data, type, full, meta) {
                        return data.name;
                    }
                },
                {
                    title: "Country",
                    data: null,
                    "render": function (data, type, full, meta) {
                        return data.country;
                    }
                },
                {
                    title: "Passport No",
                    data: null,
                    "render": function (data, type, full, meta) {
                        return data.passport_no;
                    }
                },
                {
                    title: "Nationality",
                    data: null,
                    "render": function (data, type, full, meta) {
                        return data.nationality;
                    }
                },
                {
                    title: "Admin",
                    data: null,
                    "render": function (data, type, full, meta) {
                        return data.admin;
                    }
                }
            );
            oThis.oTable = oThis.$dataTable.DataTable(config);
        },

        bindButtonActions: function (config) {

            $("#cynopsis-status").on('change', function () {
                oThis.filters.cynopsis_status = $(this).val();
                oThis.oTable.ajax.reload(null, true);
            });

            $("#admin-status").on('change', function () {
                oThis.filters.admin_status = $(this).val();
                oThis.oTable.ajax.reload(null, true);
            });

            $("#sort-by").on('change', function () {
                oThis.sortings.sort_by = $(this).val();
                oThis.oTable.ajax.reload(null, true);

            });

            oThis.$dataTable.on('click', 'tbody tr', function () {
                console.log(oThis.oTable.ajax.url());
                console.log(oThis.oTable.row(this).data().user_case_id);
                //window.location = '/admin/get-kyc-details/?case_id='+oThis.oTable.row(this).data().user_case_id + oThis.filter
            });
        }

    };

})(window);