# frozen_string_literal: true

require "test_helper"

class RedirectionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @redirection = create(:redirection)
    @organization = create(:organization)
    @headers = headers(@organization)
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
    post redirections_path, params: { redirection: { from: "/articles/url1", to: "/articles/url2" } }, headers: @headers
    assert_response :success
    assert_equal count + 1, Redirection.count
  end

  def test_should_destroy_redirection
    assert_difference "Redirection.count", -1 do
      delete redirection_path(@redirection.id), headers: @headers
    end
  end

  def test_to_update_the_redirection
    redirection_params = { redirection: { from: "/articles/url3", to: "/articles/url4" } }
    put redirection_path(@redirection.id), params: redirection_params, headers: @headers
    assert_response :success
  end
end
