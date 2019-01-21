class Web::BaseController < ApplicationController

  before_action :browser_basic_auth
  before_action :set_utm_cookies

  private

  # Reload the same url to retain cookie
  #
  # * Author: Aman
  # * Date: 09/10/2017
  # * Reviewed By:
  #
  def reload_for_external_links_to_retain_cookie
    return if request.referer.blank? || request.xhr? || cookies[GlobalConstant::Cookie.user_cookie_name.to_sym].present?
    referer_host = URI(request.referer).host rescue nil
    if referer_host.to_s != (request.host.downcase)
      render html: "", layout: "reload_url" and return
    end
  end

  # Delete user cookies
  #
  # * Author: Aman
  # * Date: 13/10/2017
  # * Reviewed By:
  #
  #
  def delete_user_cookie
    if cookies[GlobalConstant::Cookie.user_cookie_name.to_sym].present?
      delete_cookie(GlobalConstant::Cookie.user_cookie_name)
    else
      set_cookie(GlobalConstant::Cookie.user_cookie_name, nil, Time.at(0))
    end
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

  # redirect to clients login page for unauthorized requests
  #
  # * Author: Mayur
  # * Date: 16/01/2019
  # * Reviewed By: Aman
  #
  def default_unauthorized_redirect_url
    url_params = params[:t].present? ? "?t=#{params[:t]}" : ''
    "/login#{url_params}"
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

  # Get IP Based Aml Countries Name
  #
  # * Author: Sunil
  # * Date: 17/10/2017
  # * Reviewed By: Sunil
  #
  # @returns [Array]
  #
  def get_ip_to_aml_countries
    @ip_to_aml_countries ||= begin
      GlobalConstant::CountryNationality.get_aml_countries_from_ip(ip_address)
    end
  end

  # Get IP Based Preferred Aml Country Name
  #
  # * Author: Tejas
  # * Date: 01/08/2018
  # * Reviewed By: Aman
  #
  # @returns [String]
  #
  def get_ip_to_preferred_aml_country
    @ip_to_preferred_aml_country ||= begin
      GlobalConstant::CountryNationality.get_preferred_aml_country_from_ip(ip_address)
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