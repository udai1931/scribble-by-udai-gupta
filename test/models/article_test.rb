# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category)
    @article = create(:article, user: @user, category: @category, state: "draft")
  end

  def test_values_of_created_at_and_updated_at
    article = Article.new(title: "Test", body: "Desc", user: @user, category: @category, state: "draft")
    assert_nil article.created_at
    assert_nil article.updated_at
    article.save!
    assert_not_nil article.created_at
    assert_equal article.updated_at, article.created_at
    article.update!(title: "This is a updated title")
    assert_not_equal article.updated_at, article.created_at
  end

  def test_article_should_not_be_valid_without_category
    @article.category = nil
    assert_not @article.save
    assert_includes @article.errors.full_messages, t("must_exist", entity: "Category")
  end

  def test_exception_raised
    assert_raises ActiveRecord::RecordNotFound do
      Article.find(SecureRandom.uuid)
    end
  end

  def test_article_count_inceases_on_save
    assert_difference ["Article.count"] do
      create(:article, user: @user, category: @category)
    end
  end

  def test_article_count_inceases_on_delete
    assert_difference ["Article.count"], -1 do
      @article.destroy
    end
  end

  def test_article_should_not_be_valid_without_title
    @article.title = nil
    assert_not @article.valid?
  end

  def test_article_should_not_be_valid_with_invalid_category
    @article.category_id = SecureRandom.uuid
    assert_not @article.valid?
  end

  def test_article_slug_is_parameterized_title
    title = @article.title
    @article.save!
    assert_equal title.parameterize, @article.slug
  end

  def test_incremental_slug_generation_for_articles_with_duplicate_two_worded_titles
    first = Article.create!(
      title: "test article", user: @user, category: @category,
      body: "test body")
    second = Article.create!(
      title: "test article", user: @user, category: @category,
      body: "test body")
    assert_equal "test-article", first.slug
    assert_equal "test-article-2", second.slug
  end

  def test_error_raised_for_duplicate_slug
    another_test_article = Article.create!(
      title: "another test", user: @user, category: @category,
      body: "test body")
    assert_raises ActiveRecord::RecordInvalid do
      another_test_article.update!(slug: @article.slug)
    end
    error_msg = another_test_article.errors.full_messages.to_sentence
    assert_match t("slug.change_not_allowed"), error_msg
  end

  def test_updating_title_does_not_update_slug
    assert_no_changes -> { @article.reload.slug } do
      updated_article_title = "updated title"
      @article.update!(title: updated_article_title)
      assert_equal updated_article_title, @article.title
    end
  end

  def test_category_count_increases_on_article_save
    initial_count = @category.articles.count
    article = Article.new(title: "test", body: "test", user: @user, category: @category)
    article.save
    assert_equal @category.articles.count, initial_count + 1
  end

  def test_category_count_decreases_on_article_destroy
    initial_count = @category.articles.count
    @article.destroy
    assert_equal @category.articles.count, initial_count - 1
  end

  def test_category_count_changes_on_article_category_update
    initial_count = @category.articles.count
    article = Article.new(title: "test", body: "test", user: @user, category: @category)
    article.save!
    assert_equal @category.articles.count, initial_count + 1
    @new_category = create(:category)
    article.update!(category: @new_category)
    assert_equal @category.articles.count, initial_count
    assert_equal @new_category.articles.count, 1
  end
end
