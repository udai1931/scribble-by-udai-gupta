# frozen_string_literal: true

class AddCategoryForeignKeyToArticles < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :articles, :categories
  end
end
