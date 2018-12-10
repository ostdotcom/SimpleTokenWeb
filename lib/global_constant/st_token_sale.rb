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

      def get_client_details(params)
        res = get_client_settings_from_memcache(params)
        res = res.success? ? res : get_client_settings_from_api(params)
        res
      end

      private

      def get_client_settings_from_memcache(params)
        memcache_key_object = MemcacheKey.new('client.client_setting_detail')

        key = memcache_key_object.key_template % {
            host_url: params[:host_url],
            entity_type: params[:entity_type]
        }

        response = Memcache.get_set_memcached(key, memcache_key_object.expiry) do
          get_client_settings_from_api(params)
        end

        Memcache.delete(key) unless response.success?
        response
      end

      def get_client_settings_from_api(params)
        SimpleTokenApi::Request::User.new(
            params[:host_url_with_protocol],
            {},
            {}).client_detail(params[:entity_type])
      end

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
