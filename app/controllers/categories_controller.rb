# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category!, only: %i[update destroy index_articles_by_category]
  before_action :reorder_categories, only: %i[index index_articles_by_categories]

  def index
    render
  end

  def create
    @category = Category.new(category_params)
    @category.save!
  end

  def update
    @category.update!(category_params)
  end

  def destroy
    @category.destroy!
  end

  def index_articles_by_category
    render
  end

  def index_articles_by_categories
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
      @categories = Category.order(:position)
    end
end
