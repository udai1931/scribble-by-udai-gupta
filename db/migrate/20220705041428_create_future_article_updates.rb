# frozen_string_literal: true

class CreateFutureArticleUpdates < ActiveRecord::Migration[6.1]
  def change
    create_table :future_article_updates do |t|
      t.references :article, foreign_key: true
      t.string :state, null: false
      t.datetime :scheduled_at, null: false
      t.timestamps
    end
  end
end
