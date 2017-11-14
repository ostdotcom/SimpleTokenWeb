class Admin::HomeController < Admin::BaseController
  layout "admin"

  before_action :delete_admin_cookie, only: [:login]
  before_action :check_admin_cookie, except: [:login]

  before_action :set_page_meta_info, :except => [:get_kyc_dashboard, :kyc_action_logs, :logout, :get_kyc_whitelist_dashboard,
                                                 :get_sale_all_dashboard, :get_sale_daily_dashboard, :get_contract_events_dashboard]

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
    @admin_status = params[:filters][:admin_status] if params[:filters].present?
    @cynopsis_status = params[:filters][:cynopsis_status] if params[:filters].present?
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
          activity: c_p_d['activity']
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


  # Admin dashboard
  #
  # * Author: Alpesh
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def whitelist_dashboard
    @whitelist_status = params[:filters][:whitelist_status] if params[:filters].present?
    @sort_order = params[:sortings][:sort_order] if params[:sortings].present?
    @display_start = params[:display_start]
  end

  # Admin dashboard
  #
  # * Author: Alpesh
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def get_kyc_whitelist_dashboard
    service_response = SimpleTokenApi::Request::Admin.new(request.cookies, {"USER-AGENT" => http_user_agent})
                           .whitelist_dashboard_detail(params)

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
          whitelist_status: GlobalConstant::UserKycDetail.whitelist_kyc_statuses[c_p_d['whitelist_status']],
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

  # Pos dashboard
  #
  # * Author: Aman
  # * Date: 29/10/2017
  # * Reviewed By: Sunil
  #
  def pos_dashboard
  end


  # Admin dashboard
  #
  # * Author: Alpesh
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def sale_all_dashboard
  end

  # Admin dashboard
  #
  # * Author: Alpesh
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def get_sale_all_dashboard
    service_response = SimpleTokenApi::Request::Admin.new(request.cookies, {"USER-AGENT" => http_user_agent})
                           .sale_all_dashboard_detail(params)
    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    resp_data = service_response.data

    curr_resp_data = []
    resp_data['curr_page_data'].each do |c_p_d|
      curr_resp_data << {
          date_time: c_p_d['day_timestamp'],
          ethereum_address: c_p_d['ethereum_address'],
          ethereum_value: c_p_d['ethereum_value'],
          tokens_sold: c_p_d['tokens_sold'],
          usd_value: c_p_d['usd_value']
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
  def sale_daily_dashboard
    @tab_type = params[:tab_type] || 'day'
  end

  # Admin dashboard
  #
  # * Author: Alpesh
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def get_sale_daily_dashboard
    service_response = SimpleTokenApi::Request::Admin.new(request.cookies, {"USER-AGENT" => http_user_agent})
                           .sale_daily_dashboard_detail(params)
    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    resp_data = service_response.data

    curr_resp_data = []
    resp_data['curr_page_data'].each do |c_p_d|
      curr_resp_data << {
          day_no: c_p_d['day_no'].to_i + 1,
          date_pst:  c_p_d['date'],
          total_ethereum: c_p_d['total_ethereum'],
          total_tokens_sold: c_p_d['total_tokens_sold'],
          total_dollar_value: c_p_d['total_dollar_value'],
          day_start_time: c_p_d['day_start_time'],
          no_of_transaction: c_p_d['no_of_transaction'],
          average: c_p_d['average_eth'],
          distinct_users: c_p_d['distinct_users']
      }
    end

    response = {
        recordsFiltered: resp_data['meta']['total_filtered_recs'],
        data: curr_resp_data,
        all_time_data: resp_data['all_time_data']
    }

    render :json => response and return

  end


  # Contracts events dashboard
  #
  # * Author: Alpesh
  # * Date: 10/11/2017
  # * Reviewed By:
  #
  def contract_events_dashboard
  end

  # Contracts events Ajax dashboard
  #
  # * Author: Alpesh
  # * Date: 10/11/2017
  # * Reviewed By:
  #
  def get_contract_events_dashboard
    service_response = SimpleTokenApi::Request::Admin.new(request.cookies, {"USER-AGENT" => http_user_agent})
                           .contract_events_dashboard_detail(params)
    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    resp_data = service_response.data

    curr_resp_data = []
    resp_data['curr_page_data'].each do |c_p_d|
      curr_resp_data << {
          block_number: c_p_d['block_number'],
          event_name: c_p_d['event_name'],
          contract_address: c_p_d['contract_address'],
          processed_event_data: c_p_d['processed_event_data'].inspect
      }
    end

    response = {
        recordsFiltered: resp_data['meta']['total_filtered_recs'],
        data: curr_resp_data
    }

    render :json => response and return

  end

end
