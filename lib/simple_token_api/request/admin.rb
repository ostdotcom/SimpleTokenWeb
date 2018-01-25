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

      # Get details for client info
      #
      # * Author: Aman
      # * Date: 09/01/2017
      # * Reviewed By:
      #
      # @return [Result::Base] returns an object of Result::Base class
      #
      def get_client_detail
        get("profile/detail")
      end

      # Get details for admin mfa authentication
      #
      # * Author: Aman
      # * Date: 09/01/2017
      # * Reviewed By:
      #
      # @return [Result::Base] returns an object of Result::Base class
      #
      def get_ga_url
        get("get-ga-url")
      end

      # Get User info
      #
      # * Author: Aman
      # * Date: 12/10/2017
      # * Reviewed By: Sunil
      #
      #
      # @return [Result::Base] returns an object of Result::Base class
      #
      def dashboard_detail(params)
        request_params = {
            offset: params[:start],
            page_size: params[:length]
        }
        request_params[:filters] = params[:filters].permit! if params[:filters].present?
        request_params[:sortings] = params[:sortings].permit! if params[:sortings].present?

        get("kyc/dashboard", request_params)
      end

      # Get Kyc info
      #
      # * Author: Alpesh
      # * Date: 15/10/2017
      # * Reviewed By: Sunil
      #
      #
      # @return [Result::Base] returns an object of Result::Base class
      #
      def get_kyc_details(params)
        request_params = {case_id: params[:case_id]}
        request_params[:filters] = params[:filters].permit! if params[:filters].present?
        request_params[:sortings] = params[:sortings].permit! if params[:sortings].present?
        get("kyc/check-details", request_params)
      end

      # Get Kyc action logs
      #
      # * Author: Alpesh
      # * Date: 15/10/2017
      # * Reviewed By: Sunil
      #
      #
      # @return [Result::Base] returns an object of Result::Base class
      #
      def get_kyc_action_logs(params)
        request_params = {case_id: params[:case_id], offset: params[:start], limit: params[:length]}
        get("kyc/kyc-action-logs", request_params)
      end

      # Get User info
      #
      # * Author: Aman
      # * Date: 12/10/2017
      # * Reviewed By: Sunil
      #
      #
      # @return [Result::Base] returns an object of Result::Base class
      #
      def whitelist_dashboard_detail(params)
        request_params = {
            offset: params[:start],
            page_size: params[:length]
        }
        request_params[:filters] = params[:filters].permit! if params[:filters].present?
        request_params[:sortings] = params[:sortings].permit! if params[:sortings].present?

        get("kyc/whitelist-dashboard", request_params)
      end

      # Get Sale dashboard info
      #
      # * Author: Alpesh
      # * Date: 09/11/2017
      # * Reviewed By: Sunil
      #
      #
      # @return [Result::Base] returns an object of Result::Base class
      #
      def sale_daily_dashboard_detail(params)
        request_params = {
            offset: params[:start],
            page_size: params[:length],
            tab_type: params[:tab_type]
        }

        get("kyc/sale-daily-dashboard", request_params)
      end

      # Get Sale dashboard info
      #
      # * Author: Alpesh
      # * Date: 09/11/2017
      # * Reviewed By: Sunil
      #
      #
      # @return [Result::Base] returns an object of Result::Base class
      #
      def sale_all_dashboard_detail(params)
        request_params = {
            offset: params[:start],
            page_size: params[:length]
        }

        get("kyc/sale-all-dashboard", request_params)
      end

      # Get Contract Events Dashboard
      #
      # * Author: Alpesh
      # * Date: 10/11/2017
      # * Reviewed By:
      #
      #
      # @return [Result::Base] returns an object of Result::Base class
      #
      def contract_events_dashboard_detail(params)
        request_params = {
            offset: params[:start],
            page_size: params[:length]
        }

        get("kyc/contract-events-dashboard", request_params)
      end

      private

      # Base kyc API URL for Admin Apis
      #
      # * Author: Aman
      # * Date: 25/01/2018
      # * Reviewed By:
      #
      # @return [String] returns BASE API URL
      #
      def base_url
        "#{GlobalConstant::Base.kyc_api_root_url}/api/"
      end

    end
  end
end
