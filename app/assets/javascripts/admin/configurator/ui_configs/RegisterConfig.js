;
(function () {

  var oSTNs = ns("ost"),
      uiConfigConstants = ns("ost.uiConfigConstants"),
      inputTypesEnum = uiConfigConstants.getInputTypes()
  ;


  oSTNs.configuratorConfig = {
 
   "register_configuration" : {
       "form_field_options" : {
          "header"      : "Policy Text Options",
          "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
          "entities"    : [ "policy_text", "policy_text_link_color"]
       }
   },

   entityConfig : {

     policy_text : {
       'label'          : "Policy Text + Link",
       'title'          : "Policy Text + Link",
       "inputType"      : inputTypesEnum.richTextEditor
     },

     policy_text_link_color : {
       'label'          : "Policy Link Color",
       "inputType"      : inputTypesEnum.colorPicker
     }

   }

  };


})();