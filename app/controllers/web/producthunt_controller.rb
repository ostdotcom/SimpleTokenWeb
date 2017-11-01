class Web::ProducthuntController < Web::BaseController
  layout "producthunt"

  before_action :set_page_meta_info

  # Marketing landing page
  #
  # * Author: Tahir
  # * Date: 01/11/2017
  # * Reviewed By: Sunil Khedar
  #
  def index
    @presenter_obj = ::Presenters::Web::Global.new(params)
  end

end

