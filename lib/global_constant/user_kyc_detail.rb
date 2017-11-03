# frozen_string_literal: true
module GlobalConstant

  class UserKycDetail

    class << self

      ### Admin Status End ###

      def all_admin_status
        'all'
      end

      def un_processed_admin_status
        'un_processed_admin_status'
      end

      def qualified_admin_status
        'qualified_admin_status'
      end

      def reviewed_admin_status
        'reviewed_admin_status'
      end

      def denied_admin_status
        'denied_admin_status'
      end

      def whitelisted_admin_status
        'whitelisted_admin_status'
      end

      def admin_kyc_statuses
        {
            all_admin_status => 'All',
            un_processed_admin_status => 'Unprocessed',
            qualified_admin_status => 'Qualified',
            reviewed_admin_status => 'Reviewed',
            denied_admin_status => 'Denied',
            whitelisted_admin_status => 'Whitelisted'
        }
      end
      def admin_kyc_status_class
        {
            un_processed_admin_status => 'yello',
            qualified_admin_status => 'green',
            denied_admin_status => 'red',
            whitelisted_admin_status => 'green'
        }
      end

      ### Admin Status End ###

      ### Cynopsys Status Start ###

      def all_cynopsis_status
        'all'
      end

      def un_processed_cynopsis_status
        'un_processed_cynopsis_status'
      end

      def cleared_cynopsis_status
        'cleared_cynopsis_status'
      end

      def pending_cynopsis_status
        'pending_cynopsis_status'
      end

      def approved_cynopsis_status
        'approved_cynopsis_status'
      end

      def rejected_cynopsis_status
        'rejected_cynopsis_status'
      end

      def cynopsis_kyc_statuses
        {
            all_cynopsis_status => 'All',
            un_processed_cynopsis_status => 'Unprocessed',
            cleared_cynopsis_status => 'Cleared',
            pending_cynopsis_status => 'Pending',
            approved_cynopsis_status => 'Approved',
            rejected_cynopsis_status => 'Rejected'
        }
      end
      def cynopsis_kyc_status_class
        {
            un_processed_cynopsis_status => 'yello',
            cleared_cynopsis_status => 'green',
            pending_cynopsis_status => 'yello',
            approved_cynopsis_status => 'green',
            rejected_cynopsis_status => 'red'
        }
      end

      ### Cynopsys Status End ###



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

      ### Admin Email communication Messages Start ###

      def admin_action_type
        {
            'data_mismatch' => 'Data Mismatch Email Sent',
            'passport_issue' => 'Passport Image Issue Email Sent',
            'selfie_issue' => 'Selfie Image Issue Email Sent',
            'residency_issue' => 'Residency Image Issue Email Sent'
        }
      end

      ### Admin Email communication Messages End ###

    end

  end

end
