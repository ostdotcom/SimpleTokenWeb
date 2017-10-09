# This file is used by Rack-based servers to start the application.

require_relative 'config/environment'

# Action Cable requires that all classes are loaded in advance
Rails.application.eager_load!

run Rails.application
