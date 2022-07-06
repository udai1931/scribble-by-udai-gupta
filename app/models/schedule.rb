# frozen_string_literal: true

class Schedule < ApplicationRecord
  belongs_to :schedulable, polymorphic: true, optional: true

  validates :status, presence: true
  validates :execution_time, presence: true
end
