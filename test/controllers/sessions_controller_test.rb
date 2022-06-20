# frozen_string_literal: true

require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @details = create(:site_detail)
    @headers = headers(@details)
  end

  def test_should_create_a_session_with_valid_credentials
    post sessions_path, params: { login: { password: @details.password } }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal @details.auth_token, response_json["auth_token"]
  end

  def test_should_return_incorrect_credentials_for_wrong_password
    post sessions_path, params: { login: { password: "" } }, headers: @headers
    assert_response :unauthorized
    response_json = response.parsed_body
    assert_equal response_json["error"], "Incorrect credentials"
  end
end
