# frozen_string_literal: true

class Article < ApplicationRecord
  MAX_TITLE_LENGTH = 155
  MAX_BODY_LENGTH = 1000

  enum state: { draft: "draft", published: "published" }

  scope :with_title_search, -> (title) { where("lower(title) LIKE ?", "%#{title.downcase}%") }

  belongs_to :user
  belongs_to :category
  has_many :versions, dependent: :destroy
  has_many :schedules, as: :schedulable, dependent: :destroy

  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }
  validates :body, presence: true, length: { maximum: MAX_BODY_LENGTH }
  validates :slug, uniqueness: true
  validate :slug_not_changed

  before_create :set_slug
  after_create :create_first_version

  private

    def set_slug
      title_slug = title.parameterize
      regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
      latest_article_slug = Article.where(
        regex_pattern,
        "#{title_slug}$|#{title_slug}-[0-9]+$",
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
      slug_count = 0
      if latest_article_slug.present?
        slug_count = latest_article_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, t("slug.change_not_allowed"))
      end
    end

    def create_first_version
      tag = state
      if state == "draft"
        tag = "drafted"
      end
      version = Version.new(title: title, category_id: category_id, body: body, state: state, tag: tag, article_id: id)
      version.save!
    end
end
