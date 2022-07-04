# frozen_string_literal: true

module SampleData
  class CategoriesService < Base
    CATEGORIES_COUNT = 5

    def process!
      create_categories!
    end

    private

      def create_categories!
        CATEGORIES_COUNT.times do
          Category.create! \
            name: Faker::Book.genre
        end
      end
  end
end
