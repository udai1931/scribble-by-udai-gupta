# frozen_string_literal: true

class AddStateToArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :state, :string, default: "Draft"
  end
end
