Rails.application.routes.draw do

  scope '', controller: 'web/home' do
    get '/' => :index
    get '/login' => :login
    get '/reset' => :reset
    get '/register' => :register
    get '/loggedin' => :loggedin
    get '/token' => :token
    get '/changepw' => :changepw
    get '/about' => :about
    get '/privacy' => :privacy
    get '/terms' => :terms
    get '/documents' => :documents
  end

  scope 'admin/', controller: 'admin/home' do
    get '/' => :login
    get '/authentication' => :authentication
  end



  match '*permalink', to: 'application#not_found', via: :all
end
