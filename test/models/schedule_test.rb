# frozen_string_literal: true

require "test_helper"
class ScheduleTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category)
    @article = create(:article, user: @user, category: @category, state: "draft")
    @schedule = create(:schedule, schedulable: @article)
  end

  def test_schedule_not_valid_without_article
    @schedule.schedulable_id = ""
    @schedule.schedulable_type = ""
    assert @schedule.invalid?
    assert_equal @schedule.errors_to_sentence, t("must_exist", entity: "Schedulable")
  end

  def test_schedule_not_valid_without_status
    @schedule.status = ""
    assert @schedule.invalid?
  end

  def test_schedule_not_valid_without_execution_time
    @schedule.execution_time = nil
    assert @schedule.invalid?
  end
end
