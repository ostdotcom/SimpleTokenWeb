module ConfiguratorHelper

  def is_theme_configurator?
    params[:action] == GlobalConstant::TemplateType.theme_template_type
  end

  def is_registration_configurator?
    params[:action] == GlobalConstant::TemplateType.registration_template_type
  end

  def is_kyc_configurator?
    params[:action] == GlobalConstant::TemplateType.kyc_template_type
  end

  def is_dashboard_configurator?
    params[:action] == GlobalConstant::TemplateType.dashboard_template_type
  end

  def is_first_configurator_page?
    is_theme_configurator?
  end

  def is_last_configurator_page?
    is_dashboard_configurator?
  end

  def get_config_params
    "gid=#{params[:gid]}&uuid=#{params[:uuid]}"
  end

  def api_get_url(entity_type)
    "/api/admin/configurator/#{entity_type}/config?#{get_config_params}"
  end

  def api_publish_url
    "/api/admin/configurator/publish-group?#{get_config_params}"
  end

  def api_reset_url(entity_type)
    "/api/admin/configurator/#{entity_type}/reset?#{get_config_params}"
  end

  def api_post_url(entity_type)
    "/api/admin/configurator/#{entity_type}/update?#{get_config_params}"
  end

  def iframe_url(entity_type)
    "/admin/#{entity_type}/preview?#{get_config_params}&accd_id=#{params[:accd_id]}"
  end

  def accordion_config(entity_type)
    case entity_type
      when GlobalConstant::TemplateType.theme_template_type
        {theme: 'theme'}
      when GlobalConstant::TemplateType.registration_template_type
        {registration: 'registration'}
      when GlobalConstant::TemplateType.kyc_template_type
        {kyc_form: 'kyc_form', form_popup: 'form_popup'}
      when GlobalConstant::TemplateType.dashboard_template_type
        {sale_live: 'sale_live', popup: 'popup', deposit_addr: 'deposit_addr'}
      else
        raise 'Invalid entity'
    end
  end

  def get_action_entity_type_mapping
    case params[:action]
      when 'theme'
        GlobalConstant::TemplateType.theme_template_type
      when 'register'
        GlobalConstant::TemplateType.registration_template_type
      when 'kyc_form'
        GlobalConstant::TemplateType.kyc_template_type
      when 'dashboard'
        GlobalConstant::TemplateType.dashboard_template_type
      else
        ''
    end
  end

  def is_active_accordion(accd_id)
    params[:accd_id].to_s.downcase == accd_id.to_s.downcase
  end

end