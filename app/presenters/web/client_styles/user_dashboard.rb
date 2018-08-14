module Web
  module ClientStyles
    class UserDashboard

      # Init
      # @param [Hash] params (Page specific data) - page_spec_data
      # @return [Web::ClientStyles::UserDashboard] returns an object of Web::ClientStyles::UserDashboard class
      def initialize(page_spec_data)
        @page_spec_data = page_spec_data.symbolize_keys
      end

      def kyc_update_modal_text
        'By submitting new details, the previous ones will be lost.'
      end

      def sale_timer_gradient
        @page_spec_data[:sale_timer_background_gradient]
      end

      def sale_timer_text_color
        @page_spec_data[:sale_timer_text_color]
      end

      def telegram_link
        @page_spec_data[:telegram_link]
      end

      def telegram_container_background_color
        '#6c9ba9'
      end

      def dashboard_middle_banner_background
        @page_spec_data[:dashboard_middle_banner_background]
      end

      def ethereum_deposit_text
        '%{dashboard_middle_banner_title_text}<br/><div class="display-2
        mt-2">%{dashboard_middle_banner_body_text}</div>' % @page_spec_data
      end

      def ethereum_deposit_popup_checkboxes
        @page_spec_data[:ethereum_deposit_popup_checkboxes]
      end

    end
  end
end