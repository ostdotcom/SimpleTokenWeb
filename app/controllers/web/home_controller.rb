class Web::HomeController < Web::BaseController
  layout "web"

  before_action :set_page_meta_info, except: [:redirect_to_team]

  # Action for the home page index
  #
  # * Author: Kedar
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def index
  end

  # Action for the about page
  #
  # * Author: Kedar
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def about
  end

  # Redirect to /team page
  #
  # * Author: Akshay
  # * Date: 26/10/2017
  # * Reviewed By:
  #
  def redirect_to_team
    redirect_to '/team', status: GlobalConstant::ErrorCode.permanent_redirect and return
  end

  # Action for the privacy page
  #
  # * Author: Kedar
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def privacy
  end

  # Action for the terms page
  #
  # * Author: Kedar
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def terms
  end

  # Action for the documents page
  #
  # * Author: Kedar
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def documents
  end

  # Action for the product page
  #
  # * Author: Akshay
  # * Date: 28/10/2017
  # * Reviewed By:
  #
  def product
  end

  # Action for the check page
  #
  # * Author: Aman
  # * Date: 28/10/2017
  # * Reviewed By: Sunil
  #
  def check
    @country = get_country_from_ip.upcase
    @ip_address = ip_address
  end
end
