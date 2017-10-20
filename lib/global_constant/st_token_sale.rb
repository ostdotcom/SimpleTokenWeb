# frozen_string_literal: true
module GlobalConstant

  class StTokenSale

    class << self

      def pre_sale_start_date
       Time.zone.parse(config['sale_dates']['pre_sale_start_date'])
      end

      def public_sale_start_date
        Time.zone.parse(config['sale_dates']['public_sale_start_date'])
      end

      def public_sale_end_date
        Time.zone.parse(config['sale_dates']['public_sale_end_date'])
      end

      def pre_sale_register_start_date
        Time.zone.parse(config['user_register_dates']['pre_sale_register_start_date'])
      end

      def pre_sale_register_end_date
        Time.zone.parse(config['user_register_dates']['pre_sale_register_end_date'])
      end

      private

      def config
        @config ||= GlobalConstant::Base.st_token_sale
      end

    end

  end

end
