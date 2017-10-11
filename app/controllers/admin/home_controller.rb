class Admin::HomeController < Admin::BaseController
  layout "admin"

  before_action :set_page_meta_info

  # TODO: Rework on this step
  before_action :parse_cookie, only: [:login, :authentication]
  before_action :step_1_logged_in?, only: [:login]
  before_action :step_2_logged_in?, only: [:login, :authentication]

  # Admin login
  #
  # * Author: Aman
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def login
  end

  # Admin login mfa
  #
  # * Author: Aman
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def authentication
  end

  # Admin dashboard
  #
  # * Author: Aman
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def dashboard
  end


end
