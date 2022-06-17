# frozen_string_literal: true

class SitedetailsController < ApplicationController
  # skip_before_action :authenticate_user_using_x_auth_token, only: :show

  def update
    sitedetail = SiteDetail.first
    sitedetail.update!(sitedetails_params)
    respond_with_success("Site details updated successfully")
  end

  def show
    @sitedetail = SiteDetail.first
  end

  private

    def sitedetails_params
      params.require(:details).permit(:name, :password)
    end
end
