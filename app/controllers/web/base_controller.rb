class Web::BaseController < ApplicationController


  # Redirect to page based on user state
  #
  # * Author: Aman
  # * Date: 12/10/2017
  # * Reviewed By:
  #TODO:: REVISIT
  def verify_user_info_from_cookie
    service_response = SimpleTokenApi::Request::User.new(request.cookies, {"HTTP_USER_AGENT" => request.env['HTTP_USER_AGENT']}).get_info

    if service_response.success?

      data = service_response.data

      redirect_path = case data["user_state"]
                       when 'optin_done'
                         "profile"
                       when 'bt_done'
                         "verification-link"
                       when 'kyc_submit_done'
                         "reserve-token"
                       when 'kyc_submit_pending'
                         "update-kyc"
                       else
                         "login"
                     end


      case "#{params[:controller]}::#{params[:action]}"
        when "web/user::login"
          redirect_path = "" if redirect_path == "login"
        when "web/user::sign_up"
          redirect_path = "" if redirect_path == "login"
        when "web/user::branded_token_form"
          redirect_path = "" if redirect_path == "reserve-token"
        when "web/user::verification_link"
          redirect_path = "" if redirect_path == "verification-link"
      end

      extra_param = "?initTokenSale=1"

      redirect_to "/#{redirect_path}#{extra_param}", status: GlobalConstant::ErrorCode.temporary_redirect and return if redirect_path.present?

      else
        if service_response.err.code == "um_vc_5"
          redirect_to "/login#{extra_param}", status: GlobalConstant::ErrorCode.temporary_redirect
          cookies.delete(GlobalConstant::Cookie.user_cookie_name.to_sym, domain: :all)
          return
        end
    end


  end

end

