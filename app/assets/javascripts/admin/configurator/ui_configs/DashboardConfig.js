;
(function () {

  var oSTNs = ns("ost"),
      uiConfigConstants = ns("ost.uiConfigConstants"),
      inputTypesEnum = uiConfigConstants.getInputTypes()
  ;


  oSTNs.configuratorConfig = {
 
   "sale_live" : {
       "top_banner_options" : {
          "header"      : "Top Banner Options",
          "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
          "entities"    : [ "dashboard_title_text_color", "sale_timer_text_color", "sale_timer_background_gradient" ]
       },
       "middle_banner_options" : {
         "header"      : "Middle Banner Options",
         "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
         "entities"    : [ "dashboard_middle_banner_text_color", "dashboard_middle_banner_background" , "dashboard_middle_banner_link_color" ]
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
    "popup": {
        "popup_options" : {
          "header"      : "Pop-Up Options",
          "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
          "entities"    : [ "show_ethereum_address_confirm_popup", "ethereum_deposit_popup_checkboxes" ],
          "footer"      : {
            template        : "#ost-add-component-footer",
            config          : {
              componentToAdd  : "ethereum_deposit_popup_checkboxes",
              label           : "Add Checkbox field"
            }
          }
        }
    },
    "deposit_addr": {
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

     show_ethereum_address_confirm_popup : {
       'label'          : "Show Pop-Up",
       'tooltip'        : "some tooltip",
       "inputType"      : inputTypesEnum.toggle,
       "toggleOnValue"  : 1,
       "toggleOffValue"  : 0
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
     },

     dashboard_middle_banner_link_color : {
       'label'          : "Middle Banner Link Color",
       "inputType"      : inputTypesEnum.colorPicker
     }

   }

  };


})();