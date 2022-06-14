# frozen_string_literal: true

class RedirectionsController < ApplicationController
  before_action :load_redirection!, only: %i[update destroy]

  def create
    redirection = Redirection.new(redirection_params)
    redirection.save!
  end

  def index
    @redirections = Redirection.all
  end

  def update
    @redirection.update!(redirection_params)
    respond_with_success("Redirection was successfully updated")
  end

  def destroy
    @redirection.destroy!
    respond_with_success("Redirection was successfully deleted")
  end

  private

    def redirection_params
      params.require(:redirection).permit(:from, :to)
    end

    def load_redirection!
      @redirection = Redirection.find_by!(id: params[:id])
    end
end