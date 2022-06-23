# frozen_string_literal: true

class RenameCategoryIndexToPosition < ActiveRecord::Migration[6.1]
  def change
    rename_column :categories, :index, :position
  end
end
