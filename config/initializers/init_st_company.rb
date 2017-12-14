class InitSTCompany

  def self.matches?(request)
    if Rails.env.production?
      request.host == 'simpletoken.com'
    elsif Rails.env.staging?
      request.host == 'stagingsimpletoken.com'
    else
      request.host == 'developmentsimpletoken.com'
    end
  end

end
