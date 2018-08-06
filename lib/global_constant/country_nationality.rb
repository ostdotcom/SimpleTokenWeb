# frozen_string_literal: true
module GlobalConstant

  class CountryNationality

    class << self

      # Get Cynopsis Countries From Ip
      #
      # * Author: Tejas
      # * Date: 01/08/2018
      # * Reviewed By: Aman
      #
      # @return [Array]
      #
      def get_cynopsis_countries_from_ip(ip_address)
        geoip_country = get_maxmind_country_from_ip(ip_address)
        return [] if geoip_country.blank?
        blacklisted_countries = maxmind_to_cynopsis_country_hash[geoip_country.upcase]
        blacklisted_countries.present? ? blacklisted_countries : []
      end


      # Get Preferred Cynopsis Country From Ip
      #
      # * Author: Tejas
      # * Date: 01/08/2018
      # * Reviewed By: Aman
      #
      # @return [String]
      #
      def get_preferred_cynopsis_country_from_ip(ip_address)
        geoip_country = get_maxmind_country_from_ip(ip_address)
        return '' if geoip_country.blank?

        cynopsis_geoip_countries = get_cynopsis_countries_from_ip(ip_address)
        return '' if cynopsis_geoip_countries.blank?

        if cynopsis_geoip_countries.size == 1
          return cynopsis_geoip_countries[0]
        elsif  cynopsis_geoip_countries.include?(geoip_country)
          return geoip_country
        else
          return maxmind_country_to_preferred_cynopsis_country_map[geoip_country].to_s
        end
      end

      # Get Maxmind Country From Ip
      #
      # * Author: Tejas
      # * Date: 01/08/2018
      # * Reviewed By: Aman
      #
      # @return [String]
      #
      def get_maxmind_country_from_ip(ip_address)
        geo_ip_obj = Util::GeoIpUtil.new(ip_address: ip_address)
        geoip_country = geo_ip_obj.get_country_name.to_s rescue ''
        geoip_country.to_s.upcase
      end

      # list of cynopsis countries
      #
      # * Author: Tejas
      # * Date: 01/08/2018
      # * Reviewed By: Aman
      #
      # @return [Array]
      #
      def countries
        @countries ||= cynopsis_country_to_maxmind_hash.keys
      end


      # List of cynopsis nationalities
      #
      # * Author: Tejas
      # * Date: 01/08/2018
      # * Reviewed By: Aman
      #
      # @return [Array]
      #
      def nationalities
        @nationalities ||= YAML.load_file(open(Rails.root.to_s + '/config/nationalities.yml'))[:nationalities]
      end

      # Maxmind country name To Preferred Cynopsis Country name map
      #
      # * Author: Tejas
      # * Date: 01/08/2018
      # * Reviewed By: Aman
      #
      # @return [Hash]
      #
      def maxmind_country_to_preferred_cynopsis_country_map
        {
            "U.S. MINOR OUTLYING ISLANDS" => "UNITED STATES MINOR OUTLYING ISLANDS",
            "REPUBLIC OF MOLDOVA" => "MOLDOVA",
            "SAINT MARTIN" => "SAINT MARTIN (FRANCE)",
            "UNITED STATES" => "UNITED STATES OF AMERICA"
        }
      end


      private


      # Cynopsis country name to Maxmind country hash
      #
      # * Author: Tejas
      # * Date: 01/08/2018
      # * Reviewed By: Aman
      #
      # @return [Hash] one cynopsis country can have multiple maxmind country name
      #
      def cynopsis_country_to_maxmind_hash
        @cynopsis_country_to_maxmind_hash ||= begin
          country_mapping = {}
          cynopsis_country_to_maxmind_data.each do |row|
            sp = row.gsub("\r", "").split(",")
            key = sp[0].upcase
            value = sp.drop(1)
            country_mapping[key] = value
          end
          country_mapping
        end
      end


      # Maxmind country name to Cynopsis country hash
      #
      # * Author: Tejas
      # * Date: 01/08/2018
      # * Reviewed By: Aman
      #
      # @return [Hash]
      #
      def maxmind_to_cynopsis_country_hash
        @maxmind_to_cynopsis_country_hash ||= begin
          inverse_hash = {}
          cynopsis_country_to_maxmind_hash.each do |cynopsis_country, maxmind_countries|
            maxmind_countries.each do |maxmind_country|
              key = maxmind_country.upcase
              inverse_hash[key] ||= []
              inverse_hash[key] << cynopsis_country
            end
          end
          inverse_hash
        end
      end

      # Perform
      #
      # * Author: Tejas
      # * Date: 01/08/2018
      # * Reviewed By: Aman
      #
      # @return [Hash]
      #
      def cynopsis_country_to_maxmind_data
        @cynopsis_country_to_maxmind_data ||= File.open("#{Rails.root}/config/cynopsis_country_to_maxmind_mapping.csv",
                                                        "rb").read.split("\n")
      end

    end

  end

end
