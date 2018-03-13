class InitStaticOst

  def self.matches?(request)
    if Rails.env.production?
      request.host == 'static.ost.com'
    elsif Rails.env.sandbox?
      false #&& request.host == 'sale.sandboxost.com'
    elsif Rails.env.staging?
      request.host == 'static.stagingost.com'
    else
      request.host == 'static.developmentost.com'
    end
  end

end
