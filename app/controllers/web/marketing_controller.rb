class Web::MarketingController < Web::BaseController
  layout "marketing"

  before_action :set_page_meta_info

  # Marketing landing page
  #
  # * Author: Tahir
  # * Date: 20/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def index
    redirect_to '/', status: GlobalConstant::ErrorCode.permanent_redirect and return
    # @presenter_obj = ::Web::Global.new(host_url_with_protocol, params)
  end

end

