require 'sidekiq/web'

class ApiSidekiqServer < Sidekiq::Web
  # before do
  #   user = nil
  #   # Get admin user from cookie
  #   #_cookie_val = @env['rack.request.cookie_hash']['cookie_name']
  #   user = true
  #
  #   # if user.blank?
  #   #   redirect "/login?_frm=/admin/resque"
  #   # elsif !user
  #   #   halt(403)
  #   # end
  #
  #   Sidekiq.configure_server do |config|
  #     config.redis = {url: GlobalConstant::ApiSidekiq.redis_endpoint, namespace: GlobalConstant::ApiSidekiq.namespace}
  #   end
  #
  #   Sidekiq.configure_client do |config|
  #     config.redis = {url: GlobalConstant::ApiSidekiq.redis_endpoint, namespace: GlobalConstant::ApiSidekiq.namespace}
  #   end
  # end

  Sidekiq.configure_server do |config|
    config.redis = {url: GlobalConstant::ApiSidekiq.redis_endpoint, namespace: GlobalConstant::ApiSidekiq.namespace}
  end

  Sidekiq.configure_client do |config|
    config.redis = {url: GlobalConstant::ApiSidekiq.redis_endpoint, namespace: GlobalConstant::ApiSidekiq.namespace}
  end

end

if Rails.env.production? || Rails.env.development?
  Sidekiq::Web.use(Rack::Auth::Basic) do |user, password|
    user == GlobalConstant::ApiSidekiq.admin_user
    password == GlobalConstant::ApiSidekiq.admin_pw
  end
end