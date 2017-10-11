class Admin::HomeController < Admin::BaseController
  layout "admin"

  before_action :set_page_meta_info
  before_action :parse_cookie, only: [:login, :authentication]
  before_action :step_1_logged_in?, only: [:login]
  before_action :step_2_logged_in?, only: [:login, :authentication]

  # Action for the home page index
  #
  # * Author: Aman
  # * Date: 09/10/2017
  # * Reviewed By:
  #
  def login
  end

  def authentication
  end

  def dashboard
  end


end
