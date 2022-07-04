# frozen_string_literal: true

require "faker"

module SampleData
  class Base
    def organization
      @_organization ||= Organization.first
    end

    def current_user
      @_current_user ||= User.first
    end

    def skip?
      !heroku_or_development_env?
    end

    def print_description
      print "%-80s" % [description]
    end

    def print_success
      print "[DONE]\n"
    end

    def description
      self.class.name
    end

    def heroku_or_development_env?
      Rails.env.heroku? || Rails.env.development?
    end

    def load!
      print_description
      process!
      print_success
    end
  end
end
