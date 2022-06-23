# frozen_string_literal: true

class OrganizationsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :show

  def show
    @organization = organization
    @_is_authentication_up = _is_authentication_up
  end

  def update
    organization.update!({ name: organization_params["name"], password: organization_params["password"] })
    _is_authentication_up = organization_params["auth_status"]
    # @_is_authentication_up = organization_params["auth_status"]
    respond_with_success(t("successfully_updated", entity: "Organization"))
  end

  private

    def organization_params
      params.require(:organization).permit(:name, :password, :auth_status)
    end
end
