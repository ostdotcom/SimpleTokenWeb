class InitTokenSale

  def self.matches?(request)
    if Rails.env.production?
      request.domain == 'sale.simpletoken.org'
    elsif Rails.env.staging?
        request.domain == 'sale.stagingsimpletoken.org'
    else
      request.query_parameters[:initTokenSale].to_i == 1
    end
  end

end
