class InitTokenSale

  def self.matches?(request)
    if Rails.env.production?
      request.host == 'sale.simpletoken.org'
    elsif Rails.env.staging?
      request.host == 'sale.stagingsimpletoken.org'
    else
      request.host == 'sale.developmentsimpletoken.org' || true
    end
  end

end
