# frozen_string_literal: true
module GlobalConstant

  class UserKycDetail

    class << self

      ### Admin Status End ###

      def all_admin_status
        'all'
      end

      def unprocessed_admin_status
        'unprocessed'
      end

      def qualified_admin_status
        'qualified'
      end

      def denied_admin_status
        'denied'
      end

      def whitelisted_admin_status
        'whitelisted_admin_status'
      end

      def admin_kyc_statuses
        {
            all_admin_status => 'All',
            unprocessed_admin_status => 'Unprocessed',
            qualified_admin_status => 'Qualified',
            denied_admin_status => 'Denied',
            whitelisted_admin_status => 'Whitelisted'
        }
      end
      def admin_kyc_status_class
        {
            unprocessed_admin_status => 'yello',
            qualified_admin_status => 'green',
            denied_admin_status => 'red',
            whitelisted_admin_status => 'green'
        }
      end

      ### Admin Status End ###


      ### Admin Status End ###

      def all_whitelist_status
        'all'
      end

      def unprocessed_whitelist_status
        'unprocessed'
      end

      def started_whitelist_status
        'started'
      end

      def done_whitelist_status
        'done'
      end

      def failed_whitelist_status
        'failed'
      end

      def whitelist_kyc_statuses
        {
            all_whitelist_status => 'All',
            unprocessed_whitelist_status => 'Unprocessed',
            started_whitelist_status => 'Started',
            done_whitelist_status => 'Done',
            failed_whitelist_status => 'Failed'
        }
      end

      def whitelist_kyc_status_class
        {
            unprocessed_whitelist_status => 'yello',
            started_whitelist_status => 'yello',
            done_whitelist_status => 'green',
            failed_whitelist_status => 'red'
        }
      end

      ### Admin Status End ###

    end

  end

end
