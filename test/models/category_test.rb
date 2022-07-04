# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = create(:category)
  end

  def test_category_should_be_invalid_without_name
    @category.name = nil
    assert @category.invalid?
  end

  def test_category_should_have_unique_name
    category_2 = build(:category, name: @category.name)
    assert category_2.invalid?
  end

  def test_valid_category_should_be_saved
    assert_difference "Category.count" do
      create(:category)
    end
  end
end
