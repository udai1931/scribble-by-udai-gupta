# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @category = create(:category, category: @category)
    @article = create(:article, author_user: @user, category: @category)
  end

  def test_values_of_created_at_and_updated_at
    # puts @user
    # article = Article.new(title: "Test",description: "Desc", author_user: @user, category: @category)
    # assert_nil article.created_at
    # assert_nil article.updated_at
    # article.save!
    # assert_not_nil article.created_at
    # assert_equal article.updated_at, article.created_at
    # article.update!(title: 'This is a updated article')
    # assert_not_equal article.updated_at, article.created_at
  end
end
