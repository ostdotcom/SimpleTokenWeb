;
(function () {

  var oSTNs = ns("ost"),
      uiConfigConstants = ns("ost.uiConfigConstants"),
      inputTypesEnum = uiConfigConstants.getInputTypes()
  ;


  oSTNs.configuratorConfig = {
 
   "kyc_configuration" : {
     "collapses"  : {
       "form_field_options" : {
          "header"      : "Form Field Options",
          "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
          "entities"    : [ "title", "subtitle", "ethereum_address_instruction", "identification_document_instruction"]
       }
     }
   },

   entityConfig : {

     title : {
       'label'          : "Title",
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

     subtitle : {
       'label'          : "Subtitle",
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

     ethereum_address_instruction : {
       'label'          : "Ethereum Address Instruction Text",
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

     identification_document_instruction : {
       'label'          : "Identification Document Instruction Text",
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
     }

   }

  };


})();