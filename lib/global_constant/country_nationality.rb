# frozen_string_literal: true
module GlobalConstant

  class CountryNationality

    class << self

      def get(controller, action)
        config[controller][action]
      end

      def countries
        fetch_config["countries"]
      end

      def nationalities
        fetch_config["nationalities"]
      end

      private

      def config
        @config ||= fetch_config
      end

      def fetch_config
        YAML.load_file("#{Rails.root}/config/countries_nationalities.yml")
      end

    end

  end

end
