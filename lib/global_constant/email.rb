# frozen_string_literal: true
module GlobalConstant

  class Email

    class << self

      def default_from
        'kyc.notifier@ost.com'
      end

      def default_to
        ['bala@ost.com', 'sunil@ost.com', 'kedar@ost.com', 'abhay@ost.com','aman@ost.com', 'alpesh@ost.com', 'akshay@ost.com', 'thahir@ost.com']
      end

      def subject_prefix
        "STW #{Rails.env} : "
      end

    end

  end

end
