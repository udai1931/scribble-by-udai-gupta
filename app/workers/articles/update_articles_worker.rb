# frozen_string_literal: true

module Articles
  class UpdateArticlesWorker
    include Sidekiq::Worker

    def perform(id, state, schedule_id)
      article = Article.find_by(id: id)
      if article.update!({ state: state })
        Schedule.find_by!(id: schedule_id).destroy!
        create_new_version(article)
      end
  end

    private

      def create_new_version(article)
        article.versions.create!(version_params(article))
      end

      def version_params(article)
        tag = article.state
        if tag == "draft"
          tag = "drafted"
        end
        params = article.attributes.except!("created_at", "updated_at", "slug", "visits", "id", "user_id")
        params.merge!(tag: tag)
      end
  end
end
