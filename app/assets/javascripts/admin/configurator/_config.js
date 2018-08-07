;
(function (window) {

  var oSTNs = ns("ost"),
      oThis;

  var inputTypesEnum = {
        "textType"        : "text",
        "numberType"      : "number",
        "checkboxType"    : "checkbox",
        "radioType"       : "radio",
        "fileType"        : "file",
        "colorPicker"     : "colorPicker",
        "richTextEditor"  : "richTextEditor"
  };

  oSTNs.configuratorConfig = {

   "sign_up" : {
     "collapses"  : {
       "header_options" : {
          "id"          : "#header_options",
          "header"      : "Header Options",
          "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
          "collapse"    : false ,
          "fields"      : {
            "masthead_logo" : {
              "label"       : "Masthead Logo",
              "tooltip"     : "Some tooltip",
              "inputType"   : inputTypesEnum.fileType
            },
            "resize_logo":  {
              "label"       : "Resize Logo (% value)",
              "tooltip"     : "Some tooltip",
              "inputType"   : inputTypesEnum.numberType
            },
            "favicon"   :   {
              "label"       : "Favicon",
              "tooltip"     : "Some tooltip",
              "inputType"   : inputTypesEnum.richTextEditor
            },
            "background_gradiant": {
              "label"       : "Favicon",
              "tooltip"     : "Some tooltip",
              "inputType"   : inputTypesEnum.colorPicker
            }
          }
       }
     }
   }




  };

})(window);