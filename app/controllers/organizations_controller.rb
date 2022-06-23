# frozen_string_literal: true

class OrganizationsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :show

  def show
    @organization = organization
  end

  def update
    organization.update!(organization_params)
    respond_with_success(t("successfully_updated", entity: "Organization"))
  end

  private

    def organization_params
      params.require(:organization).permit(:name, :password, :is_password_protected)
    end
end
