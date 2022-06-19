# frozen_string_literal: true

class ApplicationController < ActionController::Base
  @@auth_active = false
  before_action :authenticate_user_using_x_auth_token, if: :auth_active

  rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :handle_validation_error
  rescue_from ActiveRecord::RecordNotUnique, with: :handle_record_not_unique
  rescue_from ActionController::ParameterMissing, with: :handle_api_error

  private

    def auth_active
      @@auth_active
    end

    def authenticate_user_using_x_auth_token
      expiry = request.headers["X-Auth-Expiry"].presence
      auth_token = request.headers["X-Auth-Token"]
      details = SiteDetail.first
      is_valid_token = auth_token && ActiveSupport::SecurityUtils.secure_compare(details.auth_token, auth_token)
      unless is_valid_token && expiry && expiry.to_i > Time.now.to_i
        respond_with_error("Session Expired! ", :unauthorized)
      end
    end

    def handle_validation_error(exception)
      respond_with_error(exception)
    end

    def handle_record_not_found(exception)
      respond_with_error(exception.message, :not_found)
    end

    def handle_record_not_unique(exception)
      respond_with_error(exception)
    end

    def handle_api_error(exception)
      respond_with_error(exception, :internal_server_error)
    end

    def respond_with_error(message, status = :unprocessable_entity, context = {})
      is_exception = message.kind_of?(StandardError)
      error_message = is_exception ? message.record&.errors_to_sentence : message
      render status: status, json: { error: error_message }.merge(context)
    end

    def respond_with_success(message, status = :ok, context = {})
      render status: status, json: { notice: message }.merge(context)
    end

    def respond_with_json(json = {}, status = :ok)
      render status: status, json: json
    end
end
