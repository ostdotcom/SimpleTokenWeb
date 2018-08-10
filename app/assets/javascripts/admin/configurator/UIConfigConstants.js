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
      "toggle"          : "toggle"
    } ,

    inputTemplateMap = {
      "text"             : "#ost-input-text",
      "number"           : "#ost-input-number",
      "radio"            : "#ost-input-radio",
      "file"             : "#ost-input-file",
      "textarea"         : "#ost-input-textarea",
      "toggle"           : "#ost-input-toggle",
      "color_picker"     : "#ost-color-picker",
      "rich_text_editor" : "#ost-rich-text-editor"
    }
  ;

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

})();