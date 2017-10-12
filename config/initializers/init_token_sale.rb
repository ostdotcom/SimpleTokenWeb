class InitTokenSale

  def self.matches?(request)
    if Rails.env.production?
      request.host == 'sale.simpletoken.org'
    elsif Rails.env.staging?
      request.host == 'sale.stagingsimpletoken.org'
    else
      request.query_parameters[:initTokenSale].to_i == 1
    end
  end

end
