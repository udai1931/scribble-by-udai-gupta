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
    Articles::UpdateArticlesWorker.perform_in(Time.current, @article.id, "published", @schedule.id)
    @article.reload
    assert_equal @article.state, "published"
  end

  def test_should_update_the_article_state_to_drafted
    schedule = create(:schedule, schedulable: @article)
    Articles::UpdateArticlesWorker.perform_in(Time.current, @article.id, "draft", schedule.id)
    @article.reload
    assert_equal @article.state, "draft"
  end

  def test_should_check_if_schedule_cleared
    assert_difference -> { Schedule.count }, -1 do
      Articles::UpdateArticlesWorker.perform_in(Time.current, @article.id, "published", @schedule.id)
    end
  end

  def test_should_not_update_now
    schedule = create(:schedule, schedulable: @article)
    Articles::UpdateArticlesWorker.perform_in(Time.current + 10.minute, @article.id, "published", schedule.id)
    assert_equal @article.state, "draft"
  end

  def test_should_increase_the_version_count
    assert_difference -> { @article.versions.count }, 1 do
      Articles::UpdateArticlesWorker.perform_in(Time.current, @article.id, "published", @schedule.id)
    end
  end
end
