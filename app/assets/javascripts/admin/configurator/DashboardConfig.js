;
(function () {

  var oSTNs = ns("ost"),
      uiConfigConstants = ns("ost.uiConfigConstants"),
      inputTypesEnum = uiConfigConstants.getInputTypes()
  ;


  oSTNs.configuratorConfig = {
 
   "sale_live_dashboard_configuration" : {
     "collapses"  : {
       "top_banner_options" : {
          "header"      : "Top Banner Options",
          "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
          "entities"    : [ "title_text_color", "timer_text_color", "timer_top_gradient", "timer_bottom_gradient" ]
       },
       "middle_banner_options" : {
         "header"      : "Middle Banner Options",
         "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
         "entities"    : [ "middle_banner_text_color", "middle_banner_background" ]
       },
       "bottom_banner_options" : {
         "header"      : "Bottom Banner Options",
         "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
         "entities"    : [ "bottom_banner_text_color", "bottom_banner_background" ]
       },
       "telegram_options" : {
         "header"      : "Telegram Options",
         "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
         "entities"    : [ "telegram_button_theme", "telegram_link" ]
       }
     }
   },
    deposit_address_popup: {
      "collapses"  : {
        "popup_options" : {
          "header"      : "Pop-Up Options",
          "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
          "entities"    : [ "show_pop_up", "review_confirm", "add_checkbox_field" ]
        }
      }
    },
    deposit_address_user_dashboard: {
      "collapses"  : {
        "popup_options" : {
          "header"      : "Deposit Address User Dashboard",
          "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
          "entities"    : [ "middle_banner_title_text", "middle_banner_body_text" ]
        }
      }
    },

   entityConfig : {

     title_text_color : {
       'label'          : "Title Text Color",
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

     timer_text_color : {
       'label'          : "Timer Text Color",
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

     timer_top_gradient : {
       'label'          : "Timer Top Gradient Color",
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

     timer_bottom_gradient : {
       'label'          : "Timer Bottom Gradient Color",
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

     middle_banner_text_color : {
       'label'          : "Middle Banner Text Color",
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

     middle_banner_background : {
       'label'          : "Middle Banner Background",
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

     bottom_banner_text_color : {
       'label'          : "Bottom Banner Text Color",
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

     bottom_banner_background : {
       'label'          : "Bottom Banner Background",
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

     telegram_link : {
       'label'          : "Telegram Link",
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

     review_confirm : {
       'label'          : "Checkbox",
       'title'          : "Footer Text + Link",
       "inputType"      : inputTypesEnum.richTextEditor,
       'isDraggable'    : true,
       'isDeleteEnabled': true,
       //Backend
       'data_kind'      : "array",
       'data_key_name'  : "rich_text_editor",
       'validation'     : {
         'min_length'      : '1',
         'max_length'      : '150',
         'required'        : 1
       },
       //form_data
       'value'          : ["fafas asfasf afasfas f" , "sfddsfdsf dfdsf " , "dsfdsfds, fdsfdsf"]
     },

     add_checkbox_field : {
       'label'          : "Add Checkbox Field",
       "inputType"      : inputTypesEnum.addCheckbox,

       //Backend
       'data_kind'      : "number",
       'data_key_name'  : "toggle_input",
       //form_data
       'value'          : 1
     },

     middle_banner_title_text : {
       'label'          : "Middle Banner Title Text",
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

     middle_banner_body_text : {
       'label'          : "Middle Banner Body Text",
       'title'          : "Middle Banner Body Text",
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
       'value'          : ["fafas asfasf afasfas f"]
     }

   }

  };


})();