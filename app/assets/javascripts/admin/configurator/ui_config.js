;
(function (window) {

  var oSTNs = ns("ost") ,

     inputTypesEnum = {
        "text"            : "text",
        "number"          : "number",
        "radio"           : "radio",
        "file"            : "file",
        "colorPicker"     : "color_picker",
        "richTextEditor"  : "rich_text_editor",
        "textarea"        : "textarea",
        "toggle"          : "toggle"
     } ,

     inputTemplateMap = {
       "text"             : "#ost-input-text",
       "number"           : "#ost-input-number",
       "radio"            : "#ost-input-radio",
       "file"             : "#ost-input-file",
       "textarea"         : "#ost-input-textarea",
       "toggle"           : "#ost-input-toggle",
       "color_picker"     : "#ost-color-picker",
       "rich_text_editor" : "#ost-rich-text-editor"
     }
  ;


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

     inputText : {
       'label'          : "Text Input",
       'tooltip'        : "some tooltip",
       "inputType"      : inputTypesEnum.text,

       //Backend
       'data_kind'      : "text",
       'data_key_name'  : "text_input",
       'validation'     : {
         'required'        : 1
       },
       //form_data
       'value'          : "safsas safsafsaf"
     },

     inputNumber : {
       'label'          : "Number Input",
       'tooltip'        : "some tooltip",
       "inputType"      : inputTypesEnum.number,

       //Backend
       'data_kind'      : "number",
       'data_key_name'  : "number_input",
       'validation'     : {
         'required'        : 1
       },
       //form_data
       'value'          : 10
     },

     inputTextarea : {
       'label'          : "Textarea Input",
       'tooltip'        : "some tooltip",
       "inputType"      : inputTypesEnum.textarea,

       //Backend
       'data_kind'      : "text",
       'data_key_name'  : "textarea_input",
       'validation'     : {
         'required'        : 1
       },
       //form_data
       'value'          : "safsas safsafsaf"
     },

     fileUploader   : {
       'label'          : "File Upload",
       'signed_url'     : "/api/admin/configurator/upload-params",
       'tooltip'        : "some tooltip",
       'title'          : "File Upload",
       "inputType"      : inputTypesEnum.file,

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
       'value'          : "https://dxwfxs8b4lg24.cloudfront.net/ost/images/ost-news/ost-fanin.jpg"
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
       'value'          : "rgb(255,255,255)"
     },

     radioInput : {
       'label'          : "radioInput",
       'tooltip'        : "some tooltip",
       "inputType"      : inputTypesEnum.radio,
       options          : [
         {
           "label" : "Dark",
           "value" : "dark"
         },
         {
           "label" : "Light",
           "value" : "light"
         }
       ],

       //Backend
       'data_kind'      : "text",
       'data_key_name'  : "radio_input",
       'validation'     : {
         'required'        : 1
       },
       //form_data
       'value'          : "light"
     },

     toggleInput : {
       'label'          : "toggleInput",
       'tooltip'        : "some tooltip",
       "inputType"      : inputTypesEnum.toggle,

       //Backend
       'data_kind'      : "number",
       'data_key_name'  : "toggle_input",
       //form_data
       'value'          : 1
     }

   }

  };




  /*
  * Getters for private maps , cant be changed.
  * */
  oSTNs.configuratorConfig['getInputTypes'] =  function () {
    return inputTypesEnum;
  },

  oSTNs.configuratorConfig['getTemplateMap'] =  function () {
    return inputTemplateMap;
  }

})(window);