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

end