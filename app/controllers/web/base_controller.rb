class Web::BaseController < ApplicationController

  before_action :set_utm_cookies

  private

  # Delete user cookies
  #
  # * Author: Aman
  # * Date: 13/10/2017
  # * Reviewed By:
  #
  #
  def delete_user_cookie
    return if cookies[GlobalConstant::Cookie.user_cookie_name.to_sym].blank?
    delete_cookie(GlobalConstant::Cookie.user_cookie_name)
  end

  # redirect to login page if cookie not present
  #
  # * Author: Aman
  # * Date: 13/10/2017
  # * Reviewed By: Sunil
  #
  def check_user_cookie
    if cookies[GlobalConstant::Cookie.user_cookie_name.to_sym].blank?
      res = {
          error: 's_t_w_login_required',
          error_display_text: 'Unauthorized Access',
          http_code: GlobalConstant::ErrorCode.unauthorized_access
      }
      response = Result::Base.error(res)
      render_error_response(response)
    end
  end

  # Render error response pages
  #
  # * Author: Aman
  # * Date: 13/10/2017
  # * Reviewed By: Sunil
  #
  def render_error_response(service_response)
    # Clean critical data
    service_response.data = {}

    if service_response.http_code == GlobalConstant::ErrorCode.unauthorized_access
      if request.xhr?
        (render plain: Oj.dump(service_response.to_json, mode: :compat), status: service_response.http_code) and return
      else
        url_params = params[:t].present? ? "?t=#{params[:t]}" : ''
        redirect_to "/login#{url_params}", status: GlobalConstant::ErrorCode.permanent_redirect and return
      end
    else
      render_error_response_for(service_response)
    end
  end

  # Redirect to page if cannot access as per user state
  #
  # * Author: Aman
  # * Date: 10/10/2017
  # * Reviewed By: Sunil
  #
  def redirect_if_step_not_reachable(user_token_sale_state, allowed_states, extra_url_query_parameter = '')
    return if allowed_states.include?(user_token_sale_state)

    path = GlobalConstant::TokenSaleUserState.get_path_for_page(user_token_sale_state)
    http_status = GlobalConstant::ErrorCode.temporary_redirect

    redirect_to "/#{path}#{extra_url_query_parameter}", status: http_status and return

  end

  # Get IP based cynopsis country name
  #
  # * Author: Sunil
  # * Date: 17/10/2017
  # * Reviewed By: Sunil
  #
  def get_ip_to_cynopsis_country
    @ip_to_cynopsis_country ||= GlobalConstant::CountryNationality.cynopsis_country_for(get_country_from_ip)
  end

  # Get IP based country name
  #
  # * Author: Sunil
  # * Date: 17/10/2017
  # * Reviewed By: Sunil
  #
  def get_country_from_ip
    @country_from_ip ||= begin
      country_name = ''
      geo_ip_obj = Util::GeoIpUtil.new(ip_address: ip_address)
      country_name = geo_ip_obj.get_country_name.to_s
      country_name
    end
  end

  # Set Utm Parameters for landing pages
  #
  # * Author: Aman
  # * Date: 23/10/2017
  # * Reviewed By: Sunil
  #
  def set_utm_cookies

    if (params[:utm_source].present? || params[:utm_campaign].present? || params[:utm_type].present? || params[:utm_term].present? || params[:utm_medium].present? || params[:utm_content].present?)
      utm_params = {'utm_type' => params[:utm_type].to_s, 'utm_medium' => params[:utm_medium].to_s, 'utm_source' => params[:utm_source].to_s,
                    'utm_term' => params[:utm_term].to_s, 'utm_content' => params[:utm_content].to_s, 'utm_campaign' => params[:utm_campaign].to_s}


      origin_page = url_for(:only_path => false)
      utm_params.merge!('origin_page' => origin_page)

      cookie_value = Oj.dump(utm_params)
      set_cookie(GlobalConstant::Cookie.utm_cookie_name, cookie_value, GlobalConstant::Cookie.utm_cookie_expiry.from_now, {http_only: false, secure: false})
    end

  end

end