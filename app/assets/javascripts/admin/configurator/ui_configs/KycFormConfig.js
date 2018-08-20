;
(function () {

  var oSTNs = ns("ost"),
      uiConfigConstants = ns("ost.uiConfigConstants"),
      inputTypesEnum = uiConfigConstants.getInputTypes()

  ;


  oSTNs.configuratorConfig = {
 
   "kyc_form" : {
       "kyc_configuration" : {
          "header"      : "Form Field Options",
          "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
          "entities"    : [ "kyc_form_title", "kyc_form_subtitle", "eth_address_instruction_text", "document_id_instruction_text"]
       }
   },
    "form_popup" : {
        "popup_kyc_configuration" : {
          "header"      : "Pop-up Options",
          "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
          "entities"    : [ "show_pop_up" , "kyc_form_popup_checkboxes"],
          "footer"      : {
            template        : "#ost-add-component-footer",
            config : {
              componentToAdd  : "kyc_form_popup_checkboxes",
              label : "Add Checkbox field"
            }
          }
        }
    },

   entityConfig : {

     kyc_form_title : {
       'label'          : "Title",
       "inputType"      : inputTypesEnum.textarea,
       'placeHolder'    : "<enter text here>"
     },

     kyc_form_subtitle : {
       'label'          : "Subtitle",
       "inputType"      : inputTypesEnum.textarea,
       'placeHolder'    : "<enter text here>"
     },

     eth_address_instruction_text : {
       'label'          : "Ethereum Address Instruction Text",
       'title'          : "Ethereum Address Instruction Text",
       "inputType"      : inputTypesEnum.richTextEditor
     },

     document_id_instruction_text : {
       'label'          : "Identification Document Instruction Text",
       'title'          : "Footer Text + Link",
       "inputType"      : inputTypesEnum.richTextEditor
     },

     show_pop_up : {
       'label'          : "Show Pop-Up",
       'tooltip'        : "some tooltip",
       "inputType"      : inputTypesEnum.toggle,
       "data_key_name"  : "show_pop_up",
       "toggleOnValue"  : 1,
       "toggleOffValue"  : 0
     },

     kyc_form_popup_checkboxes : {
       'label'          : "Checkbox",
       'title'          : "Footer Text + Link",
       "inputType"      : inputTypesEnum.richTextEditor,
       'isDeleteEnabled': true,
       'data_kind'      : "array"
     }

   }

  };


})();