;
(function () {

  var oSTNs = ns("ost"),
      uiConfigConstants = ns("ost.uiConfigConstants"),
      inputTypesEnum = uiConfigConstants.getInputTypes()
  ;


  oSTNs.configuratorConfig = {
 
   "theme_configuration" : {
     "collapses"  : {
       "header_options" : {
          "header"      : "Header Options",
          "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
          "entities"    : [ "mast_head_logo", "resize_logo", "fav_icon", "top_gradient_color_picker", "bottom_gradient_color_picker" ]
       },
       "tracking_options" : {
         "header"      : "Tracking Options",
         "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
         "entities"    : [ "gtm_pixel_id", "fb_pixel_id", "fb_pixel_version" ]
       },
       "button_options" : {
         "header"      : "Button Options",
         "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
         "entities"    : [ "primary_button_text_color", "primary_button_background", "primary_button_border",
                           "primary_button_text_color_on_active", "primary_button_background_on_active", "primary_button_border_on_active",
                           "secondary_button_text_color", "secondary_button_background", "secondary_button_border",
                           "secondary_button_text_color_on_active", "secondary_button_background_on_active", "secondary_button_border_on_active"
                         ]
       },
       "footer_options" : {
         "header"      : "Footer Options",
         "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
         "entities"    : [ "footer_background", "footer_text_color", "footer_text_link", "terms_conditions_link", "footer_link_color" ]
       }
     }
   },

   entityConfig : {

     mast_head_logo : {
       'label'          : "Masthead Logo",
       'tooltip'        : "Use a square image for best results. (Min 200KB, Max 1GB, JPG/PNG only.)",
       'signed_url'     : "/api/admin/configurator/upload-params",
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
       }
     },

     resize_logo : {
       'label'          : "Resize Logo (% value)",
       'tooltip'        : "",
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

     fav_icon   : {
       'label'          : "Favicon",
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

     top_gradient_color_picker : {
       'label'          : "Background Top Gradient Color",
       'tooltip'        : "",
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

     bottom_gradient_color_picker : {
       'label'          : "Background Bottom Gradient Color",
       'tooltip'        : "",
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

     gtm_pixel_id : {
       'label'          : "GTM Pixel ID",
       'tooltip'        : "some tooltip",
       "inputType"      : inputTypesEnum.textarea,
       'placeHolder'    : "<enter text here>",

       //Backend
       'data_kind'      : "text",
       'data_key_name'  : "textarea_input",
       'validation'     : {
         'required'        : 1
       },
       //form_data
       'value'          : ""
     },

     fb_pixel_id : {
       'label'          : "FB Pixel ID",
       'tooltip'        : "some tooltip",
       "inputType"      : inputTypesEnum.textarea,
       'placeHolder'    : "<enter text here>",

       //Backend
       'data_kind'      : "text",
       'data_key_name'  : "textarea_input",
       'validation'     : {
         'required'        : 1
       },
       //form_data
       'value'          : ""
     },

     fb_pixel_version : {
       'label'          : "FB Pixel Version",
       'tooltip'        : "some tooltip",
       "inputType"      : inputTypesEnum.textarea,
       'placeHolder'    : "<enter text here>",

       //Backend
       'data_kind'      : "text",
       'data_key_name'  : "textarea_input",
       'validation'     : {
         'required'        : 1
       },
       //form_data
       'value'          : ""
     },

     primary_button_text_color : {
       'label'          : "Primary Button Text Color",
       'tooltip'        : "",
       "inputType"      : inputTypesEnum.colorPicker,

       //Backend
       'data_kind'      : "text",
       'data_key_name'  : "color_picker",
       'validation'     : {
         'required'        : 1
       },
       //form_data
       'value'          : "rgb(255,1,255)"
     },

     primary_button_background : {
       'label'          : "Primary Button Background",
       'tooltip'        : "",
       "inputType"      : inputTypesEnum.colorPicker,

       //Backend
       'data_kind'      : "text",
       'data_key_name'  : "color_picker",
       'validation'     : {
         'required'        : 1
       },
       //form_data
       'value'          : "rgb(255,255,0)"
     },

     primary_button_border : {
       'label'          : "Primary Button Border",
       'tooltip'        : "",
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

     primary_button_text_color_on_active : {
       'label'          : "Primary Button Text Color - on Active",
       'tooltip'        : "",
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

     primary_button_background_on_active : {
       'label'          : "Primary Button Background - on Active",
       'tooltip'        : "",
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

     primary_button_border_on_active : {
       'label'          : "Primary Button Border - on Active",
       'tooltip'        : "",
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

     secondary_button_text_color : {
       'label'          : "Secondary Button Text Color",
       'tooltip'        : "",
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

     secondary_button_background : {
       'label'          : "Secondary Button Background",
       'tooltip'        : "",
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

     secondary_button_border : {
       'label'          : "Secondary Button Border",
       'tooltip'        : "",
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

     secondary_button_text_color_on_active : {
       'label'          : "Secondary Button Text Color - on Active",
       'tooltip'        : "",
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

     secondary_button_background_on_active : {
       'label'          : "Secondary Button Background - on Active",
       'tooltip'        : "",
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

     secondary_button_border_on_active : {
       'label'          : "Secondary Button Border - on Active",
       'tooltip'        : "",
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

     footer_background: {
       'label'          : "Footer Background",
       'tooltip'        : "",
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

     footer_text_color: {
       'label'          : "Footer Text Color",
       'tooltip'        : "",
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

     footer_text_link : {
       'label'          : "Footer Text + Link",
       'tooltip'        : "some tooltip",
       'title'          : "Footer Text + Link",
       "inputType"      : inputTypesEnum.richTextEditor,

       //Backend
       'data_kind'      : "text",
       'data_key_name'  : "rich_text_editor",
       'validation'     : {
         'min_length'      : '1',
         'max_length'      : '150',
         'required'        : 1
       },
       //form_data
       'value'          : ["kjbjkb"]
     },

     terms_conditions_link : {
       'label'          : "Terms & Conditions Link",
       'tooltip'        : "some tooltip",
       "inputType"      : inputTypesEnum.textarea,
       'placeHolder'    : "https://ost.com/terms",

       //Backend
       'data_kind'      : "text",
       'data_key_name'  : "textarea_input",
       'validation'     : {
         'required'        : 1
       },
       //form_data
       'value'          : ""
     },

     footer_link_color: {
       'label'          : "Footer Link Color",
       'tooltip'        : "",
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

     inputText : {
       'label'          : "Text Input",
       'tooltip'        : "Use a square image for best results. (Min 200KB, Max 1GB, JPG/PNG only.)",
       "inputType"      : inputTypesEnum.text,
       'placeHolder'    : "<enter text here>",

       //Backend
       'data_kind'      : "text",
       'data_key_name'  : "text_input",
       'validation'     : {
         'required'        : 1
       },
       //form_data
       'value'          : ""

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
       'placeHolder'    : "<enter text here>",

       //Backend
       'data_kind'      : "text",
       'data_key_name'  : "textarea_input",
       'validation'     : {
         'required'        : 1
       },
       //form_data
       'value'          : ""

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
       'isDeleteEnabled': true,
       "inputType"      : inputTypesEnum.richTextEditor,

       //Backend
       'data_kind'      : "array",
       'data_key_name'  : "rich_text_editor",
       'validation'     : {
         'min_length'      : '1',
         'max_length'      : '200',
         'required'        : 1
       },
       //form_data
       'value'          : ["kjbjkb", "jhgjhghj", "hgfuyg uyuyg uy"]
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


})();