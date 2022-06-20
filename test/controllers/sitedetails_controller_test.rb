# frozen_string_literal: true

require "test_helper"

class SitedetailsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category)
    @details = create(:site_detail)
    @headers = headers(@details)
  end

  def test_should_get_all_required_site_details
    get sitedetails_path, headers: @headers
    assert_response :success
    response_body = response.parsed_body
    assert_equal @details.name, response_body["details"]["name"]
  end

  def test_should_update_name_in_site_details
    put sitedetails_path, params: { details: { name: "Test name", password: "Test Password" } }, headers: @headers
    assert_response :success
  end
end
