class Web::OpenStController < Web::BaseController

  layout "open_st"

  before_action :allow_request, :set_page_meta_info

  def index

  end

  private

  def allow_request

    unless params[:ar]=='allow_me'
      if Rails.env.production?
        redirect_to 'https://simpletoken.org'
      else
        redirect_to 'https://stagingsimpletoken.org'
      end
    end


  end

end
