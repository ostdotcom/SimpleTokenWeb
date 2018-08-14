;
(function () {

  var oSTNs = ns("ost"),
      uiConfigConstants = ns("ost.uiConfigConstants"),
      inputTypesEnum = uiConfigConstants.getInputTypes()
  ;


  oSTNs.configuratorConfig = {
 
   "sale_live_dashboard_configuration" : {
       "top_banner_options" : {
          "header"      : "Top Banner Options",
          "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
          "entities"    : [ "dashboard_title_text_color", "sale_timer_text_color", "sale_timer_background_gradient" ]
       },
       "middle_banner_options" : {
         "header"      : "Middle Banner Options",
         "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
         "entities"    : [ "dashboard_middle_banner_text_color", "dashboard_middle_banner_background" ]
       },
       "bottom_banner_options" : {
         "header"      : "Bottom Banner Options",
         "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
         "entities"    : [ "dashboard_bottom_banner_text_color", "dashboard_bottom_banner_background" ]
       },
       "telegram_options" : {
         "header"      : "Telegram Options",
         "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
         "entities"    : [ "telegram_button_theme", "telegram_link" ]
       }
   },
    deposit_address_popup: {
        "popup_options" : {
          "header"      : "Pop-Up Options",
          "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
          "entities"    : [ "show_pop_up", "ethereum_deposit_popup_checkboxes" ]
        }
    },
    deposit_address_user_dashboard: {
        "popup_options" : {
          "header"      : "Deposit Address User Dashboard",
          "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
          "entities"    : [ "dashboard_middle_banner_title_text", "dashboard_middle_banner_body_text" ]
        }
    },

   entityConfig : {

     dashboard_title_text_color : {
       'label'          : "Title Text Color",
       "inputType"      : inputTypesEnum.colorPicker
     },

     sale_timer_text_color : {
       'label'          : "Timer Text Color",
       "inputType"      : inputTypesEnum.colorPicker
     },

     sale_timer_background_gradient : {
       'label'          : "Timer Gradient Color",
       "inputType"      : inputTypesEnum.colorGradient
     },

     dashboard_middle_banner_text_color : {
       'label'          : "Middle Banner Text Color",
       "inputType"      : inputTypesEnum.colorPicker
     },

     dashboard_middle_banner_background : {
       'label'          : "Middle Banner Background",
       "inputType"      : inputTypesEnum.colorPicker
     },

     dashboard_bottom_banner_text_color : {
       'label'          : "Bottom Banner Text Color",
       "inputType"      : inputTypesEnum.colorPicker
     },

     dashboard_bottom_banner_background : {
       'label'          : "Bottom Banner Background",
       "inputType"      : inputTypesEnum.colorPicker
     },

     telegram_button_theme : {
       'label'          : "Telegram Button Theme",
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
       ]
     },

     telegram_link : {
       'label'          : "Telegram Link",
       'tooltip'        : "some tooltip",
       "inputType"      : inputTypesEnum.textarea,
       'placeHolder'    : "https://ost.com/terms"
     },

     show_pop_up : {
       'label'          : "Show Pop-Up",
       'tooltip'        : "some tooltip",
       "inputType"      : inputTypesEnum.toggle,

       //Backend
       'data_kind'      : "number",
       'data_key_name'  : "toggle_input",
       //form_data
       'value'          : 1
     },

     ethereum_deposit_popup_checkboxes : {
       'label'          : "Checkbox",
       'title'          : "Footer Text + Link",
       "inputType"      : inputTypesEnum.richTextEditor,
       'isDraggable'    : true,
       'isDeleteEnabled': true
     },

     dashboard_middle_banner_title_text : {
       'label'          : "Middle Banner Title Text",
       "inputType"      : inputTypesEnum.textarea,
       'placeHolder'    : "<enter text here>"
     },

     dashboard_middle_banner_body_text : {
       'label'          : "Middle Banner Body Text",
       'title'          : "Middle Banner Body Text",
       "inputType"      : inputTypesEnum.richTextEditor
     }

   }

  };


})();