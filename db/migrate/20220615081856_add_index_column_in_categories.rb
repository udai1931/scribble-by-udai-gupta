# frozen_string_literal: true

class AddIndexColumnInCategories < ActiveRecord::Migration[6.1]
  def change
    add_column :categories, :index, :integer
  end
end
