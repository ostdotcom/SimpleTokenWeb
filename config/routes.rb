Rails.application.routes.draw do

  scope '', controller: 'web/home' do
    get '/' => :index
    get '/about' => :about
    get '/privacy' => :privacy
    get '/terms' => :terms
    get '/documents' => :documents
  end

  namespace 'admin' do
    # ST Api sidekiq web interface endpoint
    mount ApiSidekiqServer => '/api-sidekiq'
  end

  match '*permalink', to: 'application#not_found', via: :all
end
