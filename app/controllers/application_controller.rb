# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiResponders
  include ApiRescuable
  include Authenticable

  private

    def auth_active
      @@auth_active
    end
end
