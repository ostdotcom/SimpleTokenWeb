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

        #### common data ###

        def blacklisted_countries
          common_data['blacklisted_countries'] || []
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


        private

        def current_timestamp
          @current_timestamp ||= Time.now.to_i
        end

    end
  end
end