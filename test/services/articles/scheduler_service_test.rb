# frozen_string_literal: true

require "test_helper"

class Articles::SchedulerServiceTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category)
    @article = create(:article, user: @user, category: @category, state: "draft")
    @schedule = create(:schedule, schedulable: @article)
  end

  def test_should_update_article_later
    version_count = @article.versions.count
    @article.schedules.create!(execution_time: Time.current + 1.day, status: "published")
    Articles::SchedulerService.new.process
    assert_equal @article.state, "draft"
  end
end
