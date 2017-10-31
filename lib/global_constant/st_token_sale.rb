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

      def has_sale_ended_before_time?
        token_sale_details[:sale_ended_before_time] == true
      end

      private

      def token_sale_details
        return get_token_sale_details_from_memcache if get_token_sale_details_from_memcache.present?
        get_token_sale_details_from_api
      end

      def get_token_sale_details_from_memcache
        @get_token_sale_details_from_memcache ||= Memcache.read('token_sale.sale_details')
      end

      def get_token_sale_details_from_api
        response = SimpleTokenApi::Request::Sale.get_sale_stat
        return {} unless response.success?
        response.data
      end

      def config
        @config ||= GlobalConstant::Base.st_token_sale
      end

    end

  end

end
