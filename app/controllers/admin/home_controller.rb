class Admin::HomeController < Admin::BaseController
  layout "admin"

  before_action :delete_admin_cookie, only: [:login, :forgot_password, :reset_password, :activate_account]
  before_action :check_admin_cookie, except: [:login, :forgot_password, :reset_password, :activate_account]

  before_action :set_page_meta_info, :except => [:user_preview_pages]

  after_action :remove_browser_caching

  # todo: start using fixed domains. will work now as routes has initializers on domain

  # Admin login
  #
  # * Author: Aman
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def login
  end

  # Forgot password
  #
  # * Author: Thahir
  # * Date: 24/04/2018
  # * Reviewed By:
  #
  def forgot_password
  end

  # Reset password
  #
  # * Author: Thahir
  # * Date: 26/04/2018
  # * Reviewed By:
  #
  def reset_password
  end

  # Activate Account password
  #
  # * Author: Thahir
  # * Date: 03/05/2018
  # * Reviewed By:
  #
  def activate_account
    service_response = SimpleTokenApi::Request::Admin.new(host_url_with_protocol, request.cookies, {"USER-AGENT" => http_user_agent})
                           .get_invite_detail(params[:i_t])
    unless service_response.success?
      if (["invalid_token", "expired_token"].include?(service_response.error))

        if service_response.error == "invalid_token"
          display_text = 'Your Invite token is invalid'
        elsif service_response.error == "expired_token"
          display_text = 'Your Invitation has expired'
        end

        respond_to do |format|
          format.html {render "/admin/home/_activate_account_error.html.erb", locals: {display_text: display_text}}
        end

        return
      end

      render_error_response(service_response)
      return
    end

    @resp_data = service_response.data
  end

  # Admin login mfa
  #
  # * Author: Aman
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def authentication
    service_response = SimpleTokenApi::Request::Admin.new(host_url_with_protocol, request.cookies, {"USER-AGENT" => http_user_agent})
                           .get_ga_url
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    @resp_data = service_response.data
  end

  # Admin password change page
  #
  # * Author: Aman
  # * Date: 09/01/2018
  # * Reviewed By:
  #
  def change_password
  end

  # Terms and Conditions
  #
  # * Author: Preshita Shirke
  # * Date: 17/01/2019
  # * Reviewed By: Akshay Raje
  #
  def terms_and_conditions
    service_response = SimpleTokenApi::Request::Admin.new(host_url_with_protocol, request.cookies, {"USER-AGENT" => http_user_agent})
                           .get_terms_and_conditions
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    @resp_data = service_response.data
  end

  def angular_app
    service_response = SimpleTokenApi::Request::Admin.new(host_url_with_protocol, request.cookies, {"USER-AGENT" => http_user_agent})
                           .get_client_detail

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    @resp_data = service_response.data
    @admin_status = params[:filters][:admin_status] if params[:filters].present?
    # @cynopsis_status = params[:filters][:aml_status] if params[:filters].present?
    @admin_action_type = params[:filters][:admin_action_type] if params[:filters].present?
    @sort_order = params[:sortings][:sort_order] if params[:sortings].present?
    @display_start = params[:display_start]
  end

  # User preview pages on admin
  #
  # * Author: Pankaj
  # * Date: 16/08/2018
  # * Reviewed By:
  #
  def user_preview_pages
    entity_type = params[:entity_type]
    template_type = get_template_from_entity(entity_type)

    service_response = SimpleTokenApi::Request::Admin.new(
        host_url_with_protocol,
        request.cookies,
        {"User-Agent" => http_user_agent}).preview_custom_drafts(entity_type, params[:gid])

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    if entity_type == GlobalConstant::TemplateType.dashboard_template_type
      @presenter_obj = ::Web::Client::Profile.new(service_response, params)
    else
      @presenter_obj = ::Web::Client::Setup.new(service_response, params)
    end

    @user = service_response.data["user"] || {}

    @preview_template = {controller: 'web/user', action: template_type}
    set_page_meta_info(@presenter_obj.custom_meta_tags)
    render template: "web/user/#{template_type}", layout: 'web' and return
  end

  def get_template_from_entity(entity_type)
    case entity_type
    when GlobalConstant::TemplateType.theme_template_type
      'login'
    when GlobalConstant::TemplateType.registration_template_type
      'sign_up'
    when GlobalConstant::TemplateType.kyc_template_type
      'add_kyc_form'
    when GlobalConstant::TemplateType.dashboard_template_type
      'dashboard_home'
    else
      entity_type
    end
  end

end
