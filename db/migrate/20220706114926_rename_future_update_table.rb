# frozen_string_literal: true

class RenameFutureUpdateTable < ActiveRecord::Migration[6.1]
  def change
    rename_table :future_article_updates, :schedules
  end
end
