# frozen_string_literal: true
module GlobalConstant

  class StTokenSale

    class << self

      def pre_sale_start_date
        config['pre_sale_start_date'] #DateTime.parse(config['pre_sale_start_date'])
      end

      def public_sale_start_date
        config['public_sale_start_date']
      end

      def public_sale_end_date
        config['public_sale_end_date']
      end

      def ethereum_address
        config['ethereum_address']
      end

      private

      def config
        @config ||= GlobalConstant::Base.st_token_sale
      end

    end

  end

end
