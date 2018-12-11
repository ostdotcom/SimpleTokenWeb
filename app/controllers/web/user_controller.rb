class Web::UserController < Web::BaseController

  layout "web"

  before_action :check_request_host

  before_action :reload_for_external_links_to_retain_cookie, except: [:sign_up, :login, :reset_password, :change_password, :token_sale_blocked_region]

  before_action :delete_user_cookie, only: [:sign_up, :login, :reset_password, :change_password]
  before_action :check_user_cookie, except: [:sign_up, :login, :reset_password, :change_password, :token_sale_blocked_region]

  after_action :remove_browser_caching

  # Sign up
  #
  # * Author: Tahir
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def sign_up
    request_params = {
        host_url_with_protocol: host_url_with_protocol,
        host_url: host_url,
        entity_type: GlobalConstant::TemplateType.registration_template_type
    }
    service_response =  GlobalConstant::StTokenSale.get_client_details(request_params)

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    @presenter_obj = ::Web::Client::Setup.new(service_response, params)

    redirect_to '/token-sale-blocked-region', status: GlobalConstant::ErrorCode.temporary_redirect and return if @presenter_obj.is_blacklisted_ip?(get_ip_to_cynopsis_countries)
    redirect_to "/login", status: GlobalConstant::ErrorCode.temporary_redirect and return if @presenter_obj.has_registration_ended?
    set_page_meta_info(@presenter_obj.custom_meta_tags)
  end

  # Login
  #
  # * Author: Tahir
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def login
    request_params = {
        host_url_with_protocol: host_url_with_protocol,
        host_url: host_url,
        entity_type: GlobalConstant::TemplateType.login_template_type
    }
    service_response =  GlobalConstant::StTokenSale.get_client_details(request_params)

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    @presenter_obj = ::Web::Client::Setup.new(service_response, params)
    redirect_to '/token-sale-blocked-region', status: GlobalConstant::ErrorCode.temporary_redirect and return if @presenter_obj.is_blacklisted_ip?(get_ip_to_cynopsis_countries)
    set_page_meta_info(@presenter_obj.custom_meta_tags)
  end

  # Action for the blacklisted countries ip page
  #
  # * Author: Aman
  # * Date: 28/10/2017
  # * Reviewed By: Sunil
  #
  def token_sale_blocked_region
    request_params = {
        host_url_with_protocol: host_url_with_protocol,
        host_url: host_url,
        entity_type: GlobalConstant::TemplateType.token_sale_blocked_region_template_type
    }
    service_response =  GlobalConstant::StTokenSale.get_client_details(request_params)

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    @presenter_obj = ::Web::Client::Setup.new(service_response, params)
    set_page_meta_info(@presenter_obj.custom_meta_tags)
  end

  # Reset password
  #
  # * Author: Tahir
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def reset_password
    request_params = {
        host_url_with_protocol: host_url_with_protocol,
        host_url: host_url,
        entity_type: GlobalConstant::TemplateType.reset_password_template_type
    }
    service_response =  GlobalConstant::StTokenSale.get_client_details(request_params)

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    @presenter_obj = ::Web::Client::Setup.new(service_response, params)
    redirect_to '/token-sale-blocked-region', status: GlobalConstant::ErrorCode.temporary_redirect and return if @presenter_obj.is_blacklisted_ip?(get_ip_to_cynopsis_countries)
    set_page_meta_info(@presenter_obj.custom_meta_tags)
  end

  # Change password
  #
  # * Author: Tahir
  # * Date: 10/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def change_password
    request_params = {
        host_url_with_protocol: host_url_with_protocol,
        host_url: host_url,
        entity_type: GlobalConstant::TemplateType.change_password_template_type
    }
    service_response =  GlobalConstant::StTokenSale.get_client_details(request_params)

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    @presenter_obj = ::Web::Client::Setup.new(service_response, params)
    redirect_to '/token-sale-blocked-region', status: GlobalConstant::ErrorCode.temporary_redirect and return if @presenter_obj.is_blacklisted_ip?(get_ip_to_cynopsis_countries)
    set_page_meta_info(@presenter_obj.custom_meta_tags)
  end

  # Verify Email page
  #
  # * Author: Aman
  # * Date: 10/10/2017
  # * Reviewed By:
  #
  def verification_link

    service_response = SimpleTokenApi::Request::User.new(
        host_url_with_protocol,
        request.cookies,
        {"User-Agent" => http_user_agent}).basic_detail(GlobalConstant::TemplateType.verification_template_type)

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    @presenter_obj = ::Web::Client::Setup.new(service_response, params)
    redirect_to '/token-sale-blocked-region', status: GlobalConstant::ErrorCode.temporary_redirect and return if @presenter_obj.is_blacklisted_ip?(get_ip_to_cynopsis_countries)
    redirect_to "/login", status: GlobalConstant::ErrorCode.temporary_redirect and return if @presenter_obj.has_sale_ended?

    @user = service_response.data["user"]
    redirect_if_step_not_reachable(@user["user_token_sale_state"], GlobalConstant::TokenSaleUserState.verification_page_allowed_states)
    return if has_performed?

    set_page_meta_info(@presenter_obj.custom_meta_tags)
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
        {"User-Agent" => http_user_agent}).basic_detail(GlobalConstant::TemplateType.kyc_template_type, params[:t])

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    @presenter_obj = ::Web::Client::Setup.new(service_response, params)
    redirect_to '/token-sale-blocked-region', status: GlobalConstant::ErrorCode.temporary_redirect and return if @presenter_obj.is_blacklisted_ip?(get_ip_to_cynopsis_countries)
    redirect_to "/login", status: GlobalConstant::ErrorCode.temporary_redirect and return if @presenter_obj.has_sale_ended?

    @user = service_response.data["user"]

    extra_param = params[:t].present? ? "?e_t=1" : ""
    redirect_if_step_not_reachable(@user["user_token_sale_state"], GlobalConstant::TokenSaleUserState.kyc_page_allowed_states, extra_param)
    return if has_performed?
    get_ip_to_preferred_cynopsis_country
    set_page_meta_info(@presenter_obj.custom_meta_tags)
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
    redirect_to '/token-sale-blocked-region', status: GlobalConstant::ErrorCode.temporary_redirect and return if @presenter_obj.is_blacklisted_ip?(get_ip_to_cynopsis_countries)
    redirect_to "/login", status: GlobalConstant::ErrorCode.temporary_redirect and return if @presenter_obj.has_sale_ended?

    @user = service_response.data["user"]
    redirect_if_step_not_reachable(@user["user_token_sale_state"], GlobalConstant::TokenSaleUserState.profile_page_allowed_states)
    return if has_performed?
    get_ip_to_preferred_cynopsis_country
    set_page_meta_info(@presenter_obj.custom_meta_tags)
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
      error_extra_info = service_response['error_extra_info'] || {}
      user_token_sale_state = error_extra_info['user_token_sale_state']

      if user_token_sale_state.present? && user_token_sale_state != GlobalConstant::TokenSaleUserState.profile_page
        # extra_param = params[:t].present? ? "?e_t=1" : ""
        redirect_if_step_not_reachable(user_token_sale_state, GlobalConstant::TokenSaleUserState.profile_page_allowed_states)
        return if has_performed?
      else
        render_error_response(service_response)
      end

      return
    end

    @presenter_obj = ::Web::Client::Profile.new(service_response, params)
    set_page_meta_info(@presenter_obj.custom_meta_tags)
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

  # allow requests from whitelisted domains only
  #
  # * Author: Aman
  # * Date: 01/11/2017
  # * Reviewed By: Sunil
  #
  def check_request_host
    return if ['http://', 'https://'].include?(request.protocol.downcase) &&
        ((request.host =~ /\A[A-Z0-9]*#{GlobalConstant::WebDomain.kyc_subdomain}\Z/i) ||
        GlobalConstant::WebDomain.allowed_external_subdomains.include?(request.host.downcase))

    redirect_to GlobalConstant::Base.simple_token_web['kyc_root_url'], status: GlobalConstant::ErrorCode.temporary_redirect and return
  end

end
