module Result

  class Base

    attr_accessor :error,
                  :error_display_text,
                  :error_display_heading,
                  :error_data,
                  :data,
                  :exception,
                  :http_code,
                  :error_extra_info

    # Initialize
    #
    # * Author: Kedar
    # * Date: 09/10/2017
    # * Reviewed By: Sunil Khedar
    #
    # @param [Hash] params (optional) is a Hash
    #
    def initialize(params = {})
      set_error(params)
      set_http_code(params[:http_code])
      @data = params[:data] || {}
    end

    # Set Http Code
    #
    # * Author: Kedar
    # * Date: 09/10/2017
    # * Reviewed By: Sunil Khedar
    #
    # @param [Integer] h_c is an Integer http_code
    #
    def set_http_code(h_c)
      @http_code = h_c || GlobalConstant::ErrorCode.ok
    end

    # Set Error
    #
    # * Author: Kedar
    # * Date: 09/10/2017
    # * Reviewed By: Sunil Khedar
    #
    # @param [Hash] params is a Hash
    #
    def set_error(params)
      @error = params[:error] if params.key?(:error)
      @error_display_text = params[:error_display_text] if params.key?(:error_display_text)
      @error_data = params[:error_data] if params.key?(:error_data)
      @error_display_heading = params[:error_display_heading] if params.key?(:error_display_heading)
      @error_extra_info = params[:error_extra_info] if params.key?(:error_extra_info)
    end

    # Set Error extra info
    #
    # * Author: Pankaj
    # * Date: 28/09/2018
    # * Reviewed By:
    #
    # @param [Hash] error_extra_info is an Hash of extra info to send with error
    #
    def set_error_extra_info(error_extra_info)
      @error_extra_info = error_extra_info
    end

    # Set Exception
    #
    # * Author: Kedar
    # * Date: 09/10/2017
    # * Reviewed By: Sunil Khedar
    #
    # @param [Exception] e is an Exception
    #
    def set_exception(e)
      @exception = e
    end

    # is valid?
    #
    # * Author: Kedar
    # * Date: 09/10/2017
    # * Reviewed By: Sunil Khedar
    #
    # @return [Boolean] returns True / False
    #
    def valid?
      !invalid?
    end

    # is invalid?
    #
    # * Author: Kedar
    # * Date: 09/10/2017
    # * Reviewed By: Sunil Khedar
    #
    # @return [Boolean] returns True / False
    #
    def invalid?
      errors_present?
    end

    # Define error / failed methods
    #
    # * Author: Kedar
    # * Date: 09/10/2017
    # * Reviewed By: Sunil Khedar
    #
    [:error?, :errors?, :failed?].each do |name|
      define_method(name) { invalid? }
    end

    # Define success method
    #
    # * Author: Kedar
    # * Date: 09/10/2017
    # * Reviewed By: Sunil Khedar
    #
    [:success?].each do |name|
      define_method(name) { valid? }
    end

    # are errors present?
    #
    # * Author: Kedar
    # * Date: 09/10/2017
    # * Reviewed By: Sunil Khedar
    #
    # @return [Boolean] returns True / False
    #
    def errors_present?
      @error.present? ||
          @error_display_text.present? ||
          @error_data.present? ||
          @error_display_heading.present? ||
          @exception.present?
    end

    # Exception backtrace
    #
    # * Author: Kedar
    # * Date: 09/10/2017
    # * Reviewed By: Sunil Khedar
    #
    # @return [String]
    #
    def exception_backtrace
      @e_b ||= @exception.present? ? @exception.backtrace : ''
    end

    # Get instance variables Hash style from object
    #
    # * Author: Kedar
    # * Date: 09/10/2017
    # * Reviewed By: Sunil Khedar
    #
    def [](key)
        instance_variable_get("@#{key}")
    end

    # Error
    #
    # * Author: Kedar
    # * Date: 09/10/2017
    # * Reviewed By: Sunil Khedar
    #
    # @return [Result::Base] returns object of Result::Base class
    #
    def self.error(params)
      new(params)
    end

    # Success
    #
    # * Author: Kedar
    # * Date: 09/10/2017
    # * Reviewed By: Sunil Khedar
    #
    # @return [Result::Base] returns object of Result::Base class
    #
    def self.success(params)
      new(params.merge!(no_error))
    end

    # Exception
    #
    # * Author: Kedar
    # * Date: 09/10/2017
    # * Reviewed By: Sunil Khedar
    #
    # @return [Result::Base] returns object of Result::Base class
    #
    def self.exception(e, params = {})
      obj = new(params)
      obj.set_exception(e)
      if params[:notify].present? ? params[:notify] : true
        send_notification_mail(e, params)
      end
      return obj
    end

    # Send Notification Email
    #
    # * Author: Kedar
    # * Date: 09/10/2017
    # * Reviewed By: Sunil Khedar
    #
    def self.send_notification_mail(e, params)
      ApplicationMailer.notify(
          body: {exception: {message: e.message, backtrace: e.backtrace, error_data: @error_data}},
          data: params,
          subject: "#{params[:error]} : #{params[:error_display_text]}"
      ).deliver
    end

    # No Error
    #
    # * Author: Kedar
    # * Date: 09/10/2017
    # * Reviewed By: Sunil Khedar
    #
    # @return [Hash] returns Hash
    #
    def self.no_error
      @n_err ||= {
          error: nil,
          error_display_text: nil,
          error_data: nil,
          error_display_heading: nil
      }
    end

    # Fields
    #
    # * Author: Kedar
    # * Date: 09/10/2017
    # * Reviewed By: Sunil Khedar
    #
    # @return [Array] returns Array object
    #
    def self.fields
      error_fields + [:data]
    end

    # Error Fields
    #
    # * Author: Kedar
    # * Date: 09/10/2017
    # * Reviewed By: Sunil Khedar
    #
    # @return [Array] returns Array object
    #
    def self.error_fields
      [
          :error,
          :error_display_text,
          :error_data,
          :error_display_heading,
          :error_extra_info
      ]
    end

    # To Hash
    #
    # * Author: Kedar
    # * Date: 09/10/2017
    # * Reviewed By: Sunil Khedar
    #
    # @return [Hash] returns Hash object
    #
    def to_hash
      self.class.fields.each_with_object({}) do |key, hash|
        val = send(key)
        hash[key] = val if val.present?
      end
    end

    # is request for a non found resource
    #
    # * Author: Kedar
    # * Date: 09/10/2017
    # * Reviewed By: Sunil Khedar
    #
    # @return [Result::Base] returns an object of Result::Base class
    #
    def is_entity_not_found_action?
      http_code == GlobalConstant::ErrorCode.not_found
    end


    # To JSON
    #
    # * Author: Kedar
    # * Date: 09/10/2017
    # * Reviewed By: Sunil Khedar
    #
    def to_json
      hash = self.to_hash

      if (hash[:error] == nil)
        h = {
            success: true
        }.merge(hash)
        h
      else
        {
            success: false,
            err: {
                code: hash[:error],
                display_text: hash[:error_display_text] || 'Something went wrong.',
                display_heading: hash[:error_display_heading] || 'Error.',
                error_data: hash[:error_data] || {},
                error_extra_info: hash[:error_extra_info] || {}
            },
            data: hash[:data] || {}
        }
      end

    end

  end

end
