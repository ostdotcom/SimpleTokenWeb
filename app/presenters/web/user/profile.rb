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

        def user
          @user ||= result['user']
        end

        def user_kyc_data
          @user_kyc_data ||= result['user_kyc_data']
        end

        def token_sale_active_status
          result['token_sale_active_status']
        end

        def bt_name
          user['bt_name']
        end

        def email
          user['email']
        end

        def ethereum_address
          GlobalConstant::StTokenSale.ethereum_address
        end

        def is_token_present?
          @params[:t].present?
        end

        def is_pre_sale_user?
          [GlobalConstant::TokenSaleUserState.pre_sale_participation_phase, GlobalConstant::TokenSaleUserState.pre_phase_two_participation_phase].include?(user_kyc_data['token_sale_participation_phase'])
        end

        def is_kyc_pending?
          user_kyc_data['kyc_status'] == GlobalConstant::TokenSaleUserState.kyc_status_pending
        end

        def is_kyc_approved?
          user_kyc_data['kyc_status'] == GlobalConstant::TokenSaleUserState.kyc_status_approved
        end

        def is_kyc_denied?
          user_kyc_data['kyc_status'] == GlobalConstant::TokenSaleUserState.kyc_status_denied
        end

        def can_purchase?
          is_kyc_approved?
        end


        def is_pre_sale_mode_on?
          (current_time < GlobalConstant::StTokenSale.public_sale_start_date) && is_pre_sale_user?
        end

        def sale_start_time
          is_pre_sale_mode_on? ? GlobalConstant::StTokenSale.pre_sale_start_date : GlobalConstant::StTokenSale.public_sale_start_date
        end

        def is_sale_ongoing?
          has_sale_paused? && !has_sale_ended? && has_sale_started?
        end

        def has_sale_started?
          current_time >= sale_start_time
        end

        def has_sale_paused?
          token_sale_active_status.to_i != 1
        end

        def has_sale_ended?
          current_time >= GlobalConstant::StTokenSale.public_sale_end_date
        end


        def current_time
          @current_time ||= Time.now
        end

      end
    end
  end
end