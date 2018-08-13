;
(function () {

  var oSTNs = ns("ost"),
      uiConfigConstants = ns("ost.uiConfigConstants"),
      inputTypesEnum = uiConfigConstants.getInputTypes()
  ;


  oSTNs.configuratorConfig = {
 
   "register_configuration" : {
     "collapses"  : {
       "form_field_options" : {
          "header"      : "Policy Text Options",
          "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
          "entities"    : [ "policy_text_link", "policy_link_color"]
       }
     }
   },

   entityConfig : {

     policy_text_link : {
       'label'          : "Policy Text + Link",
       'title'          : "Policy Text + Link",
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

     policy_link_color : {
       'label'          : "Policy Link Color",
       "inputType"      : inputTypesEnum.colorPicker,

       //Backend
       'data_kind'      : "text",
       'data_key_name'  : "color_picker",
       'validation'     : {
         'required'        : 1
       },
       //form_data
       'value'          : "rgb(255,255,255)"
     }

   }

  };


})();