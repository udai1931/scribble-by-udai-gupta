# frozen_string_literal: true

class Redirection < ApplicationRecord
  MAX_LENGTH = 155
  validates :from, presence: true, uniqueness: true, length: { maximum: MAX_LENGTH }
  validates :to, presence: true, length: { maximum: MAX_LENGTH }
  validate :unique_from_and_to
  validate :cycle_detection
  validate :check_redirection

  private

    def unique_from_and_to
      if from == to
        errors.add(:from, t("redirection.same"))
      end
    end

    def cycle_detection(to = self.to)
      if Redirection.exists?(from: to)
        old_redirection_to = Redirection.find_by(from: to).to
        if old_redirection_to == self.from
          errors.add(:redirection, t("redirection.cycle"))
          nil
        else
          cycle_detection(old_redirection_to)
        end
      end
    end

    def check_redirection
      unless check_redirection_format(from)
        errors.add(:from, t("redirection.invalid"))
      end
      unless check_redirection_format(to)
        errors.add(:to, t("redirection.invalid"))
      end
    end

    def check_redirection_format(str)
      str.match(/^articles\/[A-Za-z0-9\-]+$/)
    end
end
