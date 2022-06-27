# frozen_string_literal: true

class AddArticleIdToVersions < ActiveRecord::Migration[6.1]
  def change
    add_column :versions, :article_id, :integer, null: false
  end
end
