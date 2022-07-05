
# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy versions list_future_updates create_future_update]
  before_action :load_count, only: %i[index list_by_state]
  after_action :create_new_version, only: %i[update]
  after_action :update_visits_count, only: %i[show]

  def index
    @articles = Article.order(id: :desc).page(params[:page])
  end

  def create
    current_user.articles.create!(article_params)
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def show
    render
  end

  def update
    @article.update!(article_params.except(:tag))
    respond_with_success(t("successfully_updated", entity: "Article"))
  end

  def destroy
    @article.destroy!
  end

  def list_by_state
    articles = Article.where(state: article_params[:state])
    @count = articles.count
    @articles = articles.page(params[:page])
  end

  def count_by_state
    @draft = Article.draft.length
    @published = Article.published.length
  end

  def versions
    @versions = @article.versions
    @slug = @article.slug
  end

  def list_in_order_of_visits
    @articles = Article.order(visits: :desc).page(params[:page])
  end

  def list_future_updates
    @future_updates = @article.future_article_updates.order(scheduled_at: :asc)
  end

  def create_future_update
    @article.future_article_updates.create!(state: params[:state], scheduled_at: params[:scheduled_at])
  end

  private

    def article_params
      params.require(:article).permit(:title, :body, :state, :category_id, :tag, :scheduled_at)
    end

    def load_article!
      @article = Article.find_by!(slug: params[:slug])
    end

    def load_count
      @draft = Article.draft.length
      @published = Article.published.length
    end

    def create_new_version
      version = @article.versions.new(article_params)
      version.save!
    end

    def update_visits_count
      if params[:eui] == "true"
        @article.visits += 1
        @article.save!
      end
    end
end
