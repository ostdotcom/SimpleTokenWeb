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

      def cynopsis_country_for(maxmind_country)
        map = {
            "The Democratic Republic of the Congo" => "DEMOCRATIC REPUBLIC OF THE CONGO",
            "Congo" => "CONGO (REPUBLIC OF)",
            "Cote d'Ivoire" => "COTE D'IVOIRE (IVORY COAST)",
            "Western Sahara" => "WESTERN SAHARAN",
            "Falkland Islands (Malvinas)" => "FALKLAND ISLANDS",
            "Federated States of Micronesia" =>	"MICRONESIA",
            "Heard Island and McDonald Islands"	=> "HEARD AND MCDONALD ISLANDS",
            "Republic of Korea"	=>"SOUTH KOREA",
            "Republic of Moldova" => "MOLDOVA",
            "Saint Martin" => "SAINT MARTIN (FRANCE)",
            "Myanmar" => "BURMA (REPUBLIC OF THE UNION OF MYANMAR)",
            "Svalbard and Jan Mayen" => "SVALBARD AND JAN MAYEN ISLANDS",
            "United States" => "UNITED STATES OF AMERICA",
            "Vatican City" => "VATICAN",
            "Saint Vincent and the Grenadines" => "SAINT VINCENT AND GRENADINES",
            "U.S. Virgin Islands" => "UNITED STATES VIRGIN ISLANDS",
            "Wallis and Futuna"	=> "WALLIS AND FUTUNA ISLANDS"
        }

        return (map[maxmind_country] || maxmind_country)

      end

    end

  end

end
