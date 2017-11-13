module Presenters
  module Web
    class Global

      include Util::SaleMilestone

      # Init
      #
      # @param [Hash] params (optional) - Page params
      #
      # @return [Presenters::Web::Global] returns an object of Presenters::Web::Global class
      #
      def initialize(params = {})
        @params = params
      end

      def sale_details
        @sale_details ||= GlobalConstant::StTokenSale.token_sale_details
      end

      def has_sale_ended_before_time?
        sale_details['sale_ended_before_time'].to_i == 1
      end

      def token_sale_active_status
        sale_details['token_sale_active_status']
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
        (token_sale_active_status.to_i != 1) && has_early_access_sale_started?
      end

      private

      def current_time
        @current_time ||= Time.zone.now
      end

    end
  end
end