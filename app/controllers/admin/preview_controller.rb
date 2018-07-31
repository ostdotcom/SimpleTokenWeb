class Admin::PreviewController < Admin::BaseController
  layout "web"

  before_action :check_admin_cookie, except: [:login, :kyc_page]
  # before_action :set_page_meta_info

  # after_action :remove_browser_caching

  # Login
  #
  # * Author: Aman
  # * Date: 27/07/2018
  # * Reviewed By:
  #
  def login
    service_response = SimpleTokenApi::Request::Admin.new(
        host_url_with_protocol,
        request.cookies,
        {"USER-AGENT" => http_user_agent}
    ).client_detail(GlobalConstant::TemplateType.login_template_type)

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    @presenter_obj = ::Web::Client::Setup.new(service_response, params)
    set_page_meta_info(@presenter_obj.custom_meta_tags.merge({controller: 'web/user'}))
    render "web/user/login"
  end

  # Login
  #
  # * Author: Aman
  # * Date: 27/07/2018
  # * Reviewed By:
  #
  def add_kyc_form
    service_response = SimpleTokenApi::Request::Admin.new(
        host_url_with_protocol,
        request.cookies,
        {"USER-AGENT" => http_user_agent}
    ).client_detail(GlobalConstant::TemplateType.kyc_template_type)

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    @presenter_obj = ::Web::Client::Setup.new(service_response, params)
    @user = {
                id: 0,
                email: 'email'
            }

    get_ip_to_cynopsis_country
    set_page_meta_info(@presenter_obj.custom_meta_tags.merge({controller: 'web/user'}))
    render "web/user/add_kyc_form"
  end

end
