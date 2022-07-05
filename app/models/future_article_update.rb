# frozen_string_literal: true

class FutureArticleUpdate < ApplicationRecord
  belongs_to :article

  validates :state, presence: true
  validates :scheduled_at, presence: true
  validates :article_id, presence: true
end
