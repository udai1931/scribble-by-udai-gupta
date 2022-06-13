# frozen_string_literal: true

class AddAuthorUserIdToArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :author_user_id, :integer
  end
end
