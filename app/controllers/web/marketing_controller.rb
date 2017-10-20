class Web::MarketingController < Web::BaseController
  layout "marketing"

  before_action :set_page_meta_info

  before_action :tmp_basic_auth

  # Marketing landing page
  #
  # * Author: Tahir
  # * Date: 20/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def index
  end

end

