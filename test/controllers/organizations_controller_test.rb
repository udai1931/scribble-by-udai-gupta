# frozen_string_literal: true

require "test_helper"

class OrganizationControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category)
    @organization = create(:organization)
    @headers = headers(@organization)
  end

  def test_should_get_all_required_site_details
    get organization_path, headers: @headers
    assert_response :success
    response_body = response.parsed_body
    assert_equal @organization.name, response_body["organization"]["name"]
  end

  def test_should_update_name_in_site_details
    put organization_path, params: { organization: { name: "Test name", password: "Test Password" } }, headers: @headers
    assert_response :success
  end
end
