class Web::TokenSaleController < Web::BaseController

  layout "web"

  before_action :set_page_meta_info

  # Token sale index
  #
  # * Author: Tahir
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def index
    @presenter_obj = ::Presenters::Web::Global.new(request.host, params)
  end

end
