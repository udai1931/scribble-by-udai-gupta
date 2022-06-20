# frozen_string_literal: true

require "test_helper"

class RedirectionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @redirection = create(:redirection)
    @details = create(:site_detail)
    @headers = headers(@details)
  end

  def test_should_list_all_redirections_for_valid_user
    get redirections_path, headers: @headers
    assert_response :success
    response_body = response.parsed_body
    all_redirections = response_body["redirections"]
    count = Redirection.count
    assert_equal all_redirections.length, count
  end

  def test_should_create_valid_redirection
    count = Redirection.count
    post redirections_path, params: { redirection: { from: "url1", to: "url2" } }, headers: @headers
    assert_response :success
    assert_equal count + 1, Redirection.count
  end

  def test_shouldnt_create_redirection_without_from
    post redirections_path, params: { redirection: { from: "", to: "url2" } },
      headers: @headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json["error"], "From can't be blank"
  end

  def test_shouldnt_create_redirection_without_to
    post redirections_path, params: { redirection: { from: "url1", to: "" } },
      headers: @headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json["error"], "To can't be blank"
  end

  def test_shouldnt_create_redirection_with_duplicate_from
    post redirections_path, params: { redirection: { from: @redirection.from, to: "url2" } },
      headers: @headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json["error"], "From has already been taken"
  end

  def test_should_destroy_redirection
    assert_difference "Redirection.count", -1 do
      delete redirection_path(@redirection.id), headers: @headers
    end
  end

  def test_to_update_the_redirection
    redirection_params = { redirection: { from: "url3", to: "url4" } }
    put redirection_path(@redirection.id), params: redirection_params, headers: @headers
    assert_response :success
  end
end
