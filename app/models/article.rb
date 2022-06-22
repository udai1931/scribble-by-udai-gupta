# frozen_string_literal: true

class Article < ApplicationRecord
  enum state: { Draft: "Draft", Published: "Published" }

  belongs_to :author_user, foreign_key: :author_user_id, class_name: "User"
  belongs_to :category

  validates :title, presence: true
  validates :body, presence: true
  validates :slug, uniqueness: true
  validate :slug_not_changed

  before_validation :set_user
  before_create :set_slug
  after_create :increment_count
  after_destroy :decrement_count
  before_update :update_count

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
        errors.add(:slug, "Slug is not allowed to be changed")
      end
    end

    def set_user
      self.author_user_id = 1
    end

    def increment_count
      category = self.category
      category.count = category.count + 1
      category.save!
    end

    def decrement_count
      category = self.category
      category.count = category.count - 1
      category.save!
    end

    def update_count
      old_category_id = self.category_id_was
      new_category = self.category
      if old_category_id != new_category.id
        new_category.count = new_category.count + 1
        new_category.save!
        old_category = Category.find_by!(id: old_category_id)
        old_category.count = old_category.count - 1
        old_category.save!
      end
    end
end
