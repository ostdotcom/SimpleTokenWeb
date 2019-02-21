module SimpleTokenApi
  module Request
    class IframeKyc < Base

      # Initialize
      #
      # * Author: Aman
      # * Date: 12/10/2017
      # * Reviewed By: Sunil
      #
      # @param [String] host (mandatory) - host url request
      # @param [Hash] cookies (optional) - cookies that need to be sent to API
      # @param [Hash] headers (optional) - headers that need to be sent to API
      #
      # @return [SimpleTokenApi::Request::User] returns an object of SimpleTokenApi::Request::User class
      #
      def initialize(host, cookies = {}, headers = {})
        super
        @service_base_route = 'kyc/'
      end

      # Get User info and client info for kyc page in iframe
      #
      # * Author: Aman
      # * Date: 12/10/2017
      # * Reviewed By:
      #
      #
      # @return [Result::Base] returns an object of Result::Base class
      #
      def basic_detail(template_type=nil, token=nil)
        extra_params = {}
        extra_params.merge!(template_type: template_type) if template_type.present?
        extra_params.merge!(token: token) if token.present?
        get("basic-detail", extra_params)
      end

    end
  end
end
