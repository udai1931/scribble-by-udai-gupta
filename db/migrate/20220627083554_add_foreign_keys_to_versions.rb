# frozen_string_literal: true

class AddForeignKeysToVersions < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :versions, :articles, column: :article_id
    add_foreign_key :versions, :categories, column: :category_id
  end
end
