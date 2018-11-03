module Web
  module ClientStyles
    class PageData

      # Init
      # @param [Hash] params (Page specific data) - page_spec_data
      # @return [Web::ClientStyles::PageData] returns an object of Web::ClientStyles::PageData class
      def initialize(page_spec_data)
        @page_spec_data = page_spec_data.symbolize_keys
      end

      # registration page Start

      def signup_policy_texts
        @page_spec_data[:policy_texts]
      end

      # registration page End

      # Kyc Form page Start

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

      def extra_kyc_field_info_text(field_key)
        @page_spec_data["#{field_key}_dynamic_instruction_text".to_sym]
      end

      def kyc_confirm_checkboxes
        @page_spec_data[:kyc_form_popup_checkboxes] || []
      end

      # Kyc Form page End

    end
  end
end