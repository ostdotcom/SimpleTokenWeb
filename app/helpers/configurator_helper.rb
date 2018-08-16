module ConfiguratorHelper

  def is_theme_configurator?
    params[:action] == 'theme'
  end

  def is_register_configurator?
    params[:action] == 'register'
  end

  def is_kyc_configurator?
    params[:action] == 'kyc_form'
  end

  def is_dashboard_configurator?
    params[:action] == 'dashboard'
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

  def api_publish_url(entity_type)
    #TODO by pankaj
  end

  def api_reset_url(entity_type)
    #TODO by pankaj
  end

  def iframe_url(entity_type)
    "/admin/#{entity_type}/preview?#{get_config_params}"
  end

end