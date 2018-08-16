module Web
  module ClientStyles
    class Theme

      # Init
      # @param [Hash] params (Theme data) - Theme data
      # @return [Web::ClientStyles::Theme] returns an object of Web::ClientStyles::Theme class
      def initialize(theme_data)
        @theme_data = theme_data.deep_symbolize_keys
      end

      def primary_button_style
        ".btn-primary {border-color: %{primary_button_border_color};background: %{primary_button_background_color};color:
          %{primary_button_text_color};}  .btn-primary.hover-cls, .btn-primary.active-cls, .btn-primary:hover, .client-primary-btn:active
          {color: %{primary_button_text_color_active}!important;text-decoration: none!important;background-color: %{primary_button_background_color_active}!important;border-color:
          %{primary_button_border_color_active}!important;}" % @theme_data
      end

      def secondary_button_style
        ".btn-secondary {border-color: %{secondary_button_border_color};color: %{secondary_button_text_color};background: %{secondary_button_background_color}}  .btn-secondary:hover, .btn-secondary:active
        {color: %{secondary_button_text_color_active}!important;text-decoration: none!important;background-color: %{secondary_button_background_color_active}!important;border-color:
        %{secondary_button_border_color_active}!important;}" % @theme_data
      end

      def logo
        {"href" => "javascript:void(0)",
         "src" => @theme_data[:company_logo],
         "width" => @theme_data[:company_logo_size_percent]}
      end

      def favicon
        @theme_data[:company_favicon].present? ? @theme_data[:company_favicon] : @theme_data[:company_logo]
      end

      def background_gradient
        @background_gradient ||= begin
          puts @theme_data[:background_gradient]
          gradient_txt = @theme_data[:background_gradient].map {|x| "#{x[:color]} #{x[:gradient]}%"}.join(',')
          ".bg-gradient {background: linear-gradient(to bottom, #{gradient_txt} )}"
        end
      end

      def footer_text_color
        @theme_data[:footer_text_color]
      end

      def footer_link_color
        @theme_data[:footer_link_color]
      end

      def footer_background_color
        @theme_data[:footer_background_color]
      end

      def footer_text
        @theme_data[:footer_text]
      end

      def terms_and_conditions
        @theme_data[:terms_condition_link]
      end

      def gtm_pixel
        {"id" => @theme_data[:gtm_pixel_id]}
      end

      def fb_pixel
        {"id" => @theme_data[:fb_pixel_id],
         "version" => @theme_data[:fb_pixel_version]}
      end

    end
  end
end