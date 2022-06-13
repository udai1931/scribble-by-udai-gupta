# frozen_string_literal: true

class CreateCategoryTable < ActiveRecord::Migration[6.1]
  def change
    create_table :categories do |t|
      t.string :name, null: false
      t.integer :count, null: false, default: 0
      t.timestamps
    end
  end
end
