# frozen_string_literal: true

class AddForeignKeyToArticle < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :articles, :users, column: :author_user_id
  end
end
