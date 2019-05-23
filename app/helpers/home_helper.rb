module HomeHelper

  # check if cookie consent banner is to be shown
  def show_cookie_consent_banner_admin?
    ['forgot_password', 'login', 'activate_account'].include?(params[:action])
  end

end