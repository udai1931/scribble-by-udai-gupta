# frozen_string_literal: true

require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @category = create(:category)
    @article = create(:article, category: @category, author_user: @user)
    @details = create(:site_detail)
    @headers = headers(@details)
    @headers_without_token = headers_without_token
  end

  def test_should_list_all_articles_for_valid_user
    get articles_path, headers: @headers
    assert_response :success
    response_body = response.parsed_body
    all_articles = response_body["articles"]
    count = Article.count
    assert_equal all_articles.length, count
  end

  def test_shouldnt_list_all_articles_for_invalid_user
    get articles_path, headers: @headers_without_token
    assert_response :unauthorized
    response_body = response.parsed_body
    assert_equal response_body["error"], "Session Expired! "
  end

  def test_should_list_all_articles_for_valid_user_with_draft_and_published_articles
    get articles_path + "/count", headers: @headers
    assert_response :success
    response_body = response.parsed_body
    all_articles = response_body["count"]
    draft_articles_count = Article.where(state: "Draft").count
    published_articles_count = Article.where(state: "Published").count
    assert_equal all_articles["Draft"], draft_articles_count
    assert_equal all_articles["Published"], published_articles_count
  end

  def test_should_create_valid_article
    post articles_path,
      params: {
        article: {
          title: "test", body: "body", author_user_id: @user.id,
          category_id: @category.id
        }
      },
      headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "Article")
  end

  def test_shouldnt_create_article_without_title
    post articles_path,
      params: {
        article: {
          title: "", body: "Test body", author_user_id: @user.id,
          category_id: @category.id
        }
      },
      headers: @headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json["error"], "Title can't be blank"
  end

  def test_should_destroy_article
    assert_difference "Article.count", -1 do
      delete article_path(@article.slug), headers: @headers
    end
  end

  def test_to_update_the_article
    article_params = { article: { state: "Published", title: "Test 2" } }
    put article_path(@article.slug), params: article_params, headers: @headers
    assert_response :success
    @article.reload
    assert @article.Published?
  end

  def test_should_get_articles_for_a_state
    article_params = { article: { state: "Published" } }
    post articles_path + "/state", params: article_params, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["articles"].length, Article.Published.length
  end

  def test_should_get_articles_for_a_category
    article_params = { article: { category_id: @category.id } }
    post articles_path + "/category", params: article_params, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["articles"].length, @category.count
  end

  def test_to_return_record_not_found
    article_params = { article: { state: "Published", title: "Test 2" } }
    put article_path(SecureRandom.uuid), params: article_params, headers: @headers
    assert_response :not_found
  end
end
