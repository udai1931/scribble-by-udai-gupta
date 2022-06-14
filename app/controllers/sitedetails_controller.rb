# frozen_string_literal: true

class SitedetailsController < ApplicationController
  def update
    category = SiteDetail.first
    category.update!(sitedetails_params)
    respond_with_success("Site details updated successfully")
  end

  private

    def sitedetails_params
      params.require(:details).permit(:name, :password)
    end
end
