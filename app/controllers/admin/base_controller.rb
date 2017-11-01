class Admin::BaseController < ApplicationController

  before_action :admin_basic_auth

  private

  # tmp basic auth
  #
  # * Author: Aman
  # * Date: 15/10/2017
  # * Reviewed By: Sunil
  #
  def admin_basic_auth
    users = {'simpleToken' => ['A$F^&n!@$ghf%7']}

    authenticate_or_request_with_http_basic do |username, password|
      if users[username].present? && users[username][0] == password
        true
      else
        false
      end
    end

  end

  # Delete admin cookies
  #
  # * Author: Aman
  # * Date: 13/10/2017
  # * Reviewed By: Sunil
  #
  #
  def delete_admin_cookie
    return if cookies[GlobalConstant::Cookie.admin_cookie_name.to_sym].blank?
    delete_cookie(GlobalConstant::Cookie.admin_cookie_name)
  end

  # redirect to admin login page if cookie not present
  #
  # * Author: Aman
  # * Date: 13/10/2017
  # * Reviewed By: Sunil
  #
  def check_admin_cookie
    if cookies[GlobalConstant::Cookie.admin_cookie_name.to_sym].blank?
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
        redirect_to '/admin/login', status: GlobalConstant::ErrorCode.permanent_redirect and return
      end
    else
      render_error_response_for(service_response)
    end

  end

end
