# frozen_string_literal: true

module Articles
  class FutureArticleUpdatesWorker
    include Sidekiq::Worker

    def perform
      article_schedule_service = Articles::SchedulerService.new
      article_schedule_service.process
    end
  end
end
