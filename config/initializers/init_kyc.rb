class InitKyc

  def self.matches?(request)
    if Rails.env.production?
      request.host == 'kyc.simpletoken.org'
    elsif Rails.env.staging?
      request.host == 'kyc.stagingsimpletoken.org'
    else
      request.host == 'kyc.developmentsimpletoken.org'
    end
  end

end
