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
        token_sale_details[:sale_ended_before_time].to_i == 1
      end

      private

      def token_sale_details
        data = get_token_sale_details_from_memcache
        data.present? ? data[:sale_details] : get_token_sale_details_from_api
      end

      def get_token_sale_details_from_memcache
        memcache_key_object = MemcacheKey.new('token_sale.sale_details')
        Memcache.read(memcache_key_object.key_template)
      end

      def get_token_sale_details_from_api
        response = SimpleTokenApi::Request::Sale.new.get_sale_stat
        return {} unless response.success?
        HashWithIndifferentAccess.new(response.data["sale_details"])
      end

      def config
        @config ||= GlobalConstant::Base.st_token_sale
      end

    end

  end

end
