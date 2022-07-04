# frozen_string_literal: true

module SampleData
  class ArticlesService < Base
    ARTICLES_COUNT = 8

    def process!
      create_articles!
    end

    private

      def create_articles!
        Category.all.each do |category|
          ARTICLES_COUNT.times do
            current_user.articles.create!\
              title: Faker::Book.title,
              body: Faker::Lorem.paragraph,
              category: category,
              state: "draft"
          end
          ARTICLES_COUNT.times do
            current_user.articles.create!\
              title: Faker::Book.title,
              body: Faker::Lorem.paragraph,
              category: category,
              state: "published"
          end
        end
      end
  end
end
