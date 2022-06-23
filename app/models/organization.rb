# frozen_string_literal: true

class Organization < ApplicationRecord
  MAX_NAME_LENGTH = 155

  has_many :users, dependent: :destroy

  validates :name, presence: true, uniqueness: true, length: { maximum: MAX_NAME_LENGTH }

  has_secure_password
  has_secure_token :auth_token
end
