source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '5.1.6'
# Use SCSS for stylesheets
gem 'sass-rails', '5.0.7'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '4.1.14'
# YUI compressor
gem 'yui-compressor', '0.12.0'
# Json formatter
gem 'oj', '3.3.8'
# Sanitize params
gem 'sanitize', '4.5.0'
# Exception notifier
gem 'exception_notification', '4.2.1'
gem 'maxminddb','0.1.14'

gem 'dalli', '2.7.6'

gem 'sidekiq', '5.0.5'
gem 'redis-namespace', '1.5.3'

gem 'listen', '3.1.5'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '2.18.0'
  gem 'selenium-webdriver'
end

group :development do
  # Use Puma as the app server
  gem 'puma', '3.11.4'

  gem 'pry'

  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '3.6.2'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
