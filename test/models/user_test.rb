# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
  end

  def test_user_should_not_be_valid_and_saved_without_name
    @user.name = ""
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, t("blank", entity: "Name")
  end

  def test_name_should_be_of_valid_length
    @user.name = "a" * (User::MAX_NAME_LENGTH + 1)
    assert @user.invalid?
  end
end
