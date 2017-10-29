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

      def has_general_access_sale_started?
        current_time >= GlobalConstant::StTokenSale.general_access_sale_start_date
      end

      def has_early_access_register_ended?
        current_time >= GlobalConstant::StTokenSale.early_access_register_end_date
      end

      def has_early_access_register_started?
        current_time >= GlobalConstant::StTokenSale.early_access_register_start_date
      end

      def has_sale_ended?
        current_time >= GlobalConstant::StTokenSale.general_access_sale_end_date
      end

      def progress_bar_percent
        if has_sale_ended?
          100
        elsif has_general_access_sale_started?
          66.66 + interval_percent(GlobalConstant::StTokenSale.general_access_sale_start_date, GlobalConstant::StTokenSale.general_access_sale_end_date)
        elsif has_early_access_register_ended?
          33.33 + interval_percent(GlobalConstant::StTokenSale.early_access_register_end_date, GlobalConstant::StTokenSale.general_access_sale_start_date)
        else
          interval_percent(GlobalConstant::StTokenSale.early_access_register_start_date, GlobalConstant::StTokenSale.early_access_register_end_date)
        end
      end

      def interval_percent(start_date, end_date)
        total_time_interval = end_date - start_date
        time_passed = current_time - start_date
        extra_percent = (time_passed*(33.33)/total_time_interval)
        extra_percent
      end

      private

      def current_time
        @current_time ||= Time.zone.now
      end

    end
  end
end