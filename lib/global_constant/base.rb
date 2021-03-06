# frozen_string_literal: true
module GlobalConstant

  class Base

    class << self

      # Simple token web config
      #
      # * Author: Kedar
      # * Date: 09/10/2017
      # * Reviewed By: Sunil Khedar
      #
      def simple_token_web
        @simple_token_web ||= env_config['simple_token_web']
      end

      def simple_token_api
        @simple_token_api ||= env_config['simple_token_api']
      end

      def st_token_sale
        @st_token_sale ||= env_config['st_token_sale']
      end

      # Company other product urls
      #
      # * Author: Sunil
      # * Date: 12/03/2018
      # * Reviewed By: Sunil Khedar
      #
      def company_other_product_urls
        @company_other_product_urls ||= (env_config['company_other_product_urls'] || {}).with_indifferent_access
      end

      # Root URL
      #
      # * Author: Kedar
      # * Date: 09/10/2017
      # * Reviewed By: Sunil Khedar
      #
      def root_url
        simple_token_web['root_url']
      end

      def placeholder_image_src
        @placeholder_image_src ||= fetch_config.fetch('placeholder_image_src', '')
      end

      # pepo campaigns config
      #
      # * Author: Kedar
      # * Date: 09/10/2017
      # * Reviewed By: Sunil Khedar
      #
      def pepo_campaign
        env_config.fetch('pepo_campaign', {})
      end

      # cloudfront config
      #
      # * Author: Kedar
      # * Date: 09/10/2017
      # * Reviewed By: Sunil Khedar
      #
      def cloudfront_domain
        env_config.fetch('cloudfront', {})['domain']
      end

      # Recaptcha config
      #
      # * Author: Kedar
      # * Date: 09/10/2017
      # * Reviewed By: Sunil Khedar
      #
      def recaptcha
        env_config.fetch('recaptcha', {})
      end

      # ST api sidekiq admin interface related configs
      def api_sidekiq_interface
        @api_sidekiq_interface ||= env_config.fetch('api_sidekiq_interface', {})
      end

      def local_path
        @local_path ||= fetch_config.fetch('local_path', {}).with_indifferent_access
      end

      def memcache_config
        @memcache_config ||= env_config.fetch('memcached', {}).with_indifferent_access
      end

      def environment_name
        Rails.env
      end

      def page_loaded_at_key
        'page_loaded_at'
      end

      def current_time
        Time.now
      end

      private

      # Env config
      #
      # * Author: Kedar
      # * Date: 09/10/2017
      # * Reviewed By: Sunil Khedar
      #
      def env_config
        @env_config ||= fetch_config
      end

      # fetch config
      #
      # * Author: Kedar
      # * Date: 09/10/2017
      # * Reviewed By: Sunil Khedar
      #
      def fetch_config
        @fetch_config ||= begin
          template = ERB.new File.new("#{Rails.root}/config/constants.yml").read
          YAML.load(template.result(binding)).fetch('constants', {}) || {}
        end
      end

    end

  end

end