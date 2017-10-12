class Web::BaseController < ApplicationController


  # Redirect to page based on user state
  #
  # * Author: Aman
  # * Date: 12/10/2017
  # * Reviewed By:
  #
  def verify_user_info_from_cookie
    service_response = SimpleTokenApi::Request::User.new(request.cookies).get_info

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

    end

  end

end

