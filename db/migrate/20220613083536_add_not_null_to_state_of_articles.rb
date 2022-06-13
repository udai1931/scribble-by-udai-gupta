# frozen_string_literal: true

class AddNotNullToStateOfArticles < ActiveRecord::Migration[6.1]
  def change
    change_column_null :articles, :state, false
  end
end
