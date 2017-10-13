# frozen_string_literal: true
module GlobalConstant

  class TokenSaleUserState

    class << self

      ### Token sale state related pages ####

      def api_token_sale_state_page_names
        @api_token_sale_state_page_names ||= {
            profile_page: {p: 'dashboard'},
            verification_page: {p: 'verification-link'},
            bt_page: {p: 'reserve-token'},
            kyc_page: {p: 'update-kyc'}
        }
      end

      def profile_page
        "profile_page"
      end

      def verification_page
        "verification_page"
      end

      def bt_page
        "bt_page"
      end

      def kyc_page
        "kyc_page"
      end

      def get_path_for_page(page_name)
        _page = api_token_sale_state_page_names[page_name.to_sym]
        fail "Token sale state (#{page_name}) related path not defined." if _page.blank?
        _page[:p]
      end

      def kyc_page_allowed_states
        ["kyc_page", "bt_page", "verification_page"]
      end

      def bt_page_allowed_states
        ["bt_page", "verification_page"]
      end

      def verification_page_allowed_states
        ["verification_page"]
      end

      def profile_page_allowed_states
        ["profile_page"]
      end


      ### Token sale state related pages ####


    end

  end

end
