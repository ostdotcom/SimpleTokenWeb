;
(function (window) {

  var oSTNs = ns("ost")

  var inputTypesEnum = {
        "textType"        : "text",
        "numberType"      : "number",
        "checkboxType"    : "checkbox",
        "radioType"       : "radio",
        "fileType"        : "file",
        "colorPicker"     : "colorPicker",
        "richTextEditor"  : "richTextEditor",
        "textArea"        : "textArea"
  };

  oSTNs.configuratorConfig = {

   // "sign_up" : {
   //   "collapses"  : {
   //     "header_options" : {
   //        "id"          : "#header_options",
   //        "header"      : "Header Options",
   //        "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
   //        "collapse"    : false ,
   //        "fields"      : {
   //          "masthead_logo" : {
   //            "label"       : "Masthead Logo",
   //            "tooltip"     : "Some tooltip",
   //            "inputType"   : inputTypesEnum.fileType
   //          },
   //          "resize_logo":  {
   //            "label"       : "Resize Logo (% value)",
   //            "tooltip"     : "Some tooltip",
   //            "inputType"   : inputTypesEnum.numberType
   //          },
   //          "favicon"   :   {
   //            "label"       : "Favicon",
   //            "tooltip"     : "Some tooltip",
   //            "inputType"   : inputTypesEnum.richTextEditor
   //          },
   //          "background_gradiant": {
   //            "label"       : "Favicon",
   //            "tooltip"     : "Some tooltip",
   //            "inputType"   : inputTypesEnum.colorPicker
   //          }
   //        }
   //     }
   //   }
   // },


   testComponents : {

     fileUploader   : {
       'label'          : "File Upload",
       'signed_url'     : "/api/admin/configurator/upload-params",
       'tooltip'        : "some tooltip",
       'title'          : "File Upload",
       "inputType"      : inputTypesEnum.fileType,

       //Backend
       'data_kind'      : "file",
       'data_key_name'  : "company_logo",
       'validation'     : {
         'min_bytes'      : '100',
         'max_bytes'      : '999999999999',
         'required'       : 1,
         'accept'         : ['image/jpg' , 'image/png']
       },

       //form_data
       'value'          : "dummy.path"
     },

     richTextEditor : {
       'label'          : "Rich text editor",
       'tooltip'        : "some tooltip",
       'title'          : "Rich text editor",
       'isDraggable'    : true,
       'isDelete'       : true,
       "inputType"      : inputTypesEnum.richTextEditor,

       //Backend
       'data_kind'      : "text",
       'data_key_name'  : "rich_text_editor",
       'validation'     : {
         'min_length'      : '1',
         'max_length'      : '200',
         'required'        : 1
       },
       //form_data
       'value'          : "asdhsajkd dasdaskjd"
     },

     coloPicker : {
       'label'          : "Color Picker",
       'tooltip'        : "some tooltip",
       "inputType"      : inputTypesEnum.colorPicker,

       //Backend
       'data_kind'      : "text",
       'data_key_name'  : "color_picker",
       'validation'     : {
         'required'        : 1
       },
       //form_data
       'value'          : "rba(255,255,255)"
     }

   }

  };

  oSTNs.configuratorConfig['getInputTypes'] =  function () {
    return inputTypesEnum;
  }

})(window);