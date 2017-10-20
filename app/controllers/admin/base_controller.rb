class Admin::BaseController < ApplicationController

  before_action :tmp_basic_auth

  private

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
      redirect_to "/admin/login", status: GlobalConstant::ErrorCode.permanent_redirect and return
    end
  end

end
