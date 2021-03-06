# frozen_string_literal: true
module GlobalConstant

  class CountryNationality

    require 'csv'

    class << self

      # Get Aml Countries From Ip
      #
      # * Author: Tejas
      # * Date: 01/08/2018
      # * Reviewed By: Aman
      #
      # @return [Array]
      #
      def get_aml_countries_from_ip(ip_address)
        geoip_country = get_maxmind_country_from_ip(ip_address)
        return [] if geoip_country.blank?
        blacklisted_countries = maxmind_to_aml_country_hash[geoip_country.upcase]
        blacklisted_countries.present? ? blacklisted_countries : []
      end


      # Get Preferred Aml Country From Ip
      #
      # * Author: Tejas
      # * Date: 01/08/2018
      # * Reviewed By: Aman
      #
      # @return [String]
      #
      def get_preferred_aml_country_from_ip(ip_address)
        geoip_country = get_maxmind_country_from_ip(ip_address)
        return '' if geoip_country.blank?

        aml_geoip_countries = get_aml_countries_from_ip(ip_address)
        return '' if aml_geoip_countries.blank?

        if aml_geoip_countries.size == 1
          return aml_geoip_countries[0]
        elsif  aml_geoip_countries.include?(geoip_country)
          return geoip_country
        else
          return maxmind_country_to_preferred_aml_country_map[geoip_country].to_s
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

      # list of aml countries
      #
      # * Author: Tejas
      # * Date: 01/08/2018
      # * Reviewed By: Aman
      #
      # @return [Array]
      #
      def countries
        @countries ||= aml_country_to_maxmind_hash.keys
      end

      # Maxmind country name To Preferred Aml Country name map
      #
      # * Author: Tejas
      # * Date: 01/08/2018
      # * Reviewed By: Aman
      #
      # @return [Hash]
      #
      def maxmind_country_to_preferred_aml_country_map
        {
            # "U.S. MINOR OUTLYING ISLANDS" => "UNITED STATES MINOR OUTLYING ISLANDS",
            # "REPUBLIC OF MOLDOVA" => "MOLDOVA",
            # "SAINT MARTIN" => "ST. MAARTEN",
            # "UNITED STATES" => "UNITED STATES OF AMERICA"
        }
      end

      # List of aml nationalities
      #
      # * Author: Tejas
      # * Date: 01/08/2018
      # * Reviewed By: Aman
      #
      # @return [Array]
      #
      def nationalities
        @nationalities ||= begin
          data = []
          fetch_country_nationality_mapping.each do |country_nationality_mapping|
            data << country_nationality_mapping.split(",")[0]
          end
          data
        end
      end


      private


      # Aml country name to Maxmind country hash
      #
      # * Author: Tejas
      # * Date: 01/08/2018
      # * Reviewed By: Aman
      #
      # @return [Hash] one aml country can have multiple maxmind country name
      #
      def aml_country_to_maxmind_hash
        @aml_country_to_maxmind_hash ||= begin
          country_mapping = {}
          aml_country_to_maxmind_data.each do |row|
            key = row[0].upcase
            value = row.drop(1)
            country_mapping[key] = value
          end
          country_mapping
        end
      end


      # Maxmind country name to Aml country hash
      #
      # * Author: Tejas
      # * Date: 01/08/2018
      # * Reviewed By: Aman
      #
      # @return [Hash]
      #
      def maxmind_to_aml_country_hash
        @maxmind_to_aml_country_hash ||= begin
          inverse_hash = {}
          aml_country_to_maxmind_hash.each do |aml_country, maxmind_countries|
            maxmind_countries.each do |maxmind_country|
              key = maxmind_country.upcase
              inverse_hash[key] ||= []
              inverse_hash[key] << aml_country
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
      def aml_country_to_maxmind_data
        @aml_country_to_maxmind_data ||= CSV.read("#{Rails.root}/config/aml_country_to_maxmind_mapping.csv")
      end

      # Fetch Country Nationality Mapping
      #
      # * Author: Tejas
      # * Date: 09/07/2018
      # * Reviewed By:
      #
      # @return Array[String] fetch_file_contents
      #
      def fetch_country_nationality_mapping
        @fetch_file_contents ||= File.open("#{Rails.root}/config/nationality_and_country_mapping.csv",
                                           "rb").read.split("\n")
      end

    end

  end

end
