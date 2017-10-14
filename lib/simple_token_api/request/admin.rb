module SimpleTokenApi
  module Request
    class Admin < Base

      # Initialize
      #
      # * Author: Aman
      # * Date: 12/10/2017
      # * Reviewed By: Sunil
      #
      # @param [Hash] cookies (optional) - cookies that need to be sent to API
      # @param [Hash] headers (optional) - headers that need to be sent to API
      #
      # @return [SimpleTokenApi::Request::User] returns an object of SimpleTokenApi::Request::User class
      #
      def initialize(cookies = {}, headers = {})
        super
        @service_base_route = 'admin/'
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
      def dashboard_detail(params)
        request_params = {filters: params[:filters].permit!, sortings: params[:sortings].permit!, page_number: 1}
        get("kyc/dashboard", request_params)
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
      def get_kyc_details(params)
        request_params = {case_id: params[:case_id]}
        get("kyc/check-details", request_params)
      end

    end
  end
end
