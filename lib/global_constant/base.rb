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

      # Root URL
      #
      # * Author: Kedar
      # * Date: 09/10/2017
      # * Reviewed By: Sunil Khedar
      #
      def api_root_url
        simple_token_api['root_url']
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