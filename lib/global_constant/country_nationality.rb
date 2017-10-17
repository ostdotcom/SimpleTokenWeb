# frozen_string_literal: true
module GlobalConstant

  class CountryNationality

    class << self

      def countries
        @countries ||= YAML.load_file(open(Rails.root.to_s + '/config/countries.yml'))[:countries]
      end

      def nationalities
        @nationalities ||= YAML.load_file(open(Rails.root.to_s + '/config/nationalities.yml'))[:nationalities]
      end

    end

  end

end
