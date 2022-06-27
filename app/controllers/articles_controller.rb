
# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy versions]
  before_action :load_count, only: %i[index list_by_state]
  after_action :create_new_version, only: %i[update]

  def index
    @articles = Article.all
  end

  def create
    article = current_user.articles.new(article_params)
    article.save!
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
    @articles = Article.where(state: article_params[:state])
  end

  def versions
    @versions = @article.versions
  end

  private

    def article_params
      params.require(:article).permit(:title, :body, :state, :category_id, :tag)
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
end
