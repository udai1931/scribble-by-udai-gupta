# frozen_string_literal: true

class CreateVersionsTable < ActiveRecord::Migration[6.1]
  def change
    create_table :versions do |t|
      t.string :title, null: false
      t.string :body, null: false
      t.string :state, null: false
      t.integer :category_id, null: false
      t.string :tag, null: false
      t.timestamps
    end
  end
end
