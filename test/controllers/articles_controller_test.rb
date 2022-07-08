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
          title: @article.title, body: "body", user_id: @user.id,
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

  def test_should_update_article
    article_params = {
      article: {
        body: "Test body", title: "test title", state: "draft", tag: "drafted",
        category_id: @category.id
      }
    }
    # byebug
    put article_path(@article.slug), params: article_params, headers: @headers
    assert_response :success
    response_json = response.parsed_body
  end

  def test_should_not_update_article_slug
    article_params = { article: { slug: "abcd" } }
    put article_path(@article.slug), params: article_params, headers: @headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json["error"], "Slug " + t("slug.change_not_allowed")
  end

  def test_should_show_article
    get article_path(@article.slug), headers: @headers
    assert_response :success
  end

  def test_should_show_article_for_eui
    get article_path(@article.slug) + "?eui=true", headers: @headers
    assert_response :success
  end

  def list_all_versions
    get article_path(@article.slug) + "/versions", headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["versions"].length, @article.versions.length
  end

  def test_should_list_articles_in_order_of_visits
    get articles_path + "/list_in_order_of_visits", headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["articles"][0]["visits"], Article.order(visits: :desc).first.visits
  end

  def test_should_list_all_scheduled_updates
    get article_path(@article.slug) + "/list_schedules", headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["schedules"].length, @article.schedules.length
  end

  def test_should_create_a_schedule
    post article_path(@article.slug) + "/create_schedule", params: { status: "draft", execution_time: Time.current },
      headers: @headers
    assert_response :success
  end
end
