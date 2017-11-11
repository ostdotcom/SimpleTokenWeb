module Presenters
  module Web
    module User

      class Profile

        # Init
        # @param [Result::Base] response_data_obj (mandatory) - Page data
        # @param [Hash] params (optional) - Page params
        # @return [Presenters::Web::User::Profile] returns an object of Presenters::Web::User::Profile class
        def initialize(response_data_obj, params = {})
          @params = params
          @response_data_obj = response_data_obj
        end

        def result
          @result ||= @response_data_obj.data
        end

        def is_double_optin_token_present?
          @params[:t].present?
        end

        def user
          @user ||= result['user']
        end

        def token_name
          user['bt_name']
        end

        def email
          user['email']
        end

        def user_kyc_data
          @user_kyc_data ||= result['user_kyc_data']
        end

        def user_kyc_status
          @user_kyc_status ||= begin
            if [
                GlobalConstant::TokenSaleUserState.kyc_status_pending,
                GlobalConstant::TokenSaleUserState.kyc_status_approved,
                GlobalConstant::TokenSaleUserState.kyc_status_denied
            ].include?(user_kyc_data['kyc_status'])
              user_kyc_data['kyc_status']
            else
              fail 'Unhandled user kyc status'
            end
          end
        end

        def admin_action_type
          user_kyc_data['admin_action_type']
        end

        def whitelist_status
          user_kyc_data['whitelist_status']
        end

        def pos_bonus_value
          user_kyc_data['pos_bonus_percentage'].to_f
        end

        def alternate_token_bonus_name
          user_kyc_data['alternate_token_name_for_bonus'].to_s
        end

        def token_sale_active_status
          result['token_sale_active_status']
        end

        def sale_details
          result["sale_details"]
        end

        def sale_ended_before_time_state
          sale_details['sale_ended_before_time']
        end

        ###########################################


        def is_early_access_user?
          GlobalConstant::TokenSaleUserState.early_access_token_sale_phase == user_kyc_data['token_sale_participation_phase']
        end

        def sale_start_time_for_user
          is_early_access_user? ? GlobalConstant::StTokenSale.early_access_sale_start_date : GlobalConstant::StTokenSale.general_access_sale_start_date
        end

        def is_sale_live_for_user?
          current_time >= sale_start_time_for_user
        end

        def is_early_access_mode_on_for_user?
          (current_time < GlobalConstant::StTokenSale.general_access_sale_start_date) && is_early_access_user?
        end

        def countdown_timestamp
          if !is_sale_live_for_user?
            # when is user specific sale going to start
            sale_start_time_for_user
          elsif is_early_access_mode_on_for_user?
            # When is early sale going to end
            GlobalConstant::StTokenSale.general_access_sale_start_date
          else
            # When is general sale going to end
            GlobalConstant::StTokenSale.general_access_sale_end_date
          end
        end

        def is_sale_ongoing_for_user?
          is_sale_live_for_user? && !has_sale_paused?
        end

        def can_purchase?
          is_kyc_approved? && ethereum_address_whitelist_done? && is_sale_ongoing_for_user?
        end

        def has_sale_ended?
          (current_time >= GlobalConstant::StTokenSale.general_access_sale_end_date) || has_sale_ended_before_time?
        end

        def has_sale_paused?
          (token_sale_active_status.to_i != 1) && is_sale_live_for_user?
        end

        def has_sale_ended_before_time?
          sale_ended_before_time_state.to_i == 1
        end

        ###########################################


        ###########################################

        def is_kyc_pending?
          user_kyc_status == GlobalConstant::TokenSaleUserState.kyc_status_pending
        end

        def is_kyc_pending_and_upload_needed?
          is_kyc_pending? && (admin_action_type != GlobalConstant::TokenSaleUserState.no_admin_action_type)
        end

        def is_kyc_approved?
          user_kyc_status == GlobalConstant::TokenSaleUserState.kyc_status_approved
        end

        def is_kyc_denied?
          user_kyc_status == GlobalConstant::TokenSaleUserState.kyc_status_denied
        end

        def kyc_verification_icon_class
          case true
            when is_kyc_pending_and_upload_needed?
              'pending-issue'
            when is_kyc_pending?
              'pending'
            when is_kyc_approved?
              'approved'
            when is_kyc_denied?
              'denied'
          end
        end

        def kyc_verification_class
          case true
            when is_kyc_pending_and_upload_needed?
              'pending-issue'
            when is_kyc_pending?
              'approved'
            when is_kyc_approved?
              'approved'
            when is_kyc_denied?
              'denied'
          end
        end

        def show_kyc_update_modal?
          !is_kyc_pending_and_upload_needed?
        end

        def kyc_verification_text
          case true
            when is_kyc_pending_and_upload_needed?
              'KYC Verification Issue'
            when is_kyc_pending?
              'KYC Verification Pending'
            when is_kyc_approved?
              'KYC Verified'
            when is_kyc_denied?
              'KYC Verification Failed'
          end
        end

        def show_ethereum_address_whitelist_status_box?
          is_kyc_approved?
        end

        def ethereum_address_whitelist_done?
          (GlobalConstant::TokenSaleUserState.ethereum_address_whitelist_done == whitelist_status)
        end

        def ethereum_address_whitelist_icon_class
          case true
            when ethereum_address_whitelist_done?
              'approved'
            else
              'pending'
          end
        end

        def token_name_pending?
          token_name.blank?
        end

        def token_name_icon_class
          token_name_pending? ? 'pending' : 'approved'
        end

        def is_bonus_confirmed?
          is_pos_bonus_confirmed? || is_alternate_token_bonus_confirmed?
        end

        def multple_bonus_confirmed?
          is_pos_bonus_confirmed? && is_alternate_token_bonus_confirmed?
        end

        def is_pos_bonus_confirmed?
          pos_bonus_value > 0
        end

        def is_alternate_token_bonus_confirmed?
          alternate_token_bonus_name.present?
        end

        def bonus_text
          if multple_bonus_confirmed?
            "10% Early Access Bonus"
          elsif is_pos_bonus_confirmed?
            val = (pos_bonus_value.to_i == pos_bonus_value) ? pos_bonus_value.to_i : pos_bonus_value
            "#{val}% Proof Of Support Bonus"
          elsif is_alternate_token_bonus_confirmed?
            "10% #{alternate_token_bonus_name} Airdrop Bonus"
          else
            '10% Bonus Pending'
          end
        end

        def is_bonus_approval_date_over?
          current_time > GlobalConstant::StTokenSale.general_access_sale_start_date
        end

        def show_bonus_box?
          is_early_access_user? && (is_bonus_confirmed? || !is_bonus_approval_date_over?)
        end

        def bonus_icon_class
          is_bonus_confirmed? ? 'approved' : 'pending'
        end

        def show_unable_for_early_purchase_text?
          # General access users, on 14th while early sale is going on
          (!is_early_access_user? && (current_time >= GlobalConstant::StTokenSale.early_access_sale_start_date) && (current_time < GlobalConstant::StTokenSale.general_access_sale_start_date))
        end

        ###############################################


        private

        def current_time
          @current_time ||= Time.zone.now
        end

      end
    end
  end
end