# frozen_string_literal: true
module GlobalConstant

  class Cookie

    class << self

      def admin_cookie_name
        'ta'
      end

      def user_cookie_name
        'tu'
      end

      def new_api_cookie_key
        'new_api_cookies'
      end

    end

  end

end
