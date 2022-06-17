# frozen_string_literal: true

class SitedetailsController < ApplicationController
  def update
    sitedetail = SiteDetail.first
    sitedetail.update!(sitedetails_params)
  end

  def show
    @sitedetail = SiteDetail.first
  end

  private

    def sitedetails_params
      params.require(:details).permit(:name, :password)
    end
end
