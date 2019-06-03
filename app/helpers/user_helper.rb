module UserHelper

  # check if cookie consent banner is to be shown
  def show_cookie_consent_banner?
    !request.host.include?("sandboxost.com") && ['login', 'sign_up', 'reset_password'].include?(params[:action])
  end

end