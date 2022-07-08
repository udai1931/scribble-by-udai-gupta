# frozen_string_literal: true

class HomeController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token
  before_action :redirect_article

  def index
    render
  end

  def redirect_article
    redirection = Redirection.find_by(from: params["path"])
    redirect_to "/#{redirection.to}" if redirection.present?
  end
end
