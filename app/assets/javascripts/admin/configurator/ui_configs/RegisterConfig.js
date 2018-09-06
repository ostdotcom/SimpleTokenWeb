;
(function () {

  var oSTNs = ns("ost"),
      uiConfigConstants = ns("ost.uiConfigConstants"),
      inputTypesEnum = uiConfigConstants.getInputTypes()
  ;


  oSTNs.configuratorConfig = {
 
   "registration" : {
       "form_field_options" : {
          "header"      : "Policy Text Options",
          "tooltip"     : "Provide mandatory criteria for user registration consent. Example: I agree to the Terms & Conditions and Privacy Policy",
          "entities"    : [ "policy_texts" ],
         "footer"      : {
           template        : "#ost-add-component-footer",
           config : {
             componentToAdd  : "policy_texts",
             label : "Add Checkbox field"
           }
         }
       }
   },

   entityConfig : {

     policy_texts : {
       'label'          : "Policy Text + Link",
       'title'          : "Policy Text + Link",
       'tooltip'        : "Use this field to get consent from the customer regarding what you deem necessary. Ensure you provide the links for Terms & Conditions, Privacy Policy, etc. as required.",
       "inputType"      : inputTypesEnum.richTextEditor,
       'min_count'      : 1,
       'max_count'      : 5,
       'isDeleteEnabled': true
     }
   }

  };


})();