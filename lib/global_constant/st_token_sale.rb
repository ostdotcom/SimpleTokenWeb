# frozen_string_literal: true
module GlobalConstant

  class StTokenSale

    class << self

      def pre_sale_start_date
       Time.zone.parse(config['pre_sale_start_date'])
      end

      def public_sale_start_date
        Time.zone.parse(config['public_sale_start_date'])
      end

      def public_sale_end_date
        Time.zone.parse(config['public_sale_end_date'])
      end

      private

      def config
        @config ||= GlobalConstant::Base.st_token_sale
      end

    end

  end

end
