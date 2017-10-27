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

        def bonus_status
          user_kyc_data['bonus_status']
        end

        def token_sale_active_status
          result['token_sale_active_status']
        end


        ###########################################


        def is_pre_sale_user?
          GlobalConstant::TokenSaleUserState.pre_sale_participation_phase == user_kyc_data['token_sale_participation_phase']
        end

        def sale_start_time
          is_pre_sale_user? ? GlobalConstant::StTokenSale.pre_sale_start_date : GlobalConstant::StTokenSale.public_sale_start_date
        end

        def is_sale_live?
          current_time >= sale_start_time
        end

        def is_pre_sale_mode_on?
          (current_time < GlobalConstant::StTokenSale.public_sale_start_date) && is_pre_sale_user?
        end

        def countdown_timestamp
          if !is_sale_live?
            sale_start_time
          elsif is_pre_sale_mode_on?
            GlobalConstant::StTokenSale.public_sale_start_date
          else
            GlobalConstant::StTokenSale.public_sale_end_date
          end
        end

        def is_sale_ongoing?
          is_sale_live?
        end

        def can_purchase?
          is_kyc_approved? && ethereum_address_whitelist_done? && is_sale_ongoing?
        end

        def has_sale_ended?
          current_time >= GlobalConstant::StTokenSale.public_sale_end_date
        end

        def has_sale_paused?
          (token_sale_active_status.to_i != 1) && is_sale_live?
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
          bonus_status == GlobalConstant::TokenSaleUserState.bonus_status_approved
        end

        def is_bonus_approval_date_over?
          current_time > GlobalConstant::StTokenSale.public_sale_start_date
        end

        def show_bonus_box?
          is_pre_sale_user? && (is_bonus_confirmed? || !is_bonus_approval_date_over?)
        end

        def bonus_icon_class
          is_bonus_confirmed? ? 'approved' : 'pending'
        end

        ###############################################


        private

        def current_time
          @current_time ||=      GlobalConstant::StTokenSale.pre_sale_start_date - 1.day || Time.zone.now
        end

      end
    end
  end
end