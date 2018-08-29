module Web
  module Client
    class Setup

      # Init
      # @param [Result::Base] response_data_obj (mandatory) - Page data
      # @param [Hash] params (optional) - Page params
      # @return [Web::Client::Setup] returns an object of Web::Client::Setup class
      def initialize(response_data_obj, params = {})
        @params = params
        @response_data_obj = response_data_obj
      end

      def result
        @result ||= @response_data_obj.data
      end

      def client_setting
        result['client_setting']
      end


      #### client settings ####

      def token_sale_details
        client_setting['token_sale_details']
      end

      def is_st_token_sale_client?
        client_setting['is_st_token_sale_client']
      end

      def is_whitelist_setup_done?
        client_setting['is_whitelist_setup_done']
      end

      def sale_start_timestamp
        token_sale_details['sale_start_timestamp']
      end

      def sale_end_timestamp
        token_sale_details['sale_end_timestamp']
      end

      def has_ethereum_deposit_address?
        token_sale_details['has_ethereum_deposit_address']
      end

      def is_account_activated?
        @params[:t].present? && @params[:action] == 'add_kyc_form' && result['has_double_opt_in'].to_i == 1
      end

      #### client settings ####


      def page_setting
        result['page_setting']
      end

      #### page settings ####

      def common_data
        page_setting['common_data']
      end

      def page_data
        page_setting['page_data']
      end

      def kyc_config_detail_data
        client_setting['kyc_config_detail_data']
      end

      # temp code
      def signup_policy_texts
        page_data['checkbox_html_list'] ||  [page_data['checkbox_html']]
      end

      #### common data ###

      def kyc_fields
        kyc_config_detail_data['kyc_fields']
      end

      def residency_proof_nationalities
        kyc_config_detail_data['residency_proof_nationalities']
      end

      def max_investor_proofs_allowed
        kyc_config_detail_data['max_investor_proofs_allowed']
      end

      def blacklisted_countries
        kyc_config_detail_data['blacklisted_countries'] || []
      end

      def gtm_pixel
        common_data['gtm_pixel']
      end

      def fb_pixel
        common_data['fb_pixel']
      end

      def header_favicon_src
        common_data['header']['favicon_src'] || common_data['header']['logo']['src']
      end

      def header_logo
        common_data['header']['logo']
      end

      def primary_button_style
        common_data['primary_button_style']
      end

      def secondary_button_style
        common_data['secondary_button_style']
      end

      def background_gradient_style
        common_data['background_gradient_style']
      end

      def footer_html
        common_data['footer_html']
      end

      def account_name
        common_data['account_name']
      end

      def account_name_short
        common_data['account_name_short']
      end

      #### common data ###


      #### page settings ####


      #### page settings ####


      def has_sale_ended?
        sale_end_timestamp <= current_timestamp
      end


      # Validate ip of request
      #
      # @param country_list_from_ip - Array of cynopsis_country
      #
      # * Author: Aman
      # * Date: 15/10/2017
      # * Reviewed By:
      #
      def is_blacklisted_ip?(country_list_from_ip)
        return true if (blacklisted_countries & country_list_from_ip).length > 0
        false
      end

      def custom_meta_tags
        {
            meta: {
                account_name: account_name
            }
        }
      end

      private

      def current_timestamp
        @current_timestamp ||= Time.now.to_i
      end

    end
  end
end