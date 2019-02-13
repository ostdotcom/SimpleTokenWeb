class Admin::BaseController < ApplicationController

  before_action :browser_basic_auth

  private

  # # Delete admin cookies
  # #
  # # * Author: Aman
  # # * Date: 13/10/2017
  # # * Reviewed By: Sunil
  # #
  # #
  # def delete_admin_cookie
  #   return if cookies[GlobalConstant::Cookie.admin_cookie_name.to_sym].blank?
  #   delete_cookie(GlobalConstant::Cookie.admin_cookie_name)
  # end

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

  # redirect to admin login page for unauthorized requests
  #
  # * Author: Mayur
  # * Date: 16/01/2019
  # * Reviewed By: Aman
  #
  def default_unauthorized_redirect_url
    next_path = ""
    if params["r_m"] == "1"
      next_path = "?next=#{CGI.escape request.fullpath}"
    end
    "/admin/login#{next_path}"
  end

end
