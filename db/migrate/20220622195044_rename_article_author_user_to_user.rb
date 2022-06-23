# frozen_string_literal: true

class RenameArticleAuthorUserToUser < ActiveRecord::Migration[6.1]
  def change
    rename_column :articles, :author_user_id, :user_id
  end
end
