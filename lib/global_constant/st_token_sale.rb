# frozen_string_literal: true
module GlobalConstant

  class StTokenSale

    class << self

      def early_access_sale_start_date
       Time.zone.parse(config['sale_dates']['early_access_sale_start_date'])
      end

      def general_access_sale_start_date
        Time.zone.parse(config['sale_dates']['general_access_sale_start_date'])
      end

      def general_access_sale_end_date
        Time.zone.parse(config['sale_dates']['general_access_sale_end_date'])
      end

      def early_access_register_start_date
        Time.zone.parse(config['user_register_dates']['early_access_register_start_date'])
      end

      def early_access_register_end_date
        Time.zone.parse(config['user_register_dates']['early_access_register_end_date'])
      end

      private

      def config
        @config ||= GlobalConstant::Base.st_token_sale
      end

    end

  end

end
