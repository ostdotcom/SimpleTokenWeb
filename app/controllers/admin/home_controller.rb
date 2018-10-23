class Admin::HomeController < Admin::BaseController
  layout "admin"

  before_action :delete_admin_cookie, only: [:login, :forgot_password, :reset_password, :activate_account]
  before_action :check_admin_cookie, except: [:login, :forgot_password, :reset_password, :activate_account]

  before_action :set_page_meta_info, :except => [:user_preview_pages]

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

  # Admin dashboard
  #
  # * Author: Alpesh
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  # def dashboard
    # service_response = SimpleTokenApi::Request::Admin.new(host_url_with_protocol, request.cookies, {"USER-AGENT" => http_user_agent})
    #                        .get_client_detail
    #
    # # Check if error present or not?
    # unless service_response.success?
    #   render_error_response(service_response)
    #   return
    # end
    #
    # @resp_data = service_response.data
    # @admin_status = params[:filters][:admin_status] if params[:filters].present?
    # @cynopsis_status = params[:filters][:aml_status] if params[:filters].present?
    # @admin_action_type = params[:filters][:admin_action_type] if params[:filters].present?
    # @sort_order = params[:sortings][:sort_order] if params[:sortings].present?
    # @display_start = params[:display_start]
  # end

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
    @cynopsis_status = params[:filters][:aml_status] if params[:filters].present?
    @admin_action_type = params[:filters][:admin_action_type] if params[:filters].present?
    @sort_order = params[:sortings][:sort_order] if params[:sortings].present?
    @display_start = params[:display_start]
  end

  # Admin dashboard
  #
  # * Author: Alpesh
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  # def get_kyc_dashboard
  #
  #   service_response = SimpleTokenApi::Request::Admin.new(host_url_with_protocol, request.cookies, {"USER-AGENT" => http_user_agent})
  #                          .dashboard_detail(params)
  #
  #   # Check if error present or not?
  #   unless service_response.success?
  #     render_error_response(service_response)
  #     return
  #   end

  #   resp_data = service_response.data
  #
  #   curr_resp_data = []
  #   resp_data['curr_page_data'].each do |c_p_d|
  #     curr_resp_data << {
  #         user_case_id: c_p_d['case_id'],
  #         date_time: c_p_d['kyc_confirmed_at'],
  #         status_st: GlobalConstant::UserKycDetail.admin_kyc_statuses[c_p_d['admin_status']],
  #         status_cy: GlobalConstant::UserKycDetail.cynopsis_kyc_statuses[c_p_d['cynopsis_status']],
  #         duplicate: c_p_d['is_duplicate'],
  #         re_submitted: c_p_d['is_re_submitted'],
  #         name: c_p_d['name'],
  #         country: c_p_d['country'],
  #         nationality: c_p_d['nationality'],
  #         admin: c_p_d['last_acted_by']
  #     }
  #   end
  #
  #   response = {
  #       recordsFiltered: resp_data['meta']['total_filtered_recs'],
  #       data: curr_resp_data
  #   }
  #
  #   render :json => response and return
  #
  # end

  # Admin dashboard
  #
  # * Author: Alpesh
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  # def kyc_details
  #
  #   @case_id = params[:case_id]
  #   service_response = SimpleTokenApi::Request::Admin.new(host_url_with_protocol, request.cookies, {"USER-AGENT" => http_user_agent})
  #                          .get_kyc_details(params)
  #
  #   # Check if error present or not?
  #   unless service_response.success?
  #     render_error_response(service_response)
  #     return
  #   end
  #
  #   @dash_filters = params[:filters].present? ? params[:filters].permit! : {}
  #   @dash_sortings = params[:sortings].present? ? params[:sortings].permit! : {}
  #   @display_start = params[:display_start].to_i
  #
  #   @service_data = service_response.data
  #
  # end

  # Admin dashboard
  #
  # * Author: Alpesh
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  # def kyc_action_logs
  #
  #   service_response = SimpleTokenApi::Request::Admin.new(host_url_with_protocol, request.cookies, {"USER-AGENT" => http_user_agent})
  #                          .get_kyc_action_logs(params)
  #
  #   # Check if error present or not?
  #   unless service_response.success?
  #     render_error_response(service_response)
  #     return
  #   end
  #
  #   resp_data = service_response.data
  #
  #   curr_resp_data = []
  #   resp_data['curr_page_data'].each do |c_p_d|
  #     curr_resp_data << {
  #         date_time: c_p_d['date_time'],
  #         agent: c_p_d['agent'],
  #         activity: c_p_d['activity']
  #     }
  #   end
  #
  #   records_filtered = params[:start].to_i + curr_resp_data.length
  #   if curr_resp_data.length >= params[:length].to_i
  #     records_filtered = records_filtered + 1
  #   end
  #
  #   response = {
  #       recordsFiltered: records_filtered,
  #       data: curr_resp_data
  #   }
  #
  #   render :json => response and return
  #
  # end

  # Admin dashboard
  #
  # * Author: Alpesh
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  # def whitelist_dashboard
  #   service_response = SimpleTokenApi::Request::Admin.new(host_url_with_protocol, request.cookies, {"USER-AGENT" => http_user_agent})
  #                          .get_client_detail
  #
  #   # Check if error present or not?
  #   unless service_response.success?
  #     render_error_response(service_response)
  #     return
  #   end
  #
  #   @resp_data = service_response.data
  #
  #   @whitelist_status = params[:filters][:whitelist_status] if params[:filters].present?
  #   @sort_order = params[:sortings][:sort_order] if params[:sortings].present?
  #   @display_start = params[:display_start]
  # end

  # Admin dashboard
  #
  # * Author: Alpesh
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  # def get_kyc_whitelist_dashboard
  #   service_response = SimpleTokenApi::Request::Admin.new(host_url_with_protocol, request.cookies, {"USER-AGENT" => http_user_agent})
  #                          .whitelist_dashboard_detail(params)
  #
  #   # Check if error present or not?
  #   unless service_response.success?
  #     render_error_response(service_response)
  #     return
  #   end
  #
  #   resp_data = service_response.data
  #
  #   curr_resp_data = []
  #   resp_data['curr_page_data'].each do |c_p_d|
  #     curr_resp_data << {
  #         user_case_id: c_p_d['case_id'],
  #         date_time: c_p_d['kyc_confirmed_at'],
  #         whitelist_status: GlobalConstant::UserKycDetail.whitelist_kyc_statuses[c_p_d['whitelist_status']],
  #         duplicate: c_p_d['is_duplicate'],
  #         re_submitted: c_p_d['is_re_submitted'],
  #         name: c_p_d['name'],
  #         country: c_p_d['country'],
  #         nationality: c_p_d['nationality'],
  #         admin: c_p_d['last_acted_by']
  #     }
  #   end
  #
  #   response = {
  #       recordsFiltered: resp_data['meta']['total_filtered_recs'],
  #       data: curr_resp_data
  #   }
  #
  #   render :json => response and return
  #
  # end

  # Pos dashboard
  #
  # * Author: Aman
  # * Date: 29/10/2017
  # * Reviewed By: Sunil
  #
  # def pos_dashboard
  # end


  # Admin dashboard
  #
  # * Author: Alpesh
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  # def sale_all_dashboard
  # end

  # Admin dashboard
  #
  # * Author: Alpesh
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  # def get_sale_all_dashboard
  #   service_response = SimpleTokenApi::Request::Admin.new(host_url_with_protocol, request.cookies, {"USER-AGENT" => http_user_agent})
  #                          .sale_all_dashboard_detail(params)
  #   # Check if error present or not?
  #   unless service_response.success?
  #     render_error_response(service_response)
  #     return
  #   end
  #
  #   resp_data = service_response.data
  #
  #   curr_resp_data = []
  #   resp_data['curr_page_data'].each do |c_p_d|
  #     curr_resp_data << {
  #         date_time: c_p_d['day_timestamp'],
  #         ethereum_address: c_p_d['ethereum_address'],
  #         ethereum_value: c_p_d['ethereum_value'],
  #         tokens_sold: c_p_d['tokens_sold'],
  #         usd_value: c_p_d['usd_value']
  #     }
  #   end
  #
  #   response = {
  #       recordsFiltered: resp_data['meta']['total_filtered_recs'],
  #       data: curr_resp_data
  #   }
  #
  #   render :json => response and return
  #
  # end

  # Admin dashboard
  #
  # * Author: Alpesh
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  # def sale_daily_dashboard
  #   @tab_type = params[:tab_type] || 'day'
  # end

  # Admin dashboard
  #
  # * Author: Alpesh
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  # def get_sale_daily_dashboard
  #   service_response = SimpleTokenApi::Request::Admin.new(host_url_with_protocol, request.cookies, {"USER-AGENT" => http_user_agent})
  #                          .sale_daily_dashboard_detail(params)
  #   # Check if error present or not?
  #   unless service_response.success?
  #     render_error_response(service_response)
  #     return
  #   end
  #
  #   resp_data = service_response.data
  #
  #   curr_resp_data = []
  #   resp_data['curr_page_data'].each do |c_p_d|
  #     curr_resp_data << {
  #         day_no: c_p_d['day_no'].to_i + 1,
  #         display_date:  c_p_d['date'],
  #         total_ethereum: c_p_d['total_ethereum'],
  #         total_tokens_sold: c_p_d['total_tokens_sold'],
  #         total_dollar_value: c_p_d['total_dollar_value'],
  #         no_of_transaction: c_p_d['no_of_transaction'],
  #         average: c_p_d['average_eth'],
  #         distinct_users: c_p_d['distinct_users']
  #     }
  #   end
  #
  #   response = {
  #       recordsFiltered: resp_data['meta']['total_filtered_recs'],
  #       data: curr_resp_data,
  #       all_time_data: resp_data['all_time_data']
  #   }
  #
  #   render :json => response and return
  #
  # end


  # Contracts events dashboard
  #
  # * Author: Alpesh
  # * Date: 10/11/2017
  # * Reviewed By:
  #
  # def contract_events_dashboard
  # end

  # Contracts events Ajax dashboard
  #
  # * Author: Alpesh
  # * Date: 10/11/2017
  # * Reviewed By:
  #
  # def get_contract_events_dashboard
  #   service_response = SimpleTokenApi::Request::Admin.new(host_url_with_protocol, request.cookies, {"USER-AGENT" => http_user_agent})
  #                          .contract_events_dashboard_detail(params)
  #   # Check if error present or not?
  #   unless service_response.success?
  #     render_error_response(service_response)
  #     return
  #   end
  #
  #   resp_data = service_response.data
  #
  #   curr_resp_data = []
  #   resp_data['curr_page_data'].each do |c_p_d|
  #     curr_resp_data << {
  #         block_number: c_p_d['block_number'],
  #         event_name: c_p_d['event_name'],
  #         contract_address: c_p_d['contract_address'],
  #         processed_event_data: c_p_d['processed_event_data'].inspect
  #     }
  #   end
  #
  #   response = {
  #       recordsFiltered: resp_data['meta']['total_filtered_recs'],
  #       data: curr_resp_data
  #   }
  #
  #   render :json => response and return
  #
  # end

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
