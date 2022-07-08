
# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy versions list_schedules create_schedule]
  before_action :load_count, only: %i[index list_by_state]
  before_action :search, only: %i[index list_by_state]
  after_action :create_new_version, only: %i[update]
  after_action :update_visits_count, only: %i[show]

  def index
    articles = @searched.order(id: :desc)
    @articles = articles.page(params[:page])
    @count = articles.count
  end

  def create
    current_user.articles.create!(article_params)
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def show
    render
  end

  def update
    @article.update!(article_params.except(:tag, :execution_time))
    respond_with_success(t("successfully_updated", entity: "Article"))
  end

  def destroy
    @article.destroy!
  end

  def list_by_state
    articles = @searched.where(state: article_params[:state])
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

  def list_schedules
    @schedules = @article.schedules.order(execution_time: :asc)
  end

  def create_schedule
    execution_time = create_execution_time
    @article.schedules.create!(status: params[:status], execution_time: execution_time)
    respond_with_success(t("successfully_created", entity: "Update Schedule"))
  end

  private

    def article_params
      params.require(:article).permit(:title, :body, :state, :category_id, :tag, :date, :time, :slug)
    end

    def load_article!
      @article = Article.find_by!(slug: params[:slug])
    end

    def load_count
      @draft = Article.draft.length
      @published = Article.published.length
    end

    def create_new_version
      @article.versions.create!(article_params)
    end

    def update_visits_count
      if params[:eui] == "true"
        @article.visits += 1
        @article.save!
      end
    end

    def create_execution_time
      Time.zone.at(params[:execution_time].to_i)
    end

    def search
      @searched = Article.where("lower(title) LIKE ?", "%#{params[:title].downcase}%")
    end
end
