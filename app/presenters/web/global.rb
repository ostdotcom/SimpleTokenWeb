  module Web
    class Global

      include Util::SaleMilestone

      # Init
      #
      # @param [String] host (mandatory) - host url
      # @param [Hash] params (optional) - Page params
      #
      # @return [Web::Global] returns an object of Web::Global class
      #
      def initialize(host, params = {})
        @host = host
        @params = params
      end

      def sale_details
        @sale_details ||= GlobalConstant::StTokenSale.token_sale_details(@host)
      end

      def has_sale_ended_before_time?
        true
      end


      def has_general_access_sale_started?
        current_time >= GlobalConstant::StTokenSale.general_access_sale_start_date
      end

      def has_early_access_sale_started?
        current_time >= GlobalConstant::StTokenSale.early_access_sale_start_date
      end

      def is_early_access_sale_on?
        (current_time >= GlobalConstant::StTokenSale.early_access_sale_start_date) && !has_general_access_sale_started?
      end

      def has_early_access_register_ended?
        current_time >= GlobalConstant::StTokenSale.early_access_register_end_date
      end

      def has_early_access_register_started?
        current_time >= GlobalConstant::StTokenSale.early_access_register_start_date
      end

      def has_sale_ended?
        has_early_access_sale_started? && (current_time >= GlobalConstant::StTokenSale.general_access_sale_end_date || has_sale_ended_before_time?)
      end

      def has_sale_paused?
        false
      end

      private

      def current_time
        @current_time ||= Time.zone.now
      end

    end
end