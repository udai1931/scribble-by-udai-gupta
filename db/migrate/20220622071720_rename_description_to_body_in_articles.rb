# frozen_string_literal: true

class RenameDescriptionToBodyInArticles < ActiveRecord::Migration[6.1]
  def change
    rename_column :articles, :description, :body
  end
end
