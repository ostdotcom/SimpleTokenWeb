;
(function (window) {

    var utilsNs = ns("simpletoken.utils");

    oThis = utilsNs.utmHelper = {
        getUtmFromCookie: function () {
            var name = "st_utm=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return oThis.getUtmObjFromString(c.substring(name.length, c.length));
                }
            }
            return {};
        },

        getUtmObjFromString: function (utm_string) {
            var utm_keys = ['origin_page', 'utm_campaign', 'utm_content', 'utm_medium', 'utm_source', 'utm_term', 'utm_type']

            var utm_parameters = {};
            var str = '';
            var key_str = '';
            var val_str = '';

            var quote_count = 0;

            for (var i = 0; i < utm_string.length; i++) {
                var c = utm_string.charAt(i);

                if (c == '"') {
                    if (quote_count > 0 && (utm_string.charAt(i - 1) == '\\')) {
                        str = str + c;

                    } else {
                        quote_count = quote_count + 1;

                        if (quote_count == 2) {
                            key_str = str;
                        }
                        if (quote_count == 4) {
                            val_str = str;
                            if ((utm_keys.indexOf(key_str) > -1) && (val_str != '')) {
                                utm_parameters[key_str] = val_str;
                            }
                            key_str = '';
                            val_str = '';
                            quote_count = 0;
                        }

                        str = '';
                    }
                }
                else {
                    if (quote_count != 0) {
                        str = str + c;
                    }
                }
            }
            return utm_parameters;

        }
    };

})(window);