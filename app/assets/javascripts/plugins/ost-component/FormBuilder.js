;
(function (window, $) {

  var oSTNs             = ns("ost"),
    fileUploader        = ns('ost.fileUploader'),
    richTextEditor      = ns('ost.richTextEditor'),
    colorPicker         = ns('ost.colorPicker'),
    handlebarHelper     = ns('ost.handlebarHelper'),
    uiConfigConstants   = ns('ost.uiConfigConstants'),
    configuratorConfig  = ns('ost.configuratorConfig'),

    sectionsAttr        = uiConfigConstants.getSectionsAttr(),
    sCollapseWrapper    = uiConfigConstants.getSectionContentWrapper(),

    withFormData        = true,
    oThis
  ;

  oSTNs.formBuilder = oThis = {

    entityConfig: {},
    formData: {},

    entities: {},

    /* *
    * Builds the left panel configurator
    * params : data
    * Eg : { entityConfig : {} formData : {} }
    * */
    init: function ( data ) {
      oThis.entityConfig = data['entity_config'] || {};
      oThis.formData = data['form_data'] || {};
      oThis.buildSections();
      oThis.intComponents();
    },

    /*
     * Loops over all elements in dom with data attribute data-accordion-content
     * Get the data from UI config against the key present in data-accordion-content
     * from object configuratorConfig which is exposed in ost namespace. 
     */

    buildSections: function () {
      var jSections = $("[" + sectionsAttr + "]"),
        len = jSections.length, cnt,
        section
      ;
      if (!len) return;
      for (cnt = 0; cnt < len; cnt++) {
        section = jSections.eq(cnt);
        oThis.buildSection(section);
      }
    },

    /*
     *  Builds a function depending on jWrapper and jWrapper has the section key to the data from.
     *  params : jWrapper,
     *  Eg : data-accordion-content="kycForm"
     *  jWrapper Should have the above key.
     */
    buildSection: function (jWrapper) {
      var sectionKey = jWrapper && jWrapper.attr(sectionsAttr),
        sectionConfig = oThis.getSectionConfig(sectionKey),
        section, jMarkup
      ;
      if (!sectionConfig) return;
      for (var key in sectionConfig) {
        section = sectionConfig[key];
        jMarkup = oThis.getSectionMarkup(section);
        if (jMarkup) {
          jWrapper.append(jMarkup);
        }
      }
    },

    /*
    *  Builds DOM depending on the config passed.
    *  params : sectionConfig,
    *  returns : Markup
    */
    getSectionMarkup: function (sectionConfig) {
      if (!sectionConfig) return false;
      var entities = sectionConfig && sectionConfig.entities,
        sectionType, sTemplate, jSection, jMarkup
      ;
      sectionType = sectionConfig['section_type'];
      sTemplate = oThis.getSectionTemplate(sectionType);
      jMarkup = $(handlebarHelper.getMarkup(sTemplate, sectionConfig));
      if (entities) {
        jSection = $(jMarkup).find(sCollapseWrapper);
        oThis.buildEntities(jSection, entities);
      }
      return jMarkup[0];
    },


    /*
     * Build Entities of a section and appends to the jWrapper passedl
     *  params : jWrapper, entities ,
     *  returns : undefined
    */
    buildEntities: function (jWrapper, entities) {
      var len = entities && entities.length, cnt,
        jMarkup, entityKey
      ;
      if (!jWrapper || jWrapper.length == 0) return;
      for (cnt = 0; cnt < len; cnt++) {
        entityKey = entities[cnt];
        jMarkup = oThis.getBuildEntityMarkup(entityKey, withFormData);
        jWrapper.append(jMarkup);
      }
    },

   /*
    * Get entity markup depending on entity key
    *  params : entityKey, withFormData ,
    *  withFormData => need to consist of backend data or not.
    *  returns : Markup
    */
    getBuildEntityMarkup: function (entityKey, withFormData) {
      var entityConfig = oThis.getEntityConfig(entityKey, withFormData),
        dataKind = entityConfig && entityConfig['data_kind'],
        customCom = entityConfig && entityConfig['isCustom'],
        jMarkup = ""
      ;
      if (customCom) {
        jMarkup = oThis.getCustomComponent(entityConfig);
      } else if (dataKind == "array") {
        jMarkup = oThis.getArrayEntityMarkup(entityConfig)
      } else {
        jMarkup = oThis.getEntityMarkup(entityConfig);
      }
      return jMarkup;
    },


    /*
     * Get entity markup depending on entity key
     * params : entityKey, withFormData ,
     * withFormData => need to consist of backend data or not.
     * returns : Merged entity config of UI , Backend and FormData
     */
    getEntityConfig: function (entityKey, withFormData) {
      var entityConfig = oThis.getBEEntityConfig(entityKey),
        uiEntityConfig = oThis.getUIEntityConfig(entityKey),
        mergedConfig = oThis.getMergedEntity(uiEntityConfig, entityConfig)
      ;
      if (withFormData) {
        mergedConfig = oThis.getEntityConfigWithFormData(mergedConfig)
      }
      return mergedConfig;
    },


    /*
     * Get entity markup is the data-kind is any array,
     *  Builds entities for all value with same entity config with .
     * params : entityConfig
     * returns : Markup of all entities concatinated.
     */
    getArrayEntityMarkup: function (entityConfig) {
      var entityConfigCopy = $.extend({}, entityConfig),
        values = entityConfigCopy['value'],
        len = values && values.length, cnt,
        jMarkup = "", currVal
      ;
      if (!len) return;
      for (cnt = 0; cnt < len; cnt++) {
        currVal = values[cnt];
        entityConfigCopy['value'] = currVal;
        entityConfigCopy['count'] = cnt + 1;
        jMarkup = jMarkup.concat(oThis.getEntityMarkup(entityConfigCopy));
      }
      return jMarkup;
    },

    /*
    * Get entity markup is the data-kind is any array,
    * Builds entities .
    * params : entityConfig
    * returns : Markup.
    */
    getEntityMarkup: function (entityConfig) {
      var entityType = entityConfig['inputType'],
        sTemplate, jMarkup
      ;
      sTemplate = oThis.getComponentTemplate(entityType);
      jMarkup = handlebarHelper.getMarkup(sTemplate, entityConfig);
      return jMarkup;
    },

    getCustomComponent: function (entityConfig) {
      //overwrite and create markup for your won custom component.
    },

    getMergedEntity: function (uiEntityConfig, entityConfig) {
      var mergedEntityConfig = {};
      $.extend(mergedEntityConfig, uiEntityConfig, entityConfig);
      return mergedEntityConfig;
    },

    getEntityConfigWithFormData: function (entityConfig) {
      var dataKeyName = entityConfig && entityConfig['data_key_name'],
        formData = oThis.getFormData(dataKeyName)
      ;
      if (formData) {
        entityConfig['value'] = formData;
      }
      return entityConfig;
    },

    /*
     *  Depending on section type returns template by default collapse.
     *  params : sectionType,
     *  returns : template
    */
    getSectionTemplate: function ( sectionType ) {
      var getSectionTypesEnum = uiConfigConstants.getSectionTypesEnum(),
          sectionType         = sectionType || getSectionTypesEnum['collapse'],
          sectionTemplateMap  = uiConfigConstants.getSectionTemplateMap()
      ;
      return sectionTemplateMap[sectionType];
    },

    getSectionConfig: function (configKey) {
      return configuratorConfig[configKey];
    },

    getUIEntityConfig: function (entityKey) {
      return configuratorConfig['entityConfig'][entityKey];
    },

    getBEEntityConfig: function (entityKey) {
      return oThis.entityConfig[entityKey];
    },

    getFormData: function (entityKey) {
      return oThis.formData[entityKey];
    },

    getComponentTemplate: function (type) {
      var inputTypes = uiConfigConstants.getTemplateMap();
      return inputTypes[type];
    },

    intComponents: function () {
      fileUploader.bindButtonActions();
      richTextEditor.initTinyMc();
      colorPicker.initColorPricker();
      oThis.initToolTips();
      oThis.initLengthMocker();
    },

    initLengthMocker: function () {
      $('.mock-length').on('keyup change', function () {
        var jParent = $(this).closest('.form-group'),
          jMocker = jParent.find('.length-mocker'),
          jVal = $(this).val() || "",
          jTrimVal = jVal.trim(),
          jValLength = jTrimVal.length
        ;
        if (jMocker) {
          jMocker.html(jValLength);
        }
      });
    },

    initToolTips: function () {
      $('[data-toggle="tooltip"]').tooltip();
    }


  };


})(window, jQuery);