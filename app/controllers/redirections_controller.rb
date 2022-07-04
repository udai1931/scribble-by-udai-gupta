# frozen_string_literal: true

class RedirectionsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :index

  before_action :load_redirection!, only: %i[update destroy]

  def index
    @redirections = Redirection.order(id: :asc)
  end

  def create
    Redirection.create!(redirection_params)
  end

  def update
    @redirection.update!(redirection_params)
  end

  def destroy
    @redirection.destroy!
  end

  private

    def redirection_params
      params.require(:redirection).permit(:from, :to)
    end

    def load_redirection!
      @redirection = Redirection.find_by!(id: params[:id])
    end
end
