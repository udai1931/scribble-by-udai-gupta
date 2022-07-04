# frozen_string_literal: true

require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category)
    @article = create(:article, category: @category, user: @user, state: "draft")
    @headers = headers(@organization)
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

  def test_shouldnt_list_articles_for_invalid_user
    get articles_path, headers: @headers_without_token
    assert_response :unauthorized
    response_body = response.parsed_body
    assert_equal response_body["error"], t("session.expired")
  end

  def test_should_list_all_articles_for_valid_user_with_draft_and_published_articles
    get articles_path + "/count_by_state", headers: @headers
    assert_response :success
    response_body = response.parsed_body
    all_articles = response_body["count"]
    draft_articles_count = Article.where(state: "draft").count
    published_articles_count = Article.where(state: "published").count
    assert_equal all_articles["draft"], draft_articles_count
    assert_equal all_articles["published"], published_articles_count
  end

  def test_should_create_valid_article
    post articles_path,
      params: {
        article: {
          title: "test", body: "body", user_id: @user.id,
          category_id: @category.id, state: "draft"
        }
      },
      headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "Article")
  end

  def test_should_destroy_article
    assert_difference "Article.count", -1 do
      delete article_path(@article.slug), headers: @headers
    end
  end

  def test_should_get_articles_for_a_state
    article_params = { article: { state: "published" } }
    post articles_path + "/list_by_state", params: article_params, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["articles"].length, Article.published.length
  end

  def test_to_return_record_not_found
    article_params = { article: { state: "published", title: "Test 2" } }
    put article_path(SecureRandom.uuid), params: article_params, headers: @headers
    assert_response :not_found
  end
end
