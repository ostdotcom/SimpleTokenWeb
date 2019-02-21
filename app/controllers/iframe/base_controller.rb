class Iframe::BaseController < ApplicationController

  private


  # Get IP Based Aml Countries Name
  #
  # * Author: Sunil
  # * Date: 17/10/2017
  # * Reviewed By: Sunil
  #
  # @returns [Array]
  #
  def get_ip_to_aml_countries
    @ip_to_aml_countries ||= begin
      GlobalConstant::CountryNationality.get_aml_countries_from_ip(ip_address)
    end
  end

  # Get IP Based Preferred Aml Country Name
  #
  # * Author: Tejas
  # * Date: 01/08/2018
  # * Reviewed By: Aman
  #
  # @returns [String]
  #
  def get_ip_to_preferred_aml_country
    @ip_to_preferred_aml_country ||= begin
      GlobalConstant::CountryNationality.get_preferred_aml_country_from_ip(ip_address)
    end
  end

end