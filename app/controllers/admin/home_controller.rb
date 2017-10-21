class Admin::HomeController < Admin::BaseController
  layout "admin"

  before_action :delete_admin_cookie, only: [:login]
  before_action :check_admin_cookie, except: [:login]

  before_action :set_page_meta_info, :except => [:get_kyc_dashboard, :kyc_action_logs, :logout]

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
  # * Author: Alpesh
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def dashboard
    @admin_status = params[:admin_status]
    @cynopsis_status = params[:cynopsis_status]
    @sort_order = params[:sort_order]
    @display_start = params[:display_start]
  end

  # Admin dashboard
  #
  # * Author: Alpesh
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def get_kyc_dashboard

    service_response = SimpleTokenApi::Request::Admin.new(request.cookies, {"USER-AGENT" => http_user_agent})
                           .dashboard_detail(params)

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    resp_data = service_response.data

    curr_resp_data = []
    resp_data['curr_page_data'].each do |c_p_d|
      curr_resp_data << {
          user_case_id: c_p_d['case_id'],
          date_time: c_p_d['kyc_confirmed_at'],
          status_st: GlobalConstant::UserKycDetail.admin_kyc_statuses[c_p_d['admin_status']],
          status_cy: GlobalConstant::UserKycDetail.cynopsis_kyc_statuses[c_p_d['cynopsis_status']],
          duplicate: c_p_d['is_duplicate'],
          re_submitted: c_p_d['is_re_submitted'],
          name: c_p_d['name'],
          country: c_p_d['country'],
          nationality: c_p_d['nationality'],
          admin: c_p_d['last_acted_by']
      }
    end

    response = {
        recordsFiltered: resp_data['meta']['total_filtered_recs'],
        data: curr_resp_data
    }

    render :json => response and return

  end

  # Admin dashboard
  #
  # * Author: Alpesh
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def kyc_details

    @case_id = params[:case_id]
    service_response = SimpleTokenApi::Request::Admin.new(request.cookies, {"USER-AGENT" => http_user_agent})
                           .get_kyc_details(params)

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    @dash_filters = params[:filters].present? ? params[:filters].permit! : {}
    @dash_sortings = params[:sortings].present? ? params[:sortings].permit! : {}
    @display_start = params[:display_start].to_i

    @service_data = service_response.data

  end

  # Admin dashboard
  #
  # * Author: Alpesh
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def kyc_action_logs

    service_response = SimpleTokenApi::Request::Admin.new(request.cookies, {"USER-AGENT" => http_user_agent})
                         .get_kyc_action_logs(params)

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    resp_data = service_response.data

    curr_resp_data = []
    resp_data['curr_page_data'].each do |c_p_d|
      curr_resp_data << {
          date_time: c_p_d['date_time'],
          agent: c_p_d['agent'],
          email_type: c_p_d['email_type']
      }
    end

    records_filtered = params[:start].to_i + curr_resp_data.length
    if curr_resp_data.length >= params[:length].to_i
      records_filtered = records_filtered + 1
    end

    response = {
        recordsFiltered: records_filtered,
        data: curr_resp_data
    }

    render :json => response and return

  end

  # Admin logout
  #
  # * Author: Alpesh
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def logout
    delete_admin_cookie
    redirect_to "/admin/login", status: GlobalConstant::ErrorCode.permanent_redirect and return
  end

end
