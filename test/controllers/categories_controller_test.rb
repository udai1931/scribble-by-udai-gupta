# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category)
    @details = create(:site_detail)
    @headers = headers(@details)
  end

  def test_should_list_all_categories_for_valid_user
    get categories_path, headers: @headers
    assert_response :success
    response_body = response.parsed_body
    all_categories = response_body["categories"]
    count = Category.count
    assert_equal all_categories.length, count
  end

  def test_should_list_all_articles_category_wise_for_a_valid_user
    get categories_path + "/articles", headers: @headers
    assert_response :success
    response_body = response.parsed_body
    all_categories = response_body["categories"]
    assert_equal all_categories.length, Category.count
  end

  def test_should_create_valid_category
    post categories_path, params: { category: { name: "test" } }, headers: @headers
    assert_response :success
  end

  def test_shouldnt_create_category_without_name
    post categories_path, params: { category: { name: "" } },
      headers: @headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json["error"], "Name can't be blank"
  end

  def test_should_destroy_article
    assert_difference "Category.count", -1 do
      delete category_path(@category.id), headers: @headers
    end
  end

  def test_to_update_the_category
    category_params = { category: { name: "Test 2", index: "9" } }
    put category_path(@category.id), params: category_params, headers: @headers
    assert_response :success
  end
end
