# frozen_string_literal: true

class Redirection < ApplicationRecord
  MAX_LENGTH = 155
  validates :from, presence: true, uniqueness: true, length: { maximum: MAX_LENGTH }
  validates :to, presence: true, length: { maximum: MAX_LENGTH }
  validate :unique_from_and_to
  validate :cycle_detection

  private

    def unique_from_and_to
      if from == to
        errors.add(:from, t("redirection.same"))
      end
    end

    def cycle_detection(to = self.to)
      if Redirection.exists?(from: to)
        old_redirection_from = to
        old_redirection_to = Redirection.find_by(from: to).to
        if old_redirection_to == self.from
          errors.add(:redirection, t("redirection.cycle"))
          nil
        else
          cycle_detection(old_redirection_to)
        end
      end
    end
end
