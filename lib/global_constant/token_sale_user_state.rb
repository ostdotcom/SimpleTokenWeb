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
            kyc_page: {p: 'add-kyc'}
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

      ### Token sale user kyc status  ####

      def kyc_status_pending
        "pending"
      end

      def kyc_status_approved
        "approved"
      end

      def kyc_status_denied
        "denied"
      end

      ### Token sale user kyc status  ####

      ### Token sale user participation phase type  ####

      def pre_sale_participation_phase
        "pre_sale"
      end

      ### Token sale user kyc status  ####


      ### Token sale admin_action_type  ####

      def no_admin_action_type
        "no"
      end

      ### Token sale admin_action_type  ####

      ### ethereum_address_whitelist status  ####

      def ethereum_address_whitelist_done
        "done"
      end

      ### ethereum_address_whitelist status  ####

      def bonus_status_approved
        "approved"
      end

    end

  end

end
