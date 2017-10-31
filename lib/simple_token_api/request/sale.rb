module SimpleTokenApi
  module Request
    class Sale < Base

      # Initialize
      #
      # * Author: Aman
      # * Date: 31/10/2017
      # * Reviewed By: Sunil
      #
      # @param [Hash] cookies (optional) - cookies that need to be sent to API
      # @param [Hash] headers (optional) - headers that need to be sent to API
      #
      # @return [SimpleTokenApi::Request::Sale] returns an object of SimpleTokenApi::Request::Sale class
      #
      def initialize(cookies = {}, headers = {})
        super
        @service_base_route = 'sale/'
      end

      # Get Sale active detail
      #
      # * Author: Aman
      # * Date: 31/10/2017
      # * Reviewed By: Sunil
      #
      #
      # @return [Result::Base] returns an object of Result::Base class
      #
      def get_sale_stat
        get("details")
      end

    end
  end
end
