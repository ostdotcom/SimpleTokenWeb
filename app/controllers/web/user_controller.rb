class Web::UserController < Web::BaseController

  layout "web"

  before_action :delete_user_cookie, only: [:sign_up, :login, :reset_password, :change_password]
  before_action :check_user_cookie, except: [:sign_up, :login, :reset_password, :change_password]

  before_action :set_page_meta_info


  # Sign up
  #
  # * Author: Tahir
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def sign_up
  end

  # Login
  #
  # * Author: Tahir
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def login
  end

  # Reset password
  #
  # * Author: Tahir
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def reset_password
  end

  # Change password
  #
  # * Author: Tahir
  # * Date: 10/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def change_password
  end

  # KYC form
  #
  # * Author: Tahir
  # * Date: 10/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def kyc_form

    service_response = SimpleTokenApi::Request::User.new(request.cookies, {"STW_FORWARD_USER_AGENT" => http_user_agent }).basic_detail

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    @user = service_response.data["user"]
    redirect_if_step_not_reachable(@user["user_token_sale_state"], GlobalConstant::TokenSaleUserState.kyc_page_allowed_states)

  end

  # Branded token form
  #
  # * Author: Tahir
  # * Date: 10/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def branded_token_form
    service_response = SimpleTokenApi::Request::User.new(request.cookies, {"STW_FORWARD_USER_AGENT" => http_user_agent}).basic_detail

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    @user = service_response.data["user"]
    redirect_if_step_not_reachable(@user["user_token_sale_state"],GlobalConstant::TokenSaleUserState.bt_page_allowed_states)
  end

  # Branded token form
  #
  # * Author: Tahir
  # * Date: 10/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def verification_link
    service_response = SimpleTokenApi::Request::User.new(request.cookies, {"STW_FORWARD_USER_AGENT" => http_user_agent}).basic_detail

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    @user = service_response.data["user"]
    redirect_if_step_not_reachable(@user["user_token_sale_state"], GlobalConstant::TokenSaleUserState.verification_page_allowed_states)
  end

  # Branded token form
  #
  # * Author: Tahir
  # * Date: 13/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def dashboard_home
    service_response = SimpleTokenApi::Request::User.new(request.cookies, {"STW_FORWARD_USER_AGENT" => http_user_agent}).basic_detail

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    @user = service_response.data["user"]
    redirect_if_step_not_reachable(@user["user_token_sale_state"], GlobalConstant::TokenSaleUserState.profile_page_allowed_states)

  end

  # Branded token form
  #
  # * Author: Tahir
  # * Date: 13/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def error_page
    render "web/user/404"
  end

end
