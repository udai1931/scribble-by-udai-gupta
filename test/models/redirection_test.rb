# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @redirection = create(:redirection)
  end

  def test_redirection_should_be_invalid_without_from
    @redirection.from = ""
    assert @redirection.invalid?
  end

  def test_redirection_should_be_invalid_without_to
    @redirection.to = ""
    assert @redirection.invalid?
  end

  def test_redirection_should_have_unique_from
    redirection_2 = build(:redirection, from: @redirection.from)
    assert redirection_2.invalid?
  end

  def test_valid_redirection_should_be_saved
    assert_difference "Redirection.count" do
      create(:redirection)
    end
  end

  def test_redirection_should_have_unique_from_and_to
    redirection = build(:redirection, from: "test", to: "test")
    assert redirection.invalid?
  end

  def test_cycle_detection_in_redirection
    redirection_1 = create(:redirection, from: "articles/a", to: "articles/b")
    redirection_2 = create(:redirection, from: "articles/b", to: "articles/c")
    redirection_3 = build(:redirection, from: "articles/c", to: "articles/a")
    refute redirection_3.valid?
  end
end
