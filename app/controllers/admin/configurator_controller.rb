class Admin::ConfiguratorController < Admin::BaseController
  layout "configurator"

  #before_action :check_admin_cookie

  before_action :set_page_meta_info

  def register

  end

end
