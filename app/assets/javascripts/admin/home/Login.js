;
(function (window) {

    var homeNs = ns("simpletokenadmin.home"),
        adminUtilsNs = ns("simpletokenadmin.utils"),
        utilities = ns("simpletoken.utilities"),

        oThis;

    homeNs.login = oThis = {

        jLoginForm: null,

        init: function (config) {
            var formHelperGetData = FormHelper.prototype.getSerializedData;
            oThis.jLoginForm = $('#adminLoginForm');
            oThis.jLogin = $('#adminLogin');

            oThis.formHelper = oThis.jLoginForm.formHelper({
                getSerializedData : function(){
                    var data = formHelperGetData.apply(this),
                        urlParams = new URLSearchParams(window.location.search),
                        next = urlParams.get('next');
                    if (next){
                        data.push({
                            name: "next_url",
                            value: encodeURIComponent(next)
                        });
                    }
                    return data;
                },
                success: function (response) {
                    if (response.success == true) {
                        var data = response.data,
                            redirect_url = data['redirect_url'];
                        window.location = redirect_url;
                        return false;
                    } else {
                        if (response.err && response.err.code === "is_deleted") {
                            oThis.showDeactivated();
                        }
                    }
                },
                complete: function (response) {
                    if (typeof grecaptcha != 'undefined') {
                        grecaptcha.reset();
                    }

                }
            });
            oThis.bindButtonActions();

        },

        bindButtonActions: function () {
            oThis.jLoginForm.on("beforeSubmit", function (event) {
                if (!oThis.isCaptchaValid) {
                    event.preventDefault();
                }
            });

            oThis.jLogin.off('click').on('click', function () {
                oThis.isCaptchaValid = utilities.validateCaptcha(oThis.jLoginForm);
                // oThis.formHelper.jForm.submit();
            });
        },


        showDeactivated: function () {
            $('#loginForm').hide();
            $('#accountDeactivated').show();
        }

    };

    $(document).ready(function () {
        oThis.init({i18n: {}});
    });

})(window);