class Web::KycController < Web::BaseController

  layout "kyc"

  before_action :set_page_meta_info

  def index
    allow_from = Rails.env.staging? ? "https://alliswellkyc.stagingost.com" : "http://amankyc.developmentost.com:8080" #for local testing
    response.headers["X-Frame-Options"] = "allow-from #{allow_from}"
    response.headers["Content-Security-Policy"] = "frame-ancestors #{allow_from}"
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
