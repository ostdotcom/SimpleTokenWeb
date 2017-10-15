class Admin::HomeController < Admin::BaseController
  layout "admin"

  before_action :delete_admin_cookie, only: [:login]
  before_action :check_admin_cookie, except: [:login]

  before_action :set_page_meta_info, :except => [:get_kyc_dashboard]

  # Admin login
  #
  # * Author: Aman
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def login
  end

  # Admin login mfa
  #
  # * Author: Aman
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def authentication
  end

  # Admin dashboard
  #
  # * Author: Aman
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def dashboard
    @statuses = {cynopsis_status: 'cleared', admin_status: 'un_processed'}
    @sort_order = 'newest'
  end

  # Admin dashboard
  #
  # * Author: Aman
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def get_kyc_dashboard

    response = {
        recordsTotal:57,
        recordsFiltered:43,
        data: [
            {date_time: '12/08/2017 14:32', status: 'Pending', duplicate: true, re_submitted: true, name: 'Some one', country: 'India', passport_no: 'aslkjf234987askjn', nationality: 'Indian', admin: 'Frankie', user_case_id: 123},
            {date_time: '12/08/2017 14:32', status: 'Pending', duplicate: true, re_submitted: false, name: 'Some one', country: 'India', passport_no: 'aslkjf234987askjn', nationality: 'Indian', admin: 'Frankie', user_case_id: 123},
            {date_time: '12/08/2017 14:32', status: 'Pending', duplicate: false, re_submitted: true, name: 'Some one', country: 'India', passport_no: 'aslkjf234987askjn', nationality: 'Indian', admin: 'Frankie', user_case_id: 123},
            {date_time: '12/08/2017 14:32', status: 'Pending', duplicate: true, re_submitted: true, name: 'Some one', country: 'India', passport_no: 'aslkjf234987askjn', nationality: 'Indian', admin: 'Frankie', user_case_id: 123},
            {date_time: '12/08/2017 14:32', status: 'Pending', duplicate: true, re_submitted: false, name: 'Some one', country: 'India', passport_no: 'aslkjf234987askjn', nationality: 'Indian', admin: 'Frankie', user_case_id: 123},
            {date_time: '12/08/2017 14:32', status: 'Pending', duplicate: false, re_submitted: true, name: 'Some one', country: 'India', passport_no: 'aslkjf234987askjn', nationality: 'Indian', admin: 'Frankie', user_case_id: 123},
            {date_time: '12/08/2017 14:32', status: 'Pending', duplicate: false, re_submitted: true, name: 'Some one', country: 'India', passport_no: 'aslkjf234987askjn', nationality: 'Indian', admin: 'Frankie', user_case_id: 123},
            {date_time: '12/08/2017 14:32', status: 'Pending', duplicate: false, re_submitted: true, name: 'Some one', country: 'India', passport_no: 'aslkjf234987askjn', nationality: 'Indian', admin: 'Frankie', user_case_id: 123},
            {date_time: '12/08/2017 14:32', status: 'Pending', duplicate: true, re_submitted: false, name: 'Some one', country: 'India', passport_no: 'aslkjf234987askjn', nationality: 'Indian', admin: 'Frankie', user_case_id: 123},
            {date_time: '12/08/2017 14:32', status: 'Pending', duplicate: true, re_submitted: true, name: 'Some one', country: 'India', passport_no: 'aslkjf234987askjn', nationality: 'Indian', admin: 'Frankie', user_case_id: 123},
            {date_time: '12/08/2017 14:32', status: 'Pending', duplicate: true, re_submitted: true, name: 'Some one', country: 'India', passport_no: 'aslkjf234987askjn', nationality: 'Indian', admin: 'Frankie', user_case_id: 123},
            {date_time: '12/08/2017 14:32', status: 'Pending', duplicate: false, re_submitted: false, name: 'Some one', country: 'India', passport_no: 'aslkjf234987askjn', nationality: 'Indian', admin: 'Frankie', user_case_id: 123},
            {date_time: '12/08/2017 14:32', status: 'Pending', duplicate: true, re_submitted: true, name: 'Some one', country: 'India', passport_no: 'aslkjf234987askjn', nationality: 'Indian', admin: 'Frankie', user_case_id: 123}
        ]
    }

    service_response = SimpleTokenApi::Request::Admin.new(request.cookies, {"USER-AGENT" => http_user_agent})
                           .dashboard_detail(params)

    render :json => response and return

  end

  # Admin dashboard
  #
  # * Author: Aman
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def kyc_details

    service_response = SimpleTokenApi::Request::Admin.new(request.cookies, {"USER-AGENT" => http_user_agent})
                           .get_kyc_details(params)
    #binding.pry
    @service_data = service_response.data
    Rails.logger.info(@service_data.inspect)

  end

end
