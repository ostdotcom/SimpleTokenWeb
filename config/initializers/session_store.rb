# Be sure to restart your server when you modify this file.

Rails.application.config.session_store :cookie_store, key: '_st_session_id', domain: :all, secure: !Rails.env.development?, same_site: :strict