# frozen_string_literal: true
module GlobalConstant

  class UserKycDetail

    class << self

      def admin_kyc_statuses
        {
            'un_processed_admin_status' => 'Unprocessed',
            'qualified_admin_status' => 'Qualified',
            'denied_admin_status' => 'Denied',
            'whitelisted_admin_status' => 'Whitelisted'
        }
      end
      def admin_kyc_green_status_class
        {
            'un_processed_admin_status' => 'yello',
            'qualified_admin_status' => 'green',
            'denied_admin_status' => 'red',
            'whitelisted_admin_status' => 'green'
        }
      end

      def cynopsis_kyc_statuses
        {
            'un_processed_cynopsis_status' => 'Unprocessed',
            'cleared_cynopsis_status' => 'Cleared',
            'pending_cynopsis_status' => 'Pending',
            'approved_cynopsis_status' => 'Approved',
            'rejected_cynopsis_status' => 'Rejected'
        }
      end
      def cynopsis_kyc_green_status_class
        {
            'un_processed_cynopsis_status' => 'yello',
            'cleared_cynopsis_status' => 'green',
            'pending_cynopsis_status' => 'yello',
            'approved_cynopsis_status' => 'green',
            'rejected_cynopsis_status' => 'red'
        }
      end

    end

  end

end
