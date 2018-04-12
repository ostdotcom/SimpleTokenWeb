Rails.application.routes.draw do

  constraints(InitSimpleToken) do
    get '/' => 'application#handle_redirects_from_simple_token_domain'
    get '/ost-in-circulation' => "web/home#ost_circulation"
    match '*permalink', to: 'application#handle_redirects_from_simple_token_domain', via: :all
  end

  constraints(InitStaticOst) do

    scope '', controller: 'web/home' do
      #get '/' => :index # served from company-web repository
      get '/team' => :about
      get '/about' => :redirect_to_team
      get '/product' => :product
      get '/privacy' => :privacy
      get '/terms' => :terms
      get '/news' => :news
      get '/careers' => :careers
      get '/documents' => :documents
      get '/partners' => :partners
      # get '/ip-checker' => :check
      # get '/ost-in-circulation' => :ost_circulation
    end

    scope '', controller: 'web/marketing' do
      get '/token-sale-landing' => :index
    end

    scope '', controller: 'web/producthunt' do
      get '/product-hunt' => :index
    end

    match '*permalink', to: 'application#not_found', via: :all
  end

  # openst.org Routes
  # constraints(InitOpenST) do
  #   scope '', controller: 'web/open_st' do
  #     get '/' => :index
  #   end
  #   # Route not found handler. Should be the last entry here
  #   match '*permalink', to: 'application#not_found', via: :all
  # end

  # kyc.simpletoken.org Routes
  #
  constraints(InitKyc) do
    scope '', controller: 'web/kyc' do
      get '/' => :index
    end

    scope 'admin/', controller: 'admin/home' do
      get '/login' => :login
      get '/logout' => :logout
      get '/authentication' => :authentication
      get '/change-password' => :change_password
      get '/dashboard' => :dashboard
      get '/get-kyc-dashboard' => :get_kyc_dashboard
      get '/get-kyc-details' => :kyc_details
      get '/kyc-action-logs' => :kyc_action_logs
      get '/whitelist-dashboard' => :whitelist_dashboard
      get '/get-kyc-whitelist-dashboard' => :get_kyc_whitelist_dashboard
      # get '/sale-all-dashboard' => :sale_all_dashboard
      # get '/get-sale-all-dashboard' => :get_sale_all_dashboard
      # get '/sale-daily-dashboard' => :sale_daily_dashboard
      # get '/get-sale-daily-dashboard' => :get_sale_daily_dashboard
      # get '/contract-events-dashboard' => :contract_events_dashboard
      # get '/get-contract-events-dashboard' => :get_contract_events_dashboard
      # get '/pos-dashboard' => :pos_dashboard
    end

    namespace 'devadmin' do
      # ST Api sidekiq web interface endpoint
      mount ApiSidekiqServer => '/api-sidekiq'
    end

    # Route not found handler. Should be the last entry here
    match '*permalink', to: 'application#not_found', via: :all
  end

  # Simple Token Routes
  constraints(InitTokenSale) do
    scope '', controller: 'web/token_sale' do
      get '/' => :index
    end

    scope '', controller: 'web/user' do
      get '/reserve-token' => :add_branded_token
      get '/update-token' => :update_branded_token
      get '/verification-link' => :verification_link
    end

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
    get '/token-sale-blocked-region' => :token_sale_blocked_region
  end
  match '/', to: 'application#not_found', via: :all

  match '*permalink', to: 'application#not_found', via: :all

end