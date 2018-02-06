module SimpleTokenApi
  module Request
    class User < Base

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
        @service_base_route = 'user/'
      end

      # Get User info
      #
      # * Author: Aman
      # * Date: 12/10/2017
      # * Reviewed By:
      #
      #
      # @return [Result::Base] returns an object of Result::Base class
      #
      def basic_detail
        get("basic-detail")
      end

      # Get User profile page info
      #
      # * Author: Aman
      # * Date: 13/10/2017
      # * Reviewed By:
      #
      #
      # @return [Result::Base] returns an object of Result::Base class
      #
      def profile_detail()
        get("profile")
      end

    end
  end
end
