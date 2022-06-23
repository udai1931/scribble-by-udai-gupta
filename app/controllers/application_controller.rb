# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiResponders
  include ApiRescuable
  include Authenticable

  def organization
    @organization = Organization.first
  end

  def current_user
    @current_user = organization.users.first
  end
end
