module UserHelper

  # check if cookie consent banner is to be shown
  def show_cookie_consent_banner?
    ['login', 'sign_up', 'reset_password'].include?(params[:action])
  end

end