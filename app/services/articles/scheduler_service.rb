# frozen_string_literal: true

class Articles::SchedulerService
  attr_reader :articles_to_update

  def initialize
    @articles_to_update = get_articles_to_update
  end

  def process
    update_articles
  end

  private

    def get_articles_to_update
      Schedule.order(execution_time: :asc)
    end

    def update_articles
      articles_to_update.each do |updated_article|
          Articles::UpdateArticlesWorker.perform_in(
            updated_article.execution_time, updated_article.scheduleable_id, updated_article.status,
            updated_article.id)
        end
    end
end
