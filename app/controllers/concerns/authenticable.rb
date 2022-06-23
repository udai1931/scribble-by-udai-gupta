# frozen_string_literal: true

module Authenticable
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_user_using_x_auth_token, if: -> { organization.is_password_protected }
  end

  private

    def authenticate_user_using_x_auth_token
      expiry = request.headers["X-Auth-Expiry"].presence
      auth_token = request.headers["X-Auth-Token"]
      is_valid_token = auth_token && ActiveSupport::SecurityUtils.secure_compare(organization.auth_token, auth_token)
      unless is_valid_token && expiry&.to_i > Time.current.to_i
        respond_with_error(t("session.expired"), :unauthorized)
      end
    end
end
