class Web::UserController < Web::BaseController

  layout "web"

  # before_action :already_logged_in, only: [:sign_up, :login]

  before_action :set_page_meta_info


  # Sign up
  #
  # * Author: Tahir
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def sign_up
  end

  # Login
  #
  # * Author: Tahir
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def login
  end

  # Reset password
  #
  # * Author: Tahir
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def reset_password
  end

  # Change password
  #
  # * Author: Tahir
  # * Date: 10/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def change_password
  end

  # KYC form
  #
  # * Author: Tahir
  # * Date: 10/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def kyc_form
  end

  # Branded token form
  #
  # * Author: Tahir
  # * Date: 10/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def branded_token_form
  end

  # Branded token form
  #
  # * Author: Tahir
  # * Date: 10/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def verification_link
  end

  # Branded token form
  #
  # * Author: Tahir
  # * Date: 13/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def dashboard_home
  end

end
