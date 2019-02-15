# frozen_string_literal: true
module GlobalConstant

  class WebDomain

    class << self

      # list of whitelisted external hosted domains
      def allowed_external_subdomains
        @allowed_external_subdomains ||= if Rails.env.production?
                                           ['sale.simpletoken.org']
                                         elsif Rails.env.sandbox?
                                           []
                                         elsif Rails.env.staging?
                                           ['sale.stagingsimpletoken.org']
                                         else
                                           ['sale.developmentsimpletoken.org']
                                         end
      end

      # should be in lowercase
      # subdomain end string for self hosted domains
      def kyc_subdomain
        @kyc_subdomain ||= if Rails.env.production?
                             'kyc.ost.com'
                           elsif Rails.env.sandbox?
                             'kyc.sandboxost.com'
                           elsif Rails.env.staging?
                             'kyc.stagingost.com'
                           else
                             'kyc.developmentost.com'
                           end
      end

      def allowed_referer_domains
        @allowed_referer_domains ||= [
            "pepo.com",
            "pepocampaigns.com",
            "ost.com",
            "sandboxost.com",
            "stagingost.com",
            "simpletoken.org",
            "stagingsimpletoken.org",
        ]
      end

    end

  end

end
