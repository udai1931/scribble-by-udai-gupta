# frozen_string_literal: true

def enable_test_coverage
  require "simplecov"
  SimpleCov.start do
    add_filter "/test/"
    add_group "Models", "app/models"
    add_group "Mailers", "app/mailers"
    add_group "Controllers", "app/controllers"
    add_group "Uploaders", "app/uploaders"
    add_group "Helpers", "app/helpers"
    add_group "Workers", "app/workers"
    add_group "Services", "app/services"
  end
end

enable_test_coverage if ENV["COVERAGE"]

ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

class ActiveSupport::TestCase
  include ActionView::Helpers::TranslationHelper
  include FactoryBot::Syntax::Methods
  # Run tests in parallel with specified workers
  # parallelize(workers: :number_of_processors)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  # fixtures :all

  # Add more helper methods to be used by all tests here...
end

def headers(organization, options = {})
  {
    Accept: "application/json",
    "Content_Type" => "application/json",
    "X-Auth-Token" => organization.auth_token,
    "X-Auth-Expiry" => Time.current.to_i + 10.minute.to_i
  }.merge(options)
end

def headers_without_token
  {
    Accept: "application/json",
    "Content_Type" => "application/json"
  }
end
