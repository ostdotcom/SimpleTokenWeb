# frozen_string_literal: true
module GlobalConstant

  class TemplateType

    class << self

      def kyc_template_type
        'kyc'
      end

      def login_template_type
        'login'
      end

      def sign_up_template_type
        'sign_up'
      end

      def reset_password_template_type
        'reset_password'
      end

      def change_password_template_type
        'change_password'
      end

      def token_sale_blocked_region_template_type
        'token_sale_blocked_region'
      end

    end

  end

end
