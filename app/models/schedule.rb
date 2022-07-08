# frozen_string_literal: true

class Schedule < ApplicationRecord
  enum status: { draft: "draft", published: "published" }

  belongs_to :schedulable, polymorphic: true

  validates :status, presence: true
  validates :execution_time, presence: true
end
