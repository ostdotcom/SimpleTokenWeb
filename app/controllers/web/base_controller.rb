class Web::BaseController < ApplicationController


  # Redirect to page based on user state
  #
  # * Author: Aman
  # * Date: 12/10/2017
  # * Reviewed By:
  #TODO:: REVISIT
  # def already_logged_in
  #
  #   return if request.cookies[GlobalConstant::Cookie.user_cookie_name.to_sym].blank?
  #
  #   service_response = SimpleTokenApi::Request::User.new(request.cookies, {"HTTP_USER_AGENT" => request.env['HTTP_USER_AGENT']}).basic_detail
  #
  #   if service_response.success?
  #     token_sale_state = service_response.data["user"]["token_sale_state"]
  #
  #     redirect_path = case token_sale_state
  #                       when 'profile_page'
  #                         "profile"
  #                       when 'do_double_opt_in_page'
  #                         "verification-link"
  #                       when 'bt_page'
  #                         "reserve-token"
  #                       when 'kyc_page'
  #                         "update-kyc"
  #                       else
  #                         nil
  #                     end
  #
  #     extra_param = "?initTokenSale=1" if Rails.env.development?
  #     redirect_to "/#{redirect_path}#{extra_param}", status: GlobalConstant::ErrorCode.temporary_redirect and return if redirect_path.present?
  #   else
  #     # redirect_to "/login#{extra_param}", status: GlobalConstant::ErrorCode.temporary_redirect
  #     cookies.delete(GlobalConstant::Cookie.user_cookie_name.to_sym, domain: :all)
  #   end
  #
  #   return
  #
  # end

end

