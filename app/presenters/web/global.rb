module Presenters
  module Web
    class Global

      # Init
      #
      # @param [Hash] params (optional) - Page params
      #
      # @return [Presenters::Web::Global] returns an object of Presenters::Web::Global class
      #
      def initialize(params = {})
        @params = params
      end

      def has_early_access_register_started?
        current_time >= GlobalConstant::StTokenSale.early_access_register_start_date
      end

      def has_early_access_register_ended?
        current_time >= GlobalConstant::StTokenSale.early_access_register_end_date
      end

      def has_early_access_sale_started?
        current_time >= GlobalConstant::StTokenSale.early_access_sale_start_date
      end

      def has_early_access_sale_ended?
        current_time >= GlobalConstant::StTokenSale.general_access_sale_start_date
      end

      def has_general_access_sale_started?
        current_time >= GlobalConstant::StTokenSale.general_access_sale_start_date
      end

      def has_sale_ended?
        current_time >= GlobalConstant::StTokenSale.general_access_sale_end_date
      end

      private

      def current_time
        @current_time ||= Time.zone.now
      end

    end
  end
end