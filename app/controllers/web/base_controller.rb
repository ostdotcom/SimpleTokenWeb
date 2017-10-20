class Web::BaseController < ApplicationController

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
      url_params = params[:t].present? ? "?t=#{params[:t]}" : ''
      redirect_to "/login#{url_params}", status: GlobalConstant::ErrorCode.permanent_redirect and return
    end
  end

  # Render error response pages
  #
  # * Author: Aman
  # * Date: 13/10/2017
  # * Reviewed By: Sunil
  #
  def render_error_response(service_response)
    if service_response.http_code == GlobalConstant::ErrorCode.unauthorized_access
      redirect_to "/login", status: GlobalConstant::ErrorCode.permanent_redirect and return
    else
      #GlobalConstant::ErrorCode.internal_server_error
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

  # Validate ip of request
  #
  # * Author: Aman
  # * Date: 15/10/2017
  # * Reviewed By: Sunil
  #
  def handle_blacklisted_ip
    blacklisted_countries = ['CHINA']
    return unless blacklisted_countries.include?(get_country_from_ip.upcase)
    redirect_to '/', status: GlobalConstant::ErrorCode.permanent_redirect and return
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

end