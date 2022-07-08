# frozen_string_literal: true

require "test_helper"

class Articles::FutureArticleUpdatesWorkerTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category)
    @article = create(:article, user: @user, category: @category, state: "draft")
    @schedule = create(:schedule, schedulable: @article)
  end

  def test_should_update_the_article_state_to_published
    version_count = @article.versions.count
    assert_difference -> { Schedule.count }, -1 do
      Articles::FutureArticleUpdatesWorker.perform_async
    end
    assert_equal version_count + 1, @article.versions.count
    @article.reload
    assert_equal @article.state, "published"
  end
end
