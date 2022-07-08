# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category!, only: %i[update destroy list_articles]
  before_action :reorder_categories, only: %i[index list_articles_in_order]

  def index
    render
  end

  def create
    @category = Category.create!(category_params)
  end

  def update
    @category.update!(category_params)
  end

  def destroy
    @category.destroy!
  end

  def list_articles
    articles = @category.articles.where("lower(title) LIKE ?", "%#{params[:title].downcase}%")
    @count = articles.count
    @articles = articles.page(params[:page])
  end

  def list_articles_in_order
    render
  end

  private

    def category_params
      params.require(:category).permit(:name, :position)
    end

    def load_category!
      @category = Category.find_by!(id: params[:id])
    end

    def reorder_categories
      @categories = Category.order(position: :asc)
    end
end
