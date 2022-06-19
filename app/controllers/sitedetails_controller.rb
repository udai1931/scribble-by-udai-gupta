# frozen_string_literal: true

class SitedetailsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :show

  def update
    sitedetail = SiteDetail.first
    sitedetail.update!({ name: sitedetails_params["name"], password: sitedetails_params["password"] })
    @@auth_active = sitedetails_params["status"]
    respond_with_success("Site details updated successfully")
  end

  def show
    @sitedetail = SiteDetail.first
    @status = @@auth_active
  end

  private

    def sitedetails_params
      params.require(:details).permit(:name, :password, :status)
    end
end
