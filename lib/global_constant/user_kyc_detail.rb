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

      ### Cynopsis Status Start ###

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

      ### Cynopsis Status End ###



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


      ### admin action type ####

      def no_admin_action_type
        'no'
      end

      def any_admin_action_type
        'any'
      end

      def data_mismatch_admin_action_type
        'data_mismatch'
      end

      def passport_issue_admin_action_type
        'passport_issue'
      end

      def selfie_issue_admin_action_type
        'selfie_issue'
      end

      def residency_issue_admin_action_type
        'residency_issue'
      end

      def admin_action_type_names
        {
            no_admin_action_type => 'No Review Action',
            any_admin_action_type => 'Any Review Action',
            data_mismatch_admin_action_type => 'Data Mismatch',
            passport_issue_admin_action_type => 'Passport Image Issue',
            selfie_issue_admin_action_type => 'Selfie Image Issue',
            residency_issue_admin_action_type => 'Proof of Residence Issue'
        }
      end


      def admin_action_type
        {
            data_mismatch_admin_action_type => 'Data Mismatch Email Sent',
            passport_issue_admin_action_type => 'Passport Image Issue Email Sent',
            selfie_issue_admin_action_type => 'Selfie Image Issue Email Sent',
            residency_issue_admin_action_type => 'Residency Image Issue Email Sent'
        }
      end

      ### admin action type End ####

    end

  end

end
