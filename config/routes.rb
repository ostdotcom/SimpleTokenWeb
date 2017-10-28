Rails.application.routes.draw do

  # Simple Token Routes
  constraints(InitTokenSale) do
    scope '', controller: 'web/token_sale' do
      get '/' => :index
    end

    scope '', controller: 'web/user' do
      get '/login' => :login
      get '/logout' => :logout
      get '/sign-up' => :sign_up
      get '/dashboard' => :dashboard_home
      get '/update-kyc' => :update_kyc_form
      get '/reset-password' => :reset_password
      get '/change-password' => :change_password
      get '/add-kyc' => :add_kyc_form
      get '/reserve-token' => :add_branded_token
      get '/update-token' => :update_branded_token
      get '/verification-link' => :verification_link
      get '/token-sale-blocked-region' => :token_sale_blocked_region
    end
    # Route not found handler. Should be the last entry here
    match '*permalink', to: 'application#not_found', via: :all
  end

  scope '', controller: 'web/home' do
    get '/' => :index
    get '/team' => :about
    get '/about' => :redirect_to_team
    get '/platform' => :platform
    get '/privacy' => :privacy
    get '/terms' => :terms
    get '/documents' => :documents
    get '/ip-checker' => :check
  end

  scope '', controller: 'web/marketing' do
    get '/token-sale-landing' => :index
  end

  scope 'admin/', controller: 'admin/home' do
    get '/login' => :login
    get '/logout' => :logout
    get '/authentication' => :authentication
    get '/dashboard' => :dashboard
    get '/get-kyc-dashboard' => :get_kyc_dashboard
    get '/get-kyc-details' => :kyc_details
    get '/kyc-action-logs' => :kyc_action_logs
  end

  namespace 'admin' do
    # ST Api sidekiq web interface endpoint
    mount ApiSidekiqServer => '/api-sidekiq'
  end

  match '*permalink', to: 'application#not_found', via: :all
end