;
(function () {

  var oSTNs = ns("ost"),
      uiConfigConstants = ns("ost.uiConfigConstants"),
      inputTypesEnum = uiConfigConstants.getInputTypes()
  ;


  oSTNs.configuratorConfig = {
 
   "theme" : {
       "header_options" : {
          "header"      : "Header Options",
          "tooltip"     : "Use the options in this section to customize how your header will look across all pages and platforms.",
          "entities"    : [ "company_logo", "company_logo_size_percent", "company_favicon", "background_gradient" ]
       },
       "tracking_options" : {
         "header"      : "Tracking Options",
         "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
         "entities"    : [ "gtm_pixel_id", "fb_pixel_id", "fb_pixel_version" ]
       },
       "button_options" : {
         "header"      : "Button Options",
         "tooltip"     : "Use the options in this section to customize how your primary and secondary buttons will look across all pages and platforms.",
         "entities"    : [  "primary_button_text_color",
                            "primary_button_background_color",
                            "primary_button_border_color",
                            "primary_button_text_color_active",
                            "primary_button_background_color_active",
                            "primary_button_border_color_active",
                            "secondary_button_text_color",
                            "secondary_button_background_color",
                            "secondary_button_border_color",
                            "secondary_button_text_color_active",
                            "secondary_button_background_color_active",
                            "secondary_button_border_color_active"
                         ]
       },
       "footer_options" : {
         "header"      : "Footer Options",
         "tooltip"     : "Use the options in this section to customize how your footer will look across all pages and platforms.",
         "entities"    : [  "footer_background_color",
                            "footer_text_color",
                            "footer_text",
                            "terms_condition_link",
                            "footer_link_color" ]
       }
   },

   entityConfig : {

     company_logo : {
       'label'          : "Masthead Logo",
       'tooltip'        : "Upload your Company Logo. Image format: PNG, JPEG. (Max Width-250 px)",
       'signed_url'     : "/api/admin/configurator/upload-params",
       'title'          : "File Upload",
       "inputType"      : inputTypesEnum.file
     },

     company_logo_size_percent : {
       'label'          : "Resize Logo (% value)",
       'tooltip'        : "",
       "inputType"      : inputTypesEnum.number
     },

     company_favicon   : {
       'label'          : "Favicon",
       'signed_url'     : "/api/admin/configurator/upload-params",
       'tooltip'        : "Use a square image for best results. (Max 200KB, JPG/PNG only.)",
       'title'          : "File Upload",
       "inputType"      : inputTypesEnum.file
     },

     background_gradient : {
       'label'          : "Background Gradient Color",
       "inputType"      : inputTypesEnum.colorGradient,
       'data_kind'      : "array"
     },

     gtm_pixel_id : {
       'label'          : "Google Tag Manager Pixel ID",
       'tooltip'        : "Enter the GTM ID in case tracking is needed. This is a non-mandatory field.",
       "inputType"      : inputTypesEnum.textarea,
       'placeHolder'    : "<enter text here>"
     },

     fb_pixel_id : {
       'label'          : "Facebook Pixel ID",
       'tooltip'        : "Enter the FB ID in case tracking is needed. This is a non-mandatory field.",
       "inputType"      : inputTypesEnum.textarea,
       'placeHolder'    : "<enter text here>"
     },

     fb_pixel_version : {
       'label'          : "Facebook Pixel Version",
       'tooltip'        : "Enter FB tracking version (2.0 is the default). This is a non-mandatory field.",
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
       'label'          : "Primary Button Text Color - Hover",
       'tooltip'        : "",
       "inputType"      : inputTypesEnum.colorPicker
     },

     primary_button_background_color_active : {
       'label'          : "Primary Button Background - Hover",
       'tooltip'        : "",
       "inputType"      : inputTypesEnum.colorPicker
     },

     primary_button_border_color_active : {
       'label'          : "Primary Button Border - Hover",
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
       'label'          : "Secondary Button Text Color - Hover",
       'tooltip'        : "",
       "inputType"      : inputTypesEnum.colorPicker
     },

     secondary_button_background_color_active : {
       'label'          : "Secondary Button Background - Hover",
       'tooltip'        : "",
       "inputType"      : inputTypesEnum.colorPicker
     },

     secondary_button_border_color_active : {
       'label'          : "Secondary Button Border - Hover",
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
       'tooltip'        : "Example: Copyright © 2018 Company Name. All Rights Reserved. Terms and Conditions & Privacy Policy. Remember to append the link by using the URL option provided.",
       'title'          : "Footer Text + Link",
       "inputType"      : inputTypesEnum.richTextEditor
     },

     terms_condition_link : {
       'label'          : "Terms & Conditions Link",
       'tooltip'        : "Enter the link to the Company Terms and Conditions separately for verification purposes.",
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