module Util

  module ResultHelper

    # Success with data
    #
    # * Author: Kedar
    # * Date: 09/10/2017
    # * Reviewed By: Sunil Khedar
    #
    # @param [Hash] data (mandatory) - data to be sent in the response
    #
    # @return [Result::Base]
    #
    def success_result(data)
      # Allow only Hash data to pass ahead
      data = {} unless Util::CommonValidator.is_a_hash?(data)

      Result::Base.success({
                               data: data
                           })
    end

    # Error with Action
    #
    # * Author: Kedar
    # * Date: 09/10/2017
    # * Reviewed By: Sunil Khedar
    #
    # @param [String] code (mandatory) - error code
    # @param [String] msg (mandatory) - error message
    # @param [String] display_heading (optional) - display heading
    # @param [String] display_text (mandatory) - error display text
    # @param [Hash] data (mandatory) - error data
    #
    # @return [Result::Base]
    #
    def error_result(code, display_text, display_heading = 'Error')
      Result::Base.error(
          {
              error: code,
              error_display_text: display_text,
              error_display_heading: display_heading
          }
      )
    end

  end

end