class Web::KycController < Web::BaseController

  layout "kyc"

  before_action :set_page_meta_info

  def index
    redirect_to "/admin/login", status: GlobalConstant::ErrorCode.temporary_redirect and return if Rails.env.sandbox?
  end

  # Action to show GDPR policies
  #
  # * Author: Pankaj
  # * Date: 24/05/2018
  # * Reviewed By:
  #
  def gdpr_policy
  end

end
