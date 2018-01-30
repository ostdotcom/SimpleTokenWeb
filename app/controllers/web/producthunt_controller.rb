class Web::ProducthuntController < Web::BaseController
  layout "producthunt"

  before_action :set_page_meta_info

  # Producthunt landing page
  #
  # * Author: Tahir
  # * Date: 01/11/2017
  # * Reviewed By: Sunil Khedar
  #
  def index
    @presenter_obj = ::Presenters::Web::Global.new(host_url_with_protocol, params)
  end

end

