class Web::UserController < Web::BaseController

  layout "web"

  before_action :delete_user_cookie, only: [:sign_up, :login, :reset_password, :change_password]
  before_action :check_user_cookie, except: [:sign_up, :login, :reset_password, :change_password, :token_sale_blocked_region]

  before_action :set_page_meta_info, except: [:logout]

  after_action :remove_browser_caching

  # Sign up
  #
  # * Author: Tahir
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def sign_up
    service_response = SimpleTokenApi::Request::User.new(
        host_url_with_protocol,
        request.cookies,
        {"User-Agent" => http_user_agent}).client_detail(GlobalConstant::TemplateType.sign_up_template_type)

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end


    @presenter_obj = ::Web::Client::Setup.new(service_response, params)
    handle_blacklisted_ip(@presenter_obj.blacklisted_countries)
    redirect_to "/login", status: GlobalConstant::ErrorCode.temporary_redirect and return if @presenter_obj.has_sale_ended?
  end

  # Login
  #
  # * Author: Tahir
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def login
    service_response = SimpleTokenApi::Request::User.new(
        host_url_with_protocol,
        request.cookies,
        {"User-Agent" => http_user_agent}).client_detail(GlobalConstant::TemplateType.login_template_type)

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    @presenter_obj = ::Web::Client::Setup.new(service_response, params)
    handle_blacklisted_ip(@presenter_obj.blacklisted_countries)
  end

  # Action for the blacklisted countries ip page
  #
  # * Author: Aman
  # * Date: 28/10/2017
  # * Reviewed By: Sunil
  #
  def token_sale_blocked_region
    service_response = SimpleTokenApi::Request::User.new(
        host_url_with_protocol,
        request.cookies,
        {"User-Agent" => http_user_agent}).client_detail(GlobalConstant::TemplateType.token_sale_blocked_region_template_type)

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    @presenter_obj = ::Web::Client::Setup.new(service_response, params)
  end

  # Logout
  #
  # * Author: Aman
  # * Date: 15/10/2017
  # * Reviewed By:
  #
  def logout
    # Clear cookie
    delete_cookie(GlobalConstant::Cookie.user_cookie_name)
    redirect_to "/login", status: GlobalConstant::ErrorCode.permanent_redirect and return
  end

  # Reset password
  #
  # * Author: Tahir
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def reset_password
    service_response = SimpleTokenApi::Request::User.new(
        host_url_with_protocol,
        request.cookies,
        {"User-Agent" => http_user_agent}).client_detail(GlobalConstant::TemplateType.reset_password_template_type)

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    @presenter_obj = ::Web::Client::Setup.new(service_response, params)
    handle_blacklisted_ip(@presenter_obj.blacklisted_countries)
  end

  # Change password
  #
  # * Author: Tahir
  # * Date: 10/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def change_password
    service_response = SimpleTokenApi::Request::User.new(
        host_url_with_protocol,
        request.cookies,
        {"User-Agent" => http_user_agent}).client_detail(GlobalConstant::TemplateType.change_password_template_type)

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    @presenter_obj = ::Web::Client::Setup.new(service_response, params)
    handle_blacklisted_ip(@presenter_obj.blacklisted_countries)
  end

  # KYC form
  #
  # * Author: Tahir
  # * Date: 10/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def add_kyc_form
    service_response = SimpleTokenApi::Request::User.new(
        host_url_with_protocol,
        request.cookies,
        {"User-Agent" => http_user_agent}).basic_detail(GlobalConstant::TemplateType.kyc_template_type)

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    @presenter_obj = ::Web::Client::Setup.new(service_response, params)
    handle_blacklisted_ip(@presenter_obj.blacklisted_countries)
    redirect_to "/login", status: GlobalConstant::ErrorCode.temporary_redirect and return if @presenter_obj.has_sale_ended?

    @user = service_response.data["user"]
    redirect_if_step_not_reachable(@user["user_token_sale_state"], GlobalConstant::TokenSaleUserState.kyc_page_allowed_states)

    get_ip_to_cynopsis_country
  end

  # KYC update form after double opt in
  #
  # * Author: Aman
  # * Date: 15/10/2017
  # * Reviewed By:
  #
  def update_kyc_form
    service_response = SimpleTokenApi::Request::User.new(
        host_url_with_protocol,
        request.cookies,
        {"User-Agent" => http_user_agent}).basic_detail(GlobalConstant::TemplateType.kyc_template_type)

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    @presenter_obj = ::Web::Client::Setup.new(service_response, params)
    handle_blacklisted_ip(@presenter_obj.blacklisted_countries)
    redirect_to "/login", status: GlobalConstant::ErrorCode.temporary_redirect and return if @presenter_obj.has_sale_ended?

    @user = service_response.data["user"]
    redirect_if_step_not_reachable(@user["user_token_sale_state"], GlobalConstant::TokenSaleUserState.profile_page_allowed_states)

    get_ip_to_cynopsis_country
  end

  # Branded token form
  #
  # * Author: Tahir
  # * Date: 13/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def dashboard_home
    service_response = SimpleTokenApi::Request::User.new(host_url_with_protocol, request.cookies, {"User-Agent" => http_user_agent}).profile_detail

    # Check if error present or not?
    unless service_response.success?
      error_data = service_response.error_data || {}
      user_token_sale_state = error_data['user_token_sale_state']

      if user_token_sale_state.present? && user_token_sale_state != GlobalConstant::TokenSaleUserState.profile_page
        # extra_param = params[:t].present? ? "?e_t=1" : ""
        redirect_if_step_not_reachable(user_token_sale_state, GlobalConstant::TokenSaleUserState.profile_page_allowed_states)
      else
        render_error_response(service_response)
      end

      return
    end

    @presenter_obj = Web::Client::Profile.new(service_response, params)
  end


  ########### only Simple token sale users  ######


  # Branded token form
  #
  # * Author: Tahir
  # * Date: 10/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def add_branded_token
    if GlobalConstant::StTokenSale.has_sale_ended?
      redirect_to "/login", status: GlobalConstant::ErrorCode.temporary_redirect and return
    end

    service_response = SimpleTokenApi::Request::User.new(host_url_with_protocol, request.cookies, {"User-Agent" => http_user_agent}).basic_detail

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    @user = service_response.data["user"]
    redirect_if_step_not_reachable(@user["user_token_sale_state"], GlobalConstant::TokenSaleUserState.bt_page_allowed_states)
  end

  # update Branded token form
  #
  # * Author: Aman
  # * Date: 15/10/2017
  # * Reviewed By:
  #
  def update_branded_token
    # allowed?
    # redirect if not token sale client
    service_response = SimpleTokenApi::Request::User.new(host_url_with_protocol, request.cookies, {"User-Agent" => http_user_agent}).basic_detail

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
  # * Date: 10/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def verification_link
    if GlobalConstant::StTokenSale.has_sale_ended?
      redirect_to "/login", status: GlobalConstant::ErrorCode.temporary_redirect and return
    end

    service_response = SimpleTokenApi::Request::User.new(host_url_with_protocol, request.cookies, {"User-Agent" => http_user_agent}).basic_detail

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    @user = service_response.data["user"]
    redirect_if_step_not_reachable(@user["user_token_sale_state"], GlobalConstant::TokenSaleUserState.verification_page_allowed_states)
  end

  private

  # Dont allow browser caching for token sale pages
  #
  # * Author: Aman
  # * Date: 01/11/2017
  # * Reviewed By: Sunil
  #
  def remove_browser_caching
    response.headers['Pragma'] = 'no-cache'
    response.headers['Cache-Control'] = 'no-store, no-cache, max-age=0, must-revalidate, post-check=0, pre-check=0'
    response.headers['Vary'] = '*'
    response.headers['Expires'] = '-1'
    response.headers['Last-Modified'] = "#{Time.now.gmtime.strftime("%a, %d %b %Y %T GMT")}"
  end

end
