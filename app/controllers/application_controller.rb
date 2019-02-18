class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :set_request_from_bot_flag

  # Sanitize params
  include Sanitizer
  before_action :sanitize_params

  after_action :handle_whitelisted_api_cookies

  include CookieConcern
  include ApplicationHelper


  # Reload the same url to retain cookie
  #
  # * Author: Aman
  # * Date: 09/10/2017
  # * Reviewed By:
  #
  def reload_for_external_links_to_retain_cookie
    return if request.referer.blank? || request.xhr?
    referer_host = URI(request.referer).host.to_s.downcase rescue nil
    if referer_host != (request.host.downcase) && is_referer_domain_allowed?(referer_host)
      render html: "", layout: "reload_url" and return
    end
  end

  # check if referer is allowed domain
  #
  # * Author: Mayur
  # * Date: 15/02/2019
  # * Reviewed By:
  #
  def is_referer_domain_allowed? (referer_host)
    GlobalConstant::WebDomain.allowed_referer_domains.include?(referer_host.split(".").last(2).join("."))
  end

  # Page not found action
  #
  # * Author: Kedar
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def not_found
    res = {
        error: 's_t_w_not_found',
        error_display_text: 'Page not found',
        http_code: GlobalConstant::ErrorCode.not_found
    }
    @response = Result::Base.error(res)
    render_error_response_for(@response)
  end

  # redirect all requests on Simple Token Domain to OST Domain
  #
  # * Author: Puneet
  # * Date: 12/03/2017
  # * Reviewed By:
  #
  def handle_redirects_from_simple_token_domain
    # replace first '/' with ''
    path = request.fullpath.sub('/', '')
    redirect_to "#{GlobalConstant::Base.company_other_product_urls['root_url']}#{path}", status: GlobalConstant::ErrorCode.permanent_redirect and return
  end

  private

  # Dont allow browser caching for token sale pages
  #
  # * Author: Aman
  # * Date: 01/11/2017
  # * Reviewed By: Sunil
  #
  def remove_browser_caching
    response.headers['Pragma'] = 'no-cache'
    response.headers['Cache-Control'] = 'no-store, no-cache, max-age=0, must-revalidate, post-check=0, pre-check=0'
    response.headers['Vary'] = '*'
    response.headers['Expires'] = '-1'
    response.headers['Last-Modified'] = "#{Time.now.gmtime.strftime("%a, %d %b %Y %T GMT")}"
  end

  # Check if redirect or render has been performed
  #
  # * Author: Aman
  # * Date: 15/02/2018
  # * Reviewed By:
  #
  def has_performed?
    performed?
  end

  # Get user agent
  #
  # * Author: Kedar
  # * Date: 10/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def http_user_agent
    request.env['HTTP_USER_AGENT'].to_s
  end

  # Get host_url_with_protocol
  #
  # * Author: Aman
  # * Date: 29/01/2018
  # * Reviewed By:
  #
  def host_url_with_protocol
    "#{request.protocol}#{request.host}"
  end

  # Get host_url
  #
  # * Author: Aman
  # * Date: 29/01/2018
  # * Reviewed By:
  #
  def host_url
    request.host
  end

  # Get Ip Address
  #
  # * Author: Aman
  # * Date: 15/10/2017
  # * Reviewed By: Sunil
  #
  def ip_address

    # China:
    # return '220.181.108.118'
    # US:
    # return '72.229.28.185'
    # Germany:
    # return '85.214.132.117'

    request.remote_ip.to_s
  end

  # set bot request flag in params
  #
  # * Author: Kedar
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def set_request_from_bot_flag
    res = http_user_agent.match(/\b(Baidu|Baiduspider|Gigabot|Googlebot|thefind|webmeup-crawler.com|libwww-perl|lwp-trivial|msnbot|SiteUptime|Slurp|ZIBB|wget|ia_archiver|ZyBorg|bingbot|AdsBot-Google|AhrefsBot|FatBot|shopstyle|pinterest.com|facebookexternalhit|Twitterbot|crawler.sistrix.net|PolyBot|rogerbot|Pingdom|Mediapartners-Google|bitlybot|BlapBot|Python|www.socialayer.com|Sogou|Scrapy|ShopWiki|Panopta|websitepulse|NewRelicPinger|Sailthru|JoeDog|SocialWire|CCBot|yacybot|Halebot|SNBot|SEOENGWorldBot|SeznamBot|libfetch|QuerySeekerSpider|A6-Indexer|PAYONE|GrapeshotCrawler|curl|ShowyouBot|NING|kraken|MaxPointCrawler|efcrawler|YisouSpider|BingPreview|MJ12bot)\b/i)
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

  # tmp basic auth
  #
  # * Author: Aman
  # * Date: 15/10/2017
  # * Reviewed By: Sunil
  #
  def browser_basic_auth
    if Rails.env.staging? || (Rails.env.production? && request.host == 'punekyc.ost.com')
      users = {'simpleToken' => ['A$F^&n!@$ghf%7']}

      authenticate_or_request_with_http_basic do |username, password|
        if users[username].present? && users[username][0] == password
          true
        else
          false
        end
      end

    end
  end

  # Set page meta info
  #
  # * Author: Kedar
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def set_page_meta_info(custom_extended_data = {})
    service_response = GetPageMetaInfo.new(
        controller: (@preview_template.present? ? @preview_template[:controller] : params[:controller]),
        action: (@preview_template.present? ? @preview_template[:action] : params[:action]),
        request_url: request.url,
        custom_extended_data: custom_extended_data
    ).perform

    unless service_response.success?
      raise 'Incomplete Page Meta.'
    end

    page_extended_data = service_response.data

    @page_meta_data = page_extended_data[:meta]
    @page_assets_data = page_extended_data[:assets]
  end

  # Render error response pages
  #
  # * Author: Aman
  # * Date: 13/10/2017
  # * Reviewed By: Sunil
  #
  def render_error_response(service_response)
    # Clean critical data
    service_response.data = {}

    if service_response.http_code == GlobalConstant::ErrorCode.unauthorized_access
      if request.xhr?
        (render plain: Oj.dump(service_response.to_json, mode: :compat), status: service_response.http_code) and return
      else
        redirect_to default_unauthorized_redirect_url, status: GlobalConstant::ErrorCode.temporary_redirect and return
      end
    elsif service_response.http_code == GlobalConstant::ErrorCode.temporary_redirect
      redirect_url = (service_response["error_extra_info"] || {})["redirect_url"]
      redirect_url = redirect_url.present? ? redirect_url : GlobalConstant::Base.simple_token_web['kyc_root_url']
      redirect_to redirect_url, status: GlobalConstant::ErrorCode.temporary_redirect and return
    else
      render_error_response_for(service_response)
    end
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

    # Clean critical data
    service_response.data = {}

    if request.xhr?
      (render plain: Oj.dump(service_response.to_json, mode: :compat), status: http_code) and return
    else
      render file: "public/#{http_code}.html", layout: false, status: http_code and return
    end

  end

  # Handle API specific whitelisted cookies
  #
  # * Author: Aman
  # * Date: 13/10/2017
  # * Reviewed By: Sunil
  #
  def handle_whitelisted_api_cookies
    new_api_cookies = request.cookies[GlobalConstant::Cookie.new_api_cookie_key.to_sym]
    return if new_api_cookies.blank?
    whitelisted_api_cookies = [GlobalConstant::Cookie.user_cookie_name, GlobalConstant::Cookie.admin_cookie_name]
    whitelisted_api_cookies.each do |key|
      whitelisted_cookie = new_api_cookies[key]
      if whitelisted_cookie.present? and whitelisted_cookie.is_a?(Hash)
        cookies[key.to_sym] = whitelisted_cookie
      end
    end
  end

  # Delete the given cookie
  #
  # * Author: Aman
  # * Date: 15/10/2017
  # * Reviewed By: Sunil
  #
  def delete_cookie(cookie_name)
    # cookies.delete(cookie_name.to_sym, domain: :all, secure: !Rails.env.development?, same_site: :strict)
    cookies.delete(cookie_name.to_sym, domain: request.host, secure: !(Rails.env.development? || Rails.env.staging?), same_site: :strict)
  end

  # Set the given cookie
  #
  # * Author: Aman
  # * Date: 23/10/2017
  # * Reviewed By: Sunil
  #
  def set_cookie(cookie_name, value, expires, options = {})
    http_only_val = options[:http_only].nil? ? true : options[:http_only]
    secure_val = options[:secure].nil? ? !(Rails.env.development? || Rails.env.staging?) : options[:secure]

    cookies[cookie_name.to_sym] = {
        value: value,
        expires: expires,
        domain: request.host,
        http_only: http_only_val,
        secure: secure_val,
        same_site: :strict
    }
  end


end
