# frozen_string_literal: true

require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @headers = headers(@organization)
    @headers_without_token = headers_without_token()
  end

  def test_should_create_a_session_with_valid_credentials
    post session_path, params: { login: { password: @organization.password } }, headers: @headers_without_token
    assert_response :success
    response_json = response.parsed_body
    # assert_equal @organization.auth_token, response_json["auth_token"]
  end

  def test_should_return_incorrect_credentials_for_wrong_password
    post session_path, params: { login: { password: "" } }, headers: @headers
    assert_response :unauthorized
    response_json = response.parsed_body
    assert_equal response_json["error"], t("session.incorrect_credentials")
  end
end
