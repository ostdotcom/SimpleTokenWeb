class Web::HomeController < Web::BaseController
  layout "web"

  before_action :set_page_meta_info

  skip_before_action :tmp_basic_auth, except: [:platform]

  # Action for the home page index
  #
  # * Author: Kedar
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def index
  end

  # Action for the about page
  #
  # * Author: Kedar
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def about
  end

  # Action for the privacy page
  #
  # * Author: Kedar
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def privacy
  end

  # Action for the terms page
  #
  # * Author: Kedar
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def terms
  end

  # Action for the documents page
  #
  # * Author: Kedar
  # * Date: 09/10/2017
  # * Reviewed By: Sunil Khedar
  #
  def documents
  end

  # Action for the platform page
  #
  # * Author: Akshay
  # * Date: 11/10/2017
  # * Reviewed By: Sunil
  #
  def platform
  end

end
