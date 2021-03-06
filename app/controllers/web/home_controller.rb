# class Web::HomeController < Web::BaseController
#   layout "web"
#
#   before_action :set_page_meta_info, except: [:redirect_to_team, :ost_circulation, :product]
#
#   # Action for the home page index
#   #
#   # * Author: Kedar
#   # * Date: 09/10/2017
#   # * Reviewed By: Sunil Khedar
#   #
#   def index
#   end
#
#   # Action for the about page
#   #
#   # * Author: Kedar
#   # * Date: 09/10/2017
#   # * Reviewed By: Sunil Khedar
#   #
#   def about
#   end
#
#   # Redirect to /team page
#   #
#   # * Author: Sunil
#   # * Date: 12/03/2018
#   # * Reviewed By:
#   #
#   def redirect_to_team
#     redirect_to "#{GlobalConstant::Base.company_other_product_urls['root_url']}team", status: GlobalConstant::ErrorCode.permanent_redirect and return
#   end
#
#   # Action for the privacy page
#   #
#   # * Author: Kedar
#   # * Date: 09/10/2017
#   # * Reviewed By: Sunil Khedar
#   #
#   def privacy
#   end
#
#   # Action for the terms page
#   #
#   # * Author: Kedar
#   # * Date: 09/10/2017
#   # * Reviewed By: Sunil Khedar
#   #
#   def terms
#   end
#
#   # Action for the documents page
#   #
#   # * Author: Kedar
#   # * Date: 09/10/2017
#   # * Reviewed By: Sunil Khedar
#   #
#   def documents
#   end
#
#   # Action for the product page
#   #
#   # * Author: Akshay
#   # * Date: 28/10/2017
#   # * Reviewed By:
#   #
#   def product
#     redirect_to "#{GlobalConstant::Base.company_other_product_urls['root_url']}", status: GlobalConstant::ErrorCode.permanent_redirect and return
#   end
#
#   # Action for the check page
#   #
#   # * Author: Aman
#   # * Date: 28/10/2017
#   # * Reviewed By: Sunil
#   #
#   # def check
#   #   @country = get_country_from_ip.upcase
#   #   @ip_address = ip_address
#   # end
#
#   # Action to show ost in circulation,
#   # for now its hard-coded, will call api in future.
#   #
#   # * Author: Pankaj
#   # * Date: 19/12/2017
#   # * Reviewed By: Bala
#   #
#   def ost_circulation
#     render :layout => false
#   end
# end
