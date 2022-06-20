# frozen_string_literal: true

module Authenticable
  extend ActiveSupport::Concern

  @@auth_active = true

  included do
    before_action :authenticate_user_using_x_auth_token, if: :auth_active
  end

  private

    def authenticate_user_using_x_auth_token
      expiry = request.headers["X-Auth-Expiry"].presence
      auth_token = request.headers["X-Auth-Token"]
      details = SiteDetail.first
      is_valid_token = auth_token && ActiveSupport::SecurityUtils.secure_compare(details.auth_token, auth_token)
      unless is_valid_token && expiry && expiry.to_i > Time.now.to_i
        respond_with_error("Session Expired! ", :unauthorized)
      end
    end
end
