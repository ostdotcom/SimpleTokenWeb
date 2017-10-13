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
    cookies.delete(GlobalConstant::Cookie.user_cookie_name.to_sym, domain: :all)
  end

  # redirect to login page if cookie not present
  #
  # * Author: Aman
  # * Date: 13/10/2017
  # * Reviewed By: Sunil
  #
  def check_user_cookie
    if cookies[GlobalConstant::Cookie.user_cookie_name.to_sym].blank?
      redirect_to "/login", status: GlobalConstant::ErrorCode.permanent_redirect and return
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
  # * Reviewed By: Sunil Khedar
  #
  def redirect_if_step_not_reachable(user_token_sale_state, allowed_states)
    return if allowed_states.include?(user_token_sale_state)

    path = GlobalConstant::TokenSaleUserState.get_path_for_page(user_token_sale_state)
    http_status = GlobalConstant::ErrorCode.temporary_redirect

    redirect_to "/#{path}", status: http_status and return

  end

end