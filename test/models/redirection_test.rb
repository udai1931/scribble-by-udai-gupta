# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @redirection = build(:redirection)
  end

  def test_redirection_should_be_invalid_without_from
    @redirection.from = nil
    assert @redirection.invalid?
  end

  def test_redirection_should_be_invalid_without_to
    @redirection.to = nil
    assert @redirection.invalid?
  end

  def test_redirection_should_have_unique_from
    @redirection.save
    redirection_2 = build(:redirection, from: @redirection.from)
    assert redirection_2.invalid?
  end

  def test_valid_redirection_should_be_saved
    assert_difference "Redirection.count" do
      @redirection.save
    end
  end

  def test_redirection_should_have_unique_from_and_to
    redirection = build(:redirection, from: "test", to: "test")
    assert redirection.invalid?
  end

  def test_cycle_detection_in_redirection
    redirection_1 = build(:redirection, from: "a", to: "b")
    assert redirection_1.valid?
    redirection_1.save
    redirection_2 = build(:redirection, from: "b", to: "c")
    assert redirection_2.valid?
    redirection_2.save
    redirection_3 = build(:redirection, from: "c", to: "a")
    assert_not redirection_3.save
  end
end
