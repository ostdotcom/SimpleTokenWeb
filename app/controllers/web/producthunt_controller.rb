class Web::ProducthuntController < Web::BaseController
  # layout "producthunt"

  # before_action :set_page_meta_info

  # Producthunt landing page
  #
  # * Author: Tahir
  # * Date: 01/11/2017
  # * Reviewed By: Sunil Khedar
  #
  def index
    redirect_to '/', status: GlobalConstant::ErrorCode.permanent_redirect and return
  end

end

