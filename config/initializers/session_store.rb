# Be sure to restart your server when you modify this file.

# Rails.application.config.session_store :cookie_store, key: '_st_session_id', domain: :all, http_only: true, secure: !Rails.env.development?, same_site: :strict
Rails.application.config.session_store :cookie_store, key: '_ost_kyc_session_id', http_only: true, secure: !Rails.env.development?, same_site: :strict