class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :set_request_from_bot_flag

  # Sanitize params
  include Sanitizer
  before_action :sanitize_params

  include CookieConcern
  include ApplicationHelper

  # Page not found action
  #
  # * Author: Kedar
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def not_found
    res = {
      error: 'stw_not_found',
      error_display_text: 'Page not found',
      http_code: GlobalConstant::ErrorCode.not_found
    }
    @response = Result::Base.error(res)
    render_error_response_for(@response)
  end

  private

  # set bot request flag in params
  #
  # * Author: Kedar
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def set_request_from_bot_flag
    res = request.env['HTTP_USER_AGENT'].to_s.match(/\b(Baidu|Baiduspider|Gigabot|Googlebot|thefind|webmeup-crawler.com|libwww-perl|lwp-trivial|msnbot|SiteUptime|Slurp|ZIBB|wget|ia_archiver|ZyBorg|bingbot|AdsBot-Google|AhrefsBot|FatBot|shopstyle|pinterest.com|facebookexternalhit|Twitterbot|crawler.sistrix.net|PolyBot|rogerbot|Pingdom|Mediapartners-Google|bitlybot|BlapBot|Python|www.socialayer.com|Sogou|Scrapy|ShopWiki|Panopta|websitepulse|NewRelicPinger|Sailthru|JoeDog|SocialWire|CCBot|yacybot|Halebot|SNBot|SEOENGWorldBot|SeznamBot|libfetch|QuerySeekerSpider|A6-Indexer|PAYONE|GrapeshotCrawler|curl|ShowyouBot|NING|kraken|MaxPointCrawler|efcrawler|YisouSpider|BingPreview|MJ12bot)\b/i)
    params[:is_bot] = res.present? ? 1 : 0
  end

  # Sanitize params
  #
  # * Author: Kedar
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def sanitize_params
    sanitize_params_recursively(params)
  end

  # Set page meta info
  #
  # * Author: Kedar
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def set_page_meta_info(custom_extended_data = {})
    service_response = GetPageMetaInfo.new(
      controller: params[:controller],
      action: params[:action],
      request_url: request.url,
      custom_extended_data: custom_extended_data
    ).perform

    unless service_response.success?
      raise "Incomplete Page Meta."
    end

    page_extended_data = service_response.data

    @page_meta_data = page_extended_data[:meta]
    @page_assets_data = page_extended_data[:assets]
  end

  # Render error response for
  #
  # * Author: Kedar
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def render_error_response_for(service_response)
    http_code = service_response.http_code
    @page_assets_data = {specific_js_required: 0}

    if request.xhr?
      (render plain: Oj.dump(service_response.to_json, mode: :compat), status: http_code) and return
    else
      render file: "public/#{http_code}.html", layout: false, status: http_code and return
    end

  end

  def skip_action_for_logged_out_user
    redirect_to root_url, status: 301 and return if @current_user.blank?
  end


  :private

  def step_1_logged_in?
    redirect_to '/admin/authentication' and return if step1_cookie_present?
  end

  def step_2_logged_in?
    redirect_to '/admin/dashboard' and return if step2_cookie_present?
  end

  def step1_cookie_present?
    @cookie_type == 'step_1'
  end

  def step2_cookie_present?
    @cookie_type == 'step_2'
  end

  def parse_cookie
    @cookie_type = nil
    cookie = cookies[GlobalConstant::Cookie.admin_cookie_name.to_sym]
    return unless cookie.present?
    @cookie_type = 'step_1' and return if cookie.include?(":s:")
    @cookie_type = 'step_2' if cookie.include?(":d:")
  end

end
