# frozen_string_literal: true

class FutureArticleUpdatesWorker
  include Sidekiq::Worker

  def perform
    future_article_update_service = FutureArticleUpdateService.new
    future_article_update_service.process
  end
end
