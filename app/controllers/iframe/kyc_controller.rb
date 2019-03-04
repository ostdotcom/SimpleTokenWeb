class Iframe::KycController < Iframe::BaseController

  layout "iframe"

  before_action :check_request_host
  before_action :check_referer, only: [:kyc_form]
  # after_action :remove_browser_caching


  # KYC form
  #
  # * Author: Tahir
  # * Date: 10/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def kyc_form
    allow_from = Rails.env.staging? ? "https://alliswellkyc.stagingost.com" : "http://amankyc.developmentost.com:8080" #for local testing
     #
    service_response = SimpleTokenApi::Request::IframeKyc.new(
        host_url_with_protocol,
        {},
        {"User-Agent" => http_user_agent}).basic_detail(GlobalConstant::TemplateType.kyc_template_type, params[:token])

    # Check if error present or not?
    unless service_response.success?
      render_error_response(service_response)
      return
    end

    @presenter_obj = ::Web::Client::Setup.new(service_response, params)
    @user = service_response.data["user"]

    get_ip_to_preferred_aml_country
    set_page_meta_info(@presenter_obj.custom_meta_tags)
    response.headers["X-Frame-Options"] = "allow-from #{allow_from}"
    response.headers["Content-Security-Policy"] = "frame-ancestors #{allow_from}"
    end


  private

  # allow requests from whitelisted domains only
  #
  # * Author: Aman
  # * Date: 01/11/2017
  # * Reviewed By: Sunil
  #
  def check_request_host
    return if ['http://', 'https://'].include?(request.protocol.downcase) &&
        ((request.host.downcase =~ /\Aiframe#{GlobalConstant::WebDomain.kyc_subdomain}\Z/i))

    # render error page
    redirect_to GlobalConstant::Base.simple_token_web['kyc_root_url'], status: GlobalConstant::ErrorCode.temporary_redirect and return
  end


  def check_referer
    referer_host = URI(request.referer).host.to_s.downcase
    return if  referer_host == "alliswellkyc.stagingost.com"

    redirect_to GlobalConstant::Base.simple_token_web['kyc_root_url'], status: GlobalConstant::ErrorCode.temporary_redirect and return
  end


end
