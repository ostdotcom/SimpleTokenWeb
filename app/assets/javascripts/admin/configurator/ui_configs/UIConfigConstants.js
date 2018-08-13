;
(function () {

  var oSTNs = ns("ost") ,

    inputTypesEnum = {
      "text"            : "text",
      "number"          : "number",
      "radio"           : "radio",
      "file"            : "file",
      "colorPicker"     : "color_picker",
      "richTextEditor"  : "rich_text_editor",
      "textarea"        : "textarea",
      "toggle"          : "toggle",
      "addCheckbox"    : "add_checkbox"
    } ,
      inputTemplateMap = {}
    ;

  inputTemplateMap[inputTypesEnum.text]             = "#ost-input-text";
  inputTemplateMap[inputTypesEnum.number]           = "#ost-input-number";
  inputTemplateMap[inputTypesEnum.file]             = "#ost-input-file";
  inputTemplateMap[inputTypesEnum.textarea]         = "#ost-input-textarea";
  inputTemplateMap[inputTypesEnum.radio]            = "#ost-input-radio";
  inputTemplateMap[inputTypesEnum.toggle]           = "#ost-input-toggle";
  inputTemplateMap[inputTypesEnum.colorPicker]      = "#ost-color-picker";
  inputTemplateMap[inputTypesEnum.richTextEditor]   = "#ost-rich-text-editor";
  inputTemplateMap[inputTypesEnum.addCheckbox]      = "#ost-add-checkbox-filed";


  var  sectionTypesEnum = {
      "collapse" : "collapse"
    },
    sectionTemplateMap = {}
  ;

  sectionTemplateMap[sectionTypesEnum.collapse] = "#ost-collapse" ;

  oSTNs.uiConfigConstants = {};

  /*
  * Getters for private maps , cant be changed.
  */
  oSTNs.uiConfigConstants['getInputTypes'] =  function () {
    return inputTypesEnum;
  };

  oSTNs.uiConfigConstants['getTemplateMap'] =  function () {
    return inputTemplateMap;
  };

  oSTNs.uiConfigConstants['getSectionTypesEnum'] =  function () {
    return sectionTypesEnum;
  };

  oSTNs.uiConfigConstants['getSectionTemplateMap'] =  function () {
    return sectionTemplateMap;
  };

  oSTNs.uiConfigConstants['getSectionContentWrapper'] =  function () {
    return ".section-content-wrap" ;
  };

  oSTNs.uiConfigConstants['getSectionsAttr'] =  function () {
    return "data-accordion-content" ;
  };

})();