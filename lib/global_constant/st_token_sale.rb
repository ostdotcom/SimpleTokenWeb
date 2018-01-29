# frozen_string_literal: true
module GlobalConstant

  class StTokenSale

    class << self

      def has_sale_ended?
        Time.zone.now >= general_access_sale_end_date
      end

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

      def soft_cap_st_tokens_milestone
        @soft_cap_st_tokens_milestone ||= config['sale_milestones']['soft_cap']
      end

      def target_st_tokens_milestone
        @target_st_tokens_milestone ||= config['sale_milestones']['target']
      end

      def kicker_st_tokens_milestone
        @kicker_st_tokens_milestone ||= config['sale_milestones']['kicker']
      end

      def power_st_tokens_milestone
        @power_st_tokens_milestone ||= config['sale_milestones']['power']
      end

      def hard_cap_st_tokens_milestone
        @hard_cap_st_tokens_milestone ||= config['sale_milestones']['hard_cap']
      end

      def token_sale_details(host_url)
        data = get_token_sale_details_from_memcache
        res = data.present? ? data[:sale_details] : get_token_sale_details_from_api(host_url)
        HashWithIndifferentAccess.new(res)
      end

      private

      def get_token_sale_details_from_memcache
        memcache_key_object = MemcacheKey.new('token_sale.sale_details')
        Memcache.read(memcache_key_object.key_template)
      end

      def get_token_sale_details_from_api(host_url)
        response = SimpleTokenApi::Request::Sale.new(host_url).get_sale_stat
        return {} unless response.success?
        response.data["sale_details"]
      end

      def config
        @config ||= GlobalConstant::Base.st_token_sale
      end

    end

  end

end
