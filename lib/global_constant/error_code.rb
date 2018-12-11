# frozen_string_literal: true
module GlobalConstant

  class ErrorCode

    class << self

      def ok
        200
      end

      def permanent_redirect
        301
      end

      def temporary_redirect
        302
      end

      def unauthorized_access
        401
      end

      def not_found
        404
      end

      def internal_server_error
        500
      end

      def http_code_map
        {
            permanent_redirect => 'PERMANENT_REDIRECT',
            temporary_redirect => 'TEMPORARY_REDIRECT',
            unauthorized_access => "UNAUTHORIZED",
            not_found => "NOT_FOUND",
            internal_server_error => 'INTERNAL_SERVER_ERROR',
        }
      end

      def error_code_for_http_code(http_code)
        http_code_map[http_code].to_s
      end

    end

  end

end
