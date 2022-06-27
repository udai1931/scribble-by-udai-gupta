# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_NAME_LENGTH = 50

  has_many :articles, dependent: :destroy
  has_many :versions, dependent: :destroy
  validates :name, presence: true, uniqueness: true, length: { maximum: MAX_NAME_LENGTH }

  before_create :set_position

  private

    def set_position
      self.position = Category.count + 1
    end
end
