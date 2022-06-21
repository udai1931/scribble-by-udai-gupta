# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :articles, dependent: :destroy
  validates :name, presence: true, uniqueness: true

  before_create :set_index

  private

    def set_index
      self.index = Category.count + 1
    end
end
