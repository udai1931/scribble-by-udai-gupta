# frozen_string_literal: true

class FutureArticleUpdateService
  attr_reader :articles_to_update

  def initialize
    @articles_to_update = get_articles_to_update
  end

  def process
    update_articles
  end

  private

    def get_articles_to_update
      FutureArticleUpdate.order(scheduled_at: :asc)
    end

    def update_articles
      articles_to_update.each do |update_article|
        if UpdateArticlesWorker.perform_in(
          update_article.scheduled_at, update_article.article_id, update_article.state,
          update_article.id)
        end
      end
    end
end
