module Web
  module ClientStyles
    class Theme

      attr_accessor :theme_data

      # Init
      # @param [Hash] params (Theme data) - Theme data
      # @return [Web::ClientStyles::Theme] returns an object of Web::ClientStyles::Theme class
      def initialize(theme_data)
        @theme_data = theme_data.deep_symbolize_keys
      end

      def logo
        {"href" => "javascript:void(0)",
         "src" => @theme_data[:company_logo],
         "width" => @theme_data[:company_logo_size_percent]}
      end

      def favicon
        @theme_data[:company_favicon].present? ? @theme_data[:company_favicon] : @theme_data[:company_logo]
      end

      def background_gradient_text
        @theme_data[:background_gradient].map {|x| "#{x[:color]} #{x[:gradient]}%"}.join(',')
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