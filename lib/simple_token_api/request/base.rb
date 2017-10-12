module SimpleTokenApi
  module Request
    class Base

      include Util::ResultHelper

      require 'net/http'
      require 'cgi'

      # Initialize
      #
      # * Author: Aman
      # * Date: 12/10/2017
      # * Reviewed By:
      #
      # @param [Hash] cookies (optional) - cookies that need to be sent to API
      # @param [Hash] headers (optional) - headers that need to be sent to API
      #
      # @return [SimpleTokenApi::Request::Base] returns an object of SimpleTokenApi::Request::Base class
      #
      def initialize(cookies, headers)
        @cookies = cookies
        @headers = headers
        @request_class = nil
        @service_base_route = nil
        @api_url = nil
      end

      private

      # Get request
      #
      # * Author: Aman
      # * Date: 12/10/2017
      # * Reviewed By:
      #
      # @param [String] api_route (mandatory) - API route
      # @param [Hash] url_params_hash (optional) - API params
      #
      # @return [Result::Base] returns an object of Result::Base class
      #
      def get(api_route)
        @request_class = Net::HTTP::Get
        set_api_url(api_route)
        send
      end

      protected

      # Generate service URL with data
      #
      # * Author: Aman
      # * Date: 12/10/2017
      # * Reviewed By:
      #
      # @return [String] returns API URL
      #
      def set_api_url(api_route)
        @api_url = base_url + @service_base_route.to_s + api_route
      end

      # Base Simple Token API URL
      #
      # * Author: Aman
      # * Date: 18/04/2017
      # * Reviewed By: Sunil
      #
      # @return [String] returns BASE API URL
      #
      def base_url
        "#{GlobalConstant::Base.api_root_url}/api/"
      end

      # Get HTTP Request Object
      #
      # * Author: Aman
      # * Date: 12/10/2017
      # * Reviewed By:
      #
      # @param [String] request_uri (mandatory) - API route
      #
      # @return [Net::HTTP::Get or Net::HTTP::POST] return request object with headers and cookies
      #
      def get_request_obj(request_uri)
        req_obj = @request_class.new(request_uri)

        # Forward cookies
        req_obj['Cookie'] = @cookies.map { |k, v| "#{k}=#{CGI.escape v.to_s}" }.join('; ') if @cookies.present?


        # Forward headers
        @headers.each do |h, v|
          req_obj[h] = v
        end if @headers.present?

        req_obj
      end

      # make API Request
      #
      # * Author: Aman
      # * Date: 12/10/2017
      # * Reviewed By:
      #
      # @return [Result::Base] returns an object of Result::Base class
      #
      def send
        uri = URI(@api_url)
        http = Net::HTTP.new(uri.host, uri.port)
        unless Rails.env.development?
          http.use_ssl = true
          http.verify_mode = OpenSSL::SSL::VERIFY_NONE
        end
        http.read_timeout = GlobalConstant::Base.simple_token_api['read_timeout']
        http.open_timeout = GlobalConstant::Base.simple_token_api['open_timeout']
        req_obj = get_request_obj(uri.request_uri)

        http_response, e = nil, nil
        begin
          http_response = http.request(req_obj)
          set_api_response_cookie(http_response)
          parse_api_response(http_response)
        rescue Net::ReadTimeout, Net::OpenTimeout => e
          # Timeouts
          exception_with_internal_code(e, 'sta_timeout', 'simple token api timeout', GlobalConstant::ErrorCode.internal_server_error, debug_data)
        rescue Exception => e
          # Exceptions
          exception_with_internal_code(e, 'sta_exception', 'simple token api exception', GlobalConstant::ErrorCode.internal_server_error, debug_data)
        end

      end

      # Parse API response
      #
      # * Author: Aman
      # * Date: 12/10/2017
      # * Reviewed By:
      #
      # @return [Result::Base] returns an object of Result::Base class
      #
      def parse_api_response(http_response)
        response_data = Oj.load(http_response.body, mode: :strict) rescue {} #, {symbol_keys: true}

        case http_response.class.name
          when 'Net::HTTPOK'
            if response_data['success']
              # Success
              success_result(response_data['data'])
             elsif response_data['err']['action'] == 'permanent_redirect_required'
              # 301
              Rails.logger.info("=*=Simple-Token-API-ERROR=*= #{response_data.inspect}")
              error_with_internal_code('simple_token_api_redirect', 'simple token api redirect', GlobalConstant::ErrorCode.permanent_redirect, response_data['data'], response_data['err']['display_text'])
            else
              # API Error
              Rails.logger.info("=*=Simple-Token-API-ERROR=*= #{response_data.inspect}")
              error_with_internal_code('simple_token_api_error', 'simple token api error', GlobalConstant::ErrorCode.internal_server_error, {}, response_data['err']['display_text'])
            end
          else
            # HTTP error status code (500, 504...)
            exception_with_internal_code(Exception.new("Simple Token API STATUS CODE #{http_response.code.to_i}"), 'simple_token_api_exception', 'simple_token api exception', GlobalConstant::ErrorCode.internal_server_error, debug_data)
        end
      end

      # Debug data for exception emails
      #
      # * Author: Aman
      # * Date: 12/10/2017
      # * Reviewed By:
      #
      # @return [Hash] returns an hash of critical information for debugging
      #
      def debug_data
        {
          headers: @headers,
          api_url: @api_url
        }
      end

      # Handle API set cookies
      #
      # * Author: Aman
      # * Date: 12/10/2017
      # * Reviewed By:
      #
      # @param [HTTP response object] http_response (mandatory) - API response object
      #
      # Sets @cookies
      #
      def set_api_response_cookie(http_response)
        all_set_cookies = http_response.get_fields('set-cookie')
        return if all_set_cookies.blank?

        new_api_cookies = {}
        all_set_cookies.each do |api_cookie|
          api_cookie_elements = api_cookie.split("; ")
          cookie_name = ''
          api_cookie_elements.each_with_index do |c_element, i|
            c_sub_element = c_element.split('=', 2)
            c_sub_element_key = CGI::unescape(c_sub_element[0])
            c_sub_element_value = CGI::unescape(c_sub_element[1])
            # Zeroth element is cookie name and value
            if i == 0
              cookie_name = c_sub_element_key
              new_api_cookies[cookie_name] = {value: c_sub_element_value}
            elsif c_sub_element_key == "expires"
              new_api_cookies[cookie_name][c_sub_element_key.to_sym] = Time.parse(c_sub_element_value)
            elsif c_sub_element_key == "domain"
              new_api_cookies[cookie_name][c_sub_element_key.to_sym] = Rails.env.development? ? :all : c_sub_element_value
            else
              new_api_cookies[cookie_name][c_sub_element_key.to_sym] = c_sub_element_value
            end

          end
        end

        @cookies[GlobalConstant::Cookie.new_api_cookie_key.to_sym] = new_api_cookies

      end

    end
  end
end