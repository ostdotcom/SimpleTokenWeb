;
(function () {

  var oSTNs = ns("ost"),
      uiConfigConstants = ns("ost.uiConfigConstants"),
      inputTypesEnum = uiConfigConstants.getInputTypes()
  ;


  oSTNs.configuratorConfig = {
 
   "theme_configuration" : {
       "header_options" : {
          "header"      : "Header Options",
          "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
          "entities"    : [ "company_logo", "company_logo_size_percent", "company_favicon", "background_gradient" ]
       },
       "tracking_options" : {
         "header"      : "Tracking Options",
         "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
         "entities"    : [ "gtm_pixel_id", "fb_pixel_id", "fb_pixel_version" ]
       },
       "button_options" : {
         "header"      : "Button Options",
         "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
         "entities"    : [ "primary_button_text_color", "primary_button_background_color", "primary_button_border_color",
                           "primary_button_text_color_active", "primary_button_background_color_active", "primary_button_border_color_active",
                           "secondary_button_text_color", "secondary_button_background_color", "secondary_button_border_color",
                           "secondary_button_text_color_active", "secondary_button_background_color_active", "secondary_button_border_color_active"
                         ]
       },
       "footer_options" : {
         "header"      : "Footer Options",
         "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
         "entities"    : [ "footer_background_color", "footer_text_color", "footer_text", "terms_condition_link", "footer_link_color" ]
       }
   },

   entityConfig : {

     company_logo : {
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

     company_logo_size_percent : {
       'label'          : "Resize Logo (% value)",
       'tooltip'        : "",
       "inputType"      : inputTypesEnum.number,
     },

     company_favicon   : {
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

     background_gradient : {
       'label'          : "Background Gradient Color",
       "inputType"      : inputTypesEnum.colorGradient
     },

     gtm_pixel_id : {
       'label'          : "GTM Pixel ID",
       'tooltip'        : "some tooltip",
       "inputType"      : inputTypesEnum.textarea,
       'placeHolder'    : "<enter text here>"
     },

     fb_pixel_id : {
       'label'          : "FB Pixel ID",
       'tooltip'        : "some tooltip",
       "inputType"      : inputTypesEnum.textarea,
       'placeHolder'    : "<enter text here>"
     },

     fb_pixel_version : {
       'label'          : "FB Pixel Version",
       'tooltip'        : "some tooltip",
       "inputType"      : inputTypesEnum.textarea,
       'placeHolder'    : "<enter text here>"
     },

     primary_button_text_color : {
       'label'          : "Primary Button Text Color",
       'tooltip'        : "",
       "inputType"      : inputTypesEnum.colorPicker
     },

     primary_button_background_color : {
       'label'          : "Primary Button Background",
       'tooltip'        : "",
       "inputType"      : inputTypesEnum.colorPicker
     },

     primary_button_border_color : {
       'label'          : "Primary Button Border",
       'tooltip'        : "",
       "inputType"      : inputTypesEnum.colorPicker
     },

     primary_button_text_color_active : {
       'label'          : "Primary Button Text Color - on Active",
       'tooltip'        : "",
       "inputType"      : inputTypesEnum.colorPicker
     },

     primary_button_background_color_active : {
       'label'          : "Primary Button Background - on Active",
       'tooltip'        : "",
       "inputType"      : inputTypesEnum.colorPicker
     },

     primary_button_border_color_active : {
       'label'          : "Primary Button Border - on Active",
       'tooltip'        : "",
       "inputType"      : inputTypesEnum.colorPicker
     },

     secondary_button_text_color : {
       'label'          : "Secondary Button Text Color",
       'tooltip'        : "",
       "inputType"      : inputTypesEnum.colorPicker
     },

     secondary_button_background_color : {
       'label'          : "Secondary Button Background",
       'tooltip'        : "",
       "inputType"      : inputTypesEnum.colorPicker
     },

     secondary_button_border_color : {
       'label'          : "Secondary Button Border",
       'tooltip'        : "",
       "inputType"      : inputTypesEnum.colorPicker
     },

     secondary_button_text_color_active : {
       'label'          : "Secondary Button Text Color - on Active",
       'tooltip'        : "",
       "inputType"      : inputTypesEnum.colorPicker
     },

     secondary_button_background_color_active : {
       'label'          : "Secondary Button Background - on Active",
       'tooltip'        : "",
       "inputType"      : inputTypesEnum.colorPicker
     },

     secondary_button_border_color_active : {
       'label'          : "Secondary Button Border - on Active",
       'tooltip'        : "",
       "inputType"      : inputTypesEnum.colorPicker
     },

     footer_background_color: {
       'label'          : "Footer Background",
       'tooltip'        : "",
       "inputType"      : inputTypesEnum.colorPicker
     },

     footer_text_color: {
       'label'          : "Footer Text Color",
       'tooltip'        : "",
       "inputType"      : inputTypesEnum.colorPicker
     },

     footer_text : {
       'label'          : "Footer Text + Link",
       'tooltip'        : "some tooltip",
       'title'          : "Footer Text + Link",
       "inputType"      : inputTypesEnum.richTextEditor
     },

     terms_condition_link : {
       'label'          : "Terms & Conditions Link",
       'tooltip'        : "some tooltip",
       "inputType"      : inputTypesEnum.textarea,
       'placeHolder'    : "https://ost.com/terms"
     },

     footer_link_color: {
       'label'          : "Footer Link Color",
       'tooltip'        : "",
       "inputType"      : inputTypesEnum.colorPicker
     }

   }

  };


})();