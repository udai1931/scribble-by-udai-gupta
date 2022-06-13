# frozen_string_literal: true

class CategoriesController < ApplicationController
  def create
    @category = Category.new(category_params)
    @category.save!
  end

  def index
    @categories = Category.all
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end
