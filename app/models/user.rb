# frozen_string_literal: true

class User < ApplicationRecord
  MAX_NAME_LENGTH = 155

  has_many :articles, dependent: :destroy
  belongs_to :organization

  validates :name, presence: true, length: { maximum: MAX_NAME_LENGTH }
end
