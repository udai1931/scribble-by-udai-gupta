# frozen_string_literal: true

class SessionsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token

  def create
    @details = SiteDetail.first
    unless @details.authenticate(login_params[:password])
      respond_with_error("Incorrect credentials", :unauthorized)
    end
  end

  private

    def login_params
      params.require(:login).permit(:password)
    end
end
