Rails.application.routes.draw do

  # Simple Token Routes
  constraints(InitTokenSale) do
    scope '', controller: 'web/token_sale' do
      get '/' => :index
    end
    scope '', controller: 'web/user' do
      get '/sign-up' => :sign_up
      get '/login' => :login
      get '/reset-password' => :reset_password
      get '/change-password' => :change_password
      get '/update-kyc' => :kyc_form
      get '/reserve-token' => :branded_token_form
    end
    # Route not found handler. Should be the last entry here
    match '*permalink', to: 'application#not_found', via: :all
  end

  scope '', controller: 'web/home' do
    get '/' => :index
    get '/about' => :about
    get '/platform' => :platform
    get '/privacy' => :privacy
    get '/terms' => :terms
    get '/documents' => :documents
  end

  scope 'admin/', controller: 'admin/home' do
    get '/' => :login
    get '/authentication' => :authentication
    get '/dashboard' => :dashboard
  end

  match '*permalink', to: 'application#not_found', via: :all
end