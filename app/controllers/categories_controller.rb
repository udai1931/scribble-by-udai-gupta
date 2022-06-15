# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category!, only: %i[update destroy]

  def create
    @category = Category.new(category_params)
    @category.save!
  end

  def index
    @categories = Category.order(:index)
  end

  def update
    @category.update!(category_params)
  end

  def destroy
    @category.destroy!
    respond_with_success("Category was successfully deleted")
  end

  def articles
    @categories = Category.order(:index)
  end

  private

    def category_params
      params.require(:category).permit(:name, :index)
    end

    def load_category!
      @category = Category.find_by!(id: params[:id])
    end
end
