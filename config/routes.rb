Rails.application.routes.draw do

  scope '', controller: 'web/home' do
    get '/' => :index
    get '/about' => :about
    get '/privacy' => :privacy
    get '/terms' => :terms
    get '/documents' => :documents
  end

  match '*permalink', to: 'application#not_found', via: :all
end
