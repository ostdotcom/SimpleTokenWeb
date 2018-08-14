module Web
  module ClientStyles
    class Registration

      # Init
      # @param [Hash] params (Page specific data) - page_spec_data
      # @return [Web::ClientStyles::Registration] returns an object of Web::ClientStyles::Registration class
      def initialize(page_spec_data)
        @page_spec_data = page_spec_data.symbolize_keys
      end

      def signup_policy_text
        @page_spec_data[:policy_text]
      end

      def kyc_form_title
        @page_spec_data[:kyc_form_title]
      end

      def kyc_form_subtitle
        @page_spec_data[:kyc_form_subtitle]
      end

      def kyc_ethereum_address_info_text
        @page_spec_data[:eth_address_instruction_text]
      end

      def kyc_document_info_text
        @page_spec_data[:document_id_instruction_text]
      end

      def kyc_confirm_checkboxes
        @page_spec_data[:kyc_form_popup_checkboxes]
      end

    end
  end
end