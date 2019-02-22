class Web::IframeController < Web::BaseController

  layout "client_iframe"


  def index
    puts "==============index=======----index-----------------"
    puts request.user_agent
    puts "===============index======---------index------------"

  end

end
