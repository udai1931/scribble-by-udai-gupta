# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy]

  def index
    @articles = Article.all
  end

  def create
    article = Article.new(article_params)
    article.save!
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def show
  end

  def update
    @article.update!(article_params)
    respond_with_success(t("successfully_updated", entity: "Article"))
  end

  def destroy
    @article.destroy!
  end

  def count
    @draft = Article.Draft.length
    @published = Article.Published.length
  end

  def state
    @articles = Article.where(state: params[:state])
  end

  def category
    @articles = Article.where(category_id: params[:category_id])
  end

  private

    def article_params
      params.require(:article).permit(:title, :body, :state, :category_id)
    end

    def load_article!
      @article = Article.find_by!(slug: params[:slug])
    end
end
