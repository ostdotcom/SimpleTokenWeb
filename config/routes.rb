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
      # get '/news' => :news
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
      get '/gdpr' => :gdpr_policy
    end

    # Configurator is not allowed in production environment
    if !Rails.env.production?
      scope 'admin/configurator/', controller: 'admin/configurator' do
        get '/theme' => :theme
        get '/kyc-form' => :kyc_form
        get '/register' => :register
        get '/dashboard' => :dashboard
      end
    end

    scope 'admin/', controller: 'admin/home' do
      get '/login' => :login
      get '/forgot-password' => :forgot_password
      get '/reset-password' => :reset_password
      get '/activate-account' => :activate_account
      get '/authentication' => :authentication
      get '/change-password' => :change_password
      get '/terms-and-conditions' => :terms_and_conditions

      # Configurator is not allowed in production environment
      if !Rails.env.production?
        get ':entity_type/preview' => :user_preview_pages
      end

      get '/dashboard' => :angular_app
      get '/case-id/:id' => :angular_app
      get '/settings/admin' => :angular_app
      get '/settings/user' => :angular_app
      get '/settings/change-password' => :angular_app
      get '/settings/developer-integrations' => :angular_app
      get '/settings/sale-settings' => :angular_app
      get '/settings/country-settings' => :angular_app
      get '/settings/artificial-intelligence' => :angular_app
      get '/settings/contract-addresses' => :angular_app
      get '/settings/form-configurator' => :angular_app
      get '/settings/webhooks' => :angular_app
      get '/settings/email-notification' => :angular_app
      get '/settings/mfa-session' => :angular_app
      

      # get '/get-kyc-dashboard' => :get_kyc_dashboard
      # get '/kyc-action-logs' => :kyc_action_logs
      # get '/whitelist-dashboard' => :whitelist_dashboard
      # get '/get-kyc-whitelist-dashboard' => :get_kyc_whitelist_dashboard
      # get '/sale-all-dashboard' => :sale_all_dashboard
      # get '/get-sale-all-dashboard' => :get_sale_all_dashboard
      # get '/sale-daily-dashboard' => :sale_daily_dashboard
      # get '/get-sale-daily-dashboard' => :get_sale_daily_dashboard
      # get '/contract-events-dashboard' => :contract_events_dashboard
      # get '/get-contract-events-dashboard' => :get_contract_events_dashboard
      # get '/pos-dashboard' => :pos_dashboard
      # get '/old-dashboard' => :dashboard
      # get '/get-kyc-details' => :kyc_details


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

  end

  scope '', controller: 'web/user' do
    get '/login' => :login
    get '/sign-up' => :sign_up
    get '/dashboard' => :dashboard_home
    get '/update-kyc' => :update_kyc_form
    get '/reset-password' => :reset_password
    get '/change-password' => :change_password
    get '/add-kyc' => :add_kyc_form
    get '/token-sale-blocked-region' => :token_sale_blocked_region
    get '/verification-link' => :verification_link
    get '/' => redirect('/login')
  end
  match '/', to: 'application#not_found', via: :all

  match '*permalink', to: 'application#not_found', via: :all

end